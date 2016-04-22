(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _primelabs = require('./partials/primelabs.js');

var _primelabs2 = _interopRequireDefault(_primelabs);

var _menu = require('./partials/menu.js');

var _menu2 = _interopRequireDefault(_menu);

var _homeScroll = require('./partials/homeScroll.js');

var _homeScroll2 = _interopRequireDefault(_homeScroll);

var _journalNav = require('./partials/journalNav.js');

var _journalNav2 = _interopRequireDefault(_journalNav);

var _dashboard = require('./partials/dashboard.js');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _header = require('./partials/header.js');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
	_menu2.default.init();

	if (document.querySelector('.l-siteheader--white')) {
		_header2.default.init();
	}

	if (document.querySelector('.work-preview')) {
		_homeScroll2.default.init();
	}

	if (document.querySelector('.prime-labs')) {
		_primelabs2.default.init();
	}

	if (document.querySelector('.dashboard')) {
		_dashboard2.default.init();
	}

	if (document.querySelector('.journal-single')) {
		_journalNav2.default.init();
	}
});

},{"./partials/dashboard.js":2,"./partials/header.js":3,"./partials/homeScroll.js":4,"./partials/journalNav.js":5,"./partials/menu.js":6,"./partials/primelabs.js":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var dashboard = function () {
	var headerSection = document.querySelector('.dashboard__header');
	var processSection = document.querySelector('.dashboard__process');
	var scrollSection = document.querySelector('.dashboard__site-scroll');
	var groundSection = document.querySelector('.dashboard__groundwork');

	function init() {
		intro();
		bindUIActions();
	}

	function bindUIActions() {
		// Init controller
		var controller = new ScrollMagic.Controller();

		// Add scenes
		addScene(controller, processSection, animationProcess);
		addScene(controller, scrollSection, siteScroll);
		addScene(controller, groundSection, reactAnimation);
	}

	// Adds a scene with predefined options to the controller
	function addScene(controller, element, handler) {
		var options = {
			triggerElement: element,
			offset: 50,
			reverse: false
		};

		new ScrollMagic.Scene(options).on('start', handler).addTo(controller);
	}

	// Intro/Header animation
	function intro() {
		var tl = new TimelineMax({ delay: 0.5 });
		var image = headerSection.querySelector('img');

		tl.from(image, 1, { y: '20%', opacity: 0 });
	}

	// Pipeline/process animation
	function animationProcess() {
		var tl = new TimelineMax();
		var inner = document.querySelector('.dashboard__process__inner');

		// Figures
		var local = document.querySelector('.dashboard__figure--local');
		var remote = document.querySelector('.dashboard__figure--remote');
		var git = document.querySelector('.dashboard__figure--git');
		var files = document.querySelector('.dashboard__figure--files');
		var release = document.querySelector('.dashboard__figure--release');

		// Connectors
		var connectorCap = document.querySelector('.dashboard__connector--capistrano');
		var connectorGit = document.querySelector('.dashboard__connector--git');
		var connectorFiles = document.querySelector('.dashboard__connector--files');
		var connectorReleases = document.querySelector('.dashboard__connector--releases');

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
			tl.from(figure, 1, { width: 0 }).to(figure, 1, { opacity: 1 });
		}

		function removeFigure(figure) {
			tl.to(figure, 0.5, { opacity: 0 }).to(figure, 1, { width: '0', margin: 0, flex: 0 });
			// .set(figure, { position: 'absolute' });
		}

		function removeLine(connector) {
			tl.to(connector, 0.5, { opacity: 0 }).to(connector, 1, { width: '0', margin: 0, flex: 0 });
			// .set(connector, { position: 'absolute' });
		}

		function setActive(figure) {
			var path = figure.querySelector('path');
			tl.to(path, 0.5, { fill: '#9d0e12' });
		}

		function unsetActive(figure) {
			var path = figure.querySelector('path');
			tl.to(path, 0.5, { fill: 'black' });
		}

		function addLine(connector, layer) {
			var line = connector.querySelector('.dashboard__connector__line');

			tl.to(connector, 1, { opacity: 1 }, layer).from(connector, 1, { width: 0, y: -20 }, layer).to(line, 1, { width: '100%' });
		}

		function sendPulse(connector, layer) {
			var direction = arguments.length <= 2 || arguments[2] === undefined ? 'right' : arguments[2];

			var pulse = connector.querySelector('.dashboard__connector__pulse');

			if (direction === 'left') {
				tl.set(pulse, { left: '100%' }).to(pulse, 0.3, { opacity: 1 }).to(pulse, 2, { left: '0' }).to(pulse, 0.3, { opacity: 0 }).set(pulse, { left: '100%' });
			} else {
				tl.to(pulse, 0.3, { opacity: 1 }).to(pulse, 2, { left: '100%' }).to(pulse, 0.3, { opacity: 0 }).to(pulse, 0, { left: '0' });
			}
		}
	}

	// Scrolling site image animation
	function siteScroll() {
		var scrollInner = scrollSection.querySelector('.dashboard__site-scroll__inner');

		var tl = new TimelineMax({ delay: 2 });

		tl.set(scrollInner, { height: 'auto' }).from(scrollInner, 3, { height: '20rem', ease: Power2.easeOut });

		setTimeout(function () {
			tl.reverse(3);
		}, 6000);
	}

	// React Logo Animation
	function reactAnimation() {
		var tl = new TimelineMax();

		var logo = groundSection.querySelector('svg');
		var paths = logo.querySelectorAll('path');

		for (var i = 0; i < paths.length; i++) {
			setDash(paths[i]);
		}

		tl.to(paths, 3, { 'stroke-dashoffset': 0, opacity: '1', ease: Power1.easeIn }).to(paths, 1, { 'fill': '#00d8ff', 'stroke': '#00d8ff', ease: Power1.easeIn });
	}

	// Sets Dash array/offset on element
	function setDash(path) {
		var length = path.getTotalLength();
		path.style['stroke-dashoffset'] = length;
		path.style['stroke-dasharray'] = length;
	}

	return {
		init: init
	};
}();

exports.default = dashboard;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var header = function () {
	var header = document.querySelector('.l-siteheader');
	var main = document.querySelector('.site-main');

	function init() {
		if (main) {

			// init controller
			var controller = new ScrollMagic.Controller();

			// create a scene
			new ScrollMagic.Scene({
				triggerElement: main,
				triggerHook: 'onLeave'
			}).on('start', function () {
				toggleWhiteout();
			}).addTo(controller); // assign the scene to the controller
		}
	}

	function toggleWhiteout() {
		header.classList.toggle('l-siteheader--white');
	}

	return {
		init: init
	};
}();

exports.default = header;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var homeScroll = function () {
	var navItems = void 0;
	var delta = 0;
	var currentSlide = void 0;
	var nextSlide = void 0;
	var previousSlide = void 0;
	var previousSlides = void 0;
	var isTransitioning = false;
	var lastScrolled = void 0;
	var mousewheelCanScroll = true;
	var lastMousewheelTime = new Date().getTime();
	var lastScrollTime = new Date().getTime();
	var scrolls = [];
	var nav = document.querySelector('.work-preview-container__nav');
	var workSlides = Array.prototype.slice.call(document.querySelectorAll('.work-preview'));

	function init() {
		if (nav) {
			navItems = nav.querySelectorAll('a');
		}
		animateInitial();
		bindUIEvents();
	}

	function resetScroll() {
		scrolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	}

	function scrollsAvg(offset) {
		var sum = 0;

		var elms = scrolls.slice(Math.max(scrolls.length - offset, 1));

		for (var i = 0; i < elms.length; i++) {
			sum += elms[i];
		}

		return Math.ceil(sum / offset);
	}

	function animateInitial() {
		setTimeout(function () {
			var firstWork = document.querySelector('.work-preview--1');
			firstWork.classList.add('work-preview--current');
			navItems[0].parentNode.classList.add('work-preview-container__nav__item--is-active');
		}, 200);
	}

	function bindUIEvents() {
		window.addEventListener('keydown', keyboardNav);
		window.addEventListener('wheel', scrollNav);

		// Stops touchmove working outright
		window.addEventListener('touchmove', function (event) {
			event.preventDefault();
		});

		// Sets up Hammer to handle touch events
		var workContainer = document.querySelector('.work-preview-container');
		var touch = new Hammer(workContainer);

		// Enables vertical swipe detection
		touch.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

		// Gestures that equal forward
		touch.on('swipeup swipeleft', function () {
			if (isTransitioning == false) {
				advanceSlide();
			}
		});

		// Gestures that equal backwards
		touch.on('swipedown swiperight', function () {
			if (isTransitioning == false) {
				regressSlide();
			}
		});

		// Hooks up navigation
		for (var i = 0; i < navItems.length; i++) {
			navItems[i].addEventListener('click', handleNav);
		}
	}

	function handleNav(event) {
		event.preventDefault();
		var slideNumber = event.target.innerHTML.substring(1);

		if (isTransitioning == false) {
			goToSlide(slideNumber);
		}
	}

	function highlightActiveNav() {
		// Remove the active class
		var activeNavClass = 'work-preview-container__nav__item--is-active';
		var activeNavItem = document.querySelector('.' + activeNavClass);
		activeNavItem.classList.remove(activeNavClass);

		var nextNumber = nextSlide.id.substring(nextSlide.id.length - 1);
		console.log(nextNumber);

		navItems[nextNumber - 1].parentNode.classList.add(activeNavClass);
	}

	function goToSlide(slideNumber) {
		nextSlide = document.querySelector('.work-preview--' + slideNumber);
		currentSlide = document.querySelector('.work-preview--current');

		if (nextSlide) {
			resetTransitioning();
			highlightActiveNav();

			var currentNumber = currentSlide.id.substring(currentSlide.id.length - 1);
			var nextNumber = nextSlide.id.substring(nextSlide.id.length - 1);

			if (currentNumber > nextNumber) {
				console.log('going backwards');
				// If we're going backwards
				currentSlide.classList.add('work-preview--next');

				// Need to add next to ALL going forward
				var _previousSlides = workSlides.slice(nextNumber, currentNumber - 1);

				for (var i = 0; i < _previousSlides.length; i++) {
					_previousSlides[i].classList.add('work-preview--next');
					_previousSlides[i].classList.remove('work-preview--previous');
				}
			} else {
				// If we're going forwards
				console.log('going forwards');
				currentSlide.classList.add('work-preview--previous');
			}

			currentSlide.classList.remove('work-preview--current');
			nextSlide.classList.add('work-preview--current');
			nextSlide.classList.remove('work-preview--next');
		}
	}

	function scrollNav(e) {
		e.preventDefault();

		var scrollThreshold = 40;

		var value = -e.deltaY;

		if (scrolls.length > 150) {
			scrolls.shift();
		}

		scrolls.push(Math.abs(value));

		var currTime = new Date().getTime();

		if (currTime - lastMousewheelTime > 200) {
			resetScroll();
		}

		lastMousewheelTime = currTime;

		var lastAvg = scrollsAvg(5);
		var midAvg = scrollsAvg(40);

		if (lastAvg > midAvg) {
			if (mousewheelCanScroll && isTransitioning == false) {
				mousewheelCanScroll = false;

				if (value < 0) {
					advanceSlide();
				} else {
					regressSlide();
				}
			}
		} else {
			mousewheelCanScroll = true;
		}
	}

	function keyboardNav(event) {
		switch (event.keyCode) {
			case 38:
				event.preventDefault();
				if (isTransitioning == false) {
					regressSlide();
				}
				break;
			case 40:
				event.preventDefault();
				if (isTransitioning == false) {
					advanceSlide();
				}
				break;
		}
	}

	function resetTransitioning() {
		isTransitioning = true;
		setTimeout(function () {
			isTransitioning = false;
		}, 1000);
	}

	function advanceSlide() {

		currentSlide = document.querySelector('.work-preview--current');
		nextSlide = document.querySelector('.work-preview--next');

		if (nextSlide) {
			highlightActiveNav();
			resetTransitioning();

			currentSlide.classList.add('work-preview--previous');
			currentSlide.classList.remove('work-preview--current');

			nextSlide.classList.add('work-preview--current');
			nextSlide.classList.remove('work-preview--next');
		}
	}

	function regressSlide() {
		currentSlide = document.querySelector('.work-preview--current');
		previousSlides = document.querySelectorAll('.work-preview--previous');
		previousSlide = previousSlides[previousSlides.length - 1];

		if (previousSlide) {
			// Sets next actual slide (not chronologically) to previous slide
			nextSlide = previousSlide;

			highlightActiveNav();
			resetTransitioning();

			currentSlide.classList.remove('work-preview--current');
			previousSlide.classList.add('work-preview--current');

			previousSlide.classList.remove('work-preview--previous');
			currentSlide.classList.add('work-preview--next');
		}
	}

	return {
		init: init
	};
}();

exports.default = homeScroll;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Allows for left/right navigation in journal
 */
var journalNav = function () {
	var previous = document.querySelector('.journal-single__navigation--previous a');
	var next = document.querySelector('.journal-single__navigation--next a');

	function init() {
		bindUIEvents();
	}

	function bindUIEvents() {
		window.addEventListener('keydown', keyboardNav);
	}

	function keyboardNav(event) {
		switch (event.keyCode) {
			case 37:
				if (previous) {
					goToLink(previous.href);
				}
				break;
			case 39:
				if (next) {
					goToLink(next.href);
				}
				break;
		}
	}

	function goToLink(link) {
		window.location.href = link;
	}

	function handleNav(event) {
		event.preventDefault();
	}

	return {
		init: init
	};
}();

exports.default = journalNav;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Handles mobile menu
 */
var menu = function () {
	var header = document.querySelector('.l-siteheader');
	var toggle = header.querySelector('.l-siteheader__menu-toggle');

	function init() {
		bindUIEvents();
	}

	function bindUIEvents() {
		toggle.addEventListener('click', function (event) {
			event.preventDefault();
			toggleMenu();
			changeText();
		});
	}

	function toggleMenu() {
		header.classList.toggle('l-siteheader--nav-is-open');
	}

	function changeText() {
		if (toggle.innerHTML == 'Menu') {
			toggle.innerHTML = 'Close';
		} else {
			toggle.innerHTML = 'Menu';
		}
	}

	return {
		init: init
	};
}();

exports.default = menu;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var primelabs = function () {
	// Init controller
	var controller = new ScrollMagic.Controller();

	var problemSection = document.querySelector('.prime-labs__section--problems');
	var modularSection = document.querySelector('.prime-labs__section--modular-boxes');
	var standardSection = document.querySelector('.prime-labs__section--as-standard');

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
		var options = {
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
}();

exports.default = primelabs;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYXJ0aWFscy9kYXNoYm9hcmQuanMiLCJzcmMvanMvcGFydGlhbHMvaGVhZGVyLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFZO0FBQ3pELGdCQUFLLElBQUwsR0FEeUQ7O0FBR3pELEtBQUksU0FBUyxhQUFULENBQXVCLHNCQUF2QixDQUFKLEVBQW9EO0FBQ25ELG1CQUFPLElBQVAsR0FEbUQ7RUFBcEQ7O0FBSUEsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBSixFQUE2QztBQUM1Qyx1QkFBVyxJQUFYLEdBRDRDO0VBQTdDOztBQUlBLEtBQUksU0FBUyxhQUFULENBQXVCLGFBQXZCLENBQUosRUFBMkM7QUFDMUMsc0JBQVUsSUFBVixHQUQwQztFQUEzQzs7QUFJQSxLQUFJLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFKLEVBQTBDO0FBQ3pDLHNCQUFVLElBQVYsR0FEeUM7RUFBMUM7O0FBSUEsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsaUJBQXZCLENBQUosRUFBK0M7QUFDOUMsdUJBQVcsSUFBWCxHQUQ4QztFQUEvQztDQW5CNkMsQ0FBOUM7Ozs7Ozs7O0FDUEEsSUFBSSxZQUFhLFlBQVk7QUFDNUIsS0FBSSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLG9CQUF2QixDQUFoQixDQUR3QjtBQUU1QixLQUFJLGlCQUFpQixTQUFTLGFBQVQsQ0FBdUIs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VCxHQUFnQjtBQUNmLGtCQURlO0VBQWhCOztBQUlBLFVBQVMsYUFBVCxHQUF5QjtBQUN4QixXQUFTLFVBQVQsRUFBcUIsY0FBckIsRUFBcUMsY0FBckMsRUFEd0I7QUFFeEIsV0FBUyxVQUFULEVBQXFCLGNBQXJCLEVBQXFDLGNBQXJDLEVBRndCO0FBR3hCLFdBQVMsVUFBVCxFQUFxQixlQUFyQixFQUFzQyxlQUF0QyxFQUh3QjtFQUF6Qjs7O0FBWjRCLFVBbUJuQixRQUFULENBQWtCLFVBQWxCLEVBQThCLE9BQTlCLEVBQXVDLE9BQXZDLEVBQWdEO0FBQy9DLE1BQUksVUFBVTtBQUNiLG1CQUFnQixPQUFoQjtBQUNBLFdBQVEsRUFBUjtBQUNBLFlBQVMsS0FBVDtHQUhHLENBRDJDOztBQU8vQyxNQUFJLFlBQVksS0FBWixDQUFrQixPQUF0QixFQUErQixFQUEvQixDQUFrQyxPQUFsQyxFQUEyQyxPQUEzQyxFQUFvRCxLQUFwRCxDQUEwRCxVQUExRCxFQVArQztFQUFoRDs7QUFVQSxVQUFTLGNBQVQsR0FBMEI7QUFDekIsaUJBQWUsU0FBZixDQUF5QixHQUF6QixDQUE2QiwwQ0FBN0IsRUFEeUI7RUFBMUI7O0FBSUEsVUFBUyxjQUFULEdBQTBCO0FBQ3pCLGlCQUFlLFNBQWYsQ0FBeUIsR0FBekIsQ0FBNkIsK0NBQTdCLEVBRHlCO0VBQTFCOztBQUlBLFVBQVMsZUFBVCxHQUEyQjtBQUMxQixXQUFTLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLElBQTdDLEdBRDBCO0VBQTNCOztBQUlBLFFBQU87QUFDTixRQUFNLElBQU47RUFERCxDQXpDNEI7Q0FBWixFQUFiOztrQkE4Q1ciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHByaW1lbGFicyBmcm9tICcuL3BhcnRpYWxzL3ByaW1lbGFicy5qcyc7XG5pbXBvcnQgbWVudSBmcm9tICcuL3BhcnRpYWxzL21lbnUuanMnO1xuaW1wb3J0IGhvbWVTY3JvbGwgZnJvbSAnLi9wYXJ0aWFscy9ob21lU2Nyb2xsLmpzJztcbmltcG9ydCBqb3VybmFsTmF2IGZyb20gJy4vcGFydGlhbHMvam91cm5hbE5hdi5qcyc7XG5pbXBvcnQgZGFzaGJvYXJkIGZyb20gJy4vcGFydGlhbHMvZGFzaGJvYXJkLmpzJztcbmltcG9ydCBoZWFkZXIgZnJvbSAnLi9wYXJ0aWFscy9oZWFkZXIuanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHRtZW51LmluaXQoKTtcblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlci0td2hpdGUnKSkge1xuXHRcdGhlYWRlci5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldycpKSB7XG5cdFx0aG9tZVNjcm9sbC5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnMnKSkge1xuXHRcdHByaW1lbGFicy5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZCcpKSB7XG5cdFx0ZGFzaGJvYXJkLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam91cm5hbC1zaW5nbGUnKSkge1xuXHRcdGpvdXJuYWxOYXYuaW5pdCgpO1xuXHR9XG59KTtcbiIsImxldCBkYXNoYm9hcmQgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgaGVhZGVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2hlYWRlcicpO1xuXHRsZXQgcHJvY2Vzc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19wcm9jZXNzJyk7XG5cdGxldCBzY3JvbGxTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fc2l0ZS1zY3JvbGwnKTtcblx0bGV0IGdyb3VuZFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19ncm91bmR3b3JrJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpbnRybygpO1xuXHRcdGJpbmRVSUFjdGlvbnMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUFjdGlvbnMoKSB7XG5cdFx0Ly8gSW5pdCBjb250cm9sbGVyXG5cdFx0bGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdFx0Ly8gQWRkIHNjZW5lc1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIHByb2Nlc3NTZWN0aW9uLCBhbmltYXRpb25Qcm9jZXNzKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBzY3JvbGxTZWN0aW9uLCBzaXRlU2Nyb2xsKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBncm91bmRTZWN0aW9uLCByZWFjdEFuaW1hdGlvbik7XG5cdH1cblxuXHQvLyBBZGRzIGEgc2NlbmUgd2l0aCBwcmVkZWZpbmVkIG9wdGlvbnMgdG8gdGhlIGNvbnRyb2xsZXJcblx0ZnVuY3Rpb24gYWRkU2NlbmUoY29udHJvbGxlciwgZWxlbWVudCwgaGFuZGxlcikge1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdFx0dHJpZ2dlckVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRvZmZzZXQ6IDUwLFxuXHRcdFx0cmV2ZXJzZTogZmFsc2Vcblx0XHR9O1xuXG5cdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKG9wdGlvbnMpLm9uKCdzdGFydCcsIGhhbmRsZXIpLmFkZFRvKGNvbnRyb2xsZXIpO1xuXHR9XG5cblx0Ly8gSW50cm8vSGVhZGVyIGFuaW1hdGlvblxuXHRmdW5jdGlvbiBpbnRybygpIHtcblx0XHRsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoeyBkZWxheTogMC41IH0pO1xuXHRcdGxldCBpbWFnZSA9IGhlYWRlclNlY3Rpb24ucXVlcnlTZWxlY3RvcignaW1nJyk7XG5cblx0XHR0bC5mcm9tKGltYWdlLCAxLCB7IHk6ICcyMCUnLCBvcGFjaXR5OiAwIH0pO1xuXHR9XG5cblx0Ly8gUGlwZWxpbmUvcHJvY2VzcyBhbmltYXRpb25cblx0ZnVuY3Rpb24gYW5pbWF0aW9uUHJvY2VzcygpIHtcblx0XHRsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcblx0XHRsZXQgaW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19wcm9jZXNzX19pbm5lcicpO1xuXG5cdFx0Ly8gRmlndXJlc1xuXHRcdGxldCBsb2NhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2ZpZ3VyZS0tbG9jYWwnKTtcblx0XHRsZXQgcmVtb3RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZmlndXJlLS1yZW1vdGUnKTtcblx0XHRsZXQgZ2l0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZmlndXJlLS1naXQnKTtcblx0XHRsZXQgZmlsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19maWd1cmUtLWZpbGVzJyk7XG5cdFx0bGV0IHJlbGVhc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19maWd1cmUtLXJlbGVhc2UnKTtcblxuXHRcdC8vIENvbm5lY3RvcnNcblx0XHRsZXQgY29ubmVjdG9yQ2FwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fY29ubmVjdG9yLS1jYXBpc3RyYW5vJyk7XG5cdFx0bGV0IGNvbm5lY3RvckdpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2Nvbm5lY3Rvci0tZ2l0Jyk7XG5cdFx0bGV0IGNvbm5lY3RvckZpbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fY29ubmVjdG9yLS1maWxlcycpO1xuXHRcdGxldCBjb25uZWN0b3JSZWxlYXNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2Nvbm5lY3Rvci0tcmVsZWFzZXMnKTtcblxuXHRcdC8vIEFuaW1hdGlvblxuXHRcdGFkZEZpZ3VyZShsb2NhbCk7XG5cdFx0c2V0QWN0aXZlKGxvY2FsKTtcblx0XHRhZGRMaW5lKGNvbm5lY3RvckNhcCwgJ2Nvbm5lY3RvckNhcCcpO1xuXHRcdGFkZEZpZ3VyZShyZW1vdGUsICdwdWxzZUNhcCcpO1xuXHRcdHNlbmRQdWxzZShjb25uZWN0b3JDYXAsICdwdWxzZUNhcCcpO1xuXHRcdHNldEFjdGl2ZShyZW1vdGUpO1xuXHRcdGFkZExpbmUoY29ubmVjdG9yR2l0LCAnY29ubmVjdG9yR2l0Jyk7XG5cdFx0YWRkRmlndXJlKGdpdCk7XG5cdFx0c2VuZFB1bHNlKGNvbm5lY3RvckdpdCwgJ3B1bHNlR2l0Jyk7XG5cdFx0c2V0QWN0aXZlKGdpdCk7XG5cdFx0c2VuZFB1bHNlKGNvbm5lY3RvckdpdCwgJ3B1bHNlR2l0JywgJ2xlZnQnKTtcblx0XHR1bnNldEFjdGl2ZShnaXQpO1xuXHRcdHJlbW92ZUZpZ3VyZShnaXQpO1xuXHRcdHJlbW92ZUxpbmUoY29ubmVjdG9yR2l0KTtcblx0XHRhZGRMaW5lKGNvbm5lY3RvckZpbGVzLCAnY29ubmVjdG9yRmlsZXMnKTtcblx0XHRhZGRGaWd1cmUoZmlsZXMpO1xuXHRcdGFkZExpbmUoY29ubmVjdG9yUmVsZWFzZXMsICdjb25uZWN0b3JSZWxlYXNlcycpO1xuXHRcdGFkZEZpZ3VyZShyZWxlYXNlKTtcblxuXHRcdC8vIEhlbHBlciBmdW5jdGlvbnNcblx0XHRmdW5jdGlvbiBhZGRGaWd1cmUoZmlndXJlKSB7XG5cdFx0XHR0bC5mcm9tKGZpZ3VyZSwgMSwgeyB3aWR0aDogMCB9KVxuXHRcdFx0LnRvKGZpZ3VyZSwgMSwgeyBvcGFjaXR5OiAxIH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJlbW92ZUZpZ3VyZShmaWd1cmUpIHtcblx0XHRcdHRsLnRvKGZpZ3VyZSwgMC41LCB7IG9wYWNpdHk6IDAgfSlcblx0XHRcdC50byhmaWd1cmUsIDEsIHsgd2lkdGg6ICcwJywgbWFyZ2luOiAwLCBmbGV4OiAwIH0pO1xuXHRcdFx0Ly8gLnNldChmaWd1cmUsIHsgcG9zaXRpb246ICdhYnNvbHV0ZScgfSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVtb3ZlTGluZShjb25uZWN0b3IpIHtcblx0XHRcdHRsLnRvKGNvbm5lY3RvciwgMC41LCB7IG9wYWNpdHk6IDAgfSlcblx0XHRcdC50byhjb25uZWN0b3IsIDEsIHsgd2lkdGg6ICcwJywgbWFyZ2luOiAwLCBmbGV4OiAwIH0pO1xuXHRcdFx0Ly8gLnNldChjb25uZWN0b3IsIHsgcG9zaXRpb246ICdhYnNvbHV0ZScgfSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0QWN0aXZlKGZpZ3VyZSkge1xuXHRcdFx0bGV0IHBhdGggPSBmaWd1cmUucXVlcnlTZWxlY3RvcigncGF0aCcpO1xuXHRcdFx0dGwudG8ocGF0aCwgMC41LCB7IGZpbGw6ICcjOWQwZTEyJyB9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1bnNldEFjdGl2ZShmaWd1cmUpIHtcblx0XHRcdGxldCBwYXRoID0gZmlndXJlLnF1ZXJ5U2VsZWN0b3IoJ3BhdGgnKTtcblx0XHRcdHRsLnRvKHBhdGgsIDAuNSwgeyBmaWxsOiAnYmxhY2snIH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGFkZExpbmUoY29ubmVjdG9yLCBsYXllcikge1xuXHRcdFx0bGV0IGxpbmUgPSBjb25uZWN0b3IucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fY29ubmVjdG9yX19saW5lJyk7XG5cblx0XHRcdHRsLnRvKGNvbm5lY3RvciwgMSwgeyBvcGFjaXR5OiAxIH0sIGxheWVyKVxuXHRcdFx0LmZyb20oY29ubmVjdG9yLCAxLCB7IHdpZHRoOiAwLCB5OiAtMjAgfSwgbGF5ZXIpXG5cdFx0XHQudG8obGluZSwgMSwgeyB3aWR0aDogJzEwMCUnIH0pO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2VuZFB1bHNlKGNvbm5lY3RvciwgbGF5ZXIsIGRpcmVjdGlvbiA9ICdyaWdodCcpIHtcblx0XHRcdGxldCBwdWxzZSA9IGNvbm5lY3Rvci5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19jb25uZWN0b3JfX3B1bHNlJyk7XG5cblx0XHRcdGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuXHRcdFx0XHR0bC5zZXQocHVsc2UsIHsgbGVmdDogJzEwMCUnIH0pXG5cdFx0XHRcdC50byhwdWxzZSwgMC4zLCB7IG9wYWNpdHk6IDEgfSlcblx0XHRcdFx0LnRvKHB1bHNlLCAyLCB7IGxlZnQ6ICcwJyB9KVxuXHRcdFx0XHQudG8ocHVsc2UsIDAuMywgeyBvcGFjaXR5OiAwIH0pXG5cdFx0XHRcdC5zZXQocHVsc2UsIHsgbGVmdDogJzEwMCUnIH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGwudG8ocHVsc2UsIDAuMywgeyBvcGFjaXR5OiAxIH0pXG5cdFx0XHRcdC50byhwdWxzZSwgMiwgeyBsZWZ0OiAnMTAwJScgfSlcblx0XHRcdFx0LnRvKHB1bHNlLCAwLjMsIHsgb3BhY2l0eTogMCB9KVxuXHRcdFx0XHQudG8ocHVsc2UsIDAsIHsgbGVmdDogJzAnIH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFNjcm9sbGluZyBzaXRlIGltYWdlIGFuaW1hdGlvblxuXHRmdW5jdGlvbiBzaXRlU2Nyb2xsKCkge1xuXHRcdGxldCBzY3JvbGxJbm5lciA9IHNjcm9sbFNlY3Rpb24ucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fc2l0ZS1zY3JvbGxfX2lubmVyJyk7XG5cblx0XHRsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoeyBkZWxheTogMiB9KTtcblxuXHRcdHRsLnNldChzY3JvbGxJbm5lciwgeyBoZWlnaHQ6ICdhdXRvJyB9KVxuXHRcdC5mcm9tKHNjcm9sbElubmVyLCAzLCB7IGhlaWdodDogJzIwcmVtJywgZWFzZTogUG93ZXIyLmVhc2VPdXQgfSk7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdHRsLnJldmVyc2UoMyk7XG5cdFx0fSwgNjAwMCk7XG5cdH1cblxuXHQvLyBSZWFjdCBMb2dvIEFuaW1hdGlvblxuXHRmdW5jdGlvbiByZWFjdEFuaW1hdGlvbigpIHtcblx0XHRsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcblxuXHRcdGxldCBsb2dvID0gZ3JvdW5kU2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdzdmcnKTtcblx0XHRsZXQgcGF0aHMgPSBsb2dvLnF1ZXJ5U2VsZWN0b3JBbGwoJ3BhdGgnKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyBpICsrKSB7XG5cdFx0XHRzZXREYXNoKHBhdGhzW2ldKTtcblx0XHR9XG5cblx0XHR0bC50byhwYXRocywgMywgeyAnc3Ryb2tlLWRhc2hvZmZzZXQnOiAwLCBvcGFjaXR5OiAnMScsIGVhc2U6IFBvd2VyMS5lYXNlSW4gfSlcblx0XHQudG8ocGF0aHMsIDEsIHsgJ2ZpbGwnOiAnIzAwZDhmZicsICdzdHJva2UnOiAnIzAwZDhmZicsIGVhc2U6IFBvd2VyMS5lYXNlSW4gfSk7XG5cdH1cblxuXHQvLyBTZXRzIERhc2ggYXJyYXkvb2Zmc2V0IG9uIGVsZW1lbnRcblx0ZnVuY3Rpb24gc2V0RGFzaChwYXRoKSB7XG5cdFx0bGV0IGxlbmd0aCA9IHBhdGguZ2V0VG90YWxMZW5ndGgoKTtcblx0XHRwYXRoLnN0eWxlWydzdHJva2UtZGFzaG9mZnNldCddID0gbGVuZ3RoO1xuXHRcdHBhdGguc3R5bGVbJ3N0cm9rZS1kYXNoYXJyYXknXSA9IGxlbmd0aDtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgZGFzaGJvYXJkO1xuIiwibGV0IGhlYWRlciA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyJyk7XG5cdGxldCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUtbWFpbicpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0aWYgKG1haW4pIHtcblxuXHRcdFx0Ly8gaW5pdCBjb250cm9sbGVyXG5cdFx0XHR2YXIgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cblx0XHRcdC8vIGNyZWF0ZSBhIHNjZW5lXG5cdFx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xuXHRcdFx0XHR0cmlnZ2VyRWxlbWVudDogbWFpbixcblx0XHRcdFx0dHJpZ2dlckhvb2s6ICdvbkxlYXZlJyxcblx0XHRcdH0pLm9uKCdzdGFydCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dG9nZ2xlV2hpdGVvdXQoKTtcblxuXHRcdFx0fSlcblx0XHRcdC5hZGRUbyhjb250cm9sbGVyKTsgLy8gYXNzaWduIHRoZSBzY2VuZSB0byB0aGUgY29udHJvbGxlclxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHRvZ2dsZVdoaXRlb3V0KCkge1xuXHRcdGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdsLXNpdGVoZWFkZXItLXdoaXRlJyk7XG5cdH1cblxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgaGVhZGVyO1xuIiwibGV0IGhvbWVTY3JvbGwgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgbmF2SXRlbXM7XG5cdGxldCBkZWx0YSA9IDA7XG5cdGxldCBjdXJyZW50U2xpZGU7XG5cdGxldCBuZXh0U2xpZGU7XG5cdGxldCBwcmV2aW91c1NsaWRlO1xuXHRsZXQgcHJldmlvdXNTbGlkZXM7XG5cdGxldCBpc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcblx0bGV0IGxhc3RTY3JvbGxlZDtcblx0bGV0IG1vdXNld2hlZWxDYW5TY3JvbGwgPSB0cnVlO1xuXHRsZXQgbGFzdE1vdXNld2hlZWxUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblx0bGV0IGxhc3RTY3JvbGxUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblx0bGV0IHNjcm9sbHMgPSBbXTtcblx0bGV0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctY29udGFpbmVyX19uYXYnKTtcblx0bGV0IHdvcmtTbGlkZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3JykpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0aWYgKG5hdikge1xuXHRcdFx0bmF2SXRlbXMgPSBuYXYucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXHRcdH1cblx0XHRhbmltYXRlSW5pdGlhbCgpO1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcmVzZXRTY3JvbGwoKSB7XG5cdFx0c2Nyb2xscyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNjcm9sbHNBdmcob2Zmc2V0KSB7XG5cdFx0bGV0IHN1bSA9IDA7XG5cblx0XHRsZXQgZWxtcyA9IHNjcm9sbHMuc2xpY2UoTWF0aC5tYXgoc2Nyb2xscy5sZW5ndGggLSBvZmZzZXQsIDEpKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZWxtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0c3VtICs9IGVsbXNbaV07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGguY2VpbChzdW0gLyBvZmZzZXQpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYW5pbWF0ZUluaXRpYWwoKSB7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0bGV0IGZpcnN0V29yayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLTEnKTtcblx0XHRcdGZpcnN0V29yay5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5hdkl0ZW1zWzBdLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2X19pdGVtLS1pcy1hY3RpdmUnKTtcblx0XHR9LCAyMDApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmROYXYpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNjcm9sbE5hdik7XG5cblx0XHQvLyBTdG9wcyB0b3VjaG1vdmUgd29ya2luZyBvdXRyaWdodFxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9KTtcblxuXHRcdC8vIFNldHMgdXAgSGFtbWVyIHRvIGhhbmRsZSB0b3VjaCBldmVudHNcblx0XHRsZXQgd29ya0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctY29udGFpbmVyJyk7XG5cdFx0bGV0IHRvdWNoID0gbmV3IEhhbW1lcih3b3JrQ29udGFpbmVyKTtcblxuXHRcdC8vIEVuYWJsZXMgdmVydGljYWwgc3dpcGUgZGV0ZWN0aW9uXG5cdFx0dG91Y2guZ2V0KCdzd2lwZScpLnNldCh7IGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9BTEwgfSk7XG5cblx0XHQvLyBHZXN0dXJlcyB0aGF0IGVxdWFsIGZvcndhcmRcblx0XHR0b3VjaC5vbignc3dpcGV1cCBzd2lwZWxlZnQnLCBmdW5jdGlvbigpe1xuXHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEdlc3R1cmVzIHRoYXQgZXF1YWwgYmFja3dhcmRzXG5cdFx0dG91Y2gub24oJ3N3aXBlZG93biBzd2lwZXJpZ2h0JywgZnVuY3Rpb24oKXtcblx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBIb29rcyB1cCBuYXZpZ2F0aW9uXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuYXZJdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bmF2SXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVOYXYpO1xuXHRcdH1cblx0XHRcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZU5hdihldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IHNsaWRlTnVtYmVyID0gZXZlbnQudGFyZ2V0LmlubmVySFRNTC5zdWJzdHJpbmcoMSk7XG5cblx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRnb1RvU2xpZGUoc2xpZGVOdW1iZXIpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGhpZ2hsaWdodEFjdGl2ZU5hdigpIHtcblx0XHQvLyBSZW1vdmUgdGhlIGFjdGl2ZSBjbGFzc1xuXHRcdGxldCBhY3RpdmVOYXZDbGFzcyA9ICd3b3JrLXByZXZpZXctY29udGFpbmVyX19uYXZfX2l0ZW0tLWlzLWFjdGl2ZSc7XG5cdFx0bGV0IGFjdGl2ZU5hdkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGFjdGl2ZU5hdkNsYXNzKTtcblx0XHRhY3RpdmVOYXZJdGVtLmNsYXNzTGlzdC5yZW1vdmUoYWN0aXZlTmF2Q2xhc3MpO1xuXG5cdFx0bGV0IG5leHROdW1iZXIgPSBuZXh0U2xpZGUuaWQuc3Vic3RyaW5nKG5leHRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXHRcdGNvbnNvbGUubG9nKG5leHROdW1iZXIpO1xuXG5cdFx0bmF2SXRlbXNbbmV4dE51bWJlciAtIDFdLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZChhY3RpdmVOYXZDbGFzcyk7XG5cdH1cblxuXHRmdW5jdGlvbiBnb1RvU2xpZGUoc2xpZGVOdW1iZXIpIHtcblx0XHRuZXh0U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS0nICsgc2xpZGVOdW1iZXIgKTtcblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRpZiAobmV4dFNsaWRlKSB7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXG5cdFx0XHRsZXQgY3VycmVudE51bWJlciA9IGN1cnJlbnRTbGlkZS5pZC5zdWJzdHJpbmcoY3VycmVudFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cdFx0XHRsZXQgbmV4dE51bWJlciA9IG5leHRTbGlkZS5pZC5zdWJzdHJpbmcobmV4dFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cblx0XHRcdGlmIChjdXJyZW50TnVtYmVyID4gbmV4dE51bWJlcikge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZ29pbmcgYmFja3dhcmRzJyk7XG5cdFx0XHRcdC8vIElmIHdlJ3JlIGdvaW5nIGJhY2t3YXJkc1xuXHRcdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cblx0XHRcdFx0Ly8gTmVlZCB0byBhZGQgbmV4dCB0byBBTEwgZ29pbmcgZm9yd2FyZFxuXHRcdFx0XHRsZXQgcHJldmlvdXNTbGlkZXMgPSB3b3JrU2xpZGVzLnNsaWNlKG5leHROdW1iZXIsIGN1cnJlbnROdW1iZXIgLSAxKTtcblxuXHRcdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBwcmV2aW91c1NsaWRlcy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0XHRwcmV2aW91c1NsaWRlc1tpXS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHRcdFx0XHRwcmV2aW91c1NsaWRlc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSWYgd2UncmUgZ29pbmcgZm9yd2FyZHNcblx0XHRcdFx0Y29uc29sZS5sb2coJ2dvaW5nIGZvcndhcmRzJyk7XG5cdFx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHR9XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGxOYXYoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGxldCBzY3JvbGxUaHJlc2hvbGQgPSA0MDtcblxuXHRcdGxldCB2YWx1ZSA9IC1lLmRlbHRhWTtcblxuXHRcdGlmIChzY3JvbGxzLmxlbmd0aCA+IDE1MCkge1xuXHRcdFx0c2Nyb2xscy5zaGlmdCgpO1xuXHRcdH1cblxuXHRcdHNjcm9sbHMucHVzaChNYXRoLmFicyh2YWx1ZSkpO1xuXG5cdFx0dmFyIGN1cnJUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuXHRcdGlmICgoY3VyclRpbWUgLSBsYXN0TW91c2V3aGVlbFRpbWUpID4gMjAwKSB7XG5cdFx0XHRyZXNldFNjcm9sbCgpO1xuXHRcdH1cblxuXHRcdGxhc3RNb3VzZXdoZWVsVGltZSA9IGN1cnJUaW1lO1xuXG5cdFx0dmFyIGxhc3RBdmcgPSBzY3JvbGxzQXZnKDUpO1xuXHRcdHZhciBtaWRBdmcgPSBzY3JvbGxzQXZnKDQwKTtcblxuXHRcdGlmIChsYXN0QXZnID4gbWlkQXZnKSB7XG5cdFx0XHRpZiAobW91c2V3aGVlbENhblNjcm9sbCAmJiBpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAodmFsdWUgPCAwKSB7XG5cdFx0XHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBrZXlib2FyZE5hdihldmVudCkge1xuXHRcdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRcdGNhc2UgMzg6XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgNDA6XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2V0VHJhbnNpdGlvbmluZygpIHtcblx0XHRpc1RyYW5zaXRpb25pbmcgPSB0cnVlO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGlzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXHRcdH0sIDEwMDApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYWR2YW5jZVNsaWRlKCkge1xuXG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdG5leHRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLW5leHQnKTtcblxuXHRcdGlmIChuZXh0U2xpZGUpIHtcblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblx0XG5cdGZ1bmN0aW9uIHJlZ3Jlc3NTbGlkZSgpIHtcblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0cHJldmlvdXNTbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdHByZXZpb3VzU2xpZGUgPSBwcmV2aW91c1NsaWRlc1twcmV2aW91c1NsaWRlcy5sZW5ndGggLSAxXTtcblxuXHRcdGlmIChwcmV2aW91c1NsaWRlKSB7XG5cdFx0XHQvLyBTZXRzIG5leHQgYWN0dWFsIHNsaWRlIChub3QgY2hyb25vbG9naWNhbGx5KSB0byBwcmV2aW91cyBzbGlkZVxuXHRcdFx0bmV4dFNsaWRlID0gcHJldmlvdXNTbGlkZTtcblxuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGhvbWVTY3JvbGw7XG4iLCIvKipcbiAqIEFsbG93cyBmb3IgbGVmdC9yaWdodCBuYXZpZ2F0aW9uIGluIGpvdXJuYWxcbiAqL1xubGV0IGpvdXJuYWxOYXYgPSAoZnVuY3Rpb24oKSB7XG5cdGxldCBwcmV2aW91cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZV9fbmF2aWdhdGlvbi0tcHJldmlvdXMgYScpO1xuXHRsZXQgbmV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZV9fbmF2aWdhdGlvbi0tbmV4dCBhJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkTmF2KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGtleWJvYXJkTmF2KGV2ZW50KSB7XG5cdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRjYXNlIDM3OlxuXHRcdFx0XHRpZiAocHJldmlvdXMpIHtcblx0XHRcdFx0XHRnb1RvTGluayggcHJldmlvdXMuaHJlZiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzOTpcblx0XHRcdFx0aWYgKG5leHQpIHtcblx0XHRcdFx0XHRnb1RvTGluayggbmV4dC5ocmVmICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gZ29Ub0xpbmsobGluaykge1xuXHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbGluaztcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZU5hdihldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgam91cm5hbE5hdjtcbiIsIi8qKlxuICogSGFuZGxlcyBtb2JpbGUgbWVudVxuICovXG5sZXQgbWVudSA9IChmdW5jdGlvbigpIHtcblx0bGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXInKTtcblx0bGV0IHRvZ2dsZSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyX19tZW51LXRvZ2dsZScpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0dG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRvZ2dsZU1lbnUoKTtcblx0XHRcdGNoYW5nZVRleHQoKTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XG5cdFx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2wtc2l0ZWhlYWRlci0tbmF2LWlzLW9wZW4nKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZVRleHQoKSB7XG5cdFx0aWYgKHRvZ2dsZS5pbm5lckhUTUwgPT0gJ01lbnUnKSB7XHRcblx0XHRcdHRvZ2dsZS5pbm5lckhUTUwgPSAnQ2xvc2UnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0b2dnbGUuaW5uZXJIVE1MID0gJ01lbnUnO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBtZW51O1xuIiwibGV0IHByaW1lbGFicyA9IChmdW5jdGlvbiAoKSB7XG5cdC8vIEluaXQgY29udHJvbGxlclxuXHRsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cblx0bGV0IHByb2JsZW1TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3NlY3Rpb24tLXByb2JsZW1zJyk7XG5cdGxldCBtb2R1bGFyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19zZWN0aW9uLS1tb2R1bGFyLWJveGVzJyk7XG5cdGxldCBzdGFuZGFyZFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fc2VjdGlvbi0tYXMtc3RhbmRhcmQnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUFjdGlvbnMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUFjdGlvbnMoKSB7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgcHJvYmxlbVNlY3Rpb24sIHByb2JsZW1IYW5kbGVyKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBtb2R1bGFyU2VjdGlvbiwgbW9kdWxhckhhbmRsZXIpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIHN0YW5kYXJkU2VjdGlvbiwgc3RhbmRhcmRIYW5kbGVyKTtcblx0fVxuXG5cdC8vIEFkZHMgYSBzY2VuZSB3aXRoIHByZWRlZmluZWQgb3B0aW9ucyB0byB0aGUgY29udHJvbGxlclxuXHRmdW5jdGlvbiBhZGRTY2VuZShjb250cm9sbGVyLCBlbGVtZW50LCBoYW5kbGVyKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHR0cmlnZ2VyRWxlbWVudDogZWxlbWVudCxcblx0XHRcdG9mZnNldDogNTAsXG5cdFx0XHRyZXZlcnNlOiBmYWxzZVxuXHRcdH07XG5cblx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUob3B0aW9ucykub24oJ3N0YXJ0JywgaGFuZGxlcikuYWRkVG8oY29udHJvbGxlcik7XG5cdH1cblxuXHRmdW5jdGlvbiBwcm9ibGVtSGFuZGxlcigpIHtcblx0XHRwcm9ibGVtU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdwcmltZS1sYWJzX19zZWN0aW9uLS1wcm9ibGVtcy0taXMtYWN0aXZlJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBtb2R1bGFySGFuZGxlcigpIHtcblx0XHRtb2R1bGFyU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdwcmltZS1sYWJzX19zZWN0aW9uLS1tb2R1bGFyLWJveGVzLS1pcy1hY3RpdmUnKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHN0YW5kYXJkSGFuZGxlcigpIHtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fdmlkZW8nKS5wbGF5KCk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IHByaW1lbGFicztcbiJdfQ==
