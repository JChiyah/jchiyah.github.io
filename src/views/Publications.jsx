import React, { Component } from 'react';

import './../App.scss';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBook } from '@fortawesome/free-solid-svg-icons';

import NavigationBar from './../components/NavigationBar';
import Footer from './../components/Footer';
import PublicationItem from './../components/PublicationItem';
import { parseBibtexFile } from './../references';
import CopyButton from './../components/CopyButton';

const publicationsFile = '/publications.bib';


class Publications extends Component {

	constructor(props) {
		super(props);
		const test = {
			citationKey: "ChiyahHRI18",
			entryTags: {
				address: "Chicago, IL, USA",
				// eslint-disable-next-line no-useless-escape
				author: "Chiyah Garc{\'i}a, Francisco J. and Robb, David A., and Liu, X. and Laskov, Atanas and  Patron, Patron and Hastie, Helen",
				booktitle: "Proceedings of Explainable Robotic Systems Workshop",
				series: "HRI'18",
				title: "Explain Yourself: A Natural Language Interface for Scrutable Autonomous Robots",
				year: "2018",
				__proto__: Object
			},
			entryType: "inproceedings"
		};

		// check if we need to redirect
		let params = new URLSearchParams(window.location.search);
		let redirectLink = params.get('link');
		if (redirectLink) {
			// do a manual fix for the SIGDIAL poster where URL does not match bib key
			if (redirectLink === 'sigdial2023') {
				redirectLink = 'chiyah-garcia2023sigdial';
			}
		}

		this.state = {
			citationStyles: [
				{ name: 'ACL', func: 'getACLCitation' },
				// { name: 'APA', func: 'getAPACitation' },
				{ name: 'Harvard', func: 'getHarvardCitation' },
				{ name: 'Markdown<br/>(Informal)', func: 'getMarkdownCitation' },
				{ name: 'ACL&nbsp;Bibkey', func: 'getACLBibkey' },
				{ name: 'BibTex', func: 'getBibtexCitation' },
			],
			publicationsObject: [],
			openModal: false,
			modalPublication: undefined,
			redirectLink: redirectLink,
			isCitationHighlighted: null,
			activeHighlightTimer: null
		};

		this.getPublications(this.setPublications);
	}

	onOpenModal(entry) {
		this.setState({
			openModal: true,
			modalPublication: entry
		});
	};

	onCloseModal() {
		this.clearHighlightCitation();
		this.setState({ openModal: false });
	};

	getPublications(callback) {
		fetch(publicationsFile).then((r) => r.text()).then(text => {
			this.setPublications(text);
		});
	}

	setPublications(text) {
		let { redirectLink } = this.state;
		// const parsed = BibtexParser.toJSON(text);
		// const parsed = Cite.input(text);

		let pubsArray = {};

		parseBibtexFile(publicationsFile).then(references => {
			references.forEach(reference => {
				// console.log(reference);
				if (redirectLink && reference.getCitationKey() === redirectLink) {
					console.log(`Found match for redirect: ${reference.getCitationKey()} = ${reference.getURL()}`);
					window.location.replace(reference.getURL());
				}
				// organise by publication Year otherwise
				// const pubYear = entry.getDate(); // ['entryTags']['year'];
				const pubYear = reference.getYear(); // Extract the year from the date

				if (!(pubYear in pubsArray)) {
					pubsArray[pubYear] = [reference];
				} else {
					pubsArray[pubYear].push(reference);
				}

			});

			this.setState({
				publicationsObject: pubsArray,
			});
		});

		// parsed.forEach(function (entry) {
		// 	// first check if we need to redirect
		// 	// print out the entry

		// });
	}

	clearHighlightCitation() {
		// clear any existing timer
		this.setState({ isCitationHighlighted: null });
		if (this.state.activeHighlightTimer) {
			clearTimeout(this.state.activeHighlightTimer);
		}
	}

	highlightCitation(citation) {
		this.clearHighlightCitation();

		this.setState({ isCitationHighlighted: citation });

		// set a new timer
		let timeout = setTimeout(() => {
			this.setState({ isCitationHighlighted: null });
		}, 1500);
		this.setState({ activeHighlightTimer: timeout });
	}

	renderCitationStyles() {
		const { modalPublication, citationStyles } = this.state;

		if (!modalPublication) return null;

		return (<>
			{citationStyles.map(citeStyle => {
				const { isCitationHighlighted } = this.state;

				return (
					<tr key={citeStyle.name}>
						<th dangerouslySetInnerHTML={{
							__html: citeStyle.name
						}}></th>
						<td>
							<div className={`citation-text ${isCitationHighlighted === (citeStyle.name + modalPublication.key) ? 'text-bg-success-flash' : 'text-bg-light'}`}>
								<span
									dangerouslySetInnerHTML={{
										__html: modalPublication[citeStyle.func]()
									}}
								/>
								<CopyButton
									contentToCopy={modalPublication[citeStyle.func]('text')}
									className="btn-secondary"
									buttonText=""
									tooltipTextBefore="Copy citation"
									onClick={() => this.highlightCitation(citeStyle.name + modalPublication.key)}
								/>
							</div>
						</td>
					</tr>
				);
			})}
		</>);
	}

	renderModal() {
		const { openModal } = this.state;
		const content = this.renderCitationStyles();

		return (
			<Modal
				open={openModal}
				onClose={() => this.onCloseModal()}
				classNames={{
					overlay: "publication-overlay",
					modal: "publication-modal",
					closeButton: "publication-modal-button",
				}}
				center>
				<h2>Cite</h2>
				<table>
					<tbody>
						{content}
					</tbody>
				</table>
			</Modal>
		)
	}

	render() {
		const pubObject = this.state.publicationsObject;
		// get keys with years and sort them
		let pubKeys = Object.keys(pubObject);
		pubKeys.sort(function (a, b) {
			return b === 'Upcoming' || parseInt(b) - parseInt(a);
		});

		// create the publications by year
		let totalPublications = 0;
		const publications = pubKeys.map((year) => {
			let pubEntries = pubObject[year].map((entry) => {
				totalPublications += 1;
				return (
					<li key={entry.getCitationKey()}>
						<PublicationItem bibtex={entry} modalCallback={(entry) => this.onOpenModal(entry)} reference={entry} />
					</li>
				)
			});
			return (<div key={year} id={"papers-" + year}>
				<h3>{year}</h3>
				<ul>{pubEntries}</ul>
			</div>);
		});

		if (totalPublications > 0) console.log(totalPublications + " publications in total :)"); // avoid displaying if pubs not loaded

		return (
			<div className="App">
				<NavigationBar currentPage='Publications' />

				<div className="app-body">
					<h1>Publications</h1>
					<p style={{ marginBottom: '2em' }}>
						You can also check my <a href={publicationsFile} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-icon" icon={faBook} /> bibtex file</a> or
						my <a href="https://scholar.google.co.uk/citations?hl=en&user=NQyCFjYAAAAJ#" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-icon" icon={faGraduationCap} /> Google Scholar profile</a>. If you need access to any of the publications and the link is broken, contact me and I will happily provide a copy.
					</p>
					{this.renderModal()}
					{publications}
					<br />
					<hr />
					<h2>My Name</h2>
					<p>Please cite me as <em>Chiyah-Garcia</em> !
						I follow the guidelines from this <a href="https://blog.apastyle.org/apastyle/2017/05/whats-in-a-name-two-part-surnames-in-apa-style.html" target="_blank" rel="noopener noreferrer">guide</a>.
					</p>
				</div>

				<Footer />
			</div>
		);
	}

}

export default Publications;
