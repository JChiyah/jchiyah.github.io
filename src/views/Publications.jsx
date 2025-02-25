import React, { Component } from 'react';

// import './../App.scss';

import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBook } from '@fortawesome/free-solid-svg-icons';

import PublicationItem from './../components/PublicationItem';
import NewModal from './../components/NewModal';
import PageLayout from './PageLayout';
import { parseBibtexFile } from './../references';

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
			activeHighlightTimer: null,
			error: null
		};
		this._isMounted = false;
	}

	componentDidMount() {
		this._isMounted = true;
		// this.fetchPublications();
		this.loadPublications(publicationsFile)
			.then(() => {
				// Handle initial hash after publications are loaded
				// wait for a few ms to ensure the item is in the DOM
				setTimeout(() => {
					this.handleHashChange();
				}, 300);
			});

		// Add hash change listener
		window.addEventListener('hashchange', this.handleHashChange);
	}

	componentWillUnmount() {
		this._isMounted = false;
		// Remove hash change listener
		window.removeEventListener('hashchange', this.handleHashChange);
	}

	handleHashChange = () => {
		const hash = window.location.hash.slice(1);
		if (hash) {
			const element = document.getElementById(hash);
			if (element) {
				this.highlightTarget(element);
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	};

	highlightTarget(element) {
		// Remove highlight class and re-add it to trigger animation
		element.classList.remove('highlight-target');
		// Force a reflow to ensure the animation plays again
		void element.offsetWidth;
		element.classList.add('highlight-target');
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

	fetchPublications() {
		fetch(publicationsFile).then((r) => r.text()).then(text => {
			this.loadPublications(text);
		});
	}

	getPublicationsByYear() {
		// return an object of publications by year, 
		// first sorting the publications by year, keeping upcoming at first
		const { publicationsObject } = this.state;
		return Object.keys(publicationsObject).sort((a, b) => {
			if (a === 'Upcoming') return -1;  // a comes first
			if (b === 'Upcoming') return 1;   // b comes first
			return parseInt(b) - parseInt(a);  // normal year comparison
		});
	}

	loadPublications(text) {
		let { redirectLink } = this.state;
		let pubsArray = {};

		return parseBibtexFile(publicationsFile)  // Return the promise
			.then(references => {
				references.forEach(reference => {
					if (redirectLink && reference.getCitationKey() === redirectLink) {
						console.log(`Found match for redirect: ${reference.getCitationKey()} = ${reference.getURL()}`);
						window.location.replace(reference.getURL());
					}

					const pubYear = reference.getYear();

					if (!(pubYear in pubsArray)) {
						pubsArray[pubYear] = [reference];
					} else {
						pubsArray[pubYear].push(reference);
					}
				});

				// output number of publications
				console.log(references.length + " publications in total :)");

				if (this._isMounted) {
					this.setState({
						publicationsObject: pubsArray
					});
				}
			})
			.catch(error => {
				console.error('Error parsing bibtex file:', error);
				if (this._isMounted) {
					this.setState({
						error: 'Failed to load publications'
					});
				}
			});
	}

	clearHighlightCitation() {
		// clear any existing timer
		this.setState({ isCitationHighlighted: null });
		if (this.state.activeHighlightTimer) {
			clearTimeout(this.state.activeHighlightTimer);
		}
	}

	highlightCitation(citation, event) {
		// Find the citation element and apply the highlight
		const element = event?.target.closest('.citation-text.text-bg-light');
		if (element) {
			element.classList.remove('text-bg-light');
			this.highlightTarget(element);
			setTimeout(() => {
				element.classList.remove('highlight-target');
				element.classList.add('text-bg-light');
			}, 2000);
		}
	}

	renderPublications() {
		const { publicationsObject } = this.state;
		let publications = [];

		this.getPublicationsByYear().forEach((year) => {
			publications.push(
				<div key={year} id={"papers-" + year} className="publication-section scroll-target">
					<h4>{year}</h4>
					<ul className="fade-animation-sequence">
						{publicationsObject[year].map((entry) => (
							<PublicationItem
								key={entry.getCitationKey()}
								bibtex={entry}
								entry={entry}
								modalCallback={(entry) => this.onOpenModal(entry)}
							/>
						))}
					</ul>
				</div>
			);
		});

		return publications;
	}

	render() {
		const navItems = this.getPublicationsByYear().map((year) => {
			return { label: year, path: "papers-" + year };
		});

		return (
			<PageLayout
				pageTitle="Publications"
				navTitle="Publications"
				navItems={navItems}
			>
				<h3>Publications</h3>
				<p style={{ marginBottom: '2em' }}>
					You can also check my <a href={publicationsFile} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-icon" icon={faBook} /> bibtex file</a> or
					my <a href="https://scholar.google.co.uk/citations?hl=en&user=NQyCFjYAAAAJ#" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-icon" icon={faGraduationCap} /> Google Scholar profile</a>. If you need access to any of the publications and the link is broken, contact me and I will happily provide a copy.
				</p>
				<NewModal
					show={this.state.openModal}
					onHide={() => this.onCloseModal()}
					publication={this.state.modalPublication}
					citationStyles={this.state.citationStyles}
					onCitationCopy={(citationId, e) => this.highlightCitation(citationId, e)}
				/>
				<Container>
					{this.renderPublications()}
				</Container>
				<br />
				<hr />
				<h2>My Name</h2>
				<p>Please cite me as <em>Chiyah-Garcia</em> !
					I follow the guidelines from this <a href="https://blog.apastyle.org/apastyle/2017/05/whats-in-a-name-two-part-surnames-in-apa-style.html" target="_blank" rel="noopener noreferrer">guide</a>.
				</p>
			</PageLayout >
		);
	}
}

export default Publications;
