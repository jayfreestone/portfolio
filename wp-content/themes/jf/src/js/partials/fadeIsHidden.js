import fadeBackgroundImage from './fadeBackgroundImage.js';

let fadeIsHidden = (function () {
	function init() {
		let isHidden = document.querySelectorAll('.is-hidden');

		for (let i = 0; i < isHidden.length; i++) {
			fadeBackgroundImage.fade(isHidden[i]);
		}
	}

	return {
		init: init
	}
})();

export default fadeIsHidden;
