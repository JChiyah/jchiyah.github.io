
import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';


const GithubLink = () => {
	return (
		<Link
			to="https://github.com/jchiyah"
			target="_blank"
			rel="noopener noreferrer"
		>
			<FontAwesomeIcon icon={faGithub} />
		</Link>
	);
};

const LinkedInLink = () => {
	return (
		<Link
			to="https://www.linkedin.com/in/javier-chiyah-garcia-469045a6/"
			target="_blank"
			rel="noopener noreferrer"
			className="me-4"
		>
			<FontAwesomeIcon icon={faLinkedin} />
		</Link>
	);
};

const GoogleScholarLink = () => {
	return (
		<Link
			to="https://scholar.google.co.uk/citations?hl=en&user=NQyCFjYAAAAJ#"
			target="_blank"
			rel="noopener noreferrer"
			className="me-4"
		>
			<FontAwesomeIcon icon={faGraduationCap} />
		</Link>
	);
};

const SocialLinks = ({ classes = "" }) => {
	return (
		<div className={"social-links d-flex justify-content-center " + classes}>
			<GoogleScholarLink />
			<LinkedInLink />
			<GithubLink />
		</div>
	);
};

// if changing order, remember to remove "className="me-4"" from the last link
export {
	GoogleScholarLink,
	LinkedInLink,
	GithubLink,
	SocialLinks,
};
