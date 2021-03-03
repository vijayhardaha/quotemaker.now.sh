import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { saveImage, copyImage } from "../lib/download";
import { useAsyncCallback } from "actionsack";
import { price, int, nl2br, float } from "../lib/util";

export default function Preview(props) {
	const clipboardSupported = () => {
		const [isClipboardSupports, setClipboardSupport] = React.useState(
			false
		);

		React.useEffect(() => {
			setClipboardSupport(
				window.navigator &&
					window.navigator.clipboard &&
					typeof ClipboardItem === "function"
			);
		}, []);

		return isClipboardSupports;
	};

	const [showCopied, { loading: copied }] = useAsyncCallback(
		() => new Promise((res) => setTimeout(res, 500))
	);

	const [showSaved, { loading: saved }] = useAsyncCallback(
		() => new Promise((res) => setTimeout(res, 500))
	);

	const [copy, { loading: loading }] = useAsyncCallback(async (...args) => {
		await copyImage(...args);
		showCopied();
	});

	const [save, { loading: saving }] = useAsyncCallback(async (...args) => {
		await saveImage(...args);
		showSaved();
	});

	const data = props.data;
	const currency = data.currency;
	const items = data.items;
	const onlyAmount = data.tableType === "amount";
	const hasTime = data.enableTime;
	let isOpen = props.state ? "open" : "";

	return (
		<div id="preview-box" className={isOpen}>
			<div className="overlay"></div>
			<div className="content">
				<div className="preview-inner">
					<div id="preview">
						<div className="text-center preview-header">
							{data.projectTitle !== "" && (
								<h1 className="project-title">
									{data.projectTitle}
								</h1>
							)}
							{data.projectDescription !== "" && (
								<p className="project-description">
									{nl2br(data.projectDescription)}
								</p>
							)}
						</div>
						<div className="clearfix"></div>

						<div className="preview-items">
							<table className="table table-bordered items-table">
								<thead>
									<tr>
										<th className="no">#</th>
										<th className="description">
											Description
										</th>
										{!onlyAmount && (
											<>
												<th className="qty">Qty</th>
												<th className="cost">Cost</th>
											</>
										)}
										{hasTime && (
											<>
												<th className="time">Time</th>
											</>
										)}
										<th className="amount">Amount</th>
									</tr>
								</thead>
								<tbody>
									{items.map((item, index) => {
										return (
											<tr key={index}>
												<td className="no">
													{index + 1}
												</td>
												<td className="description">
													<h4>
														{item.name.toString()}
													</h4>
													<span>
														{item.description.toString()}
													</span>
												</td>
												{!onlyAmount && (
													<>
														<td className="qty">
															{int(item.qty)}
														</td>
														<td className="cost">
															{price(
																currency,
																item.cost
															)}
														</td>
													</>
												)}
												{hasTime && (
													<>
														<td className="time">
															{int(item.time)}
														</td>
													</>
												)}
												<td className="amount">
													{price(
														currency,
														item.amount
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
						<div className="clearfix"></div>

						<div className="preview-summary">
							<table className="table table-bordered summary-table">
								<tbody>
									<tr>
										<td>Subtotal</td>
										<td>
											{price(currency, data.subtotal)}
										</td>
									</tr>
									{data.enableDiscount && data.discount > 0 && (
										<tr>
											<td>
												Discount
												{data.discountType == "0"
													? ` (${float(
															data.discountAmount
													  )}%)`
													: ""}
											</td>
											<td>
												-
												{price(currency, data.discount)}
											</td>
										</tr>
									)}
									{data.enableVat && data.vat > 0 && (
										<tr>
											<td>
												Vat/Tax ({float(data.vatAmount)}
												%)
											</td>
											<td>{price(currency, data.vat)}</td>
										</tr>
									)}
									{data.enableCustomCost &&
										data.customCost != 0 && (
											<tr>
												<td>
													{data.customCostLabel === ""
														? "Other"
														: data.customCostLabel}
												</td>
												<td>
													{price(
														currency,
														data.customCost
													)}
												</td>
											</tr>
										)}
									<tr>
										<td>Total Cost</td>
										<td>
											{price(currency, data.totalCost)}
										</td>
									</tr>
									{hasTime && (
										<>
											<tr>
												<td>Total Time</td>
												<td>
													{int(data.totalTime)}{" "}
													{data.totalTime > 1
														? "Hours"
														: "Hour"}
												</td>
											</tr>
										</>
									)}
								</tbody>
							</table>
						</div>
						<div className="clearfix"></div>

						{data.terms !== "" && (
							<>
								<div className="text-left preview-terms">
									<h3>Terms & Conditions:</h3>
									<p>{nl2br(data.terms)}</p>
								</div>
								<div className="clearfix"></div>
							</>
						)}

						{data.notes !== "" && (
							<>
								<div className="text-center preview-notes">
									<p>{nl2br(data.notes)}</p>
								</div>
								<div className="clearfix"></div>
							</>
						)}

						<p className="branding">
							Quotes generated from{" "}
							<a href="https://quotemaker.now.sh/">
								https://quotemaker.now.sh/
							</a>
						</p>
					</div>
				</div>
				<ButtonGroup aria-label="Preview Actions">
					<Button variant="primary" disabled={saving} onClick={save}>
						<i className="icofont-save"></i>
						{saving ? "Saving…" : saved ? "Saved!" : "Save"}
					</Button>
					<Button
						variant="secondary"
						disabled={!clipboardSupported || loading}
						onClick={copy}
					>
						<i className="icofont-copy"></i>
						{loading
							? "Copying…"
							: copied
							? "Copied!"
							: "Copy"}
					</Button>
					<Button variant="default" onClick={props.handleClose}>
						<i className="icofont-close-circled"></i>Close
					</Button>
				</ButtonGroup>
			</div>
			{props.state && (
				<style jsx global>{`
					html {
						overflow-y: hidden;
					}
				`}</style>
			)}
		</div>
	);
}
