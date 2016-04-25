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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYXJ0aWFscy9kYXNoYm9hcmQuanMiLCJzcmMvanMvcGFydGlhbHMvaGVhZGVyLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFZO0FBQ3pELGdCQUFLLElBQUw7O0FBRUEsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsc0JBQXZCLENBQUosRUFBb0Q7QUFDbkQsbUJBQU8sSUFBUDtBQUNBOztBQUVELEtBQUksU0FBUyxhQUFULENBQXVCLGVBQXZCLENBQUosRUFBNkM7QUFDNUMsdUJBQVcsSUFBWDtBQUNBOztBQUVELEtBQUksU0FBUyxhQUFULENBQXVCLGFBQXZCLENBQUosRUFBMkM7QUFDMUMsc0JBQVUsSUFBVjtBQUNBOztBQUVELEtBQUksU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQUosRUFBMEM7QUFDekMsc0JBQVUsSUFBVjtBQUNBOztBQUVELEtBQUksU0FBUyxhQUFULENBQXVCLGlCQUF2QixDQUFKLEVBQStDO0FBQzlDLHVCQUFXLElBQVg7QUFDQTtBQUNELENBdEJEOzs7Ozs7OztBQ1BBLElBQUksWUFBYSxZQUFZO0FBQzVCLEtBQUksZ0JBQWdCLFNBQVMsYUFBVCxDQUF1QixvQkFBdkIsQ0FBcEI7QUFDQSxLQUFJLGlCQUFpQixTQUFTLGFBQVQsQ0FBdUIscUJBQXZCLENBQXJCO0FBQ0EsS0FBSSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLHlCQUF2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ekIsQ0FBNkIsK0NBQTdCO0FBQ0E7O0FBRUQsVUFBUyxlQUFULEdBQTJCO0FBQzFCLFdBQVMsYUFBVCxDQUF1QixvQkFBdkIsRUFBNkMsSUFBN0M7QUFDQTs7QUFFRCxRQUFPO0FBQ04sUUFBTTtBQURBLEVBQVA7QUFHQSxDQTVDZ0IsRUFBakI7O2tCQThDZSxTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBwcmltZWxhYnMgZnJvbSAnLi9wYXJ0aWFscy9wcmltZWxhYnMuanMnO1xuaW1wb3J0IG1lbnUgZnJvbSAnLi9wYXJ0aWFscy9tZW51LmpzJztcbmltcG9ydCBob21lU2Nyb2xsIGZyb20gJy4vcGFydGlhbHMvaG9tZVNjcm9sbC5qcyc7XG5pbXBvcnQgam91cm5hbE5hdiBmcm9tICcuL3BhcnRpYWxzL2pvdXJuYWxOYXYuanMnO1xuaW1wb3J0IGRhc2hib2FyZCBmcm9tICcuL3BhcnRpYWxzL2Rhc2hib2FyZC5qcyc7XG5pbXBvcnQgaGVhZGVyIGZyb20gJy4vcGFydGlhbHMvaGVhZGVyLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblx0bWVudS5pbml0KCk7XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXItLXdoaXRlJykpIHtcblx0XHRoZWFkZXIuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXcnKSkge1xuXHRcdGhvbWVTY3JvbGwuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzJykpIHtcblx0XHRwcmltZWxhYnMuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmQnKSkge1xuXHRcdGRhc2hib2FyZC5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlJykpIHtcblx0XHRqb3VybmFsTmF2LmluaXQoKTtcblx0fVxufSk7XG4iLCJsZXQgZGFzaGJvYXJkID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IGhlYWRlclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19oZWFkZXInKTtcblx0bGV0IHByb2Nlc3NTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fcHJvY2VzcycpO1xuXHRsZXQgc2Nyb2xsU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX3NpdGUtc2Nyb2xsJyk7XG5cdGxldCBncm91bmRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZ3JvdW5kd29yaycpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0aW50cm8oKTtcblx0XHRiaW5kVUlBY3Rpb25zKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlBY3Rpb25zKCkge1xuXHRcdC8vIEluaXQgY29udHJvbGxlclxuXHRcdGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRcdC8vIEFkZCBzY2VuZXNcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBwcm9jZXNzU2VjdGlvbiwgYW5pbWF0aW9uUHJvY2Vzcyk7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgc2Nyb2xsU2VjdGlvbiwgc2l0ZVNjcm9sbCk7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgZ3JvdW5kU2VjdGlvbiwgcmVhY3RBbmltYXRpb24pO1xuXHR9XG5cblx0Ly8gQWRkcyBhIHNjZW5lIHdpdGggcHJlZGVmaW5lZCBvcHRpb25zIHRvIHRoZSBjb250cm9sbGVyXG5cdGZ1bmN0aW9uIGFkZFNjZW5lKGNvbnRyb2xsZXIsIGVsZW1lbnQsIGhhbmRsZXIpIHtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdHRyaWdnZXJFbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0b2Zmc2V0OiA1MCxcblx0XHRcdHJldmVyc2U6IGZhbHNlXG5cdFx0fTtcblxuXHRcdG5ldyBTY3JvbGxNYWdpYy5TY2VuZShvcHRpb25zKS5vbignc3RhcnQnLCBoYW5kbGVyKS5hZGRUbyhjb250cm9sbGVyKTtcblx0fVxuXG5cdC8vIEludHJvL0hlYWRlciBhbmltYXRpb25cblx0ZnVuY3Rpb24gaW50cm8oKSB7XG5cdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KHsgZGVsYXk6IDAuNSB9KTtcblx0XHRsZXQgaW1hZ2UgPSBoZWFkZXJTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuXG5cdFx0dGwuZnJvbShpbWFnZSwgMSwgeyB5OiAnMjAlJywgb3BhY2l0eTogMCB9KTtcblx0fVxuXG5cdC8vIFBpcGVsaW5lL3Byb2Nlc3MgYW5pbWF0aW9uXG5cdGZ1bmN0aW9uIGFuaW1hdGlvblByb2Nlc3MoKSB7XG5cdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG5cdFx0bGV0IGlubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fcHJvY2Vzc19faW5uZXInKTtcblxuXHRcdC8vIEZpZ3VyZXNcblx0XHRsZXQgbG9jYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19maWd1cmUtLWxvY2FsJyk7XG5cdFx0bGV0IHJlbW90ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2ZpZ3VyZS0tcmVtb3RlJyk7XG5cdFx0bGV0IGdpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2ZpZ3VyZS0tZ2l0Jyk7XG5cdFx0bGV0IGZpbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZmlndXJlLS1maWxlcycpO1xuXHRcdGxldCByZWxlYXNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZmlndXJlLS1yZWxlYXNlJyk7XG5cblx0XHQvLyBDb25uZWN0b3JzXG5cdFx0bGV0IGNvbm5lY3RvckNhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2Nvbm5lY3Rvci0tY2FwaXN0cmFubycpO1xuXHRcdGxldCBjb25uZWN0b3JHaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19jb25uZWN0b3ItLWdpdCcpO1xuXHRcdGxldCBjb25uZWN0b3JGaWxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2Nvbm5lY3Rvci0tZmlsZXMnKTtcblx0XHRsZXQgY29ubmVjdG9yUmVsZWFzZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19jb25uZWN0b3ItLXJlbGVhc2VzJyk7XG5cblx0XHQvLyBBbmltYXRpb25cblx0XHRhZGRGaWd1cmUobG9jYWwpO1xuXHRcdHNldEFjdGl2ZShsb2NhbCk7XG5cdFx0YWRkTGluZShjb25uZWN0b3JDYXAsICdjb25uZWN0b3JDYXAnKTtcblx0XHRhZGRGaWd1cmUocmVtb3RlLCAncHVsc2VDYXAnKTtcblx0XHRzZW5kUHVsc2UoY29ubmVjdG9yQ2FwLCAncHVsc2VDYXAnKTtcblx0XHRzZXRBY3RpdmUocmVtb3RlKTtcblx0XHRhZGRMaW5lKGNvbm5lY3RvckdpdCwgJ2Nvbm5lY3RvckdpdCcpO1xuXHRcdGFkZEZpZ3VyZShnaXQpO1xuXHRcdHNlbmRQdWxzZShjb25uZWN0b3JHaXQsICdwdWxzZUdpdCcpO1xuXHRcdHNldEFjdGl2ZShnaXQpO1xuXHRcdHNlbmRQdWxzZShjb25uZWN0b3JHaXQsICdwdWxzZUdpdCcsICdsZWZ0Jyk7XG5cdFx0dW5zZXRBY3RpdmUoZ2l0KTtcblx0XHRyZW1vdmVGaWd1cmUoZ2l0KTtcblx0XHRyZW1vdmVMaW5lKGNvbm5lY3RvckdpdCk7XG5cdFx0YWRkTGluZShjb25uZWN0b3JGaWxlcywgJ2Nvbm5lY3RvckZpbGVzJyk7XG5cdFx0YWRkRmlndXJlKGZpbGVzKTtcblx0XHRhZGRMaW5lKGNvbm5lY3RvclJlbGVhc2VzLCAnY29ubmVjdG9yUmVsZWFzZXMnKTtcblx0XHRhZGRGaWd1cmUocmVsZWFzZSk7XG5cblx0XHQvLyBIZWxwZXIgZnVuY3Rpb25zXG5cdFx0ZnVuY3Rpb24gYWRkRmlndXJlKGZpZ3VyZSkge1xuXHRcdFx0dGwuZnJvbShmaWd1cmUsIDEsIHsgd2lkdGg6IDAgfSlcblx0XHRcdC50byhmaWd1cmUsIDEsIHsgb3BhY2l0eTogMSB9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiByZW1vdmVGaWd1cmUoZmlndXJlKSB7XG5cdFx0XHR0bC50byhmaWd1cmUsIDAuNSwgeyBvcGFjaXR5OiAwIH0pXG5cdFx0XHQudG8oZmlndXJlLCAxLCB7IHdpZHRoOiAnMCcsIG1hcmdpbjogMCwgZmxleDogMCB9KTtcblx0XHRcdC8vIC5zZXQoZmlndXJlLCB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnIH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJlbW92ZUxpbmUoY29ubmVjdG9yKSB7XG5cdFx0XHR0bC50byhjb25uZWN0b3IsIDAuNSwgeyBvcGFjaXR5OiAwIH0pXG5cdFx0XHQudG8oY29ubmVjdG9yLCAxLCB7IHdpZHRoOiAnMCcsIG1hcmdpbjogMCwgZmxleDogMCB9KTtcblx0XHRcdC8vIC5zZXQoY29ubmVjdG9yLCB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnIH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldEFjdGl2ZShmaWd1cmUpIHtcblx0XHRcdGxldCBwYXRoID0gZmlndXJlLnF1ZXJ5U2VsZWN0b3IoJ3BhdGgnKTtcblx0XHRcdHRsLnRvKHBhdGgsIDAuNSwgeyBmaWxsOiAnIzlkMGUxMicgfSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdW5zZXRBY3RpdmUoZmlndXJlKSB7XG5cdFx0XHRsZXQgcGF0aCA9IGZpZ3VyZS5xdWVyeVNlbGVjdG9yKCdwYXRoJyk7XG5cdFx0XHR0bC50byhwYXRoLCAwLjUsIHsgZmlsbDogJ2JsYWNrJyB9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBhZGRMaW5lKGNvbm5lY3RvciwgbGF5ZXIpIHtcblx0XHRcdGxldCBsaW5lID0gY29ubmVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2Nvbm5lY3Rvcl9fbGluZScpO1xuXG5cdFx0XHR0bC50byhjb25uZWN0b3IsIDEsIHsgb3BhY2l0eTogMSB9LCBsYXllcilcblx0XHRcdC5mcm9tKGNvbm5lY3RvciwgMSwgeyB3aWR0aDogMCwgeTogLTIwIH0sIGxheWVyKVxuXHRcdFx0LnRvKGxpbmUsIDEsIHsgd2lkdGg6ICcxMDAlJyB9KTtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNlbmRQdWxzZShjb25uZWN0b3IsIGxheWVyLCBkaXJlY3Rpb24gPSAncmlnaHQnKSB7XG5cdFx0XHRsZXQgcHVsc2UgPSBjb25uZWN0b3IucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fY29ubmVjdG9yX19wdWxzZScpO1xuXG5cdFx0XHRpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcblx0XHRcdFx0dGwuc2V0KHB1bHNlLCB7IGxlZnQ6ICcxMDAlJyB9KVxuXHRcdFx0XHQudG8ocHVsc2UsIDAuMywgeyBvcGFjaXR5OiAxIH0pXG5cdFx0XHRcdC50byhwdWxzZSwgMiwgeyBsZWZ0OiAnMCcgfSlcblx0XHRcdFx0LnRvKHB1bHNlLCAwLjMsIHsgb3BhY2l0eTogMCB9KVxuXHRcdFx0XHQuc2V0KHB1bHNlLCB7IGxlZnQ6ICcxMDAlJyB9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRsLnRvKHB1bHNlLCAwLjMsIHsgb3BhY2l0eTogMSB9KVxuXHRcdFx0XHQudG8ocHVsc2UsIDIsIHsgbGVmdDogJzEwMCUnIH0pXG5cdFx0XHRcdC50byhwdWxzZSwgMC4zLCB7IG9wYWNpdHk6IDAgfSlcblx0XHRcdFx0LnRvKHB1bHNlLCAwLCB7IGxlZnQ6ICcwJyB9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBTY3JvbGxpbmcgc2l0ZSBpbWFnZSBhbmltYXRpb25cblx0ZnVuY3Rpb24gc2l0ZVNjcm9sbCgpIHtcblx0XHRsZXQgc2Nyb2xsSW5uZXIgPSBzY3JvbGxTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX3NpdGUtc2Nyb2xsX19pbm5lcicpO1xuXG5cdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KHsgZGVsYXk6IDIgfSk7XG5cblx0XHR0bC5zZXQoc2Nyb2xsSW5uZXIsIHsgaGVpZ2h0OiAnYXV0bycgfSlcblx0XHQuZnJvbShzY3JvbGxJbm5lciwgMywgeyBoZWlnaHQ6ICcyMHJlbScsIGVhc2U6IFBvd2VyMi5lYXNlT3V0IH0pO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHR0bC5yZXZlcnNlKDMpO1xuXHRcdH0sIDYwMDApO1xuXHR9XG5cblx0Ly8gUmVhY3QgTG9nbyBBbmltYXRpb25cblx0ZnVuY3Rpb24gcmVhY3RBbmltYXRpb24oKSB7XG5cdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG5cblx0XHRsZXQgbG9nbyA9IGdyb3VuZFNlY3Rpb24ucXVlcnlTZWxlY3Rvcignc3ZnJyk7XG5cdFx0bGV0IHBhdGhzID0gbG9nby5xdWVyeVNlbGVjdG9yQWxsKCdwYXRoJyk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSArKykge1xuXHRcdFx0c2V0RGFzaChwYXRoc1tpXSk7XG5cdFx0fVxuXG5cdFx0dGwudG8ocGF0aHMsIDMsIHsgJ3N0cm9rZS1kYXNob2Zmc2V0JzogMCwgb3BhY2l0eTogJzEnLCBlYXNlOiBQb3dlcjEuZWFzZUluIH0pXG5cdFx0LnRvKHBhdGhzLCAxLCB7ICdmaWxsJzogJyMwMGQ4ZmYnLCAnc3Ryb2tlJzogJyMwMGQ4ZmYnLCBlYXNlOiBQb3dlcjEuZWFzZUluIH0pO1xuXHR9XG5cblx0Ly8gU2V0cyBEYXNoIGFycmF5L29mZnNldCBvbiBlbGVtZW50XG5cdGZ1bmN0aW9uIHNldERhc2gocGF0aCkge1xuXHRcdGxldCBsZW5ndGggPSBwYXRoLmdldFRvdGFsTGVuZ3RoKCk7XG5cdFx0cGF0aC5zdHlsZVsnc3Ryb2tlLWRhc2hvZmZzZXQnXSA9IGxlbmd0aDtcblx0XHRwYXRoLnN0eWxlWydzdHJva2UtZGFzaGFycmF5J10gPSBsZW5ndGg7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRhc2hib2FyZDtcbiIsImxldCBoZWFkZXIgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcicpO1xuXHRsZXQgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlLW1haW4nKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGlmIChtYWluKSB7XG5cblx0XHRcdC8vIGluaXQgY29udHJvbGxlclxuXHRcdFx0dmFyIGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdFx0XHQvLyBjcmVhdGUgYSBzY2VuZVxuXHRcdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcblx0XHRcdFx0dHJpZ2dlckVsZW1lbnQ6IG1haW4sXG5cdFx0XHRcdHRyaWdnZXJIb29rOiAnb25MZWF2ZScsXG5cdFx0XHR9KS5vbignc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRvZ2dsZVdoaXRlb3V0KCk7XG5cblx0XHRcdH0pXG5cdFx0XHQuYWRkVG8oY29udHJvbGxlcik7IC8vIGFzc2lnbiB0aGUgc2NlbmUgdG8gdGhlIGNvbnRyb2xsZXJcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiB0b2dnbGVXaGl0ZW91dCgpIHtcblx0XHRoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbC1zaXRlaGVhZGVyLS13aGl0ZScpO1xuXHR9XG5cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGhlYWRlcjtcbiIsImxldCBob21lU2Nyb2xsID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IG5hdkl0ZW1zO1xuXHRsZXQgZGVsdGEgPSAwO1xuXHRsZXQgY3VycmVudFNsaWRlO1xuXHRsZXQgbmV4dFNsaWRlO1xuXHRsZXQgcHJldmlvdXNTbGlkZTtcblx0bGV0IHByZXZpb3VzU2xpZGVzO1xuXHRsZXQgaXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cdGxldCBsYXN0U2Nyb2xsZWQ7XG5cdGxldCBtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gdHJ1ZTtcblx0bGV0IGxhc3RNb3VzZXdoZWVsVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdGxldCBsYXN0U2Nyb2xsVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdGxldCBzY3JvbGxzID0gW107XG5cdGxldCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2Jyk7XG5cdGxldCB3b3JrU2xpZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlldycpKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGlmIChuYXYpIHtcblx0XHRcdG5hdkl0ZW1zID0gbmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcblx0XHR9XG5cdFx0YW5pbWF0ZUluaXRpYWwoKTtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2V0U2Nyb2xsKCkge1xuXHRcdHNjcm9sbHMgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGxzQXZnKG9mZnNldCkge1xuXHRcdGxldCBzdW0gPSAwO1xuXG5cdFx0bGV0IGVsbXMgPSBzY3JvbGxzLnNsaWNlKE1hdGgubWF4KHNjcm9sbHMubGVuZ3RoIC0gb2Zmc2V0LCAxKSk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGVsbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHN1bSArPSBlbG1zW2ldO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLmNlaWwoc3VtIC8gb2Zmc2V0KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFuaW1hdGVJbml0aWFsKCkge1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGxldCBmaXJzdFdvcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS0xJyk7XG5cdFx0XHRmaXJzdFdvcmsuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuYXZJdGVtc1swXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy1jb250YWluZXJfX25hdl9faXRlbS0taXMtYWN0aXZlJyk7XG5cdFx0fSwgMjAwKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkTmF2KTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBzY3JvbGxOYXYpO1xuXG5cdFx0Ly8gU3RvcHMgdG91Y2htb3ZlIHdvcmtpbmcgb3V0cmlnaHRcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fSk7XG5cblx0XHQvLyBTZXRzIHVwIEhhbW1lciB0byBoYW5kbGUgdG91Y2ggZXZlbnRzXG5cdFx0bGV0IHdvcmtDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LWNvbnRhaW5lcicpO1xuXHRcdGxldCB0b3VjaCA9IG5ldyBIYW1tZXIod29ya0NvbnRhaW5lcik7XG5cblx0XHQvLyBFbmFibGVzIHZlcnRpY2FsIHN3aXBlIGRldGVjdGlvblxuXHRcdHRvdWNoLmdldCgnc3dpcGUnKS5zZXQoeyBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fQUxMIH0pO1xuXG5cdFx0Ly8gR2VzdHVyZXMgdGhhdCBlcXVhbCBmb3J3YXJkXG5cdFx0dG91Y2gub24oJ3N3aXBldXAgc3dpcGVsZWZ0JywgZnVuY3Rpb24oKXtcblx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0YWR2YW5jZVNsaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBHZXN0dXJlcyB0aGF0IGVxdWFsIGJhY2t3YXJkc1xuXHRcdHRvdWNoLm9uKCdzd2lwZWRvd24gc3dpcGVyaWdodCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdHJlZ3Jlc3NTbGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gSG9va3MgdXAgbmF2aWdhdGlvblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbmF2SXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdG5hdkl0ZW1zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlTmF2KTtcblx0XHR9XG5cdFx0XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVOYXYoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGxldCBzbGlkZU51bWJlciA9IGV2ZW50LnRhcmdldC5pbm5lckhUTUwuc3Vic3RyaW5nKDEpO1xuXG5cdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0Z29Ub1NsaWRlKHNsaWRlTnVtYmVyKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBoaWdobGlnaHRBY3RpdmVOYXYoKSB7XG5cdFx0Ly8gUmVtb3ZlIHRoZSBhY3RpdmUgY2xhc3Ncblx0XHRsZXQgYWN0aXZlTmF2Q2xhc3MgPSAnd29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2X19pdGVtLS1pcy1hY3RpdmUnO1xuXHRcdGxldCBhY3RpdmVOYXZJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBhY3RpdmVOYXZDbGFzcyk7XG5cdFx0YWN0aXZlTmF2SXRlbS5jbGFzc0xpc3QucmVtb3ZlKGFjdGl2ZU5hdkNsYXNzKTtcblxuXHRcdGxldCBuZXh0TnVtYmVyID0gbmV4dFNsaWRlLmlkLnN1YnN0cmluZyhuZXh0U2xpZGUuaWQubGVuZ3RoIC0xKTtcblx0XHRjb25zb2xlLmxvZyhuZXh0TnVtYmVyKTtcblxuXHRcdG5hdkl0ZW1zW25leHROdW1iZXIgLSAxXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoYWN0aXZlTmF2Q2xhc3MpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ29Ub1NsaWRlKHNsaWRlTnVtYmVyKSB7XG5cdFx0bmV4dFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tJyArIHNsaWRlTnVtYmVyICk7XG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0aWYgKG5leHRTbGlkZSkge1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblxuXHRcdFx0bGV0IGN1cnJlbnROdW1iZXIgPSBjdXJyZW50U2xpZGUuaWQuc3Vic3RyaW5nKGN1cnJlbnRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXHRcdFx0bGV0IG5leHROdW1iZXIgPSBuZXh0U2xpZGUuaWQuc3Vic3RyaW5nKG5leHRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXG5cdFx0XHRpZiAoY3VycmVudE51bWJlciA+IG5leHROdW1iZXIpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2dvaW5nIGJhY2t3YXJkcycpO1xuXHRcdFx0XHQvLyBJZiB3ZSdyZSBnb2luZyBiYWNrd2FyZHNcblx0XHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXG5cdFx0XHRcdC8vIE5lZWQgdG8gYWRkIG5leHQgdG8gQUxMIGdvaW5nIGZvcndhcmRcblx0XHRcdFx0bGV0IHByZXZpb3VzU2xpZGVzID0gd29ya1NsaWRlcy5zbGljZShuZXh0TnVtYmVyLCBjdXJyZW50TnVtYmVyIC0gMSk7XG5cblx0XHRcdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgcHJldmlvdXNTbGlkZXMubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdFx0cHJldmlvdXNTbGlkZXNbaV0uY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0XHRcdFx0cHJldmlvdXNTbGlkZXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIElmIHdlJ3JlIGdvaW5nIGZvcndhcmRzXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdnb2luZyBmb3J3YXJkcycpO1xuXHRcdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0fVxuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gc2Nyb2xsTmF2KGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRsZXQgc2Nyb2xsVGhyZXNob2xkID0gNDA7XG5cblx0XHRsZXQgdmFsdWUgPSAtZS5kZWx0YVk7XG5cblx0XHRpZiAoc2Nyb2xscy5sZW5ndGggPiAxNTApIHtcblx0XHRcdHNjcm9sbHMuc2hpZnQoKTtcblx0XHR9XG5cblx0XHRzY3JvbGxzLnB1c2goTWF0aC5hYnModmFsdWUpKTtcblxuXHRcdHZhciBjdXJyVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cblx0XHRpZiAoKGN1cnJUaW1lIC0gbGFzdE1vdXNld2hlZWxUaW1lKSA+IDIwMCkge1xuXHRcdFx0cmVzZXRTY3JvbGwoKTtcblx0XHR9XG5cblx0XHRsYXN0TW91c2V3aGVlbFRpbWUgPSBjdXJyVGltZTtcblxuXHRcdHZhciBsYXN0QXZnID0gc2Nyb2xsc0F2Zyg1KTtcblx0XHR2YXIgbWlkQXZnID0gc2Nyb2xsc0F2Zyg0MCk7XG5cblx0XHRpZiAobGFzdEF2ZyA+IG1pZEF2Zykge1xuXHRcdFx0aWYgKG1vdXNld2hlZWxDYW5TY3JvbGwgJiYgaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0bW91c2V3aGVlbENhblNjcm9sbCA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKHZhbHVlIDwgMCkge1xuXHRcdFx0XHRcdFx0YWR2YW5jZVNsaWRlKCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlZ3Jlc3NTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bW91c2V3aGVlbENhblNjcm9sbCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24ga2V5Ym9hcmROYXYoZXZlbnQpIHtcblx0XHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0XHRjYXNlIDM4OlxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDQwOlxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0YWR2YW5jZVNsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdH1cblxuXHRmdW5jdGlvbiByZXNldFRyYW5zaXRpb25pbmcoKSB7XG5cdFx0aXNUcmFuc2l0aW9uaW5nID0gdHJ1ZTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRpc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcblx0XHR9LCAxMDAwKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkdmFuY2VTbGlkZSgpIHtcblxuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRuZXh0U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cblx0XHRpZiAobmV4dFNsaWRlKSB7XG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cdFxuXHRmdW5jdGlvbiByZWdyZXNzU2xpZGUoKSB7XG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdHByZXZpb3VzU2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRwcmV2aW91c1NsaWRlID0gcHJldmlvdXNTbGlkZXNbcHJldmlvdXNTbGlkZXMubGVuZ3RoIC0gMV07XG5cblx0XHRpZiAocHJldmlvdXNTbGlkZSkge1xuXHRcdFx0Ly8gU2V0cyBuZXh0IGFjdHVhbCBzbGlkZSAobm90IGNocm9ub2xvZ2ljYWxseSkgdG8gcHJldmlvdXMgc2xpZGVcblx0XHRcdG5leHRTbGlkZSA9IHByZXZpb3VzU2xpZGU7XG5cblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdHByZXZpb3VzU2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRcdHByZXZpb3VzU2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBob21lU2Nyb2xsO1xuIiwiLyoqXG4gKiBBbGxvd3MgZm9yIGxlZnQvcmlnaHQgbmF2aWdhdGlvbiBpbiBqb3VybmFsXG4gKi9cbmxldCBqb3VybmFsTmF2ID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgcHJldmlvdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam91cm5hbC1zaW5nbGVfX25hdmlnYXRpb24tLXByZXZpb3VzIGEnKTtcblx0bGV0IG5leHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam91cm5hbC1zaW5nbGVfX25hdmlnYXRpb24tLW5leHQgYScpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZE5hdik7XG5cdH1cblxuXHRmdW5jdGlvbiBrZXlib2FyZE5hdihldmVudCkge1xuXHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0Y2FzZSAzNzpcblx0XHRcdFx0aWYgKHByZXZpb3VzKSB7XG5cdFx0XHRcdFx0Z29Ub0xpbmsoIHByZXZpb3VzLmhyZWYgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzk6XG5cdFx0XHRcdGlmIChuZXh0KSB7XG5cdFx0XHRcdFx0Z29Ub0xpbmsoIG5leHQuaHJlZiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGdvVG9MaW5rKGxpbmspIHtcblx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpbms7XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVOYXYoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxOYXY7XG4iLCIvKipcbiAqIEhhbmRsZXMgbW9iaWxlIG1lbnVcbiAqL1xubGV0IG1lbnUgPSAoZnVuY3Rpb24oKSB7XG5cdGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyJyk7XG5cdGxldCB0b2dnbGUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcl9fbWVudS10b2dnbGUnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0b2dnbGVNZW51KCk7XG5cdFx0XHRjaGFuZ2VUZXh0KCk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuXHRcdGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdsLXNpdGVoZWFkZXItLW5hdi1pcy1vcGVuJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBjaGFuZ2VUZXh0KCkge1xuXHRcdGlmICh0b2dnbGUuaW5uZXJIVE1MID09ICdNZW51Jykge1x0XG5cdFx0XHR0b2dnbGUuaW5uZXJIVE1MID0gJ0Nsb3NlJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dG9nZ2xlLmlubmVySFRNTCA9ICdNZW51Jztcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgbWVudTtcbiIsImxldCBwcmltZWxhYnMgPSAoZnVuY3Rpb24gKCkge1xuXHQvLyBJbml0IGNvbnRyb2xsZXJcblx0bGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdGxldCBwcm9ibGVtU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19zZWN0aW9uLS1wcm9ibGVtcycpO1xuXHRsZXQgbW9kdWxhclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fc2VjdGlvbi0tbW9kdWxhci1ib3hlcycpO1xuXHRsZXQgc3RhbmRhcmRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3NlY3Rpb24tLWFzLXN0YW5kYXJkJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlBY3Rpb25zKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlBY3Rpb25zKCkge1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIHByb2JsZW1TZWN0aW9uLCBwcm9ibGVtSGFuZGxlcik7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgbW9kdWxhclNlY3Rpb24sIG1vZHVsYXJIYW5kbGVyKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBzdGFuZGFyZFNlY3Rpb24sIHN0YW5kYXJkSGFuZGxlcik7XG5cdH1cblxuXHQvLyBBZGRzIGEgc2NlbmUgd2l0aCBwcmVkZWZpbmVkIG9wdGlvbnMgdG8gdGhlIGNvbnRyb2xsZXJcblx0ZnVuY3Rpb24gYWRkU2NlbmUoY29udHJvbGxlciwgZWxlbWVudCwgaGFuZGxlcikge1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdFx0dHJpZ2dlckVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRvZmZzZXQ6IDUwLFxuXHRcdFx0cmV2ZXJzZTogZmFsc2Vcblx0XHR9O1xuXG5cdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKG9wdGlvbnMpLm9uKCdzdGFydCcsIGhhbmRsZXIpLmFkZFRvKGNvbnRyb2xsZXIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJvYmxlbUhhbmRsZXIoKSB7XG5cdFx0cHJvYmxlbVNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncHJpbWUtbGFic19fc2VjdGlvbi0tcHJvYmxlbXMtLWlzLWFjdGl2ZScpO1xuXHR9XG5cblx0ZnVuY3Rpb24gbW9kdWxhckhhbmRsZXIoKSB7XG5cdFx0bW9kdWxhclNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncHJpbWUtbGFic19fc2VjdGlvbi0tbW9kdWxhci1ib3hlcy0taXMtYWN0aXZlJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBzdGFuZGFyZEhhbmRsZXIoKSB7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3ZpZGVvJykucGxheSgpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBwcmltZWxhYnM7XG4iXX0=
