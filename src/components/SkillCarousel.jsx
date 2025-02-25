// SkillCarousel.jsx
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const SkillBox = ({ icon, text }) => {
	return (
		<div className="skill-box">
			<FontAwesomeIcon icon={icon} className="" />
			{/* <i className={`fas fa-${icon}`}></i> */}
			<span className="skill-text">{text}</span>
		</div>
	);
};


const SkillCarousel = ({ skills, startDirection = "right" }) => {
	const carouselRef = useRef(null);
	const [direction, setDirection] = useState(startDirection); // Initial direction

	useEffect(() => {
		const interval = setInterval(() => {
			if (carouselRef.current) {
				// Step 1: Enable transition for the animation
				carouselRef.current.style.transition = 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';

				if (direction === "right") {
					// Move items from left to right
					const firstChild = carouselRef.current.firstElementChild;
					const width = firstChild.offsetWidth + 20; // Width of the box + margin

					// Move carousel to the right (negative translation)
					carouselRef.current.style.transform = `translateX(-${width}px)`;

					// After transition completes
					const transitionEndHandler = () => {
						// Remove event listener
						carouselRef.current.removeEventListener('transitionend', transitionEndHandler);

						// Disable transition temporarily
						carouselRef.current.style.transition = 'none';

						// Move the first child to the end
						carouselRef.current.appendChild(firstChild);

						// Reset position to start
						carouselRef.current.style.transform = 'translateX(0)';
					};

					carouselRef.current.addEventListener('transitionend', transitionEndHandler);
				} else {
					// Move items from right to left
					const lastChild = carouselRef.current.lastElementChild;
					const width = lastChild.offsetWidth + 20; // Width of the box + margin

					// First move the last child to the beginning without animation
					carouselRef.current.style.transition = 'none';
					carouselRef.current.style.transform = `translateX(-${width}px)`;
					carouselRef.current.insertBefore(lastChild, carouselRef.current.firstElementChild);

					// Force reflow to make sure the transform is applied
					void carouselRef.current.offsetHeight;

					// Then animate the movement to neutral position
					carouselRef.current.style.transition = 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
					carouselRef.current.style.transform = 'translateX(0)';
				}
			}
		}, 2000); // Change every 2 seconds

		return () => clearInterval(interval); // Cleanup on unmount
	}, [direction]); // Add direction to dependencies

	return (
		<div className="skill-carousel">
			<div ref={carouselRef} className="skill-carousel-container">
				{skills.map((skill, index) => (
					<SkillBox key={index} icon={skill.icon} text={skill.text} />
				))}
			</div>
		</div>
	);
};

export default SkillCarousel;
