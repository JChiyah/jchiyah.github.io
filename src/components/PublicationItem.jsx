import React, { Component } from 'react';
import BibtexParser from './../bibtexParse';


class PublicationItem extends Component {
	constructor(props) {
		super(props);

		this.setState(this.props.bibtex);
	}

	setState(bibtexJSON) {
		this.state = {
			title: bibtexJSON['entryTags']['title'],
			author: bibtexJSON['entryTags']['author'],
			year: bibtexJSON['entryTags']['year'],
			link: '#',
		}
	}

	render() {
		return (
			<div className="publication-item">
				<p>{this.state.author}. ({this.state.year}). <em>{this.state.title}</em>.</p>
				<ul className="publication-item-menu">
					<li><a href={this.state.link}>Link</a></li>
					<li>Bibtex</li>
				</ul>
			</div>
		);
	}
}

export default PublicationItem;
