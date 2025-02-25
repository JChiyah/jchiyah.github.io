import React, { Component } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";


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
			<div className="card project-item h-100">
				<div className="card-body p-3 p-md-4">
					<p className="text-muted small mb-1">{this.state.subtitle}</p>

					<h4 className="card-title fw-bold mb-2">{this.state.title}</h4>

					<p className="card-subtitle text-primary mb-3">{this.state.role}</p>

					<p className="card-text mb-3">{this.state.description}</p>

					<div>
						<p className="mb-1 small">
							<strong>Topics:</strong> {this.state.topics.join(', ')}
						</p>

						<p className="mb-2 small">
							<strong>Skills:</strong> {this.state.skills.join(', ')}
						</p>

						{this.state.url ? (
							<a
								href={this.state.url}
								className="btn btn-sm btn-outline-primary mt-2"
								target="_blank"
								rel="noopener noreferrer"
							>
								<FontAwesomeIcon className="me-1" icon={faExternalLinkAlt} />
								<span className="small">Visit Project</span>
							</a>
						) : ''}
					</div>
				</div>
			</div>
		);
	}
}

export default ProjectItem;
