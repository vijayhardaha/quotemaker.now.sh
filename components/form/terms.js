/**
 * External dependancies
 */
import { Form } from "react-bootstrap";

/**
 * Internal dependancies
 */

const Terms = ({ value, setData }) => {
	return (
		<Form.Group controlId="terms">
			<Form.Label>Terms and Conditions</Form.Label>
			<Form.Control
				as="textarea"
				value={value}
				rows="3"
				placeholder="Include your return or cancellation policy."
				onChange={(e) => setData({ terms: e.target.value })}
			/>
		</Form.Group>
	);
};

export default Terms;
