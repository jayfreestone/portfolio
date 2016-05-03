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

		// Fade in intro image
		fadeIntro();

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
		var backgroundImage = backgroundStyle.match(/\/\/([a-z0-9:\-\.\/]+)/)[0];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYXJ0aWFscy9kYXNoYm9hcmQuanMiLCJzcmMvanMvcGFydGlhbHMvZmFkZUJhY2tncm91bmRJbWFnZS5qcyIsInNyYy9qcy9wYXJ0aWFscy9mYWRlSXNIaWRkZW4uanMiLCJzcmMvanMvcGFydGlhbHMvaGVhZGVyLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFDekQsZ0JBQUssSUFBTDs7QUFFQSx3QkFBYSxJQUFiOztBQUVBLEtBQUksU0FBUyxhQUFULENBQXVCLHNCQUF2QixDQUFKLEVBQW9EO0FBQ25ELG1CQUFPLElBQVA7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixlQUF2QixDQUFKLEVBQTZDO0FBQzVDLHVCQUFXLElBQVg7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFKLEVBQTJDO0FBQzFDLHNCQUFVLElBQVY7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFKLEVBQTBDO0FBQ3pDLHNCQUFVLElBQVY7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixpQkFBdkIsQ0FBSixFQUErQztBQUM5Qyx1QkFBVyxJQUFYO0FBQ0E7QUFDRCxDQXhCRDs7Ozs7Ozs7O0FDUkE7Ozs7OztBQUVBLElBQUksWUFBYSxZQUFZO0FBQzVCLEtBQUksZ0JBQWdCLFNB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ZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBwcmltZWxhYnMgZnJvbSAnLi9wYXJ0aWFscy9wcmltZWxhYnMuanMnO1xuaW1wb3J0IG1lbnUgZnJvbSAnLi9wYXJ0aWFscy9tZW51LmpzJztcbmltcG9ydCBob21lU2Nyb2xsIGZyb20gJy4vcGFydGlhbHMvaG9tZVNjcm9sbC5qcyc7XG5pbXBvcnQgam91cm5hbE5hdiBmcm9tICcuL3BhcnRpYWxzL2pvdXJuYWxOYXYuanMnO1xuaW1wb3J0IGRhc2hib2FyZCBmcm9tICcuL3BhcnRpYWxzL2Rhc2hib2FyZC5qcyc7XG5pbXBvcnQgaGVhZGVyIGZyb20gJy4vcGFydGlhbHMvaGVhZGVyLmpzJztcbmltcG9ydCBmYWRlSXNIaWRkZW4gZnJvbSAnLi9wYXJ0aWFscy9mYWRlSXNIaWRkZW4uanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHRtZW51LmluaXQoKTtcblxuXHRmYWRlSXNIaWRkZW4uaW5pdCgpO1xuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyLS13aGl0ZScpKSB7XG5cdFx0aGVhZGVyLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3JykpIHtcblx0XHRob21lU2Nyb2xsLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFicycpKSB7XG5cdFx0cHJpbWVsYWJzLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkJykpIHtcblx0XHRkYXNoYm9hcmQuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZScpKSB7XG5cdFx0am91cm5hbE5hdi5pbml0KCk7XG5cdH1cbn0pO1xuIiwiaW1wb3J0IGZhZGVCYWNrZ3JvdW5kSW1hZ2UgZnJvbSAnLi9mYWRlQmFja2dyb3VuZEltYWdlLmpzJztcblxubGV0IGRhc2hib2FyZCA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBncm91bmRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZ3JvdW5kd29yaycpO1xuXHRsZXQgZGVwbG95bWVudFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19kZXBsb3ltZW50Jyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlBY3Rpb25zKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlBY3Rpb25zKCkge1xuXHRcdC8vIEluaXQgY29udHJvbGxlclxuXHRcdGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRcdC8vIEZhZGUgaW4gaW50cm8gaW1hZ2Vcblx0XHRmYWRlSW50cm8oKTtcblxuXHRcdC8vIEFkZCBzY2VuZXNcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBncm91bmRTZWN0aW9uLCByZWFjdEFuaW1hdGlvbik7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgZGVwbG95bWVudFNlY3Rpb24sIHRlcm1pbmFsQW5pbWF0aW9uKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHRlcm1pbmFsQW5pbWF0aW9uKCkge1xuXHRcdGxldCBjb2RlV2luZG93ID0gZGVwbG95bWVudFNlY3Rpb24ucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fdGVybWluYWwgY29kZScpO1xuXG5cdFx0Ly8gbGV0IGNvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb2RlJyk7XG5cdFx0Ly8gbGV0IGNvZGVOb2RlID0gY29kZVdpbmRvdy5hcHBlbmRDaGlsZChjb2RlKTtcblxuXHRcdHdyaXRlU3RyaW5nKCdjYXAgc3RhZ2luZyBkZXBsb3knLCBjb2RlV2luZG93KTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gd3JpdGVTdHJpbmcoc3RyaW5nVG9UeXBlLCBwbGFjZVRvVHlwZSkge1xuXHRcdGxldCBpID0gMDtcblxuXHRcdChmdW5jdGlvbiB3cml0ZUNoYXIoKSB7XG5cdFx0XHRpZiAoc3RyaW5nVG9UeXBlLmxlbmd0aCA+IGkpIHtcblx0XHRcdFx0cGxhY2VUb1R5cGUuaW5uZXJIVE1MID0gcGxhY2VUb1R5cGUuaW5uZXJIVE1MICsgc3RyaW5nVG9UeXBlW2ldO1xuXHRcdFx0XHRpKys7XG5cblx0XHRcdFx0bGV0IGRlbGF5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwMCkpICsgMTQwO1xuXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR3cml0ZUNoYXIoKTtcblx0XHRcdFx0fSwgZGVsYXkpO1xuXHRcdFx0fVxuXHRcdH0pKClcblx0fVxuXG5cdGZ1bmN0aW9uIGZhZGVJbnRybygpIHtcblx0XHRsZXQgaW50cm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW50cm9fX2JhY2tncm91bmQnKTtcblx0XHRmYWRlQmFja2dyb3VuZEltYWdlLmZhZGUoaW50cm8pO1xuXHR9XG5cblx0Ly8gQWRkcyBhIHNjZW5lIHdpdGggcHJlZGVmaW5lZCBvcHRpb25zIHRvIHRoZSBjb250cm9sbGVyXG5cdGZ1bmN0aW9uIGFkZFNjZW5lKGNvbnRyb2xsZXIsIGVsZW1lbnQsIGhhbmRsZXIpIHtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdHRyaWdnZXJFbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0b2Zmc2V0OiA1MCxcblx0XHRcdHJldmVyc2U6IGZhbHNlXG5cdFx0fTtcblxuXHRcdG5ldyBTY3JvbGxNYWdpYy5TY2VuZShvcHRpb25zKS5vbignc3RhcnQnLCBoYW5kbGVyKS5hZGRUbyhjb250cm9sbGVyKTtcblx0fVxuXG5cblx0Ly8gUmVhY3QgTG9nbyBBbmltYXRpb25cblx0ZnVuY3Rpb24gcmVhY3RBbmltYXRpb24oKSB7XG5cdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG5cblx0XHRsZXQgbG9nbyA9IGdyb3VuZFNlY3Rpb24ucXVlcnlTZWxlY3Rvcignc3ZnJyk7XG5cdFx0bGV0IHBhdGhzID0gbG9nby5xdWVyeVNlbGVjdG9yQWxsKCdwYXRoJyk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSArKykge1xuXHRcdFx0c2V0RGFzaChwYXRoc1tpXSk7XG5cdFx0fVxuXG5cdFx0dGwudG8ocGF0aHMsIDMsIHsgJ3N0cm9rZS1kYXNob2Zmc2V0JzogMCwgb3BhY2l0eTogJzEnLCBlYXNlOiBQb3dlcjEuZWFzZUluIH0pXG5cdFx0LnRvKHBhdGhzLCAxLCB7ICdmaWxsJzogJyMwMGQ4ZmYnLCAnc3Ryb2tlJzogJyMwMGQ4ZmYnLCBlYXNlOiBQb3dlcjEuZWFzZUluIH0pO1xuXHR9XG5cblx0Ly8gU2V0cyBEYXNoIGFycmF5L29mZnNldCBvbiBlbGVtZW50XG5cdGZ1bmN0aW9uIHNldERhc2gocGF0aCkge1xuXHRcdGxldCBsZW5ndGggPSBwYXRoLmdldFRvdGFsTGVuZ3RoKCk7XG5cdFx0cGF0aC5zdHlsZVsnc3Ryb2tlLWRhc2hvZmZzZXQnXSA9IGxlbmd0aDtcblx0XHRwYXRoLnN0eWxlWydzdHJva2UtZGFzaGFycmF5J10gPSBsZW5ndGg7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRhc2hib2FyZDtcbiIsIi8qKlxuICogRmFkZXMgaW4gYSBiYWNrZ3JvdW5kIGltYWdlIG9uY2UgbG9hZGVkXG4gKi9cbmxldCBmYWRlQmFja2dyb3VuZEltYWdlID0gKGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gZmFkZShpbWFnZSkge1xuXHRcdGxldCBiYWNrZ3JvdW5kU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShpbWFnZSlbJ2JhY2tncm91bmQtaW1hZ2UnXTtcblx0XHRsZXQgYmFja2dyb3VuZEltYWdlID0gYmFja2dyb3VuZFN0eWxlLm1hdGNoKC9cXC9cXC8oW2EtejAtOTpcXC1cXC5cXC9dKykvKVswXTtcblx0XHRsZXQgaW1hZ2VUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0aW1hZ2VUZW1wLnNyYyA9IGJhY2tncm91bmRJbWFnZS5yZXBsYWNlKC9cIi9nLCAnJyk7XG5cblx0XHRpbWFnZVRlbXAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0aW1hZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGZhZGU6IGZhZGVcblx0fVxufSgpKTtcbmV4cG9ydCBkZWZhdWx0IGZhZGVCYWNrZ3JvdW5kSW1hZ2U7XG4iLCJpbXBvcnQgZmFkZUJhY2tncm91bmRJbWFnZSBmcm9tICcuL2ZhZGVCYWNrZ3JvdW5kSW1hZ2UuanMnO1xuXG5sZXQgZmFkZUlzSGlkZGVuID0gKGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRsZXQgaXNIaWRkZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaXMtaGlkZGVuJyk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGlzSGlkZGVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRmYWRlQmFja2dyb3VuZEltYWdlLmZhZGUoaXNIaWRkZW5baV0pO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBmYWRlSXNIaWRkZW47XG4iLCJsZXQgaGVhZGVyID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXInKTtcblx0bGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZS1tYWluJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpZiAobWFpbikge1xuXG5cdFx0XHQvLyBpbml0IGNvbnRyb2xsZXJcblx0XHRcdHZhciBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRcdFx0Ly8gY3JlYXRlIGEgc2NlbmVcblx0XHRcdG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XG5cdFx0XHRcdHRyaWdnZXJFbGVtZW50OiBtYWluLFxuXHRcdFx0XHR0cmlnZ2VySG9vazogJ29uTGVhdmUnLFxuXHRcdFx0fSkub24oJ3N0YXJ0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0b2dnbGVXaGl0ZW91dCgpO1xuXG5cdFx0XHR9KVxuXHRcdFx0LmFkZFRvKGNvbnRyb2xsZXIpOyAvLyBhc3NpZ24gdGhlIHNjZW5lIHRvIHRoZSBjb250cm9sbGVyXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlV2hpdGVvdXQoKSB7XG5cdFx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2wtc2l0ZWhlYWRlci0td2hpdGUnKTtcblx0fVxuXG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXI7XG4iLCJpbXBvcnQgZmFkZUJhY2tncm91bmRJbWFnZSBmcm9tICcuL2ZhZGVCYWNrZ3JvdW5kSW1hZ2UuanMnO1xuXG5sZXQgaG9tZVNjcm9sbCA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBuYXZJdGVtcztcblx0bGV0IGRlbHRhID0gMDtcblx0bGV0IGN1cnJlbnRTbGlkZTtcblx0bGV0IG5leHRTbGlkZTtcblx0bGV0IHByZXZpb3VzU2xpZGU7XG5cdGxldCBwcmV2aW91c1NsaWRlcztcblx0bGV0IGlzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXHRsZXQgbGFzdFNjcm9sbGVkO1xuXHRsZXQgbW91c2V3aGVlbENhblNjcm9sbCA9IHRydWU7XG5cdGxldCBsYXN0TW91c2V3aGVlbFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRsZXQgbGFzdFNjcm9sbFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRsZXQgc2Nyb2xscyA9IFtdO1xuXHRsZXQgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy1jb250YWluZXJfX25hdicpO1xuXHRsZXQgd29ya1NsaWRlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXcnKSk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpZiAobmF2KSB7XG5cdFx0XHRuYXZJdGVtcyA9IG5hdi5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG5cdFx0fVxuXHRcdGFuaW1hdGVJbml0aWFsKCk7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiByZXNldFNjcm9sbCgpIHtcblx0XHRzY3JvbGxzID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2Nyb2xsc0F2ZyhvZmZzZXQpIHtcblx0XHRsZXQgc3VtID0gMDtcblxuXHRcdGxldCBlbG1zID0gc2Nyb2xscy5zbGljZShNYXRoLm1heChzY3JvbGxzLmxlbmd0aCAtIG9mZnNldCwgMSkpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbG1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRzdW0gKz0gZWxtc1tpXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKHN1bSAvIG9mZnNldCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhbmltYXRlSW5pdGlhbCgpIHtcblx0XHRsZXQgZmlyc3RXb3JrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tMScpO1xuXHRcdC8vIGZhZGVCYWNrZ3JvdW5kSW1hZ2UoZmlyc3RXb3JrLnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXdfX2ltYWdlJykpO1xuXG5cdFx0Ly8gZmFkZUltYWdlc09uTG9hZCgpO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0Zmlyc3RXb3JrLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmF2SXRlbXNbMF0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctY29udGFpbmVyX19uYXZfX2l0ZW0tLWlzLWFjdGl2ZScpO1xuXHRcdH0sIDIwMCk7XG5cdH1cblxuXHQvLyBEaXNwbGF5cyBiYWNrZ3JvdW5kIGltYWdlcyBvbmx5IG9uY2UgbG9hZGVkXG5cdC8vIGZ1bmN0aW9uIGZhZGVJbWFnZXNPbkxvYWQoKSB7XG5cdC8vIFx0bGV0IHdvcmtJbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3X19pbWFnZScpO1xuICAgIC8vXG5cdC8vIFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB3b3JrSW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG5cdC8vIFx0XHRmYWRlQmFja2dyb3VuZEltYWdlLmZhZGUod29ya0ltYWdlc1tpXSk7XG5cdC8vIFx0fVxuXHQvLyB9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmROYXYpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNjcm9sbE5hdik7XG5cblx0XHQvLyBTdG9wcyB0b3VjaG1vdmUgd29ya2luZyBvdXRyaWdodFxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9KTtcblxuXHRcdC8vIFNldHMgdXAgSGFtbWVyIHRvIGhhbmRsZSB0b3VjaCBldmVudHNcblx0XHRsZXQgd29ya0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctY29udGFpbmVyJyk7XG5cdFx0bGV0IHRvdWNoID0gbmV3IEhhbW1lcih3b3JrQ29udGFpbmVyKTtcblxuXHRcdC8vIEVuYWJsZXMgdmVydGljYWwgc3dpcGUgZGV0ZWN0aW9uXG5cdFx0dG91Y2guZ2V0KCdzd2lwZScpLnNldCh7IGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9BTEwgfSk7XG5cblx0XHQvLyBHZXN0dXJlcyB0aGF0IGVxdWFsIGZvcndhcmRcblx0XHR0b3VjaC5vbignc3dpcGV1cCBzd2lwZWxlZnQnLCBmdW5jdGlvbigpe1xuXHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEdlc3R1cmVzIHRoYXQgZXF1YWwgYmFja3dhcmRzXG5cdFx0dG91Y2gub24oJ3N3aXBlZG93biBzd2lwZXJpZ2h0JywgZnVuY3Rpb24oKXtcblx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBIb29rcyB1cCBuYXZpZ2F0aW9uXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuYXZJdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bmF2SXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVOYXYpO1xuXHRcdH1cblx0XHRcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZU5hdihldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IHNsaWRlTnVtYmVyID0gZXZlbnQudGFyZ2V0LmlubmVySFRNTC5zdWJzdHJpbmcoMSk7XG5cblx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRnb1RvU2xpZGUoc2xpZGVOdW1iZXIpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGhpZ2hsaWdodEFjdGl2ZU5hdigpIHtcblx0XHQvLyBSZW1vdmUgdGhlIGFjdGl2ZSBjbGFzc1xuXHRcdGxldCBhY3RpdmVOYXZDbGFzcyA9ICd3b3JrLXByZXZpZXctY29udGFpbmVyX19uYXZfX2l0ZW0tLWlzLWFjdGl2ZSc7XG5cdFx0bGV0IGFjdGl2ZU5hdkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGFjdGl2ZU5hdkNsYXNzKTtcblx0XHRhY3RpdmVOYXZJdGVtLmNsYXNzTGlzdC5yZW1vdmUoYWN0aXZlTmF2Q2xhc3MpO1xuXG5cdFx0bGV0IG5leHROdW1iZXIgPSBuZXh0U2xpZGUuaWQuc3Vic3RyaW5nKG5leHRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXHRcdGNvbnNvbGUubG9nKG5leHROdW1iZXIpO1xuXG5cdFx0bmF2SXRlbXNbbmV4dE51bWJlciAtIDFdLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZChhY3RpdmVOYXZDbGFzcyk7XG5cdH1cblxuXHRmdW5jdGlvbiBnb1RvU2xpZGUoc2xpZGVOdW1iZXIpIHtcblx0XHRuZXh0U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS0nICsgc2xpZGVOdW1iZXIgKTtcblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRpZiAobmV4dFNsaWRlKSB7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXG5cdFx0XHRsZXQgY3VycmVudE51bWJlciA9IGN1cnJlbnRTbGlkZS5pZC5zdWJzdHJpbmcoY3VycmVudFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cdFx0XHRsZXQgbmV4dE51bWJlciA9IG5leHRTbGlkZS5pZC5zdWJzdHJpbmcobmV4dFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cblx0XHRcdGlmIChjdXJyZW50TnVtYmVyID4gbmV4dE51bWJlcikge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZ29pbmcgYmFja3dhcmRzJyk7XG5cdFx0XHRcdC8vIElmIHdlJ3JlIGdvaW5nIGJhY2t3YXJkc1xuXHRcdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cblx0XHRcdFx0Ly8gTmVlZCB0byBhZGQgbmV4dCB0byBBTEwgZ29pbmcgZm9yd2FyZFxuXHRcdFx0XHRsZXQgcHJldmlvdXNTbGlkZXMgPSB3b3JrU2xpZGVzLnNsaWNlKG5leHROdW1iZXIsIGN1cnJlbnROdW1iZXIgLSAxKTtcblxuXHRcdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBwcmV2aW91c1NsaWRlcy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0XHRwcmV2aW91c1NsaWRlc1tpXS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHRcdFx0XHRwcmV2aW91c1NsaWRlc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSWYgd2UncmUgZ29pbmcgZm9yd2FyZHNcblx0XHRcdFx0Y29uc29sZS5sb2coJ2dvaW5nIGZvcndhcmRzJyk7XG5cdFx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHR9XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGxOYXYoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGxldCBzY3JvbGxUaHJlc2hvbGQgPSA0MDtcblxuXHRcdGxldCB2YWx1ZSA9IC1lLmRlbHRhWTtcblxuXHRcdGlmIChzY3JvbGxzLmxlbmd0aCA+IDE1MCkge1xuXHRcdFx0c2Nyb2xscy5zaGlmdCgpO1xuXHRcdH1cblxuXHRcdHNjcm9sbHMucHVzaChNYXRoLmFicyh2YWx1ZSkpO1xuXG5cdFx0dmFyIGN1cnJUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuXHRcdGlmICgoY3VyclRpbWUgLSBsYXN0TW91c2V3aGVlbFRpbWUpID4gMjAwKSB7XG5cdFx0XHRyZXNldFNjcm9sbCgpO1xuXHRcdH1cblxuXHRcdGxhc3RNb3VzZXdoZWVsVGltZSA9IGN1cnJUaW1lO1xuXG5cdFx0dmFyIGxhc3RBdmcgPSBzY3JvbGxzQXZnKDUpO1xuXHRcdHZhciBtaWRBdmcgPSBzY3JvbGxzQXZnKDQwKTtcblxuXHRcdGlmIChsYXN0QXZnID4gbWlkQXZnKSB7XG5cdFx0XHRpZiAobW91c2V3aGVlbENhblNjcm9sbCAmJiBpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAodmFsdWUgPCAwKSB7XG5cdFx0XHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBrZXlib2FyZE5hdihldmVudCkge1xuXHRcdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRcdGNhc2UgMzg6XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgNDA6XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2V0VHJhbnNpdGlvbmluZygpIHtcblx0XHRpc1RyYW5zaXRpb25pbmcgPSB0cnVlO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGlzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXHRcdH0sIDEwMDApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYWR2YW5jZVNsaWRlKCkge1xuXG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdG5leHRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLW5leHQnKTtcblxuXHRcdGlmIChuZXh0U2xpZGUpIHtcblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblx0XG5cdGZ1bmN0aW9uIHJlZ3Jlc3NTbGlkZSgpIHtcblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0cHJldmlvdXNTbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdHByZXZpb3VzU2xpZGUgPSBwcmV2aW91c1NsaWRlc1twcmV2aW91c1NsaWRlcy5sZW5ndGggLSAxXTtcblxuXHRcdGlmIChwcmV2aW91c1NsaWRlKSB7XG5cdFx0XHQvLyBTZXRzIG5leHQgYWN0dWFsIHNsaWRlIChub3QgY2hyb25vbG9naWNhbGx5KSB0byBwcmV2aW91cyBzbGlkZVxuXHRcdFx0bmV4dFNsaWRlID0gcHJldmlvdXNTbGlkZTtcblxuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGhvbWVTY3JvbGw7XG4iLCIvKipcbiAqIEFsbG93cyBmb3IgbGVmdC9yaWdodCBuYXZpZ2F0aW9uIGluIGpvdXJuYWxcbiAqL1xubGV0IGpvdXJuYWxOYXYgPSAoZnVuY3Rpb24oKSB7XG5cdGxldCBwcmV2aW91cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZV9fbmF2aWdhdGlvbi0tcHJldmlvdXMgYScpO1xuXHRsZXQgbmV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZV9fbmF2aWdhdGlvbi0tbmV4dCBhJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkTmF2KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGtleWJvYXJkTmF2KGV2ZW50KSB7XG5cdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRjYXNlIDM3OlxuXHRcdFx0XHRpZiAocHJldmlvdXMpIHtcblx0XHRcdFx0XHRnb1RvTGluayggcHJldmlvdXMuaHJlZiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzOTpcblx0XHRcdFx0aWYgKG5leHQpIHtcblx0XHRcdFx0XHRnb1RvTGluayggbmV4dC5ocmVmICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gZ29Ub0xpbmsobGluaykge1xuXHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbGluaztcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZU5hdihldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgam91cm5hbE5hdjtcbiIsIi8qKlxuICogSGFuZGxlcyBtb2JpbGUgbWVudVxuICovXG5sZXQgbWVudSA9IChmdW5jdGlvbigpIHtcblx0bGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXInKTtcblx0bGV0IHRvZ2dsZSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyX19tZW51LXRvZ2dsZScpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0dG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRvZ2dsZU1lbnUoKTtcblx0XHRcdGNoYW5nZVRleHQoKTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XG5cdFx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2wtc2l0ZWhlYWRlci0tbmF2LWlzLW9wZW4nKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZVRleHQoKSB7XG5cdFx0aWYgKHRvZ2dsZS5pbm5lckhUTUwgPT0gJ01lbnUnKSB7XHRcblx0XHRcdHRvZ2dsZS5pbm5lckhUTUwgPSAnQ2xvc2UnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0b2dnbGUuaW5uZXJIVE1MID0gJ01lbnUnO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBtZW51O1xuIiwibGV0IHByaW1lbGFicyA9IChmdW5jdGlvbiAoKSB7XG5cdC8vIEluaXQgY29udHJvbGxlclxuXHRsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cblx0bGV0IHByb2JsZW1TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3NlY3Rpb24tLXByb2JsZW1zJyk7XG5cdGxldCBtb2R1bGFyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19zZWN0aW9uLS1tb2R1bGFyLWJveGVzJyk7XG5cdGxldCBzdGFuZGFyZFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fc2VjdGlvbi0tYXMtc3RhbmRhcmQnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUFjdGlvbnMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUFjdGlvbnMoKSB7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgcHJvYmxlbVNlY3Rpb24sIHByb2JsZW1IYW5kbGVyKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBtb2R1bGFyU2VjdGlvbiwgbW9kdWxhckhhbmRsZXIpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIHN0YW5kYXJkU2VjdGlvbiwgc3RhbmRhcmRIYW5kbGVyKTtcblx0fVxuXG5cdC8vIEFkZHMgYSBzY2VuZSB3aXRoIHByZWRlZmluZWQgb3B0aW9ucyB0byB0aGUgY29udHJvbGxlclxuXHRmdW5jdGlvbiBhZGRTY2VuZShjb250cm9sbGVyLCBlbGVtZW50LCBoYW5kbGVyKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHR0cmlnZ2VyRWxlbWVudDogZWxlbWVudCxcblx0XHRcdG9mZnNldDogNTAsXG5cdFx0XHRyZXZlcnNlOiBmYWxzZVxuXHRcdH07XG5cblx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUob3B0aW9ucykub24oJ3N0YXJ0JywgaGFuZGxlcikuYWRkVG8oY29udHJvbGxlcik7XG5cdH1cblxuXHRmdW5jdGlvbiBwcm9ibGVtSGFuZGxlcigpIHtcblx0XHRwcm9ibGVtU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdwcmltZS1sYWJzX19zZWN0aW9uLS1wcm9ibGVtcy0taXMtYWN0aXZlJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBtb2R1bGFySGFuZGxlcigpIHtcblx0XHRtb2R1bGFyU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdwcmltZS1sYWJzX19zZWN0aW9uLS1tb2R1bGFyLWJveGVzLS1pcy1hY3RpdmUnKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHN0YW5kYXJkSGFuZGxlcigpIHtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fdmlkZW8nKS5wbGF5KCk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IHByaW1lbGFicztcbiJdfQ==
