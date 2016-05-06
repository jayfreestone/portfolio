/**
 * Fades in a background image once loaded
 */
let fadeBackgroundImage = (function () {
	function fade(image) {
		let backgroundStyle = window.getComputedStyle(image)['background-image'];
		let imageTemp = document.createElement('img');

		if ( backgroundStyle !== 'none' ) {
			let backgroundImage = backgroundStyle.match(/\/\/([a-z0-9:\-\.\/]+)/)[0];
			imageTemp.src = backgroundImage.replace(/"/g, '');
			imageTemp.addEventListener('load', function() {
				image.classList.remove('is-hidden-bg');
			});
		} else {
			image.classList.remove('is-hidden-bg');
		}

	}

	return {
		fade: fade
	}
}());
export default fadeBackgroundImage;
