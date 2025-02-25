import React, { Component } from 'react';
// import './../App.scss';
import * as bootstrap from 'bootstrap';  // Import Bootstrap JS

import NewTimeline from './../components/Timeline';
import PageLayout from './PageLayout';

const activitiesFile = "/activities.json";


class Activities extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activityArray: [],
		}
	}

	componentDidMount() {
		// read the activities file and set the activities
		fetch(activitiesFile).then((r) => r.text()).then(text => {
			// parse the activities, filter and then set the new state
			const parsed = JSON.parse(text);
			const filtered = parsed.filter(item => !item.hidden);
			this.setState({
				activityArray: filtered,
			});
		});
	}

	renderActivitySection(json) {
		if (json['hidden']) {
			return null;
		}
		return (
			<div
				className="activity-section scroll-target"
				key={"section-" + json['id']}
				id={json['id']}
			>
				<h3>{json['title']}</h3>
				<NewTimeline events={json['list']} />
			</div>
		);
	}

	render() {
		const activityArray = this.state.activityArray;
		const body = activityArray.map((entry) => {
			return this.renderActivitySection(entry);
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
