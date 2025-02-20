import React, { useState, useRef, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

const CopyButton = ({
	buttonText = "Copy",
	tooltipTextBefore = "Copy to clipboard",
	tooltipTextAfter = "Copied!",
	contentToCopy,
	className = "btn-secondary",
	onClick = null
}) => {
	const [isActive, setIsActive] = useState(false);
	const timeoutRef = useRef(null);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleCopy = async (e) => {
		try {
			await navigator.clipboard.writeText(contentToCopy);
			setIsActive(true);
			if (onClick) onClick(e);

			// Clear any existing timeout
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				setIsActive(false);
				timeoutRef.current = null;
			}, 1500);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	return (
		<OverlayTrigger
			placement='right'
			trigger={['hover', 'focus']}
			delay={{ hide: isActive ? 1000 : 0 }}
			overlay={
				<Tooltip>{isActive ? tooltipTextAfter : tooltipTextBefore}</Tooltip>
			}
		>
			<button
				className={`btn btn-sm ${isActive ? "btn-success" : className} copy-button`}
				onClick={handleCopy}
			>
				<FontAwesomeIcon
					className={`fa-icon ${buttonText !== "" ? "inline-icon-before" : ""}`}
					icon={isActive ? faClipboardCheck : faClipboard}
				/>
				{buttonText}
			</button>
		</OverlayTrigger>
	);
};

CopyButton.propTypes = {
	buttonText: PropTypes.string,
	tooltipTextBefore: PropTypes.string,
	tooltipTextAfter: PropTypes.string,
	contentToCopy: PropTypes.string.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func
};

// copyBibtexToClipboard() {
//     const bibtexString = this.props.reference.getBibtexString();
//     navigator.clipboard.writeText(bibtexString).then(() => {
//         console.log(`BibTeX ${this.props.reference.getCitationKey()} copied to clipboard`);
//     }).catch(err => {
//         console.error(`Failed to copy BibTeX ${this.props.reference.getCitationKey()} to clipboard: `, err);
//     });
// }

// copyBibtexButton() {
//     // Copy bibtex and show button changed
//     this.copyBibtexToClipboard();
//     if (this.state.isBibtexButtonActive) {
//         // cancel timeouts
//         clearTimeout(this.state.isBibtexButtonActive);
//     }

// Revert changes
//     let timeout = setTimeout(() => {
//         this.setState({ isBibtexButtonActive: false });
//         // button.style.backgroundColor = '';
//     }, 2000);
//     this.setState({ isBibtexButtonActive: timeout });
// }


export default CopyButton;
