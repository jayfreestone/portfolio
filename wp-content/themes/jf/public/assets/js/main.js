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
	var demoSection = document.querySelector('.dashboard__demo');

	function init() {
		bindUIActions();
	}

	function bindUIActions() {
		// Init controller
		var controller = new ScrollMagic.Controller();

		// Add scenes
		addScene(controller, groundSection, reactAnimation);
		addScene(controller, deploymentSection, terminalAnimation);
		addScene(controller, demoSection, demoHandler);
	}

	function terminalAnimation() {
		var codeWindow = deploymentSection.querySelector('.dashboard__terminal code');
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

	function demoHandler() {
		document.querySelector('.dashboard__demo video').play();
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
		var paths = Array.from(logo.querySelectorAll('path'));

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var path = _step.value;

				setDash(path);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
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
}(); /**
      * Dashboard
      * JS for the Dashboard case study.
      */


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
				image.classList.remove('is-hidden-bg');
			});
		} else {
			image.classList.remove('is-hidden-bg');
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
		var isHiddenAll = Array.from(document.querySelectorAll('.is-hidden-bg'));

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = isHiddenAll[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var isHidden = _step.value;

				_fadeBackgroundImage2.default.fade(isHidden);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
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
/**
 * Home Scroll
 * Handles the homepage carousel
 */
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
			navItems = Array.from(nav.querySelectorAll('a'));
		}

		animateInitial();
		bindUIEvents();
		objectFitTest();
	}

	function objectFitTest() {
		var objectFit = 'object-fit' in document.createElement('i').style;
		var objectPosition = 'object-position' in document.createElement('i').style;

		// If the browser doesn't support either (we need both)
		if (!objectFit || !objectPosition) {
			// Hide the actual image and jump to the fallback
			document.querySelector('.work-preview__image-preload').style.display = 'none';
			loadImages();
		}
	}

	// Runs loadImage on the work-preview carousel images.
	function loadImages() {
		var previewImages = Array.from(document.querySelectorAll('.work-preview'));

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = previewImages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var previewImage = _step.value;

				loadImage(previewImage);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}

	// Displays the images as background images.
	function loadImage(image) {
		var imageHolder = image.querySelector('.work-preview__image');

		// Image is display none
		var imagePreload = image.querySelector('.work-preview__image-preload');
		var backgroundStyle = imagePreload.currentSrc;

		// Seems to be more reliable than attaching directly
		var tmpImg = document.createElement('img');
		tmpImg.src = backgroundStyle;

		tmpImg.addEventListener('load', function () {
			// Image placeholder is given background image
			if (backgroundStyle) {
				imageHolder.style.backgroundImage = 'url("' + backgroundStyle + '")';
				imageHolder.classList.remove('is-hidden');
			}
		});
	}

	function resetScroll() {
		scrolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	}

	function scrollsAvg(offset) {
		var sum = 0;

		var elms = scrolls.slice(Math.max(scrolls.length - offset, 1));

		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = elms[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var elm = _step2.value;

				sum += elm;
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		return Math.ceil(sum / offset);
	}

	function animateInitial() {
		var firstWork = document.querySelector('.work-preview--1');

		setTimeout(function () {
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
		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = navItems[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var navItem = _step3.value;

				navItem.addEventListener('click', handleNav);
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
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

				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = _previousSlides[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var _previousSlide = _step4.value;

						_previousSlide.classList.add('work-preview--next');
						_previousSlide.classList.remove('work-preview--previous');
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4.return) {
							_iterator4.return();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
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

},{}],7:[function(require,module,exports){
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
/**
 * Prime Labs
 * JS for the Prime Labs case study.
 */
var primelabs = function () {
	// Init controller
	var controller = new ScrollMagic.Controller();

	var problemSection = document.querySelector('.prime-labs__problems');
	var standardSection = document.querySelector('.prime-labs__as-standard');
	var carouselSection = document.querySelector('.prime-labs__carousel');
	var backstorySection = document.querySelector('.prime-labs__backstory');

	function init() {
		bindUIActions();
	}

	function bindUIActions() {
		addScene(controller, backstorySection, backstoryHandler);
		addScene(controller, problemSection, problemHandler);
		addScene(controller, standardSection, standardHandler);
		addScene(controller, carouselSection, carouselHandler);
	}

	function backstoryHandler() {
		var tl = new TimelineMax({ delay: 1 });
		var logo = backstorySection.querySelector('#prime-labs__backstory__logo');
		var bubbleBottom = logo.querySelector('#bubbleBottom');
		var bubbleMiddle = logo.querySelector('#bubbleMiddle');
		var bubbleTop = logo.querySelector('#bubbleTop');

		tl.to(logo, 1, { opacity: 1, ease: Power1.easeIn }).to(bubbleBottom, 1, { opacity: 1 }, 'bottom').to(bubbleMiddle, 1, { opacity: 1 }, 'middle').to(bubbleBottom, 1, { opacity: 0 }, 'middle').to(bubbleTop, 1, { opacity: 1 }, 'top').to(bubbleMiddle, 1, { opacity: 0 }, 'top').to(bubbleMiddle, 1, { opacity: 1 }, 'final').to(bubbleBottom, 1, { opacity: 1 }, 'final');
	}

	function carouselHandler() {
		var tl = new TimelineMax({ delay: 2, repeat: 1 });
		var title = carouselSection.querySelector('.heading-1');

		tl.to(title, 3, { x: '150%', opacity: '0', ease: Power1.easeIn });
		tl.set(title, { x: '-150%' });
		tl.to(title, 3, { x: '0%', opacity: '1', ease: Power1.easeOut });
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
		problemSection.classList.add('prime-labs__problems--is-active');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYXJ0aWFscy9kYXNoYm9hcmQuanMiLCJzcmMvanMvcGFydGlhbHMvZmFkZUJhY2tncm91bmRJbWFnZS5qcyIsInNyYy9qcy9wYXJ0aWFscy9mYWRlSXNIaWRkZW4uanMiLCJzcmMvanMvcGFydGlhbHMvaGVhZGVyLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFDekQsZ0JBQUssSUFBTDs7QUFFQSx3QkFBYSxJQUFiOztBQUVBLEtBQUksU0FBUyxhQUFULENBQXVCLHNCQUF2QixDQUFKLEVBQW9EO0FBQ25ELG1CQUFPLElBQVA7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixlQUF2QixDQUFKLEVBQTZDO0FBQzVDLHVCQUFXLElBQVg7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFKLEVBQTJDO0FBQzFDLHNCQUFVLElBQVY7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFKLEVBQTBDO0FBQ3pDLHNCQUFVLElBQVY7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixpQkFBdkIsQ0FBSixFQUErQztBQUM5Qyx1QkFBVyxJQUFYO0FBQ0E7QUFDRCxDQXhCRDs7Ozs7Ozs7O0FDSkE7Ozs7OztBQUVBLElBQUksWUFBYSxZQUFZO0FBQzVCLEtBQUksZ0JBQWdCLFNB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biBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHByaW1lbGFicyBmcm9tICcuL3BhcnRpYWxzL3ByaW1lbGFicy5qcyc7XG5pbXBvcnQgbWVudSBmcm9tICcuL3BhcnRpYWxzL21lbnUuanMnO1xuaW1wb3J0IGhvbWVTY3JvbGwgZnJvbSAnLi9wYXJ0aWFscy9ob21lU2Nyb2xsLmpzJztcbmltcG9ydCBqb3VybmFsTmF2IGZyb20gJy4vcGFydGlhbHMvam91cm5hbE5hdi5qcyc7XG5pbXBvcnQgZGFzaGJvYXJkIGZyb20gJy4vcGFydGlhbHMvZGFzaGJvYXJkLmpzJztcbmltcG9ydCBoZWFkZXIgZnJvbSAnLi9wYXJ0aWFscy9oZWFkZXIuanMnO1xuaW1wb3J0IGZhZGVJc0hpZGRlbiBmcm9tICcuL3BhcnRpYWxzL2ZhZGVJc0hpZGRlbi5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdG1lbnUuaW5pdCgpO1xuXG5cdGZhZGVJc0hpZGRlbi5pbml0KCk7XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXItLXdoaXRlJykpIHtcblx0XHRoZWFkZXIuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXcnKSkge1xuXHRcdGhvbWVTY3JvbGwuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzJykpIHtcblx0XHRwcmltZWxhYnMuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmQnKSkge1xuXHRcdGRhc2hib2FyZC5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlJykpIHtcblx0XHRqb3VybmFsTmF2LmluaXQoKTtcblx0fVxufSk7XG4iLCIvKipcbiAqIERhc2hib2FyZFxuICogSlMgZm9yIHRoZSBEYXNoYm9hcmQgY2FzZSBzdHVkeS5cbiAqL1xuaW1wb3J0IGZhZGVCYWNrZ3JvdW5kSW1hZ2UgZnJvbSAnLi9mYWRlQmFja2dyb3VuZEltYWdlLmpzJztcblxubGV0IGRhc2hib2FyZCA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBncm91bmRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZ3JvdW5kd29yaycpO1xuXHRsZXQgZGVwbG95bWVudFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19kZXBsb3ltZW50Jyk7XG5cdGxldCBkZW1vU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2RlbW8nKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUFjdGlvbnMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUFjdGlvbnMoKSB7XG5cdFx0Ly8gSW5pdCBjb250cm9sbGVyXG5cdFx0bGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdFx0Ly8gQWRkIHNjZW5lc1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIGdyb3VuZFNlY3Rpb24sIHJlYWN0QW5pbWF0aW9uKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBkZXBsb3ltZW50U2VjdGlvbiwgdGVybWluYWxBbmltYXRpb24pO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIGRlbW9TZWN0aW9uLCBkZW1vSGFuZGxlcik7XG5cdH1cblxuXHRmdW5jdGlvbiB0ZXJtaW5hbEFuaW1hdGlvbigpIHtcblx0XHRsZXQgY29kZVdpbmRvdyA9IGRlcGxveW1lbnRTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX3Rlcm1pbmFsIGNvZGUnKTtcblx0XHR3cml0ZVN0cmluZygnY2FwIHN0YWdpbmcgZGVwbG95JywgY29kZVdpbmRvdyk7XG5cdH1cblxuXHRmdW5jdGlvbiB3cml0ZVN0cmluZyhzdHJpbmdUb1R5cGUsIHBsYWNlVG9UeXBlKSB7XG5cdFx0bGV0IGkgPSAwO1xuXG5cdFx0KGZ1bmN0aW9uIHdyaXRlQ2hhcigpIHtcblx0XHRcdGlmIChzdHJpbmdUb1R5cGUubGVuZ3RoID4gaSkge1xuXHRcdFx0XHRwbGFjZVRvVHlwZS5pbm5lckhUTUwgPSBwbGFjZVRvVHlwZS5pbm5lckhUTUwgKyBzdHJpbmdUb1R5cGVbaV07XG5cdFx0XHRcdGkrKztcblxuXHRcdFx0XHRsZXQgZGVsYXkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAwKSkgKyAxNDA7XG5cblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHdyaXRlQ2hhcigpO1xuXHRcdFx0XHR9LCBkZWxheSk7XG5cdFx0XHR9XG5cdFx0fSkoKVxuXHR9XG5cblx0ZnVuY3Rpb24gZGVtb0hhbmRsZXIoKSB7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZGVtbyB2aWRlbycpLnBsYXkoKTtcblx0fVxuXG5cdC8vIEFkZHMgYSBzY2VuZSB3aXRoIHByZWRlZmluZWQgb3B0aW9ucyB0byB0aGUgY29udHJvbGxlclxuXHRmdW5jdGlvbiBhZGRTY2VuZShjb250cm9sbGVyLCBlbGVtZW50LCBoYW5kbGVyKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHR0cmlnZ2VyRWxlbWVudDogZWxlbWVudCxcblx0XHRcdG9mZnNldDogNTAsXG5cdFx0XHRyZXZlcnNlOiBmYWxzZVxuXHRcdH07XG5cblx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUob3B0aW9ucykub24oJ3N0YXJ0JywgaGFuZGxlcikuYWRkVG8oY29udHJvbGxlcik7XG5cdH1cblxuXG5cdC8vIFJlYWN0IExvZ28gQW5pbWF0aW9uXG5cdGZ1bmN0aW9uIHJlYWN0QW5pbWF0aW9uKCkge1xuXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xuXG5cdFx0bGV0IGxvZ28gPSBncm91bmRTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuXHRcdGxldCBwYXRocyA9IEFycmF5LmZyb20obG9nby5xdWVyeVNlbGVjdG9yQWxsKCdwYXRoJykpO1xuXG5cdFx0Zm9yIChjb25zdCBwYXRoIG9mIHBhdGhzKSB7XG5cdFx0XHRzZXREYXNoKHBhdGgpO1xuXHRcdH1cblxuXHRcdHRsLnRvKHBhdGhzLCAzLCB7ICdzdHJva2UtZGFzaG9mZnNldCc6IDAsIG9wYWNpdHk6ICcxJywgZWFzZTogUG93ZXIxLmVhc2VJbiB9KVxuXHRcdC50byhwYXRocywgMSwgeyAnZmlsbCc6ICcjMDBkOGZmJywgJ3N0cm9rZSc6ICcjMDBkOGZmJywgZWFzZTogUG93ZXIxLmVhc2VJbiB9KTtcblx0fVxuXG5cdC8vIFNldHMgRGFzaCBhcnJheS9vZmZzZXQgb24gZWxlbWVudFxuXHRmdW5jdGlvbiBzZXREYXNoKHBhdGgpIHtcblx0XHRsZXQgbGVuZ3RoID0gcGF0aC5nZXRUb3RhbExlbmd0aCgpO1xuXHRcdHBhdGguc3R5bGVbJ3N0cm9rZS1kYXNob2Zmc2V0J10gPSBsZW5ndGg7XG5cdFx0cGF0aC5zdHlsZVsnc3Ryb2tlLWRhc2hhcnJheSddID0gbGVuZ3RoO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBkYXNoYm9hcmQ7XG4iLCIvKipcbiAqIEZhZGVzIGluIGEgYmFja2dyb3VuZCBpbWFnZSBvbmNlIGxvYWRlZFxuICovXG5sZXQgZmFkZUJhY2tncm91bmRJbWFnZSA9IChmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIGZhZGUoaW1hZ2UpIHtcblx0XHRsZXQgYmFja2dyb3VuZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoaW1hZ2UpWydiYWNrZ3JvdW5kLWltYWdlJ107XG5cdFx0bGV0IGltYWdlVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG5cdFx0aWYgKCBiYWNrZ3JvdW5kU3R5bGUgIT09ICdub25lJyApIHtcblx0XHRcdGxldCBiYWNrZ3JvdW5kSW1hZ2UgPSBiYWNrZ3JvdW5kU3R5bGUubWF0Y2goL1xcL1xcLyhbYS16MC05OlxcLVxcLlxcL10rKS8pWzBdO1xuXHRcdFx0aW1hZ2VUZW1wLnNyYyA9IGJhY2tncm91bmRJbWFnZS5yZXBsYWNlKC9cIi9nLCAnJyk7XG5cdFx0XHRpbWFnZVRlbXAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4tYmcnKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4tYmcnKTtcblx0XHR9XG5cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0ZmFkZTogZmFkZVxuXHR9XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgZmFkZUJhY2tncm91bmRJbWFnZTtcbiIsIi8qKlxuICogRmFkZXMgaW4gYmFja2dyb3VuZCBpbWFnZXMgd2l0aCAnaXMtaGlkZGVuJyBjbGFzc1xuICovXG5pbXBvcnQgZmFkZUJhY2tncm91bmRJbWFnZSBmcm9tICcuL2ZhZGVCYWNrZ3JvdW5kSW1hZ2UuanMnO1xuXG5sZXQgZmFkZUlzSGlkZGVuID0gKGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRsZXQgaXNIaWRkZW5BbGwgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pcy1oaWRkZW4tYmcnKSk7XG5cblx0XHRmb3IgKGNvbnN0IGlzSGlkZGVuIG9mIGlzSGlkZGVuQWxsKSB7XG5cdFx0XHRmYWRlQmFja2dyb3VuZEltYWdlLmZhZGUoaXNIaWRkZW4pO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBmYWRlSXNIaWRkZW47XG4iLCJsZXQgaGVhZGVyID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXInKTtcblx0bGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZS1tYWluJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpZiAobWFpbikge1xuXG5cdFx0XHQvLyBpbml0IGNvbnRyb2xsZXJcblx0XHRcdHZhciBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRcdFx0Ly8gY3JlYXRlIGEgc2NlbmVcblx0XHRcdG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XG5cdFx0XHRcdHRyaWdnZXJFbGVtZW50OiBtYWluLFxuXHRcdFx0XHR0cmlnZ2VySG9vazogJ29uTGVhdmUnLFxuXHRcdFx0fSkub24oJ3N0YXJ0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0b2dnbGVXaGl0ZW91dCgpO1xuXG5cdFx0XHR9KVxuXHRcdFx0LmFkZFRvKGNvbnRyb2xsZXIpOyAvLyBhc3NpZ24gdGhlIHNjZW5lIHRvIHRoZSBjb250cm9sbGVyXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlV2hpdGVvdXQoKSB7XG5cdFx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2wtc2l0ZWhlYWRlci0td2hpdGUnKTtcblx0fVxuXG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXI7XG4iLCIvKipcbiAqIEhvbWUgU2Nyb2xsXG4gKiBIYW5kbGVzIHRoZSBob21lcGFnZSBjYXJvdXNlbFxuICovXG5sZXQgaG9tZVNjcm9sbCA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBuYXZJdGVtcztcblx0bGV0IGRlbHRhID0gMDtcblx0bGV0IGN1cnJlbnRTbGlkZTtcblx0bGV0IG5leHRTbGlkZTtcblx0bGV0IHByZXZpb3VzU2xpZGU7XG5cdGxldCBwcmV2aW91c1NsaWRlcztcblx0bGV0IGlzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXHRsZXQgbGFzdFNjcm9sbGVkO1xuXHRsZXQgbW91c2V3aGVlbENhblNjcm9sbCA9IHRydWU7XG5cdGxldCBsYXN0TW91c2V3aGVlbFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRsZXQgbGFzdFNjcm9sbFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRsZXQgc2Nyb2xscyA9IFtdO1xuXHRsZXQgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy1jb250YWluZXJfX25hdicpO1xuXHRsZXQgd29ya1NsaWRlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXcnKSk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpZiAobmF2KSB7XG5cdFx0XHRuYXZJdGVtcyA9IEFycmF5LmZyb20obmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSk7XG5cdFx0fVxuXG5cdFx0YW5pbWF0ZUluaXRpYWwoKTtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0XHRvYmplY3RGaXRUZXN0KCk7XG5cdH1cblxuXHRmdW5jdGlvbiBvYmplY3RGaXRUZXN0KCkge1xuXHRcdGxldCBvYmplY3RGaXQgPSAnb2JqZWN0LWZpdCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpLnN0eWxlO1xuXHRcdGxldCBvYmplY3RQb3NpdGlvbiA9ICdvYmplY3QtcG9zaXRpb24nIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKS5zdHlsZTtcblxuXHRcdC8vIElmIHRoZSBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBlaXRoZXIgKHdlIG5lZWQgYm90aClcblx0XHRpZiAoIW9iamVjdEZpdCB8fCAhb2JqZWN0UG9zaXRpb24pIHtcblx0XHRcdC8vIEhpZGUgdGhlIGFjdHVhbCBpbWFnZSBhbmQganVtcCB0byB0aGUgZmFsbGJhY2sgXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3X19pbWFnZS1wcmVsb2FkJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdGxvYWRJbWFnZXMoKTtcblx0XHR9XG5cdH1cblxuXHQvLyBSdW5zIGxvYWRJbWFnZSBvbiB0aGUgd29yay1wcmV2aWV3IGNhcm91c2VsIGltYWdlcy5cblx0ZnVuY3Rpb24gbG9hZEltYWdlcygpIHtcblx0XHRsZXQgcHJldmlld0ltYWdlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlldycpKTtcblxuXHRcdGZvciAoIGNvbnN0IHByZXZpZXdJbWFnZSBvZiBwcmV2aWV3SW1hZ2VzICkge1xuXHRcdFx0bG9hZEltYWdlKCBwcmV2aWV3SW1hZ2UgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBEaXNwbGF5cyB0aGUgaW1hZ2VzIGFzIGJhY2tncm91bmQgaW1hZ2VzLlxuXHRmdW5jdGlvbiBsb2FkSW1hZ2UoaW1hZ2UpIHtcblx0XHRsZXQgaW1hZ2VIb2xkZXIgPSBpbWFnZS5xdWVyeVNlbGVjdG9yKCAnLndvcmstcHJldmlld19faW1hZ2UnICk7XG5cblx0XHQvLyBJbWFnZSBpcyBkaXNwbGF5IG5vbmVcblx0XHRsZXQgaW1hZ2VQcmVsb2FkID0gaW1hZ2UucXVlcnlTZWxlY3RvciggJy53b3JrLXByZXZpZXdfX2ltYWdlLXByZWxvYWQnICk7XG5cdFx0bGV0IGJhY2tncm91bmRTdHlsZSA9IGltYWdlUHJlbG9hZC5jdXJyZW50U3JjO1xuXG5cdFx0Ly8gU2VlbXMgdG8gYmUgbW9yZSByZWxpYWJsZSB0aGFuIGF0dGFjaGluZyBkaXJlY3RseVxuXHRcdGxldCB0bXBJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0XHR0bXBJbWcuc3JjID0gYmFja2dyb3VuZFN0eWxlO1xuXG5cdFx0dG1wSW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZnVuY3Rpb24oKXtcblx0XHRcdC8vIEltYWdlIHBsYWNlaG9sZGVyIGlzIGdpdmVuIGJhY2tncm91bmQgaW1hZ2Vcblx0XHRcdGlmICggYmFja2dyb3VuZFN0eWxlICkge1xuXHRcdFx0XHRpbWFnZUhvbGRlci5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFwiJyArIGJhY2tncm91bmRTdHlsZSArICdcIiknO1xuXHRcdFx0XHRpbWFnZUhvbGRlci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcblx0XHRcdH1cblx0XHR9KSk7XG5cdH1cblxuXHRmdW5jdGlvbiByZXNldFNjcm9sbCgpIHtcblx0XHRzY3JvbGxzID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2Nyb2xsc0F2ZyhvZmZzZXQpIHtcblx0XHRsZXQgc3VtID0gMDtcblxuXHRcdGxldCBlbG1zID0gc2Nyb2xscy5zbGljZShNYXRoLm1heChzY3JvbGxzLmxlbmd0aCAtIG9mZnNldCwgMSkpO1xuXG5cdFx0Zm9yICggY29uc3QgZWxtIG9mIGVsbXMgKSB7XG5cdFx0XHRzdW0gKz0gZWxtO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLmNlaWwoc3VtIC8gb2Zmc2V0KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFuaW1hdGVJbml0aWFsKCkge1xuXHRcdGxldCBmaXJzdFdvcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS0xJyk7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRmaXJzdFdvcmsuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuYXZJdGVtc1swXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy1jb250YWluZXJfX25hdl9faXRlbS0taXMtYWN0aXZlJyk7XG5cdFx0fSwgMjAwKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkTmF2KTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBzY3JvbGxOYXYpO1xuXG5cdFx0Ly8gU3RvcHMgdG91Y2htb3ZlIHdvcmtpbmcgb3V0cmlnaHRcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fSk7XG5cblx0XHQvLyBTZXRzIHVwIEhhbW1lciB0byBoYW5kbGUgdG91Y2ggZXZlbnRzXG5cdFx0bGV0IHdvcmtDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LWNvbnRhaW5lcicpO1xuXHRcdGxldCB0b3VjaCA9IG5ldyBIYW1tZXIod29ya0NvbnRhaW5lcik7XG5cblx0XHQvLyBFbmFibGVzIHZlcnRpY2FsIHN3aXBlIGRldGVjdGlvblxuXHRcdHRvdWNoLmdldCgnc3dpcGUnKS5zZXQoeyBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fQUxMIH0pO1xuXG5cdFx0Ly8gR2VzdHVyZXMgdGhhdCBlcXVhbCBmb3J3YXJkXG5cdFx0dG91Y2gub24oJ3N3aXBldXAgc3dpcGVsZWZ0JywgZnVuY3Rpb24oKXtcblx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0YWR2YW5jZVNsaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBHZXN0dXJlcyB0aGF0IGVxdWFsIGJhY2t3YXJkc1xuXHRcdHRvdWNoLm9uKCdzd2lwZWRvd24gc3dpcGVyaWdodCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdHJlZ3Jlc3NTbGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gSG9va3MgdXAgbmF2aWdhdGlvblxuXHRcdGZvciAoY29uc3QgbmF2SXRlbSBvZiBuYXZJdGVtcykge1xuXHRcdFx0bmF2SXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZU5hdik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlTmF2KGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRsZXQgc2xpZGVOdW1iZXIgPSBldmVudC50YXJnZXQuaW5uZXJIVE1MLnN1YnN0cmluZygxKTtcblxuXHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdGdvVG9TbGlkZShzbGlkZU51bWJlcik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGlnaGxpZ2h0QWN0aXZlTmF2KCkge1xuXHRcdC8vIFJlbW92ZSB0aGUgYWN0aXZlIGNsYXNzXG5cdFx0bGV0IGFjdGl2ZU5hdkNsYXNzID0gJ3dvcmstcHJldmlldy1jb250YWluZXJfX25hdl9faXRlbS0taXMtYWN0aXZlJztcblx0XHRsZXQgYWN0aXZlTmF2SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYWN0aXZlTmF2Q2xhc3MpO1xuXHRcdGFjdGl2ZU5hdkl0ZW0uY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVOYXZDbGFzcyk7XG5cblx0XHRsZXQgbmV4dE51bWJlciA9IG5leHRTbGlkZS5pZC5zdWJzdHJpbmcobmV4dFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cdFx0Y29uc29sZS5sb2cobmV4dE51bWJlcik7XG5cblx0XHRuYXZJdGVtc1tuZXh0TnVtYmVyIC0gMV0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKGFjdGl2ZU5hdkNsYXNzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdvVG9TbGlkZShzbGlkZU51bWJlcikge1xuXHRcdG5leHRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLScgKyBzbGlkZU51bWJlciApO1xuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdGlmIChuZXh0U2xpZGUpIHtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cblx0XHRcdGxldCBjdXJyZW50TnVtYmVyID0gY3VycmVudFNsaWRlLmlkLnN1YnN0cmluZyhjdXJyZW50U2xpZGUuaWQubGVuZ3RoIC0xKTtcblx0XHRcdGxldCBuZXh0TnVtYmVyID0gbmV4dFNsaWRlLmlkLnN1YnN0cmluZyhuZXh0U2xpZGUuaWQubGVuZ3RoIC0xKTtcblxuXHRcdFx0aWYgKGN1cnJlbnROdW1iZXIgPiBuZXh0TnVtYmVyKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdnb2luZyBiYWNrd2FyZHMnKTtcblx0XHRcdFx0Ly8gSWYgd2UncmUgZ29pbmcgYmFja3dhcmRzXG5cdFx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblxuXHRcdFx0XHQvLyBOZWVkIHRvIGFkZCBuZXh0IHRvIEFMTCBnb2luZyBmb3J3YXJkXG5cdFx0XHRcdGxldCBwcmV2aW91c1NsaWRlcyA9IHdvcmtTbGlkZXMuc2xpY2UobmV4dE51bWJlciwgY3VycmVudE51bWJlciAtIDEpO1xuXG5cdFx0XHRcdGZvciAoIGNvbnN0IHByZXZpb3VzU2xpZGUgb2YgcHJldmlvdXNTbGlkZXMgKSB7XG5cdFx0XHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHRcdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBJZiB3ZSdyZSBnb2luZyBmb3J3YXJkc1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZ29pbmcgZm9yd2FyZHMnKTtcblx0XHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdH1cblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNjcm9sbE5hdihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0bGV0IHNjcm9sbFRocmVzaG9sZCA9IDQwO1xuXG5cdFx0bGV0IHZhbHVlID0gLWUuZGVsdGFZO1xuXG5cdFx0aWYgKHNjcm9sbHMubGVuZ3RoID4gMTUwKSB7XG5cdFx0XHRzY3JvbGxzLnNoaWZ0KCk7XG5cdFx0fVxuXG5cdFx0c2Nyb2xscy5wdXNoKE1hdGguYWJzKHZhbHVlKSk7XG5cblx0XHR2YXIgY3VyclRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG5cdFx0aWYgKChjdXJyVGltZSAtIGxhc3RNb3VzZXdoZWVsVGltZSkgPiAyMDApIHtcblx0XHRcdHJlc2V0U2Nyb2xsKCk7XG5cdFx0fVxuXG5cdFx0bGFzdE1vdXNld2hlZWxUaW1lID0gY3VyclRpbWU7XG5cblx0XHR2YXIgbGFzdEF2ZyA9IHNjcm9sbHNBdmcoNSk7XG5cdFx0dmFyIG1pZEF2ZyA9IHNjcm9sbHNBdmcoNDApO1xuXG5cdFx0aWYgKGxhc3RBdmcgPiBtaWRBdmcpIHtcblx0XHRcdGlmIChtb3VzZXdoZWVsQ2FuU2Nyb2xsICYmIGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdG1vdXNld2hlZWxDYW5TY3JvbGwgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICh2YWx1ZSA8IDApIHtcblx0XHRcdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1vdXNld2hlZWxDYW5TY3JvbGwgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGtleWJvYXJkTmF2KGV2ZW50KSB7XG5cdFx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdHJlZ3Jlc3NTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHR9XG5cblx0ZnVuY3Rpb24gcmVzZXRUcmFuc2l0aW9uaW5nKCkge1xuXHRcdGlzVHJhbnNpdGlvbmluZyA9IHRydWU7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0aXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cdFx0fSwgMTAwMCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhZHZhbmNlU2xpZGUoKSB7XG5cblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0bmV4dFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tbmV4dCcpO1xuXG5cdFx0aWYgKG5leHRTbGlkZSkge1xuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXHRcblx0ZnVuY3Rpb24gcmVncmVzc1NsaWRlKCkge1xuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRwcmV2aW91c1NsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0cHJldmlvdXNTbGlkZSA9IHByZXZpb3VzU2xpZGVzW3ByZXZpb3VzU2xpZGVzLmxlbmd0aCAtIDFdO1xuXG5cdFx0aWYgKHByZXZpb3VzU2xpZGUpIHtcblx0XHRcdC8vIFNldHMgbmV4dCBhY3R1YWwgc2xpZGUgKG5vdCBjaHJvbm9sb2dpY2FsbHkpIHRvIHByZXZpb3VzIHNsaWRlXG5cdFx0XHRuZXh0U2xpZGUgPSBwcmV2aW91c1NsaWRlO1xuXG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgaG9tZVNjcm9sbDtcbiIsIi8qKlxuICogQWxsb3dzIGZvciBsZWZ0L3JpZ2h0IG5hdmlnYXRpb24gaW4gam91cm5hbFxuICovXG5sZXQgam91cm5hbE5hdiA9IChmdW5jdGlvbigpIHtcblx0bGV0IHByZXZpb3VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlX19uYXZpZ2F0aW9uLS1wcmV2aW91cyBhJyk7XG5cdGxldCBuZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlX19uYXZpZ2F0aW9uLS1uZXh0IGEnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmROYXYpO1xuXHR9XG5cblx0ZnVuY3Rpb24ga2V5Ym9hcmROYXYoZXZlbnQpIHtcblx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdGNhc2UgMzc6XG5cdFx0XHRcdGlmIChwcmV2aW91cykge1xuXHRcdFx0XHRcdGdvVG9MaW5rKCBwcmV2aW91cy5ocmVmICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDM5OlxuXHRcdFx0XHRpZiAobmV4dCkge1xuXHRcdFx0XHRcdGdvVG9MaW5rKCBuZXh0LmhyZWYgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBnb1RvTGluayhsaW5rKSB7XG5cdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaW5rO1xuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlTmF2KGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsTmF2O1xuIiwiLyoqXG4gKiBIYW5kbGVzIG1vYmlsZSBtZW51XG4gKi9cbmxldCBtZW51ID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcicpO1xuXHRsZXQgdG9nZ2xlID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXJfX21lbnUtdG9nZ2xlJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dG9nZ2xlTWVudSgpO1xuXHRcdFx0Y2hhbmdlVGV4dCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcblx0XHRoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbC1zaXRlaGVhZGVyLS1uYXYtaXMtb3BlbicpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2hhbmdlVGV4dCgpIHtcblx0XHRpZiAodG9nZ2xlLmlubmVySFRNTCA9PSAnTWVudScpIHtcdFxuXHRcdFx0dG9nZ2xlLmlubmVySFRNTCA9ICdDbG9zZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvZ2dsZS5pbm5lckhUTUwgPSAnTWVudSc7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1lbnU7XG4iLCIvKipcbiAqIFByaW1lIExhYnNcbiAqIEpTIGZvciB0aGUgUHJpbWUgTGFicyBjYXNlIHN0dWR5LlxuICovXG5sZXQgcHJpbWVsYWJzID0gKGZ1bmN0aW9uICgpIHtcblx0Ly8gSW5pdCBjb250cm9sbGVyXG5cdGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRsZXQgcHJvYmxlbVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fcHJvYmxlbXMnKTtcblx0bGV0IHN0YW5kYXJkU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19hcy1zdGFuZGFyZCcpO1xuXHRsZXQgY2Fyb3VzZWxTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX2Nhcm91c2VsJyk7XG5cdGxldCBiYWNrc3RvcnlTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX2JhY2tzdG9yeScpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJQWN0aW9ucygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJQWN0aW9ucygpIHtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBiYWNrc3RvcnlTZWN0aW9uLCBiYWNrc3RvcnlIYW5kbGVyKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBwcm9ibGVtU2VjdGlvbiwgcHJvYmxlbUhhbmRsZXIpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIHN0YW5kYXJkU2VjdGlvbiwgc3RhbmRhcmRIYW5kbGVyKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBjYXJvdXNlbFNlY3Rpb24sIGNhcm91c2VsSGFuZGxlcik7XG5cdH1cblxuXHRmdW5jdGlvbiBiYWNrc3RvcnlIYW5kbGVyKCkge1xuXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCh7ZGVsYXk6IDF9KTtcblx0XHRsZXQgbG9nbyA9IGJhY2tzdG9yeVNlY3Rpb24ucXVlcnlTZWxlY3RvcignI3ByaW1lLWxhYnNfX2JhY2tzdG9yeV9fbG9nbycpO1xuXHRcdGxldCBidWJibGVCb3R0b20gPSBsb2dvLnF1ZXJ5U2VsZWN0b3IoJyNidWJibGVCb3R0b20nKTtcblx0XHRsZXQgYnViYmxlTWlkZGxlID0gbG9nby5xdWVyeVNlbGVjdG9yKCcjYnViYmxlTWlkZGxlJyk7XG5cdFx0bGV0IGJ1YmJsZVRvcCA9IGxvZ28ucXVlcnlTZWxlY3RvcignI2J1YmJsZVRvcCcpO1xuXG5cdFx0dGwudG8obG9nbywgMSwge29wYWNpdHk6IDEsIGVhc2U6IFBvd2VyMS5lYXNlSW59KVxuXHRcdCAgLnRvKGJ1YmJsZUJvdHRvbSwgMSwge29wYWNpdHk6IDF9LCAnYm90dG9tJylcblx0XHQgIC50byhidWJibGVNaWRkbGUsIDEsIHtvcGFjaXR5OiAxfSwgJ21pZGRsZScpXG5cdFx0ICAudG8oYnViYmxlQm90dG9tLCAxLCB7b3BhY2l0eTogMH0sICdtaWRkbGUnKVxuXHRcdCAgLnRvKGJ1YmJsZVRvcCwgMSwge29wYWNpdHk6IDF9LCAndG9wJylcblx0XHQgIC50byhidWJibGVNaWRkbGUsIDEsIHtvcGFjaXR5OiAwfSwgJ3RvcCcpXG5cdFx0ICAudG8oYnViYmxlTWlkZGxlLCAxLCB7b3BhY2l0eTogMX0sICdmaW5hbCcpXG5cdFx0ICAudG8oYnViYmxlQm90dG9tLCAxLCB7b3BhY2l0eTogMX0sICdmaW5hbCcpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2Fyb3VzZWxIYW5kbGVyKCkge1xuXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCh7ZGVsYXk6IDIsIHJlcGVhdDogMX0pO1xuXHRcdGxldCB0aXRsZSA9IGNhcm91c2VsU2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuaGVhZGluZy0xJyk7XG5cblx0XHR0bC50byh0aXRsZSwgMywge3g6ICcxNTAlJywgb3BhY2l0eTogJzAnLCBlYXNlOiBQb3dlcjEuZWFzZUluIH0pO1xuXHRcdHRsLnNldCh0aXRsZSwge3g6ICctMTUwJSd9KTtcblx0XHR0bC50byh0aXRsZSwgMywge3g6ICcwJScsIG9wYWNpdHk6ICcxJywgZWFzZTogUG93ZXIxLmVhc2VPdXQgfSk7XG5cdH1cblxuXHQvLyBBZGRzIGEgc2NlbmUgd2l0aCBwcmVkZWZpbmVkIG9wdGlvbnMgdG8gdGhlIGNvbnRyb2xsZXJcblx0ZnVuY3Rpb24gYWRkU2NlbmUoY29udHJvbGxlciwgZWxlbWVudCwgaGFuZGxlcikge1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdFx0dHJpZ2dlckVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRvZmZzZXQ6IDUwLFxuXHRcdFx0cmV2ZXJzZTogZmFsc2Vcblx0XHR9O1xuXG5cdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKG9wdGlvbnMpLm9uKCdzdGFydCcsIGhhbmRsZXIpLmFkZFRvKGNvbnRyb2xsZXIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJvYmxlbUhhbmRsZXIoKSB7XG5cdFx0cHJvYmxlbVNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncHJpbWUtbGFic19fcHJvYmxlbXMtLWlzLWFjdGl2ZScpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc3RhbmRhcmRIYW5kbGVyKCkge1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX192aWRlbycpLnBsYXkoKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpbWVsYWJzO1xuIl19
