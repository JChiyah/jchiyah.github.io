import {
	faHouse,
	faUser,
	faCubes,
	faBriefcase,
	faFileLines,
	faEnvelope,
	faTimes
} from '@fortawesome/free-solid-svg-icons';
import {
	Navbar,
	Container,
	Nav
} from 'react-bootstrap';
import {
	Link,
	useLocation
} from 'react-router-dom';
import {
	useState
} from 'react';
import {
	FontAwesomeIcon
} from '@fortawesome/react-fontawesome';

const NavigationLink = ({ icon, text, onNavigate, customUrl = "" }) => {
	const [isHovered, setIsHovered] = useState(false);
	const location = useLocation();
	const url = customUrl || `/${text.toLowerCase().replace(" ", "-")}`;
	const isActive = location.pathname === url;

	return (
		<Nav.Link
			as={Link}
			to={url}
			className={`${isActive ? 'active' : ''}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={onNavigate}
		>
			<FontAwesomeIcon icon={icon} bounce={isHovered} />
			{text}
		</Nav.Link>
	);
};

const NewNavBar = () => {
	const [expanded, setExpanded] = useState(false);
	const location = useLocation();
	const currentPage = location.pathname.substring(1).replace("-", " ").replace(/\b\w/g, char => char.toUpperCase());

	const handleNavigate = () => {
		setExpanded(false);
	};

	return (
		<Navbar
			expand="lg"
			expanded={expanded}
			onToggle={() => setExpanded(!expanded)}
			className="fixed-top"
			data-bs-theme="dark"
		>
			<Container>
				<Navbar.Brand as={Link} to="/">
					Javier Chiyah-Garcia
					<span className="ms-2 text-secondary d-md-none">
						{currentPage !== '' && currentPage !== 'Home' ? `/ ${currentPage}` : ''}
					</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav">
					<span className={`navbar-toggler-icon ${expanded ? 'd-none' : ''} `} />
					<FontAwesomeIcon
						icon={faTimes}
						className={expanded ? '' : 'd-none'}
					/>
				</Navbar.Toggle>
				<Navbar.Collapse id="basic-navbar-nav" className="text-center">
					<Nav className="mx-auto">
						<NavigationLink icon={faHouse} text="Home" onNavigate={handleNavigate} />
						{/* <NavigationLink icon={faUser} text="About" onNavigate={handleNavigate} /> */}
						<NavigationLink icon={faCubes} text="Projects" onNavigate={handleNavigate} />
						<NavigationLink icon={faFileLines} text="Publications" onNavigate={handleNavigate} />
						<NavigationLink icon={faBriefcase} text="Experience" onNavigate={handleNavigate} />
						<NavigationLink icon={faEnvelope} text="Contact" customUrl="/#contact" onNavigate={handleNavigate} />
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NewNavBar;
