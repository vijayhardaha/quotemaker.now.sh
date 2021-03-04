/**
 * External dependancies
 */
import { Form } from "react-bootstrap";

/**
 * Internal dependancies
 */
import { decimal, getCurrency, priceCheck, price } from "../../lib/util";
import PriceInput from "../controls/price-input";

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
										<PriceInput
											className="form-control"
											id="discount-amount"
											placeholder="0.00"
											type="tel"
											value={decimal(discountAmt)}
											onChange={(e) => {
												const value = priceCheck(
													e.target.value
												);
												setData({ discountAmt: value });
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
													discountType:
														e.target.value,
												});
											}}
										>
											<option value="0">%</option>
											<option value="1">
												{getCurrency(currency)}
											</option>
										</Form.Control>
									</span>
								</div>
							</td>
							<td>{price(currency, discountTotal)}</td>
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
										<PriceInput
											type="tel"
											value={decimal(vatAmt)}
											className="form-control"
											placeholder="0.00"
											onChange={(e) => {
												const value = priceCheck(
													e.target.value
												);
												setData({ vatAmt: value });
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
										<PriceInput
											type="tel"
											className="form-control"
											value={decimal(customCostAmt)}
											placeholder="0.00"
											maskOptions={{
												allowNegative: true,
											}}
											onChange={(e) => {
												const value = priceCheck(
													e.target.value,
													true
												);
												setData({
													customCostAmt: value,
												});
											}}
										/>
									</span>
								</div>
							</td>
							<td>{price(currency, customCostAmt)}</td>
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

export default Summary;
