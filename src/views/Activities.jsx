import React, { Component } from 'react';
import './../App.scss';
import * as bootstrap from 'bootstrap';  // Import Bootstrap JS

import NavigationBar from './../components/NavigationBar';
import Footer from './../components/Footer';
import NewTimeline from './../components/Timeline';
import VerticalNav from './../components/VerticalNav';

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
		this.scrollSpyRef = React.createRef();  // Create ref for scrollspy
	}

	componentDidMount() {
		this.getActivities();
		// Initialize ScrollSpy after the component mounts
		this.initScrollSpy();
	}

	componentWillUnmount() {
		// Clean up ScrollSpy
		if (this.scrollspy) {
			this.scrollspy.dispose();
		}
	}

	initScrollSpy() {
		// Initialize ScrollSpy
		this.scrollspy = new bootstrap.ScrollSpy(document.body, {
			target: '#vertical-nav',
			offset: 100  // Adjust this value based on your needs
		});
	}

	getActivities() {
		fetch(activitiesFile).then((r) => r.text()).then(text => {
			this.setActivities(text);
		});
	}

	setActivities(text) {
		const parsed = JSON.parse(text);
		// remove hidden activities
		const filtered = parsed.filter(item => !item.hidden);
		this.setState({
			activityArray: filtered,
		});
	}

	renderSection(json) {
		if (json['hidden']) {
			return null;	// keep null here to avoid duplicate key issues
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

			return (
				<div
					className="activity-section"
					key={"section-" + json['id']}
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
	}

	render() {
		const activityArray = this.state.activityArray;
		const body = activityArray.map((entry) => {
			return this.renderSection(entry);
		});

		// const jumpToBody = activityArray.map((entry, index) => {
		// 	if (entry['hidden']) {
		// 		return null;
		// 	} else {
		// 		return (
		// 			<li key={"link-" + entry['id'] + index}>
		// 				<a href={"#" + entry['id']}>{entry['title']}</a>
		// 			</li>
		// 		);
		// 	}
		// });

		// Convert activity array to nav items with proper hash paths
		const navItems = activityArray.map((entry) => {
			return { label: entry['title'], path: entry['id'] };
		});
		// add top of page to nav items
		// navItems.unshift({ label: 'Professional Activities', path: 'root' });

		// todo remove the >br>
		return (
			<div className="App" data-bs-spy="scroll" data-bs-target="#vertical-nav">
				<NavigationBar currentPage='Professional Activities' />

				<br />
				<div className="container-fluid">
					<div className="row">
						{/* Left sidebar - same width as right */}
						<div className="col-md-2" key="sidebar-left">

						</div>

						{/* Main content */}
						<div className="col-md-8" key="main-contentasdf">
							<h1>Professional Activities</h1>
							{body}
						</div>

						{/* Right sidebar with vertical nav */}
						<div className="col-md-2" key="sidebar-right">
							<VerticalNav items={navItems} />
						</div>
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}

export default Activities;
