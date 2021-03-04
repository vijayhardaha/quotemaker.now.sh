/**
 * External dependancies
 */
import Link from "next/link";

/**
 * Internal dependancies
 */
import Wrapper from "./wrapper";

const Footer = () => {
	const links = [
		{
			url: "https://github.com/vijayhardaha/quotemaker.now.sh",
			title: "Source",
			external: true,
		},
		{
			url: "terms",
			title: "Terms of use",
			external: false,
		},
		{
			url: "privacy-policy",
			title: "Privacy Policy",
			external: false,
		},
	];

	const socialLinks = [
		{
			url: "https://twitter.com/vijayhardaha",
			title: "Twitter",
		},
		{
			url: "https://github.com/vijayhardaha",
			title: "Github",
		},
		{
			url: "https://pph.me/vijayhardaha",
			title: "Hire Me",
		},
	];
	return (
		<>
			<footer className="site-footer">
				<Wrapper>
					<div className="footer-inner">
						<p className="copyright">&copy; 2020 Quotemaker</p>
						<div className="links">
							{links.map(({ url, title, external }, i) => {
								return external ? (
									<a
										key={`footer-link-${i}`}
										href={url}
										title={title}
										target="_blank"
									>
										{title}
									</a>
								) : (
									<Link
										key={`footer-link-${i}`}
										href={`/${url}`}
									>
										{title}
									</Link>
								);
							})}
						</div>
						<div className="social-links">
							{socialLinks.map(({ url, title }, i) => {
								return (
									<a
										key={`footer-link-${i}`}
										href={url}
										title={title}
										target="_blank"
									>
										{title}
									</a>
								);
							})}
						</div>
					</div>
				</Wrapper>
			</footer>
		</>
	);
};

export default Footer;
