import fadeBackgroundImage from './fadeBackgroundImage.js';

let dashboard = (function () {
	let groundSection = document.querySelector('.dashboard__groundwork');
	let deploymentSection = document.querySelector('.dashboard__deployment');

	function init() {
		bindUIActions();
	}

	function bindUIActions() {
		// Init controller
		let controller = new ScrollMagic.Controller();

		// Add scenes
		addScene(controller, groundSection, reactAnimation);
		addScene(controller, deploymentSection, terminalAnimation);
	}

	function terminalAnimation() {
		let codeWindow = deploymentSection.querySelector('.dashboard__terminal code');

		// let code = document.createElement('code');
		// let codeNode = codeWindow.appendChild(code);

		writeString('cap staging deploy', codeWindow);

	}

	function writeString(stringToType, placeToType) {
		let i = 0;

		(function writeChar() {
			if (stringToType.length > i) {
				placeToType.innerHTML = placeToType.innerHTML + stringToType[i];
				i++;

				let delay = Math.floor(Math.random() * (100)) + 140;

				setTimeout(function(){
					writeChar();
				}, delay);
			}
		})()
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
