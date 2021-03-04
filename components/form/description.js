/**
 * External dependancies
 */
import { Form } from "react-bootstrap";

/**
 * Internal dependancies
 */

const Description = ({ value, setData }) => {
	return (
		<Form.Group controlId="desc">
			<Form.Label>Project Description</Form.Label>
			<Form.Control
				as="textarea"
				value={value}
				rows="3"
				placeholder="Write your project description"
				onChange={(e) => setData({ desc: e.target.value })}
			/>
		</Form.Group>
	);
};

export default Description;
