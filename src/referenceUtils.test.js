
import {getAPACitation, getHarvardCitation, getChicagoCitation, getBibtexHTML} from './referenceUtils';
import BibtexParser from "./bibtexParse";


const bibtexCite = `
@inproceedings{ChiyahINLG18,
    title = {Explainable Autonomy: A Study of Explanation Styles for Building Clear Mental Models},
    author = {Chiyah Garcia, Francisco J. and Robb, David A. and Laskov, Atanas and Liu, Xingkun and Patron, Pedro and Hastie, Helen},
    booktitle = {Proceedings of The 11th International Natural Language Generation Conference},
    series = {INLG'18},
    year = {2018},
    month = {11},
    pages = {99–-108},
    address = {Tilburg, The Netherlands},
    type = {Conference Proceedings},
    publisher = {ACM},
    url = {http://www.aclweb.org/anthology/W18-65#page=119}
}`;

const styleAPA = `Chiyah Garcia, F. J., Robb, D. A., Laskov, A., Liu, X., Patron, P., and Hastie, H. (2018). Explainable Autonomy: A Study of Explanation Styles for Building Clear Mental Models. In Proceedings of The 11th International Natural Language Generation Conference, INLG'18 (pp. 99–-108). ACM. Tilburg, The Netherlands.`;
const styleHarvard = `Chiyah Garcia, F. J., Robb, D. A., Laskov, A., Liu, X., Patron, P., and Hastie, H., 2018. Explainable Autonomy: A Study of Explanation Styles for Building Clear Mental Models. In Proceedings of The 11th International Natural Language Generation Conference, INLG'18 (pp. 99–-108). ACM. Tilburg, The Netherlands.`;
const styleChicago = `Chiyah Garcia, Francisco J., David A. Robb, Atanas Laskov, Xingkun Liu, Pedro Patron, and Helen Hastie. "Explainable Autonomy: A Study of Explanation Styles for Building Clear Mental Models". In Proceedings of The 11th International Natural Language Generation Conference, INLG'18, pp. 99–-108, Tilburg, The Netherlands. ACM, 2018.`;
const styleHTML = `@inproceedings{ChiyahINLG18,<br/>&nbsp;&nbsp;&nbsp;&nbsp;title = {Explainable Autonomy: A Study of Explanation Styles for Building Clear Mental Models},<br/>&nbsp;&nbsp;&nbsp;&nbsp;author = {Chiyah Garcia, Francisco J. and Robb, David A. and Laskov, Atanas and Liu, Xingkun and Patron, Pedro and Hastie, Helen},<br/>&nbsp;&nbsp;&nbsp;&nbsp;booktitle = {Proceedings of The 11th International Natural Language Generation Conference},<br/>&nbsp;&nbsp;&nbsp;&nbsp;series = {INLG'18},<br/>&nbsp;&nbsp;&nbsp;&nbsp;year = {2018},<br/>&nbsp;&nbsp;&nbsp;&nbsp;month = {11},<br/>&nbsp;&nbsp;&nbsp;&nbsp;pages = {99–-108},<br/>&nbsp;&nbsp;&nbsp;&nbsp;address = {Tilburg, The Netherlands},<br/>&nbsp;&nbsp;&nbsp;&nbsp;type = {Conference Proceedings},<br/>&nbsp;&nbsp;&nbsp;&nbsp;publisher = {ACM},<br/>&nbsp;&nbsp;&nbsp;&nbsp;url = {http://www.aclweb.org/anthology/W18-65#page=119}<br/>}`;


test('citation_styles', () => {
	const cite = BibtexParser.toJSON(bibtexCite)[0];

	expect(getAPACitation(cite)).toEqual(styleAPA);
	expect(getHarvardCitation(cite)).toEqual(styleHarvard);
	expect(getChicagoCitation(cite)).toEqual(styleChicago);
	expect(getBibtexHTML(cite)).toEqual(styleHTML);
});
