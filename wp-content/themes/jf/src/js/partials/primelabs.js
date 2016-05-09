let primelabs = (function () {
	// Init controller
	let controller = new ScrollMagic.Controller();

	let problemSection = document.querySelector('.prime-labs__section--problems');
	let standardSection = document.querySelector('.prime-labs__section--as-standard');
	let carouselSection = document.querySelector('.prime-labs__carousel');
	let backstorySection = document.querySelector('.prime-labs__backstory');

	function init() {
		bindUIActions();
	}

	function bindUIActions() {
		addScene(controller, backstorySection, backstoryHandler);
		addScene(controller, problemSection, problemHandler);
		addScene(controller, standardSection, standardHandler);
		addScene(controller, carouselSection, carouselHandler);
	}

	function backstoryHandler() {
		let tl = new TimelineMax({delay: 1});
		let logo = backstorySection.querySelector('#prime-labs__backstory__logo');
		let bubbleBottom = logo.querySelector('#bubbleBottom');
		let bubbleMiddle = logo.querySelector('#bubbleMiddle');
		let bubbleTop = logo.querySelector('#bubbleTop');

		tl.to(logo, 1, {opacity: 1, ease: Power1.easeIn})
		  .to(bubbleBottom, 1, {opacity: 1}, 'bottom')
		  .to(bubbleMiddle, 1, {opacity: 1}, 'middle')
		  .to(bubbleBottom, 1, {opacity: 0}, 'middle')
		  .to(bubbleTop, 1, {opacity: 1}, 'top')
		  .to(bubbleMiddle, 1, {opacity: 0}, 'top')
		  .to(bubbleMiddle, 1, {opacity: 1}, 'final')
		  .to(bubbleBottom, 1, {opacity: 1}, 'final');
	}

	function carouselHandler() {
		let tl = new TimelineMax({delay: 2, repeat: 1});
		let title = carouselSection.querySelector('.heading-1');

		tl.to(title, 3, {x: '150%', opacity: '0', ease: Power1.easeIn });
		tl.set(title, {x: '-150%'});
		tl.to(title, 3, {x: '0%', opacity: '1', ease: Power1.easeOut });
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

	function standardHandler() {
		document.querySelector('.prime-labs__video').play();
	}

	return {
		init: init
	};
}());

export default primelabs;
