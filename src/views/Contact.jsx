import React, { Component } from 'react';
// import './../App.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import PageLayout from './PageLayout';


class Contact extends Component {
	render() {
		return (
			<PageLayout
				pageTitle="Contact"
			>
				<div className="contact">
					<h3>Contact</h3>
					<p>The easiest way to contact me is through email. I don't check other means as regularly, so I might miss messages (e.g., LinkedIn).</p>

					<hr />
					<div className="email-box">
						<h5><FontAwesomeIcon className="fa-icon" icon={faEnvelope} />&nbsp; Email</h5>
						<p>Preferable email for contact:</p>

						<a href="">&#106;&#099;&#104;&#105;&#121;&#097;&#104;&#032;(&#097;&#116;)&#032;&#111;&#117;&#116;&#108;&#111;&#111;&#107;&#032;(&#100;&#111;&#116;)&#032;&#099;&#111;&#109;</a>
					</div>
					<hr />
					<div className="email-box">
						<h5><FontAwesomeIcon className="fa-icon" icon={faEnvelope} />&nbsp; Alternative Email</h5>
						<p>Feel free to contact me at my university email if appropriate. My current university email is below:</p>

						<a href="">&#102;&#106;&#099;&#051;&#032;(&#097;&#116;)&#032;&#104;&#119;&#032;(&#100;&#111;&#116;)&#032;&#097;&#099;&#032;(&#100;&#111;&#116;)&#032;&#117;&#107;</a><br /><br />
						<p>Note that this email may change over time!</p>
					</div>
					<hr />
					<h5>Other related pages:</h5>
					<ul>
						<li><a href="https://github.com/jchiyah"><FontAwesomeIcon className="fa-icon" icon={faGithub} /> GitHub profile</a></li>
						<li><a href="https://www.linkedin.com/in/javier-chiyah-garcia-469045a6/"><FontAwesomeIcon className="fa-icon" icon={faLinkedin} /> LinkedIn profile</a></li>
						<li><a href="https://scholar.google.co.uk/citations?hl=en&user=NQyCFjYAAAAJ#"><FontAwesomeIcon className="fa-icon" icon={faGraduationCap} /> Google Scholar</a></li>
					</ul>
				</div>
			</PageLayout>
		);
	}
}

export default Contact;
