/**
 * Fades in a background image once loaded
 */
let fadeBackgroundImage = (function () {
	function fade(image) {
		let backgroundStyle = window.getComputedStyle(image)['background-image'];
		console.log(backgroundStyle);
		let backgroundImage = backgroundStyle.match(/\/\/([a-z0-9\-\.\/]+)/)[0];
		let imageTemp = document.createElement('img');

		imageTemp.addEventListener('load', function() {
			image.classList.remove('is-hidden');
		});
	}

	return {
		fade: fade
	}
}());
export default fadeBackgroundImage;
