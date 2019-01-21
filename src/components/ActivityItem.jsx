import React, { Component } from 'react';
import { TimelineEvent } from 'react-event-timeline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const defaultTimelineIcon = "coffee";

const colourArray = ['#27ae60', '#e74c3c', '#f1c40f', '#3498db'];


// define here everything, including date (aka the actual title)
const itemStyle = {
	fontSize: '1.3em',
	fontWeight: '900',
	paddingLeft: '15px',
};
const titleStyle = {
	fontSize: '0.85em',
	fontWeight: '400',
};
const subtitleStyle = {
	fontWeight: '400',
};
const contentStyle = {
	fontSize: '0.85em',
	fontWeight: '400',
};
const bubbleStyle = {
	borderWidth: '3px',
	marginLeft: '0',
	width: '40px',
	height: '40px',
};
const iconStyle = {
	width: '40px',
	height: '40px',
	fontSize: '1.3em',
}


class ActivityItem extends Component {
	constructor(props) {
		super(props);

		const source = this.props.source;

		this.state = {
			title: source['title'],
			subtitle: source['subtitle'],
			date: source['date'],
			description: source['description'],
			icon: source['icon'] || '',
		};
	}

	getColour() {
		return colourArray[this.props.index % colourArray.length];
	}

	// toggleDrawer() {
	// 	const isDrawerOpen = this.state.isDrawerOpen;
	// 	this.setState({isDrawerOpen: !isDrawerOpen});
	// }

	render() {
		// note how we perform a deep copy
		var bubbleStyleCopy = JSON.parse(JSON.stringify(bubbleStyle));
		bubbleStyleCopy['borderColor'] = this.getColour();

		return (
			<TimelineEvent 
				className="activity-item"
				createdAt={this.state.title}
				title={this.state.date}
				subtitle={this.state.subtitle}
				icon={<FontAwesomeIcon className="fa-icon" icon={this.state.icon || defaultTimelineIcon} />}
				collapsible={true}
				showContent={true}
				// the styles for this object are done inline at the beginning of this file
				style={itemStyle}
				titleStyle={titleStyle}
				subtitleStyle={subtitleStyle}
				contentStyle={contentStyle}
				bubbleStyle={bubbleStyleCopy}
				iconStyle={iconStyle}
				classNameTime="activity-item-date"
			>
				{this.state.description}
			</TimelineEvent>
		);
	}
}

export default ActivityItem;

			// 	<TimelineEvent 
			// 		key={json['id'] + index}
			// 		title={entry['date']}
   //      			createdAt={entry['title']}
   //    				icon={<FontAwesomeIcon className="fa-icon" icon={entry['icon'] || defaultTimelineIcon} />}
			// 	>
			// 		<ActivityItem source={entry} />
			// 	</TimelineEvent>


				// <p className="activity-item-title">{this.state.title}</p>
				// <p className="activity-item-subtitle">{this.state.subtitle}</p>
				// <p className="activity-item-date">{this.state.date}</p>
				// <p className="activity-item-description">{this.state.description}</p>