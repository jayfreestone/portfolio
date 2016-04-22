let primelabs = (function () {
	// Init controller
	let controller = new ScrollMagic.Controller();

	let problemSection = document.querySelector('.prime-labs__section--problems');
	let modularSection = document.querySelector('.prime-labs__section--modular-boxes');
	let standardSection = document.querySelector('.prime-labs__section--as-standard');

	function init() {
		bindUIActions();
	}

	function bindUIActions() {
		addScene(controller, problemSection, problemHandler);
		addScene(controller, modularSection, modularHandler);
		addScene(controller, standardSection, standardHandler);
	}

	// Adds a scene with predefined options to the controller
	function addScene(controller, element, handler) {
		let options = {
			triggerElement: element,
			offset: 50,
			reverse: false
		};

		new ScrollMagic.Scene(options).on('start', handler).addTo(controller);
	}

	function problemHandler() {
		problemSection.classList.add('prime-labs__section--problems--is-active');
	}

	function modularHandler() {
		modularSection.classList.add('prime-labs__section--modular-boxes--is-active');
	}

	function standardHandler() {
		document.querySelector('.prime-labs__video').play();
	}

	return {
		init: init
	};
}());

export default primelabs;
