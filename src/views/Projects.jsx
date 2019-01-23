import React, { Component } from 'react';
import './../App.scss';

import NavigationBar from './../components/NavigationBar';
import Footer from './../components/Footer';
import ProjectItem from './../components/ProjectItem';


const projectsFile = "/projects.json";


class Projects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectsArray: [],
			colorIndex: 0
		}

		this.getProjects();
	}

	getProjects() {
		fetch(projectsFile).then((r) => r.text()).then(text  => {
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
			<div className="App">
				<NavigationBar currentPage='Projects' />

				<div className="app-body projects">
					<h1>Projects</h1>

					<div className="items">
						{this.renderProjects()}
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}

export default Projects;
