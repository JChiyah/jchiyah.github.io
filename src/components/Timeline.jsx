import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

import './../components/Timeline.scss';


const TimelineItem = ({ icon, title, subtitle, date, description }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isTruncated, setIsTruncated] = useState(false);
	const descriptionRef = useRef(null);

	useEffect(() => {
		const checkTruncation = () => {
			if (descriptionRef.current) {
				const element = descriptionRef.current;
				const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
				const maxHeight = lineHeight * 3 + 1; // Height for 3 lines (2 full + 1 faded)

				// Set initial max-height to allow proper height calculation
				element.style.maxHeight = 'none';
				const fullHeight = element.scrollHeight;

				// Only truncate if content is more than 3 lines AND the heights are different
				if (fullHeight > maxHeight && fullHeight !== maxHeight) {
					element.style.maxHeight = isExpanded ? 'none' : `${maxHeight}px`;
					setIsTruncated(true);
				} else {
					element.style.maxHeight = 'none';  // Don't truncate if content fits or heights are equal
					setIsTruncated(false);
				}
			}
		};
		checkTruncation();
		// Re-check on window resize
		window.addEventListener('resize', checkTruncation);
		return () => window.removeEventListener('resize', checkTruncation);
	}, [description, isExpanded]);

	return (
		<div className="timeline-item fade-animation-on-load">
			<div className="timeline-icon">
				<FontAwesomeIcon icon={Icons[icon]} />
			</div>
			<div className="timeline-content" >
				<h3>
					{title}
					{subtitle ? ',' : ''}{subtitle && <span className="timeline-subtitle"> {subtitle}</span>}
				</h3>
				<p className="timeline-date">{date}</p>
				<div className={`timeline-description-wrapper ${isExpanded ? 'expanded' : ''} ${isTruncated ? 'truncated' : ''}`}>
					<p
						ref={descriptionRef}
						className="timeline-description"
						dangerouslySetInnerHTML={{ __html: description }}
					/>
					{isTruncated && (
						<button
							className="show-more-btn"
							onClick={() => setIsExpanded(!isExpanded)}
						>
							{isExpanded ? 'Show less' : 'Show more'}
							<FontAwesomeIcon icon={isExpanded ? Icons.faChevronUp : Icons.faChevronDown} className="inline-icon-after" />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

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
