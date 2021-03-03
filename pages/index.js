import Header from "../components/Header";
import Footer from "../components/Footer";
import AppForm from "../components/AppForm";
import { Container, Row, Col } from "react-bootstrap";

export default function index() {
	return (
		<>
			<Header />
			<main id="main">
				<Container>
					<Row>
						<Col xs={12} sm={12} md={12}>
							<div id="application">
								<AppForm />
							</div>
						</Col>
					</Row>
				</Container>
			</main>
			<Footer />
		</>
	);
}
