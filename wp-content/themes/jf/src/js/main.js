import primelabs from './partials/primelabs.js';
import menu from './partials/menu.js';
import homeScroll from './partials/homeScroll.js';
import journalNav from './partials/journalNav.js';

document.addEventListener('DOMContentLoaded', function () {
	menu.init();

	if (document.querySelector('.work-preview')) {
		homeScroll.init();
	}

	if (document.querySelector('.prime-labs')) {
		primelabs.init();
	}

	if (document.querySelector('.journal-single')) {
		journalNav.init();
	}
});
