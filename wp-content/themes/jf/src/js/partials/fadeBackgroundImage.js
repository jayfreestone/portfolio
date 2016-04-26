/**
 * Fades in a background image once loaded
 */
let fadeBackgroundImage = (function () {
	function fade(image) {
		let backgroundStyle = window.getComputedStyle(image)['background-image'];
		let backgroundImage = backgroundStyle.match(/\"(.*?)\"/)[0];
		let imageTemp = document.createElement('img');
		imageTemp.src = backgroundImage.replace(/"/g, '');

		imageTemp.addEventListener('load', function() {
			image.classList.remove('is-hidden');
		});
	}

	return {
		fade: fade
	}
}());
export default fadeBackgroundImage;
