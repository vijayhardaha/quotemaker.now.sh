/**
 * External dependancies
 */
import { Form } from "react-bootstrap";
import { FiChevronDown } from "react-icons/fi";

/**
 * Internal dependancies
 */
import { TABLE_TYPES, CURRENCIES, CHECKBOX_SVG } from "../../lib/constants";
import { renderDropdown } from "../../lib/util";

const FilterBox = ({
	currency,
	customCost,
	discount,
	hourly,
	vat,
	setData,
}) => {
	const hourlyData = hourly ? "hourly" : "fixed";
	return (
		<div className="filter-box">
			<div className="dropdown-fields">
				<Form.Group>
					<Form.Control
						as="select"
						value={hourlyData}
						onChange={(e) => {
							setData({
								hourly: e.target.value === "hourly",
							});
						}}
					>
						{renderDropdown(TABLE_TYPES)}
					</Form.Control>
					<FiChevronDown />
				</Form.Group>
				<Form.Group>
					<Form.Control
						as="select"
						value={currency}
						onChange={(e) => {
							setData({ currency: e.target.value });
						}}
					>
						{renderDropdown(CURRENCIES)}
					</Form.Control>
					<FiChevronDown />
				</Form.Group>
			</div>
			<div className="clearfix"></div>
			<div className="checkbox-fields">
				<Form.Check>
					<Form.Check.Label htmlFor="checkbox-discount">
						<span>
							<Form.Check.Input
								id="checkbox-discount"
								checked={discount}
								type="checkbox"
								onChange={(e) => {
									setData({ discount: e.target.checked });
								}}
							/>
							{CHECKBOX_SVG}
						</span>
						<span>Discount</span>
					</Form.Check.Label>
				</Form.Check>
				<Form.Check>
					<Form.Check.Label htmlFor="checkbox-vat">
						<span>
							<Form.Check.Input
								id="checkbox-vat"
								type="checkbox"
								checked={vat}
								onChange={(e) => {
									setData({ vat: e.target.checked });
								}}
							/>
							{CHECKBOX_SVG}
						</span>
						<span>VAT/Tax</span>
					</Form.Check.Label>
				</Form.Check>
				<Form.Check>
					<Form.Check.Label htmlFor="checkbox-custom-cost">
						<span>
							<Form.Check.Input
								id="checkbox-custom-cost"
								type="checkbox"
								checked={customCost}
								onChange={(e) => {
									setData({
										customCost: e.target.checked,
									});
								}}
							/>
							{CHECKBOX_SVG}
						</span>
						<span>Custom Cost</span>
					</Form.Check.Label>
				</Form.Check>
			</div>
		</div>
	);
};

export default FilterBox;
