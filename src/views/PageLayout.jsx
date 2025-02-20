import React from 'react';

import VerticalNav from './../components/VerticalNav';


const PageLayout = ({
	pageTitle,
	children,
	navItems = [],
	navTitle = ""
}) => {
	const showVerticalNav = navItems.length > 0;

	return (
		<div className="App">
			{/* <NavigationBar currentPage={pageTitle} /> */}

			{/* <br /> */}
			<div
				className="container-fluid"
				data-bs-spy="scroll"
				data-bs-target="#vertical-nav"
				data-bs-offset="0"
				tabIndex="0"
			>
				<div className="row">
					{/* Left sidebar */}
					<div className="col-md-2" key="sidebar-left">
					</div>

					{/* Main content */}
					<div className="col-md-8 app-body" key="main-content">
						{children}
					</div>

					{/* Right sidebar with vertical nav */}
					<div className="col-md-2" key="sidebar-right">
						{showVerticalNav ? (
							<VerticalNav items={navItems} title={navTitle} />
						) : <></>}
					</div>
				</div>
			</div>

			{/* <Footer /> */}
		</div>
	);
};

export default PageLayout;
