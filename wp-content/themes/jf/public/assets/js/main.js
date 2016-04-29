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

		tl.from(image, 1, { y: '20%' }).to(image, 1, { opacity: 1 });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYXJ0aWFscy9kYXNoYm9hcmQuanMiLCJzcmMvanMvcGFydGlhbHMvaGVhZGVyLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFZO0FBQ3pELGdCQUFLLElBQUwsR0FEeUQ7O0FBR3pELEtBQUksU0FBUyxhQUFULENBQXVCLHNCQUF2QixDQUFKLEVBQW9EO0FBQ25ELG1CQUFPLElBQVAsR0FEbUQ7RUFBcEQ7O0FBSUEsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBSixFQUE2QztBQUM1Qyx1QkFBVyxJQUFYLEdBRDRDO0VBQTdDOztBQUlBLEtBQUksU0FBUyxhQUFULENBQXVCLGFBQXZCLENBQUosRUFBMkM7QUFDMUMsc0JBQVUsSUFBVixHQUQwQztFQUEzQzs7QUFJQSxLQUFJLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFKLEVBQTBDO0FBQ3pDLHNCQUFVLElBQVYsR0FEeUM7RUFBMUM7O0FBSUEsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsaUJBQXZCLENBQUosRUFBK0M7QUFDOUMsdUJBQVcsSUFBWCxHQUQ4QztFQUEvQztDQW5CNkMsQ0FBOUM7Ozs7Ozs7O0FDUEEsSUFBSSxZQUFhLFlBQVk7QUFDNUIsS0FBSSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLG9CQUF2QixDQUFoQixDQUR3QjtBQUU1QixLQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIs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LE9BQXRCLEVBQStCLEVBQS9CLENBQWtDLE9BQWxDLEVBQTJDLE9BQTNDLEVBQW9ELEtBQXBELENBQTBELFVBQTFELEVBUCtDO0VBQWhEOztBQVVBLFVBQVMsY0FBVCxHQUEwQjtBQUN6QixpQkFBZSxTQUFmLENBQXlCLEdBQXpCLENBQTZCLDBDQUE3QixFQUR5QjtFQUExQjs7QUFJQSxVQUFTLGNBQVQsR0FBMEI7QUFDekIsaUJBQWUsU0FBZixDQUF5QixHQUF6QixDQUE2QiwrQ0FBN0IsRUFEeUI7RUFBMUI7O0FBSUEsVUFBUyxlQUFULEdBQTJCO0FBQzFCLFdBQVMsYUFBVCxDQUF1QixvQkFBdkIsRUFBNkMsSUFBN0MsR0FEMEI7RUFBM0I7O0FBSUEsUUFBTztBQUNOLFFBQU0sSUFBTjtFQURELENBekM0QjtDQUFaLEVBQWI7O2tCQThDVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgcHJpbWVsYWJzIGZyb20gJy4vcGFydGlhbHMvcHJpbWVsYWJzLmpzJztcbmltcG9ydCBtZW51IGZyb20gJy4vcGFydGlhbHMvbWVudS5qcyc7XG5pbXBvcnQgaG9tZVNjcm9sbCBmcm9tICcuL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMnO1xuaW1wb3J0IGpvdXJuYWxOYXYgZnJvbSAnLi9wYXJ0aWFscy9qb3VybmFsTmF2LmpzJztcbmltcG9ydCBkYXNoYm9hcmQgZnJvbSAnLi9wYXJ0aWFscy9kYXNoYm9hcmQuanMnO1xuaW1wb3J0IGhlYWRlciBmcm9tICcuL3BhcnRpYWxzL2hlYWRlci5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdG1lbnUuaW5pdCgpO1xuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyLS13aGl0ZScpKSB7XG5cdFx0aGVhZGVyLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3JykpIHtcblx0XHRob21lU2Nyb2xsLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFicycpKSB7XG5cdFx0cHJpbWVsYWJzLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkJykpIHtcblx0XHRkYXNoYm9hcmQuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZScpKSB7XG5cdFx0am91cm5hbE5hdi5pbml0KCk7XG5cdH1cbn0pO1xuIiwibGV0IGRhc2hib2FyZCA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBoZWFkZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9faGVhZGVyJyk7XG5cdGxldCBzY3JvbGxTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fc2l0ZS1zY3JvbGwnKTtcblx0bGV0IGdyb3VuZFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19ncm91bmR3b3JrJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpbnRybygpO1xuXHRcdGJpbmRVSUFjdGlvbnMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUFjdGlvbnMoKSB7XG5cdFx0Ly8gSW5pdCBjb250cm9sbGVyXG5cdFx0bGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdFx0Ly8gQWRkIHNjZW5lc1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIHNjcm9sbFNlY3Rpb24sIHNpdGVTY3JvbGwpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIGdyb3VuZFNlY3Rpb24sIHJlYWN0QW5pbWF0aW9uKTtcblx0fVxuXG5cdC8vIEFkZHMgYSBzY2VuZSB3aXRoIHByZWRlZmluZWQgb3B0aW9ucyB0byB0aGUgY29udHJvbGxlclxuXHRmdW5jdGlvbiBhZGRTY2VuZShjb250cm9sbGVyLCBlbGVtZW50LCBoYW5kbGVyKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHR0cmlnZ2VyRWxlbWVudDogZWxlbWVudCxcblx0XHRcdG9mZnNldDogNTAsXG5cdFx0XHRyZXZlcnNlOiBmYWxzZVxuXHRcdH07XG5cblx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUob3B0aW9ucykub24oJ3N0YXJ0JywgaGFuZGxlcikuYWRkVG8oY29udHJvbGxlcik7XG5cdH1cblxuXHQvLyBJbnRyby9IZWFkZXIgYW5pbWF0aW9uXG5cdGZ1bmN0aW9uIGludHJvKCkge1xuXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCh7IGRlbGF5OiAwLjUgfSk7XG5cdFx0bGV0IGltYWdlID0gaGVhZGVyU2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcblxuXHRcdHRsLmZyb20oaW1hZ2UsIDEsIHsgeTogJzIwJSd9KVxuXHRcdCAgLnRvKGltYWdlLCAxLCB7IG9wYWNpdHk6IDEgfSk7XG5cdH1cblxuXHQvLyBTY3JvbGxpbmcgc2l0ZSBpbWFnZSBhbmltYXRpb25cblx0ZnVuY3Rpb24gc2l0ZVNjcm9sbCgpIHtcblx0XHRsZXQgc2Nyb2xsSW5uZXIgPSBzY3JvbGxTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX3NpdGUtc2Nyb2xsX19pbm5lcicpO1xuXG5cdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KHsgZGVsYXk6IDIgfSk7XG5cblx0XHR0bC5zZXQoc2Nyb2xsSW5uZXIsIHsgaGVpZ2h0OiAnYXV0bycgfSlcblx0XHQuZnJvbShzY3JvbGxJbm5lciwgMywgeyBoZWlnaHQ6ICcyMHJlbScsIGVhc2U6IFBvd2VyMi5lYXNlT3V0IH0pO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHR0bC5yZXZlcnNlKDMpO1xuXHRcdH0sIDYwMDApO1xuXHR9XG5cblx0Ly8gUmVhY3QgTG9nbyBBbmltYXRpb25cblx0ZnVuY3Rpb24gcmVhY3RBbmltYXRpb24oKSB7XG5cdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG5cblx0XHRsZXQgbG9nbyA9IGdyb3VuZFNlY3Rpb24ucXVlcnlTZWxlY3Rvcignc3ZnJyk7XG5cdFx0bGV0IHBhdGhzID0gbG9nby5xdWVyeVNlbGVjdG9yQWxsKCdwYXRoJyk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSArKykge1xuXHRcdFx0c2V0RGFzaChwYXRoc1tpXSk7XG5cdFx0fVxuXG5cdFx0dGwudG8ocGF0aHMsIDMsIHsgJ3N0cm9rZS1kYXNob2Zmc2V0JzogMCwgb3BhY2l0eTogJzEnLCBlYXNlOiBQb3dlcjEuZWFzZUluIH0pXG5cdFx0LnRvKHBhdGhzLCAxLCB7ICdmaWxsJzogJyMwMGQ4ZmYnLCAnc3Ryb2tlJzogJyMwMGQ4ZmYnLCBlYXNlOiBQb3dlcjEuZWFzZUluIH0pO1xuXHR9XG5cblx0Ly8gU2V0cyBEYXNoIGFycmF5L29mZnNldCBvbiBlbGVtZW50XG5cdGZ1bmN0aW9uIHNldERhc2gocGF0aCkge1xuXHRcdGxldCBsZW5ndGggPSBwYXRoLmdldFRvdGFsTGVuZ3RoKCk7XG5cdFx0cGF0aC5zdHlsZVsnc3Ryb2tlLWRhc2hvZmZzZXQnXSA9IGxlbmd0aDtcblx0XHRwYXRoLnN0eWxlWydzdHJva2UtZGFzaGFycmF5J10gPSBsZW5ndGg7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRhc2hib2FyZDtcbiIsImxldCBoZWFkZXIgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcicpO1xuXHRsZXQgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlLW1haW4nKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGlmIChtYWluKSB7XG5cblx0XHRcdC8vIGluaXQgY29udHJvbGxlclxuXHRcdFx0dmFyIGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdFx0XHQvLyBjcmVhdGUgYSBzY2VuZVxuXHRcdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcblx0XHRcdFx0dHJpZ2dlckVsZW1lbnQ6IG1haW4sXG5cdFx0XHRcdHRyaWdnZXJIb29rOiAnb25MZWF2ZScsXG5cdFx0XHR9KS5vbignc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRvZ2dsZVdoaXRlb3V0KCk7XG5cblx0XHRcdH0pXG5cdFx0XHQuYWRkVG8oY29udHJvbGxlcik7IC8vIGFzc2lnbiB0aGUgc2NlbmUgdG8gdGhlIGNvbnRyb2xsZXJcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiB0b2dnbGVXaGl0ZW91dCgpIHtcblx0XHRoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbC1zaXRlaGVhZGVyLS13aGl0ZScpO1xuXHR9XG5cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGhlYWRlcjtcbiIsImxldCBob21lU2Nyb2xsID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IG5hdkl0ZW1zO1xuXHRsZXQgZGVsdGEgPSAwO1xuXHRsZXQgY3VycmVudFNsaWRlO1xuXHRsZXQgbmV4dFNsaWRlO1xuXHRsZXQgcHJldmlvdXNTbGlkZTtcblx0bGV0IHByZXZpb3VzU2xpZGVzO1xuXHRsZXQgaXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cdGxldCBsYXN0U2Nyb2xsZWQ7XG5cdGxldCBtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gdHJ1ZTtcblx0bGV0IGxhc3RNb3VzZXdoZWVsVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdGxldCBsYXN0U2Nyb2xsVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdGxldCBzY3JvbGxzID0gW107XG5cdGxldCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2Jyk7XG5cdGxldCB3b3JrU2xpZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlldycpKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGlmIChuYXYpIHtcblx0XHRcdG5hdkl0ZW1zID0gbmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcblx0XHR9XG5cdFx0YW5pbWF0ZUluaXRpYWwoKTtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2V0U2Nyb2xsKCkge1xuXHRcdHNjcm9sbHMgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGxzQXZnKG9mZnNldCkge1xuXHRcdGxldCBzdW0gPSAwO1xuXG5cdFx0bGV0IGVsbXMgPSBzY3JvbGxzLnNsaWNlKE1hdGgubWF4KHNjcm9sbHMubGVuZ3RoIC0gb2Zmc2V0LCAxKSk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGVsbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHN1bSArPSBlbG1zW2ldO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLmNlaWwoc3VtIC8gb2Zmc2V0KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFuaW1hdGVJbml0aWFsKCkge1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGxldCBmaXJzdFdvcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS0xJyk7XG5cdFx0XHRmaXJzdFdvcmsuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuYXZJdGVtc1swXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy1jb250YWluZXJfX25hdl9faXRlbS0taXMtYWN0aXZlJyk7XG5cdFx0fSwgMjAwKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkTmF2KTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBzY3JvbGxOYXYpO1xuXG5cdFx0Ly8gU3RvcHMgdG91Y2htb3ZlIHdvcmtpbmcgb3V0cmlnaHRcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fSk7XG5cblx0XHQvLyBTZXRzIHVwIEhhbW1lciB0byBoYW5kbGUgdG91Y2ggZXZlbnRzXG5cdFx0bGV0IHdvcmtDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LWNvbnRhaW5lcicpO1xuXHRcdGxldCB0b3VjaCA9IG5ldyBIYW1tZXIod29ya0NvbnRhaW5lcik7XG5cblx0XHQvLyBFbmFibGVzIHZlcnRpY2FsIHN3aXBlIGRldGVjdGlvblxuXHRcdHRvdWNoLmdldCgnc3dpcGUnKS5zZXQoeyBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fQUxMIH0pO1xuXG5cdFx0Ly8gR2VzdHVyZXMgdGhhdCBlcXVhbCBmb3J3YXJkXG5cdFx0dG91Y2gub24oJ3N3aXBldXAgc3dpcGVsZWZ0JywgZnVuY3Rpb24oKXtcblx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0YWR2YW5jZVNsaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBHZXN0dXJlcyB0aGF0IGVxdWFsIGJhY2t3YXJkc1xuXHRcdHRvdWNoLm9uKCdzd2lwZWRvd24gc3dpcGVyaWdodCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdHJlZ3Jlc3NTbGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gSG9va3MgdXAgbmF2aWdhdGlvblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbmF2SXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdG5hdkl0ZW1zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlTmF2KTtcblx0XHR9XG5cdFx0XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVOYXYoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGxldCBzbGlkZU51bWJlciA9IGV2ZW50LnRhcmdldC5pbm5lckhUTUwuc3Vic3RyaW5nKDEpO1xuXG5cdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0Z29Ub1NsaWRlKHNsaWRlTnVtYmVyKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBoaWdobGlnaHRBY3RpdmVOYXYoKSB7XG5cdFx0Ly8gUmVtb3ZlIHRoZSBhY3RpdmUgY2xhc3Ncblx0XHRsZXQgYWN0aXZlTmF2Q2xhc3MgPSAnd29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2X19pdGVtLS1pcy1hY3RpdmUnO1xuXHRcdGxldCBhY3RpdmVOYXZJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBhY3RpdmVOYXZDbGFzcyk7XG5cdFx0YWN0aXZlTmF2SXRlbS5jbGFzc0xpc3QucmVtb3ZlKGFjdGl2ZU5hdkNsYXNzKTtcblxuXHRcdGxldCBuZXh0TnVtYmVyID0gbmV4dFNsaWRlLmlkLnN1YnN0cmluZyhuZXh0U2xpZGUuaWQubGVuZ3RoIC0xKTtcblx0XHRjb25zb2xlLmxvZyhuZXh0TnVtYmVyKTtcblxuXHRcdG5hdkl0ZW1zW25leHROdW1iZXIgLSAxXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoYWN0aXZlTmF2Q2xhc3MpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ29Ub1NsaWRlKHNsaWRlTnVtYmVyKSB7XG5cdFx0bmV4dFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tJyArIHNsaWRlTnVtYmVyICk7XG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0aWYgKG5leHRTbGlkZSkge1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblxuXHRcdFx0bGV0IGN1cnJlbnROdW1iZXIgPSBjdXJyZW50U2xpZGUuaWQuc3Vic3RyaW5nKGN1cnJlbnRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXHRcdFx0bGV0IG5leHROdW1iZXIgPSBuZXh0U2xpZGUuaWQuc3Vic3RyaW5nKG5leHRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXG5cdFx0XHRpZiAoY3VycmVudE51bWJlciA+IG5leHROdW1iZXIpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2dvaW5nIGJhY2t3YXJkcycpO1xuXHRcdFx0XHQvLyBJZiB3ZSdyZSBnb2luZyBiYWNrd2FyZHNcblx0XHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXG5cdFx0XHRcdC8vIE5lZWQgdG8gYWRkIG5leHQgdG8gQUxMIGdvaW5nIGZvcndhcmRcblx0XHRcdFx0bGV0IHByZXZpb3VzU2xpZGVzID0gd29ya1NsaWRlcy5zbGljZShuZXh0TnVtYmVyLCBjdXJyZW50TnVtYmVyIC0gMSk7XG5cblx0XHRcdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgcHJldmlvdXNTbGlkZXMubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdFx0cHJldmlvdXNTbGlkZXNbaV0uY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0XHRcdFx0cHJldmlvdXNTbGlkZXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIElmIHdlJ3JlIGdvaW5nIGZvcndhcmRzXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdnb2luZyBmb3J3YXJkcycpO1xuXHRcdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0fVxuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gc2Nyb2xsTmF2KGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRsZXQgc2Nyb2xsVGhyZXNob2xkID0gNDA7XG5cblx0XHRsZXQgdmFsdWUgPSAtZS5kZWx0YVk7XG5cblx0XHRpZiAoc2Nyb2xscy5sZW5ndGggPiAxNTApIHtcblx0XHRcdHNjcm9sbHMuc2hpZnQoKTtcblx0XHR9XG5cblx0XHRzY3JvbGxzLnB1c2goTWF0aC5hYnModmFsdWUpKTtcblxuXHRcdHZhciBjdXJyVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cblx0XHRpZiAoKGN1cnJUaW1lIC0gbGFzdE1vdXNld2hlZWxUaW1lKSA+IDIwMCkge1xuXHRcdFx0cmVzZXRTY3JvbGwoKTtcblx0XHR9XG5cblx0XHRsYXN0TW91c2V3aGVlbFRpbWUgPSBjdXJyVGltZTtcblxuXHRcdHZhciBsYXN0QXZnID0gc2Nyb2xsc0F2Zyg1KTtcblx0XHR2YXIgbWlkQXZnID0gc2Nyb2xsc0F2Zyg0MCk7XG5cblx0XHRpZiAobGFzdEF2ZyA+IG1pZEF2Zykge1xuXHRcdFx0aWYgKG1vdXNld2hlZWxDYW5TY3JvbGwgJiYgaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0bW91c2V3aGVlbENhblNjcm9sbCA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKHZhbHVlIDwgMCkge1xuXHRcdFx0XHRcdFx0YWR2YW5jZVNsaWRlKCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlZ3Jlc3NTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bW91c2V3aGVlbENhblNjcm9sbCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24ga2V5Ym9hcmROYXYoZXZlbnQpIHtcblx0XHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0XHRjYXNlIDM4OlxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDQwOlxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0YWR2YW5jZVNsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdH1cblxuXHRmdW5jdGlvbiByZXNldFRyYW5zaXRpb25pbmcoKSB7XG5cdFx0aXNUcmFuc2l0aW9uaW5nID0gdHJ1ZTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRpc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcblx0XHR9LCAxMDAwKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkdmFuY2VTbGlkZSgpIHtcblxuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRuZXh0U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cblx0XHRpZiAobmV4dFNsaWRlKSB7XG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cdFxuXHRmdW5jdGlvbiByZWdyZXNzU2xpZGUoKSB7XG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdHByZXZpb3VzU2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRwcmV2aW91c1NsaWRlID0gcHJldmlvdXNTbGlkZXNbcHJldmlvdXNTbGlkZXMubGVuZ3RoIC0gMV07XG5cblx0XHRpZiAocHJldmlvdXNTbGlkZSkge1xuXHRcdFx0Ly8gU2V0cyBuZXh0IGFjdHVhbCBzbGlkZSAobm90IGNocm9ub2xvZ2ljYWxseSkgdG8gcHJldmlvdXMgc2xpZGVcblx0XHRcdG5leHRTbGlkZSA9IHByZXZpb3VzU2xpZGU7XG5cblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdHByZXZpb3VzU2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRcdHByZXZpb3VzU2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBob21lU2Nyb2xsO1xuIiwiLyoqXG4gKiBBbGxvd3MgZm9yIGxlZnQvcmlnaHQgbmF2aWdhdGlvbiBpbiBqb3VybmFsXG4gKi9cbmxldCBqb3VybmFsTmF2ID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgcHJldmlvdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam91cm5hbC1zaW5nbGVfX25hdmlnYXRpb24tLXByZXZpb3VzIGEnKTtcblx0bGV0IG5leHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam91cm5hbC1zaW5nbGVfX25hdmlnYXRpb24tLW5leHQgYScpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZE5hdik7XG5cdH1cblxuXHRmdW5jdGlvbiBrZXlib2FyZE5hdihldmVudCkge1xuXHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0Y2FzZSAzNzpcblx0XHRcdFx0aWYgKHByZXZpb3VzKSB7XG5cdFx0XHRcdFx0Z29Ub0xpbmsoIHByZXZpb3VzLmhyZWYgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzk6XG5cdFx0XHRcdGlmIChuZXh0KSB7XG5cdFx0XHRcdFx0Z29Ub0xpbmsoIG5leHQuaHJlZiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGdvVG9MaW5rKGxpbmspIHtcblx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpbms7XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVOYXYoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxOYXY7XG4iLCIvKipcbiAqIEhhbmRsZXMgbW9iaWxlIG1lbnVcbiAqL1xubGV0IG1lbnUgPSAoZnVuY3Rpb24oKSB7XG5cdGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyJyk7XG5cdGxldCB0b2dnbGUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcl9fbWVudS10b2dnbGUnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0b2dnbGVNZW51KCk7XG5cdFx0XHRjaGFuZ2VUZXh0KCk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuXHRcdGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdsLXNpdGVoZWFkZXItLW5hdi1pcy1vcGVuJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBjaGFuZ2VUZXh0KCkge1xuXHRcdGlmICh0b2dnbGUuaW5uZXJIVE1MID09ICdNZW51Jykge1x0XG5cdFx0XHR0b2dnbGUuaW5uZXJIVE1MID0gJ0Nsb3NlJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dG9nZ2xlLmlubmVySFRNTCA9ICdNZW51Jztcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgbWVudTtcbiIsImxldCBwcmltZWxhYnMgPSAoZnVuY3Rpb24gKCkge1xuXHQvLyBJbml0IGNvbnRyb2xsZXJcblx0bGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdGxldCBwcm9ibGVtU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19zZWN0aW9uLS1wcm9ibGVtcycpO1xuXHRsZXQgbW9kdWxhclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fc2VjdGlvbi0tbW9kdWxhci1ib3hlcycpO1xuXHRsZXQgc3RhbmRhcmRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3NlY3Rpb24tLWFzLXN0YW5kYXJkJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlBY3Rpb25zKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlBY3Rpb25zKCkge1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIHByb2JsZW1TZWN0aW9uLCBwcm9ibGVtSGFuZGxlcik7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgbW9kdWxhclNlY3Rpb24sIG1vZHVsYXJIYW5kbGVyKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBzdGFuZGFyZFNlY3Rpb24sIHN0YW5kYXJkSGFuZGxlcik7XG5cdH1cblxuXHQvLyBBZGRzIGEgc2NlbmUgd2l0aCBwcmVkZWZpbmVkIG9wdGlvbnMgdG8gdGhlIGNvbnRyb2xsZXJcblx0ZnVuY3Rpb24gYWRkU2NlbmUoY29udHJvbGxlciwgZWxlbWVudCwgaGFuZGxlcikge1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdFx0dHJpZ2dlckVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRvZmZzZXQ6IDUwLFxuXHRcdFx0cmV2ZXJzZTogZmFsc2Vcblx0XHR9O1xuXG5cdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKG9wdGlvbnMpLm9uKCdzdGFydCcsIGhhbmRsZXIpLmFkZFRvKGNvbnRyb2xsZXIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJvYmxlbUhhbmRsZXIoKSB7XG5cdFx0cHJvYmxlbVNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncHJpbWUtbGFic19fc2VjdGlvbi0tcHJvYmxlbXMtLWlzLWFjdGl2ZScpO1xuXHR9XG5cblx0ZnVuY3Rpb24gbW9kdWxhckhhbmRsZXIoKSB7XG5cdFx0bW9kdWxhclNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncHJpbWUtbGFic19fc2VjdGlvbi0tbW9kdWxhci1ib3hlcy0taXMtYWN0aXZlJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBzdGFuZGFyZEhhbmRsZXIoKSB7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3ZpZGVvJykucGxheSgpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBwcmltZWxhYnM7XG4iXX0=
