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

	function init() {
		bindUIActions();
	}

	function bindUIActions() {
		// Init controller
		var controller = new ScrollMagic.Controller();

		// Fade in intro image
		fadeIntro();

		// Add scenes
		addScene(controller, groundSection, reactAnimation);
	}

	function fadeIntro() {
		var intro = document.querySelector('.intro__background');
		_fadeBackgroundImage2.default.fade(intro);
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
		var backgroundImage = backgroundStyle.match(/\/\/([a-z0-9\-\.\/]+)/)[0];
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
}();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYXJ0aWFscy9kYXNoYm9hcmQuanMiLCJzcmMvanMvcGFydGlhbHMvZmFkZUJhY2tncm91bmRJbWFnZS5qcyIsInNyYy9qcy9wYXJ0aWFscy9mYWRlSXNIaWRkZW4uanMiLCJzcmMvanMvcGFydGlhbHMvaGVhZGVyLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFDekQsZ0JBQUssSUFBTCxHQUR5RDs7QUFHekQsd0JBQWEsSUFBYixHQUh5RDs7QUFLekQsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsc0JBQXZCLENBQUosRUFBb0Q7QUFDbkQsbUJBQU8sSUFBUCxHQURtRDtFQUFwRDs7QUFJQSxLQUFJLFNBQVMsYUFBVCxDQUF1QixlQUF2QixDQUFKLEVBQTZDO0FBQzVDLHVCQUFXLElBQVgsR0FENEM7RUFBN0M7O0FBSUEsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBSixFQUEyQztBQUMxQyxzQkFBVSxJQUFWLEdBRDBDO0VBQTNDOztBQUlBLEtBQUksU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQUosRUFBMEM7QUFDekMsc0JBQVUsSUFBVixHQUR5QztFQUExQzs7QUFJQSxLQUFJLFNBQVMsYUFBVCxDQUF1QixpQkFBdkIsQ0FBSixFQUErQztBQUM5Qyx1QkFBVyxJQUFYLEdBRDhDO0VBQS9DO0NBckI2QyxDQUE5Qzs7Ozs7Ozs7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QUFTLFVBQVQsRUFBcUIsY0FBckIsRUFBcUMsY0FBckMsRUFGd0I7QUFHeEIsV0FBUyxVQUFULEVBQXFCLGVBQXJCLEVBQXNDLGVBQXRDLEVBSHdCO0VBQXpCOzs7QUFaNEIsVUFtQm5CLFFBQVQsQ0FBa0IsVUFBbEIsRUFBOEIsT0FBOUIsRUFBdUMsT0FBdkMsRUFBZ0Q7QUFDL0MsTUFBSSxVQUFVO0FBQ2IsbUJBQWdCLE9BQWhCO0FBQ0EsV0FBUSxFQUFSO0FBQ0EsWUFBUyxLQUFUO0dBSEcsQ0FEMkM7O0FBTy9DLE1BQUksWUFBWSxLQUFaLENBQWtCLE9BQXRCLEVBQStCLEVBQS9CLENBQWtDLE9BQWxDLEVBQTJDLE9BQTNDLEVBQW9ELEtBQXBELENBQTBELFVBQTFELEVBUCtDO0VBQWhEOztBQVVBLFVBQVMsY0FBVCxHQUEwQjtBQUN6QixpQkFBZSxTQUFmLENBQXlCLEdBQXpCLENBQTZCLDBDQUE3QixFQUR5QjtFQUExQjs7QUFJQSxVQUFTLGNBQVQsR0FBMEI7QUFDekIsaUJBQWUsU0FBZixDQUF5QixHQUF6QixDQUE2QiwrQ0FBN0IsRUFEeUI7RUFBMUI7O0FBSUEsVUFBUyxlQUFULEdBQTJCO0FBQzFCLFdBQVMsYUFBVCxDQUF1QixvQkFBdkIsRUFBNkMsSUFBN0MsR0FEMEI7RUFBM0I7O0FBSUEsUUFBTztBQUNOLFFBQU0sSUFBTjtFQURELENBekM0QjtDQUFaLEVBQWI7O2tCQThDVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgcHJpbWVsYWJzIGZyb20gJy4vcGFydGlhbHMvcHJpbWVsYWJzLmpzJztcbmltcG9ydCBtZW51IGZyb20gJy4vcGFydGlhbHMvbWVudS5qcyc7XG5pbXBvcnQgaG9tZVNjcm9sbCBmcm9tICcuL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMnO1xuaW1wb3J0IGpvdXJuYWxOYXYgZnJvbSAnLi9wYXJ0aWFscy9qb3VybmFsTmF2LmpzJztcbmltcG9ydCBkYXNoYm9hcmQgZnJvbSAnLi9wYXJ0aWFscy9kYXNoYm9hcmQuanMnO1xuaW1wb3J0IGhlYWRlciBmcm9tICcuL3BhcnRpYWxzL2hlYWRlci5qcyc7XG5pbXBvcnQgZmFkZUlzSGlkZGVuIGZyb20gJy4vcGFydGlhbHMvZmFkZUlzSGlkZGVuLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblx0bWVudS5pbml0KCk7XG5cblx0ZmFkZUlzSGlkZGVuLmluaXQoKTtcblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlci0td2hpdGUnKSkge1xuXHRcdGhlYWRlci5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldycpKSB7XG5cdFx0aG9tZVNjcm9sbC5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnMnKSkge1xuXHRcdHByaW1lbGFicy5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZCcpKSB7XG5cdFx0ZGFzaGJvYXJkLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam91cm5hbC1zaW5nbGUnKSkge1xuXHRcdGpvdXJuYWxOYXYuaW5pdCgpO1xuXHR9XG59KTtcbiIsImltcG9ydCBmYWRlQmFja2dyb3VuZEltYWdlIGZyb20gJy4vZmFkZUJhY2tncm91bmRJbWFnZS5qcyc7XG5cbmxldCBkYXNoYm9hcmQgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgZ3JvdW5kU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2dyb3VuZHdvcmsnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUFjdGlvbnMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUFjdGlvbnMoKSB7XG5cdFx0Ly8gSW5pdCBjb250cm9sbGVyXG5cdFx0bGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdFx0Ly8gRmFkZSBpbiBpbnRybyBpbWFnZVxuXHRcdGZhZGVJbnRybygpO1xuXG5cdFx0Ly8gQWRkIHNjZW5lc1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIGdyb3VuZFNlY3Rpb24sIHJlYWN0QW5pbWF0aW9uKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGZhZGVJbnRybygpIHtcblx0XHRsZXQgaW50cm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW50cm9fX2JhY2tncm91bmQnKTtcblx0XHRmYWRlQmFja2dyb3VuZEltYWdlLmZhZGUoaW50cm8pO1xuXHR9XG5cblx0Ly8gQWRkcyBhIHNjZW5lIHdpdGggcHJlZGVmaW5lZCBvcHRpb25zIHRvIHRoZSBjb250cm9sbGVyXG5cdGZ1bmN0aW9uIGFkZFNjZW5lKGNvbnRyb2xsZXIsIGVsZW1lbnQsIGhhbmRsZXIpIHtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdHRyaWdnZXJFbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0b2Zmc2V0OiA1MCxcblx0XHRcdHJldmVyc2U6IGZhbHNlXG5cdFx0fTtcblxuXHRcdG5ldyBTY3JvbGxNYWdpYy5TY2VuZShvcHRpb25zKS5vbignc3RhcnQnLCBoYW5kbGVyKS5hZGRUbyhjb250cm9sbGVyKTtcblx0fVxuXG5cblx0Ly8gUmVhY3QgTG9nbyBBbmltYXRpb25cblx0ZnVuY3Rpb24gcmVhY3RBbmltYXRpb24oKSB7XG5cdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG5cblx0XHRsZXQgbG9nbyA9IGdyb3VuZFNlY3Rpb24ucXVlcnlTZWxlY3Rvcignc3ZnJyk7XG5cdFx0bGV0IHBhdGhzID0gbG9nby5xdWVyeVNlbGVjdG9yQWxsKCdwYXRoJyk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSArKykge1xuXHRcdFx0c2V0RGFzaChwYXRoc1tpXSk7XG5cdFx0fVxuXG5cdFx0dGwudG8ocGF0aHMsIDMsIHsgJ3N0cm9rZS1kYXNob2Zmc2V0JzogMCwgb3BhY2l0eTogJzEnLCBlYXNlOiBQb3dlcjEuZWFzZUluIH0pXG5cdFx0LnRvKHBhdGhzLCAxLCB7ICdmaWxsJzogJyMwMGQ4ZmYnLCAnc3Ryb2tlJzogJyMwMGQ4ZmYnLCBlYXNlOiBQb3dlcjEuZWFzZUluIH0pO1xuXHR9XG5cblx0Ly8gU2V0cyBEYXNoIGFycmF5L29mZnNldCBvbiBlbGVtZW50XG5cdGZ1bmN0aW9uIHNldERhc2gocGF0aCkge1xuXHRcdGxldCBsZW5ndGggPSBwYXRoLmdldFRvdGFsTGVuZ3RoKCk7XG5cdFx0cGF0aC5zdHlsZVsnc3Ryb2tlLWRhc2hvZmZzZXQnXSA9IGxlbmd0aDtcblx0XHRwYXRoLnN0eWxlWydzdHJva2UtZGFzaGFycmF5J10gPSBsZW5ndGg7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRhc2hib2FyZDtcbiIsIi8qKlxuICogRmFkZXMgaW4gYSBiYWNrZ3JvdW5kIGltYWdlIG9uY2UgbG9hZGVkXG4gKi9cbmxldCBmYWRlQmFja2dyb3VuZEltYWdlID0gKGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gZmFkZShpbWFnZSkge1xuXHRcdGxldCBiYWNrZ3JvdW5kU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShpbWFnZSlbJ2JhY2tncm91bmQtaW1hZ2UnXTtcblx0XHRsZXQgYmFja2dyb3VuZEltYWdlID0gYmFja2dyb3VuZFN0eWxlLm1hdGNoKC9cXC9cXC8oW2EtejAtOVxcLVxcLlxcL10rKS8pWzBdO1xuXHRcdGxldCBpbWFnZVRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0XHRpbWFnZVRlbXAuc3JjID0gYmFja2dyb3VuZEltYWdlLnJlcGxhY2UoL1wiL2csICcnKTtcblxuXHRcdGltYWdlVGVtcC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0ZmFkZTogZmFkZVxuXHR9XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgZmFkZUJhY2tncm91bmRJbWFnZTtcbiIsImltcG9ydCBmYWRlQmFja2dyb3VuZEltYWdlIGZyb20gJy4vZmFkZUJhY2tncm91bmRJbWFnZS5qcyc7XG5cbmxldCBmYWRlSXNIaWRkZW4gPSAoZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGxldCBpc0hpZGRlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pcy1oaWRkZW4nKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaXNIaWRkZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdGZhZGVCYWNrZ3JvdW5kSW1hZ2UuZmFkZShpc0hpZGRlbltpXSk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZhZGVJc0hpZGRlbjtcbiIsImxldCBoZWFkZXIgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcicpO1xuXHRsZXQgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlLW1haW4nKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGlmIChtYWluKSB7XG5cblx0XHRcdC8vIGluaXQgY29udHJvbGxlclxuXHRcdFx0dmFyIGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdFx0XHQvLyBjcmVhdGUgYSBzY2VuZVxuXHRcdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcblx0XHRcdFx0dHJpZ2dlckVsZW1lbnQ6IG1haW4sXG5cdFx0XHRcdHRyaWdnZXJIb29rOiAnb25MZWF2ZScsXG5cdFx0XHR9KS5vbignc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRvZ2dsZVdoaXRlb3V0KCk7XG5cblx0XHRcdH0pXG5cdFx0XHQuYWRkVG8oY29udHJvbGxlcik7IC8vIGFzc2lnbiB0aGUgc2NlbmUgdG8gdGhlIGNvbnRyb2xsZXJcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiB0b2dnbGVXaGl0ZW91dCgpIHtcblx0XHRoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbC1zaXRlaGVhZGVyLS13aGl0ZScpO1xuXHR9XG5cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGhlYWRlcjtcbiIsImltcG9ydCBmYWRlQmFja2dyb3VuZEltYWdlIGZyb20gJy4vZmFkZUJhY2tncm91bmRJbWFnZS5qcyc7XG5cbmxldCBob21lU2Nyb2xsID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IG5hdkl0ZW1zO1xuXHRsZXQgZGVsdGEgPSAwO1xuXHRsZXQgY3VycmVudFNsaWRlO1xuXHRsZXQgbmV4dFNsaWRlO1xuXHRsZXQgcHJldmlvdXNTbGlkZTtcblx0bGV0IHByZXZpb3VzU2xpZGVzO1xuXHRsZXQgaXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cdGxldCBsYXN0U2Nyb2xsZWQ7XG5cdGxldCBtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gdHJ1ZTtcblx0bGV0IGxhc3RNb3VzZXdoZWVsVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdGxldCBsYXN0U2Nyb2xsVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdGxldCBzY3JvbGxzID0gW107XG5cdGxldCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2Jyk7XG5cdGxldCB3b3JrU2xpZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlldycpKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGlmIChuYXYpIHtcblx0XHRcdG5hdkl0ZW1zID0gbmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcblx0XHR9XG5cdFx0YW5pbWF0ZUluaXRpYWwoKTtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2V0U2Nyb2xsKCkge1xuXHRcdHNjcm9sbHMgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGxzQXZnKG9mZnNldCkge1xuXHRcdGxldCBzdW0gPSAwO1xuXG5cdFx0bGV0IGVsbXMgPSBzY3JvbGxzLnNsaWNlKE1hdGgubWF4KHNjcm9sbHMubGVuZ3RoIC0gb2Zmc2V0LCAxKSk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGVsbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHN1bSArPSBlbG1zW2ldO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLmNlaWwoc3VtIC8gb2Zmc2V0KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFuaW1hdGVJbml0aWFsKCkge1xuXHRcdGxldCBmaXJzdFdvcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS0xJyk7XG5cdFx0Ly8gZmFkZUJhY2tncm91bmRJbWFnZShmaXJzdFdvcmsucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlld19faW1hZ2UnKSk7XG5cblx0XHQvLyBmYWRlSW1hZ2VzT25Mb2FkKCk7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRmaXJzdFdvcmsuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuYXZJdGVtc1swXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy1jb250YWluZXJfX25hdl9faXRlbS0taXMtYWN0aXZlJyk7XG5cdFx0fSwgMjAwKTtcblx0fVxuXG5cdC8vIERpc3BsYXlzIGJhY2tncm91bmQgaW1hZ2VzIG9ubHkgb25jZSBsb2FkZWRcblx0Ly8gZnVuY3Rpb24gZmFkZUltYWdlc09uTG9hZCgpIHtcblx0Ly8gXHRsZXQgd29ya0ltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXdfX2ltYWdlJyk7XG4gICAgLy9cblx0Ly8gXHRmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtJbWFnZXMubGVuZ3RoOyBpKyspIHtcblx0Ly8gXHRcdGZhZGVCYWNrZ3JvdW5kSW1hZ2UuZmFkZSh3b3JrSW1hZ2VzW2ldKTtcblx0Ly8gXHR9XG5cdC8vIH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZE5hdik7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgc2Nyb2xsTmF2KTtcblxuXHRcdC8vIFN0b3BzIHRvdWNobW92ZSB3b3JraW5nIG91dHJpZ2h0XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gU2V0cyB1cCBIYW1tZXIgdG8gaGFuZGxlIHRvdWNoIGV2ZW50c1xuXHRcdGxldCB3b3JrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy1jb250YWluZXInKTtcblx0XHRsZXQgdG91Y2ggPSBuZXcgSGFtbWVyKHdvcmtDb250YWluZXIpO1xuXG5cdFx0Ly8gRW5hYmxlcyB2ZXJ0aWNhbCBzd2lwZSBkZXRlY3Rpb25cblx0XHR0b3VjaC5nZXQoJ3N3aXBlJykuc2V0KHsgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0FMTCB9KTtcblxuXHRcdC8vIEdlc3R1cmVzIHRoYXQgZXF1YWwgZm9yd2FyZFxuXHRcdHRvdWNoLm9uKCdzd2lwZXVwIHN3aXBlbGVmdCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gR2VzdHVyZXMgdGhhdCBlcXVhbCBiYWNrd2FyZHNcblx0XHR0b3VjaC5vbignc3dpcGVkb3duIHN3aXBlcmlnaHQnLCBmdW5jdGlvbigpe1xuXHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEhvb2tzIHVwIG5hdmlnYXRpb25cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5hdkl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRuYXZJdGVtc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZU5hdik7XG5cdFx0fVxuXHRcdFxuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlTmF2KGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRsZXQgc2xpZGVOdW1iZXIgPSBldmVudC50YXJnZXQuaW5uZXJIVE1MLnN1YnN0cmluZygxKTtcblxuXHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdGdvVG9TbGlkZShzbGlkZU51bWJlcik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGlnaGxpZ2h0QWN0aXZlTmF2KCkge1xuXHRcdC8vIFJlbW92ZSB0aGUgYWN0aXZlIGNsYXNzXG5cdFx0bGV0IGFjdGl2ZU5hdkNsYXNzID0gJ3dvcmstcHJldmlldy1jb250YWluZXJfX25hdl9faXRlbS0taXMtYWN0aXZlJztcblx0XHRsZXQgYWN0aXZlTmF2SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYWN0aXZlTmF2Q2xhc3MpO1xuXHRcdGFjdGl2ZU5hdkl0ZW0uY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVOYXZDbGFzcyk7XG5cblx0XHRsZXQgbmV4dE51bWJlciA9IG5leHRTbGlkZS5pZC5zdWJzdHJpbmcobmV4dFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cdFx0Y29uc29sZS5sb2cobmV4dE51bWJlcik7XG5cblx0XHRuYXZJdGVtc1tuZXh0TnVtYmVyIC0gMV0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKGFjdGl2ZU5hdkNsYXNzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdvVG9TbGlkZShzbGlkZU51bWJlcikge1xuXHRcdG5leHRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLScgKyBzbGlkZU51bWJlciApO1xuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdGlmIChuZXh0U2xpZGUpIHtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cblx0XHRcdGxldCBjdXJyZW50TnVtYmVyID0gY3VycmVudFNsaWRlLmlkLnN1YnN0cmluZyhjdXJyZW50U2xpZGUuaWQubGVuZ3RoIC0xKTtcblx0XHRcdGxldCBuZXh0TnVtYmVyID0gbmV4dFNsaWRlLmlkLnN1YnN0cmluZyhuZXh0U2xpZGUuaWQubGVuZ3RoIC0xKTtcblxuXHRcdFx0aWYgKGN1cnJlbnROdW1iZXIgPiBuZXh0TnVtYmVyKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdnb2luZyBiYWNrd2FyZHMnKTtcblx0XHRcdFx0Ly8gSWYgd2UncmUgZ29pbmcgYmFja3dhcmRzXG5cdFx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblxuXHRcdFx0XHQvLyBOZWVkIHRvIGFkZCBuZXh0IHRvIEFMTCBnb2luZyBmb3J3YXJkXG5cdFx0XHRcdGxldCBwcmV2aW91c1NsaWRlcyA9IHdvcmtTbGlkZXMuc2xpY2UobmV4dE51bWJlciwgY3VycmVudE51bWJlciAtIDEpO1xuXG5cdFx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHByZXZpb3VzU2xpZGVzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRcdHByZXZpb3VzU2xpZGVzW2ldLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdFx0XHRcdHByZXZpb3VzU2xpZGVzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBJZiB3ZSdyZSBnb2luZyBmb3J3YXJkc1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZ29pbmcgZm9yd2FyZHMnKTtcblx0XHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdH1cblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNjcm9sbE5hdihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0bGV0IHNjcm9sbFRocmVzaG9sZCA9IDQwO1xuXG5cdFx0bGV0IHZhbHVlID0gLWUuZGVsdGFZO1xuXG5cdFx0aWYgKHNjcm9sbHMubGVuZ3RoID4gMTUwKSB7XG5cdFx0XHRzY3JvbGxzLnNoaWZ0KCk7XG5cdFx0fVxuXG5cdFx0c2Nyb2xscy5wdXNoKE1hdGguYWJzKHZhbHVlKSk7XG5cblx0XHR2YXIgY3VyclRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG5cdFx0aWYgKChjdXJyVGltZSAtIGxhc3RNb3VzZXdoZWVsVGltZSkgPiAyMDApIHtcblx0XHRcdHJlc2V0U2Nyb2xsKCk7XG5cdFx0fVxuXG5cdFx0bGFzdE1vdXNld2hlZWxUaW1lID0gY3VyclRpbWU7XG5cblx0XHR2YXIgbGFzdEF2ZyA9IHNjcm9sbHNBdmcoNSk7XG5cdFx0dmFyIG1pZEF2ZyA9IHNjcm9sbHNBdmcoNDApO1xuXG5cdFx0aWYgKGxhc3RBdmcgPiBtaWRBdmcpIHtcblx0XHRcdGlmIChtb3VzZXdoZWVsQ2FuU2Nyb2xsICYmIGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdG1vdXNld2hlZWxDYW5TY3JvbGwgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICh2YWx1ZSA8IDApIHtcblx0XHRcdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1vdXNld2hlZWxDYW5TY3JvbGwgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGtleWJvYXJkTmF2KGV2ZW50KSB7XG5cdFx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdHJlZ3Jlc3NTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHR9XG5cblx0ZnVuY3Rpb24gcmVzZXRUcmFuc2l0aW9uaW5nKCkge1xuXHRcdGlzVHJhbnNpdGlvbmluZyA9IHRydWU7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0aXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cdFx0fSwgMTAwMCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhZHZhbmNlU2xpZGUoKSB7XG5cblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0bmV4dFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tbmV4dCcpO1xuXG5cdFx0aWYgKG5leHRTbGlkZSkge1xuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXHRcblx0ZnVuY3Rpb24gcmVncmVzc1NsaWRlKCkge1xuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRwcmV2aW91c1NsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0cHJldmlvdXNTbGlkZSA9IHByZXZpb3VzU2xpZGVzW3ByZXZpb3VzU2xpZGVzLmxlbmd0aCAtIDFdO1xuXG5cdFx0aWYgKHByZXZpb3VzU2xpZGUpIHtcblx0XHRcdC8vIFNldHMgbmV4dCBhY3R1YWwgc2xpZGUgKG5vdCBjaHJvbm9sb2dpY2FsbHkpIHRvIHByZXZpb3VzIHNsaWRlXG5cdFx0XHRuZXh0U2xpZGUgPSBwcmV2aW91c1NsaWRlO1xuXG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgaG9tZVNjcm9sbDtcbiIsIi8qKlxuICogQWxsb3dzIGZvciBsZWZ0L3JpZ2h0IG5hdmlnYXRpb24gaW4gam91cm5hbFxuICovXG5sZXQgam91cm5hbE5hdiA9IChmdW5jdGlvbigpIHtcblx0bGV0IHByZXZpb3VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlX19uYXZpZ2F0aW9uLS1wcmV2aW91cyBhJyk7XG5cdGxldCBuZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlX19uYXZpZ2F0aW9uLS1uZXh0IGEnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmROYXYpO1xuXHR9XG5cblx0ZnVuY3Rpb24ga2V5Ym9hcmROYXYoZXZlbnQpIHtcblx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdGNhc2UgMzc6XG5cdFx0XHRcdGlmIChwcmV2aW91cykge1xuXHRcdFx0XHRcdGdvVG9MaW5rKCBwcmV2aW91cy5ocmVmICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDM5OlxuXHRcdFx0XHRpZiAobmV4dCkge1xuXHRcdFx0XHRcdGdvVG9MaW5rKCBuZXh0LmhyZWYgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBnb1RvTGluayhsaW5rKSB7XG5cdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaW5rO1xuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlTmF2KGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsTmF2O1xuIiwiLyoqXG4gKiBIYW5kbGVzIG1vYmlsZSBtZW51XG4gKi9cbmxldCBtZW51ID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcicpO1xuXHRsZXQgdG9nZ2xlID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXJfX21lbnUtdG9nZ2xlJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dG9nZ2xlTWVudSgpO1xuXHRcdFx0Y2hhbmdlVGV4dCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcblx0XHRoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbC1zaXRlaGVhZGVyLS1uYXYtaXMtb3BlbicpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2hhbmdlVGV4dCgpIHtcblx0XHRpZiAodG9nZ2xlLmlubmVySFRNTCA9PSAnTWVudScpIHtcdFxuXHRcdFx0dG9nZ2xlLmlubmVySFRNTCA9ICdDbG9zZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvZ2dsZS5pbm5lckhUTUwgPSAnTWVudSc7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1lbnU7XG4iLCJsZXQgcHJpbWVsYWJzID0gKGZ1bmN0aW9uICgpIHtcblx0Ly8gSW5pdCBjb250cm9sbGVyXG5cdGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRsZXQgcHJvYmxlbVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fc2VjdGlvbi0tcHJvYmxlbXMnKTtcblx0bGV0IG1vZHVsYXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3NlY3Rpb24tLW1vZHVsYXItYm94ZXMnKTtcblx0bGV0IHN0YW5kYXJkU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19zZWN0aW9uLS1hcy1zdGFuZGFyZCcpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJQWN0aW9ucygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJQWN0aW9ucygpIHtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBwcm9ibGVtU2VjdGlvbiwgcHJvYmxlbUhhbmRsZXIpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIG1vZHVsYXJTZWN0aW9uLCBtb2R1bGFySGFuZGxlcik7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgc3RhbmRhcmRTZWN0aW9uLCBzdGFuZGFyZEhhbmRsZXIpO1xuXHR9XG5cblx0Ly8gQWRkcyBhIHNjZW5lIHdpdGggcHJlZGVmaW5lZCBvcHRpb25zIHRvIHRoZSBjb250cm9sbGVyXG5cdGZ1bmN0aW9uIGFkZFNjZW5lKGNvbnRyb2xsZXIsIGVsZW1lbnQsIGhhbmRsZXIpIHtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdHRyaWdnZXJFbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0b2Zmc2V0OiA1MCxcblx0XHRcdHJldmVyc2U6IGZhbHNlXG5cdFx0fTtcblxuXHRcdG5ldyBTY3JvbGxNYWdpYy5TY2VuZShvcHRpb25zKS5vbignc3RhcnQnLCBoYW5kbGVyKS5hZGRUbyhjb250cm9sbGVyKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHByb2JsZW1IYW5kbGVyKCkge1xuXHRcdHByb2JsZW1TZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3ByaW1lLWxhYnNfX3NlY3Rpb24tLXByb2JsZW1zLS1pcy1hY3RpdmUnKTtcblx0fVxuXG5cdGZ1bmN0aW9uIG1vZHVsYXJIYW5kbGVyKCkge1xuXHRcdG1vZHVsYXJTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3ByaW1lLWxhYnNfX3NlY3Rpb24tLW1vZHVsYXItYm94ZXMtLWlzLWFjdGl2ZScpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc3RhbmRhcmRIYW5kbGVyKCkge1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX192aWRlbycpLnBsYXkoKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpbWVsYWJzO1xuIl19
