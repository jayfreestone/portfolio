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

},{"./partials/dashboard.js":2,"./partials/header.js":4,"./partials/homeScroll.js":5,"./partials/journalNav.js":6,"./partials/menu.js":7,"./partials/primelabs.js":8}],2:[function(require,module,exports){
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
/**
 * Fades in a background image once loaded
 */
var fadeBackgroundImage = function () {
	function fade(image) {
		var backgroundStyle = window.getComputedStyle(image)['background-image'];
		var backgroundImage = backgroundStyle.match(/\"(.*?)\"/)[0];
		var imageTemp = document.createElement('img');
		imageTemp.src = backgroundImage.replace(/"/g, '');

		imageTemp.addEventListener('load', function () {
			image.classList.remove('is-hidden');
		});
	}

	return {
		fade: fade
	};
}();
exports.default = fadeBackgroundImage;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fadeBackgroundImage = require('./fadeBackgroundImage.js');

var _fadeBackgroundImage2 = _interopRequireDefault(_fadeBackgroundImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		var firstWork = document.querySelector('.work-preview--1');
		// fadeBackgroundImage(firstWork.querySelector('.work-preview__image'));

		fadeImagesOnLoad();

		setTimeout(function () {
			firstWork.classList.add('work-preview--current');
			navItems[0].parentNode.classList.add('work-preview-container__nav__item--is-active');
		}, 200);
	}

	// Displays background images only once loaded
	function fadeImagesOnLoad() {
		var workImages = document.querySelectorAll('.work-preview__image');

		for (var i = 0; i < workImages.length; i++) {
			_fadeBackgroundImage2.default.fade(workImages[i]);
		}
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

},{"./fadeBackgroundImage.js":3}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYXJ0aWFscy9kYXNoYm9hcmQuanMiLCJzcmMvanMvcGFydGlhbHMvZmFkZUJhY2tncm91bmRJbWFnZS5qcyIsInNyYy9qcy9wYXJ0aWFscy9oZWFkZXIuanMiLCJzcmMvanMvcGFydGlhbHMvaG9tZVNjcm9sbC5qcyIsInNyYy9qcy9wYXJ0aWFscy9qb3VybmFsTmF2LmpzIiwic3JjL2pzL3BhcnRpYWxzL21lbnUuanMiLCJzcmMvanMvcGFydGlhbHMvcHJpbWVsYWJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFDekQsZ0JBQUssSUFBTDs7QUFFQSxLQUFJLFNBQVMsYUFBVCxDQUF1QixzQkFBdkIsQ0FBSixFQUFvRDtBQUNuRCxtQkFBTyxJQUFQO0FBQ0E7O0FBRUQsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBSixFQUE2QztBQUM1Qyx1QkFBVyxJQUFYO0FBQ0E7O0FBRUQsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBSixFQUEyQztBQUMxQyxzQkFBVSxJQUFWO0FBQ0E7O0FBRUQsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBSixFQUEwQztBQUN6QyxzQkFBVSxJQUFWO0FBQ0E7O0FBRUQsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsaUJBQXZCLENBQUosRUFBK0M7QUFDOUMsdUJBQVcsSUFBWDtBQUNBO0FBQ0QsQ0F0QkQ7Ozs7Ozs7O0FDUEEsSUFBSSxZQUFhLFlBQVk7QUFDNUIsS0FBSSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLG9CQUF2QixDQUFwQjtBQUNBLEtBQUksaUJBQWlCLFNBQVMsYUFBVCxDQUF1QixxQkFBdkIsQ0FB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dW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHByaW1lbGFicyBmcm9tICcuL3BhcnRpYWxzL3ByaW1lbGFicy5qcyc7XG5pbXBvcnQgbWVudSBmcm9tICcuL3BhcnRpYWxzL21lbnUuanMnO1xuaW1wb3J0IGhvbWVTY3JvbGwgZnJvbSAnLi9wYXJ0aWFscy9ob21lU2Nyb2xsLmpzJztcbmltcG9ydCBqb3VybmFsTmF2IGZyb20gJy4vcGFydGlhbHMvam91cm5hbE5hdi5qcyc7XG5pbXBvcnQgZGFzaGJvYXJkIGZyb20gJy4vcGFydGlhbHMvZGFzaGJvYXJkLmpzJztcbmltcG9ydCBoZWFkZXIgZnJvbSAnLi9wYXJ0aWFscy9oZWFkZXIuanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHRtZW51LmluaXQoKTtcblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlci0td2hpdGUnKSkge1xuXHRcdGhlYWRlci5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldycpKSB7XG5cdFx0aG9tZVNjcm9sbC5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnMnKSkge1xuXHRcdHByaW1lbGFicy5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZCcpKSB7XG5cdFx0ZGFzaGJvYXJkLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam91cm5hbC1zaW5nbGUnKSkge1xuXHRcdGpvdXJuYWxOYXYuaW5pdCgpO1xuXHR9XG59KTtcbiIsImxldCBkYXNoYm9hcmQgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgaGVhZGVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2hlYWRlcicpO1xuXHRsZXQgcHJvY2Vzc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19wcm9jZXNzJyk7XG5cdGxldCBzY3JvbGxTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fc2l0ZS1zY3JvbGwnKTtcblx0bGV0IGdyb3VuZFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19ncm91bmR3b3JrJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpbnRybygpO1xuXHRcdGJpbmRVSUFjdGlvbnMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUFjdGlvbnMoKSB7XG5cdFx0Ly8gSW5pdCBjb250cm9sbGVyXG5cdFx0bGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdFx0Ly8gQWRkIHNjZW5lc1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIHByb2Nlc3NTZWN0aW9uLCBhbmltYXRpb25Qcm9jZXNzKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBzY3JvbGxTZWN0aW9uLCBzaXRlU2Nyb2xsKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBncm91bmRTZWN0aW9uLCByZWFjdEFuaW1hdGlvbik7XG5cdH1cblxuXHQvLyBBZGRzIGEgc2NlbmUgd2l0aCBwcmVkZWZpbmVkIG9wdGlvbnMgdG8gdGhlIGNvbnRyb2xsZXJcblx0ZnVuY3Rpb24gYWRkU2NlbmUoY29udHJvbGxlciwgZWxlbWVudCwgaGFuZGxlcikge1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdFx0dHJpZ2dlckVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRvZmZzZXQ6IDUwLFxuXHRcdFx0cmV2ZXJzZTogZmFsc2Vcblx0XHR9O1xuXG5cdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKG9wdGlvbnMpLm9uKCdzdGFydCcsIGhhbmRsZXIpLmFkZFRvKGNvbnRyb2xsZXIpO1xuXHR9XG5cblx0Ly8gSW50cm8vSGVhZGVyIGFuaW1hdGlvblxuXHRmdW5jdGlvbiBpbnRybygpIHtcblx0XHRsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoeyBkZWxheTogMC41IH0pO1xuXHRcdGxldCBpbWFnZSA9IGhlYWRlclNlY3Rpb24ucXVlcnlTZWxlY3RvcignaW1nJyk7XG5cblx0XHR0bC5mcm9tKGltYWdlLCAxLCB7IHk6ICcyMCUnLCBvcGFjaXR5OiAwIH0pO1xuXHR9XG5cblx0Ly8gUGlwZWxpbmUvcHJvY2VzcyBhbmltYXRpb25cblx0ZnVuY3Rpb24gYW5pbWF0aW9uUHJvY2VzcygpIHtcblx0XHRsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcblx0XHRsZXQgaW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19wcm9jZXNzX19pbm5lcicpO1xuXG5cdFx0Ly8gRmlndXJlc1xuXHRcdGxldCBsb2NhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2ZpZ3VyZS0tbG9jYWwnKTtcblx0XHRsZXQgcmVtb3RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZmlndXJlLS1yZW1vdGUnKTtcblx0XHRsZXQgZ2l0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZmlndXJlLS1naXQnKTtcblx0XHRsZXQgZmlsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19maWd1cmUtLWZpbGVzJyk7XG5cdFx0bGV0IHJlbGVhc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19maWd1cmUtLXJlbGVhc2UnKTtcblxuXHRcdC8vIENvbm5lY3RvcnNcblx0XHRsZXQgY29ubmVjdG9yQ2FwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fY29ubmVjdG9yLS1jYXBpc3RyYW5vJyk7XG5cdFx0bGV0IGNvbm5lY3RvckdpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2Nvbm5lY3Rvci0tZ2l0Jyk7XG5cdFx0bGV0IGNvbm5lY3RvckZpbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fY29ubmVjdG9yLS1maWxlcycpO1xuXHRcdGxldCBjb25uZWN0b3JSZWxlYXNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2Nvbm5lY3Rvci0tcmVsZWFzZXMnKTtcblxuXHRcdC8vIEFuaW1hdGlvblxuXHRcdGFkZEZpZ3VyZShsb2NhbCk7XG5cdFx0c2V0QWN0aXZlKGxvY2FsKTtcblx0XHRhZGRMaW5lKGNvbm5lY3RvckNhcCwgJ2Nvbm5lY3RvckNhcCcpO1xuXHRcdGFkZEZpZ3VyZShyZW1vdGUsICdwdWxzZUNhcCcpO1xuXHRcdHNlbmRQdWxzZShjb25uZWN0b3JDYXAsICdwdWxzZUNhcCcpO1xuXHRcdHNldEFjdGl2ZShyZW1vdGUpO1xuXHRcdGFkZExpbmUoY29ubmVjdG9yR2l0LCAnY29ubmVjdG9yR2l0Jyk7XG5cdFx0YWRkRmlndXJlKGdpdCk7XG5cdFx0c2VuZFB1bHNlKGNvbm5lY3RvckdpdCwgJ3B1bHNlR2l0Jyk7XG5cdFx0c2V0QWN0aXZlKGdpdCk7XG5cdFx0c2VuZFB1bHNlKGNvbm5lY3RvckdpdCwgJ3B1bHNlR2l0JywgJ2xlZnQnKTtcblx0XHR1bnNldEFjdGl2ZShnaXQpO1xuXHRcdHJlbW92ZUZpZ3VyZShnaXQpO1xuXHRcdHJlbW92ZUxpbmUoY29ubmVjdG9yR2l0KTtcblx0XHRhZGRMaW5lKGNvbm5lY3RvckZpbGVzLCAnY29ubmVjdG9yRmlsZXMnKTtcblx0XHRhZGRGaWd1cmUoZmlsZXMpO1xuXHRcdGFkZExpbmUoY29ubmVjdG9yUmVsZWFzZXMsICdjb25uZWN0b3JSZWxlYXNlcycpO1xuXHRcdGFkZEZpZ3VyZShyZWxlYXNlKTtcblxuXHRcdC8vIEhlbHBlciBmdW5jdGlvbnNcblx0XHRmdW5jdGlvbiBhZGRGaWd1cmUoZmlndXJlKSB7XG5cdFx0XHR0bC5mcm9tKGZpZ3VyZSwgMSwgeyB3aWR0aDogMCB9KVxuXHRcdFx0LnRvKGZpZ3VyZSwgMSwgeyBvcGFjaXR5OiAxIH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJlbW92ZUZpZ3VyZShmaWd1cmUpIHtcblx0XHRcdHRsLnRvKGZpZ3VyZSwgMC41LCB7IG9wYWNpdHk6IDAgfSlcblx0XHRcdC50byhmaWd1cmUsIDEsIHsgd2lkdGg6ICcwJywgbWFyZ2luOiAwLCBmbGV4OiAwIH0pO1xuXHRcdFx0Ly8gLnNldChmaWd1cmUsIHsgcG9zaXRpb246ICdhYnNvbHV0ZScgfSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVtb3ZlTGluZShjb25uZWN0b3IpIHtcblx0XHRcdHRsLnRvKGNvbm5lY3RvciwgMC41LCB7IG9wYWNpdHk6IDAgfSlcblx0XHRcdC50byhjb25uZWN0b3IsIDEsIHsgd2lkdGg6ICcwJywgbWFyZ2luOiAwLCBmbGV4OiAwIH0pO1xuXHRcdFx0Ly8gLnNldChjb25uZWN0b3IsIHsgcG9zaXRpb246ICdhYnNvbHV0ZScgfSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0QWN0aXZlKGZpZ3VyZSkge1xuXHRcdFx0bGV0IHBhdGggPSBmaWd1cmUucXVlcnlTZWxlY3RvcigncGF0aCcpO1xuXHRcdFx0dGwudG8ocGF0aCwgMC41LCB7IGZpbGw6ICcjOWQwZTEyJyB9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1bnNldEFjdGl2ZShmaWd1cmUpIHtcblx0XHRcdGxldCBwYXRoID0gZmlndXJlLnF1ZXJ5U2VsZWN0b3IoJ3BhdGgnKTtcblx0XHRcdHRsLnRvKHBhdGgsIDAuNSwgeyBmaWxsOiAnYmxhY2snIH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGFkZExpbmUoY29ubmVjdG9yLCBsYXllcikge1xuXHRcdFx0bGV0IGxpbmUgPSBjb25uZWN0b3IucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fY29ubmVjdG9yX19saW5lJyk7XG5cblx0XHRcdHRsLnRvKGNvbm5lY3RvciwgMSwgeyBvcGFjaXR5OiAxIH0sIGxheWVyKVxuXHRcdFx0LmZyb20oY29ubmVjdG9yLCAxLCB7IHdpZHRoOiAwLCB5OiAtMjAgfSwgbGF5ZXIpXG5cdFx0XHQudG8obGluZSwgMSwgeyB3aWR0aDogJzEwMCUnIH0pO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2VuZFB1bHNlKGNvbm5lY3RvciwgbGF5ZXIsIGRpcmVjdGlvbiA9ICdyaWdodCcpIHtcblx0XHRcdGxldCBwdWxzZSA9IGNvbm5lY3Rvci5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19jb25uZWN0b3JfX3B1bHNlJyk7XG5cblx0XHRcdGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuXHRcdFx0XHR0bC5zZXQocHVsc2UsIHsgbGVmdDogJzEwMCUnIH0pXG5cdFx0XHRcdC50byhwdWxzZSwgMC4zLCB7IG9wYWNpdHk6IDEgfSlcblx0XHRcdFx0LnRvKHB1bHNlLCAyLCB7IGxlZnQ6ICcwJyB9KVxuXHRcdFx0XHQudG8ocHVsc2UsIDAuMywgeyBvcGFjaXR5OiAwIH0pXG5cdFx0XHRcdC5zZXQocHVsc2UsIHsgbGVmdDogJzEwMCUnIH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGwudG8ocHVsc2UsIDAuMywgeyBvcGFjaXR5OiAxIH0pXG5cdFx0XHRcdC50byhwdWxzZSwgMiwgeyBsZWZ0OiAnMTAwJScgfSlcblx0XHRcdFx0LnRvKHB1bHNlLCAwLjMsIHsgb3BhY2l0eTogMCB9KVxuXHRcdFx0XHQudG8ocHVsc2UsIDAsIHsgbGVmdDogJzAnIH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFNjcm9sbGluZyBzaXRlIGltYWdlIGFuaW1hdGlvblxuXHRmdW5jdGlvbiBzaXRlU2Nyb2xsKCkge1xuXHRcdGxldCBzY3JvbGxJbm5lciA9IHNjcm9sbFNlY3Rpb24ucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fc2l0ZS1zY3JvbGxfX2lubmVyJyk7XG5cblx0XHRsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoeyBkZWxheTogMiB9KTtcblxuXHRcdHRsLnNldChzY3JvbGxJbm5lciwgeyBoZWlnaHQ6ICdhdXRvJyB9KVxuXHRcdC5mcm9tKHNjcm9sbElubmVyLCAzLCB7IGhlaWdodDogJzIwcmVtJywgZWFzZTogUG93ZXIyLmVhc2VPdXQgfSk7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdHRsLnJldmVyc2UoMyk7XG5cdFx0fSwgNjAwMCk7XG5cdH1cblxuXHQvLyBSZWFjdCBMb2dvIEFuaW1hdGlvblxuXHRmdW5jdGlvbiByZWFjdEFuaW1hdGlvbigpIHtcblx0XHRsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcblxuXHRcdGxldCBsb2dvID0gZ3JvdW5kU2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdzdmcnKTtcblx0XHRsZXQgcGF0aHMgPSBsb2dvLnF1ZXJ5U2VsZWN0b3JBbGwoJ3BhdGgnKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyBpICsrKSB7XG5cdFx0XHRzZXREYXNoKHBhdGhzW2ldKTtcblx0XHR9XG5cblx0XHR0bC50byhwYXRocywgMywgeyAnc3Ryb2tlLWRhc2hvZmZzZXQnOiAwLCBvcGFjaXR5OiAnMScsIGVhc2U6IFBvd2VyMS5lYXNlSW4gfSlcblx0XHQudG8ocGF0aHMsIDEsIHsgJ2ZpbGwnOiAnIzAwZDhmZicsICdzdHJva2UnOiAnIzAwZDhmZicsIGVhc2U6IFBvd2VyMS5lYXNlSW4gfSk7XG5cdH1cblxuXHQvLyBTZXRzIERhc2ggYXJyYXkvb2Zmc2V0IG9uIGVsZW1lbnRcblx0ZnVuY3Rpb24gc2V0RGFzaChwYXRoKSB7XG5cdFx0bGV0IGxlbmd0aCA9IHBhdGguZ2V0VG90YWxMZW5ndGgoKTtcblx0XHRwYXRoLnN0eWxlWydzdHJva2UtZGFzaG9mZnNldCddID0gbGVuZ3RoO1xuXHRcdHBhdGguc3R5bGVbJ3N0cm9rZS1kYXNoYXJyYXknXSA9IGxlbmd0aDtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgZGFzaGJvYXJkO1xuIiwiLyoqXG4gKiBGYWRlcyBpbiBhIGJhY2tncm91bmQgaW1hZ2Ugb25jZSBsb2FkZWRcbiAqL1xubGV0IGZhZGVCYWNrZ3JvdW5kSW1hZ2UgPSAoZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBmYWRlKGltYWdlKSB7XG5cdFx0bGV0IGJhY2tncm91bmRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGltYWdlKVsnYmFja2dyb3VuZC1pbWFnZSddO1xuXHRcdGxldCBiYWNrZ3JvdW5kSW1hZ2UgPSBiYWNrZ3JvdW5kU3R5bGUubWF0Y2goL1xcXCIoLio/KVxcXCIvKVswXTtcblx0XHRsZXQgaW1hZ2VUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0aW1hZ2VUZW1wLnNyYyA9IGJhY2tncm91bmRJbWFnZS5yZXBsYWNlKC9cIi9nLCAnJyk7XG5cblx0XHRpbWFnZVRlbXAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0aW1hZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGZhZGU6IGZhZGVcblx0fVxufSgpKTtcbmV4cG9ydCBkZWZhdWx0IGZhZGVCYWNrZ3JvdW5kSW1hZ2U7XG4iLCJsZXQgaGVhZGVyID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXInKTtcblx0bGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZS1tYWluJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpZiAobWFpbikge1xuXG5cdFx0XHQvLyBpbml0IGNvbnRyb2xsZXJcblx0XHRcdHZhciBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRcdFx0Ly8gY3JlYXRlIGEgc2NlbmVcblx0XHRcdG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XG5cdFx0XHRcdHRyaWdnZXJFbGVtZW50OiBtYWluLFxuXHRcdFx0XHR0cmlnZ2VySG9vazogJ29uTGVhdmUnLFxuXHRcdFx0fSkub24oJ3N0YXJ0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0b2dnbGVXaGl0ZW91dCgpO1xuXG5cdFx0XHR9KVxuXHRcdFx0LmFkZFRvKGNvbnRyb2xsZXIpOyAvLyBhc3NpZ24gdGhlIHNjZW5lIHRvIHRoZSBjb250cm9sbGVyXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlV2hpdGVvdXQoKSB7XG5cdFx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2wtc2l0ZWhlYWRlci0td2hpdGUnKTtcblx0fVxuXG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXI7XG4iLCJpbXBvcnQgZmFkZUJhY2tncm91bmRJbWFnZSBmcm9tICcuL2ZhZGVCYWNrZ3JvdW5kSW1hZ2UuanMnO1xuXG5sZXQgaG9tZVNjcm9sbCA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBuYXZJdGVtcztcblx0bGV0IGRlbHRhID0gMDtcblx0bGV0IGN1cnJlbnRTbGlkZTtcblx0bGV0IG5leHRTbGlkZTtcblx0bGV0IHByZXZpb3VzU2xpZGU7XG5cdGxldCBwcmV2aW91c1NsaWRlcztcblx0bGV0IGlzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXHRsZXQgbGFzdFNjcm9sbGVkO1xuXHRsZXQgbW91c2V3aGVlbENhblNjcm9sbCA9IHRydWU7XG5cdGxldCBsYXN0TW91c2V3aGVlbFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRsZXQgbGFzdFNjcm9sbFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRsZXQgc2Nyb2xscyA9IFtdO1xuXHRsZXQgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy1jb250YWluZXJfX25hdicpO1xuXHRsZXQgd29ya1NsaWRlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXcnKSk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpZiAobmF2KSB7XG5cdFx0XHRuYXZJdGVtcyA9IG5hdi5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG5cdFx0fVxuXHRcdGFuaW1hdGVJbml0aWFsKCk7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiByZXNldFNjcm9sbCgpIHtcblx0XHRzY3JvbGxzID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2Nyb2xsc0F2ZyhvZmZzZXQpIHtcblx0XHRsZXQgc3VtID0gMDtcblxuXHRcdGxldCBlbG1zID0gc2Nyb2xscy5zbGljZShNYXRoLm1heChzY3JvbGxzLmxlbmd0aCAtIG9mZnNldCwgMSkpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbG1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRzdW0gKz0gZWxtc1tpXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKHN1bSAvIG9mZnNldCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhbmltYXRlSW5pdGlhbCgpIHtcblx0XHRsZXQgZmlyc3RXb3JrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tMScpO1xuXHRcdC8vIGZhZGVCYWNrZ3JvdW5kSW1hZ2UoZmlyc3RXb3JrLnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXdfX2ltYWdlJykpO1xuXG5cdFx0ZmFkZUltYWdlc09uTG9hZCgpO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0Zmlyc3RXb3JrLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmF2SXRlbXNbMF0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctY29udGFpbmVyX19uYXZfX2l0ZW0tLWlzLWFjdGl2ZScpO1xuXHRcdH0sIDIwMCk7XG5cdH1cblxuXHQvLyBEaXNwbGF5cyBiYWNrZ3JvdW5kIGltYWdlcyBvbmx5IG9uY2UgbG9hZGVkXG5cdGZ1bmN0aW9uIGZhZGVJbWFnZXNPbkxvYWQoKSB7XG5cdFx0bGV0IHdvcmtJbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3X19pbWFnZScpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB3b3JrSW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRmYWRlQmFja2dyb3VuZEltYWdlLmZhZGUod29ya0ltYWdlc1tpXSk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmROYXYpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNjcm9sbE5hdik7XG5cblx0XHQvLyBTdG9wcyB0b3VjaG1vdmUgd29ya2luZyBvdXRyaWdodFxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9KTtcblxuXHRcdC8vIFNldHMgdXAgSGFtbWVyIHRvIGhhbmRsZSB0b3VjaCBldmVudHNcblx0XHRsZXQgd29ya0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctY29udGFpbmVyJyk7XG5cdFx0bGV0IHRvdWNoID0gbmV3IEhhbW1lcih3b3JrQ29udGFpbmVyKTtcblxuXHRcdC8vIEVuYWJsZXMgdmVydGljYWwgc3dpcGUgZGV0ZWN0aW9uXG5cdFx0dG91Y2guZ2V0KCdzd2lwZScpLnNldCh7IGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9BTEwgfSk7XG5cblx0XHQvLyBHZXN0dXJlcyB0aGF0IGVxdWFsIGZvcndhcmRcblx0XHR0b3VjaC5vbignc3dpcGV1cCBzd2lwZWxlZnQnLCBmdW5jdGlvbigpe1xuXHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEdlc3R1cmVzIHRoYXQgZXF1YWwgYmFja3dhcmRzXG5cdFx0dG91Y2gub24oJ3N3aXBlZG93biBzd2lwZXJpZ2h0JywgZnVuY3Rpb24oKXtcblx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBIb29rcyB1cCBuYXZpZ2F0aW9uXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuYXZJdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bmF2SXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVOYXYpO1xuXHRcdH1cblx0XHRcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZU5hdihldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IHNsaWRlTnVtYmVyID0gZXZlbnQudGFyZ2V0LmlubmVySFRNTC5zdWJzdHJpbmcoMSk7XG5cblx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRnb1RvU2xpZGUoc2xpZGVOdW1iZXIpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGhpZ2hsaWdodEFjdGl2ZU5hdigpIHtcblx0XHQvLyBSZW1vdmUgdGhlIGFjdGl2ZSBjbGFzc1xuXHRcdGxldCBhY3RpdmVOYXZDbGFzcyA9ICd3b3JrLXByZXZpZXctY29udGFpbmVyX19uYXZfX2l0ZW0tLWlzLWFjdGl2ZSc7XG5cdFx0bGV0IGFjdGl2ZU5hdkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGFjdGl2ZU5hdkNsYXNzKTtcblx0XHRhY3RpdmVOYXZJdGVtLmNsYXNzTGlzdC5yZW1vdmUoYWN0aXZlTmF2Q2xhc3MpO1xuXG5cdFx0bGV0IG5leHROdW1iZXIgPSBuZXh0U2xpZGUuaWQuc3Vic3RyaW5nKG5leHRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXHRcdGNvbnNvbGUubG9nKG5leHROdW1iZXIpO1xuXG5cdFx0bmF2SXRlbXNbbmV4dE51bWJlciAtIDFdLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZChhY3RpdmVOYXZDbGFzcyk7XG5cdH1cblxuXHRmdW5jdGlvbiBnb1RvU2xpZGUoc2xpZGVOdW1iZXIpIHtcblx0XHRuZXh0U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS0nICsgc2xpZGVOdW1iZXIgKTtcblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRpZiAobmV4dFNsaWRlKSB7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXG5cdFx0XHRsZXQgY3VycmVudE51bWJlciA9IGN1cnJlbnRTbGlkZS5pZC5zdWJzdHJpbmcoY3VycmVudFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cdFx0XHRsZXQgbmV4dE51bWJlciA9IG5leHRTbGlkZS5pZC5zdWJzdHJpbmcobmV4dFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cblx0XHRcdGlmIChjdXJyZW50TnVtYmVyID4gbmV4dE51bWJlcikge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZ29pbmcgYmFja3dhcmRzJyk7XG5cdFx0XHRcdC8vIElmIHdlJ3JlIGdvaW5nIGJhY2t3YXJkc1xuXHRcdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cblx0XHRcdFx0Ly8gTmVlZCB0byBhZGQgbmV4dCB0byBBTEwgZ29pbmcgZm9yd2FyZFxuXHRcdFx0XHRsZXQgcHJldmlvdXNTbGlkZXMgPSB3b3JrU2xpZGVzLnNsaWNlKG5leHROdW1iZXIsIGN1cnJlbnROdW1iZXIgLSAxKTtcblxuXHRcdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBwcmV2aW91c1NsaWRlcy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0XHRwcmV2aW91c1NsaWRlc1tpXS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHRcdFx0XHRwcmV2aW91c1NsaWRlc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSWYgd2UncmUgZ29pbmcgZm9yd2FyZHNcblx0XHRcdFx0Y29uc29sZS5sb2coJ2dvaW5nIGZvcndhcmRzJyk7XG5cdFx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHR9XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGxOYXYoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGxldCBzY3JvbGxUaHJlc2hvbGQgPSA0MDtcblxuXHRcdGxldCB2YWx1ZSA9IC1lLmRlbHRhWTtcblxuXHRcdGlmIChzY3JvbGxzLmxlbmd0aCA+IDE1MCkge1xuXHRcdFx0c2Nyb2xscy5zaGlmdCgpO1xuXHRcdH1cblxuXHRcdHNjcm9sbHMucHVzaChNYXRoLmFicyh2YWx1ZSkpO1xuXG5cdFx0dmFyIGN1cnJUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuXHRcdGlmICgoY3VyclRpbWUgLSBsYXN0TW91c2V3aGVlbFRpbWUpID4gMjAwKSB7XG5cdFx0XHRyZXNldFNjcm9sbCgpO1xuXHRcdH1cblxuXHRcdGxhc3RNb3VzZXdoZWVsVGltZSA9IGN1cnJUaW1lO1xuXG5cdFx0dmFyIGxhc3RBdmcgPSBzY3JvbGxzQXZnKDUpO1xuXHRcdHZhciBtaWRBdmcgPSBzY3JvbGxzQXZnKDQwKTtcblxuXHRcdGlmIChsYXN0QXZnID4gbWlkQXZnKSB7XG5cdFx0XHRpZiAobW91c2V3aGVlbENhblNjcm9sbCAmJiBpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAodmFsdWUgPCAwKSB7XG5cdFx0XHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBrZXlib2FyZE5hdihldmVudCkge1xuXHRcdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRcdGNhc2UgMzg6XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgNDA6XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2V0VHJhbnNpdGlvbmluZygpIHtcblx0XHRpc1RyYW5zaXRpb25pbmcgPSB0cnVlO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGlzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXHRcdH0sIDEwMDApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYWR2YW5jZVNsaWRlKCkge1xuXG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdG5leHRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLW5leHQnKTtcblxuXHRcdGlmIChuZXh0U2xpZGUpIHtcblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblx0XG5cdGZ1bmN0aW9uIHJlZ3Jlc3NTbGlkZSgpIHtcblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0cHJldmlvdXNTbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdHByZXZpb3VzU2xpZGUgPSBwcmV2aW91c1NsaWRlc1twcmV2aW91c1NsaWRlcy5sZW5ndGggLSAxXTtcblxuXHRcdGlmIChwcmV2aW91c1NsaWRlKSB7XG5cdFx0XHQvLyBTZXRzIG5leHQgYWN0dWFsIHNsaWRlIChub3QgY2hyb25vbG9naWNhbGx5KSB0byBwcmV2aW91cyBzbGlkZVxuXHRcdFx0bmV4dFNsaWRlID0gcHJldmlvdXNTbGlkZTtcblxuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGhvbWVTY3JvbGw7XG4iLCIvKipcbiAqIEFsbG93cyBmb3IgbGVmdC9yaWdodCBuYXZpZ2F0aW9uIGluIGpvdXJuYWxcbiAqL1xubGV0IGpvdXJuYWxOYXYgPSAoZnVuY3Rpb24oKSB7XG5cdGxldCBwcmV2aW91cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZV9fbmF2aWdhdGlvbi0tcHJldmlvdXMgYScpO1xuXHRsZXQgbmV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZV9fbmF2aWdhdGlvbi0tbmV4dCBhJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkTmF2KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGtleWJvYXJkTmF2KGV2ZW50KSB7XG5cdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRjYXNlIDM3OlxuXHRcdFx0XHRpZiAocHJldmlvdXMpIHtcblx0XHRcdFx0XHRnb1RvTGluayggcHJldmlvdXMuaHJlZiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzOTpcblx0XHRcdFx0aWYgKG5leHQpIHtcblx0XHRcdFx0XHRnb1RvTGluayggbmV4dC5ocmVmICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gZ29Ub0xpbmsobGluaykge1xuXHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbGluaztcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZU5hdihldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgam91cm5hbE5hdjtcbiIsIi8qKlxuICogSGFuZGxlcyBtb2JpbGUgbWVudVxuICovXG5sZXQgbWVudSA9IChmdW5jdGlvbigpIHtcblx0bGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXInKTtcblx0bGV0IHRvZ2dsZSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyX19tZW51LXRvZ2dsZScpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0dG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRvZ2dsZU1lbnUoKTtcblx0XHRcdGNoYW5nZVRleHQoKTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XG5cdFx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2wtc2l0ZWhlYWRlci0tbmF2LWlzLW9wZW4nKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZVRleHQoKSB7XG5cdFx0aWYgKHRvZ2dsZS5pbm5lckhUTUwgPT0gJ01lbnUnKSB7XHRcblx0XHRcdHRvZ2dsZS5pbm5lckhUTUwgPSAnQ2xvc2UnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0b2dnbGUuaW5uZXJIVE1MID0gJ01lbnUnO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBtZW51O1xuIiwibGV0IHByaW1lbGFicyA9IChmdW5jdGlvbiAoKSB7XG5cdC8vIEluaXQgY29udHJvbGxlclxuXHRsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cblx0bGV0IHByb2JsZW1TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3NlY3Rpb24tLXByb2JsZW1zJyk7XG5cdGxldCBtb2R1bGFyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19zZWN0aW9uLS1tb2R1bGFyLWJveGVzJyk7XG5cdGxldCBzdGFuZGFyZFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fc2VjdGlvbi0tYXMtc3RhbmRhcmQnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUFjdGlvbnMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUFjdGlvbnMoKSB7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgcHJvYmxlbVNlY3Rpb24sIHByb2JsZW1IYW5kbGVyKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBtb2R1bGFyU2VjdGlvbiwgbW9kdWxhckhhbmRsZXIpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIHN0YW5kYXJkU2VjdGlvbiwgc3RhbmRhcmRIYW5kbGVyKTtcblx0fVxuXG5cdC8vIEFkZHMgYSBzY2VuZSB3aXRoIHByZWRlZmluZWQgb3B0aW9ucyB0byB0aGUgY29udHJvbGxlclxuXHRmdW5jdGlvbiBhZGRTY2VuZShjb250cm9sbGVyLCBlbGVtZW50LCBoYW5kbGVyKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHR0cmlnZ2VyRWxlbWVudDogZWxlbWVudCxcblx0XHRcdG9mZnNldDogNTAsXG5cdFx0XHRyZXZlcnNlOiBmYWxzZVxuXHRcdH07XG5cblx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUob3B0aW9ucykub24oJ3N0YXJ0JywgaGFuZGxlcikuYWRkVG8oY29udHJvbGxlcik7XG5cdH1cblxuXHRmdW5jdGlvbiBwcm9ibGVtSGFuZGxlcigpIHtcblx0XHRwcm9ibGVtU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdwcmltZS1sYWJzX19zZWN0aW9uLS1wcm9ibGVtcy0taXMtYWN0aXZlJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBtb2R1bGFySGFuZGxlcigpIHtcblx0XHRtb2R1bGFyU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdwcmltZS1sYWJzX19zZWN0aW9uLS1tb2R1bGFyLWJveGVzLS1pcy1hY3RpdmUnKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHN0YW5kYXJkSGFuZGxlcigpIHtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fdmlkZW8nKS5wbGF5KCk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IHByaW1lbGFicztcbiJdfQ==
