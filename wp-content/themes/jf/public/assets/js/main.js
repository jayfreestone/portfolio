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

var _fadeIsHidden = require('./partials/fadeIsHidden.js');

var _fadeIsHidden2 = _interopRequireDefault(_fadeIsHidden);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
	_menu2.default.init();

	_fadeIsHidden2.default.init();

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

},{"./partials/dashboard.js":2,"./partials/fadeIsHidden.js":4,"./partials/header.js":5,"./partials/homeScroll.js":6,"./partials/journalNav.js":7,"./partials/menu.js":8,"./partials/primelabs.js":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fadeBackgroundImage = require('./fadeBackgroundImage.js');

var _fadeBackgroundImage2 = _interopRequireDefault(_fadeBackgroundImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dashboard = function () {
	var groundSection = document.querySelector('.dashboard__groundwork');
	var deploymentSection = document.querySelector('.dashboard__deployment');

	function init() {
		bindUIActions();
	}

	function bindUIActions() {
		// Init controller
		var controller = new ScrollMagic.Controller();

		// Add scenes
		addScene(controller, groundSection, reactAnimation);
		addScene(controller, deploymentSection, terminalAnimation);
	}

	function terminalAnimation() {
		var codeWindow = deploymentSection.querySelector('.dashboard__terminal code');

		// let code = document.createElement('code');
		// let codeNode = codeWindow.appendChild(code);

		writeString('cap staging deploy', codeWindow);
	}

	function writeString(stringToType, placeToType) {
		var i = 0;

		(function writeChar() {
			if (stringToType.length > i) {
				placeToType.innerHTML = placeToType.innerHTML + stringToType[i];
				i++;

				var delay = Math.floor(Math.random() * 100) + 140;

				setTimeout(function () {
					writeChar();
				}, delay);
			}
		})();
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

},{"./fadeBackgroundImage.js":3}],3:[function(require,module,exports){
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
		var imageTemp = document.createElement('img');

		if (backgroundStyle !== 'none') {
			var backgroundImage = backgroundStyle.match(/\/\/([a-z0-9:\-\.\/]+)/)[0];
			imageTemp.src = backgroundImage.replace(/"/g, '');
			imageTemp.addEventListener('load', function () {
				image.classList.remove('is-hidden');
			});
		} else {
			image.classList.remove('is-hidden');
		}
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

var _fadeBackgroundImage = require('./fadeBackgroundImage.js');

var _fadeBackgroundImage2 = _interopRequireDefault(_fadeBackgroundImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fadeIsHidden = function () {
	function init() {
		var isHidden = document.querySelectorAll('.is-hidden');

		for (var i = 0; i < isHidden.length; i++) {
			_fadeBackgroundImage2.default.fade(isHidden[i]);
		}
	}

	return {
		init: init
	};
}(); /**
      * Fades in background images with 'is-hidden' class
      */


exports.default = fadeIsHidden;

},{"./fadeBackgroundImage.js":3}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

		// fadeImagesOnLoad();

		setTimeout(function () {
			firstWork.classList.add('work-preview--current');
			navItems[0].parentNode.classList.add('work-preview-container__nav__item--is-active');
		}, 200);
	}

	// Displays background images only once loaded
	// function fadeImagesOnLoad() {
	// 	let workImages = document.querySelectorAll('.work-preview__image');
	//
	// 	for (let i = 0; i < workImages.length; i++) {
	// 		fadeBackgroundImage.fade(workImages[i]);
	// 	}
	// }

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

},{"./fadeBackgroundImage.js":3}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYXJ0aWFscy9kYXNoYm9hcmQuanMiLCJzcmMvanMvcGFydGlhbHMvZmFkZUJhY2tncm91bmRJbWFnZS5qcyIsInNyYy9qcy9wYXJ0aWFscy9mYWRlSXNIaWRkZW4uanMiLCJzcmMvanMvcGFydGlhbHMvaGVhZGVyLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFDekQsZ0JBQUssSUFBTDs7QUFFQSx3QkFBYSxJQUFiOztBQUVBLEtBQUksU0FBUyxhQUFULENBQXVCLHNCQUF2QixDQUFKLEVBQW9EO0FBQ25ELG1CQUFPLElBQVA7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixlQUF2QixDQUFKLEVBQTZDO0FBQzVDLHVCQUFXLElBQVg7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFKLEVBQTJDO0FBQzFDLHNCQUFVLElBQVY7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFKLEVBQTBDO0FBQ3pDLHNCQUFVLElBQVY7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixpQkFBdkIsQ0FBSixFQUErQztBQUM5Qyx1QkFBVyxJQUFYO0FBQ0E7QUFDRCxDQXhCRDs7Ozs7Ozs7O0FDUkE7Ozs7OztBQUVBLElBQUksWUFBYSxZQUFZO0FBQzVCLEtBQUksZ0JBQWdCLFNB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dXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHByaW1lbGFicyBmcm9tICcuL3BhcnRpYWxzL3ByaW1lbGFicy5qcyc7XG5pbXBvcnQgbWVudSBmcm9tICcuL3BhcnRpYWxzL21lbnUuanMnO1xuaW1wb3J0IGhvbWVTY3JvbGwgZnJvbSAnLi9wYXJ0aWFscy9ob21lU2Nyb2xsLmpzJztcbmltcG9ydCBqb3VybmFsTmF2IGZyb20gJy4vcGFydGlhbHMvam91cm5hbE5hdi5qcyc7XG5pbXBvcnQgZGFzaGJvYXJkIGZyb20gJy4vcGFydGlhbHMvZGFzaGJvYXJkLmpzJztcbmltcG9ydCBoZWFkZXIgZnJvbSAnLi9wYXJ0aWFscy9oZWFkZXIuanMnO1xuaW1wb3J0IGZhZGVJc0hpZGRlbiBmcm9tICcuL3BhcnRpYWxzL2ZhZGVJc0hpZGRlbi5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdG1lbnUuaW5pdCgpO1xuXG5cdGZhZGVJc0hpZGRlbi5pbml0KCk7XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXItLXdoaXRlJykpIHtcblx0XHRoZWFkZXIuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXcnKSkge1xuXHRcdGhvbWVTY3JvbGwuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzJykpIHtcblx0XHRwcmltZWxhYnMuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmQnKSkge1xuXHRcdGRhc2hib2FyZC5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlJykpIHtcblx0XHRqb3VybmFsTmF2LmluaXQoKTtcblx0fVxufSk7XG4iLCJpbXBvcnQgZmFkZUJhY2tncm91bmRJbWFnZSBmcm9tICcuL2ZhZGVCYWNrZ3JvdW5kSW1hZ2UuanMnO1xuXG5sZXQgZGFzaGJvYXJkID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IGdyb3VuZFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19ncm91bmR3b3JrJyk7XG5cdGxldCBkZXBsb3ltZW50U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2RlcGxveW1lbnQnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUFjdGlvbnMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUFjdGlvbnMoKSB7XG5cdFx0Ly8gSW5pdCBjb250cm9sbGVyXG5cdFx0bGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdFx0Ly8gQWRkIHNjZW5lc1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIGdyb3VuZFNlY3Rpb24sIHJlYWN0QW5pbWF0aW9uKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBkZXBsb3ltZW50U2VjdGlvbiwgdGVybWluYWxBbmltYXRpb24pO1xuXHR9XG5cblx0ZnVuY3Rpb24gdGVybWluYWxBbmltYXRpb24oKSB7XG5cdFx0bGV0IGNvZGVXaW5kb3cgPSBkZXBsb3ltZW50U2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX190ZXJtaW5hbCBjb2RlJyk7XG5cblx0XHQvLyBsZXQgY29kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NvZGUnKTtcblx0XHQvLyBsZXQgY29kZU5vZGUgPSBjb2RlV2luZG93LmFwcGVuZENoaWxkKGNvZGUpO1xuXG5cdFx0d3JpdGVTdHJpbmcoJ2NhcCBzdGFnaW5nIGRlcGxveScsIGNvZGVXaW5kb3cpO1xuXG5cdH1cblxuXHRmdW5jdGlvbiB3cml0ZVN0cmluZyhzdHJpbmdUb1R5cGUsIHBsYWNlVG9UeXBlKSB7XG5cdFx0bGV0IGkgPSAwO1xuXG5cdFx0KGZ1bmN0aW9uIHdyaXRlQ2hhcigpIHtcblx0XHRcdGlmIChzdHJpbmdUb1R5cGUubGVuZ3RoID4gaSkge1xuXHRcdFx0XHRwbGFjZVRvVHlwZS5pbm5lckhUTUwgPSBwbGFjZVRvVHlwZS5pbm5lckhUTUwgKyBzdHJpbmdUb1R5cGVbaV07XG5cdFx0XHRcdGkrKztcblxuXHRcdFx0XHRsZXQgZGVsYXkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAwKSkgKyAxNDA7XG5cblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHdyaXRlQ2hhcigpO1xuXHRcdFx0XHR9LCBkZWxheSk7XG5cdFx0XHR9XG5cdFx0fSkoKVxuXHR9XG5cblx0Ly8gQWRkcyBhIHNjZW5lIHdpdGggcHJlZGVmaW5lZCBvcHRpb25zIHRvIHRoZSBjb250cm9sbGVyXG5cdGZ1bmN0aW9uIGFkZFNjZW5lKGNvbnRyb2xsZXIsIGVsZW1lbnQsIGhhbmRsZXIpIHtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdHRyaWdnZXJFbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0b2Zmc2V0OiA1MCxcblx0XHRcdHJldmVyc2U6IGZhbHNlXG5cdFx0fTtcblxuXHRcdG5ldyBTY3JvbGxNYWdpYy5TY2VuZShvcHRpb25zKS5vbignc3RhcnQnLCBoYW5kbGVyKS5hZGRUbyhjb250cm9sbGVyKTtcblx0fVxuXG5cblx0Ly8gUmVhY3QgTG9nbyBBbmltYXRpb25cblx0ZnVuY3Rpb24gcmVhY3RBbmltYXRpb24oKSB7XG5cdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG5cblx0XHRsZXQgbG9nbyA9IGdyb3VuZFNlY3Rpb24ucXVlcnlTZWxlY3Rvcignc3ZnJyk7XG5cdFx0bGV0IHBhdGhzID0gbG9nby5xdWVyeVNlbGVjdG9yQWxsKCdwYXRoJyk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSArKykge1xuXHRcdFx0c2V0RGFzaChwYXRoc1tpXSk7XG5cdFx0fVxuXG5cdFx0dGwudG8ocGF0aHMsIDMsIHsgJ3N0cm9rZS1kYXNob2Zmc2V0JzogMCwgb3BhY2l0eTogJzEnLCBlYXNlOiBQb3dlcjEuZWFzZUluIH0pXG5cdFx0LnRvKHBhdGhzLCAxLCB7ICdmaWxsJzogJyMwMGQ4ZmYnLCAnc3Ryb2tlJzogJyMwMGQ4ZmYnLCBlYXNlOiBQb3dlcjEuZWFzZUluIH0pO1xuXHR9XG5cblx0Ly8gU2V0cyBEYXNoIGFycmF5L29mZnNldCBvbiBlbGVtZW50XG5cdGZ1bmN0aW9uIHNldERhc2gocGF0aCkge1xuXHRcdGxldCBsZW5ndGggPSBwYXRoLmdldFRvdGFsTGVuZ3RoKCk7XG5cdFx0cGF0aC5zdHlsZVsnc3Ryb2tlLWRhc2hvZmZzZXQnXSA9IGxlbmd0aDtcblx0XHRwYXRoLnN0eWxlWydzdHJva2UtZGFzaGFycmF5J10gPSBsZW5ndGg7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRhc2hib2FyZDtcbiIsIi8qKlxuICogRmFkZXMgaW4gYSBiYWNrZ3JvdW5kIGltYWdlIG9uY2UgbG9hZGVkXG4gKi9cbmxldCBmYWRlQmFja2dyb3VuZEltYWdlID0gKGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gZmFkZShpbWFnZSkge1xuXHRcdGxldCBiYWNrZ3JvdW5kU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShpbWFnZSlbJ2JhY2tncm91bmQtaW1hZ2UnXTtcblx0XHRsZXQgaW1hZ2VUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cblx0XHRpZiAoIGJhY2tncm91bmRTdHlsZSAhPT0gJ25vbmUnICkge1xuXHRcdFx0bGV0IGJhY2tncm91bmRJbWFnZSA9IGJhY2tncm91bmRTdHlsZS5tYXRjaCgvXFwvXFwvKFthLXowLTk6XFwtXFwuXFwvXSspLylbMF07XG5cdFx0XHRpbWFnZVRlbXAuc3JjID0gYmFja2dyb3VuZEltYWdlLnJlcGxhY2UoL1wiL2csICcnKTtcblx0XHRcdGltYWdlVGVtcC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuXHRcdH1cblxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRmYWRlOiBmYWRlXG5cdH1cbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBmYWRlQmFja2dyb3VuZEltYWdlO1xuIiwiLyoqXG4gKiBGYWRlcyBpbiBiYWNrZ3JvdW5kIGltYWdlcyB3aXRoICdpcy1oaWRkZW4nIGNsYXNzXG4gKi9cbmltcG9ydCBmYWRlQmFja2dyb3VuZEltYWdlIGZyb20gJy4vZmFkZUJhY2tncm91bmRJbWFnZS5qcyc7XG5cbmxldCBmYWRlSXNIaWRkZW4gPSAoZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGxldCBpc0hpZGRlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pcy1oaWRkZW4nKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaXNIaWRkZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdGZhZGVCYWNrZ3JvdW5kSW1hZ2UuZmFkZShpc0hpZGRlbltpXSk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZhZGVJc0hpZGRlbjtcbiIsImxldCBoZWFkZXIgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcicpO1xuXHRsZXQgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlLW1haW4nKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGlmIChtYWluKSB7XG5cblx0XHRcdC8vIGluaXQgY29udHJvbGxlclxuXHRcdFx0dmFyIGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdFx0XHQvLyBjcmVhdGUgYSBzY2VuZVxuXHRcdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcblx0XHRcdFx0dHJpZ2dlckVsZW1lbnQ6IG1haW4sXG5cdFx0XHRcdHRyaWdnZXJIb29rOiAnb25MZWF2ZScsXG5cdFx0XHR9KS5vbignc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRvZ2dsZVdoaXRlb3V0KCk7XG5cblx0XHRcdH0pXG5cdFx0XHQuYWRkVG8oY29udHJvbGxlcik7IC8vIGFzc2lnbiB0aGUgc2NlbmUgdG8gdGhlIGNvbnRyb2xsZXJcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiB0b2dnbGVXaGl0ZW91dCgpIHtcblx0XHRoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbC1zaXRlaGVhZGVyLS13aGl0ZScpO1xuXHR9XG5cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGhlYWRlcjtcbiIsImltcG9ydCBmYWRlQmFja2dyb3VuZEltYWdlIGZyb20gJy4vZmFkZUJhY2tncm91bmRJbWFnZS5qcyc7XG5cbmxldCBob21lU2Nyb2xsID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IG5hdkl0ZW1zO1xuXHRsZXQgZGVsdGEgPSAwO1xuXHRsZXQgY3VycmVudFNsaWRlO1xuXHRsZXQgbmV4dFNsaWRlO1xuXHRsZXQgcHJldmlvdXNTbGlkZTtcblx0bGV0IHByZXZpb3VzU2xpZGVzO1xuXHRsZXQgaXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cdGxldCBsYXN0U2Nyb2xsZWQ7XG5cdGxldCBtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gdHJ1ZTtcblx0bGV0IGxhc3RNb3VzZXdoZWVsVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdGxldCBsYXN0U2Nyb2xsVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdGxldCBzY3JvbGxzID0gW107XG5cdGxldCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2Jyk7XG5cdGxldCB3b3JrU2xpZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlldycpKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGlmIChuYXYpIHtcblx0XHRcdG5hdkl0ZW1zID0gbmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcblx0XHR9XG5cdFx0YW5pbWF0ZUluaXRpYWwoKTtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2V0U2Nyb2xsKCkge1xuXHRcdHNjcm9sbHMgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGxzQXZnKG9mZnNldCkge1xuXHRcdGxldCBzdW0gPSAwO1xuXG5cdFx0bGV0IGVsbXMgPSBzY3JvbGxzLnNsaWNlKE1hdGgubWF4KHNjcm9sbHMubGVuZ3RoIC0gb2Zmc2V0LCAxKSk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGVsbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHN1bSArPSBlbG1zW2ldO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLmNlaWwoc3VtIC8gb2Zmc2V0KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFuaW1hdGVJbml0aWFsKCkge1xuXHRcdGxldCBmaXJzdFdvcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS0xJyk7XG5cdFx0Ly8gZmFkZUJhY2tncm91bmRJbWFnZShmaXJzdFdvcmsucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlld19faW1hZ2UnKSk7XG5cblx0XHQvLyBmYWRlSW1hZ2VzT25Mb2FkKCk7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRmaXJzdFdvcmsuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuYXZJdGVtc1swXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy1jb250YWluZXJfX25hdl9faXRlbS0taXMtYWN0aXZlJyk7XG5cdFx0fSwgMjAwKTtcblx0fVxuXG5cdC8vIERpc3BsYXlzIGJhY2tncm91bmQgaW1hZ2VzIG9ubHkgb25jZSBsb2FkZWRcblx0Ly8gZnVuY3Rpb24gZmFkZUltYWdlc09uTG9hZCgpIHtcblx0Ly8gXHRsZXQgd29ya0ltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXdfX2ltYWdlJyk7XG4gICAgLy9cblx0Ly8gXHRmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtJbWFnZXMubGVuZ3RoOyBpKyspIHtcblx0Ly8gXHRcdGZhZGVCYWNrZ3JvdW5kSW1hZ2UuZmFkZSh3b3JrSW1hZ2VzW2ldKTtcblx0Ly8gXHR9XG5cdC8vIH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZE5hdik7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgc2Nyb2xsTmF2KTtcblxuXHRcdC8vIFN0b3BzIHRvdWNobW92ZSB3b3JraW5nIG91dHJpZ2h0XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gU2V0cyB1cCBIYW1tZXIgdG8gaGFuZGxlIHRvdWNoIGV2ZW50c1xuXHRcdGxldCB3b3JrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy1jb250YWluZXInKTtcblx0XHRsZXQgdG91Y2ggPSBuZXcgSGFtbWVyKHdvcmtDb250YWluZXIpO1xuXG5cdFx0Ly8gRW5hYmxlcyB2ZXJ0aWNhbCBzd2lwZSBkZXRlY3Rpb25cblx0XHR0b3VjaC5nZXQoJ3N3aXBlJykuc2V0KHsgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0FMTCB9KTtcblxuXHRcdC8vIEdlc3R1cmVzIHRoYXQgZXF1YWwgZm9yd2FyZFxuXHRcdHRvdWNoLm9uKCdzd2lwZXVwIHN3aXBlbGVmdCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gR2VzdHVyZXMgdGhhdCBlcXVhbCBiYWNrd2FyZHNcblx0XHR0b3VjaC5vbignc3dpcGVkb3duIHN3aXBlcmlnaHQnLCBmdW5jdGlvbigpe1xuXHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEhvb2tzIHVwIG5hdmlnYXRpb25cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5hdkl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRuYXZJdGVtc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZU5hdik7XG5cdFx0fVxuXHRcdFxuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlTmF2KGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRsZXQgc2xpZGVOdW1iZXIgPSBldmVudC50YXJnZXQuaW5uZXJIVE1MLnN1YnN0cmluZygxKTtcblxuXHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdGdvVG9TbGlkZShzbGlkZU51bWJlcik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGlnaGxpZ2h0QWN0aXZlTmF2KCkge1xuXHRcdC8vIFJlbW92ZSB0aGUgYWN0aXZlIGNsYXNzXG5cdFx0bGV0IGFjdGl2ZU5hdkNsYXNzID0gJ3dvcmstcHJldmlldy1jb250YWluZXJfX25hdl9faXRlbS0taXMtYWN0aXZlJztcblx0XHRsZXQgYWN0aXZlTmF2SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYWN0aXZlTmF2Q2xhc3MpO1xuXHRcdGFjdGl2ZU5hdkl0ZW0uY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVOYXZDbGFzcyk7XG5cblx0XHRsZXQgbmV4dE51bWJlciA9IG5leHRTbGlkZS5pZC5zdWJzdHJpbmcobmV4dFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cdFx0Y29uc29sZS5sb2cobmV4dE51bWJlcik7XG5cblx0XHRuYXZJdGVtc1tuZXh0TnVtYmVyIC0gMV0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKGFjdGl2ZU5hdkNsYXNzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdvVG9TbGlkZShzbGlkZU51bWJlcikge1xuXHRcdG5leHRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLScgKyBzbGlkZU51bWJlciApO1xuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdGlmIChuZXh0U2xpZGUpIHtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cblx0XHRcdGxldCBjdXJyZW50TnVtYmVyID0gY3VycmVudFNsaWRlLmlkLnN1YnN0cmluZyhjdXJyZW50U2xpZGUuaWQubGVuZ3RoIC0xKTtcblx0XHRcdGxldCBuZXh0TnVtYmVyID0gbmV4dFNsaWRlLmlkLnN1YnN0cmluZyhuZXh0U2xpZGUuaWQubGVuZ3RoIC0xKTtcblxuXHRcdFx0aWYgKGN1cnJlbnROdW1iZXIgPiBuZXh0TnVtYmVyKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdnb2luZyBiYWNrd2FyZHMnKTtcblx0XHRcdFx0Ly8gSWYgd2UncmUgZ29pbmcgYmFja3dhcmRzXG5cdFx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblxuXHRcdFx0XHQvLyBOZWVkIHRvIGFkZCBuZXh0IHRvIEFMTCBnb2luZyBmb3J3YXJkXG5cdFx0XHRcdGxldCBwcmV2aW91c1NsaWRlcyA9IHdvcmtTbGlkZXMuc2xpY2UobmV4dE51bWJlciwgY3VycmVudE51bWJlciAtIDEpO1xuXG5cdFx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHByZXZpb3VzU2xpZGVzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRcdHByZXZpb3VzU2xpZGVzW2ldLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdFx0XHRcdHByZXZpb3VzU2xpZGVzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBJZiB3ZSdyZSBnb2luZyBmb3J3YXJkc1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZ29pbmcgZm9yd2FyZHMnKTtcblx0XHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdH1cblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNjcm9sbE5hdihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0bGV0IHNjcm9sbFRocmVzaG9sZCA9IDQwO1xuXG5cdFx0bGV0IHZhbHVlID0gLWUuZGVsdGFZO1xuXG5cdFx0aWYgKHNjcm9sbHMubGVuZ3RoID4gMTUwKSB7XG5cdFx0XHRzY3JvbGxzLnNoaWZ0KCk7XG5cdFx0fVxuXG5cdFx0c2Nyb2xscy5wdXNoKE1hdGguYWJzKHZhbHVlKSk7XG5cblx0XHR2YXIgY3VyclRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG5cdFx0aWYgKChjdXJyVGltZSAtIGxhc3RNb3VzZXdoZWVsVGltZSkgPiAyMDApIHtcblx0XHRcdHJlc2V0U2Nyb2xsKCk7XG5cdFx0fVxuXG5cdFx0bGFzdE1vdXNld2hlZWxUaW1lID0gY3VyclRpbWU7XG5cblx0XHR2YXIgbGFzdEF2ZyA9IHNjcm9sbHNBdmcoNSk7XG5cdFx0dmFyIG1pZEF2ZyA9IHNjcm9sbHNBdmcoNDApO1xuXG5cdFx0aWYgKGxhc3RBdmcgPiBtaWRBdmcpIHtcblx0XHRcdGlmIChtb3VzZXdoZWVsQ2FuU2Nyb2xsICYmIGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdG1vdXNld2hlZWxDYW5TY3JvbGwgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICh2YWx1ZSA8IDApIHtcblx0XHRcdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1vdXNld2hlZWxDYW5TY3JvbGwgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGtleWJvYXJkTmF2KGV2ZW50KSB7XG5cdFx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdHJlZ3Jlc3NTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHR9XG5cblx0ZnVuY3Rpb24gcmVzZXRUcmFuc2l0aW9uaW5nKCkge1xuXHRcdGlzVHJhbnNpdGlvbmluZyA9IHRydWU7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0aXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cdFx0fSwgMTAwMCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhZHZhbmNlU2xpZGUoKSB7XG5cblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0bmV4dFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tbmV4dCcpO1xuXG5cdFx0aWYgKG5leHRTbGlkZSkge1xuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXHRcblx0ZnVuY3Rpb24gcmVncmVzc1NsaWRlKCkge1xuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRwcmV2aW91c1NsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0cHJldmlvdXNTbGlkZSA9IHByZXZpb3VzU2xpZGVzW3ByZXZpb3VzU2xpZGVzLmxlbmd0aCAtIDFdO1xuXG5cdFx0aWYgKHByZXZpb3VzU2xpZGUpIHtcblx0XHRcdC8vIFNldHMgbmV4dCBhY3R1YWwgc2xpZGUgKG5vdCBjaHJvbm9sb2dpY2FsbHkpIHRvIHByZXZpb3VzIHNsaWRlXG5cdFx0XHRuZXh0U2xpZGUgPSBwcmV2aW91c1NsaWRlO1xuXG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgaG9tZVNjcm9sbDtcbiIsIi8qKlxuICogQWxsb3dzIGZvciBsZWZ0L3JpZ2h0IG5hdmlnYXRpb24gaW4gam91cm5hbFxuICovXG5sZXQgam91cm5hbE5hdiA9IChmdW5jdGlvbigpIHtcblx0bGV0IHByZXZpb3VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlX19uYXZpZ2F0aW9uLS1wcmV2aW91cyBhJyk7XG5cdGxldCBuZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlX19uYXZpZ2F0aW9uLS1uZXh0IGEnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmROYXYpO1xuXHR9XG5cblx0ZnVuY3Rpb24ga2V5Ym9hcmROYXYoZXZlbnQpIHtcblx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdGNhc2UgMzc6XG5cdFx0XHRcdGlmIChwcmV2aW91cykge1xuXHRcdFx0XHRcdGdvVG9MaW5rKCBwcmV2aW91cy5ocmVmICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDM5OlxuXHRcdFx0XHRpZiAobmV4dCkge1xuXHRcdFx0XHRcdGdvVG9MaW5rKCBuZXh0LmhyZWYgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBnb1RvTGluayhsaW5rKSB7XG5cdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaW5rO1xuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlTmF2KGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsTmF2O1xuIiwiLyoqXG4gKiBIYW5kbGVzIG1vYmlsZSBtZW51XG4gKi9cbmxldCBtZW51ID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcicpO1xuXHRsZXQgdG9nZ2xlID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXJfX21lbnUtdG9nZ2xlJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dG9nZ2xlTWVudSgpO1xuXHRcdFx0Y2hhbmdlVGV4dCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcblx0XHRoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbC1zaXRlaGVhZGVyLS1uYXYtaXMtb3BlbicpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2hhbmdlVGV4dCgpIHtcblx0XHRpZiAodG9nZ2xlLmlubmVySFRNTCA9PSAnTWVudScpIHtcdFxuXHRcdFx0dG9nZ2xlLmlubmVySFRNTCA9ICdDbG9zZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvZ2dsZS5pbm5lckhUTUwgPSAnTWVudSc7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1lbnU7XG4iLCJsZXQgcHJpbWVsYWJzID0gKGZ1bmN0aW9uICgpIHtcblx0Ly8gSW5pdCBjb250cm9sbGVyXG5cdGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRsZXQgcHJvYmxlbVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fc2VjdGlvbi0tcHJvYmxlbXMnKTtcblx0bGV0IG1vZHVsYXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3NlY3Rpb24tLW1vZHVsYXItYm94ZXMnKTtcblx0bGV0IHN0YW5kYXJkU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19zZWN0aW9uLS1hcy1zdGFuZGFyZCcpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJQWN0aW9ucygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJQWN0aW9ucygpIHtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBwcm9ibGVtU2VjdGlvbiwgcHJvYmxlbUhhbmRsZXIpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIG1vZHVsYXJTZWN0aW9uLCBtb2R1bGFySGFuZGxlcik7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgc3RhbmRhcmRTZWN0aW9uLCBzdGFuZGFyZEhhbmRsZXIpO1xuXHR9XG5cblx0Ly8gQWRkcyBhIHNjZW5lIHdpdGggcHJlZGVmaW5lZCBvcHRpb25zIHRvIHRoZSBjb250cm9sbGVyXG5cdGZ1bmN0aW9uIGFkZFNjZW5lKGNvbnRyb2xsZXIsIGVsZW1lbnQsIGhhbmRsZXIpIHtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdHRyaWdnZXJFbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0b2Zmc2V0OiA1MCxcblx0XHRcdHJldmVyc2U6IGZhbHNlXG5cdFx0fTtcblxuXHRcdG5ldyBTY3JvbGxNYWdpYy5TY2VuZShvcHRpb25zKS5vbignc3RhcnQnLCBoYW5kbGVyKS5hZGRUbyhjb250cm9sbGVyKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHByb2JsZW1IYW5kbGVyKCkge1xuXHRcdHByb2JsZW1TZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3ByaW1lLWxhYnNfX3NlY3Rpb24tLXByb2JsZW1zLS1pcy1hY3RpdmUnKTtcblx0fVxuXG5cdGZ1bmN0aW9uIG1vZHVsYXJIYW5kbGVyKCkge1xuXHRcdG1vZHVsYXJTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3ByaW1lLWxhYnNfX3NlY3Rpb24tLW1vZHVsYXItYm94ZXMtLWlzLWFjdGl2ZScpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc3RhbmRhcmRIYW5kbGVyKCkge1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX192aWRlbycpLnBsYXkoKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpbWVsYWJzO1xuIl19
