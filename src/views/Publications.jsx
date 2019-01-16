import React, { Component } from 'react';
import BibtexParser from './../bibtexParse';
import './../App.scss';

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
				<li>
					<PublicationItem bibtex={entry} />
				</li>
			)
		});

		return (
			<div className="App">
				<NavigationBar currentPage='Publications' />

				<div className="app-body">
					<h1>Publications</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					<ul>{pubs}</ul>
				</div>
			</div>
		);
	}

}

export default Publications;
