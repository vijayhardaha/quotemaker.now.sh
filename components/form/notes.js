/**
 * Package dependancies
 */
import { Form } from "react-bootstrap";

/**
 * Local dependancies
 */

/**
 * Main Component
 */
const Notes = ({ value, setData }) => {
	return (
		<Form.Group controlId="notes">
			<Form.Label>Notes</Form.Label>
			<Form.Control
				as="textarea"
				value={value}
				rows="3"
				placeholder="Include your important notes."
				onChange={(e) => setData({ notes: e.target.value })}
			/>
		</Form.Group>
	);
};

// Default Export
export default Notes;
