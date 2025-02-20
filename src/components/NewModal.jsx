import React from 'react';
import { Modal, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CopyButton from './CopyButton';

const NewModal = ({
	show,
	onHide,
	title = "Cite",
	publication,
	citationStyles = [],
	onCitationCopy
}) => {
	return (
		<Modal
			show={show}
			onHide={onHide}
			centered
			size="lg"
		>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Table>
					<tbody>
						{citationStyles.map(citeStyle => {
							const citation = publication?.[citeStyle.func]();
							if (!citation) return null;  // Skip if no citation available

							return (
								<tr key={citeStyle.name}>
									<th className="user-select-none"
										dangerouslySetInnerHTML={{
											__html: citeStyle.name
										}}
									/>
									<td>
										<div className={`citation-text text-bg-light`}>
											<span
												className="user-select-all"
												dangerouslySetInnerHTML={{
													__html: citation
												}}
											/>
											<CopyButton
												contentToCopy={publication?.[citeStyle.func]('text')}
												className="btn-secondary"
												buttonText=""
												tooltipTextBefore="Copy citation"
												onClick={(e) => onCitationCopy(citeStyle.name + publication.key, e)}
											/>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Modal.Body>
		</Modal>
	);
};

NewModal.propTypes = {
	show: PropTypes.bool.isRequired,
	onHide: PropTypes.func.isRequired,
	title: PropTypes.string,
	publication: PropTypes.object.isRequired,
	citationStyles: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		func: PropTypes.string.isRequired
	})),
	onCitationCopy: PropTypes.func.isRequired
};

export default NewModal;
