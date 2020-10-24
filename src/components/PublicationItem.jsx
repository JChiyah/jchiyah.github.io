import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faBook, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

import {getBibtexHTML, getAuthor, formatAuthor, getTitle} from './../referenceUtils';


class PublicationItem extends Component {
	constructor(props) {
		super(props);

		const bibtexJSON = this.props.bibtex;

		this.state = {
			citationKey: bibtexJSON['citationKey'],
			title: getTitle(bibtexJSON),
			author: formatAuthor(getAuthor(bibtexJSON), true, false),
			year: bibtexJSON['entryTags']['year'],
			booktitle: bibtexJSON['entryTags']['booktitle'],
			series: bibtexJSON['entryTags']['series'],
			address: bibtexJSON['entryTags']['address'],
			doi: bibtexJSON['entryTags']['doi'] || bibtexJSON['entryTags']['DOI'],
			url: bibtexJSON['entryTags']['url'],
			isDrawerOpen: false,
		};
	}

	toggleDrawer() {
		const isDrawerOpen = this.state.isDrawerOpen;
		this.setState({isDrawerOpen: !isDrawerOpen});
	}

	render() {
		let state = this.state;

		const {modalCallback, bibtex} = this.props;

		const bibtexString = getBibtexHTML(bibtex);

		const classes = "bibtex-block " + (!state.isDrawerOpen ? "bibtex-block-closed" : "");

		// const doiPart = state.doi ? <li>DOI: {state.doi}</li> : <li></li>;

		const pubLink = state.url ? state.url : ("/" + state.citationKey + ".pdf");

		return (
			<div className="publication-item">
				<p>
					{/*{this.state.author} ({this.state.year}). <b>&lsquo;{this.state.title}&rsquo;</b>. In: <i>{this.state.booktitle}</i>. {this.state.series}. {this.state.address}.*/}
					<a href={pubLink} target="_blank" rel="noopener noreferrer">{state.title}</a><br/>
					{state.author}.<br/>
					<i>{state.booktitle}</i>. {state.series}. {state.address}.
				</p>
				<ul className="publication-item-menu">
					<li><a href={pubLink} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-icon" icon={faLink} /> Link</a></li>
					<li><button className="button-link" onClick={() => modalCallback(bibtex)}><FontAwesomeIcon className="fa-icon" icon={faQuoteRight} /> Cite</button></li>
					<li><button className="button-link" onClick={() => this.toggleDrawer()}><FontAwesomeIcon className="fa-icon" icon={faBook} /> Bibtex</button></li>
					{/*{doiPart}*/}
					<li className={classes}><p><tt dangerouslySetInnerHTML={{__html: bibtexString}}/></p></li>
				</ul>
			</div>
		);
	}
}

export default PublicationItem;
