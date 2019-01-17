import React, { Component } from 'react';
import BibtexParser from './../bibtexParse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faBook } from '@fortawesome/free-solid-svg-icons';


function formatAuthors(authorString) {
	const authorArray = authorString.split(" and ");

	const finalString = authorArray.map((entry) => {
		const author = entry.split(",");
		return author[1] + " " + author[0];
	});

	return finalString.join(", ");
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}


class PublicationItem extends Component {
	constructor(props) {
		super(props);

		this.setupPublication(this.props.bibtex);
	}

	setupPublication(bibtexJSON) {
		const authors = formatAuthors(bibtexJSON['entryTags']['author']);

		this.state = {
			bibtex: bibtexJSON,
			citationKey: bibtexJSON['citationKey'],
			title: bibtexJSON['entryTags']['title'],
			author: authors,
			year: bibtexJSON['entryTags']['year'],
			booktitle: bibtexJSON['entryTags']['booktitle'],
			series: bibtexJSON['entryTags']['series'],
			address: bibtexJSON['entryTags']['address'],
			doi: bibtexJSON['entryTags']['doi'] || bibtexJSON['entryTags']['DOI'],
			url: bibtexJSON['entryTags']['url'],
			isDrawerOpen: false,
		}
	}

	toggleDrawer() {
		const isDrawerOpen = this.state.isDrawerOpen;
		this.setState({isDrawerOpen: !isDrawerOpen});
	}

	render() {
		var bibtexString = BibtexParser.toBibtex([this.state.bibtex], false);
		bibtexString = replaceAll(bibtexString, "\n", "<br/>");
		while (bibtexString.endsWith("<br/>")) {
			bibtexString = bibtexString.substring(0, bibtexString.length - 6);
		}
		bibtexString = replaceAll(bibtexString, "    ", "&nbsp;&nbsp;&nbsp;&nbsp;");

		const classes = "bibtex-block " + (!this.state.isDrawerOpen ? "bibtex-block-closed" : "");

		const doiPart = this.state.doi ? <li>DOI: {this.state.doi}</li> : <li></li>;

		const pubLink = this.state.url ? this.state.url : ("/" + this.state.citationKey + ".pdf");

		return (
			<div className="publication-item">
				<p>
					{this.state.author}. ({this.state.year}). <em>{this.state.title}</em>. In {this.state.booktitle} ({this.state.series}), {this.state.address}.
				</p>
				<ul className="publication-item-menu">
					<li><a href={pubLink} target="_blank"><FontAwesomeIcon className="fa-icon" icon={faLink} /> Link</a></li>
					<li><button className="button-link" onClick={() => this.toggleDrawer()}><FontAwesomeIcon className="fa-icon" icon={faBook} /> Bibtex</button></li>
					{doiPart}
					<li className={classes}><p><tt dangerouslySetInnerHTML={{ __html: bibtexString }}></tt></p></li>
				</ul>
			</div>
		);
	}
}

export default PublicationItem;
