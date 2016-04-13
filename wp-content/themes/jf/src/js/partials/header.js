let header = (function () {
	let header = document.querySelector('.l-siteheader');
	let main = document.querySelector('.site-main');

	function init() {
		if (main) {

			// init controller
			var controller = new ScrollMagic.Controller();

			// create a scene
			new ScrollMagic.Scene({
				triggerElement: main,
				triggerHook: 'onLeave',
			}).on('start', function () {
				toggleWhiteout();

			})
			.addTo(controller); // assign the scene to the controller
		}
	}

	function toggleWhiteout() {
		header.classList.toggle('l-siteheader--white');
	}


	return {
		init: init
	};
}());

export default header;
