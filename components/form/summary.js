/**
 * Package dependancies
 */
import { Form } from "react-bootstrap";

/**
 * Local dependancies
 */
import { getCurrency, price, validatePrice } from "../../lib/util";

/**
 * Main Component
 */
const Summary = ({
	currency,
	discount,
	vat,
	customCost,
	subtotal,
	discountAmt,
	discountType,
	discountTotal,
	vatAmt,
	vatTotal,
	customCostLabel,
	customCostAmt,
	total,
	setData,
}) => {
	return (
		<Form.Group className="summary">
			<table className="table table-bordered">
				<tbody>
					<tr>
						<td>Subtotal</td>
						<td>{price(currency, subtotal)}</td>
					</tr>

					{discount ? (
						<tr className="discount-row">
							<td>
								<div className="inline-row">
									<span className="text">Discount</span>
									<span>
										<Form.Control
											type="tel"
											className="form-control"
											placeholder="0.00"
											value={discountAmt}
											onChange={(e) => {
												const value = e.target.value;
												if (validatePrice(value)) {
													setData({ discountAmt: value });
												}
											}}
										/>
									</span>
									<span>
										<Form.Control
											as="select"
											id="discount-type"
											placeholder="select"
											value={discountType}
											onChange={(e) => {
												setData({
													discountType: e.target.value,
												});
											}}
										>
											<option value="0">%</option>
											<option value="1">{getCurrency(currency)}</option>
										</Form.Control>
									</span>
								</div>
							</td>
							<td>{`-${price(currency, discountTotal)}`}</td>
						</tr>
					) : (
						<></>
					)}

					{vat ? (
						<tr className="vat-row">
							<td>
								<div className="inline-row">
									<span className="text">Vat/Tax(%)</span>
									<span>
										<Form.Control
											type="tel"
											value={vatAmt}
											className="form-control"
											placeholder="0.00"
											onChange={(e) => {
												const value = e.target.value;
												if (validatePrice(value)) {
													setData({ vatAmt: value });
												}
											}}
										/>
									</span>
								</div>
							</td>
							<td>{price(currency, vatTotal)}</td>
						</tr>
					) : (
						<></>
					)}

					{customCost ? (
						<tr className="custom-row">
							<td>
								<div className="inline-row">
									<span>
										<Form.Control
											placeholder="Other(Specify)"
											type="text"
											value={customCostLabel}
											onChange={(e) =>
												setData({
													customCostLabel: e.target.value,
												})
											}
										/>
									</span>
									<span>
										<Form.Control
											type="tel"
											className="form-control"
											value={customCostAmt}
											placeholder="0.00"
											onChange={(e) => {
												const value = e.target.value;
												if (validatePrice(value, true)) {
													setData({
														customCostAmt: value,
													});
												}
											}}
											onBlur={(e) => {
												if (isNaN(e.target.value)) {
													setData({
														customCostAmt: "",
													});
												}
											}}
										/>
									</span>
								</div>
							</td>
							<td>
								{isNaN(customCostAmt)
									? price(currency, 0)
									: price(currency, customCostAmt)}
							</td>
						</tr>
					) : (
						<></>
					)}

					<tr className="total total-cost">
						<td>Total Cost</td>
						<td>{price(currency, total)}</td>
					</tr>
				</tbody>
			</table>
		</Form.Group>
	);
};

// Default Export
export default Summary;
