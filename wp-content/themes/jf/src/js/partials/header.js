let header = (function () {
	let header = document.querySelector('.l-siteheader');
	let intro = document.querySelector('.dashboard__setup');

	function init() {
		if (intro) {

			// init controller
			var controller = new ScrollMagic.Controller();

			// create a scene
			new ScrollMagic.Scene({
				triggerElement: intro,
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
