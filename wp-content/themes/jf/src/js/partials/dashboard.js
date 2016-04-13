let dashboard = (function () {
	let processSection = document.querySelector('.dashboard__process');
	let scrollSection = document.querySelector('.dashboard__site-scroll');

	function init() {

		// init controller
		var controller = new ScrollMagic.Controller();

		// create a scene
		new ScrollMagic.Scene({
			triggerElement: processSection,
			offset: 50,
			reverse: false
		}).on('start', function () {
			animationProcess();
		})
		.addTo(controller); // assign the scene to the controller

		// create a scene
		new ScrollMagic.Scene({
			triggerElement: scrollSection,
			offset: 50,
			reverse: false
		}).on('start', function () {
			siteScroll();
		})
		.addTo(controller); // assign the scene to the controller

	}

	function siteScroll() {
		let image = scrollSection.querySelector('img');
	}

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


	return {
		init: init
	};
}());

export default dashboard;
