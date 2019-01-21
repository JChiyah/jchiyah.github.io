import React, { Component } from 'react';
import './../App.scss';

import NavigationBar from './../components/NavigationBar';
import ActivityItem from './../components/ActivityItem';


const activitiesFile = "/activities.json";


class Activities extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activityArray: [],
			jumpToArray: {},
		}

		this.getActivities(this.setActivities);
	}

	getActivities(callback) {
		fetch(activitiesFile).then((r) => r.text()).then(text  => {
			this.setActivities(text);
		});
	}

	setActivities(text) {
		const parsed = JSON.parse(text);
		this.setState({
			activityArray: parsed,
		});
	}

	renderSection(json) {
		const list = json['list'].map((entry, index) => {
			return (
				<li key={json['id'] + index}>
					<ActivityItem source={entry} />
				</li>
			);
		});

		var arr = this.state.jumpToArray;
		if (arr[json['id']]) {
			arr[json['id']] = json['title'];
			this.setState({jumpToArray: arr});
		}

		return (
			<div className="activity-section" key={json['id']} id={json['id']}>
				<h2>{json['title']}</h2>
				<ul>{list}</ul>
			</div>
		);
	}

	render() {
		const actArray = this.state.activityArray;
		const body = actArray.map((entry) => {
			return this.renderSection(entry);
		});

		const jumpToBody = actArray.map((entry, index) => {
			return ( <li key={"link-" + entry['id'] + index}><a href={"#" + entry['id']}>{entry['title']}</a></li> );
		});

		return (
			<div className="App">
				<NavigationBar currentPage='Activities' />

				<div className="app-body">
					<h1>Professional Activities</h1>
					<p>Jump to:</p>
					<ul>{jumpToBody}</ul>
					{body}
				</div>
			</div>
		);
	}
}

export default Activities;
