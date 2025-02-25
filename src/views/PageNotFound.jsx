import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import PageLayout from './PageLayout';


const PageNotFound = () => {
	return (
		<PageLayout
			pageTitle="Not Found">
			<div className="container">
				<div className="row justify-content-center text-center">
					<div className="col-md-8 col-lg-6">
						<div className="border-0 rounded-3 p-4">
							<div className="card-body">
								<h1 className="display-1 fw-bold mb-3">404</h1>
								<br />

								<FontAwesomeIcon
									icon={faCog}
									className="text-accent mb-4"
									style={{
										fontSize: '10rem',
										animationDuration: '25s'
									}}
									spin={true}
								/>

								<h2 className="mb-3 fw-bold">Oops! Page Not Found</h2>

								<p className="mb-4 text-muted">
									The page you're looking for doesn't exist or has been moved.
								</p>

								<div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
									<Link to="/" className="btn btn-primary btn-lg px-4 gap-2">
										Return Home
									</Link>
									<a href="/#contact" className="btn btn-outline-secondary btn-lg px-4">
										Contact Me
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageLayout>
	);
};

export default PageNotFound;
