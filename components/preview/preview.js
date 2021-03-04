/**
 * External dependancies
 */
import { useEffect } from "react";

/**
 * Internal dependancies
 */
import { price, int, nl2br, float, zeroPad } from "../../lib/util";
import PreviewActions from "./actions";

const Preview = ({
	closePreview,
	hourly,
	currency,
	discount,
	vat,
	customCost,
	title,
	desc,
	terms,
	notes,
	items,
	discountAmt,
	discountType,
	customCostLabel,
	customCostAmt,
	vatAmt,
	subtotal,
	discountTotal,
	vatTotal,
	total,
}) => {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return (
		<div className="preview-box">
			<div className="content" id="preview">
				<div className="preview-header">
					{title !== "" && <h1 className="project-title">{title}</h1>}
					{desc !== "" && (
						<p className="project-description">{nl2br(desc)}</p>
					)}
				</div>
				<div className="clearfix"></div>

				<div className="preview-items">
					<table className="table table-borderless items-table">
						<thead>
							<tr>
								<th className="no">#</th>
								<th className="description">Description</th>
								{hourly ? (
									<>
										<th className="price">Price</th>
										<th className="qty">Qty</th>
										<th className="total">Amount</th>
									</>
								) : (
									<th className="total">Total</th>
								)}
							</tr>
						</thead>
						<tbody>
							{items.map((item, index) => {
								return (
									<tr key={index}>
										<td className="no">
											{zeroPad(index + 1, 2)}
										</td>
										<td className="description">
											<span>{item.title.toString()}</span>
										</td>
										{hourly && (
											<>
												<td className="price">
													{price(
														currency,
														item.price
													)}
												</td>
												<td className="qty">
													{int(item.qty)}
												</td>
											</>
										)}
										<td className="total">
											{price(currency, item.total)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="clearfix"></div>

				<div className="mt-5 d-flex flex-row-reverse justify-content-between">
					<div className="preview-summary pl-5 flex-grow-1">
						<table className="table table-borderless summary-table">
							<tbody>
								<tr>
									<td>Subtotal</td>
									<td>{price(currency, subtotal)}</td>
								</tr>
								{discount && discountAmt > 0 && (
									<tr>
										<td>
											Discount
											{discountType == "0"
												? ` (${float(discountAmt)}%)`
												: ""}
										</td>
										<td>
											-{price(currency, discountTotal)}
										</td>
									</tr>
								)}
								{vat && vatTotal > 0 && (
									<tr>
										<td>
											Vat/Tax ({float(vatAmt)}
											%)
										</td>
										<td>{price(currency, vatTotal)}</td>
									</tr>
								)}
								{customCost && customCostAmt != 0 && (
									<tr>
										<td>
											{customCostLabel === ""
												? "Other"
												: customCostLabel}
										</td>
										<td>
											{price(currency, customCostAmt)}
										</td>
									</tr>
								)}
							</tbody>
							<tfoot>
								<tr>
									<th>Total Cost</th>
									<th>{price(currency, total)}</th>
								</tr>
							</tfoot>
						</table>
					</div>

					<div className="information pr-5">
						{terms !== "" && (
							<>
								<div className="preview-terms">
									<h4>Terms & Conditions:</h4>
									<p>{nl2br(terms)}</p>
								</div>
								<div className="clearfix"></div>
							</>
						)}

						{notes !== "" && (
							<>
								<div className="preview-notes">
									<h4>Notes:</h4>
									<p>{nl2br(notes)}</p>
								</div>
								<div className="clearfix"></div>
							</>
						)}

						<div className="mt-5">
							<strong className="thanks ">
								Thank you for business with us.
							</strong>
						</div>
					</div>
				</div>

				<p className="branding">
					Quotes generated from{" "}
					<a href="https://quotemaker.now.sh/">
						https://quotemaker.now.sh/
					</a>
				</p>
			</div>
			<PreviewActions close={closePreview} />
		</div>
	);
};

export default Preview;
