import React, { Component } from 'react';
import './../App.scss';
import * as bootstrap from 'bootstrap';  // Import Bootstrap JS

import NewTimeline from './../components/Timeline';
import PageLayout from './PageLayout';

const activitiesFile = "/activities.json";

// const timelineLineStyle = {
// 	width: '3px',
// 	height: 'auto',
// 	top: '20px',
// 	bottom: '0px',
// 	left: '21px',
// }

// this could not be a state property because then the component would go into an infinite loop
// var colorIndex = 0;


class Activities extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activityArray: [],
		}
	}

	componentDidMount() {
		this.getActivities();
	}

	getActivities() {
		fetch(activitiesFile).then((r) => r.text()).then(text => {
			this.setActivities(text);
		});
	}

	setActivities(text) {
		const parsed = JSON.parse(text);
		const filtered = parsed.filter(item => !item.hidden);
		this.setState({
			activityArray: filtered,
		});
	}

	renderSection(json) {
		if (json['hidden']) {
			return null;
		}
		return (
			<div
				className="activity-section"
				key={"section-" + json['id']}
				id={json['id']}
			>
				<h4>{json['title']}</h4>
				<NewTimeline events={json['list']} />
			</div>
		);
	}

	render() {
		const activityArray = this.state.activityArray;
		const body = activityArray.map((entry) => {
			return this.renderSection(entry);
		});

		const navItems = activityArray.map((entry) => {
			return { label: entry['title'], path: entry['id'] };
		});

		return (
			<PageLayout
				pageTitle="Professional Activities"
				navTitle="Activities"
				navItems={navItems}
			>
				{body}
			</PageLayout>
		);
	}
}

export default Activities;
