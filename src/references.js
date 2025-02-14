// New file, 2025


import Cite from 'citation-js';


function newCSLTemplate(name, csl) {
	// Cite.plugins.config.get('@csl').locales.add('en-US', csl);
	Cite.plugins.config.get('@csl').templates.add(name, csl);
}

// local adding CSL style
// Parse CSL content
async function loadCSLStyle(name, localPublicFile) {
	try {
		// Load local CSL file
		const response = await fetch(localPublicFile);
		const csl = await response.text();
		// console.debug(csl);

		// Parse CSL content
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(csl, "application/xml");

		if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
			throw new Error("Invalid CSL XML");
		}

		// Add CSL template
		newCSLTemplate(name, csl);

		// console.log('CSL style loaded successfully');
	} catch (error) {
		console.error('Error loading CSL style:', error);
		throw error;
	}
}
// const aclStyle = 'https://raw.githubusercontent.com/citation-style-language/styles/master/association-for-computational-linguistics.csl';
// Load CSL style
loadCSLStyle('acl', '/association-for-computational-linguistics.csl');


class Reference {
	constructor(bibtexEntry) {
		this.cite = new Cite("@" + bibtexEntry);
		this.data = this.cite.data[0];
		// console.log(this.data);
	}

	getCitationKey() {
		return this.data['citation-key'];
	}

	getTitle() {
		return this.data.title;
	}

	getYear() {
		return this.data.issued['date-parts'][0][0];
	}

	getAuthors() {
		if (this.data.author === undefined) {
			return this.data.editor.map(editor => `${editor.given} ${editor.family}`).join(', ');
		}
		return this.data.author.map(author => `${author.given} ${author.family}`).join(', ');
	}

	getJournal() {
		return this.data['container-title'];
	}

	getShortJournal(year = false) {
		let series = this.getSeries();
		if (!series) {
			return null;
		}
		// remove year
		series = series.replace(/'\d{2}/, '');
		if (year) {
			series = series + ' ' + this.getYear();
		}
		return series;
	}

	getDOI() {
		return this.data.DOI;
	}

	getURL() {
		return this.data.URL;
	}

	getAddress() {
		return this.data['publisher-place'];
	}

	getSeries() {
		return this.data['collection-title'];
	}

	getCitation(format = 'html', template = 'apa') {
		return this.cite.format('bibliography', {
			format: format,
			template: template,
			lang: 'en-US'
		});
	}

	getAPACitation(format = 'html') {
		return this.getCitation(format, 'apa');
	}

	getHarvardCitation(format = 'html') {
		return this.getCitation(format, 'harvard1');
	}

	getACLCitation(format = 'html') {
		let citation = this.getCitation(format, 'acl');
		// replace sanitised < and > with actual characters
		if (format === 'html') {
			citation = citation.replace(/&#60;/g, '<').replace(/&#62;/g, '>');
		} else {
			// remove html tags
			citation = citation.replace(/<[^>]*>?/g, '');
		}
		return citation;
	}

	getACLBibkey(format = 'html') {
		// first check if ACL by checking url
		if (this.data.URL.includes('aclanthology')) {
			if (format === 'html') {
				return `<samp>${this.data['citation-key']}</samp>`;
			} else {
				return this.data['citation-key'];
			}
		}
		return null;
	}

	getMarkdownCitation(format = 'html') {
		// Get paper details
		const title = this.getTitle();
		const url = this.getURL();
		const year = this.getYear();
		const venue = this.getShortJournal() || this.getJournal();

		// Format authors (First Author et al.)
		const authors = this.data.author || this.data.editor;
		const authorText = authors.length > 1
			? `${authors[0].family} et al.`
			: authors[0].family;

		// Build markdown citation
		let markdownText = `[${title}](${url}) (${authorText}, ${venue} ${year})`;

		if (format === 'html') {
			markdownText = this.getMarkdownCitationRendered(markdownText);
		}
		return markdownText;
	}

	getMarkdownCitationRendered(markdownText) {
		// Convert markdown link [text](url) to HTML <a> tag
		return markdownText.replace(
			/\[([^\]]+)\]\(([^)]+)\)/g,
			'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
		);
	}

	getBibtexString() {
		let bibtex = this.data._graph[0].data;
		// remove extra lines at the end of the string
		bibtex = bibtex.replace(/\s*$/, '');

		return bibtex;
	}

	getBibtexCitation(format = 'html') {
		if (format === 'html') {
			return this.getBibtexHTML();
		} else {
			return this.getBibtexString();
		}
	}

	getBibtexHTML() {
		let bibtex = this.getBibtexString();

		// Remove the abstract field
		bibtex = bibtex.replace(/,\s*abstract\s*=\s*{[^}]*}/, '');
		bibtex = bibtex.replace(/,\s*abstract\s*=\s*"[^"]*"/, '');

		// Replace newlines with HTML line breaks and indentation
		bibtex = bibtex.replace(/(?:\r\n|\r|\n)/g, '<br/>&nbsp;&nbsp;&nbsp;');
		bibtex = bibtex.replace(/(<br\/>&nbsp;&nbsp;&nbsp;})/g, '}');

		// Remove new lines after "and"
		bibtex = bibtex.replace(/and\s*<br\/>&nbsp;&nbsp;&nbsp;/g, 'and ');

		// Remove double spaces from "  and"
		bibtex = bibtex.replace(/\s\sand/g, ' and');

		// Replace BibTeX entry delimiters with HTML tags
		bibtex = bibtex.replace(/@(\w+)\s*{/, '<b>@$1</b>{');
		bibtex = bibtex.replace(/}\s*$/, '<br/>}');

		// Remove extra new lines at the end
		bibtex = bibtex.replace(/(<br\/>&nbsp;&nbsp;&nbsp;)+$/, '');
		bibtex = bibtex.replace(/(<br\/>&nbsp;&nbsp;&nbsp;)+}$/, '}');

		return `<tt class="bibtex-citation">${bibtex}</tt>`;
	}
}

export async function parseBibtexFile(bibtexFile) {
	const response = await fetch(bibtexFile);
	const text = await response.text();
	let entries = text.split('@').slice(1);
	// const parsedEntries = Cite.input(text);

	return entries.map(entry => new Reference(entry));
}

export default Reference;
