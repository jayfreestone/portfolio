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
	var groundSection = document.querySelector('.dashboard__groundwork');

	function init() {
		bindUIActions();
	}

	function bindUIActions() {
		// Init controller
		var controller = new ScrollMagic.Controller();

		// Add scenes
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYXJ0aWFscy9kYXNoYm9hcmQuanMiLCJzcmMvanMvcGFydGlhbHMvaGVhZGVyLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFZO0FBQ3pELGdCQUFLLElBQUwsR0FEeUQ7O0FBR3pELEtBQUksU0FBUyxhQUFULENBQXVCLHNCQUF2QixDQUFKLEVBQW9EO0FBQ25ELG1CQUFPLElBQVAsR0FEbUQ7RUFBcEQ7O0FBSUEsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBSixFQUE2QztBQUM1Qyx1QkFBVyxJQUFYLEdBRDRDO0VBQTdDOztBQUlBLEtBQUksU0FBUyxhQUFULENBQXVCLGFBQXZCLENBQUosRUFBMkM7QUFDMUMsc0JBQVUsSUFBVixHQUQwQztFQUEzQzs7QUFJQSxLQUFJLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFKLEVBQTBDO0FBQ3pDLHNCQUFVLElBQVYsR0FEeUM7RUFBMUM7O0FBSUEsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsaUJBQXZCLENBQUosRUFBK0M7QUFDOUMsdUJBQVcsSUFBWCxHQUQ4QztFQUEvQztDQW5CNkMsQ0FBOUM7Ozs7Ozs7O0FDUEEsSUFBSSxZQUFhLFlBQVk7QUFDNUIsS0FBSSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLHdCQUF2QixDQUFoQixDQUR3Qjs7QUFHNUIsVUFBUyxJQUFULEdBQWdCO0FBQ2Ysa0JBRGU7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LEVBQWdEO0FBQy9DLE1BQUksVUFBVTtBQUNiLG1CQUFnQixPQUFoQjtBQUNBLFdBQVEsRUFBUjtBQUNBLFlBQVMsS0FBVDtHQUhHLENBRDJDOztBQU8vQyxNQUFJLFlBQVksS0FBWixDQUFrQixPQUF0QixFQUErQixFQUEvQixDQUFrQyxPQUFsQyxFQUEyQyxPQUEzQyxFQUFvRCxLQUFwRCxDQUEwRCxVQUExRCxFQVArQztFQUFoRDs7QUFVQSxVQUFTLGNBQVQsR0FBMEI7QUFDekIsaUJBQWUsU0FBZixDQUF5QixHQUF6QixDQUE2QiwwQ0FBN0IsRUFEeUI7RUFBMUI7O0FBSUEsVUFBUyxjQUFULEdBQTBCO0FBQ3pCLGlCQUFlLFNBQWYsQ0FBeUIsR0FBekIsQ0FBNkIsK0NBQTdCLEVBRHlCO0VBQTFCOztBQUlBLFVBQVMsZUFBVCxHQUEyQjtBQUMxQixXQUFTLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLElBQTdDLEdBRDBCO0VBQTNCOztBQUlBLFFBQU87QUFDTixRQUFNLElBQU47RUFERCxDQXpDNEI7Q0FBWixFQUFiOztrQkE4Q1ciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHByaW1lbGFicyBmcm9tICcuL3BhcnRpYWxzL3ByaW1lbGFicy5qcyc7XG5pbXBvcnQgbWVudSBmcm9tICcuL3BhcnRpYWxzL21lbnUuanMnO1xuaW1wb3J0IGhvbWVTY3JvbGwgZnJvbSAnLi9wYXJ0aWFscy9ob21lU2Nyb2xsLmpzJztcbmltcG9ydCBqb3VybmFsTmF2IGZyb20gJy4vcGFydGlhbHMvam91cm5hbE5hdi5qcyc7XG5pbXBvcnQgZGFzaGJvYXJkIGZyb20gJy4vcGFydGlhbHMvZGFzaGJvYXJkLmpzJztcbmltcG9ydCBoZWFkZXIgZnJvbSAnLi9wYXJ0aWFscy9oZWFkZXIuanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHRtZW51LmluaXQoKTtcblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlci0td2hpdGUnKSkge1xuXHRcdGhlYWRlci5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldycpKSB7XG5cdFx0aG9tZVNjcm9sbC5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnMnKSkge1xuXHRcdHByaW1lbGFicy5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZCcpKSB7XG5cdFx0ZGFzaGJvYXJkLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam91cm5hbC1zaW5nbGUnKSkge1xuXHRcdGpvdXJuYWxOYXYuaW5pdCgpO1xuXHR9XG59KTtcbiIsImxldCBkYXNoYm9hcmQgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgZ3JvdW5kU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2dyb3VuZHdvcmsnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUFjdGlvbnMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUFjdGlvbnMoKSB7XG5cdFx0Ly8gSW5pdCBjb250cm9sbGVyXG5cdFx0bGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdFx0Ly8gQWRkIHNjZW5lc1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIGdyb3VuZFNlY3Rpb24sIHJlYWN0QW5pbWF0aW9uKTtcblx0fVxuXG5cdC8vIEFkZHMgYSBzY2VuZSB3aXRoIHByZWRlZmluZWQgb3B0aW9ucyB0byB0aGUgY29udHJvbGxlclxuXHRmdW5jdGlvbiBhZGRTY2VuZShjb250cm9sbGVyLCBlbGVtZW50LCBoYW5kbGVyKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHR0cmlnZ2VyRWxlbWVudDogZWxlbWVudCxcblx0XHRcdG9mZnNldDogNTAsXG5cdFx0XHRyZXZlcnNlOiBmYWxzZVxuXHRcdH07XG5cblx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUob3B0aW9ucykub24oJ3N0YXJ0JywgaGFuZGxlcikuYWRkVG8oY29udHJvbGxlcik7XG5cdH1cblxuXG5cdC8vIFJlYWN0IExvZ28gQW5pbWF0aW9uXG5cdGZ1bmN0aW9uIHJlYWN0QW5pbWF0aW9uKCkge1xuXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xuXG5cdFx0bGV0IGxvZ28gPSBncm91bmRTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuXHRcdGxldCBwYXRocyA9IGxvZ28ucXVlcnlTZWxlY3RvckFsbCgncGF0aCcpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkgKyspIHtcblx0XHRcdHNldERhc2gocGF0aHNbaV0pO1xuXHRcdH1cblxuXHRcdHRsLnRvKHBhdGhzLCAzLCB7ICdzdHJva2UtZGFzaG9mZnNldCc6IDAsIG9wYWNpdHk6ICcxJywgZWFzZTogUG93ZXIxLmVhc2VJbiB9KVxuXHRcdC50byhwYXRocywgMSwgeyAnZmlsbCc6ICcjMDBkOGZmJywgJ3N0cm9rZSc6ICcjMDBkOGZmJywgZWFzZTogUG93ZXIxLmVhc2VJbiB9KTtcblx0fVxuXG5cdC8vIFNldHMgRGFzaCBhcnJheS9vZmZzZXQgb24gZWxlbWVudFxuXHRmdW5jdGlvbiBzZXREYXNoKHBhdGgpIHtcblx0XHRsZXQgbGVuZ3RoID0gcGF0aC5nZXRUb3RhbExlbmd0aCgpO1xuXHRcdHBhdGguc3R5bGVbJ3N0cm9rZS1kYXNob2Zmc2V0J10gPSBsZW5ndGg7XG5cdFx0cGF0aC5zdHlsZVsnc3Ryb2tlLWRhc2hhcnJheSddID0gbGVuZ3RoO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBkYXNoYm9hcmQ7XG4iLCJsZXQgaGVhZGVyID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXInKTtcblx0bGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZS1tYWluJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpZiAobWFpbikge1xuXG5cdFx0XHQvLyBpbml0IGNvbnRyb2xsZXJcblx0XHRcdHZhciBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRcdFx0Ly8gY3JlYXRlIGEgc2NlbmVcblx0XHRcdG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XG5cdFx0XHRcdHRyaWdnZXJFbGVtZW50OiBtYWluLFxuXHRcdFx0XHR0cmlnZ2VySG9vazogJ29uTGVhdmUnLFxuXHRcdFx0fSkub24oJ3N0YXJ0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0b2dnbGVXaGl0ZW91dCgpO1xuXG5cdFx0XHR9KVxuXHRcdFx0LmFkZFRvKGNvbnRyb2xsZXIpOyAvLyBhc3NpZ24gdGhlIHNjZW5lIHRvIHRoZSBjb250cm9sbGVyXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlV2hpdGVvdXQoKSB7XG5cdFx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2wtc2l0ZWhlYWRlci0td2hpdGUnKTtcblx0fVxuXG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXI7XG4iLCJsZXQgaG9tZVNjcm9sbCA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBuYXZJdGVtcztcblx0bGV0IGRlbHRhID0gMDtcblx0bGV0IGN1cnJlbnRTbGlkZTtcblx0bGV0IG5leHRTbGlkZTtcblx0bGV0IHByZXZpb3VzU2xpZGU7XG5cdGxldCBwcmV2aW91c1NsaWRlcztcblx0bGV0IGlzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXHRsZXQgbGFzdFNjcm9sbGVkO1xuXHRsZXQgbW91c2V3aGVlbENhblNjcm9sbCA9IHRydWU7XG5cdGxldCBsYXN0TW91c2V3aGVlbFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRsZXQgbGFzdFNjcm9sbFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRsZXQgc2Nyb2xscyA9IFtdO1xuXHRsZXQgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy1jb250YWluZXJfX25hdicpO1xuXHRsZXQgd29ya1NsaWRlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXcnKSk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpZiAobmF2KSB7XG5cdFx0XHRuYXZJdGVtcyA9IG5hdi5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG5cdFx0fVxuXHRcdGFuaW1hdGVJbml0aWFsKCk7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiByZXNldFNjcm9sbCgpIHtcblx0XHRzY3JvbGxzID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2Nyb2xsc0F2ZyhvZmZzZXQpIHtcblx0XHRsZXQgc3VtID0gMDtcblxuXHRcdGxldCBlbG1zID0gc2Nyb2xscy5zbGljZShNYXRoLm1heChzY3JvbGxzLmxlbmd0aCAtIG9mZnNldCwgMSkpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbG1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRzdW0gKz0gZWxtc1tpXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKHN1bSAvIG9mZnNldCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhbmltYXRlSW5pdGlhbCgpIHtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRsZXQgZmlyc3RXb3JrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tMScpO1xuXHRcdFx0Zmlyc3RXb3JrLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmF2SXRlbXNbMF0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctY29udGFpbmVyX19uYXZfX2l0ZW0tLWlzLWFjdGl2ZScpO1xuXHRcdH0sIDIwMCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZE5hdik7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgc2Nyb2xsTmF2KTtcblxuXHRcdC8vIFN0b3BzIHRvdWNobW92ZSB3b3JraW5nIG91dHJpZ2h0XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gU2V0cyB1cCBIYW1tZXIgdG8gaGFuZGxlIHRvdWNoIGV2ZW50c1xuXHRcdGxldCB3b3JrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy1jb250YWluZXInKTtcblx0XHRsZXQgdG91Y2ggPSBuZXcgSGFtbWVyKHdvcmtDb250YWluZXIpO1xuXG5cdFx0Ly8gRW5hYmxlcyB2ZXJ0aWNhbCBzd2lwZSBkZXRlY3Rpb25cblx0XHR0b3VjaC5nZXQoJ3N3aXBlJykuc2V0KHsgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0FMTCB9KTtcblxuXHRcdC8vIEdlc3R1cmVzIHRoYXQgZXF1YWwgZm9yd2FyZFxuXHRcdHRvdWNoLm9uKCdzd2lwZXVwIHN3aXBlbGVmdCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gR2VzdHVyZXMgdGhhdCBlcXVhbCBiYWNrd2FyZHNcblx0XHR0b3VjaC5vbignc3dpcGVkb3duIHN3aXBlcmlnaHQnLCBmdW5jdGlvbigpe1xuXHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEhvb2tzIHVwIG5hdmlnYXRpb25cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5hdkl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRuYXZJdGVtc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZU5hdik7XG5cdFx0fVxuXHRcdFxuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlTmF2KGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRsZXQgc2xpZGVOdW1iZXIgPSBldmVudC50YXJnZXQuaW5uZXJIVE1MLnN1YnN0cmluZygxKTtcblxuXHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdGdvVG9TbGlkZShzbGlkZU51bWJlcik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGlnaGxpZ2h0QWN0aXZlTmF2KCkge1xuXHRcdC8vIFJlbW92ZSB0aGUgYWN0aXZlIGNsYXNzXG5cdFx0bGV0IGFjdGl2ZU5hdkNsYXNzID0gJ3dvcmstcHJldmlldy1jb250YWluZXJfX25hdl9faXRlbS0taXMtYWN0aXZlJztcblx0XHRsZXQgYWN0aXZlTmF2SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYWN0aXZlTmF2Q2xhc3MpO1xuXHRcdGFjdGl2ZU5hdkl0ZW0uY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVOYXZDbGFzcyk7XG5cblx0XHRsZXQgbmV4dE51bWJlciA9IG5leHRTbGlkZS5pZC5zdWJzdHJpbmcobmV4dFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cdFx0Y29uc29sZS5sb2cobmV4dE51bWJlcik7XG5cblx0XHRuYXZJdGVtc1tuZXh0TnVtYmVyIC0gMV0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKGFjdGl2ZU5hdkNsYXNzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdvVG9TbGlkZShzbGlkZU51bWJlcikge1xuXHRcdG5leHRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLScgKyBzbGlkZU51bWJlciApO1xuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdGlmIChuZXh0U2xpZGUpIHtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cblx0XHRcdGxldCBjdXJyZW50TnVtYmVyID0gY3VycmVudFNsaWRlLmlkLnN1YnN0cmluZyhjdXJyZW50U2xpZGUuaWQubGVuZ3RoIC0xKTtcblx0XHRcdGxldCBuZXh0TnVtYmVyID0gbmV4dFNsaWRlLmlkLnN1YnN0cmluZyhuZXh0U2xpZGUuaWQubGVuZ3RoIC0xKTtcblxuXHRcdFx0aWYgKGN1cnJlbnROdW1iZXIgPiBuZXh0TnVtYmVyKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdnb2luZyBiYWNrd2FyZHMnKTtcblx0XHRcdFx0Ly8gSWYgd2UncmUgZ29pbmcgYmFja3dhcmRzXG5cdFx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblxuXHRcdFx0XHQvLyBOZWVkIHRvIGFkZCBuZXh0IHRvIEFMTCBnb2luZyBmb3J3YXJkXG5cdFx0XHRcdGxldCBwcmV2aW91c1NsaWRlcyA9IHdvcmtTbGlkZXMuc2xpY2UobmV4dE51bWJlciwgY3VycmVudE51bWJlciAtIDEpO1xuXG5cdFx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHByZXZpb3VzU2xpZGVzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRcdHByZXZpb3VzU2xpZGVzW2ldLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdFx0XHRcdHByZXZpb3VzU2xpZGVzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBJZiB3ZSdyZSBnb2luZyBmb3J3YXJkc1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZ29pbmcgZm9yd2FyZHMnKTtcblx0XHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdH1cblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNjcm9sbE5hdihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0bGV0IHNjcm9sbFRocmVzaG9sZCA9IDQwO1xuXG5cdFx0bGV0IHZhbHVlID0gLWUuZGVsdGFZO1xuXG5cdFx0aWYgKHNjcm9sbHMubGVuZ3RoID4gMTUwKSB7XG5cdFx0XHRzY3JvbGxzLnNoaWZ0KCk7XG5cdFx0fVxuXG5cdFx0c2Nyb2xscy5wdXNoKE1hdGguYWJzKHZhbHVlKSk7XG5cblx0XHR2YXIgY3VyclRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG5cdFx0aWYgKChjdXJyVGltZSAtIGxhc3RNb3VzZXdoZWVsVGltZSkgPiAyMDApIHtcblx0XHRcdHJlc2V0U2Nyb2xsKCk7XG5cdFx0fVxuXG5cdFx0bGFzdE1vdXNld2hlZWxUaW1lID0gY3VyclRpbWU7XG5cblx0XHR2YXIgbGFzdEF2ZyA9IHNjcm9sbHNBdmcoNSk7XG5cdFx0dmFyIG1pZEF2ZyA9IHNjcm9sbHNBdmcoNDApO1xuXG5cdFx0aWYgKGxhc3RBdmcgPiBtaWRBdmcpIHtcblx0XHRcdGlmIChtb3VzZXdoZWVsQ2FuU2Nyb2xsICYmIGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdG1vdXNld2hlZWxDYW5TY3JvbGwgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICh2YWx1ZSA8IDApIHtcblx0XHRcdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1vdXNld2hlZWxDYW5TY3JvbGwgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGtleWJvYXJkTmF2KGV2ZW50KSB7XG5cdFx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdHJlZ3Jlc3NTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHR9XG5cblx0ZnVuY3Rpb24gcmVzZXRUcmFuc2l0aW9uaW5nKCkge1xuXHRcdGlzVHJhbnNpdGlvbmluZyA9IHRydWU7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0aXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cdFx0fSwgMTAwMCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhZHZhbmNlU2xpZGUoKSB7XG5cblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0bmV4dFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tbmV4dCcpO1xuXG5cdFx0aWYgKG5leHRTbGlkZSkge1xuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXHRcblx0ZnVuY3Rpb24gcmVncmVzc1NsaWRlKCkge1xuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRwcmV2aW91c1NsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0cHJldmlvdXNTbGlkZSA9IHByZXZpb3VzU2xpZGVzW3ByZXZpb3VzU2xpZGVzLmxlbmd0aCAtIDFdO1xuXG5cdFx0aWYgKHByZXZpb3VzU2xpZGUpIHtcblx0XHRcdC8vIFNldHMgbmV4dCBhY3R1YWwgc2xpZGUgKG5vdCBjaHJvbm9sb2dpY2FsbHkpIHRvIHByZXZpb3VzIHNsaWRlXG5cdFx0XHRuZXh0U2xpZGUgPSBwcmV2aW91c1NsaWRlO1xuXG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgaG9tZVNjcm9sbDtcbiIsIi8qKlxuICogQWxsb3dzIGZvciBsZWZ0L3JpZ2h0IG5hdmlnYXRpb24gaW4gam91cm5hbFxuICovXG5sZXQgam91cm5hbE5hdiA9IChmdW5jdGlvbigpIHtcblx0bGV0IHByZXZpb3VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlX19uYXZpZ2F0aW9uLS1wcmV2aW91cyBhJyk7XG5cdGxldCBuZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlX19uYXZpZ2F0aW9uLS1uZXh0IGEnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmROYXYpO1xuXHR9XG5cblx0ZnVuY3Rpb24ga2V5Ym9hcmROYXYoZXZlbnQpIHtcblx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdGNhc2UgMzc6XG5cdFx0XHRcdGlmIChwcmV2aW91cykge1xuXHRcdFx0XHRcdGdvVG9MaW5rKCBwcmV2aW91cy5ocmVmICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDM5OlxuXHRcdFx0XHRpZiAobmV4dCkge1xuXHRcdFx0XHRcdGdvVG9MaW5rKCBuZXh0LmhyZWYgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBnb1RvTGluayhsaW5rKSB7XG5cdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaW5rO1xuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlTmF2KGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsTmF2O1xuIiwiLyoqXG4gKiBIYW5kbGVzIG1vYmlsZSBtZW51XG4gKi9cbmxldCBtZW51ID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcicpO1xuXHRsZXQgdG9nZ2xlID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXJfX21lbnUtdG9nZ2xlJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dG9nZ2xlTWVudSgpO1xuXHRcdFx0Y2hhbmdlVGV4dCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcblx0XHRoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbC1zaXRlaGVhZGVyLS1uYXYtaXMtb3BlbicpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2hhbmdlVGV4dCgpIHtcblx0XHRpZiAodG9nZ2xlLmlubmVySFRNTCA9PSAnTWVudScpIHtcdFxuXHRcdFx0dG9nZ2xlLmlubmVySFRNTCA9ICdDbG9zZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvZ2dsZS5pbm5lckhUTUwgPSAnTWVudSc7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1lbnU7XG4iLCJsZXQgcHJpbWVsYWJzID0gKGZ1bmN0aW9uICgpIHtcblx0Ly8gSW5pdCBjb250cm9sbGVyXG5cdGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRsZXQgcHJvYmxlbVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fc2VjdGlvbi0tcHJvYmxlbXMnKTtcblx0bGV0IG1vZHVsYXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3NlY3Rpb24tLW1vZHVsYXItYm94ZXMnKTtcblx0bGV0IHN0YW5kYXJkU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19zZWN0aW9uLS1hcy1zdGFuZGFyZCcpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJQWN0aW9ucygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJQWN0aW9ucygpIHtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBwcm9ibGVtU2VjdGlvbiwgcHJvYmxlbUhhbmRsZXIpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIG1vZHVsYXJTZWN0aW9uLCBtb2R1bGFySGFuZGxlcik7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgc3RhbmRhcmRTZWN0aW9uLCBzdGFuZGFyZEhhbmRsZXIpO1xuXHR9XG5cblx0Ly8gQWRkcyBhIHNjZW5lIHdpdGggcHJlZGVmaW5lZCBvcHRpb25zIHRvIHRoZSBjb250cm9sbGVyXG5cdGZ1bmN0aW9uIGFkZFNjZW5lKGNvbnRyb2xsZXIsIGVsZW1lbnQsIGhhbmRsZXIpIHtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdHRyaWdnZXJFbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0b2Zmc2V0OiA1MCxcblx0XHRcdHJldmVyc2U6IGZhbHNlXG5cdFx0fTtcblxuXHRcdG5ldyBTY3JvbGxNYWdpYy5TY2VuZShvcHRpb25zKS5vbignc3RhcnQnLCBoYW5kbGVyKS5hZGRUbyhjb250cm9sbGVyKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHByb2JsZW1IYW5kbGVyKCkge1xuXHRcdHByb2JsZW1TZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3ByaW1lLWxhYnNfX3NlY3Rpb24tLXByb2JsZW1zLS1pcy1hY3RpdmUnKTtcblx0fVxuXG5cdGZ1bmN0aW9uIG1vZHVsYXJIYW5kbGVyKCkge1xuXHRcdG1vZHVsYXJTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3ByaW1lLWxhYnNfX3NlY3Rpb24tLW1vZHVsYXItYm94ZXMtLWlzLWFjdGl2ZScpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc3RhbmRhcmRIYW5kbGVyKCkge1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX192aWRlbycpLnBsYXkoKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpbWVsYWJzO1xuIl19
