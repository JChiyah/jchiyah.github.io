/*
	File with several utilities to handle references

	Author: Javier Chiyah Garcia, 2019
*/

import BibtexParser from "./bibtexParse";


export const getAPACitation = (bibtex) => {
	/*
	Returns a string with the APA Citation style of the given bibtex

	Example:
		Hastie, H., Garcia, F. J. C., Robb, D. A., Patron, P., & Laskov, A. (2017). MIRIAM: a
		multimodal chat-based interface for autonomous systems. In Proceedings of the 19th ACM International
		Conference on Multimodal Interaction (pp. 495-496). ACM.
	*/
	const author = formatAuthor(getAuthor(bibtex), false, true);
	const title = getTitle(bibtex);
	const pages = getPages(bibtex, true);
	let publisher = getPublisher(bibtex);
	publisher = publisher !== "" ? ". " + publisher : "";
	const booktitle = getBookTitle(bibtex);
	let address = getAddress(bibtex);
	address = address !== "" ? ". " + address : "";

	return author + " (" + bibtex['entryTags']['year'] + "). " + title + ". " + booktitle
		+ pages + publisher + address + ".";
};


export const getHarvardCitation = (bibtex) => {
	/*
	Returns a string with the Harvard Citation style of the given bibtex

	Example:
		Hastie, H., Garcia, F.J.C., Robb, D.A., Patron, P. and Laskov, A., 2017, November. MIRIAM: a
		multimodal chat-based interface for autonomous systems. In Proceedings of the 19th ACM International
		Conference on Multimodal Interaction (pp. 495-496). ACM.
	*/
	const author = formatAuthor(getAuthor(bibtex), false, true);
	const title = getTitle(bibtex);
	const pages = getPages(bibtex, true);
	let publisher = getPublisher(bibtex);
	publisher = publisher !== "" ? ". " + publisher : "";
	const booktitle = getBookTitle(bibtex);
	let address = getAddress(bibtex);
	address = address !== "" ? ". " + address : "";

	return author + ", " + bibtex['entryTags']['year'] + ". " + title + ". " + booktitle
		+ pages + publisher + address + ".";
};


export const getChicagoCitation = (bibtex) => {
	/*
	Returns a string with the Chicago Citation style of the given bibtex

	Example:
		Hastie, Helen, Francisco Javier Chiyah Garcia, David A. Robb, Pedro Patron, and Atanas Laskov.
		"MIRIAM: a multimodal chat-based interface for autonomous systems." In Proceedings of the 19th ACM
		International Conference on Multimodal Interaction, pp. 495-496. ACM, 2017.
	*/
	const author = formatAuthor(getAuthor(bibtex), true, false, true);
	const title = getTitle(bibtex);
	let pages = getPages(bibtex, false);
	pages = pages !== "" ? ", " + pages : "";
	let publisher = getPublisher(bibtex);
	publisher = publisher !== "" ? " " + publisher + "," : "";
	const booktitle = getBookTitle(bibtex);
	let address = getAddress(bibtex);
	address = address !== "" ? ", " + address + "." : "";

	return author + ". \"" + title + "\". " + booktitle
		+ pages + address + publisher + " " + bibtex['entryTags']['year'] + ".";
};


export const getBibtexHTML = (bibtex) => {
	/*
	Returns a string in HTML of the given bibtex object
	*/
	let bibtexString = BibtexParser.toBibtex([bibtex], false);
	bibtexString = replaceAll(bibtexString, "\n", "<br/>");

	while (bibtexString.endsWith("<br/>")) {
		bibtexString = bibtexString.substring(0, bibtexString.length - 5);
	}
	return replaceAll(bibtexString, "    ", "&nbsp;&nbsp;&nbsp;&nbsp;");
};


export function getAuthor(bibtex) {
	const authorString = bibtex['entryTags']['author'] || bibtex['entryTags']['editor'];

	if (authorString === undefined) {
		return [];
	}

	return authorString.split(" and ");
}


export function formatAuthor(authorArray, showFirstName = true, putSurnameFirst = true, firstAuthorBySurname = null) {
	if (!putSurnameFirst && firstAuthorBySurname === null) {
		throw new Error("You should define whether firstAuthorBySurname is true or false")
	}
	if (firstAuthorBySurname) {
		// modify first entry so the first author shows by surname first
		let tmp = authorArray[0].split(", ");
		authorArray[0] = tmp[1] + ", " + tmp[0] + ",";

		// add "and" to the last author
		let tmp2 = authorArray[authorArray.length-1].split(", ");
		authorArray[authorArray.length-1] = tmp2[0] + ", and " + tmp2[1];
	} else {
		// add "and" to the last author
		authorArray[authorArray.length-1] = "and " + authorArray[authorArray.length-1];
	}

	return authorArray.map((entry) => {
		// replace some characters
		//  todo: fix these replaces
		// eslint-disable-next-line no-useless-escape
		let author = replaceAll(entry, "{\\'e}", "é");
		// eslint-disable-next-line no-useless-escape
		author = replaceAll(author, "\\'{e}", "é");
		author = replaceAll(author, "\\'{o}", "ó");
		author = replaceAll(author, "\\`{E}", "É");
		author = replaceAll(author, "{\\'i}", "í");
		author = replaceAll(author, "\\'{\\i}", "í");
		author = author.split(", ");

		let name;
		if (showFirstName) {
			name = author[1];
		} else {
			const nameArray = author[1].split(" ");
			name = nameArray.map((n) => {
				return n[0] + ".";
			}).join(" ");
		}
		return putSurnameFirst ? author[0] + ", " + name : name + " " + author[0];
	}).join(", ");
}


export function getTitle(bibtex) {
	let title = bibtex['entryTags']['title'];

	if (title === undefined) {
		throw new Error("Publication title cannot be empty: " + bibtex);

	} else {
		title = replaceAll(title, "{", "");
		title = replaceAll(title, "}", "");
		return title;
	}
}


function getPages(bibtex, brackets = true) {
	let pages = bibtex['entryTags']['pages'];

	if (pages === undefined) {
		return "";

	} else {
		pages = replaceAll(pages, "--", "-");
		return brackets ? " (pp. " + pages + ")" : "pp. " + pages;
	}
}

function getPublisher(bibtex) {
	const publisher = bibtex['entryTags']['publisher'];

	if (publisher === undefined) {
		return "";

	} else {
		return publisher;
	}
}


export function getBookTitle(bibtex) {
	let booktitle = bibtex['entryTags']['booktitle'];

	if (booktitle === undefined) {
		return "";

	} else {
		booktitle = "In " + booktitle;
	}

	const series = bibtex['entryTags']['series'];

	if (series !== undefined) {
		booktitle += ", " + series;
	}

	return booktitle;
}

function getAddress(bibtex) {
	const address = bibtex['entryTags']['address'];

	if (address === undefined) {
		return "";

	} else {
		return address;
	}
}


function escapeRegExp(str) {
	// eslint-disable-next-line
	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}


function replaceAll(str, find, replace) {
	return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
