import React, { Component } from 'react';
import { TimelineEvent } from 'react-event-timeline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const defaultTimelineIcon = "coffee";

const borderColourArray =     ['#27ae60', '#e74c3c', '#f1c40f', '#3498db'];
const backgroundColourArray = ['#c8f3da', '#fbdedb', '#fbedb8', '#cce5f6'];


// because the library does not allow to change the date style,
// we set everything in itemStyle and then we "normalise" in the other styles
const itemStyle = {
	fontSize: '1.3em',
	fontWeight: '900',
	paddingLeft: '15px',
	paddingBottom: '1em',
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

	getColour(array) {
		return array[this.props.index % array.length];
	}

	render() {
		// note how we perform a deep copy
		var bubbleStyleCopy = JSON.parse(JSON.stringify(bubbleStyle));
		bubbleStyleCopy['borderColor'] = this.getColour(borderColourArray);
		bubbleStyleCopy['background'] = this.getColour(backgroundColourArray);

		return (
			<TimelineEvent 
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
