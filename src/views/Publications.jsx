import React, { Component } from 'react';
import BibtexParser from './../bibtexParse';
import './../App.scss';
import Modal from 'react-responsive-modal';

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
		const test = {citationKey: "ChiyahHRI18",
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

		this.state = {
			publicationsObject: [],
			openModal: false,
			modalPublication: test,
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
		const parsed = BibtexParser.toJSON(text);
		let pubsArray = {};
		parsed.forEach(function (entry) {
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
			return parseInt(b) - parseInt(a);
		});
		// create the publications by year
		const publications = pubKeys.map((year) => {
			let pubEntries = pubObject[year].map((entry) => {
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

		return (
			<div className="App">
				<NavigationBar currentPage='Publications' />

				<div className="app-body">
					<h1>Publications</h1>
					<p style={{marginBottom: '2em'}}>The following is a list of publications. You can also check my <a href={publicationsFile} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-icon" icon={faBook} /> bibtex file</a> or 
						my <a href="https://scholar.google.co.uk/citations?hl=en&user=NQyCFjYAAAAJ#" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-icon" icon={faGraduationCap} /> Google Scholar profile</a>.
						<br/><br/>If you need access to any of the publications and the link is broken, do not hesitate to contact me and I will happily provide a copy.
					</p>
					{modal}
					{publications}
					<br/>
					<hr/>
					<h2>My Name</h2>
					<p>Sometimes there is confusion about my name and the correct way to use it. I have two surnames <em>Chiyah</em> and <em>Garcia</em>, thus both "should" be used (but it doesn't matter too much!). 
					I follow the guidelines from this very <a href="https://blog.apastyle.org/apastyle/2017/05/whats-in-a-name-two-part-surnames-in-apa-style.html" target="_blank" rel="noopener noreferrer">comprenhensive guide</a>. 
					Check below for the quick answer.<br/><br/>

					I recommend the following styles, being <em>Chiyah</em> my preferred surname:</p>
					<ul>
						<li>Chiyah Garcia et al.</li>
						<li>Chiyah et al.</li>
						<li>Chiyah Garcia, F. J.</li>
						<li>Chiyah Garcia, Francisco J.</li>
					</ul>
				</div>

				<Footer />
			</div>
		);
	}

}

export default Publications;
