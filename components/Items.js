import { Form } from "react-bootstrap";
import { int, decimal } from "../lib/util";
import PriceInput from "./PriceInput";

export default function Items(props) {
	const rows = props.items.map((val, i) => {
		return (
			<div className="item-row" key={i}>
				<div className="item-group">
					<div className="item-col name">
						<Form.Control
							className="itemName"
							data-id={i}
							data-name="name"
							id={`itemName-${i}`}
							onChange={props.onChangeHandler}
							placeholder="Task Name"
							type="text"
							value={val.name}
						/>
					</div>
					<div className="item-col description">
						<Form.Control
							as="textarea"
							className="itemDescription"
							data-id={i}
							data-name="description"
							id={`itemDescription-${i}`}
							onChange={props.onChangeHandler}
							placeholder="Task description"
							rows="2"
							value={val.description}
						/>
					</div>
					<div className="item-col qty">
						<PriceInput
							className="itemQty intField form-control"
							data-id={i}
							data-name="qty"
							id={`itemQty-${i}`}
							maskOptions={{
								allowDecimal: false,
								integerLimit: 4,
							}}
							onChange={props.onChangeHandler}
							placeholder="1"
							type="tel"
							value={int(val.qty)}
						/>
					</div>
					<div className="item-col cost">
						<PriceInput
							className="itemCost floatField form-control"
							data-id={i}
							data-name="cost"
							id={`itemCost-${i}`}
							onChange={props.onChangeHandler}
							placeholder="0.00"
							type="tel"
							value={decimal(val.cost)}
						/>
					</div>
					<div className="item-col time">
						<PriceInput
							className="itemTime intField form-control"
							data-id={i}
							data-name="time"
							id={`itemTime-${i}`}
							maskOptions={{
								allowDecimal: false,
								integerLimit: 2,
							}}
							onChange={props.onChangeHandler}
							placeholder="0"
							type="tel"
							value={int(val.time)}
						/>
					</div>
				</div>
				<div className="item-col amount">
					<PriceInput
						className="itemAmount floatField form-control"
						data-id={i}
						data-name="amount"
						id={`itemAmount-${i}`}
						onChange={props.onChangeHandler}
						placeholder="0.00"
						type="tel"
						value={decimal(val.amount)}
					/>
				</div>
				<a
					className="item-remove"
					onClick={(e) => props.removeItemHandler(e, i)}
					type="button"
				>
				    <i class="icofont-close"></i>Remove
				</a>
			</div>
		);
	});

	return (
		<>
			<div className="items">
				<div className="items-head">
					<div className="item-group">
						<span className="item-col name" title="Description">
							Description
						</span>
						<span className="item-col qty" title="Quantity">
							Qty
						</span>
						<span className="item-col cost" title="Cost">
							Cost
						</span>
						<span className="item-col time" title="Time">
							Time
						</span>
					</div>
					<span className="item-col amount" title="Amount">
						Amount
					</span>
				</div>
				<div className="items-row">{rows}</div>
				<button
					className="btn btn-primary btn-block"
					id="addNewItem"
					onClick={props.addItemHandler}
					type="button"
				>
					<span><i class="icofont-plus-square"></i>Add New Item</span>
				</button>
			</div>
			{props.children}
		</>
	);
}
