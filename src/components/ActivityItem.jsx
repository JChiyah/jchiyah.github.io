// import React, { Component } from 'react';
// import { TimelineEvent } from 'react-event-timeline';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// const defaultTimelineIcon = "coffee";

// const borderColourArray =     ['#27ae60', '#e74c3c', '#f1c40f', '#3498db'];
// const backgroundColourArray = ['#c8f3da', '#fbdedb', '#fbedb8', '#cce5f6'];


// // because the library does not allow to change the date style,
// // we set everything in itemStyle and then we "normalise" in the other styles
// const itemStyle = {
// 	fontSize: '1.3em',
// 	fontWeight: '900',
// 	paddingLeft: '15px',
// 	paddingBottom: '1em',
// };
// const titleStyle = {
// 	fontSize: '0.85em',
// 	fontWeight: '400',
// };
// const subtitleStyle = {
// 	fontWeight: '400',
// };
// const bubbleStyle = {
// 	borderWidth: '3px',
// 	marginLeft: '0',
// 	width: '40px',
// 	height: '40px',
// };
// const iconStyle = {
// 	width: '40px',
// 	height: '40px',
// 	fontSize: '1.3em',
// }
// const contentStyle = {
// 	fontSize: '0.85em',
// 	fontWeight: '400',
// 	display: 'flex',
// 	alignItems: 'center',
// };
// const contentTextStyle = {
// 	flex: '1'
// }
// const contentImgStyle = {
// 	flex: '2',
// 	textAlign: 'center'
// }


// class ActivityItem extends Component {
// 	constructor(props) {
// 		super(props);

// 		const source = this.props.source;

// 		this.state = {
// 			title: source['title'],
// 			subtitle: source['subtitle'],
// 			date: source['date'],
// 			description: source['description'] || '',
// 			icon: source['icon'] || '',
// 			image: source['image'] || undefined,
// 			imageAlt: source['image-alt'] || '',
// 		};
// 		if (this.state.image && !this.state.imageAlt) {
// 			// do not allow images without an image-alt (in case I forget :p)
// 			throw new Error(`ActivityItem '${this.state.title}' missing image-alt attribute`);
// 		}
// 	}

// 	getColour(array) {
// 		return array[this.props.index % array.length];
// 	}

// 	render() {
// 		// note how we perform a deep copy
// 		let bubbleStyleCopy = JSON.parse(JSON.stringify(bubbleStyle));
// 		bubbleStyleCopy['borderColor'] = this.getColour(borderColourArray);
// 		bubbleStyleCopy['background'] = this.getColour(backgroundColourArray);

// 		// the following is done to avoid empty bubbles in TimelineEvents
// 		let bubbleContent = this.state.description ? <div dangerouslySetInnerHTML={{ __html: this.state.description }} /> : null;
// 		// null objects won't be rendered
// 		if (this.state.image) {
// 			let image = <img src={this.state.image}  alt={this.state.imageAlt}/>;
// 			// depending on whether there is a non-null description or not, we append the image to
// 			// the description object OR we just replace the null content for the image altogether
// 			bubbleContent = bubbleContent ? <><div style={contentTextStyle}>{bubbleContent}</div><div style={contentImgStyle}>{image}</div></> : image;
// 		}

// 		return (
// 			<TimelineEvent
// 				createdAt={this.state.title}
// 				title={this.state.date}
// 				subtitle={this.state.subtitle}
// 				icon={<FontAwesomeIcon className="fa-icon" icon={this.state.icon || defaultTimelineIcon} />}
// 				collapsible={true}
// 				showContent={true}
// 				// the styles for this object are done inline at the beginning of this file
// 				style={itemStyle}
// 				titleStyle={titleStyle}
// 				subtitleStyle={subtitleStyle}
// 				contentStyle={contentStyle}
// 				bubbleStyle={bubbleStyleCopy}
// 				iconStyle={iconStyle}
// 				classNameTime="activity-item-date"
// 			>
// 				{bubbleContent}
// 			</TimelineEvent>
// 		);
// 	}
// }

// export default ActivityItem;
