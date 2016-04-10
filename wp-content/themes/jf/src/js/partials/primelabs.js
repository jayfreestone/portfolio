import waypoints from './../../../node_modules/waypoints/lib/noframework.waypoints.min.js';

let primelabs = (function () {
	let problemSection = document.querySelector('.prime-labs__section--problems');
	let modularSection = document.querySelector('.prime-labs__section--modular-boxes');
	let standardSection = document.querySelector('.prime-labs__section--as-standard');

	function init() {

		let problems = new Waypoint({
			element: problemSection,
			offset: '50%',
			handler: function (direction) {
				problemSection.classList.add('prime-labs__section--problems--is-active');
			}
		});

		let modular = new Waypoint({
			element: modularSection,
			offset: '60%',
			handler: function(direction) {
				modularSection.classList.add('prime-labs__section--modular-boxes--is-active');
			}
		});

		let standard = new Waypoint({
			element: standardSection,
			offset: '50%',
			handler: function(direction) {
				document.querySelector('.prime-labs__video').play();
			}
		});

	}

	return {
		init: init
	};
}());

export default primelabs;
