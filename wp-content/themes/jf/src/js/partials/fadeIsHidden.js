/**
 * Fades in background images with 'is-hidden' class
 */
import fadeBackgroundImage from './fadeBackgroundImage.js';

let fadeIsHidden = (function () {
	function init() {
		let isHiddenAll = Array.from(document.querySelectorAll('.is-hidden-bg'));

		for (const isHidden of isHiddenAll) {
			fadeBackgroundImage.fade(isHidden);
		}
	}

	return {
		init: init
	}
})();

export default fadeIsHidden;
