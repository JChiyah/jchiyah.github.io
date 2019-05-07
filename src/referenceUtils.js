/*
	File with several utilities to handle references

	Author: Javier Chiyah Garcia, 2019
*/

import BibtexParser from "./bibtexParse";


export const getAPACitation = (bibtex) => {
	/*
	Returns a string with the APA Citation style of the given bibtex

	Example:
		Hastie, H., Garcia, F. J. C., Robb, D. A., Patron, P., & Laskov, A. (2017, November). MIRIAM: a
		multimodal chat-based interface for autonomous systems. In Proceedings of the 19th ACM International
		Conference on Multimodal Interaction (pp. 495-496). ACM.
	*/
	const author = formatAuthor(getAuthor(bibtex), false, true);
	const pages = getPages(bibtex, true);
	const publisher = getPublisher(bibtex);
	const booktitle = getBookTitle(bibtex);

	return author + " (" + bibtex['entryTags']['year'] + "). " + bibtex['entryTags']['title'] + ". " + booktitle
		+ pages + publisher;
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
	const pages = getPages(bibtex, true);
	const publisher = getPublisher(bibtex);
	const booktitle = getBookTitle(bibtex);

	return author + ", " + bibtex['entryTags']['year'] + ". " + bibtex['entryTags']['title'] + ". " + booktitle
		+ pages + publisher + ".";
};


export const getChicagoCitation = (bibtex) => {
	/*
	Returns a string with the Chicago Citation style of the given bibtex

	Example:
		Hastie, Helen, Francisco Javier Chiyah Garcia, David A. Robb, Pedro Patron, and Atanas Laskov.
		"MIRIAM: a multimodal chat-based interface for autonomous systems." In Proceedings of the 19th ACM
		International Conference on Multimodal Interaction, pp. 495-496. ACM, 2017.
	*/
	const author = formatAuthor(getAuthor(bibtex), true, false);
	let pages = getPages(bibtex, false);
	pages = pages !== "" ? ", " + pages : "";
	let publisher = getPublisher(bibtex);
	publisher = publisher !== "" ? publisher + "," : "";
	const booktitle = getBookTitle(bibtex);

	return author + ". \"" + bibtex['entryTags']['title'] + "\". " + booktitle
		+ pages + publisher + " " + bibtex['entryTags']['year'] + ".";
};


export const getBibtexHTML = (bibtex) => {
	/*
	Returns a string in HTML of the given bibtex object
	*/
	let bibtexString = BibtexParser.toBibtex([bibtex], false);
	bibtexString = replaceAll(bibtexString, "\n", "<br/>");

	while (bibtexString.endsWith("<br/>")) {
		bibtexString = bibtexString.substring(0, bibtexString.length - 6);
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


export function formatAuthor(authorArray, firstName = true, surnameFirst = true) {
	if (!surnameFirst) {
		// modify first entry so even if surnameFirst is false, the first author still shows by surname first
		let tmp = authorArray[0].split(", ");
		authorArray[0] = tmp[1] + ", " + tmp[0];

		// add "and" to the last author
		let tmp2 = authorArray[authorArray.length-1].split(", ");
		authorArray[authorArray.length-1] = tmp2[0] + ", and " + tmp2[1];
	} else {
		// add "and" to the last author
		authorArray[authorArray.length-1] = "and " + authorArray[authorArray.length-1];
	}

	return authorArray.map((entry) => {
		const author = entry.split(", ");
		let name;
		if (firstName) {
			name = author[1];
		} else {
			const nameArray = author[1].split(" ");
			name = nameArray.map((n) => {
				return n[0] + ".";
			}).join(" ");
		}
		return surnameFirst ? author[0] + ", " + name : name + " " + author[0];
	}).join(", ");
}


function getPages(bibtex, brackets = true) {
	const pages = bibtex['entryTags']['pages'];

	if (pages === undefined) {
		return "";

	} else {
		return brackets ? " (pp. " + pages + ")" : pages;
	}
}

function getPublisher(bibtex) {
	const publisher = bibtex['entryTags']['publisher'];

	if (publisher === undefined) {
		return "";

	} else {
		return ". " + publisher;
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


function escapeRegExp(str) {
	// eslint-disable-next-line
	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}


function replaceAll(str, find, replace) {
	return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
