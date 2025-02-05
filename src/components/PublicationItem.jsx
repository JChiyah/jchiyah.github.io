import React, { Component, useState, useRef } from 'react';

import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faQuoteRight, faPlayCircle, faArrowUpRightFromSquare, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// import { getBibtexHTML } from './../referenceUtils';


const ADDITIONAL_CONTENT = {
	// ChiyahGarciaHRI21Video: {
	// 	video: 'https://youtu.be/1CZm6bsILaw'
	// },
	'ChiyahGarciaHRI21Video': [
		{
			icon: faPlayCircle,
			theme: 'youtube',
			newTab: true,
			text: 'Video',
			url: 'https://youtu.be/1CZm6bsILaw'
		}
	],
	'chiyah-garcia-etal-2024-repairs': [
		{
			icon: faGithub,
			theme: 'github',
			newTab: true,
			text: 'Code',
			url: 'https://github.com/JChiyah/blockworld-repairs',
		}
	],
	'chiyah-garcia-etal-2024-adapting': [
		{
			icon: null,
			theme: 'amazon',
			newTab: true,
			text: 'Amazon Science',
			url: 'https://www.amazon.science/publications/adapting-llm-predictions-in-in-context-learning-with-data-priors',
		}
	],
	'chiyah-garcia-etal-2023-referring': [
		{
			icon: faGithub,
			theme: 'github',
			newTab: true,
			text: 'Code',
			url: 'https://github.com/JChiyah/what-are-you-referring-to',
		}
	],
};

class PublicationItem extends Component {
	constructor(props) {
		super(props);

		const bibtexJSON = this.props.bibtex;
		const reference = this.props.reference;

		this.state = {
			citationKey: reference.getCitationKey(),
			title: reference.getTitle(),
			author: reference.getAuthors(),
			year: reference.getYear(),
			booktitle: reference.getJournal(),
			series: reference.getSeries(),
			address: reference.getAddress(),
			doi: reference.getDOI(),
			url: reference.getURL(),
			isDrawerOpen: false,
			isBibtexButtonActive: false
		};

		// this.state = {
		// 	citationKey: bibtexJSON['citationKey'],
		// 	title: getTitle(bibtexJSON),
		// 	author: formatAuthor(getAuthor(bibtexJSON), true, false, true),
		// 	year: bibtexJSON['entryTags']['year'],
		// 	booktitle: bibtexJSON['entryTags']['booktitle'],
		// 	series: bibtexJSON['entryTags']['series'],
		// 	address: bibtexJSON['entryTags']['address'],
		// 	doi: bibtexJSON['entryTags']['doi'] || bibtexJSON['entryTags']['DOI'],
		// 	url: bibtexJSON['entryTags']['url'],
		// 	isDrawerOpen: false,
		// };
	}

	// To-do: remove this when not needed anymore
	// toggleDrawer() {
	// 	const isDrawerOpen = this.state.isDrawerOpen;
	// 	this.setState({ isDrawerOpen: !isDrawerOpen });
	// }

	copyBibtexToClipboard() {
		const bibtexString = this.props.reference.getBibtexString();

		navigator.clipboard.writeText(bibtexString).then(() => {
			console.log(`BibTeX ${this.props.reference.getCitationKey()} copied to clipboard`);
		}).catch(err => {
			console.error(`Failed to copy BibTeX ${this.props.reference.getCitationKey()} to clipboard: `, err);
		});
	}

	copyBibtexButton() {
		// Copy bibtex and show button changed
		this.copyBibtexToClipboard();

		if (this.state.isBibtexButtonActive) {
			// cancel timeouts
			clearTimeout(this.state.isBibtexButtonActive);
		}

		// Revert changes
		let timeout = setTimeout(() => {
			this.setState({ isBibtexButtonActive: false });
			// button.style.backgroundColor = '';
		}, 2000);
		this.setState({ isBibtexButtonActive: timeout });
	}

	getAuthorStringHtml(authorString, boldName = "Chiyah") {
		// find name and bold it
		const authors = authorString.split(",");

		// Check if any author contains the boldName
		const hasMatch = authors.some(author => author.includes(boldName));

		if (!hasMatch && !authors.some(author => author.includes("Lochau"))) {
			// show error, unless it is the ES4CPS Schloss Dagstuhl paper
			console.error(`No author found containing "${boldName}" in string: "${authorString}"`);
		}

		return authors.map((author, index) => (
			<React.Fragment key={index}>
				{author.includes(boldName) ? (
					<strong>{author}</strong>
				) : (
					author
				)}
				{index < authors.length - 1 ? ", " : ""}
			</React.Fragment>
		));
	}

	render() {
		let state = this.state;

		const { modalCallback, bibtex } = this.props;

		const bibtexString = this.props.reference.getBibtexHTML();

		const classes = "bibtex-block " + (!state.isDrawerOpen ? "bibtex-block-closed" : "");

		// const doiPart = state.doi ? <li>DOI: {state.doi}</li> : <li></li>;

		const pubLink = state.url ? state.url : ("/" + state.citationKey + ".pdf");

		let additionalHtml = [];
		if (state.citationKey in ADDITIONAL_CONTENT) {
			// we found additional elements for the citation
			// if ("video" in entryContent) {
			// 	// extra = <li><a href={entryContent.video} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-icon" icon={faPlayCircle} /> Video</a></li>
			// }
			ADDITIONAL_CONTENT[state.citationKey].forEach(entryContent => {
				const target = entryContent.newTab ? "_blank" : "_self";
				additionalHtml.push(
					<li key={state.citationKey + entryContent.text}>
						<a href={entryContent.url} target={target} rel="noopener noreferrer" className={"btn btn-sm btn-" + entryContent.theme} role="button">
							<FontAwesomeIcon className="fa-icon inline-icon-before" icon={entryContent.icon ? entryContent.icon : faArrowUpRightFromSquare} />
							{entryContent.text}
							{/* {entryContent.icon && <FontAwesomeIcon icon={entryContent.icon} className="fa-icon inline-icon-after" />} */}
						</a>
					</li>
				);
			});
			// how can I append HTML TOGETHER ?? CHATGPT SEE ABOVE

			// if (extra === <li></li>) {
			// 	throw new Error("Type not recognised");
			// }
		}
		// wrap additionalHtml in a <ul> tag
		// additionalHtml = <ul>{additionalHtml}</ul>;
		// additionalHtml = additionalHtml.length > 0 ? (
		// 	<>
		// 		<ul className="publication-item-menu">
		// 			<li>
		// 				<span>Other info: </span>
		// 			</li>
		// 			{additionalHtml}
		// 		</ul>
		// 	</>
		// ) : null;

		// two button states either with a clipboard (default) or with a check
		let bibtexButtonHtml = (
			<OverlayTrigger
				placement='right'
				trigger={['hover', 'focus']}
				delay={{ hide: state.isBibtexButtonActive ? 1000 : 0 }}
				overlay={
					<Tooltip>{state.isBibtexButtonActive ? 'Copied!' : 'Copy BibTeX'}</Tooltip>
				}
			>
				<button
					className={"btn btn-sm " + (state.isBibtexButtonActive ? "btn-success" : "btn-secondary")}
					onClick={this.copyBibtexButton.bind(this)}
				>
					<FontAwesomeIcon
						className="fa-icon inline-icon-before"
						icon={state.isBibtexButtonActive ? faClipboardCheck : faClipboard}
					/>
					BibTeX
				</button>
			</OverlayTrigger>
		);

		return (
			<div className="publication-item">
				<p>
					{/*{this.state.author} ({this.state.year}). <b>&lsquo;{this.state.title}&rsquo;</b>. In: <i>{this.state.booktitle}</i>. {this.state.series}. {this.state.address}.*/}
					<a href={pubLink} target="_blank" rel="noopener noreferrer">{state.title}</a><br />
					{this.getAuthorStringHtml(state.author)}.<br />
					<span className="conference">{state.series}{state.series ? ' - ' : ''}<i>{state.booktitle}</i></span>
					{/* . {state.series}{state.series ? '. ' : ''}
					{state.address}{state.address ? '.' : ''} */}
				</p>
				<ul className="publication-item-menu">
					<li>
						<a href={pubLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary" role="button">
							<FontAwesomeIcon className="fa-icon inline-icon-before" icon={faArrowUpRightFromSquare} />Publication</a>
					</li>
					<li>
						<button className="btn btn-sm btn-secondary" onClick={() => modalCallback(bibtex)}><FontAwesomeIcon className="fa-icon inline-icon-before" icon={faQuoteRight} />Cite</button>
					</li>
					<li>
						{bibtexButtonHtml}
						{/* <button className="button-link" onClick={this.copyBibtexButton.bind(this)} id="copy-button">
							<FontAwesomeIcon className="fa-icon" icon={faClipboard} id="clipboard-icon" /> BibTex
						</button> */}
					</li>
					{/*{doiPart}*/}
					{additionalHtml}
					{/* <li className={classes}><p><tt dangerouslySetInnerHTML={{ __html: bibtexString }} /></p></li> */}
				</ul>
			</div>
		);
	}
}

export default PublicationItem;
