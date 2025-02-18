import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import './VerticalNav.scss';


const VerticalNav = ({ items = [] }) => {
	const location = useLocation();

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
