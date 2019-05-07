import React, { Component } from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";


class ProjectItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: props.source['title'],
			subtitle: props.source['subtitle'],
			description: props.source['description'],
			role: props.source['role'],
			topics: props.source['topics'],
			url: props.source['url'],
			skills: props.source['skills'],
		}
	}

	renderSkills() {
		return this.state.skills.join(', ');
	}

	render() {
		return (
			<div className="project-item">
				<p className="project-item-subtitle">{this.state.subtitle}</p>

				<h4 className="project-item-title">{this.state.title}</h4>

				<p className="project-item-role">{this.state.role}</p>
				<p className="project-item-description">{this.state.description}</p>
				<p className="project-item-skills"><strong>Topics:</strong> {this.state.topics.join(', ')}</p>
				<p className="project-item-skills"><strong>Skills:</strong> {this.state.skills.join(', ')}</p>
				{this.state.url ?
					<p className="project-item-url"><a href={this.state.url} target="_blank" rel="noopener noreferrer">
						<FontAwesomeIcon className="fa-icon" icon={faExternalLinkAlt} /> Check Project</a></p>
					: '' }
			</div>
		);
	}
}

export default ProjectItem;
