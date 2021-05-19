/**
 * Package dependancies
 */
import Link from "next/link";

/**
 * Local dependancies
 */
import Wrapper from "./wrapper";

const Header = () => {
	return (
		<>
			<div className="waves">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1440 320"
					preserveAspectRatio="none"
				>
					<path
						fill="currentColor"
						fillOpacity="1"
						d="M0,160L30,160C60,160,120,160,180,144C240,128,300,96,360,74.7C420,53,480,43,540,53.3C600,64,660,96,720,101.3C780,107,840,85,900,106.7C960,128,1020,192,1080,192C1140,192,1200,128,1260,112C1320,96,1380,128,1410,144L1440,160L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
					></path>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1440 320"
					preserveAspectRatio="none"
				>
					<path
						fill="currentColor"
						fillOpacity="1"
						d="M0,64L30,64C60,64,120,64,180,74.7C240,85,300,107,360,138.7C420,171,480,213,540,218.7C600,224,660,192,720,181.3C780,171,840,181,900,181.3C960,181,1020,171,1080,192C1140,213,1200,267,1260,256C1320,245,1380,171,1410,133.3L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
					></path>
				</svg>
			</div>
			<header className="site-header">
				<Wrapper>
					<div className="header-content">
						<h1 className="site-title"><Link href="/">Quote Maker</Link></h1>
						<p className="site-description">
							A simple javascript tool to generate & download the
							quotation list with a nice design.
						</p>
					</div>
				</Wrapper>
			</header>
		</>
	);
};

export default Header;
