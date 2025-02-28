import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faQuoteRight, faPlayCircle, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import CopyButton from './CopyButton';


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
		},
		{
			icon: faTrophy,
			theme: 'award',
			newTab: false,
			text: 'Best Paper Award',
			url: '#chiyah-garcia-etal-2023-referring',
		}
	],
};

class PublicationItem extends Component {
	constructor(props) {
		super(props);

		// const bibtexJSON = this.props.bibtex;
		const reference = this.props.entry;

		this.state = {
			citationKey: reference.getCitationKey(),
			title: reference.getTitle(),
			author: reference.getAuthors(),
			year: reference.getYear(),
			booktitle: reference.getJournal(),
			series: reference.getShortJournal({ year: true }),
			address: reference.getAddress(),
			doi: reference.getDOI(),
			url: reference.getURL(),
			isDrawerOpen: false,
			isBibtexButtonActive: false
		};
	}

	copyBibtexToClipboard() {
		const bibtexString = this.props.entry.getBibtexString();

		navigator.clipboard.writeText(bibtexString).then(() => {
			console.log(`BibTeX ${this.props.entry.getCitationKey()} copied to clipboard`);
		}).catch(err => {
			console.error(`Failed to copy BibTeX ${this.props.entry.getCitationKey()} to clipboard: `, err);
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

		// const bibtexString = this.props.reference.getBibtexHTML();
		// const classes = "bibtex-block " + (!state.isDrawerOpen ? "bibtex-block-closed" : "");

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
		}

		return (
			<li className="publication-item fade-animation-on-load scroll-target" id={state.citationKey}>
				<p>
					{/*{this.state.author} ({this.state.year}). <b>&lsquo;{this.state.title}&rsquo;</b>. In: <i>{this.state.booktitle}</i>. {this.state.series}. {this.state.address}.*/}
					<a href={pubLink} target="_blank" rel="noopener noreferrer" className="publication-title">{state.title}</a><br />
					{this.getAuthorStringHtml(state.author)}.<br />
					<span className="text-secondary">{state.series ? '[' : ''}{state.series}{state.series ? '] ' : ''}<i>{state.booktitle}</i></span>
					{/* . {state.series}{state.series ? '. ' : ''}
					{state.address}{state.address ? '.' : ''} */}
				</p>
				<ul className="publication-item-menu">
					<li>
						<a href={pubLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary" role="button">
							<FontAwesomeIcon className="fa-icon inline-icon-before" icon={faArrowUpRightFromSquare} />Publication</a>
					</li>
					<li>
						<button className="btn btn-sm btn-secondary" onClick={() => modalCallback(bibtex)}>
							<FontAwesomeIcon className="fa-icon inline-icon-before" icon={faQuoteRight} />Cite
						</button>
					</li>
					<li>
						<CopyButton
							buttonText="BibTeX"
							tooltipTextBefore="Copy BibTeX"
							tooltipTextAfter="Copied!"
							contentToCopy={this.props.entry.getBibtexString()}
							className="btn-secondary"
						/>
					</li>
					{/*{doiPart}*/}
					{additionalHtml}
					{/* <li className={classes}><p><tt dangerouslySetInnerHTML={{ __html: bibtexString }} /></p></li> */}
				</ul>
			</li>
		);
	}
}

export default PublicationItem;
