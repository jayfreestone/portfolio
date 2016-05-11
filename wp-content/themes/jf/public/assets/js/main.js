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
		if (!objectPosition || !objectFit) {
			// Hide the actual image and jump to the fallback
			var images = Array.from(document.querySelectorAll('.work-preview__image-preload'));

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var image = _step.value;

					image.style.display = 'none';
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

			loadImages();
		}
	}

	// Runs loadImage on the work-preview carousel images.
	function loadImages() {
		var previewImages = Array.from(document.querySelectorAll('.work-preview'));

		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = previewImages[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var previewImage = _step2.value;

				loadImage(previewImage);
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

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = elms[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var elm = _step3.value;

				sum += elm;
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
		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = navItems[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var navItem = _step4.value;

				navItem.addEventListener('click', handleNav);
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

				var _iteratorNormalCompletion5 = true;
				var _didIteratorError5 = false;
				var _iteratorError5 = undefined;

				try {
					for (var _iterator5 = _previousSlides[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
						var _previousSlide = _step5.value;

						_previousSlide.classList.add('work-preview--next');
						_previousSlide.classList.remove('work-preview--previous');
					}
				} catch (err) {
					_didIteratorError5 = true;
					_iteratorError5 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion5 && _iterator5.return) {
							_iterator5.return();
						}
					} finally {
						if (_didIteratorError5) {
							throw _iteratorError5;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYXJ0aWFscy9kYXNoYm9hcmQuanMiLCJzcmMvanMvcGFydGlhbHMvZmFkZUJhY2tncm91bmRJbWFnZS5qcyIsInNyYy9qcy9wYXJ0aWFscy9mYWRlSXNIaWRkZW4uanMiLCJzcmMvanMvcGFydGlhbHMvaGVhZGVyLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFDekQsZ0JBQUssSUFBTDs7QUFFQSx3QkFBYSxJQUFiOztBQUVBLEtBQUksU0FBUyxhQUFULENBQXVCLHNCQUF2QixDQUFKLEVBQW9EO0FBQ25ELG1CQUFPLElBQVA7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixlQUF2QixDQUFKLEVBQTZDO0FBQzVDLHVCQUFXLElBQVg7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFKLEVBQTJDO0FBQzFDLHNCQUFVLElBQVY7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFKLEVBQTBDO0FBQ3pDLHNCQUFVLElBQVY7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixpQkFBdkIsQ0FBSixFQUErQztBQUM5Qyx1QkFBVyxJQUFYO0FBQ0E7QUFDRCxDQXhCRDs7Ozs7Ozs7O0FDSkE7Ozs7OztBQUVBLElBQUksWUFBYSxZQUFZO0FBQzVCLEtBQUksZ0JBQWdCLFNB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UyxlQUFULEdBQTJCO0FBQzFCLFdBQVMsYUFBVCxDQUF1QixvQkFBdkIsRUFBNkMsSUFBN0M7QUFDQTs7QUFFRCxRQUFPO0FBQ04sUUFBTTtBQURBLEVBQVA7QUFHQSxDQXBFZ0IsRUFBakI7O2tCQXNFZSxTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBwcmltZWxhYnMgZnJvbSAnLi9wYXJ0aWFscy9wcmltZWxhYnMuanMnO1xuaW1wb3J0IG1lbnUgZnJvbSAnLi9wYXJ0aWFscy9tZW51LmpzJztcbmltcG9ydCBob21lU2Nyb2xsIGZyb20gJy4vcGFydGlhbHMvaG9tZVNjcm9sbC5qcyc7XG5pbXBvcnQgam91cm5hbE5hdiBmcm9tICcuL3BhcnRpYWxzL2pvdXJuYWxOYXYuanMnO1xuaW1wb3J0IGRhc2hib2FyZCBmcm9tICcuL3BhcnRpYWxzL2Rhc2hib2FyZC5qcyc7XG5pbXBvcnQgaGVhZGVyIGZyb20gJy4vcGFydGlhbHMvaGVhZGVyLmpzJztcbmltcG9ydCBmYWRlSXNIaWRkZW4gZnJvbSAnLi9wYXJ0aWFscy9mYWRlSXNIaWRkZW4uanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHRtZW51LmluaXQoKTtcblxuXHRmYWRlSXNIaWRkZW4uaW5pdCgpO1xuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyLS13aGl0ZScpKSB7XG5cdFx0aGVhZGVyLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3JykpIHtcblx0XHRob21lU2Nyb2xsLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFicycpKSB7XG5cdFx0cHJpbWVsYWJzLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkJykpIHtcblx0XHRkYXNoYm9hcmQuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZScpKSB7XG5cdFx0am91cm5hbE5hdi5pbml0KCk7XG5cdH1cbn0pO1xuIiwiLyoqXG4gKiBEYXNoYm9hcmRcbiAqIEpTIGZvciB0aGUgRGFzaGJvYXJkIGNhc2Ugc3R1ZHkuXG4gKi9cbmltcG9ydCBmYWRlQmFja2dyb3VuZEltYWdlIGZyb20gJy4vZmFkZUJhY2tncm91bmRJbWFnZS5qcyc7XG5cbmxldCBkYXNoYm9hcmQgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgZ3JvdW5kU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2dyb3VuZHdvcmsnKTtcblx0bGV0IGRlcGxveW1lbnRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZGVwbG95bWVudCcpO1xuXHRsZXQgZGVtb1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19kZW1vJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlBY3Rpb25zKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlBY3Rpb25zKCkge1xuXHRcdC8vIEluaXQgY29udHJvbGxlclxuXHRcdGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRcdC8vIEFkZCBzY2VuZXNcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBncm91bmRTZWN0aW9uLCByZWFjdEFuaW1hdGlvbik7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgZGVwbG95bWVudFNlY3Rpb24sIHRlcm1pbmFsQW5pbWF0aW9uKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBkZW1vU2VjdGlvbiwgZGVtb0hhbmRsZXIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gdGVybWluYWxBbmltYXRpb24oKSB7XG5cdFx0bGV0IGNvZGVXaW5kb3cgPSBkZXBsb3ltZW50U2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX190ZXJtaW5hbCBjb2RlJyk7XG5cdFx0d3JpdGVTdHJpbmcoJ2NhcCBzdGFnaW5nIGRlcGxveScsIGNvZGVXaW5kb3cpO1xuXHR9XG5cblx0ZnVuY3Rpb24gd3JpdGVTdHJpbmcoc3RyaW5nVG9UeXBlLCBwbGFjZVRvVHlwZSkge1xuXHRcdGxldCBpID0gMDtcblxuXHRcdChmdW5jdGlvbiB3cml0ZUNoYXIoKSB7XG5cdFx0XHRpZiAoc3RyaW5nVG9UeXBlLmxlbmd0aCA+IGkpIHtcblx0XHRcdFx0cGxhY2VUb1R5cGUuaW5uZXJIVE1MID0gcGxhY2VUb1R5cGUuaW5uZXJIVE1MICsgc3RyaW5nVG9UeXBlW2ldO1xuXHRcdFx0XHRpKys7XG5cblx0XHRcdFx0bGV0IGRlbGF5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwMCkpICsgMTQwO1xuXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR3cml0ZUNoYXIoKTtcblx0XHRcdFx0fSwgZGVsYXkpO1xuXHRcdFx0fVxuXHRcdH0pKClcblx0fVxuXG5cdGZ1bmN0aW9uIGRlbW9IYW5kbGVyKCkge1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2RlbW8gdmlkZW8nKS5wbGF5KCk7XG5cdH1cblxuXHQvLyBBZGRzIGEgc2NlbmUgd2l0aCBwcmVkZWZpbmVkIG9wdGlvbnMgdG8gdGhlIGNvbnRyb2xsZXJcblx0ZnVuY3Rpb24gYWRkU2NlbmUoY29udHJvbGxlciwgZWxlbWVudCwgaGFuZGxlcikge1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdFx0dHJpZ2dlckVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRvZmZzZXQ6IDUwLFxuXHRcdFx0cmV2ZXJzZTogZmFsc2Vcblx0XHR9O1xuXG5cdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKG9wdGlvbnMpLm9uKCdzdGFydCcsIGhhbmRsZXIpLmFkZFRvKGNvbnRyb2xsZXIpO1xuXHR9XG5cblxuXHQvLyBSZWFjdCBMb2dvIEFuaW1hdGlvblxuXHRmdW5jdGlvbiByZWFjdEFuaW1hdGlvbigpIHtcblx0XHRsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcblxuXHRcdGxldCBsb2dvID0gZ3JvdW5kU2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdzdmcnKTtcblx0XHRsZXQgcGF0aHMgPSBBcnJheS5mcm9tKGxvZ28ucXVlcnlTZWxlY3RvckFsbCgncGF0aCcpKTtcblxuXHRcdGZvciAoY29uc3QgcGF0aCBvZiBwYXRocykge1xuXHRcdFx0c2V0RGFzaChwYXRoKTtcblx0XHR9XG5cblx0XHR0bC50byhwYXRocywgMywgeyAnc3Ryb2tlLWRhc2hvZmZzZXQnOiAwLCBvcGFjaXR5OiAnMScsIGVhc2U6IFBvd2VyMS5lYXNlSW4gfSlcblx0XHQudG8ocGF0aHMsIDEsIHsgJ2ZpbGwnOiAnIzAwZDhmZicsICdzdHJva2UnOiAnIzAwZDhmZicsIGVhc2U6IFBvd2VyMS5lYXNlSW4gfSk7XG5cdH1cblxuXHQvLyBTZXRzIERhc2ggYXJyYXkvb2Zmc2V0IG9uIGVsZW1lbnRcblx0ZnVuY3Rpb24gc2V0RGFzaChwYXRoKSB7XG5cdFx0bGV0IGxlbmd0aCA9IHBhdGguZ2V0VG90YWxMZW5ndGgoKTtcblx0XHRwYXRoLnN0eWxlWydzdHJva2UtZGFzaG9mZnNldCddID0gbGVuZ3RoO1xuXHRcdHBhdGguc3R5bGVbJ3N0cm9rZS1kYXNoYXJyYXknXSA9IGxlbmd0aDtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgZGFzaGJvYXJkO1xuIiwiLyoqXG4gKiBGYWRlcyBpbiBhIGJhY2tncm91bmQgaW1hZ2Ugb25jZSBsb2FkZWRcbiAqL1xubGV0IGZhZGVCYWNrZ3JvdW5kSW1hZ2UgPSAoZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBmYWRlKGltYWdlKSB7XG5cdFx0bGV0IGJhY2tncm91bmRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGltYWdlKVsnYmFja2dyb3VuZC1pbWFnZSddO1xuXHRcdGxldCBpbWFnZVRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuXHRcdGlmICggYmFja2dyb3VuZFN0eWxlICE9PSAnbm9uZScgKSB7XG5cdFx0XHRsZXQgYmFja2dyb3VuZEltYWdlID0gYmFja2dyb3VuZFN0eWxlLm1hdGNoKC9cXC9cXC8oW2EtejAtOTpcXC1cXC5cXC9dKykvKVswXTtcblx0XHRcdGltYWdlVGVtcC5zcmMgPSBiYWNrZ3JvdW5kSW1hZ2UucmVwbGFjZSgvXCIvZywgJycpO1xuXHRcdFx0aW1hZ2VUZW1wLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aW1hZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuLWJnJyk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aW1hZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuLWJnJyk7XG5cdFx0fVxuXG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGZhZGU6IGZhZGVcblx0fVxufSgpKTtcbmV4cG9ydCBkZWZhdWx0IGZhZGVCYWNrZ3JvdW5kSW1hZ2U7XG4iLCIvKipcbiAqIEZhZGVzIGluIGJhY2tncm91bmQgaW1hZ2VzIHdpdGggJ2lzLWhpZGRlbicgY2xhc3NcbiAqL1xuaW1wb3J0IGZhZGVCYWNrZ3JvdW5kSW1hZ2UgZnJvbSAnLi9mYWRlQmFja2dyb3VuZEltYWdlLmpzJztcblxubGV0IGZhZGVJc0hpZGRlbiA9IChmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0bGV0IGlzSGlkZGVuQWxsID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaXMtaGlkZGVuLWJnJykpO1xuXG5cdFx0Zm9yIChjb25zdCBpc0hpZGRlbiBvZiBpc0hpZGRlbkFsbCkge1xuXHRcdFx0ZmFkZUJhY2tncm91bmRJbWFnZS5mYWRlKGlzSGlkZGVuKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZmFkZUlzSGlkZGVuO1xuIiwibGV0IGhlYWRlciA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyJyk7XG5cdGxldCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUtbWFpbicpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0aWYgKG1haW4pIHtcblxuXHRcdFx0Ly8gaW5pdCBjb250cm9sbGVyXG5cdFx0XHR2YXIgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cblx0XHRcdC8vIGNyZWF0ZSBhIHNjZW5lXG5cdFx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xuXHRcdFx0XHR0cmlnZ2VyRWxlbWVudDogbWFpbixcblx0XHRcdFx0dHJpZ2dlckhvb2s6ICdvbkxlYXZlJyxcblx0XHRcdH0pLm9uKCdzdGFydCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dG9nZ2xlV2hpdGVvdXQoKTtcblxuXHRcdFx0fSlcblx0XHRcdC5hZGRUbyhjb250cm9sbGVyKTsgLy8gYXNzaWduIHRoZSBzY2VuZSB0byB0aGUgY29udHJvbGxlclxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHRvZ2dsZVdoaXRlb3V0KCkge1xuXHRcdGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdsLXNpdGVoZWFkZXItLXdoaXRlJyk7XG5cdH1cblxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgaGVhZGVyO1xuIiwiLyoqXG4gKiBIb21lIFNjcm9sbFxuICogSGFuZGxlcyB0aGUgaG9tZXBhZ2UgY2Fyb3VzZWxcbiAqL1xubGV0IGhvbWVTY3JvbGwgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgbmF2SXRlbXM7XG5cdGxldCBkZWx0YSA9IDA7XG5cdGxldCBjdXJyZW50U2xpZGU7XG5cdGxldCBuZXh0U2xpZGU7XG5cdGxldCBwcmV2aW91c1NsaWRlO1xuXHRsZXQgcHJldmlvdXNTbGlkZXM7XG5cdGxldCBpc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcblx0bGV0IGxhc3RTY3JvbGxlZDtcblx0bGV0IG1vdXNld2hlZWxDYW5TY3JvbGwgPSB0cnVlO1xuXHRsZXQgbGFzdE1vdXNld2hlZWxUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblx0bGV0IGxhc3RTY3JvbGxUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblx0bGV0IHNjcm9sbHMgPSBbXTtcblx0bGV0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctY29udGFpbmVyX19uYXYnKTtcblx0bGV0IHdvcmtTbGlkZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3JykpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0aWYgKG5hdikge1xuXHRcdFx0bmF2SXRlbXMgPSBBcnJheS5mcm9tKG5hdi5xdWVyeVNlbGVjdG9yQWxsKCdhJykpO1xuXHRcdH1cblxuXHRcdGFuaW1hdGVJbml0aWFsKCk7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdFx0b2JqZWN0Rml0VGVzdCgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gb2JqZWN0Rml0VGVzdCgpIHtcblx0XHRsZXQgb2JqZWN0Rml0ID0gJ29iamVjdC1maXQnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKS5zdHlsZTtcblx0XHRsZXQgb2JqZWN0UG9zaXRpb24gPSAnb2JqZWN0LXBvc2l0aW9uJyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJykuc3R5bGU7XG5cblx0XHQvLyBJZiB0aGUgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgZWl0aGVyICh3ZSBuZWVkIGJvdGgpXG5cdFx0aWYgKCFvYmplY3RQb3NpdGlvbiB8fCAhb2JqZWN0Rml0KSB7XG5cdFx0XHQvLyBIaWRlIHRoZSBhY3R1YWwgaW1hZ2UgYW5kIGp1bXAgdG8gdGhlIGZhbGxiYWNrIFxuXHRcdFx0bGV0IGltYWdlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlld19faW1hZ2UtcHJlbG9hZCcpKTtcblxuXHRcdFx0Zm9yIChjb25zdCBpbWFnZSBvZiBpbWFnZXMpIHtcblx0XHRcdFx0aW1hZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdH1cblxuXHRcdFx0bG9hZEltYWdlcygpO1xuXHRcdH1cblx0fVxuXG5cdC8vIFJ1bnMgbG9hZEltYWdlIG9uIHRoZSB3b3JrLXByZXZpZXcgY2Fyb3VzZWwgaW1hZ2VzLlxuXHRmdW5jdGlvbiBsb2FkSW1hZ2VzKCkge1xuXHRcdGxldCBwcmV2aWV3SW1hZ2VzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3JykpO1xuXG5cdFx0Zm9yICggY29uc3QgcHJldmlld0ltYWdlIG9mIHByZXZpZXdJbWFnZXMgKSB7XG5cdFx0XHRsb2FkSW1hZ2UoIHByZXZpZXdJbWFnZSApO1xuXHRcdH1cblx0fVxuXG5cdC8vIERpc3BsYXlzIHRoZSBpbWFnZXMgYXMgYmFja2dyb3VuZCBpbWFnZXMuXG5cdGZ1bmN0aW9uIGxvYWRJbWFnZShpbWFnZSkge1xuXHRcdGxldCBpbWFnZUhvbGRlciA9IGltYWdlLnF1ZXJ5U2VsZWN0b3IoICcud29yay1wcmV2aWV3X19pbWFnZScgKTtcblxuXHRcdC8vIEltYWdlIGlzIGRpc3BsYXkgbm9uZVxuXHRcdGxldCBpbWFnZVByZWxvYWQgPSBpbWFnZS5xdWVyeVNlbGVjdG9yKCAnLndvcmstcHJldmlld19faW1hZ2UtcHJlbG9hZCcgKTtcblx0XHRsZXQgYmFja2dyb3VuZFN0eWxlID0gaW1hZ2VQcmVsb2FkLmN1cnJlbnRTcmM7XG5cblx0XHQvLyBTZWVtcyB0byBiZSBtb3JlIHJlbGlhYmxlIHRoYW4gYXR0YWNoaW5nIGRpcmVjdGx5XG5cdFx0bGV0IHRtcEltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRcdHRtcEltZy5zcmMgPSBiYWNrZ3JvdW5kU3R5bGU7XG5cblx0XHR0bXBJbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChmdW5jdGlvbigpe1xuXHRcdFx0Ly8gSW1hZ2UgcGxhY2Vob2xkZXIgaXMgZ2l2ZW4gYmFja2dyb3VuZCBpbWFnZVxuXHRcdFx0aWYgKCBiYWNrZ3JvdW5kU3R5bGUgKSB7XG5cdFx0XHRcdGltYWdlSG9sZGVyLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoXCInICsgYmFja2dyb3VuZFN0eWxlICsgJ1wiKSc7XG5cdFx0XHRcdGltYWdlSG9sZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuXHRcdFx0fVxuXHRcdH0pKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2V0U2Nyb2xsKCkge1xuXHRcdHNjcm9sbHMgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGxzQXZnKG9mZnNldCkge1xuXHRcdGxldCBzdW0gPSAwO1xuXG5cdFx0bGV0IGVsbXMgPSBzY3JvbGxzLnNsaWNlKE1hdGgubWF4KHNjcm9sbHMubGVuZ3RoIC0gb2Zmc2V0LCAxKSk7XG5cblx0XHRmb3IgKCBjb25zdCBlbG0gb2YgZWxtcyApIHtcblx0XHRcdHN1bSArPSBlbG07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGguY2VpbChzdW0gLyBvZmZzZXQpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYW5pbWF0ZUluaXRpYWwoKSB7XG5cdFx0bGV0IGZpcnN0V29yayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLTEnKTtcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGZpcnN0V29yay5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5hdkl0ZW1zWzBdLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2X19pdGVtLS1pcy1hY3RpdmUnKTtcblx0XHR9LCAyMDApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmROYXYpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNjcm9sbE5hdik7XG5cblx0XHQvLyBTdG9wcyB0b3VjaG1vdmUgd29ya2luZyBvdXRyaWdodFxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9KTtcblxuXHRcdC8vIFNldHMgdXAgSGFtbWVyIHRvIGhhbmRsZSB0b3VjaCBldmVudHNcblx0XHRsZXQgd29ya0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctY29udGFpbmVyJyk7XG5cdFx0bGV0IHRvdWNoID0gbmV3IEhhbW1lcih3b3JrQ29udGFpbmVyKTtcblxuXHRcdC8vIEVuYWJsZXMgdmVydGljYWwgc3dpcGUgZGV0ZWN0aW9uXG5cdFx0dG91Y2guZ2V0KCdzd2lwZScpLnNldCh7IGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9BTEwgfSk7XG5cblx0XHQvLyBHZXN0dXJlcyB0aGF0IGVxdWFsIGZvcndhcmRcblx0XHR0b3VjaC5vbignc3dpcGV1cCBzd2lwZWxlZnQnLCBmdW5jdGlvbigpe1xuXHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEdlc3R1cmVzIHRoYXQgZXF1YWwgYmFja3dhcmRzXG5cdFx0dG91Y2gub24oJ3N3aXBlZG93biBzd2lwZXJpZ2h0JywgZnVuY3Rpb24oKXtcblx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBIb29rcyB1cCBuYXZpZ2F0aW9uXG5cdFx0Zm9yIChjb25zdCBuYXZJdGVtIG9mIG5hdkl0ZW1zKSB7XG5cdFx0XHRuYXZJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlTmF2KTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVOYXYoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGxldCBzbGlkZU51bWJlciA9IGV2ZW50LnRhcmdldC5pbm5lckhUTUwuc3Vic3RyaW5nKDEpO1xuXG5cdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0Z29Ub1NsaWRlKHNsaWRlTnVtYmVyKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBoaWdobGlnaHRBY3RpdmVOYXYoKSB7XG5cdFx0Ly8gUmVtb3ZlIHRoZSBhY3RpdmUgY2xhc3Ncblx0XHRsZXQgYWN0aXZlTmF2Q2xhc3MgPSAnd29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2X19pdGVtLS1pcy1hY3RpdmUnO1xuXHRcdGxldCBhY3RpdmVOYXZJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBhY3RpdmVOYXZDbGFzcyk7XG5cdFx0YWN0aXZlTmF2SXRlbS5jbGFzc0xpc3QucmVtb3ZlKGFjdGl2ZU5hdkNsYXNzKTtcblxuXHRcdGxldCBuZXh0TnVtYmVyID0gbmV4dFNsaWRlLmlkLnN1YnN0cmluZyhuZXh0U2xpZGUuaWQubGVuZ3RoIC0xKTtcblx0XHRjb25zb2xlLmxvZyhuZXh0TnVtYmVyKTtcblxuXHRcdG5hdkl0ZW1zW25leHROdW1iZXIgLSAxXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoYWN0aXZlTmF2Q2xhc3MpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ29Ub1NsaWRlKHNsaWRlTnVtYmVyKSB7XG5cdFx0bmV4dFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tJyArIHNsaWRlTnVtYmVyICk7XG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0aWYgKG5leHRTbGlkZSkge1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblxuXHRcdFx0bGV0IGN1cnJlbnROdW1iZXIgPSBjdXJyZW50U2xpZGUuaWQuc3Vic3RyaW5nKGN1cnJlbnRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXHRcdFx0bGV0IG5leHROdW1iZXIgPSBuZXh0U2xpZGUuaWQuc3Vic3RyaW5nKG5leHRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXG5cdFx0XHRpZiAoY3VycmVudE51bWJlciA+IG5leHROdW1iZXIpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2dvaW5nIGJhY2t3YXJkcycpO1xuXHRcdFx0XHQvLyBJZiB3ZSdyZSBnb2luZyBiYWNrd2FyZHNcblx0XHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXG5cdFx0XHRcdC8vIE5lZWQgdG8gYWRkIG5leHQgdG8gQUxMIGdvaW5nIGZvcndhcmRcblx0XHRcdFx0bGV0IHByZXZpb3VzU2xpZGVzID0gd29ya1NsaWRlcy5zbGljZShuZXh0TnVtYmVyLCBjdXJyZW50TnVtYmVyIC0gMSk7XG5cblx0XHRcdFx0Zm9yICggY29uc3QgcHJldmlvdXNTbGlkZSBvZiBwcmV2aW91c1NsaWRlcyApIHtcblx0XHRcdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdFx0XHRcdHByZXZpb3VzU2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIElmIHdlJ3JlIGdvaW5nIGZvcndhcmRzXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdnb2luZyBmb3J3YXJkcycpO1xuXHRcdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0fVxuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gc2Nyb2xsTmF2KGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRsZXQgc2Nyb2xsVGhyZXNob2xkID0gNDA7XG5cblx0XHRsZXQgdmFsdWUgPSAtZS5kZWx0YVk7XG5cblx0XHRpZiAoc2Nyb2xscy5sZW5ndGggPiAxNTApIHtcblx0XHRcdHNjcm9sbHMuc2hpZnQoKTtcblx0XHR9XG5cblx0XHRzY3JvbGxzLnB1c2goTWF0aC5hYnModmFsdWUpKTtcblxuXHRcdHZhciBjdXJyVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cblx0XHRpZiAoKGN1cnJUaW1lIC0gbGFzdE1vdXNld2hlZWxUaW1lKSA+IDIwMCkge1xuXHRcdFx0cmVzZXRTY3JvbGwoKTtcblx0XHR9XG5cblx0XHRsYXN0TW91c2V3aGVlbFRpbWUgPSBjdXJyVGltZTtcblxuXHRcdHZhciBsYXN0QXZnID0gc2Nyb2xsc0F2Zyg1KTtcblx0XHR2YXIgbWlkQXZnID0gc2Nyb2xsc0F2Zyg0MCk7XG5cblx0XHRpZiAobGFzdEF2ZyA+IG1pZEF2Zykge1xuXHRcdFx0aWYgKG1vdXNld2hlZWxDYW5TY3JvbGwgJiYgaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0bW91c2V3aGVlbENhblNjcm9sbCA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKHZhbHVlIDwgMCkge1xuXHRcdFx0XHRcdFx0YWR2YW5jZVNsaWRlKCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlZ3Jlc3NTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bW91c2V3aGVlbENhblNjcm9sbCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24ga2V5Ym9hcmROYXYoZXZlbnQpIHtcblx0XHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0XHRjYXNlIDM4OlxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDQwOlxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0YWR2YW5jZVNsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdH1cblxuXHRmdW5jdGlvbiByZXNldFRyYW5zaXRpb25pbmcoKSB7XG5cdFx0aXNUcmFuc2l0aW9uaW5nID0gdHJ1ZTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRpc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcblx0XHR9LCAxMDAwKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkdmFuY2VTbGlkZSgpIHtcblxuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRuZXh0U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cblx0XHRpZiAobmV4dFNsaWRlKSB7XG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cdFxuXHRmdW5jdGlvbiByZWdyZXNzU2xpZGUoKSB7XG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdHByZXZpb3VzU2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRwcmV2aW91c1NsaWRlID0gcHJldmlvdXNTbGlkZXNbcHJldmlvdXNTbGlkZXMubGVuZ3RoIC0gMV07XG5cblx0XHRpZiAocHJldmlvdXNTbGlkZSkge1xuXHRcdFx0Ly8gU2V0cyBuZXh0IGFjdHVhbCBzbGlkZSAobm90IGNocm9ub2xvZ2ljYWxseSkgdG8gcHJldmlvdXMgc2xpZGVcblx0XHRcdG5leHRTbGlkZSA9IHByZXZpb3VzU2xpZGU7XG5cblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdHByZXZpb3VzU2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRcdHByZXZpb3VzU2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBob21lU2Nyb2xsO1xuIiwiLyoqXG4gKiBBbGxvd3MgZm9yIGxlZnQvcmlnaHQgbmF2aWdhdGlvbiBpbiBqb3VybmFsXG4gKi9cbmxldCBqb3VybmFsTmF2ID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgcHJldmlvdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam91cm5hbC1zaW5nbGVfX25hdmlnYXRpb24tLXByZXZpb3VzIGEnKTtcblx0bGV0IG5leHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam91cm5hbC1zaW5nbGVfX25hdmlnYXRpb24tLW5leHQgYScpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZE5hdik7XG5cdH1cblxuXHRmdW5jdGlvbiBrZXlib2FyZE5hdihldmVudCkge1xuXHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0Y2FzZSAzNzpcblx0XHRcdFx0aWYgKHByZXZpb3VzKSB7XG5cdFx0XHRcdFx0Z29Ub0xpbmsoIHByZXZpb3VzLmhyZWYgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzk6XG5cdFx0XHRcdGlmIChuZXh0KSB7XG5cdFx0XHRcdFx0Z29Ub0xpbmsoIG5leHQuaHJlZiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGdvVG9MaW5rKGxpbmspIHtcblx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpbms7XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVOYXYoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxOYXY7XG4iLCIvKipcbiAqIEhhbmRsZXMgbW9iaWxlIG1lbnVcbiAqL1xubGV0IG1lbnUgPSAoZnVuY3Rpb24oKSB7XG5cdGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyJyk7XG5cdGxldCB0b2dnbGUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcl9fbWVudS10b2dnbGUnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0b2dnbGVNZW51KCk7XG5cdFx0XHRjaGFuZ2VUZXh0KCk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuXHRcdGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdsLXNpdGVoZWFkZXItLW5hdi1pcy1vcGVuJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBjaGFuZ2VUZXh0KCkge1xuXHRcdGlmICh0b2dnbGUuaW5uZXJIVE1MID09ICdNZW51Jykge1x0XG5cdFx0XHR0b2dnbGUuaW5uZXJIVE1MID0gJ0Nsb3NlJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dG9nZ2xlLmlubmVySFRNTCA9ICdNZW51Jztcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgbWVudTtcbiIsIi8qKlxuICogUHJpbWUgTGFic1xuICogSlMgZm9yIHRoZSBQcmltZSBMYWJzIGNhc2Ugc3R1ZHkuXG4gKi9cbmxldCBwcmltZWxhYnMgPSAoZnVuY3Rpb24gKCkge1xuXHQvLyBJbml0IGNvbnRyb2xsZXJcblx0bGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdGxldCBwcm9ibGVtU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19wcm9ibGVtcycpO1xuXHRsZXQgc3RhbmRhcmRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX2FzLXN0YW5kYXJkJyk7XG5cdGxldCBjYXJvdXNlbFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fY2Fyb3VzZWwnKTtcblx0bGV0IGJhY2tzdG9yeVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fYmFja3N0b3J5Jyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlBY3Rpb25zKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlBY3Rpb25zKCkge1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIGJhY2tzdG9yeVNlY3Rpb24sIGJhY2tzdG9yeUhhbmRsZXIpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIHByb2JsZW1TZWN0aW9uLCBwcm9ibGVtSGFuZGxlcik7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgc3RhbmRhcmRTZWN0aW9uLCBzdGFuZGFyZEhhbmRsZXIpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIGNhcm91c2VsU2VjdGlvbiwgY2Fyb3VzZWxIYW5kbGVyKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJhY2tzdG9yeUhhbmRsZXIoKSB7XG5cdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KHtkZWxheTogMX0pO1xuXHRcdGxldCBsb2dvID0gYmFja3N0b3J5U2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcjcHJpbWUtbGFic19fYmFja3N0b3J5X19sb2dvJyk7XG5cdFx0bGV0IGJ1YmJsZUJvdHRvbSA9IGxvZ28ucXVlcnlTZWxlY3RvcignI2J1YmJsZUJvdHRvbScpO1xuXHRcdGxldCBidWJibGVNaWRkbGUgPSBsb2dvLnF1ZXJ5U2VsZWN0b3IoJyNidWJibGVNaWRkbGUnKTtcblx0XHRsZXQgYnViYmxlVG9wID0gbG9nby5xdWVyeVNlbGVjdG9yKCcjYnViYmxlVG9wJyk7XG5cblx0XHR0bC50byhsb2dvLCAxLCB7b3BhY2l0eTogMSwgZWFzZTogUG93ZXIxLmVhc2VJbn0pXG5cdFx0ICAudG8oYnViYmxlQm90dG9tLCAxLCB7b3BhY2l0eTogMX0sICdib3R0b20nKVxuXHRcdCAgLnRvKGJ1YmJsZU1pZGRsZSwgMSwge29wYWNpdHk6IDF9LCAnbWlkZGxlJylcblx0XHQgIC50byhidWJibGVCb3R0b20sIDEsIHtvcGFjaXR5OiAwfSwgJ21pZGRsZScpXG5cdFx0ICAudG8oYnViYmxlVG9wLCAxLCB7b3BhY2l0eTogMX0sICd0b3AnKVxuXHRcdCAgLnRvKGJ1YmJsZU1pZGRsZSwgMSwge29wYWNpdHk6IDB9LCAndG9wJylcblx0XHQgIC50byhidWJibGVNaWRkbGUsIDEsIHtvcGFjaXR5OiAxfSwgJ2ZpbmFsJylcblx0XHQgIC50byhidWJibGVCb3R0b20sIDEsIHtvcGFjaXR5OiAxfSwgJ2ZpbmFsJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBjYXJvdXNlbEhhbmRsZXIoKSB7XG5cdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KHtkZWxheTogMiwgcmVwZWF0OiAxfSk7XG5cdFx0bGV0IHRpdGxlID0gY2Fyb3VzZWxTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkaW5nLTEnKTtcblxuXHRcdHRsLnRvKHRpdGxlLCAzLCB7eDogJzE1MCUnLCBvcGFjaXR5OiAnMCcsIGVhc2U6IFBvd2VyMS5lYXNlSW4gfSk7XG5cdFx0dGwuc2V0KHRpdGxlLCB7eDogJy0xNTAlJ30pO1xuXHRcdHRsLnRvKHRpdGxlLCAzLCB7eDogJzAlJywgb3BhY2l0eTogJzEnLCBlYXNlOiBQb3dlcjEuZWFzZU91dCB9KTtcblx0fVxuXG5cdC8vIEFkZHMgYSBzY2VuZSB3aXRoIHByZWRlZmluZWQgb3B0aW9ucyB0byB0aGUgY29udHJvbGxlclxuXHRmdW5jdGlvbiBhZGRTY2VuZShjb250cm9sbGVyLCBlbGVtZW50LCBoYW5kbGVyKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHR0cmlnZ2VyRWxlbWVudDogZWxlbWVudCxcblx0XHRcdG9mZnNldDogNTAsXG5cdFx0XHRyZXZlcnNlOiBmYWxzZVxuXHRcdH07XG5cblx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUob3B0aW9ucykub24oJ3N0YXJ0JywgaGFuZGxlcikuYWRkVG8oY29udHJvbGxlcik7XG5cdH1cblxuXHRmdW5jdGlvbiBwcm9ibGVtSGFuZGxlcigpIHtcblx0XHRwcm9ibGVtU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdwcmltZS1sYWJzX19wcm9ibGVtcy0taXMtYWN0aXZlJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBzdGFuZGFyZEhhbmRsZXIoKSB7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3ZpZGVvJykucGxheSgpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBwcmltZWxhYnM7XG4iXX0=
