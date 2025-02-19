import React, { useEffect } from 'react';
import * as bootstrap from 'bootstrap';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import './VerticalNav.scss';


const VerticalNav = ({ items = [] }) => {
	const location = useLocation();

	useEffect(() => {
		// Initialize ScrollSpy
		const scrollspy = new bootstrap.ScrollSpy(document.body, {
			target: '#vertical-nav',
			offset: 100
		});

		// Cleanup on unmount
		return () => {
			if (scrollspy) {
				scrollspy.dispose();
			}
		};
	}, [items]); // Re-initialize when items change

	return (
		<Nav className="nav flex-column vertical-nav sticky-sidebar" id="vertical-nav">
			<span className="vertical-nav-title">Quick Links</span>
			{items.map((item, index) => (
				<Nav.Link
					key={"vertical-nav-item-" + item.path}
					// as={Link}
					href={"#" + item.path}
					className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
				>
					{item.label}
				</Nav.Link>
			))}
		</Nav>
	);
};

export default VerticalNav;
