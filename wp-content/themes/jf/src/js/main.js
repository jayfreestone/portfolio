import primelabs from './partials/primelabs.js';
import menu from './partials/menu.js';
import homeScroll from './partials/homeScroll.js';
import journalNav from './partials/journalNav.js';
import dashboard from './partials/dashboard.js';
import header from './partials/header.js';

document.addEventListener('DOMContentLoaded', function () {
	menu.init();

	if (document.querySelector('.l-siteheader--white')) {
		header.init();
	}

	if (document.querySelector('.work-preview')) {
		homeScroll.init();
	}

	if (document.querySelector('.prime-labs')) {
		primelabs.init();
	}

	if (document.querySelector('.dashboard')) {
		dashboard.init();
	}

	if (document.querySelector('.journal-single')) {
		journalNav.init();
	}
});
