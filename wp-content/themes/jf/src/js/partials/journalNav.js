/**
 * Allows for left/right navigation in journal
 */
let journalNav = (function() {
	let previous = document.querySelector('.journal-single__navigation--previous a');
	let next = document.querySelector('.journal-single__navigation--next a');

	function init() {
		bindUIEvents();
	}

	function bindUIEvents() {
		window.addEventListener('keydown', keyboardNav);
	}

	function keyboardNav(event) {
		switch (event.keyCode) {
			case 37:
				if (previous) {
					goToLink( previous.href );
				}
				break;
			case 39:
				if (next) {
					goToLink( next.href );
				}
				break;
		}
	}

	function goToLink(link) {
		window.location.href = link;
	}

	function handleNav(event) {
		event.preventDefault();
	}

	return {
		init: init
	}
}());

export default journalNav;
