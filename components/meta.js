/**
 * External dependancies
 */
import Head from "next/head";

const Meta = () => {
	return (
		<Head>
			<meta content="#ffffff" />
			<meta charSet="UTF-8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
			<title>Quote Maker</title>
			<meta name="title" content="Quote Maker" />
			<meta
				name="description"
				content="A simple javascript tool to generate & download the quotation list with a nice design."
			/>
			<meta
				name="keywords"
				content="quote,quotation,Quote.it,vijay hardaha,vijay,hardaha,tool,application,web application,javascript,tool,invoice generation,quote generator"
			/>
			<meta name="robots" content="index, follow" />
			<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
			<meta name="language" content="English" />
			<meta name="revisit-after" content="1 days" />
			<meta name="author" content="Vijay Hardaha" />

			<link rel="icon" href="/favicon.ico" />
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/favicon-16x16.png"
			/>
			<link rel="manifest" href="/site.webmanifest" />

			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://quotemaker.now.sh/" />
			<meta property="og:title" content="Quote Maker" />
			<meta
				property="og:description"
				content="A simple javascript tool to generate & download the quotation list with a nice design."
			/>
			<meta
				property="og:image"
				content="https://quotemaker.now.sh/thumbnail.png"
			/>
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="628" />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://quotemaker.now.sh/" />
			<meta property="twitter:title" content="Quote Maker" />
			<meta
				property="twitter:description"
				content="A simple javascript tool to generate & download the quotation list with a nice design."
			/>
			<meta
				property="twitter:image"
				content="https://quotemaker.now.sh/thumbnail.png"
			/>

			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link
				href="https://fonts.googleapis.com/css2?family=Federo&family=Montserrat:wght@300;400;500;600;700;900&display=swap"
				rel="stylesheet"
				crossOrigin="anonymous"
			/>

			<meta
				name="google-site-verification"
				content="9T8_EMb6UiUZR6CeIs8Dd6687D-o48lwZEjb6cPPckg"
			/>
			<script
				async
				src="https://www.googletagmanager.com/gtag/js?id=UA-100426446-5"
			></script>
			<script
				dangerouslySetInnerHTML={{
					__html: `window.dataLayer = window.dataLayer || [];function gtag(){window.dataLayer.push(arguments)}gtag("js", new Date());gtag("config", "UA-100426446-5");`,
				}}
			></script>
		</Head>
	);
};

export default Meta;
