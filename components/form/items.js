/**
 * External dependancies
 */
import { Form, Button } from "react-bootstrap";
import { FiPlusSquare, FiX } from "react-icons/fi";
import classnames from "classnames";

/**
 * Internal dependancies
 */
import { int, decimal, qtyCheck, priceCheck } from "../../lib/util";
import PriceInput from "../controls/price-input";

const Items = ({ hourly, items, setData }) => {
	const rows = items.map(({ title, qty, price, total }, i) => {
		return (
			<div className="item-row" key={`item-row-${i}`}>
				<div className="item-col title">
					<Form.Control
						className="item-title"
						data-id={i}
						data-name="title"
						id={`item-title-${i}`}
						placeholder="Task Name"
						type="text"
						value={title}
						onChange={(e) => {
							const _items = [...items];
							_items[i].title = e.target.value;
							console.log(_items);
							setData({ items: _items });
						}}
					/>
				</div>
				<div className="item-group">
					{hourly ? (
						<>
							<div className="item-col qty">
								<PriceInput
									id={`item-qty-${i}`}
									data-id={i}
									data-name="qty"
									type="tel"
									placeholder="1"
									value={int(qty)}
									className="item-qty form-control"
									maskOptions={{
										allowDecimal: false,
										integerLimit: 4,
									}}
									onChange={(e) => {
										const _items = [...items];
										const qty = qtyCheck(e.target.value);
										const price = priceCheck(
											_items[i].price
										);
										_items[i].qty = qty;
										_items[i].price = price;
										_items[i].total = price * qty;
										setData({ items: _items });
									}}
								/>
							</div>
							<div className="item-col price">
								<PriceInput
									id={`item-price-${i}`}
									data-id={i}
									data-name="price"
									type="tel"
									placeholder="0.00"
									value={decimal(price)}
									className="item-price form-control"
									onChange={(e) => {
										const _items = [...items];
										const price = priceCheck(
											e.target.value
										);
										const qty = qtyCheck(_items[i].qty);
										_items[i].qty = qty;
										_items[i].price = price;
										_items[i].total = price * qty;
										setData({ items: _items });
									}}
								/>
							</div>
						</>
					) : (
						<></>
					)}
					<div className="item-col total">
						<PriceInput
							id={`item-total-${i}`}
							data-id={i}
							data-name="total"
							type="tel"
							value={decimal(total)}
							placeholder="0.00"
							className="item-total form-control"
							disabled={hourly}
							onChange={(e) => {
								const _items = [...items];
								const total = priceCheck(e.target.value);
								const qty = qtyCheck(_items[i].qty);
								_items[i].qty = qty;
								_items[i].price = total / qty;
								_items[i].total = total;
								setData({ items: _items });
							}}
						/>
					</div>
					<Button
						variant="danger"
						className="item-remove"
						onClick={(e) => {
							const newItems = items.filter((v, I) => I !== i);
							setData({ items: newItems });
						}}
						type="button"
					>
						<FiX />
					</Button>
				</div>
			</div>
		);
	});

	const headClasses = classnames("items-head", {
		hourly: hourly,
	});

	return (
		<div className="items">
			<div className={headClasses}>
				<span className="item-col title" title="Description">
					Description
				</span>
				<div className="item-group">
					{hourly ? (
						<>
							<span className="item-col qty" title="Quantity">
								Qty
							</span>
							<span className="item-col price" title="Price">
								Price
							</span>
							<span className="item-col total" title="Total">
								Total
							</span>
						</>
					) : (
						<>
							<span className="item-col total" title="Amount">
								Amount
							</span>
						</>
					)}
					<span className="item-remove"></span>
				</div>
			</div>
			<div className="items-row">{rows}</div>
			<Button
				className="btn-primary btn-block"
				id="add-new-item"
				type="button"
				onClick={(e) => {
					const sets = [
						{
							title: "",
							qty: 1,
							price: 0,
							total: 0,
						},
					];
					const newItems = [...items, ...sets];
					setData({ items: newItems });
				}}
			>
				<FiPlusSquare />
				Add New Item
			</Button>
		</div>
	);
};

export default Items;
