// The icons public/activities.json can refer to by name ("icon": "faRobot").
// Timeline looks names up here, so only these icons are bundled; importing the
// whole solid and brand sets to look names up instead adds ~1.6 MB of JavaScript.
//
// To use a new icon in activities.json, add it here. src/icons.test.js fails
// with the missing name if you forget.
import {
	faAward,
	faBagShopping,
	faBookReader,
	faCartShopping,
	faChalkboardTeacher,
	faCode,
	faIndustry,
	faLaptopCode,
	faPersonChalkboard,
	faRobot,
	faSchool,
	faTasks,
	faTrophy,
	faUniversity,
	faUserFriends,
	faUserGraduate,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { faAmazon } from '@fortawesome/free-brands-svg-icons';

const timelineIcons = {
	faAmazon,
	faAward,
	faBagShopping,
	faBookReader,
	faCartShopping,
	faChalkboardTeacher,
	faCode,
	faIndustry,
	faLaptopCode,
	faPersonChalkboard,
	faRobot,
	faSchool,
	faTasks,
	faTrophy,
	faUniversity,
	faUserFriends,
	faUserGraduate,
	faUsers,
};

export default timelineIcons;
