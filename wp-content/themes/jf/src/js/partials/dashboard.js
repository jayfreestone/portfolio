let dashboard = (function () {
	let headerSection = document.querySelector('.dashboard__header');
	let scrollSection = document.querySelector('.dashboard__site-scroll');
	let groundSection = document.querySelector('.dashboard__groundwork');

	function init() {
		intro();
		bindUIActions();
	}

	function bindUIActions() {
		// Init controller
		let controller = new ScrollMagic.Controller();

		// Add scenes
		addScene(controller, scrollSection, siteScroll);
		addScene(controller, groundSection, reactAnimation);
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

	// Intro/Header animation
	function intro() {
		let tl = new TimelineMax({ delay: 0.5 });
		let image = headerSection.querySelector('img');

		tl.from(image, 1, { y: '20%'})
		  .to(image, 1, { opacity: 1 });
	}

	// Scrolling site image animation
	function siteScroll() {
		let scrollInner = scrollSection.querySelector('.dashboard__site-scroll__inner');

		let tl = new TimelineMax({ delay: 2 });

		tl.set(scrollInner, { height: 'auto' })
		.from(scrollInner, 3, { height: '20rem', ease: Power2.easeOut });

		setTimeout(function () {
			tl.reverse(3);
		}, 6000);
	}

	// React Logo Animation
	function reactAnimation() {
		let tl = new TimelineMax();

		let logo = groundSection.querySelector('svg');
		let paths = logo.querySelectorAll('path');

		for (let i = 0; i < paths.length; i ++) {
			setDash(paths[i]);
		}

		tl.to(paths, 3, { 'stroke-dashoffset': 0, opacity: '1', ease: Power1.easeIn })
		.to(paths, 1, { 'fill': '#00d8ff', 'stroke': '#00d8ff', ease: Power1.easeIn });
	}

	// Sets Dash array/offset on element
	function setDash(path) {
		let length = path.getTotalLength();
		path.style['stroke-dashoffset'] = length;
		path.style['stroke-dasharray'] = length;
	}

	return {
		init: init
	};
}());

export default dashboard;
