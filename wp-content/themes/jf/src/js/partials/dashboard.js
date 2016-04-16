let dashboard = (function () {
	let headerSection = document.querySelector('.dashboard__header');
	let processSection = document.querySelector('.dashboard__process');
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
		addScene(controller, processSection, animationProcess);
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

		tl.from(image, 1, { y: '20%', opacity: 0 });
	}

	// Pipeline/process animation
	function animationProcess() {
		let tl = new TimelineMax();
		let inner = document.querySelector('.dashboard__process__inner');

		// Figures
		let local = document.querySelector('.dashboard__figure--local');
		let remote = document.querySelector('.dashboard__figure--remote');
		let git = document.querySelector('.dashboard__figure--git');
		let files = document.querySelector('.dashboard__figure--files');
		let release = document.querySelector('.dashboard__figure--release');

		// Connectors
		let connectorCap = document.querySelector('.dashboard__connector--capistrano');
		let connectorGit = document.querySelector('.dashboard__connector--git');
		let connectorFiles = document.querySelector('.dashboard__connector--files');
		let connectorReleases = document.querySelector('.dashboard__connector--releases');

		// Animation
		addFigure(local);
		setActive(local);
		addLine(connectorCap, 'connectorCap');
		addFigure(remote, 'pulseCap');
		sendPulse(connectorCap, 'pulseCap');
		setActive(remote);
		addLine(connectorGit, 'connectorGit');
		addFigure(git);
		sendPulse(connectorGit, 'pulseGit');
		setActive(git);
		sendPulse(connectorGit, 'pulseGit', 'left');
		unsetActive(git);
		removeFigure(git);
		removeLine(connectorGit);
		addLine(connectorFiles, 'connectorFiles');
		addFigure(files);
		addLine(connectorReleases, 'connectorReleases');
		addFigure(release);

		// Helper functions
		function addFigure(figure) {
			tl.from(figure, 1, { width: 0 })
			.to(figure, 1, { opacity: 1 });
		}

		function removeFigure(figure) {
			tl.to(figure, 0.5, { opacity: 0 })
			.to(figure, 1, { width: '0', margin: 0, flex: 0 });
			// .set(figure, { position: 'absolute' });
		}

		function removeLine(connector) {
			tl.to(connector, 0.5, { opacity: 0 })
			.to(connector, 1, { width: '0', margin: 0, flex: 0 });
			// .set(connector, { position: 'absolute' });
		}

		function setActive(figure) {
			let path = figure.querySelector('path');
			tl.to(path, 0.5, { fill: '#9d0e12' });
		}

		function unsetActive(figure) {
			let path = figure.querySelector('path');
			tl.to(path, 0.5, { fill: 'black' });
		}

		function addLine(connector, layer) {
			let line = connector.querySelector('.dashboard__connector__line');

			tl.to(connector, 1, { opacity: 1 }, layer)
			.from(connector, 1, { width: 0, y: -20 }, layer)
			.to(line, 1, { width: '100%' });

		}

		function sendPulse(connector, layer, direction = 'right') {
			let pulse = connector.querySelector('.dashboard__connector__pulse');

			if (direction === 'left') {
				tl.set(pulse, { left: '100%' })
				.to(pulse, 0.3, { opacity: 1 })
				.to(pulse, 2, { left: '0' })
				.to(pulse, 0.3, { opacity: 0 })
				.set(pulse, { left: '100%' });
			} else {
				tl.to(pulse, 0.3, { opacity: 1 })
				.to(pulse, 2, { left: '100%' })
				.to(pulse, 0.3, { opacity: 0 })
				.to(pulse, 0, { left: '0' });
			}
		}
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

		tl.to(paths, 5, { 'stroke-dashoffset': 0, opacity: '1', ease: Power1.easeIn })
		.to(paths, 3, { 'fill': '#00d8ff', 'stroke': '#00d8ff' });
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
