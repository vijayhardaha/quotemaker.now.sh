/**
 * Package dependancies
 */
import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { FiPlusSquare, FiX } from "react-icons/fi";
import classnames from "classnames";

/**
 * Local dependancies
 */
import {
	int,
	float,
	validateQty,
	validatePrice,
	isEmpty,
} from "../../lib/util";

/**
 * Main Component
 */
const Items = ({ hourly, items, setData }) => {
	const itemSet = [
		{
			title: "",
			qty: "",
			price: "",
			total: "",
			iref: null,
		},
	];

	const addNewItem = () => setData({ items: [...items, ...itemSet] });

	const removeItem = (i) => {
		const _items = items.filter((v, I) => I !== i);
		if (_items.length === 0) {
			setData({ items: [...itemSet] });
		} else {
			setData({ items: _items });
		}
	};

	const handleKeyup = (e) => {
		if (!isEmpty(e.target.value)) {
			const key = e.which || e.keyCode;
			if (key === 13) {
				addNewItem();
			}
		}
	};

	const blurHandle = () => {
		const _items = items.map((item) => {
			item.qty = int(item.qty);
			item.price = float(item.price);
			item.total = float(item.total);
			return item;
		});
		setData({ items: _items });
	};

	const rows = items.map((item, i) => {
		return (
			<div className="item-row" key={`item-row-${i}`}>
				<div className="item-col title">
					<Form.Control
						type="text"
						className="item-title"
						placeholder="Task Name"
						value={item.title}
						ref={(e) => (item.iref = e)}
						onChange={(e) => {
							const _items = [...items];
							_items[i].title = e.target.value;
							setData({ items: _items });
						}}
						onKeyUp={handleKeyup}
					/>
				</div>
				<div className="item-group">
					{hourly ? (
						<>
							<div className="item-col qty">
								<Form.Control
									type="tel"
									className="item-qty form-control"
									placeholder="1"
									value={int(item.qty)}
									onChange={(e) => {
										const qty = e.target.value;
										if (validateQty(qty)) {
											const _items = [...items];
											const price = float(_items[i].price);
											_items[i].qty = int(qty);
											_items[i].price = price;
											_items[i].total = price * qty;
											setData({ items: _items });
										}
									}}
									onBlur={blurHandle}
								/>
							</div>
							<div className="item-col price">
								<Form.Control
									type="tel"
									className="item-price form-control"
									placeholder="0.00"
									value={item.price}
									onChange={(e) => {
										const price = e.target.value;
										if (validatePrice(price)) {
											const _items = [...items];
											const qty = int(_items[i].qty, 1);
											_items[i].qty = qty;
											_items[i].price = price;
											_items[i].total = price * qty;
											setData({ items: _items });
										}
									}}
									onBlur={blurHandle}
								/>
							</div>
						</>
					) : (
						<></>
					)}
					<div className="item-col total">
						<Form.Control
							type="tel"
							className="item-total form-control"
							value={item.total}
							placeholder="0.00"
							disabled={hourly}
							onChange={(e) => {
								const total = e.target.value;
								if (validatePrice(total)) {
									const _items = [...items];
									const qty = int(_items[i].qty, 1);
									_items[i].qty = qty;
									_items[i].price = total / qty;
									_items[i].total = total;
									setData({ items: _items });
								}
							}}
							onBlur={blurHandle}
						/>
					</div>
					<Button
						variant="danger"
						className="item-remove"
						onClick={(e) => removeItem(i)}
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
						<span className="item-col total" title="Amount">
							Amount
						</span>
					)}
					<span className="item-remove"></span>
				</div>
			</div>
			<div className="items-row">{rows}</div>
			<Button
				className="btn-primary btn-block"
				id="add-new-item"
				type="button"
				onClick={() => addNewItem()}
			>
				<FiPlusSquare />
				Add New Item
			</Button>
		</div>
	);
};

// Default Export
export default Items;
