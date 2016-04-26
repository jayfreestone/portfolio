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
			fadeBackgroundImage(workImages[i]);
		}
	}

	// Fades in a background image once loaded
	function fadeBackgroundImage(image) {
		var backgroundStyle = window.getComputedStyle(image)['background-image'];
		var backgroundImage = backgroundStyle.match(/\"(.*?)\"/)[0];
		var imageTemp = document.createElement('img');
		imageTemp.src = backgroundImage.replace(/"/g, '');

		imageTemp.addEventListener('load', function () {
			image.classList.remove('is-hidden');
			console.log('loaded');
		});

		console.log(imageTemp);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYXJ0aWFscy9kYXNoYm9hcmQuanMiLCJzcmMvanMvcGFydGlhbHMvaGVhZGVyLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFZO0FBQ3pELGdCQUFLLElBQUw7O0FBRUEsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsc0JBQXZCLENBQUosRUFBb0Q7QUFDbkQsbUJBQU8sSUFBUDtBQUNBOztBQUVELEtBQUksU0FBUyxhQUFULENBQXVCLGVBQXZCLENBQUosRUFBNkM7QUFDNUMsdUJBQVcsSUFBWDtBQUNBOztBQUVELEtBQUksU0FBUyxhQUFULENBQXVCLGFBQXZCLENBQUosRUFBMkM7QUFDMUMsc0JBQVUsSUFBVjtBQUNBOztBQUVELEtBQUksU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQUosRUFBMEM7QUFDekMsc0JBQVUsSUFBVjtBQUNBOztBQUVELEtBQUksU0FBUyxhQUFULENBQXVCLGlCQUF2QixDQUFKLEVBQStDO0FBQzlDLHVCQUFXLElBQVg7QUFDQTtBQUNELENBdEJEOzs7Ozs7OztBQ1BBLElBQUksWUFBYSxZQUFZO0FBQzVCLEtBQUksZ0JBQWdCLFNBQVMsYUFBVCxDQUF1QixvQkFBdkIsQ0FBcEI7QUFDQSxLQUFJLGlCQUFpQixTQUFTLGFBQVQsQ0FBdUIscUJBQXZCLENBQXJCO0FBQ0EsS0FBSSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLHlCQUF2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UyxhQUFULENBQXVCLHFDQUF2QixDQUFyQjtBQUNBLEtBQUksa0JBQWtCLFNBQVMsYUFBVCxDQUF1QixtQ0FBdkIsQ0FBdEI7O0FBRUEsVUFBUyxJQUFULEdBQWdCO0FBQ2Y7QUFDQTs7QUFFRCxVQUFTLGFBQVQsR0FBeUI7QUFDeEIsV0FBUyxVQUFULEVBQXFCLGNBQXJCLEVBQXFDLGNBQXJDO0FBQ0EsV0FBUyxVQUFULEVBQXFCLGNBQXJCLEVBQXFDLGNBQXJDO0FBQ0EsV0FBUyxVQUFULEVBQXFCLGVBQXJCLEVBQXNDLGVBQXRDO0FBQ0E7OztBQUdELFVBQVMsUUFBVCxDQUFrQixVQUFsQixFQUE4QixPQUE5QixFQUF1QyxPQUF2QyxFQUFnRDtBQUMvQyxNQUFJLFVBQVU7QUFDYixtQkFBZ0IsT0FESDtBQUViLFdBQVEsRUFGSztBQUdiLFlBQVM7QUFISSxHQUFkOztBQU1BLE1BQUksWUFBWSxLQUFoQixDQUFzQixPQUF0QixFQUErQixFQUEvQixDQUFrQyxPQUFsQyxFQUEyQyxPQUEzQyxFQUFvRCxLQUFwRCxDQUEwRCxVQUExRDtBQUNBOztBQUVELFVBQVMsY0FBVCxHQUEwQjtBQUN6QixpQkFBZSxTQUFmLENBQXlCLEdBQXpCLENBQTZCLDBDQUE3QjtBQUNBOztBQUVELFVBQVMsY0FBVCxHQUEwQjtBQUN6QixpQkFBZSxTQUFmLENBQXlCLEdBQXpCLENBQTZCLCtDQUE3QjtBQUNBOztBQUVELFVBQVMsZUFBVCxHQUEyQjtBQUMxQixXQUFTLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLElBQTdDO0FBQ0E7O0FBRUQsUUFBTztBQUNOLFFBQU07QUFEQSxFQUFQO0FBR0EsQ0E1Q2dCLEVBQWpCOztrQkE4Q2UsUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgcHJpbWVsYWJzIGZyb20gJy4vcGFydGlhbHMvcHJpbWVsYWJzLmpzJztcbmltcG9ydCBtZW51IGZyb20gJy4vcGFydGlhbHMvbWVudS5qcyc7XG5pbXBvcnQgaG9tZVNjcm9sbCBmcm9tICcuL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMnO1xuaW1wb3J0IGpvdXJuYWxOYXYgZnJvbSAnLi9wYXJ0aWFscy9qb3VybmFsTmF2LmpzJztcbmltcG9ydCBkYXNoYm9hcmQgZnJvbSAnLi9wYXJ0aWFscy9kYXNoYm9hcmQuanMnO1xuaW1wb3J0IGhlYWRlciBmcm9tICcuL3BhcnRpYWxzL2hlYWRlci5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdG1lbnUuaW5pdCgpO1xuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyLS13aGl0ZScpKSB7XG5cdFx0aGVhZGVyLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3JykpIHtcblx0XHRob21lU2Nyb2xsLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFicycpKSB7XG5cdFx0cHJpbWVsYWJzLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkJykpIHtcblx0XHRkYXNoYm9hcmQuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZScpKSB7XG5cdFx0am91cm5hbE5hdi5pbml0KCk7XG5cdH1cbn0pO1xuIiwibGV0IGRhc2hib2FyZCA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBoZWFkZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9faGVhZGVyJyk7XG5cdGxldCBwcm9jZXNzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX3Byb2Nlc3MnKTtcblx0bGV0IHNjcm9sbFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19zaXRlLXNjcm9sbCcpO1xuXHRsZXQgZ3JvdW5kU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2dyb3VuZHdvcmsnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGludHJvKCk7XG5cdFx0YmluZFVJQWN0aW9ucygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJQWN0aW9ucygpIHtcblx0XHQvLyBJbml0IGNvbnRyb2xsZXJcblx0XHRsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cblx0XHQvLyBBZGQgc2NlbmVzXG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgcHJvY2Vzc1NlY3Rpb24sIGFuaW1hdGlvblByb2Nlc3MpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIHNjcm9sbFNlY3Rpb24sIHNpdGVTY3JvbGwpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIGdyb3VuZFNlY3Rpb24sIHJlYWN0QW5pbWF0aW9uKTtcblx0fVxuXG5cdC8vIEFkZHMgYSBzY2VuZSB3aXRoIHByZWRlZmluZWQgb3B0aW9ucyB0byB0aGUgY29udHJvbGxlclxuXHRmdW5jdGlvbiBhZGRTY2VuZShjb250cm9sbGVyLCBlbGVtZW50LCBoYW5kbGVyKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHR0cmlnZ2VyRWxlbWVudDogZWxlbWVudCxcblx0XHRcdG9mZnNldDogNTAsXG5cdFx0XHRyZXZlcnNlOiBmYWxzZVxuXHRcdH07XG5cblx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUob3B0aW9ucykub24oJ3N0YXJ0JywgaGFuZGxlcikuYWRkVG8oY29udHJvbGxlcik7XG5cdH1cblxuXHQvLyBJbnRyby9IZWFkZXIgYW5pbWF0aW9uXG5cdGZ1bmN0aW9uIGludHJvKCkge1xuXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCh7IGRlbGF5OiAwLjUgfSk7XG5cdFx0bGV0IGltYWdlID0gaGVhZGVyU2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcblxuXHRcdHRsLmZyb20oaW1hZ2UsIDEsIHsgeTogJzIwJScsIG9wYWNpdHk6IDAgfSk7XG5cdH1cblxuXHQvLyBQaXBlbGluZS9wcm9jZXNzIGFuaW1hdGlvblxuXHRmdW5jdGlvbiBhbmltYXRpb25Qcm9jZXNzKCkge1xuXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xuXHRcdGxldCBpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX3Byb2Nlc3NfX2lubmVyJyk7XG5cblx0XHQvLyBGaWd1cmVzXG5cdFx0bGV0IGxvY2FsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZmlndXJlLS1sb2NhbCcpO1xuXHRcdGxldCByZW1vdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19maWd1cmUtLXJlbW90ZScpO1xuXHRcdGxldCBnaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19maWd1cmUtLWdpdCcpO1xuXHRcdGxldCBmaWxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2ZpZ3VyZS0tZmlsZXMnKTtcblx0XHRsZXQgcmVsZWFzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2ZpZ3VyZS0tcmVsZWFzZScpO1xuXG5cdFx0Ly8gQ29ubmVjdG9yc1xuXHRcdGxldCBjb25uZWN0b3JDYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19jb25uZWN0b3ItLWNhcGlzdHJhbm8nKTtcblx0XHRsZXQgY29ubmVjdG9yR2l0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fY29ubmVjdG9yLS1naXQnKTtcblx0XHRsZXQgY29ubmVjdG9yRmlsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19jb25uZWN0b3ItLWZpbGVzJyk7XG5cdFx0bGV0IGNvbm5lY3RvclJlbGVhc2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fY29ubmVjdG9yLS1yZWxlYXNlcycpO1xuXG5cdFx0Ly8gQW5pbWF0aW9uXG5cdFx0YWRkRmlndXJlKGxvY2FsKTtcblx0XHRzZXRBY3RpdmUobG9jYWwpO1xuXHRcdGFkZExpbmUoY29ubmVjdG9yQ2FwLCAnY29ubmVjdG9yQ2FwJyk7XG5cdFx0YWRkRmlndXJlKHJlbW90ZSwgJ3B1bHNlQ2FwJyk7XG5cdFx0c2VuZFB1bHNlKGNvbm5lY3RvckNhcCwgJ3B1bHNlQ2FwJyk7XG5cdFx0c2V0QWN0aXZlKHJlbW90ZSk7XG5cdFx0YWRkTGluZShjb25uZWN0b3JHaXQsICdjb25uZWN0b3JHaXQnKTtcblx0XHRhZGRGaWd1cmUoZ2l0KTtcblx0XHRzZW5kUHVsc2UoY29ubmVjdG9yR2l0LCAncHVsc2VHaXQnKTtcblx0XHRzZXRBY3RpdmUoZ2l0KTtcblx0XHRzZW5kUHVsc2UoY29ubmVjdG9yR2l0LCAncHVsc2VHaXQnLCAnbGVmdCcpO1xuXHRcdHVuc2V0QWN0aXZlKGdpdCk7XG5cdFx0cmVtb3ZlRmlndXJlKGdpdCk7XG5cdFx0cmVtb3ZlTGluZShjb25uZWN0b3JHaXQpO1xuXHRcdGFkZExpbmUoY29ubmVjdG9yRmlsZXMsICdjb25uZWN0b3JGaWxlcycpO1xuXHRcdGFkZEZpZ3VyZShmaWxlcyk7XG5cdFx0YWRkTGluZShjb25uZWN0b3JSZWxlYXNlcywgJ2Nvbm5lY3RvclJlbGVhc2VzJyk7XG5cdFx0YWRkRmlndXJlKHJlbGVhc2UpO1xuXG5cdFx0Ly8gSGVscGVyIGZ1bmN0aW9uc1xuXHRcdGZ1bmN0aW9uIGFkZEZpZ3VyZShmaWd1cmUpIHtcblx0XHRcdHRsLmZyb20oZmlndXJlLCAxLCB7IHdpZHRoOiAwIH0pXG5cdFx0XHQudG8oZmlndXJlLCAxLCB7IG9wYWNpdHk6IDEgfSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVtb3ZlRmlndXJlKGZpZ3VyZSkge1xuXHRcdFx0dGwudG8oZmlndXJlLCAwLjUsIHsgb3BhY2l0eTogMCB9KVxuXHRcdFx0LnRvKGZpZ3VyZSwgMSwgeyB3aWR0aDogJzAnLCBtYXJnaW46IDAsIGZsZXg6IDAgfSk7XG5cdFx0XHQvLyAuc2V0KGZpZ3VyZSwgeyBwb3NpdGlvbjogJ2Fic29sdXRlJyB9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiByZW1vdmVMaW5lKGNvbm5lY3Rvcikge1xuXHRcdFx0dGwudG8oY29ubmVjdG9yLCAwLjUsIHsgb3BhY2l0eTogMCB9KVxuXHRcdFx0LnRvKGNvbm5lY3RvciwgMSwgeyB3aWR0aDogJzAnLCBtYXJnaW46IDAsIGZsZXg6IDAgfSk7XG5cdFx0XHQvLyAuc2V0KGNvbm5lY3RvciwgeyBwb3NpdGlvbjogJ2Fic29sdXRlJyB9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzZXRBY3RpdmUoZmlndXJlKSB7XG5cdFx0XHRsZXQgcGF0aCA9IGZpZ3VyZS5xdWVyeVNlbGVjdG9yKCdwYXRoJyk7XG5cdFx0XHR0bC50byhwYXRoLCAwLjUsIHsgZmlsbDogJyM5ZDBlMTInIH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVuc2V0QWN0aXZlKGZpZ3VyZSkge1xuXHRcdFx0bGV0IHBhdGggPSBmaWd1cmUucXVlcnlTZWxlY3RvcigncGF0aCcpO1xuXHRcdFx0dGwudG8ocGF0aCwgMC41LCB7IGZpbGw6ICdibGFjaycgfSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYWRkTGluZShjb25uZWN0b3IsIGxheWVyKSB7XG5cdFx0XHRsZXQgbGluZSA9IGNvbm5lY3Rvci5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19jb25uZWN0b3JfX2xpbmUnKTtcblxuXHRcdFx0dGwudG8oY29ubmVjdG9yLCAxLCB7IG9wYWNpdHk6IDEgfSwgbGF5ZXIpXG5cdFx0XHQuZnJvbShjb25uZWN0b3IsIDEsIHsgd2lkdGg6IDAsIHk6IC0yMCB9LCBsYXllcilcblx0XHRcdC50byhsaW5lLCAxLCB7IHdpZHRoOiAnMTAwJScgfSk7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzZW5kUHVsc2UoY29ubmVjdG9yLCBsYXllciwgZGlyZWN0aW9uID0gJ3JpZ2h0Jykge1xuXHRcdFx0bGV0IHB1bHNlID0gY29ubmVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2Nvbm5lY3Rvcl9fcHVsc2UnKTtcblxuXHRcdFx0aWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG5cdFx0XHRcdHRsLnNldChwdWxzZSwgeyBsZWZ0OiAnMTAwJScgfSlcblx0XHRcdFx0LnRvKHB1bHNlLCAwLjMsIHsgb3BhY2l0eTogMSB9KVxuXHRcdFx0XHQudG8ocHVsc2UsIDIsIHsgbGVmdDogJzAnIH0pXG5cdFx0XHRcdC50byhwdWxzZSwgMC4zLCB7IG9wYWNpdHk6IDAgfSlcblx0XHRcdFx0LnNldChwdWxzZSwgeyBsZWZ0OiAnMTAwJScgfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0bC50byhwdWxzZSwgMC4zLCB7IG9wYWNpdHk6IDEgfSlcblx0XHRcdFx0LnRvKHB1bHNlLCAyLCB7IGxlZnQ6ICcxMDAlJyB9KVxuXHRcdFx0XHQudG8ocHVsc2UsIDAuMywgeyBvcGFjaXR5OiAwIH0pXG5cdFx0XHRcdC50byhwdWxzZSwgMCwgeyBsZWZ0OiAnMCcgfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gU2Nyb2xsaW5nIHNpdGUgaW1hZ2UgYW5pbWF0aW9uXG5cdGZ1bmN0aW9uIHNpdGVTY3JvbGwoKSB7XG5cdFx0bGV0IHNjcm9sbElubmVyID0gc2Nyb2xsU2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19zaXRlLXNjcm9sbF9faW5uZXInKTtcblxuXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCh7IGRlbGF5OiAyIH0pO1xuXG5cdFx0dGwuc2V0KHNjcm9sbElubmVyLCB7IGhlaWdodDogJ2F1dG8nIH0pXG5cdFx0LmZyb20oc2Nyb2xsSW5uZXIsIDMsIHsgaGVpZ2h0OiAnMjByZW0nLCBlYXNlOiBQb3dlcjIuZWFzZU91dCB9KTtcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0dGwucmV2ZXJzZSgzKTtcblx0XHR9LCA2MDAwKTtcblx0fVxuXG5cdC8vIFJlYWN0IExvZ28gQW5pbWF0aW9uXG5cdGZ1bmN0aW9uIHJlYWN0QW5pbWF0aW9uKCkge1xuXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xuXG5cdFx0bGV0IGxvZ28gPSBncm91bmRTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuXHRcdGxldCBwYXRocyA9IGxvZ28ucXVlcnlTZWxlY3RvckFsbCgncGF0aCcpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkgKyspIHtcblx0XHRcdHNldERhc2gocGF0aHNbaV0pO1xuXHRcdH1cblxuXHRcdHRsLnRvKHBhdGhzLCAzLCB7ICdzdHJva2UtZGFzaG9mZnNldCc6IDAsIG9wYWNpdHk6ICcxJywgZWFzZTogUG93ZXIxLmVhc2VJbiB9KVxuXHRcdC50byhwYXRocywgMSwgeyAnZmlsbCc6ICcjMDBkOGZmJywgJ3N0cm9rZSc6ICcjMDBkOGZmJywgZWFzZTogUG93ZXIxLmVhc2VJbiB9KTtcblx0fVxuXG5cdC8vIFNldHMgRGFzaCBhcnJheS9vZmZzZXQgb24gZWxlbWVudFxuXHRmdW5jdGlvbiBzZXREYXNoKHBhdGgpIHtcblx0XHRsZXQgbGVuZ3RoID0gcGF0aC5nZXRUb3RhbExlbmd0aCgpO1xuXHRcdHBhdGguc3R5bGVbJ3N0cm9rZS1kYXNob2Zmc2V0J10gPSBsZW5ndGg7XG5cdFx0cGF0aC5zdHlsZVsnc3Ryb2tlLWRhc2hhcnJheSddID0gbGVuZ3RoO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBkYXNoYm9hcmQ7XG4iLCJsZXQgaGVhZGVyID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXInKTtcblx0bGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZS1tYWluJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpZiAobWFpbikge1xuXG5cdFx0XHQvLyBpbml0IGNvbnRyb2xsZXJcblx0XHRcdHZhciBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRcdFx0Ly8gY3JlYXRlIGEgc2NlbmVcblx0XHRcdG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XG5cdFx0XHRcdHRyaWdnZXJFbGVtZW50OiBtYWluLFxuXHRcdFx0XHR0cmlnZ2VySG9vazogJ29uTGVhdmUnLFxuXHRcdFx0fSkub24oJ3N0YXJ0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0b2dnbGVXaGl0ZW91dCgpO1xuXG5cdFx0XHR9KVxuXHRcdFx0LmFkZFRvKGNvbnRyb2xsZXIpOyAvLyBhc3NpZ24gdGhlIHNjZW5lIHRvIHRoZSBjb250cm9sbGVyXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlV2hpdGVvdXQoKSB7XG5cdFx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2wtc2l0ZWhlYWRlci0td2hpdGUnKTtcblx0fVxuXG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXI7XG4iLCJsZXQgaG9tZVNjcm9sbCA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBuYXZJdGVtcztcblx0bGV0IGRlbHRhID0gMDtcblx0bGV0IGN1cnJlbnRTbGlkZTtcblx0bGV0IG5leHRTbGlkZTtcblx0bGV0IHByZXZpb3VzU2xpZGU7XG5cdGxldCBwcmV2aW91c1NsaWRlcztcblx0bGV0IGlzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXHRsZXQgbGFzdFNjcm9sbGVkO1xuXHRsZXQgbW91c2V3aGVlbENhblNjcm9sbCA9IHRydWU7XG5cdGxldCBsYXN0TW91c2V3aGVlbFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRsZXQgbGFzdFNjcm9sbFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRsZXQgc2Nyb2xscyA9IFtdO1xuXHRsZXQgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy1jb250YWluZXJfX25hdicpO1xuXHRsZXQgd29ya1NsaWRlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXcnKSk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpZiAobmF2KSB7XG5cdFx0XHRuYXZJdGVtcyA9IG5hdi5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG5cdFx0fVxuXHRcdGFuaW1hdGVJbml0aWFsKCk7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiByZXNldFNjcm9sbCgpIHtcblx0XHRzY3JvbGxzID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2Nyb2xsc0F2ZyhvZmZzZXQpIHtcblx0XHRsZXQgc3VtID0gMDtcblxuXHRcdGxldCBlbG1zID0gc2Nyb2xscy5zbGljZShNYXRoLm1heChzY3JvbGxzLmxlbmd0aCAtIG9mZnNldCwgMSkpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbG1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRzdW0gKz0gZWxtc1tpXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKHN1bSAvIG9mZnNldCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhbmltYXRlSW5pdGlhbCgpIHtcblx0XHRsZXQgZmlyc3RXb3JrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tMScpO1xuXHRcdC8vIGZhZGVCYWNrZ3JvdW5kSW1hZ2UoZmlyc3RXb3JrLnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXdfX2ltYWdlJykpO1xuXG5cdFx0ZmFkZUltYWdlc09uTG9hZCgpO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0Zmlyc3RXb3JrLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmF2SXRlbXNbMF0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctY29udGFpbmVyX19uYXZfX2l0ZW0tLWlzLWFjdGl2ZScpO1xuXHRcdH0sIDIwMCk7XG5cdH1cblxuXHQvLyBEaXNwbGF5cyBiYWNrZ3JvdW5kIGltYWdlcyBvbmx5IG9uY2UgbG9hZGVkXG5cdGZ1bmN0aW9uIGZhZGVJbWFnZXNPbkxvYWQoKSB7XG5cdFx0bGV0IHdvcmtJbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3X19pbWFnZScpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB3b3JrSW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRmYWRlQmFja2dyb3VuZEltYWdlKHdvcmtJbWFnZXNbaV0pO1xuXHRcdH1cblx0fVxuXG5cdC8vIEZhZGVzIGluIGEgYmFja2dyb3VuZCBpbWFnZSBvbmNlIGxvYWRlZFxuXHRmdW5jdGlvbiBmYWRlQmFja2dyb3VuZEltYWdlKGltYWdlKSB7XG5cdFx0bGV0IGJhY2tncm91bmRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGltYWdlKVsnYmFja2dyb3VuZC1pbWFnZSddO1xuXHRcdGxldCBiYWNrZ3JvdW5kSW1hZ2UgPSBiYWNrZ3JvdW5kU3R5bGUubWF0Y2goL1xcXCIoLio/KVxcXCIvKVswXTtcblx0XHRsZXQgaW1hZ2VUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0aW1hZ2VUZW1wLnNyYyA9IGJhY2tncm91bmRJbWFnZS5yZXBsYWNlKC9cIi9nLCAnJyk7XG5cblx0XHRpbWFnZVRlbXAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0aW1hZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG5cdFx0XHRjb25zb2xlLmxvZygnbG9hZGVkJyk7XG5cdFx0fSk7XG5cblx0XHRjb25zb2xlLmxvZyhpbWFnZVRlbXApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmROYXYpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNjcm9sbE5hdik7XG5cblx0XHQvLyBTdG9wcyB0b3VjaG1vdmUgd29ya2luZyBvdXRyaWdodFxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9KTtcblxuXHRcdC8vIFNldHMgdXAgSGFtbWVyIHRvIGhhbmRsZSB0b3VjaCBldmVudHNcblx0XHRsZXQgd29ya0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctY29udGFpbmVyJyk7XG5cdFx0bGV0IHRvdWNoID0gbmV3IEhhbW1lcih3b3JrQ29udGFpbmVyKTtcblxuXHRcdC8vIEVuYWJsZXMgdmVydGljYWwgc3dpcGUgZGV0ZWN0aW9uXG5cdFx0dG91Y2guZ2V0KCdzd2lwZScpLnNldCh7IGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9BTEwgfSk7XG5cblx0XHQvLyBHZXN0dXJlcyB0aGF0IGVxdWFsIGZvcndhcmRcblx0XHR0b3VjaC5vbignc3dpcGV1cCBzd2lwZWxlZnQnLCBmdW5jdGlvbigpe1xuXHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEdlc3R1cmVzIHRoYXQgZXF1YWwgYmFja3dhcmRzXG5cdFx0dG91Y2gub24oJ3N3aXBlZG93biBzd2lwZXJpZ2h0JywgZnVuY3Rpb24oKXtcblx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBIb29rcyB1cCBuYXZpZ2F0aW9uXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuYXZJdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bmF2SXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVOYXYpO1xuXHRcdH1cblx0XHRcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZU5hdihldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IHNsaWRlTnVtYmVyID0gZXZlbnQudGFyZ2V0LmlubmVySFRNTC5zdWJzdHJpbmcoMSk7XG5cblx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRnb1RvU2xpZGUoc2xpZGVOdW1iZXIpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGhpZ2hsaWdodEFjdGl2ZU5hdigpIHtcblx0XHQvLyBSZW1vdmUgdGhlIGFjdGl2ZSBjbGFzc1xuXHRcdGxldCBhY3RpdmVOYXZDbGFzcyA9ICd3b3JrLXByZXZpZXctY29udGFpbmVyX19uYXZfX2l0ZW0tLWlzLWFjdGl2ZSc7XG5cdFx0bGV0IGFjdGl2ZU5hdkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGFjdGl2ZU5hdkNsYXNzKTtcblx0XHRhY3RpdmVOYXZJdGVtLmNsYXNzTGlzdC5yZW1vdmUoYWN0aXZlTmF2Q2xhc3MpO1xuXG5cdFx0bGV0IG5leHROdW1iZXIgPSBuZXh0U2xpZGUuaWQuc3Vic3RyaW5nKG5leHRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXHRcdGNvbnNvbGUubG9nKG5leHROdW1iZXIpO1xuXG5cdFx0bmF2SXRlbXNbbmV4dE51bWJlciAtIDFdLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZChhY3RpdmVOYXZDbGFzcyk7XG5cdH1cblxuXHRmdW5jdGlvbiBnb1RvU2xpZGUoc2xpZGVOdW1iZXIpIHtcblx0XHRuZXh0U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS0nICsgc2xpZGVOdW1iZXIgKTtcblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRpZiAobmV4dFNsaWRlKSB7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXG5cdFx0XHRsZXQgY3VycmVudE51bWJlciA9IGN1cnJlbnRTbGlkZS5pZC5zdWJzdHJpbmcoY3VycmVudFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cdFx0XHRsZXQgbmV4dE51bWJlciA9IG5leHRTbGlkZS5pZC5zdWJzdHJpbmcobmV4dFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cblx0XHRcdGlmIChjdXJyZW50TnVtYmVyID4gbmV4dE51bWJlcikge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZ29pbmcgYmFja3dhcmRzJyk7XG5cdFx0XHRcdC8vIElmIHdlJ3JlIGdvaW5nIGJhY2t3YXJkc1xuXHRcdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cblx0XHRcdFx0Ly8gTmVlZCB0byBhZGQgbmV4dCB0byBBTEwgZ29pbmcgZm9yd2FyZFxuXHRcdFx0XHRsZXQgcHJldmlvdXNTbGlkZXMgPSB3b3JrU2xpZGVzLnNsaWNlKG5leHROdW1iZXIsIGN1cnJlbnROdW1iZXIgLSAxKTtcblxuXHRcdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBwcmV2aW91c1NsaWRlcy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0XHRwcmV2aW91c1NsaWRlc1tpXS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHRcdFx0XHRwcmV2aW91c1NsaWRlc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSWYgd2UncmUgZ29pbmcgZm9yd2FyZHNcblx0XHRcdFx0Y29uc29sZS5sb2coJ2dvaW5nIGZvcndhcmRzJyk7XG5cdFx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHR9XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGxOYXYoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGxldCBzY3JvbGxUaHJlc2hvbGQgPSA0MDtcblxuXHRcdGxldCB2YWx1ZSA9IC1lLmRlbHRhWTtcblxuXHRcdGlmIChzY3JvbGxzLmxlbmd0aCA+IDE1MCkge1xuXHRcdFx0c2Nyb2xscy5zaGlmdCgpO1xuXHRcdH1cblxuXHRcdHNjcm9sbHMucHVzaChNYXRoLmFicyh2YWx1ZSkpO1xuXG5cdFx0dmFyIGN1cnJUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuXHRcdGlmICgoY3VyclRpbWUgLSBsYXN0TW91c2V3aGVlbFRpbWUpID4gMjAwKSB7XG5cdFx0XHRyZXNldFNjcm9sbCgpO1xuXHRcdH1cblxuXHRcdGxhc3RNb3VzZXdoZWVsVGltZSA9IGN1cnJUaW1lO1xuXG5cdFx0dmFyIGxhc3RBdmcgPSBzY3JvbGxzQXZnKDUpO1xuXHRcdHZhciBtaWRBdmcgPSBzY3JvbGxzQXZnKDQwKTtcblxuXHRcdGlmIChsYXN0QXZnID4gbWlkQXZnKSB7XG5cdFx0XHRpZiAobW91c2V3aGVlbENhblNjcm9sbCAmJiBpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAodmFsdWUgPCAwKSB7XG5cdFx0XHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBrZXlib2FyZE5hdihldmVudCkge1xuXHRcdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRcdGNhc2UgMzg6XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgNDA6XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2V0VHJhbnNpdGlvbmluZygpIHtcblx0XHRpc1RyYW5zaXRpb25pbmcgPSB0cnVlO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGlzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXHRcdH0sIDEwMDApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYWR2YW5jZVNsaWRlKCkge1xuXG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdG5leHRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLW5leHQnKTtcblxuXHRcdGlmIChuZXh0U2xpZGUpIHtcblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblx0XG5cdGZ1bmN0aW9uIHJlZ3Jlc3NTbGlkZSgpIHtcblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0cHJldmlvdXNTbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdHByZXZpb3VzU2xpZGUgPSBwcmV2aW91c1NsaWRlc1twcmV2aW91c1NsaWRlcy5sZW5ndGggLSAxXTtcblxuXHRcdGlmIChwcmV2aW91c1NsaWRlKSB7XG5cdFx0XHQvLyBTZXRzIG5leHQgYWN0dWFsIHNsaWRlIChub3QgY2hyb25vbG9naWNhbGx5KSB0byBwcmV2aW91cyBzbGlkZVxuXHRcdFx0bmV4dFNsaWRlID0gcHJldmlvdXNTbGlkZTtcblxuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGhvbWVTY3JvbGw7XG4iLCIvKipcbiAqIEFsbG93cyBmb3IgbGVmdC9yaWdodCBuYXZpZ2F0aW9uIGluIGpvdXJuYWxcbiAqL1xubGV0IGpvdXJuYWxOYXYgPSAoZnVuY3Rpb24oKSB7XG5cdGxldCBwcmV2aW91cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZV9fbmF2aWdhdGlvbi0tcHJldmlvdXMgYScpO1xuXHRsZXQgbmV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZV9fbmF2aWdhdGlvbi0tbmV4dCBhJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkTmF2KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGtleWJvYXJkTmF2KGV2ZW50KSB7XG5cdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRjYXNlIDM3OlxuXHRcdFx0XHRpZiAocHJldmlvdXMpIHtcblx0XHRcdFx0XHRnb1RvTGluayggcHJldmlvdXMuaHJlZiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzOTpcblx0XHRcdFx0aWYgKG5leHQpIHtcblx0XHRcdFx0XHRnb1RvTGluayggbmV4dC5ocmVmICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gZ29Ub0xpbmsobGluaykge1xuXHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbGluaztcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZU5hdihldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgam91cm5hbE5hdjtcbiIsIi8qKlxuICogSGFuZGxlcyBtb2JpbGUgbWVudVxuICovXG5sZXQgbWVudSA9IChmdW5jdGlvbigpIHtcblx0bGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXInKTtcblx0bGV0IHRvZ2dsZSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyX19tZW51LXRvZ2dsZScpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0dG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRvZ2dsZU1lbnUoKTtcblx0XHRcdGNoYW5nZVRleHQoKTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XG5cdFx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2wtc2l0ZWhlYWRlci0tbmF2LWlzLW9wZW4nKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZVRleHQoKSB7XG5cdFx0aWYgKHRvZ2dsZS5pbm5lckhUTUwgPT0gJ01lbnUnKSB7XHRcblx0XHRcdHRvZ2dsZS5pbm5lckhUTUwgPSAnQ2xvc2UnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0b2dnbGUuaW5uZXJIVE1MID0gJ01lbnUnO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBtZW51O1xuIiwibGV0IHByaW1lbGFicyA9IChmdW5jdGlvbiAoKSB7XG5cdC8vIEluaXQgY29udHJvbGxlclxuXHRsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cblx0bGV0IHByb2JsZW1TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3NlY3Rpb24tLXByb2JsZW1zJyk7XG5cdGxldCBtb2R1bGFyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19zZWN0aW9uLS1tb2R1bGFyLWJveGVzJyk7XG5cdGxldCBzdGFuZGFyZFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fc2VjdGlvbi0tYXMtc3RhbmRhcmQnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUFjdGlvbnMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUFjdGlvbnMoKSB7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgcHJvYmxlbVNlY3Rpb24sIHByb2JsZW1IYW5kbGVyKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBtb2R1bGFyU2VjdGlvbiwgbW9kdWxhckhhbmRsZXIpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIHN0YW5kYXJkU2VjdGlvbiwgc3RhbmRhcmRIYW5kbGVyKTtcblx0fVxuXG5cdC8vIEFkZHMgYSBzY2VuZSB3aXRoIHByZWRlZmluZWQgb3B0aW9ucyB0byB0aGUgY29udHJvbGxlclxuXHRmdW5jdGlvbiBhZGRTY2VuZShjb250cm9sbGVyLCBlbGVtZW50LCBoYW5kbGVyKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHR0cmlnZ2VyRWxlbWVudDogZWxlbWVudCxcblx0XHRcdG9mZnNldDogNTAsXG5cdFx0XHRyZXZlcnNlOiBmYWxzZVxuXHRcdH07XG5cblx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUob3B0aW9ucykub24oJ3N0YXJ0JywgaGFuZGxlcikuYWRkVG8oY29udHJvbGxlcik7XG5cdH1cblxuXHRmdW5jdGlvbiBwcm9ibGVtSGFuZGxlcigpIHtcblx0XHRwcm9ibGVtU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdwcmltZS1sYWJzX19zZWN0aW9uLS1wcm9ibGVtcy0taXMtYWN0aXZlJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBtb2R1bGFySGFuZGxlcigpIHtcblx0XHRtb2R1bGFyU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdwcmltZS1sYWJzX19zZWN0aW9uLS1tb2R1bGFyLWJveGVzLS1pcy1hY3RpdmUnKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHN0YW5kYXJkSGFuZGxlcigpIHtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fdmlkZW8nKS5wbGF5KCk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IHByaW1lbGFicztcbiJdfQ==
