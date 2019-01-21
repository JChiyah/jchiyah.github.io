import React, { Component } from 'react';


class ActivityItem extends Component {
	constructor(props) {
		super(props);

		const source = this.props.source;

		this.state = {
			title: source['title'],
			subtitle: source['subtitle'],
			date: source['date'],
			description: source['description'],
			isOpen: false,
		};
	}

	toggleDrawer() {
		const isDrawerOpen = this.state.isDrawerOpen;
		this.setState({isDrawerOpen: !isDrawerOpen});
	}

	render() {
		return (
			<div className="activity-item">
				<p className="activity-item-title">{this.state.title}</p>
				<p className="activity-item-subtitle">{this.state.subtitle}</p>
				<p className="activity-item-date">{this.state.date}</p>
				<p className="activity-item-description">{this.state.description}</p>
			</div>
		);
	}
}

export default ActivityItem;
