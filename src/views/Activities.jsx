import React, { Component } from 'react';
import { Timeline } from 'react-event-timeline';
import './../App.scss';

import NavigationBar from './../components/NavigationBar';
import Footer from './../components/Footer';
import ActivityItem from './../components/ActivityItem';


const activitiesFile = "/activities.json";

const timelineLineStyle = {
	width: '3px',
	height: 'auto',
	top: '20px',
	bottom: '0px',
	left: '21px',
}


class Activities extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activityArray: [],
			colorIndex: 0
		}

		this.getActivities();
	}

	getActivities() {
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
				<ActivityItem 
					key={json['id'] + index} 
					source={entry}
					index={this.state.colorIndex++}
				/>
			);
		});

		return (
			<div 
				className="activity-section" 
				key={json['id']} 
				id={json['id']}
			>
				<h2>{json['title']}</h2>
				<Timeline 
					style={{width: '98%'}}
					lineStyle={timelineLineStyle}
				>
				{list}
				</Timeline>
			</div>
		);
	}

	render() {
		const actArray = this.state.activityArray;
		const body = actArray.map((entry) => {
			return this.renderSection(entry);
		});

		const jumpToBody = actArray.map((entry, index) => {
			return (
				<li key={"link-" + entry['id'] + index}>
					<a href={"#" + entry['id']}>{entry['title']}</a>
				</li>
			);
		});

		return (
			<div className="App">
				<NavigationBar currentPage='Professional Activities' />

				<div className="app-body">
					<h1>Professional Activities</h1>
					<p>Jump to:</p>
					<ul>{jumpToBody}</ul>
					{body}
				</div>

				<Footer />
			</div>
		);
	}
}

export default Activities;
