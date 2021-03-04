/**
 * External dependancies
 */
import { Button } from "react-bootstrap";

/**
 * Internal dependancies
 */

const Modal = ({ resetForm, showModal }) => {
	return (
		<div className="modal">
			<div className="modal-content">
				<h3 className="modal-heading">Reset data?</h3>
				<p className="modal-text">
					This can't be undone. All the form data will be set to
					default data and you all changes will be gone.
				</p>
				<div className="modal-actions">
					<Button
						variant="secondary"
						onClick={() => showModal(false)}
					>
						Cancel
					</Button>
					<Button
						variant="danger"
						onClick={() => {
							showModal(false);
							resetForm();
						}}
					>
						Reset
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
