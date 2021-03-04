/**
 * External dependancies
 */
import { Container, Row, Col } from "react-bootstrap";

/**
 * Internal dependancies
 */

const Wrapper = ({ xs = 12, sm = 12, md = 12, lg = 12, children }) => {
	return (
		<Container>
			<Row>
				<Col xs={xs} sm={sm} md={md} lg={lg}>
					{children}
				</Col>
			</Row>
		</Container>
	);
};

export default Wrapper;
