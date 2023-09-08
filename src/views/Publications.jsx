import React, { Component } from 'react';
import BibtexParser from './../bibtexParse';
import './../App.scss';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBook } from '@fortawesome/free-solid-svg-icons';

import NavigationBar from './../components/NavigationBar';
import Footer from './../components/Footer';
import PublicationItem from './../components/PublicationItem';
import {getAPACitation, getHarvardCitation, getChicagoCitation, getBibtexHTML} from './../referenceUtils';


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
			__proto__: Object},
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
			publicationsObject: [],
			openModal: false,
			modalPublication: test,
			redirectLink: redirectLink
		};

		this.getPublications(this.setPublications);
	}

	onOpenModal(bibtex) {
		this.setState({
			openModal: true,
			modalPublication: bibtex
		});
	};

	onCloseModal() {
		this.setState({ openModal: false });
	};

	getPublications(callback) {
		fetch(publicationsFile).then((r) => r.text()).then(text  => {
			this.setPublications(text);
		});
	}

	setPublications(text) {
		let { redirectLink } = this.state;
		const parsed = BibtexParser.toJSON(text);
		let pubsArray = {};

		parsed.forEach(function (entry) {
			// first check if we need to redirect
			if (redirectLink && entry['citationKey'] === redirectLink) {
				console.log(`Found match for redirect: ${entry['citationKey']} = ${entry['entryTags']['url']}`);
				window.location.replace(entry['entryTags']['url']);
			}
			// organise by publication Year otherwise
			const pubYear = entry['entryTags']['year'];
			if (!(pubYear in pubsArray)) {
				pubsArray[pubYear] = [entry];
			} else {
				pubsArray[pubYear].push(entry);
			}
		});

		this.setState({
			publicationsObject: pubsArray,
		});
	}

	renderCitationStyles() {
		const { modalPublication } = this.state;

		if (modalPublication === undefined) {
			return (<></>);
		}
		return (<>
			<tr>
				<th>APA</th>
				<td>{getAPACitation(modalPublication)}</td>
			</tr>
			<tr>
				<th>Harvard</th>
				<td>{getHarvardCitation(modalPublication)}</td>
			</tr>
			<tr>
				<th>Chicago</th>
				<td>{getChicagoCitation(modalPublication)}</td>
			</tr>
			<tr>
				<th>Bibtex</th>
				<td><tt dangerouslySetInnerHTML={{__html: getBibtexHTML(modalPublication)}}/></td>
			</tr>
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
					<li key={entry['citationKey']}>
						<PublicationItem bibtex={entry} modalCallback={(bibtex) => this.onOpenModal(bibtex)} />
					</li>
				)
			});
			return (<div key={year}>
				<h3>{year}</h3>
				<ul>{pubEntries}</ul>
			</div>);
		});

		const modal = this.renderModal();
		if (totalPublications > 0) console.log(totalPublications + " publications in total :)"); // avoid displaying if pubs not loaded

		return (
			<div className="App">
				<NavigationBar currentPage='Publications' />

				<div className="app-body">
					<h1>Publications</h1>
					<p style={{marginBottom: '2em'}}>
						You can also check my <a href={publicationsFile} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-icon" icon={faBook} /> bibtex file</a> or
							my <a href="https://scholar.google.co.uk/citations?hl=en&user=NQyCFjYAAAAJ#" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-icon" icon={faGraduationCap} /> Google Scholar profile</a>. If you need access to any of the publications and the link is broken, do not hesitate to contact me and I will happily provide a copy.
					</p>
					{modal}
					{publications}
					<br/>
					<hr/>
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
