import Link from "next/link";

import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
	return (
		<>
			<footer className="footer" id="footer">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1440 320"
					preserveAspectRatio="none"
				>
					<path
						fill="#4c5c68"
						fillOpacity="1"
						d="M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,218.7C672,213,768,235,864,224C960,213,1056,171,1152,176C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
					></path>
				</svg>
				<div className="footer-inner">
					<Container>
						<Row>
							<Col xs={12} md={12}>
								<ul className="social-links">
									<li>
										<a
											href="https://twitter.com/vijayhardaha/"
											title="Follow on Twitter"
											className="twitter"
											target="_blank"
										>
											<i className="icofont-twitter"></i>
										</a>
									</li>
									<li>
										<a
											href="https://github.com/vijayhardaha/"
											title="Follow on Github"
											className="github"
											target="_blank"
										>
											<i className="icofont-github"></i>
										</a>
									</li>
									<li>
										<a
											href="https://linkedin.com/in/vijayhardaha/"
											title="Join on Linkedin"
											className="linkedin"
											target="_blank"
										>
											<i className="icofont-linkedin"></i>
										</a>
									</li>
									<li>
										<a
											href="https://facebook.com/geekyvijay/"
											title="Add me on Facebook"
											className="facebook"
											target="_blank"
										>
											<i className="icofont-facebook"></i>
										</a>
									</li>
								</ul>
								<ul className="footer-links">
									<li>
										<a
											href="https://github.com/vijayhardaha/quotemaker.now.sh"
											target="_blank"
										>
											Source
										</a>
									</li>
									<li>
										<Link href="/terms">
											<a>Terms of use</a>
										</Link>
									</li>
									<li>
										<Link href="/privacy-policy">
											<a>Privacy Policy</a>
										</Link>
									</li>
									<li>
										<a
											href="https://pph.me/vijayhardaha/"
											target="_blank"
										>
											Hire Me
										</a>
									</li>
								</ul>
								<div className="copyright">
									<p>
										Copyright &copy; 2020&nbsp;
										<a
											href="https://twitter.com/vijayhardaha/"
											title="Vijay Hardaha"
											target="_blank"
										>
											Vijay Hardaha
										</a>
									</p>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			</footer>
		</>
	);
}
