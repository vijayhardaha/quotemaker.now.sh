import Filters from "./Filters";
import Items from "./Items";
import React from "react";
import PriceInput from "./PriceInput";

import { Form } from "react-bootstrap";
import Preview from "./Preview";
import { DEFAULT_FORM_DATA } from "../lib/constants";
import {
	decimal,
	filterClasses,
	float,
	getCurrency,
	int,
	isCheckboxField,
	isItemField,
	percent,
	price,
	validateInput,
} from "../lib/util";

class AppForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = DEFAULT_FORM_DATA;
	}

	handleChange = (e) => {
		if (isItemField(e)) {
			let items = [...this.state.items];
			let name = e.target.dataset.name;
			let dataID = e.target.dataset.id;
			items[dataID][name] = validateInput(e);
			if (["cost", "qty"].includes(name)) {
				let amount = 0;
				if (
					items[dataID]["cost"] !== "" &&
					items[dataID]["qty"] != ""
				) {
					amount =
						float(items[dataID]["cost"]) *
						int(items[dataID]["qty"]);
				}
				items[dataID]["amount"] = float(amount);
			} else if (name === "amount") {
				let qty = int(items[dataID]["qty"]);
				qty = qty === "" || qty === 0 ? 1 : int(qty);
				items[dataID]["qty"] = qty;
				items[dataID]["cost"] = 0;
				if (items[dataID]["amount"] !== "") {
					items[dataID]["cost"] =
						float(items[dataID]["amount"]) / qty;
				}
			}
			this.setState({ items }, () => this.calculateSummary());
		} else if (isCheckboxField(e)) {
			this.setState({ [e.target.id]: e.target.checked }, () =>
				this.calculateSummary()
			);
		} else {
			this.setState({ [e.target.id]: validateInput(e) }, () =>
				this.calculateSummary()
			);
		}
	};

	handleSubmit = (e) => {
		e.preventDefault();
	};

	addItem = (e) => {
		e.preventDefault();
		this.setState(
			(prevState) => ({
				items: [
					...prevState.items,
					{
						name: "",
						description: "",
						qty: 1,
						time: 0,
						cost: 0.0,
						amount: 0.0,
					},
				],
			}),
			() => this.calculateSummary()
		);
	};

	removeItem = (e, index) => {
		e.preventDefault();
		const items = this.state.items.filter((v, i) => index !== i);
		this.setState({ items }, () => this.calculateSummary());
	};

	calculateSummary = () => {
		let {
			enableDiscount,
			enableVat,
			enableCustomCost,
			items,
			discountAmount,
			discountType,
			customCostAmount,
			vatAmount,
		} = this.state;

		let subtotal = items
			.map((i) => i.amount)
			.reduce((a, b) => float(a) + float(b), 0);
		let totalTime = items
			.map((i) => i.time)
			.reduce((a, b) => int(a) + int(b), 0);
		let vat = 0;
		let discount = 0;
		let customCost = 0;
		this.setState({ subtotal, totalTime });

		if (enableVat) {
			if (vatAmount !== "") {
				vat = percent(subtotal, vatAmount);
			}
			this.setState({ vat });
		}

		if (enableCustomCost) {
			if (customCostAmount !== "") {
				customCost = float(customCostAmount);
			}
			this.setState({ customCost });
		}

		if (enableDiscount) {
			if (discountAmount !== "") {
				discount =
					discountType === "1"
						? discountAmount
						: percent(subtotal, discountAmount);
			}
			this.setState({ discount });
		}

		let totalCost = +subtotal + +vat - +discount + +customCost;
		this.setState({ totalCost });
	};

	showPreview = () => {
		this.setState({ preview: true });
		setTimeout(() => {
			document.getElementById("preview-box").classList.add("open");
		}, 100);
	};

	hidePreview = () => {
		document.getElementById("preview-box").classList.remove("open");
		setTimeout(() => {
			this.setState({ preview: false });
		}, 500);
	};

	render() {
		let {
			tableType,
			currency,
			enableDescription,
			enableTime,
			enableDiscount,
			enableVat,
			enableCustomCost,
			projectTitle,
			projectDescription,
			terms,
			notes,
			items,
			discountAmount,
			discountType,
			customCostLabel,
			customCostAmount,
			vatAmount,
			subtotal,
			discount,
			customCost,
			vat,
			totalCost,
			totalTime,
			preview,
		} = this.state;

		const classes = filterClasses({
			type: tableType,
			description: enableDescription,
			time: enableTime,
			discount: enableDiscount,
			vat: enableVat,
			custom: enableCustomCost,
		});

		return (
			<>
				<Form onSubmit={this.handleSubmit} className={classes}>
					<Filters
						currency={currency}
						customCost={enableCustomCost}
						description={enableDescription}
						time={enableTime}
						discount={enableDiscount}
						onChangeHandler={this.handleChange}
						tableType={tableType}
						vat={enableVat}
					/>

					<Form.Group controlId="projectTitle">
						<Form.Label>Project Title</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							placeholder="Write your project title"
							type="text"
							value={projectTitle}
						/>
					</Form.Group>

					<Form.Group controlId="projectDescription">
						<Form.Label>Project Description</Form.Label>
						<Form.Control
							as="textarea"
							onChange={this.handleChange}
							placeholder="Write your project description"
							rows="3"
							value={projectDescription}
						/>
					</Form.Group>

					<Items
						addItemHandler={this.addItem}
						items={items}
						onChangeHandler={this.handleChange}
						removeItemHandler={this.removeItem}
					/>

					<div className="summary">
						<table className="table table-bordered">
							<tbody>
								<tr>
									<td>Subtotal</td>
									<td>{price(currency, subtotal)}</td>
								</tr>
								<tr className="discount-row">
									<td>
										<div className="inline-row">
											<span className="text">
												Discount
											</span>
											<span>
												<PriceInput
													className="floatField form-control"
													id="discountAmount"
													onChange={this.handleChange}
													placeholder="0.00"
													type="tel"
													value={decimal(
														discountAmount
													)}
												/>
											</span>
											<span>
												<Form.Control
													as="select"
													id="discountType"
													onChange={this.handleChange}
													placeholder="select"
													value={discountType}
												>
													<option value="0">%</option>
													<option value="1">
														{getCurrency(currency)}
													</option>
												</Form.Control>
											</span>
										</div>
									</td>
									<td>{price(currency, discount)}</td>
								</tr>
								<tr className="vat-row">
									<td>
										<div className="inline-row">
											<span className="text">
												Vat/Tax(%)
											</span>
											<span>
												<PriceInput
													className="floatField form-control"
													id="vatAmount"
													onChange={this.handleChange}
													placeholder="0.00"
													type="tel"
													value={decimal(vatAmount)}
												/>
											</span>
										</div>
									</td>
									<td>{price(currency, vat)}</td>
								</tr>
								<tr className="custom-row">
									<td>
										<div className="inline-row">
											<span>
												<Form.Control
													id="customCostLabel"
													onChange={this.handleChange}
													placeholder="Other(Specify)"
													type="text"
													value={customCostLabel}
												/>
											</span>
											<span>
												<PriceInput
													className="floatField form-control"
													id="customCostAmount"
													maskOptions={{
														allowNegative: true,
													}}
													onChange={this.handleChange}
													placeholder="0.00"
													type="tel"
													value={decimal(
														customCostAmount
													)}
												/>
											</span>
										</div>
									</td>
									<td>{price(currency, customCost)}</td>
								</tr>
								<tr className="total total-cost">
									<td>Total Cost</td>
									<td>{price(currency, totalCost)}</td>
								</tr>
								<tr className="total total-time">
									<td>Total Time</td>
									<td>{int(totalTime)} Hours</td>
								</tr>
							</tbody>
						</table>
					</div>

					<Form.Group controlId="terms">
						<Form.Label>Terms and Conditions</Form.Label>
						<Form.Control
							as="textarea"
							onChange={this.handleChange}
							placeholder="Include your return or cancellation policy"
							rows="5"
							value={terms}
						/>
					</Form.Group>

					<Form.Group controlId="notes">
						<Form.Label>Notes</Form.Label>
						<Form.Control
							as="textarea"
							onChange={this.handleChange}
							placeholder="For example, “Thank you for your business”"
							rows="3"
							value={notes}
						/>
					</Form.Group>

					<div className="text-center">
						<button
							className="btn btn-primary"
							type="button"
							onClick={this.showPreview}
						>
							<i className="icofont-pixels"></i>Generate Preview
						</button>
					</div>
				</Form>
				<Preview handleClose={this.hidePreview} data={this.state} />
			</>
		);
	}
}

export default AppForm;
