import { Form } from "react-bootstrap";
import { TABLE_TYPES, CURRENCIES, CHECKBOX_SVG } from "../lib/constants";
import { renderDropdown } from "../lib/util";

export default function Filters(props) {
	return (
		<div className="filter-box">
			<div className="dropdown-fields">
				<Form.Group controlId="tableType">
					<Form.Control
						as="select"
						onChange={props.onChangeHandler}
						placeholder="select"
						value={props.tableType}
					>
						{renderDropdown(TABLE_TYPES)}
					</Form.Control>
				</Form.Group>
				<Form.Group controlId="currency">
					<Form.Control
						as="select"
						onChange={props.onChangeHandler}
						placeholder="select"
						value={props.currency}
					>
						{renderDropdown(CURRENCIES)}
					</Form.Control>
				</Form.Group>
			</div>
			<div className="clearfix"></div>
			<div className="checkbox-fields">
				<Form.Check>
					<Form.Check.Label htmlFor="enableDescription">
						<span>
							<Form.Check.Input
								checked={props.description}
								className="checkboxField"
								id="enableDescription"
								onChange={props.onChangeHandler}
								type="checkbox"
							/>
							{CHECKBOX_SVG}
						</span>
						<span>Description</span>
					</Form.Check.Label>
				</Form.Check>
				<Form.Check>
					<Form.Check.Label htmlFor="enableTime">
						<span>
							<Form.Check.Input
								checked={props.time}
								className="checkboxField"
								id="enableTime"
								onChange={props.onChangeHandler}
								type="checkbox"
							/>
							{CHECKBOX_SVG}
						</span>
						<span>Time</span>
					</Form.Check.Label>
				</Form.Check>
				<Form.Check>
					<Form.Check.Label htmlFor="enableDiscount">
						<span>
							<Form.Check.Input
								checked={props.discount}
								className="checkboxField"
								id="enableDiscount"
								onChange={props.onChangeHandler}
								type="checkbox"
							/>
							{CHECKBOX_SVG}
						</span>
						<span>Discount</span>
					</Form.Check.Label>
				</Form.Check>
				<Form.Check>
					<Form.Check.Label htmlFor="enableVat">
						<span>
							<Form.Check.Input
								checked={props.vat}
								className="checkboxField"
								id="enableVat"
								onChange={props.onChangeHandler}
								type="checkbox"
							/>
							{CHECKBOX_SVG}
						</span>
						<span>VAT/Tax</span>
					</Form.Check.Label>
				</Form.Check>
				<Form.Check>
					<Form.Check.Label htmlFor="enableCustomCost">
						<span>
							<Form.Check.Input
								checked={props.customCost}
								className="checkboxField"
								id="enableCustomCost"
								onChange={props.onChangeHandler}
								type="checkbox"
							/>
							{CHECKBOX_SVG}
						</span>
						<span>Custom Cost</span>
					</Form.Check.Label>
				</Form.Check>
			</div>
		</div>
	);
}
