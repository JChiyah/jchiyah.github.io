import React, { Component } from 'react';
import BibtexParser from './../bibtexParse';
import './../App.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBook } from '@fortawesome/free-solid-svg-icons';

import NavigationBar from './../components/NavigationBar';
import PublicationItem from './../components/PublicationItem';


const publicationsFile = '/publications.bib';


class Publications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			publicationsArray: [],
		}

		this.getPublications(this.setPublications);
	}

	getPublications(callback) {
		fetch(publicationsFile).then((r) => r.text()).then(text  => {
			this.setPublications(text);
		});
	}

	setPublications(text) {
		const parsed = BibtexParser.toJSON(text);
		this.setState({
			publicationsArray: parsed,
		});
	}

	render() {
		const pubsArray = this.state.publicationsArray;
		const pubs = pubsArray.map((entry) => {
			return (
				<li key={entry['citationKey']}>
					<PublicationItem bibtex={entry} />
				</li>
			)
		});

		return (
			<div className="App">
				<NavigationBar currentPage='Publications' />

				<div className="app-body">
					<h1>Publications</h1>
					<p style={{marginBottom: '2em'}}>The following is a list of publications. You can also check my <a href={publicationsFile} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-icon" icon={faBook} /> bibtex file</a> or 
						my <a href="https://scholar.google.co.uk/citations?hl=en&user=NQyCFjYAAAAJ#" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-icon" icon={faGraduationCap} /> Google Scholar profile</a>.
						<br/><br/>If you need access to any of the publications and the link is broken, do not hesitate to contact me and I will happily provide a copy.
					</p>
					<ul>{pubs}</ul>
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
			</div>
		);
	}

}

export default Publications;
