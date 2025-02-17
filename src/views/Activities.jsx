import React, { Component } from 'react';
import './../App.scss';

import NavigationBar from './../components/NavigationBar';
import Footer from './../components/Footer';
// import { Timeline } from 'react-event-timeline';
// import ActivityItem from './../components/ActivityItem';
import NewTimeline from './../components/Timeline';
import './../components/Timeline.scss';

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
			shortcutBar: []
		}

		this.getActivities();
	}

	getActivities() {
		fetch(activitiesFile).then((r) => r.text()).then(text => {
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
		// const list = json['list'].map((entry, index) => {
		// 	return (
		// 		<ActivityItem
		// 			key={json['id'] + index}
		// 			source={entry}
		// 			index={colorIndex++}
		// 		/>
		// 	);
		// });

		if (json['hidden']) {
			return <></>;
		} else {
			// Skip if already in shortcutBar to avoid duplicates
			// if (this.state.shortcutBar.find(item => item.id === json['id'])) {
			// 	return;
			// }
			// this.setState(prevState => ({
			// 	shortcutBar: prevState.shortcutBar.concat({
			// 		title: json['title'],
			// 		id: json['id']
			// 	})
			// }));
		}

		return (
			<div
				className="activity-section"
				key={json['id']}
				id={json['id']}
			>
				<h2>{json['title']}</h2>
				<NewTimeline events={json['list']} />

				{/* <Timeline
					style={{ width: '98%' }}
					lineStyle={timelineLineStyle}
				>
					{list}
				</Timeline> */}

			</div>
		);
	}

	render() {
		const actArray = this.state.activityArray;
		const body = actArray.map((entry) => {
			return this.renderSection(entry);
		});

		const jumpToBody = actArray.map((entry, index) => {
			if (entry['hidden']) {
				return null;
			} else {
				return (
					<li key={"link-" + entry['id'] + index}>
						<a href={"#" + entry['id']}>{entry['title']}</a>
					</li>
				);
			}
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
