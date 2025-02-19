import React, { Component } from 'react';

import ProjectItem from './../components/ProjectItem';
import PageLayout from './PageLayout';


const projectsFile = "/projects.json";


class Projects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectsArray: []
		}

		this.getProjects();
	}

	getProjects() {
		fetch(projectsFile).then((r) => r.text()).then(text => {
			this.setProjects(text);
		});
	}

	setProjects(text) {
		const parsed = JSON.parse(text);
		this.setState({
			projectsArray: parsed,
		});
	}

	renderProjects() {
		return this.state.projectsArray.map((entry) => {
			return (
				<ProjectItem
					key={entry['id']}
					source={entry}
				/>
			);
		});
	}

	render() {

		return (
			<PageLayout>
				<div className="app-body projects">
					<h1>Projects</h1>

					<div className="items">
						{this.renderProjects()}
					</div>

					<p>This is a work in progress, so there may be projects missing.</p>
				</div>
			</PageLayout>
		);
	}
}

export default Projects;
