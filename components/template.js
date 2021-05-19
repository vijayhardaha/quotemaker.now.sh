/**
 * Local dependancies
 */
import Meta from "./meta";
import Wrapper from "./wrapper";
import Header from "./header";
import Footer from "./footer";

const Template = ({ children }) => {
	return (
		<>
			<Meta />
			<Header />
			<main id="main">
				<Wrapper>
					<div className="application">{children}</div>
				</Wrapper>
			</main>
			<Footer />
		</>
	);
};

export default Template;
