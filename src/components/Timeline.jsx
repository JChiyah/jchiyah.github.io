import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const TimelineItem = ({ icon, title, subtitle, date, description }) => (
	<div className="timeline-item fade-animation-on-load">
		<div className="timeline-icon">
			<FontAwesomeIcon icon={Icons[icon]} />
		</div>
		<div className="timeline-content">
			<h3>
				{title}
				{subtitle ? ',' : ''}{subtitle && <span className="timeline-subtitle"> {subtitle}</span>}
			</h3>
			<p className="timeline-date">{date}</p>
			<p className="timeline-description">{description}</p>
		</div>
	</div>
);

const NewTimeline = ({ events = [] }) => {
	return (
		<Container>
			<div className="timeline fade-animation-sequence">
				{events.map((event, index) => (
					<TimelineItem key={index} {...event} />
				))}
			</div>
		</Container>
	);
};

export default NewTimeline;
