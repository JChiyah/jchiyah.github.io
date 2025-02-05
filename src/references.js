// New file, 2025


import Cite from 'citation-js';


// async, from website
// const templateName = 'association-for-computational-linguistics';
// const website = 'https://raw.githubusercontent.com/citation-style-language/styles/master/association-for-computational-linguistics.csl';

// async function addCSLStyle() {
//     const response = await fetch(website);
//     const csl = await response.text();

//     Cite.plugins.config.get('@csl').templates.add('acl', csl);
// }
// addCSLStyle();


// local adding CSL style
import csl from './association-for-computational-linguistics.csl';

// Add the CSL style to citation-js
Cite.plugins.config.get('@csl').templates.add('association-for-computational-linguistics', csl);
// check other styles here: https://github.com/citation-style-language/styles


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

	getAPACitation() {
		return this.cite.format('bibliography', {
			format: 'text',
			template: 'apa',
			lang: 'en-US'
		});
	}

	getHarvardCitation() {
		return this.cite.format('bibliography', {
			format: 'text',
			template: 'harvard1',
			lang: 'en-US'
		});
	}

	// getChicagoCitation() {
	// 	return this.cite.format('bibliography', {
	// 		format: 'text',
	// 		template: 'acl',
	// 		lang: 'en-US'
	// 	});
	// }

	getACLCitation() {
		return this.cite.format('bibliography', {
			format: 'text',
			template: 'acl',
			lang: 'en-US'
		});
	}

	getBibtexString() {
		let bibtex = this.data._graph[0].data;
		// remove extra lines at the end of the string
		bibtex = bibtex.replace(/\s*$/, '');

		return bibtex;
	}

	getBibtexHTML() {
		let bibtex = this.getBibtexString();

		// Remove the abstract field
		bibtex = bibtex.replace(/,\s*abstract\s*=\s*{[^}]*}/, '');

		// Replace newlines with HTML line breaks and indentation
		bibtex = bibtex.replace(/(?:\r\n|\r|\n)/g, '<br/>&nbsp;&nbsp;&nbsp;');

		// Remove new lines after "and"
		bibtex = bibtex.replace(/and\s*<br\/>&nbsp;&nbsp;&nbsp;/g, 'and ');

		// Remove double spaces from "  and"
		bibtex = bibtex.replace(/\s\sand/g, ' and');

		// Replace BibTeX entry delimiters with HTML tags
		bibtex = bibtex.replace(/@(\w+)\s*{/, '<b>@$1</b>{');
		// bibtex = bibtex.replace(/,\s*([a-zA-Z]+)\s*=\s*{/, ',<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b>$1</b> = {');
		bibtex = bibtex.replace(/}\s*$/, '<br/>}');

		// Remove extra new lines at the end
		bibtex = bibtex.replace(/(<br\/>&nbsp;&nbsp;&nbsp;)+$/, '');

		return bibtex
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


