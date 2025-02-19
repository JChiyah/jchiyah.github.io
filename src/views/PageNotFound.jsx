import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';

import PageLayout from './PageLayout';


class PageNotFound extends Component {

	render() {
		return (
			<PageLayout>
				<div className="app-body page-not-found">
					<h1>Ooops!</h1>

					<h2>Page not found</h2>

					<h3>404 Error</h3>

					<FontAwesomeIcon className="fa-icon" icon={faSadTear} style={{ fontSize: '5em' }} />

					<h4>It seems that this page does not exists (or I forgot something)</h4>

					<p>Please, send me an email if you think that there should be something here!</p>
				</div>
			</PageLayout>
		);
	}
}

export default PageNotFound;
