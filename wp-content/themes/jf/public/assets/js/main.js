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

		tl.to(paths, 3, { 'stroke-dashoffset': 0, opacity: '1', ease: Power1.easeIn }).to(paths, .5, { 'fill': '#fff', ease: Power1.easeIn });
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
		startCarousel();
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
		window.addEventListener('resize', function () {
			startCarousel();
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

	function startCarousel() {
		// Get the current rem value
		var remValue = document.querySelector('body').style.fontSize || 16;

		// At 30rem we switch to the carousel layout
		if (window.innerHeight > remValue * 30) {
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
		} else {
			window.removeEventListener('keydown', keyboardNav);
			window.removeEventListener('wheel', scrollNav);
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

		console.log('scroll fired');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYXJ0aWFscy9kYXNoYm9hcmQuanMiLCJzcmMvanMvcGFydGlhbHMvZmFkZUJhY2tncm91bmRJbWFnZS5qcyIsInNyYy9qcy9wYXJ0aWFscy9mYWRlSXNIaWRkZW4uanMiLCJzcmMvanMvcGFydGlhbHMvaGVhZGVyLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFDekQsZ0JBQUssSUFBTDs7QUFFQSx3QkFBYSxJQUFiOztBQUVBLEtBQUksU0FBUyxhQUFULENBQXVCLHNCQUF2QixDQUFKLEVBQW9EO0FBQ25ELG1CQUFPLElBQVA7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixlQUF2QixDQUFKLEVBQTZDO0FBQzVDLHVCQUFXLElBQVg7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFKLEVBQTJDO0FBQzFDLHNCQUFVLElBQVY7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFKLEVBQTBDO0FBQ3pDLHNCQUFVLElBQVY7QUFDQTs7QUFFRCxLQUFJLFNBQVMsYUFBVCxDQUF1QixpQkFBdkIsQ0FBSixFQUErQztBQUM5Qyx1QkFBVyxJQUFYO0FBQ0E7QUFDRCxDQXhCRDs7Ozs7Ozs7O0FDSkE7Ozs7OztBQUVBLElBQUksWUFBYSxZQUFZO0FBQzVCLEtBQUksZ0JBQWdCLFNB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RUFBaEI7QUFDQTs7O0FBR0QsVUFBUyxRQUFULENBQWtCLFVBQWxCLEVBQThCLE9BQTlCLEVBQXVDLE9BQXZDLEVBQWdEO0FBQy9DLE1BQUksVUFBVTtBQUNiLG1CQUFnQixPQURIO0FBRWIsV0FBUSxFQUZLO0FBR2IsWUFBUztBQUhJLEdBQWQ7O0FBTUEsTUFBSSxZQUFZLEtBQWhCLENBQXNCLE9BQXRCLEVBQStCLEVBQS9CLENBQWtDLE9BQWxDLEVBQTJDLE9BQTNDLEVBQW9ELEtBQXBELENBQTBELFVBQTFEO0FBQ0E7O0FBRUQsVUFBUyxjQUFULEdBQTBCO0FBQ3pCLGlCQUFlLFNBQWYsQ0FBeUIsR0FBekIsQ0FBNkIsaUNBQTdCO0FBQ0E7O0FBRUQsVUFBUyxlQUFULEdBQTJCO0FBQzFCLFdBQVMsYUFBVCxDQUF1QixvQkFBdkIsRUFBNkMsSUFBN0M7QUFDQTs7QUFFRCxRQUFPO0FBQ04sUUFBTTtBQURBLEVBQVA7QUFHQSxDQXBFZ0IsRUFBakI7O2tCQXNFZSxTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBwcmltZWxhYnMgZnJvbSAnLi9wYXJ0aWFscy9wcmltZWxhYnMuanMnO1xuaW1wb3J0IG1lbnUgZnJvbSAnLi9wYXJ0aWFscy9tZW51LmpzJztcbmltcG9ydCBob21lU2Nyb2xsIGZyb20gJy4vcGFydGlhbHMvaG9tZVNjcm9sbC5qcyc7XG5pbXBvcnQgam91cm5hbE5hdiBmcm9tICcuL3BhcnRpYWxzL2pvdXJuYWxOYXYuanMnO1xuaW1wb3J0IGRhc2hib2FyZCBmcm9tICcuL3BhcnRpYWxzL2Rhc2hib2FyZC5qcyc7XG5pbXBvcnQgaGVhZGVyIGZyb20gJy4vcGFydGlhbHMvaGVhZGVyLmpzJztcbmltcG9ydCBmYWRlSXNIaWRkZW4gZnJvbSAnLi9wYXJ0aWFscy9mYWRlSXNIaWRkZW4uanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHRtZW51LmluaXQoKTtcblxuXHRmYWRlSXNIaWRkZW4uaW5pdCgpO1xuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyLS13aGl0ZScpKSB7XG5cdFx0aGVhZGVyLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3JykpIHtcblx0XHRob21lU2Nyb2xsLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFicycpKSB7XG5cdFx0cHJpbWVsYWJzLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkJykpIHtcblx0XHRkYXNoYm9hcmQuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZScpKSB7XG5cdFx0am91cm5hbE5hdi5pbml0KCk7XG5cdH1cbn0pO1xuIiwiLyoqXG4gKiBEYXNoYm9hcmRcbiAqIEpTIGZvciB0aGUgRGFzaGJvYXJkIGNhc2Ugc3R1ZHkuXG4gKi9cbmltcG9ydCBmYWRlQmFja2dyb3VuZEltYWdlIGZyb20gJy4vZmFkZUJhY2tncm91bmRJbWFnZS5qcyc7XG5cbmxldCBkYXNoYm9hcmQgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgZ3JvdW5kU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2dyb3VuZHdvcmsnKTtcblx0bGV0IGRlcGxveW1lbnRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZGVwbG95bWVudCcpO1xuXHRsZXQgZGVtb1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19kZW1vJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlBY3Rpb25zKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlBY3Rpb25zKCkge1xuXHRcdC8vIEluaXQgY29udHJvbGxlclxuXHRcdGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRcdC8vIEFkZCBzY2VuZXNcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBncm91bmRTZWN0aW9uLCByZWFjdEFuaW1hdGlvbik7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgZGVwbG95bWVudFNlY3Rpb24sIHRlcm1pbmFsQW5pbWF0aW9uKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBkZW1vU2VjdGlvbiwgZGVtb0hhbmRsZXIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gdGVybWluYWxBbmltYXRpb24oKSB7XG5cdFx0bGV0IGNvZGVXaW5kb3cgPSBkZXBsb3ltZW50U2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX190ZXJtaW5hbCBjb2RlJyk7XG5cdFx0d3JpdGVTdHJpbmcoJ2NhcCBzdGFnaW5nIGRlcGxveScsIGNvZGVXaW5kb3cpO1xuXHR9XG5cblx0ZnVuY3Rpb24gd3JpdGVTdHJpbmcoc3RyaW5nVG9UeXBlLCBwbGFjZVRvVHlwZSkge1xuXHRcdGxldCBpID0gMDtcblxuXHRcdChmdW5jdGlvbiB3cml0ZUNoYXIoKSB7XG5cdFx0XHRpZiAoc3RyaW5nVG9UeXBlLmxlbmd0aCA+IGkpIHtcblx0XHRcdFx0cGxhY2VUb1R5cGUuaW5uZXJIVE1MID0gcGxhY2VUb1R5cGUuaW5uZXJIVE1MICsgc3RyaW5nVG9UeXBlW2ldO1xuXHRcdFx0XHRpKys7XG5cblx0XHRcdFx0bGV0IGRlbGF5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwMCkpICsgMTQwO1xuXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR3cml0ZUNoYXIoKTtcblx0XHRcdFx0fSwgZGVsYXkpO1xuXHRcdFx0fVxuXHRcdH0pKClcblx0fVxuXG5cdGZ1bmN0aW9uIGRlbW9IYW5kbGVyKCkge1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2RlbW8gdmlkZW8nKS5wbGF5KCk7XG5cdH1cblxuXHQvLyBBZGRzIGEgc2NlbmUgd2l0aCBwcmVkZWZpbmVkIG9wdGlvbnMgdG8gdGhlIGNvbnRyb2xsZXJcblx0ZnVuY3Rpb24gYWRkU2NlbmUoY29udHJvbGxlciwgZWxlbWVudCwgaGFuZGxlcikge1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdFx0dHJpZ2dlckVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRvZmZzZXQ6IDUwLFxuXHRcdFx0cmV2ZXJzZTogZmFsc2Vcblx0XHR9O1xuXG5cdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKG9wdGlvbnMpLm9uKCdzdGFydCcsIGhhbmRsZXIpLmFkZFRvKGNvbnRyb2xsZXIpO1xuXHR9XG5cblxuXHQvLyBSZWFjdCBMb2dvIEFuaW1hdGlvblxuXHRmdW5jdGlvbiByZWFjdEFuaW1hdGlvbigpIHtcblx0XHRsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcblxuXHRcdGxldCBsb2dvID0gZ3JvdW5kU2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdzdmcnKTtcblx0XHRsZXQgcGF0aHMgPSBBcnJheS5mcm9tKGxvZ28ucXVlcnlTZWxlY3RvckFsbCgncGF0aCcpKTtcblxuXHRcdGZvciAoY29uc3QgcGF0aCBvZiBwYXRocykge1xuXHRcdFx0c2V0RGFzaChwYXRoKTtcblx0XHR9XG5cblx0XHR0bC50byhwYXRocywgMywgeyAnc3Ryb2tlLWRhc2hvZmZzZXQnOiAwLCBvcGFjaXR5OiAnMScsIGVhc2U6IFBvd2VyMS5lYXNlSW4gfSlcblx0XHQudG8ocGF0aHMsIC41LCB7ICdmaWxsJzogJyNmZmYnLCBlYXNlOiBQb3dlcjEuZWFzZUluIH0pO1xuXHR9XG5cblx0Ly8gU2V0cyBEYXNoIGFycmF5L29mZnNldCBvbiBlbGVtZW50XG5cdGZ1bmN0aW9uIHNldERhc2gocGF0aCkge1xuXHRcdGxldCBsZW5ndGggPSBwYXRoLmdldFRvdGFsTGVuZ3RoKCk7XG5cdFx0cGF0aC5zdHlsZVsnc3Ryb2tlLWRhc2hvZmZzZXQnXSA9IGxlbmd0aDtcblx0XHRwYXRoLnN0eWxlWydzdHJva2UtZGFzaGFycmF5J10gPSBsZW5ndGg7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRhc2hib2FyZDtcbiIsIi8qKlxuICogRmFkZXMgaW4gYSBiYWNrZ3JvdW5kIGltYWdlIG9uY2UgbG9hZGVkXG4gKi9cbmxldCBmYWRlQmFja2dyb3VuZEltYWdlID0gKGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gZmFkZShpbWFnZSkge1xuXHRcdGxldCBiYWNrZ3JvdW5kU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShpbWFnZSlbJ2JhY2tncm91bmQtaW1hZ2UnXTtcblx0XHRsZXQgaW1hZ2VUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cblx0XHRpZiAoIGJhY2tncm91bmRTdHlsZSAhPT0gJ25vbmUnICkge1xuXHRcdFx0bGV0IGJhY2tncm91bmRJbWFnZSA9IGJhY2tncm91bmRTdHlsZS5tYXRjaCgvXFwvXFwvKFthLXowLTk6XFwtXFwuXFwvXSspLylbMF07XG5cdFx0XHRpbWFnZVRlbXAuc3JjID0gYmFja2dyb3VuZEltYWdlLnJlcGxhY2UoL1wiL2csICcnKTtcblx0XHRcdGltYWdlVGVtcC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbi1iZycpO1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbi1iZycpO1xuXHRcdH1cblxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRmYWRlOiBmYWRlXG5cdH1cbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBmYWRlQmFja2dyb3VuZEltYWdlO1xuIiwiLyoqXG4gKiBGYWRlcyBpbiBiYWNrZ3JvdW5kIGltYWdlcyB3aXRoICdpcy1oaWRkZW4nIGNsYXNzXG4gKi9cbmltcG9ydCBmYWRlQmFja2dyb3VuZEltYWdlIGZyb20gJy4vZmFkZUJhY2tncm91bmRJbWFnZS5qcyc7XG5cbmxldCBmYWRlSXNIaWRkZW4gPSAoZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGxldCBpc0hpZGRlbkFsbCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmlzLWhpZGRlbi1iZycpKTtcblxuXHRcdGZvciAoY29uc3QgaXNIaWRkZW4gb2YgaXNIaWRkZW5BbGwpIHtcblx0XHRcdGZhZGVCYWNrZ3JvdW5kSW1hZ2UuZmFkZShpc0hpZGRlbik7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZhZGVJc0hpZGRlbjtcbiIsImxldCBoZWFkZXIgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcicpO1xuXHRsZXQgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlLW1haW4nKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGlmIChtYWluKSB7XG5cblx0XHRcdC8vIGluaXQgY29udHJvbGxlclxuXHRcdFx0dmFyIGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdFx0XHQvLyBjcmVhdGUgYSBzY2VuZVxuXHRcdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcblx0XHRcdFx0dHJpZ2dlckVsZW1lbnQ6IG1haW4sXG5cdFx0XHRcdHRyaWdnZXJIb29rOiAnb25MZWF2ZScsXG5cdFx0XHR9KS5vbignc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRvZ2dsZVdoaXRlb3V0KCk7XG5cblx0XHRcdH0pXG5cdFx0XHQuYWRkVG8oY29udHJvbGxlcik7IC8vIGFzc2lnbiB0aGUgc2NlbmUgdG8gdGhlIGNvbnRyb2xsZXJcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiB0b2dnbGVXaGl0ZW91dCgpIHtcblx0XHRoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbC1zaXRlaGVhZGVyLS13aGl0ZScpO1xuXHR9XG5cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGhlYWRlcjtcbiIsIi8qKlxuICogSG9tZSBTY3JvbGxcbiAqIEhhbmRsZXMgdGhlIGhvbWVwYWdlIGNhcm91c2VsXG4gKi9cbmxldCBob21lU2Nyb2xsID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IG5hdkl0ZW1zO1xuXHRsZXQgZGVsdGEgPSAwO1xuXHRsZXQgY3VycmVudFNsaWRlO1xuXHRsZXQgbmV4dFNsaWRlO1xuXHRsZXQgcHJldmlvdXNTbGlkZTtcblx0bGV0IHByZXZpb3VzU2xpZGVzO1xuXHRsZXQgaXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cdGxldCBsYXN0U2Nyb2xsZWQ7XG5cdGxldCBtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gdHJ1ZTtcblx0bGV0IGxhc3RNb3VzZXdoZWVsVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdGxldCBsYXN0U2Nyb2xsVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdGxldCBzY3JvbGxzID0gW107XG5cdGxldCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2Jyk7XG5cdGxldCB3b3JrU2xpZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlldycpKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGlmIChuYXYpIHtcblx0XHRcdG5hdkl0ZW1zID0gQXJyYXkuZnJvbShuYXYucXVlcnlTZWxlY3RvckFsbCgnYScpKTtcblx0XHR9XG5cblx0XHRhbmltYXRlSW5pdGlhbCgpO1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHRcdHN0YXJ0Q2Fyb3VzZWwoKTtcblx0XHRvYmplY3RGaXRUZXN0KCk7XG5cdH1cblxuXHRmdW5jdGlvbiBvYmplY3RGaXRUZXN0KCkge1xuXHRcdGxldCBvYmplY3RGaXQgPSAnb2JqZWN0LWZpdCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpLnN0eWxlO1xuXHRcdGxldCBvYmplY3RQb3NpdGlvbiA9ICdvYmplY3QtcG9zaXRpb24nIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKS5zdHlsZTtcblxuXHRcdC8vIElmIHRoZSBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBlaXRoZXIgKHdlIG5lZWQgYm90aClcblx0XHRpZiAoIW9iamVjdFBvc2l0aW9uIHx8ICFvYmplY3RGaXQpIHtcblx0XHRcdC8vIEhpZGUgdGhlIGFjdHVhbCBpbWFnZSBhbmQganVtcCB0byB0aGUgZmFsbGJhY2sgXG5cdFx0XHRsZXQgaW1hZ2VzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3X19pbWFnZS1wcmVsb2FkJykpO1xuXG5cdFx0XHRmb3IgKGNvbnN0IGltYWdlIG9mIGltYWdlcykge1xuXHRcdFx0XHRpbWFnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0fVxuXG5cdFx0XHRsb2FkSW1hZ2VzKCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gUnVucyBsb2FkSW1hZ2Ugb24gdGhlIHdvcmstcHJldmlldyBjYXJvdXNlbCBpbWFnZXMuXG5cdGZ1bmN0aW9uIGxvYWRJbWFnZXMoKSB7XG5cdFx0bGV0IHByZXZpZXdJbWFnZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXcnKSk7XG5cblx0XHRmb3IgKCBjb25zdCBwcmV2aWV3SW1hZ2Ugb2YgcHJldmlld0ltYWdlcyApIHtcblx0XHRcdGxvYWRJbWFnZSggcHJldmlld0ltYWdlICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gRGlzcGxheXMgdGhlIGltYWdlcyBhcyBiYWNrZ3JvdW5kIGltYWdlcy5cblx0ZnVuY3Rpb24gbG9hZEltYWdlKGltYWdlKSB7XG5cdFx0bGV0IGltYWdlSG9sZGVyID0gaW1hZ2UucXVlcnlTZWxlY3RvciggJy53b3JrLXByZXZpZXdfX2ltYWdlJyApO1xuXG5cdFx0Ly8gSW1hZ2UgaXMgZGlzcGxheSBub25lXG5cdFx0bGV0IGltYWdlUHJlbG9hZCA9IGltYWdlLnF1ZXJ5U2VsZWN0b3IoICcud29yay1wcmV2aWV3X19pbWFnZS1wcmVsb2FkJyApO1xuXHRcdGxldCBiYWNrZ3JvdW5kU3R5bGUgPSBpbWFnZVByZWxvYWQuY3VycmVudFNyYztcblxuXHRcdC8vIFNlZW1zIHRvIGJlIG1vcmUgcmVsaWFibGUgdGhhbiBhdHRhY2hpbmcgZGlyZWN0bHlcblx0XHRsZXQgdG1wSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0dG1wSW1nLnNyYyA9IGJhY2tncm91bmRTdHlsZTtcblxuXHRcdHRtcEltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGZ1bmN0aW9uKCl7XG5cdFx0XHQvLyBJbWFnZSBwbGFjZWhvbGRlciBpcyBnaXZlbiBiYWNrZ3JvdW5kIGltYWdlXG5cdFx0XHRpZiAoIGJhY2tncm91bmRTdHlsZSApIHtcblx0XHRcdFx0aW1hZ2VIb2xkZXIuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcIicgKyBiYWNrZ3JvdW5kU3R5bGUgKyAnXCIpJztcblx0XHRcdFx0aW1hZ2VIb2xkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG5cdFx0XHR9XG5cdFx0fSkpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcmVzZXRTY3JvbGwoKSB7XG5cdFx0c2Nyb2xscyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNjcm9sbHNBdmcob2Zmc2V0KSB7XG5cdFx0bGV0IHN1bSA9IDA7XG5cblx0XHRsZXQgZWxtcyA9IHNjcm9sbHMuc2xpY2UoTWF0aC5tYXgoc2Nyb2xscy5sZW5ndGggLSBvZmZzZXQsIDEpKTtcblxuXHRcdGZvciAoIGNvbnN0IGVsbSBvZiBlbG1zICkge1xuXHRcdFx0c3VtICs9IGVsbTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKHN1bSAvIG9mZnNldCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhbmltYXRlSW5pdGlhbCgpIHtcblx0XHRsZXQgZmlyc3RXb3JrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tMScpO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0Zmlyc3RXb3JrLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmF2SXRlbXNbMF0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctY29udGFpbmVyX19uYXZfX2l0ZW0tLWlzLWFjdGl2ZScpO1xuXHRcdH0sIDIwMCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0c3RhcnRDYXJvdXNlbCgpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gSG9va3MgdXAgbmF2aWdhdGlvblxuXHRcdGZvciAoY29uc3QgbmF2SXRlbSBvZiBuYXZJdGVtcykge1xuXHRcdFx0bmF2SXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZU5hdik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gc3RhcnRDYXJvdXNlbCgpIHtcblx0XHQvLyBHZXQgdGhlIGN1cnJlbnQgcmVtIHZhbHVlXG5cdFx0bGV0IHJlbVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLmZvbnRTaXplIHx8IDE2O1xuXG5cdFx0Ly8gQXQgMzByZW0gd2Ugc3dpdGNoIHRvIHRoZSBjYXJvdXNlbCBsYXlvdXRcblx0XHRpZiAoIHdpbmRvdy5pbm5lckhlaWdodCA+ICggcmVtVmFsdWUgKiAzMCApICkge1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZE5hdik7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBzY3JvbGxOYXYpO1xuXG5cdFx0XHQvLyBTdG9wcyB0b3VjaG1vdmUgd29ya2luZyBvdXRyaWdodFxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gU2V0cyB1cCBIYW1tZXIgdG8gaGFuZGxlIHRvdWNoIGV2ZW50c1xuXHRcdFx0bGV0IHdvcmtDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LWNvbnRhaW5lcicpO1xuXHRcdFx0bGV0IHRvdWNoID0gbmV3IEhhbW1lcih3b3JrQ29udGFpbmVyKTtcblxuXHRcdFx0Ly8gRW5hYmxlcyB2ZXJ0aWNhbCBzd2lwZSBkZXRlY3Rpb25cblx0XHRcdHRvdWNoLmdldCgnc3dpcGUnKS5zZXQoeyBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fQUxMIH0pO1xuXG5cdFx0XHQvLyBHZXN0dXJlcyB0aGF0IGVxdWFsIGZvcndhcmRcblx0XHRcdHRvdWNoLm9uKCdzd2lwZXVwIHN3aXBlbGVmdCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIEdlc3R1cmVzIHRoYXQgZXF1YWwgYmFja3dhcmRzXG5cdFx0XHR0b3VjaC5vbignc3dpcGVkb3duIHN3aXBlcmlnaHQnLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkTmF2KTtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNjcm9sbE5hdik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlTmF2KGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRsZXQgc2xpZGVOdW1iZXIgPSBldmVudC50YXJnZXQuaW5uZXJIVE1MLnN1YnN0cmluZygxKTtcblxuXHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdGdvVG9TbGlkZShzbGlkZU51bWJlcik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGlnaGxpZ2h0QWN0aXZlTmF2KCkge1xuXHRcdC8vIFJlbW92ZSB0aGUgYWN0aXZlIGNsYXNzXG5cdFx0bGV0IGFjdGl2ZU5hdkNsYXNzID0gJ3dvcmstcHJldmlldy1jb250YWluZXJfX25hdl9faXRlbS0taXMtYWN0aXZlJztcblx0XHRsZXQgYWN0aXZlTmF2SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYWN0aXZlTmF2Q2xhc3MpO1xuXHRcdGFjdGl2ZU5hdkl0ZW0uY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVOYXZDbGFzcyk7XG5cblx0XHRsZXQgbmV4dE51bWJlciA9IG5leHRTbGlkZS5pZC5zdWJzdHJpbmcobmV4dFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cdFx0Y29uc29sZS5sb2cobmV4dE51bWJlcik7XG5cblx0XHRuYXZJdGVtc1tuZXh0TnVtYmVyIC0gMV0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKGFjdGl2ZU5hdkNsYXNzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdvVG9TbGlkZShzbGlkZU51bWJlcikge1xuXHRcdG5leHRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLScgKyBzbGlkZU51bWJlciApO1xuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdGlmIChuZXh0U2xpZGUpIHtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cblx0XHRcdGxldCBjdXJyZW50TnVtYmVyID0gY3VycmVudFNsaWRlLmlkLnN1YnN0cmluZyhjdXJyZW50U2xpZGUuaWQubGVuZ3RoIC0xKTtcblx0XHRcdGxldCBuZXh0TnVtYmVyID0gbmV4dFNsaWRlLmlkLnN1YnN0cmluZyhuZXh0U2xpZGUuaWQubGVuZ3RoIC0xKTtcblxuXHRcdFx0aWYgKGN1cnJlbnROdW1iZXIgPiBuZXh0TnVtYmVyKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdnb2luZyBiYWNrd2FyZHMnKTtcblx0XHRcdFx0Ly8gSWYgd2UncmUgZ29pbmcgYmFja3dhcmRzXG5cdFx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblxuXHRcdFx0XHQvLyBOZWVkIHRvIGFkZCBuZXh0IHRvIEFMTCBnb2luZyBmb3J3YXJkXG5cdFx0XHRcdGxldCBwcmV2aW91c1NsaWRlcyA9IHdvcmtTbGlkZXMuc2xpY2UobmV4dE51bWJlciwgY3VycmVudE51bWJlciAtIDEpO1xuXG5cdFx0XHRcdGZvciAoIGNvbnN0IHByZXZpb3VzU2xpZGUgb2YgcHJldmlvdXNTbGlkZXMgKSB7XG5cdFx0XHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHRcdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBJZiB3ZSdyZSBnb2luZyBmb3J3YXJkc1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZ29pbmcgZm9yd2FyZHMnKTtcblx0XHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdH1cblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNjcm9sbE5hdihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Y29uc29sZS5sb2coJ3Njcm9sbCBmaXJlZCcpO1xuXG5cdFx0bGV0IHNjcm9sbFRocmVzaG9sZCA9IDQwO1xuXG5cdFx0bGV0IHZhbHVlID0gLWUuZGVsdGFZO1xuXG5cdFx0aWYgKHNjcm9sbHMubGVuZ3RoID4gMTUwKSB7XG5cdFx0XHRzY3JvbGxzLnNoaWZ0KCk7XG5cdFx0fVxuXG5cdFx0c2Nyb2xscy5wdXNoKE1hdGguYWJzKHZhbHVlKSk7XG5cblx0XHR2YXIgY3VyclRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG5cdFx0aWYgKChjdXJyVGltZSAtIGxhc3RNb3VzZXdoZWVsVGltZSkgPiAyMDApIHtcblx0XHRcdHJlc2V0U2Nyb2xsKCk7XG5cdFx0fVxuXG5cdFx0bGFzdE1vdXNld2hlZWxUaW1lID0gY3VyclRpbWU7XG5cblx0XHR2YXIgbGFzdEF2ZyA9IHNjcm9sbHNBdmcoNSk7XG5cdFx0dmFyIG1pZEF2ZyA9IHNjcm9sbHNBdmcoNDApO1xuXG5cdFx0aWYgKGxhc3RBdmcgPiBtaWRBdmcpIHtcblx0XHRcdGlmIChtb3VzZXdoZWVsQ2FuU2Nyb2xsICYmIGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdG1vdXNld2hlZWxDYW5TY3JvbGwgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICh2YWx1ZSA8IDApIHtcblx0XHRcdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1vdXNld2hlZWxDYW5TY3JvbGwgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGtleWJvYXJkTmF2KGV2ZW50KSB7XG5cdFx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdHJlZ3Jlc3NTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHR9XG5cblx0ZnVuY3Rpb24gcmVzZXRUcmFuc2l0aW9uaW5nKCkge1xuXHRcdGlzVHJhbnNpdGlvbmluZyA9IHRydWU7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0aXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cdFx0fSwgMTAwMCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhZHZhbmNlU2xpZGUoKSB7XG5cblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0bmV4dFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tbmV4dCcpO1xuXG5cdFx0aWYgKG5leHRTbGlkZSkge1xuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXHRcblx0ZnVuY3Rpb24gcmVncmVzc1NsaWRlKCkge1xuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRwcmV2aW91c1NsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0cHJldmlvdXNTbGlkZSA9IHByZXZpb3VzU2xpZGVzW3ByZXZpb3VzU2xpZGVzLmxlbmd0aCAtIDFdO1xuXG5cdFx0aWYgKHByZXZpb3VzU2xpZGUpIHtcblx0XHRcdC8vIFNldHMgbmV4dCBhY3R1YWwgc2xpZGUgKG5vdCBjaHJvbm9sb2dpY2FsbHkpIHRvIHByZXZpb3VzIHNsaWRlXG5cdFx0XHRuZXh0U2xpZGUgPSBwcmV2aW91c1NsaWRlO1xuXG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgaG9tZVNjcm9sbDtcbiIsIi8qKlxuICogQWxsb3dzIGZvciBsZWZ0L3JpZ2h0IG5hdmlnYXRpb24gaW4gam91cm5hbFxuICovXG5sZXQgam91cm5hbE5hdiA9IChmdW5jdGlvbigpIHtcblx0bGV0IHByZXZpb3VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlX19uYXZpZ2F0aW9uLS1wcmV2aW91cyBhJyk7XG5cdGxldCBuZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlX19uYXZpZ2F0aW9uLS1uZXh0IGEnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmROYXYpO1xuXHR9XG5cblx0ZnVuY3Rpb24ga2V5Ym9hcmROYXYoZXZlbnQpIHtcblx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdGNhc2UgMzc6XG5cdFx0XHRcdGlmIChwcmV2aW91cykge1xuXHRcdFx0XHRcdGdvVG9MaW5rKCBwcmV2aW91cy5ocmVmICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDM5OlxuXHRcdFx0XHRpZiAobmV4dCkge1xuXHRcdFx0XHRcdGdvVG9MaW5rKCBuZXh0LmhyZWYgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBnb1RvTGluayhsaW5rKSB7XG5cdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaW5rO1xuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlTmF2KGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsTmF2O1xuIiwiLyoqXG4gKiBIYW5kbGVzIG1vYmlsZSBtZW51XG4gKi9cbmxldCBtZW51ID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcicpO1xuXHRsZXQgdG9nZ2xlID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXJfX21lbnUtdG9nZ2xlJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dG9nZ2xlTWVudSgpO1xuXHRcdFx0Y2hhbmdlVGV4dCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcblx0XHRoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbC1zaXRlaGVhZGVyLS1uYXYtaXMtb3BlbicpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2hhbmdlVGV4dCgpIHtcblx0XHRpZiAodG9nZ2xlLmlubmVySFRNTCA9PSAnTWVudScpIHtcdFxuXHRcdFx0dG9nZ2xlLmlubmVySFRNTCA9ICdDbG9zZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvZ2dsZS5pbm5lckhUTUwgPSAnTWVudSc7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1lbnU7XG4iLCIvKipcbiAqIFByaW1lIExhYnNcbiAqIEpTIGZvciB0aGUgUHJpbWUgTGFicyBjYXNlIHN0dWR5LlxuICovXG5sZXQgcHJpbWVsYWJzID0gKGZ1bmN0aW9uICgpIHtcblx0Ly8gSW5pdCBjb250cm9sbGVyXG5cdGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRsZXQgcHJvYmxlbVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fcHJvYmxlbXMnKTtcblx0bGV0IHN0YW5kYXJkU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19hcy1zdGFuZGFyZCcpO1xuXHRsZXQgY2Fyb3VzZWxTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX2Nhcm91c2VsJyk7XG5cdGxldCBiYWNrc3RvcnlTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX2JhY2tzdG9yeScpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJQWN0aW9ucygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJQWN0aW9ucygpIHtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBiYWNrc3RvcnlTZWN0aW9uLCBiYWNrc3RvcnlIYW5kbGVyKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBwcm9ibGVtU2VjdGlvbiwgcHJvYmxlbUhhbmRsZXIpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIHN0YW5kYXJkU2VjdGlvbiwgc3RhbmRhcmRIYW5kbGVyKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBjYXJvdXNlbFNlY3Rpb24sIGNhcm91c2VsSGFuZGxlcik7XG5cdH1cblxuXHRmdW5jdGlvbiBiYWNrc3RvcnlIYW5kbGVyKCkge1xuXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCh7ZGVsYXk6IDF9KTtcblx0XHRsZXQgbG9nbyA9IGJhY2tzdG9yeVNlY3Rpb24ucXVlcnlTZWxlY3RvcignI3ByaW1lLWxhYnNfX2JhY2tzdG9yeV9fbG9nbycpO1xuXHRcdGxldCBidWJibGVCb3R0b20gPSBsb2dvLnF1ZXJ5U2VsZWN0b3IoJyNidWJibGVCb3R0b20nKTtcblx0XHRsZXQgYnViYmxlTWlkZGxlID0gbG9nby5xdWVyeVNlbGVjdG9yKCcjYnViYmxlTWlkZGxlJyk7XG5cdFx0bGV0IGJ1YmJsZVRvcCA9IGxvZ28ucXVlcnlTZWxlY3RvcignI2J1YmJsZVRvcCcpO1xuXG5cdFx0dGwudG8obG9nbywgMSwge29wYWNpdHk6IDEsIGVhc2U6IFBvd2VyMS5lYXNlSW59KVxuXHRcdCAgLnRvKGJ1YmJsZUJvdHRvbSwgMSwge29wYWNpdHk6IDF9LCAnYm90dG9tJylcblx0XHQgIC50byhidWJibGVNaWRkbGUsIDEsIHtvcGFjaXR5OiAxfSwgJ21pZGRsZScpXG5cdFx0ICAudG8oYnViYmxlQm90dG9tLCAxLCB7b3BhY2l0eTogMH0sICdtaWRkbGUnKVxuXHRcdCAgLnRvKGJ1YmJsZVRvcCwgMSwge29wYWNpdHk6IDF9LCAndG9wJylcblx0XHQgIC50byhidWJibGVNaWRkbGUsIDEsIHtvcGFjaXR5OiAwfSwgJ3RvcCcpXG5cdFx0ICAudG8oYnViYmxlTWlkZGxlLCAxLCB7b3BhY2l0eTogMX0sICdmaW5hbCcpXG5cdFx0ICAudG8oYnViYmxlQm90dG9tLCAxLCB7b3BhY2l0eTogMX0sICdmaW5hbCcpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2Fyb3VzZWxIYW5kbGVyKCkge1xuXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCh7ZGVsYXk6IDIsIHJlcGVhdDogMX0pO1xuXHRcdGxldCB0aXRsZSA9IGNhcm91c2VsU2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuaGVhZGluZy0xJyk7XG5cblx0XHR0bC50byh0aXRsZSwgMywge3g6ICcxNTAlJywgb3BhY2l0eTogJzAnLCBlYXNlOiBQb3dlcjEuZWFzZUluIH0pO1xuXHRcdHRsLnNldCh0aXRsZSwge3g6ICctMTUwJSd9KTtcblx0XHR0bC50byh0aXRsZSwgMywge3g6ICcwJScsIG9wYWNpdHk6ICcxJywgZWFzZTogUG93ZXIxLmVhc2VPdXQgfSk7XG5cdH1cblxuXHQvLyBBZGRzIGEgc2NlbmUgd2l0aCBwcmVkZWZpbmVkIG9wdGlvbnMgdG8gdGhlIGNvbnRyb2xsZXJcblx0ZnVuY3Rpb24gYWRkU2NlbmUoY29udHJvbGxlciwgZWxlbWVudCwgaGFuZGxlcikge1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdFx0dHJpZ2dlckVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRvZmZzZXQ6IDUwLFxuXHRcdFx0cmV2ZXJzZTogZmFsc2Vcblx0XHR9O1xuXG5cdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKG9wdGlvbnMpLm9uKCdzdGFydCcsIGhhbmRsZXIpLmFkZFRvKGNvbnRyb2xsZXIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJvYmxlbUhhbmRsZXIoKSB7XG5cdFx0cHJvYmxlbVNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncHJpbWUtbGFic19fcHJvYmxlbXMtLWlzLWFjdGl2ZScpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc3RhbmRhcmRIYW5kbGVyKCkge1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX192aWRlbycpLnBsYXkoKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpbWVsYWJzO1xuIl19
