// SkillCarousel.jsx
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


const SkillBox = ({ icon, text }) => {
	return (
		<div className="skill-box">
			<FontAwesomeIcon icon={icon} className="" />
			{/* <i className={`fas fa-${icon}`}></i> */}
			<span className="skill-text">{text}</span>
		</div>
	);
};

// Single row carousel component
const CarouselRow = ({ skills, rowIndex, totalRows, onMoveItem, isActive = true }) => {
	const carouselRef = useRef(null);
	const skillsRef = useRef([...skills]); // Keep a reference to the skills

	useEffect(() => {
		if (!isActive) return; // Don't set up interval if not active

		const interval = setInterval(() => {
			if (carouselRef.current) {
				// Enable transition with a smoother easing
				carouselRef.current.style.transition = 'transform 1s ease-in-out';

				const firstChild = carouselRef.current.firstElementChild;
				const width = firstChild.offsetWidth + 20; // Width of the box + margin

				// Move carousel to the right (negative translation)
				carouselRef.current.style.transform = `translateX(-${width}px)`;

				// After transition completes
				const transitionEndHandler = () => {
					// Disable transition
					carouselRef.current.style.transition = 'none';

					// Move the first DOM element to the end instead of changing state
					const firstElement = carouselRef.current.firstElementChild;
					carouselRef.current.appendChild(firstElement);

					// Reset position without animation
					carouselRef.current.style.transform = 'translateX(0)';

					// Update our internal reference of skills order
					const firstSkill = skillsRef.current.shift();
					skillsRef.current.push(firstSkill);

					// Remove event listener
					carouselRef.current.removeEventListener('transitionend', transitionEndHandler);
				};

				carouselRef.current.addEventListener('transitionend', transitionEndHandler);
			}
		}, 3000); // Increased interval to 3 seconds to make it less jarring

		return () => clearInterval(interval); // Cleanup on unmount
	}, [isActive]);

	return (
		<div className="skill-carousel-row">
			<div ref={carouselRef} className="skill-carousel-container">
				{skills.map((skill, index) => (
					<SkillBox key={`${skill.text}-${index}`} icon={skill.icon} text={skill.text} />
				))}
			</div>
		</div>
	);
};

// Main SkillCarousel component that creates multiple rows
const SkillCarousel = ({ skills, rows = 1 }) => {
	// Validate that skills can be evenly divided by rows
	if (skills.length % rows !== 0) {
		throw new Error(`Cannot evenly divide ${skills.length} skills into ${rows} rows. The number of skills must be divisible by the number of rows.`);
	}

	const skillsPerRow = skills.length / rows;
	const [rowSkills, setRowSkills] = useState(() => {
		const initialRowSkills = [];
		for (let i = 0; i < rows; i++) {
			initialRowSkills.push(skills.slice(i * skillsPerRow, (i + 1) * skillsPerRow));
		}
		return initialRowSkills;
	});

	const [showAll, setShowAll] = useState(false);
	const [isCarouselActive, setIsCarouselActive] = useState(true);
	const [isButtonHiding, setIsButtonHiding] = useState(false);

	const handleShowAll = () => {
		setIsButtonHiding(true); // Start button fade out
		setIsCarouselActive(false);

		setTimeout(() => {
			setShowAll(true);
		}, 300);
	};

	// Flatten all skills into a single array for the "show all" view
	const allSkills = skills;

	return (
		<div className="skill-carousel">
			{!showAll ? (
				// Show carousel rows
				rowSkills.map((rowSkillsArray, index) => (
					<CarouselRow
						key={`skill-carousel-row-${index}`}
						skills={rowSkillsArray}
						rowIndex={index}
						totalRows={rows}
						isActive={isCarouselActive}
					/>
				))
			) : (
				// Show all skills in a single row
				<div className="skill-carousel-row-all">
					<div className="skill-carousel-container">
						{allSkills.map((skill, index) => (
							<SkillBox
								key={`all-skills-${index}`}
								icon={skill.icon}
								text={skill.text}
							/>
						))}
					</div>
				</div>
			)}
			{!showAll && (
				<button
					className={`show-more-btn ${isButtonHiding ? 'hiding' : ''}`}
					onClick={handleShowAll}
				>
					Show all
					<FontAwesomeIcon icon={faChevronDown} className="ms-2" />
				</button>
			)}
		</div>
	);
};

export default SkillCarousel;
