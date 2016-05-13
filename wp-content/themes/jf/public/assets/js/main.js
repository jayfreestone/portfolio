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
	// let demoSection = document.querySelector('.dashboard__demo');

	function init() {
		bindUIActions();
	}

	function bindUIActions() {
		// Init controller
		var controller = new ScrollMagic.Controller();

		// Add scenes
		addScene(controller, groundSection, reactAnimation);
		addScene(controller, deploymentSection, terminalAnimation);
		// addScene(controller, demoSection, demoHandler);
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

	// function demoHandler() {
	// 	document.querySelector('.dashboard__demo video').play();
	// }

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

		tl.to(paths, 3, { 'stroke-dashoffset': 0, opacity: '1', ease: Power1.easeIn }).to(paths, 1, { 'fill': '#D9EFEE', 'stroke': '#3fb0ac', ease: Power1.easeIn });
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
		objectFitTest();
		startCarousel();
		bindUIEvents();
	}

	// Animates the load of the initial slide
	function animateInitial() {
		var firstWork = document.querySelector('.work-preview--1');

		setTimeout(function () {
			firstWork.classList.add('work-preview--current');
			navItems[0].parentNode.classList.add('work-preview-container__nav__item--is-active');
		}, 200);
	}

	// Tests if we can use images or have to fall back to background images
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

	// Displays the content image as a background image.
	function loadImage(image) {
		var imageHolder = image.querySelector('.work-preview__image');

		// Image is display none
		var imagePreload = image.querySelector('.work-preview__image-preload');
		var backgroundStyle = imagePreload.currentSrc || imagePreload.src;

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

	// Binds UI Events
	function bindUIEvents() {
		// On resize, re-evaluate if we should start the JS carousel
		window.addEventListener('resize', function () {
			startCarousel();
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

	// Hooks up the JS carousel if window is above a certain height
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
			// Remove the listeners if the window is too short
			window.removeEventListener('keydown', keyboardNav);
			window.removeEventListener('wheel', scrollNav);
		}
	}

	function resetScroll() {
		scrolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	}

	function scrollsAvg(offset) {
		var sum = 0;

		var elms = scrolls.slice(Math.max(scrolls.length - offset, 1));

		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = elms[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var elm = _step4.value;

				sum += elm;
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

		return Math.ceil(sum / offset);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYXJ0aWFscy9kYXNoYm9hcmQuanMiLCJzcmMvanMvcGFydGlhbHMvZmFkZUJhY2tncm91bmRJbWFnZS5qcyIsInNyYy9qcy9wYXJ0aWFscy9mYWRlSXNIaWRkZW4uanMiLCJzcmMvanMvcGFydGlhbHMvaGVhZGVyLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7O0FBRXpELGdCQUFLLElBQUw7O0FBRUEsd0JBQWEsSUFBYjs7QUFFQSxLQUFJLFNBQVMsYUFBVCxDQUF1QixzQkFBdkIsQ0FBSixFQUFvRDtBQUNuRCxtQkFBTyxJQUFQO0FBQ0E7O0FBRUQsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBSixFQUE2QztBQUM1Qyx1QkFBVyxJQUFYO0FBQ0E7O0FBRUQsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBSixFQUEyQztBQUMxQyxzQkFBVSxJQUFWO0FBQ0E7O0FBRUQsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBSixFQUEwQztBQUN6QyxzQkFBVSxJQUFWO0FBQ0E7O0FBRUQsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsaUJBQXZCLENBQUosRUFBK0M7QUFDOUMsdUJBQVcsSUFBWDtBQUNBO0FBQ0QsQ0F6QkQ7Ozs7Ozs7OztBQ0pBOzs7Ozs7QUFFQSxJQUFJLFlBQWEsWUFBWTtBQUM1QixLQUFJLGdCQUFnQixT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RWIsV0FBUSxFQUZLO0FBR2IsWUFBUztBQUhJLEdBQWQ7O0FBTUEsTUFBSSxZQUFZLEtBQWhCLENBQXNCLE9BQXRCLEVBQStCLEVBQS9CLENBQWtDLE9BQWxDLEVBQTJDLE9BQTNDLEVBQW9ELEtBQXBELENBQTBELFVBQTFEO0FBQ0E7O0FBRUQsVUFBUyxjQUFULEdBQTBCO0FBQ3pCLGlCQUFlLFNBQWYsQ0FBeUIsR0FBekIsQ0FBNkIsaUNBQTdCO0FBQ0E7O0FBRUQsVUFBUyxlQUFULEdBQTJCO0FBQzFCLFdBQVMsYUFBVCxDQUF1QixvQkFBdkIsRUFBNkMsSUFBN0M7QUFDQTs7QUFFRCxRQUFPO0FBQ04sUUFBTTtBQURBLEVBQVA7QUFHQSxDQXBFZ0IsRUFBakI7O2tCQXNFZSxTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBwcmltZWxhYnMgZnJvbSAnLi9wYXJ0aWFscy9wcmltZWxhYnMuanMnO1xuaW1wb3J0IG1lbnUgZnJvbSAnLi9wYXJ0aWFscy9tZW51LmpzJztcbmltcG9ydCBob21lU2Nyb2xsIGZyb20gJy4vcGFydGlhbHMvaG9tZVNjcm9sbC5qcyc7XG5pbXBvcnQgam91cm5hbE5hdiBmcm9tICcuL3BhcnRpYWxzL2pvdXJuYWxOYXYuanMnO1xuaW1wb3J0IGRhc2hib2FyZCBmcm9tICcuL3BhcnRpYWxzL2Rhc2hib2FyZC5qcyc7XG5pbXBvcnQgaGVhZGVyIGZyb20gJy4vcGFydGlhbHMvaGVhZGVyLmpzJztcbmltcG9ydCBmYWRlSXNIaWRkZW4gZnJvbSAnLi9wYXJ0aWFscy9mYWRlSXNIaWRkZW4uanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXG5cdG1lbnUuaW5pdCgpO1xuXG5cdGZhZGVJc0hpZGRlbi5pbml0KCk7XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXItLXdoaXRlJykpIHtcblx0XHRoZWFkZXIuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXcnKSkge1xuXHRcdGhvbWVTY3JvbGwuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzJykpIHtcblx0XHRwcmltZWxhYnMuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmQnKSkge1xuXHRcdGRhc2hib2FyZC5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlJykpIHtcblx0XHRqb3VybmFsTmF2LmluaXQoKTtcblx0fVxufSk7XG4iLCIvKipcbiAqIERhc2hib2FyZFxuICogSlMgZm9yIHRoZSBEYXNoYm9hcmQgY2FzZSBzdHVkeS5cbiAqL1xuaW1wb3J0IGZhZGVCYWNrZ3JvdW5kSW1hZ2UgZnJvbSAnLi9mYWRlQmFja2dyb3VuZEltYWdlLmpzJztcblxubGV0IGRhc2hib2FyZCA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBncm91bmRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZ3JvdW5kd29yaycpO1xuXHRsZXQgZGVwbG95bWVudFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19kZXBsb3ltZW50Jyk7XG5cdC8vIGxldCBkZW1vU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2RlbW8nKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUFjdGlvbnMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUFjdGlvbnMoKSB7XG5cdFx0Ly8gSW5pdCBjb250cm9sbGVyXG5cdFx0bGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdFx0Ly8gQWRkIHNjZW5lc1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIGdyb3VuZFNlY3Rpb24sIHJlYWN0QW5pbWF0aW9uKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBkZXBsb3ltZW50U2VjdGlvbiwgdGVybWluYWxBbmltYXRpb24pO1xuXHRcdC8vIGFkZFNjZW5lKGNvbnRyb2xsZXIsIGRlbW9TZWN0aW9uLCBkZW1vSGFuZGxlcik7XG5cdH1cblxuXHRmdW5jdGlvbiB0ZXJtaW5hbEFuaW1hdGlvbigpIHtcblx0XHRsZXQgY29kZVdpbmRvdyA9IGRlcGxveW1lbnRTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX3Rlcm1pbmFsIGNvZGUnKTtcblx0XHR3cml0ZVN0cmluZygnY2FwIHN0YWdpbmcgZGVwbG95JywgY29kZVdpbmRvdyk7XG5cdH1cblxuXHRmdW5jdGlvbiB3cml0ZVN0cmluZyhzdHJpbmdUb1R5cGUsIHBsYWNlVG9UeXBlKSB7XG5cdFx0bGV0IGkgPSAwO1xuXG5cdFx0KGZ1bmN0aW9uIHdyaXRlQ2hhcigpIHtcblx0XHRcdGlmIChzdHJpbmdUb1R5cGUubGVuZ3RoID4gaSkge1xuXHRcdFx0XHRwbGFjZVRvVHlwZS5pbm5lckhUTUwgPSBwbGFjZVRvVHlwZS5pbm5lckhUTUwgKyBzdHJpbmdUb1R5cGVbaV07XG5cdFx0XHRcdGkrKztcblxuXHRcdFx0XHRsZXQgZGVsYXkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAwKSkgKyAxNDA7XG5cblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHdyaXRlQ2hhcigpO1xuXHRcdFx0XHR9LCBkZWxheSk7XG5cdFx0XHR9XG5cdFx0fSkoKVxuXHR9XG5cblx0Ly8gZnVuY3Rpb24gZGVtb0hhbmRsZXIoKSB7XG5cdC8vIFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZGVtbyB2aWRlbycpLnBsYXkoKTtcblx0Ly8gfVxuXG5cdC8vIEFkZHMgYSBzY2VuZSB3aXRoIHByZWRlZmluZWQgb3B0aW9ucyB0byB0aGUgY29udHJvbGxlclxuXHRmdW5jdGlvbiBhZGRTY2VuZShjb250cm9sbGVyLCBlbGVtZW50LCBoYW5kbGVyKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHR0cmlnZ2VyRWxlbWVudDogZWxlbWVudCxcblx0XHRcdG9mZnNldDogNTAsXG5cdFx0XHRyZXZlcnNlOiBmYWxzZVxuXHRcdH07XG5cblx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUob3B0aW9ucykub24oJ3N0YXJ0JywgaGFuZGxlcikuYWRkVG8oY29udHJvbGxlcik7XG5cdH1cblxuXG5cdC8vIFJlYWN0IExvZ28gQW5pbWF0aW9uXG5cdGZ1bmN0aW9uIHJlYWN0QW5pbWF0aW9uKCkge1xuXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xuXG5cdFx0bGV0IGxvZ28gPSBncm91bmRTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuXHRcdGxldCBwYXRocyA9IEFycmF5LmZyb20obG9nby5xdWVyeVNlbGVjdG9yQWxsKCdwYXRoJykpO1xuXG5cdFx0Zm9yIChjb25zdCBwYXRoIG9mIHBhdGhzKSB7XG5cdFx0XHRzZXREYXNoKHBhdGgpO1xuXHRcdH1cblxuXHRcdHRsLnRvKHBhdGhzLCAzLCB7ICdzdHJva2UtZGFzaG9mZnNldCc6IDAsIG9wYWNpdHk6ICcxJywgZWFzZTogUG93ZXIxLmVhc2VJbiB9KVxuXHRcdC50byhwYXRocywgMSwgeyAnZmlsbCc6ICcjRDlFRkVFJywgJ3N0cm9rZSc6ICcjM2ZiMGFjJywgZWFzZTogUG93ZXIxLmVhc2VJbiB9KTtcblx0fVxuXG5cdC8vIFNldHMgRGFzaCBhcnJheS9vZmZzZXQgb24gZWxlbWVudFxuXHRmdW5jdGlvbiBzZXREYXNoKHBhdGgpIHtcblx0XHRsZXQgbGVuZ3RoID0gcGF0aC5nZXRUb3RhbExlbmd0aCgpO1xuXHRcdHBhdGguc3R5bGVbJ3N0cm9rZS1kYXNob2Zmc2V0J10gPSBsZW5ndGg7XG5cdFx0cGF0aC5zdHlsZVsnc3Ryb2tlLWRhc2hhcnJheSddID0gbGVuZ3RoO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBkYXNoYm9hcmQ7XG4iLCIvKipcbiAqIEZhZGVzIGluIGEgYmFja2dyb3VuZCBpbWFnZSBvbmNlIGxvYWRlZFxuICovXG5sZXQgZmFkZUJhY2tncm91bmRJbWFnZSA9IChmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIGZhZGUoaW1hZ2UpIHtcblx0XHRsZXQgYmFja2dyb3VuZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoaW1hZ2UpWydiYWNrZ3JvdW5kLWltYWdlJ107XG5cdFx0bGV0IGltYWdlVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG5cdFx0aWYgKCBiYWNrZ3JvdW5kU3R5bGUgIT09ICdub25lJyApIHtcblx0XHRcdGxldCBiYWNrZ3JvdW5kSW1hZ2UgPSBiYWNrZ3JvdW5kU3R5bGUubWF0Y2goL1xcL1xcLyhbYS16MC05OlxcLVxcLlxcL10rKS8pWzBdO1xuXHRcdFx0aW1hZ2VUZW1wLnNyYyA9IGJhY2tncm91bmRJbWFnZS5yZXBsYWNlKC9cIi9nLCAnJyk7XG5cdFx0XHRpbWFnZVRlbXAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4tYmcnKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4tYmcnKTtcblx0XHR9XG5cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0ZmFkZTogZmFkZVxuXHR9XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgZmFkZUJhY2tncm91bmRJbWFnZTtcbiIsIi8qKlxuICogRmFkZXMgaW4gYmFja2dyb3VuZCBpbWFnZXMgd2l0aCAnaXMtaGlkZGVuJyBjbGFzc1xuICovXG5pbXBvcnQgZmFkZUJhY2tncm91bmRJbWFnZSBmcm9tICcuL2ZhZGVCYWNrZ3JvdW5kSW1hZ2UuanMnO1xuXG5sZXQgZmFkZUlzSGlkZGVuID0gKGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRsZXQgaXNIaWRkZW5BbGwgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pcy1oaWRkZW4tYmcnKSk7XG5cblx0XHRmb3IgKGNvbnN0IGlzSGlkZGVuIG9mIGlzSGlkZGVuQWxsKSB7XG5cdFx0XHRmYWRlQmFja2dyb3VuZEltYWdlLmZhZGUoaXNIaWRkZW4pO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBmYWRlSXNIaWRkZW47XG4iLCJsZXQgaGVhZGVyID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXInKTtcblx0bGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZS1tYWluJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpZiAobWFpbikge1xuXG5cdFx0XHQvLyBpbml0IGNvbnRyb2xsZXJcblx0XHRcdHZhciBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRcdFx0Ly8gY3JlYXRlIGEgc2NlbmVcblx0XHRcdG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XG5cdFx0XHRcdHRyaWdnZXJFbGVtZW50OiBtYWluLFxuXHRcdFx0XHR0cmlnZ2VySG9vazogJ29uTGVhdmUnLFxuXHRcdFx0fSkub24oJ3N0YXJ0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0b2dnbGVXaGl0ZW91dCgpO1xuXG5cdFx0XHR9KVxuXHRcdFx0LmFkZFRvKGNvbnRyb2xsZXIpOyAvLyBhc3NpZ24gdGhlIHNjZW5lIHRvIHRoZSBjb250cm9sbGVyXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlV2hpdGVvdXQoKSB7XG5cdFx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2wtc2l0ZWhlYWRlci0td2hpdGUnKTtcblx0fVxuXG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXI7XG4iLCIvKipcbiAqIEhvbWUgU2Nyb2xsXG4gKiBIYW5kbGVzIHRoZSBob21lcGFnZSBjYXJvdXNlbFxuICovXG5sZXQgaG9tZVNjcm9sbCA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBuYXZJdGVtcztcblx0bGV0IGRlbHRhID0gMDtcblx0bGV0IGN1cnJlbnRTbGlkZTtcblx0bGV0IG5leHRTbGlkZTtcblx0bGV0IHByZXZpb3VzU2xpZGU7XG5cdGxldCBwcmV2aW91c1NsaWRlcztcblx0bGV0IGlzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXHRsZXQgbGFzdFNjcm9sbGVkO1xuXHRsZXQgbW91c2V3aGVlbENhblNjcm9sbCA9IHRydWU7XG5cdGxldCBsYXN0TW91c2V3aGVlbFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRsZXQgbGFzdFNjcm9sbFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRsZXQgc2Nyb2xscyA9IFtdO1xuXHRsZXQgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy1jb250YWluZXJfX25hdicpO1xuXHRsZXQgd29ya1NsaWRlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXcnKSk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpZiAobmF2KSB7XG5cdFx0XHRuYXZJdGVtcyA9IEFycmF5LmZyb20obmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSk7XG5cdFx0fVxuXG5cdFx0YW5pbWF0ZUluaXRpYWwoKTtcblx0XHRvYmplY3RGaXRUZXN0KCk7XG5cdFx0c3RhcnRDYXJvdXNlbCgpO1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHR9XG5cblx0Ly8gQW5pbWF0ZXMgdGhlIGxvYWQgb2YgdGhlIGluaXRpYWwgc2xpZGVcblx0ZnVuY3Rpb24gYW5pbWF0ZUluaXRpYWwoKSB7XG5cdFx0bGV0IGZpcnN0V29yayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLTEnKTtcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGZpcnN0V29yay5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5hdkl0ZW1zWzBdLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2X19pdGVtLS1pcy1hY3RpdmUnKTtcblx0XHR9LCAyMDApO1xuXHR9XG5cblx0Ly8gVGVzdHMgaWYgd2UgY2FuIHVzZSBpbWFnZXMgb3IgaGF2ZSB0byBmYWxsIGJhY2sgdG8gYmFja2dyb3VuZCBpbWFnZXNcblx0ZnVuY3Rpb24gb2JqZWN0Rml0VGVzdCgpIHtcblx0XHRsZXQgb2JqZWN0Rml0ID0gJ29iamVjdC1maXQnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKS5zdHlsZTtcblx0XHRsZXQgb2JqZWN0UG9zaXRpb24gPSAnb2JqZWN0LXBvc2l0aW9uJyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJykuc3R5bGU7XG5cblx0XHQvLyBJZiB0aGUgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgZWl0aGVyICh3ZSBuZWVkIGJvdGgpXG5cdFx0aWYgKCFvYmplY3RQb3NpdGlvbiB8fCAhb2JqZWN0Rml0KSB7XG5cdFx0XHQvLyBIaWRlIHRoZSBhY3R1YWwgaW1hZ2UgYW5kIGp1bXAgdG8gdGhlIGZhbGxiYWNrIFxuXHRcdFx0bGV0IGltYWdlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlld19faW1hZ2UtcHJlbG9hZCcpKTtcblxuXHRcdFx0Zm9yIChjb25zdCBpbWFnZSBvZiBpbWFnZXMpIHtcblx0XHRcdFx0aW1hZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdH1cblxuXHRcdFx0bG9hZEltYWdlcygpO1xuXHRcdH1cblx0fVxuXG5cdC8vIFJ1bnMgbG9hZEltYWdlIG9uIHRoZSB3b3JrLXByZXZpZXcgY2Fyb3VzZWwgaW1hZ2VzLlxuXHRmdW5jdGlvbiBsb2FkSW1hZ2VzKCkge1xuXHRcdGxldCBwcmV2aWV3SW1hZ2VzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3JykpO1xuXG5cdFx0Zm9yICggY29uc3QgcHJldmlld0ltYWdlIG9mIHByZXZpZXdJbWFnZXMgKSB7XG5cdFx0XHRsb2FkSW1hZ2UoIHByZXZpZXdJbWFnZSApO1xuXHRcdH1cblx0fVxuXG5cdC8vIERpc3BsYXlzIHRoZSBjb250ZW50IGltYWdlIGFzIGEgYmFja2dyb3VuZCBpbWFnZS5cblx0ZnVuY3Rpb24gbG9hZEltYWdlKGltYWdlKSB7XG5cdFx0bGV0IGltYWdlSG9sZGVyID0gaW1hZ2UucXVlcnlTZWxlY3RvciggJy53b3JrLXByZXZpZXdfX2ltYWdlJyApO1xuXG5cdFx0Ly8gSW1hZ2UgaXMgZGlzcGxheSBub25lXG5cdFx0bGV0IGltYWdlUHJlbG9hZCA9IGltYWdlLnF1ZXJ5U2VsZWN0b3IoICcud29yay1wcmV2aWV3X19pbWFnZS1wcmVsb2FkJyApO1xuXHRcdGxldCBiYWNrZ3JvdW5kU3R5bGUgPSBpbWFnZVByZWxvYWQuY3VycmVudFNyYyB8fCBpbWFnZVByZWxvYWQuc3JjO1xuXG5cdFx0Ly8gU2VlbXMgdG8gYmUgbW9yZSByZWxpYWJsZSB0aGFuIGF0dGFjaGluZyBkaXJlY3RseVxuXHRcdGxldCB0bXBJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0XHR0bXBJbWcuc3JjID0gYmFja2dyb3VuZFN0eWxlO1xuXG5cdFx0dG1wSW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZnVuY3Rpb24oKXtcblx0XHRcdC8vIEltYWdlIHBsYWNlaG9sZGVyIGlzIGdpdmVuIGJhY2tncm91bmQgaW1hZ2Vcblx0XHRcdGlmICggYmFja2dyb3VuZFN0eWxlICkge1xuXHRcdFx0XHRpbWFnZUhvbGRlci5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFwiJyArIGJhY2tncm91bmRTdHlsZSArICdcIiknO1xuXHRcdFx0XHRpbWFnZUhvbGRlci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcblx0XHRcdH1cblx0XHR9KSk7XG5cdH1cblxuXHQvLyBCaW5kcyBVSSBFdmVudHNcblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdC8vIE9uIHJlc2l6ZSwgcmUtZXZhbHVhdGUgaWYgd2Ugc2hvdWxkIHN0YXJ0IHRoZSBKUyBjYXJvdXNlbFxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcblx0XHRcdHN0YXJ0Q2Fyb3VzZWwoKTtcblx0XHR9KTtcblxuXHRcdC8vIEhvb2tzIHVwIG5hdmlnYXRpb25cblx0XHRmb3IgKGNvbnN0IG5hdkl0ZW0gb2YgbmF2SXRlbXMpIHtcblx0XHRcdG5hdkl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVOYXYpO1xuXHRcdH1cblx0fVxuXG5cdC8vIEhvb2tzIHVwIHRoZSBKUyBjYXJvdXNlbCBpZiB3aW5kb3cgaXMgYWJvdmUgYSBjZXJ0YWluIGhlaWdodFxuXHRmdW5jdGlvbiBzdGFydENhcm91c2VsKCkge1xuXHRcdC8vIEdldCB0aGUgY3VycmVudCByZW0gdmFsdWVcblx0XHRsZXQgcmVtVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUuZm9udFNpemUgfHwgMTY7XG5cblx0XHQvLyBBdCAzMHJlbSB3ZSBzd2l0Y2ggdG8gdGhlIGNhcm91c2VsIGxheW91dFxuXHRcdGlmICggd2luZG93LmlubmVySGVpZ2h0ID4gKCByZW1WYWx1ZSAqIDMwICkgKSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkTmF2KTtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNjcm9sbE5hdik7XG5cblx0XHRcdC8vIFN0b3BzIHRvdWNobW92ZSB3b3JraW5nIG91dHJpZ2h0XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBTZXRzIHVwIEhhbW1lciB0byBoYW5kbGUgdG91Y2ggZXZlbnRzXG5cdFx0XHRsZXQgd29ya0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctY29udGFpbmVyJyk7XG5cdFx0XHRsZXQgdG91Y2ggPSBuZXcgSGFtbWVyKHdvcmtDb250YWluZXIpO1xuXG5cdFx0XHQvLyBFbmFibGVzIHZlcnRpY2FsIHN3aXBlIGRldGVjdGlvblxuXHRcdFx0dG91Y2guZ2V0KCdzd2lwZScpLnNldCh7IGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9BTEwgfSk7XG5cblx0XHRcdC8vIEdlc3R1cmVzIHRoYXQgZXF1YWwgZm9yd2FyZFxuXHRcdFx0dG91Y2gub24oJ3N3aXBldXAgc3dpcGVsZWZ0JywgZnVuY3Rpb24oKXtcblx0XHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gR2VzdHVyZXMgdGhhdCBlcXVhbCBiYWNrd2FyZHNcblx0XHRcdHRvdWNoLm9uKCdzd2lwZWRvd24gc3dpcGVyaWdodCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIFJlbW92ZSB0aGUgbGlzdGVuZXJzIGlmIHRoZSB3aW5kb3cgaXMgdG9vIHNob3J0XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkTmF2KTtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNjcm9sbE5hdik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gcmVzZXRTY3JvbGwoKSB7XG5cdFx0c2Nyb2xscyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNjcm9sbHNBdmcob2Zmc2V0KSB7XG5cdFx0bGV0IHN1bSA9IDA7XG5cblx0XHRsZXQgZWxtcyA9IHNjcm9sbHMuc2xpY2UoTWF0aC5tYXgoc2Nyb2xscy5sZW5ndGggLSBvZmZzZXQsIDEpKTtcblxuXHRcdGZvciAoIGNvbnN0IGVsbSBvZiBlbG1zICkge1xuXHRcdFx0c3VtICs9IGVsbTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKHN1bSAvIG9mZnNldCk7XG5cdH1cblxuXG5cblx0ZnVuY3Rpb24gaGFuZGxlTmF2KGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRsZXQgc2xpZGVOdW1iZXIgPSBldmVudC50YXJnZXQuaW5uZXJIVE1MLnN1YnN0cmluZygxKTtcblxuXHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdGdvVG9TbGlkZShzbGlkZU51bWJlcik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGlnaGxpZ2h0QWN0aXZlTmF2KCkge1xuXHRcdC8vIFJlbW92ZSB0aGUgYWN0aXZlIGNsYXNzXG5cdFx0bGV0IGFjdGl2ZU5hdkNsYXNzID0gJ3dvcmstcHJldmlldy1jb250YWluZXJfX25hdl9faXRlbS0taXMtYWN0aXZlJztcblx0XHRsZXQgYWN0aXZlTmF2SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYWN0aXZlTmF2Q2xhc3MpO1xuXHRcdGFjdGl2ZU5hdkl0ZW0uY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVOYXZDbGFzcyk7XG5cblx0XHRsZXQgbmV4dE51bWJlciA9IG5leHRTbGlkZS5pZC5zdWJzdHJpbmcobmV4dFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cdFx0Y29uc29sZS5sb2cobmV4dE51bWJlcik7XG5cblx0XHRuYXZJdGVtc1tuZXh0TnVtYmVyIC0gMV0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKGFjdGl2ZU5hdkNsYXNzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdvVG9TbGlkZShzbGlkZU51bWJlcikge1xuXHRcdG5leHRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLScgKyBzbGlkZU51bWJlciApO1xuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdGlmIChuZXh0U2xpZGUpIHtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cblx0XHRcdGxldCBjdXJyZW50TnVtYmVyID0gY3VycmVudFNsaWRlLmlkLnN1YnN0cmluZyhjdXJyZW50U2xpZGUuaWQubGVuZ3RoIC0xKTtcblx0XHRcdGxldCBuZXh0TnVtYmVyID0gbmV4dFNsaWRlLmlkLnN1YnN0cmluZyhuZXh0U2xpZGUuaWQubGVuZ3RoIC0xKTtcblxuXHRcdFx0aWYgKGN1cnJlbnROdW1iZXIgPiBuZXh0TnVtYmVyKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdnb2luZyBiYWNrd2FyZHMnKTtcblx0XHRcdFx0Ly8gSWYgd2UncmUgZ29pbmcgYmFja3dhcmRzXG5cdFx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblxuXHRcdFx0XHQvLyBOZWVkIHRvIGFkZCBuZXh0IHRvIEFMTCBnb2luZyBmb3J3YXJkXG5cdFx0XHRcdGxldCBwcmV2aW91c1NsaWRlcyA9IHdvcmtTbGlkZXMuc2xpY2UobmV4dE51bWJlciwgY3VycmVudE51bWJlciAtIDEpO1xuXG5cdFx0XHRcdGZvciAoIGNvbnN0IHByZXZpb3VzU2xpZGUgb2YgcHJldmlvdXNTbGlkZXMgKSB7XG5cdFx0XHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHRcdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBJZiB3ZSdyZSBnb2luZyBmb3J3YXJkc1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZ29pbmcgZm9yd2FyZHMnKTtcblx0XHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdH1cblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNjcm9sbE5hdihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Y29uc29sZS5sb2coJ3Njcm9sbCBmaXJlZCcpO1xuXG5cdFx0bGV0IHNjcm9sbFRocmVzaG9sZCA9IDQwO1xuXG5cdFx0bGV0IHZhbHVlID0gLWUuZGVsdGFZO1xuXG5cdFx0aWYgKHNjcm9sbHMubGVuZ3RoID4gMTUwKSB7XG5cdFx0XHRzY3JvbGxzLnNoaWZ0KCk7XG5cdFx0fVxuXG5cdFx0c2Nyb2xscy5wdXNoKE1hdGguYWJzKHZhbHVlKSk7XG5cblx0XHR2YXIgY3VyclRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG5cdFx0aWYgKChjdXJyVGltZSAtIGxhc3RNb3VzZXdoZWVsVGltZSkgPiAyMDApIHtcblx0XHRcdHJlc2V0U2Nyb2xsKCk7XG5cdFx0fVxuXG5cdFx0bGFzdE1vdXNld2hlZWxUaW1lID0gY3VyclRpbWU7XG5cblx0XHR2YXIgbGFzdEF2ZyA9IHNjcm9sbHNBdmcoNSk7XG5cdFx0dmFyIG1pZEF2ZyA9IHNjcm9sbHNBdmcoNDApO1xuXG5cdFx0aWYgKGxhc3RBdmcgPiBtaWRBdmcpIHtcblx0XHRcdGlmIChtb3VzZXdoZWVsQ2FuU2Nyb2xsICYmIGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdG1vdXNld2hlZWxDYW5TY3JvbGwgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICh2YWx1ZSA8IDApIHtcblx0XHRcdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1vdXNld2hlZWxDYW5TY3JvbGwgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGtleWJvYXJkTmF2KGV2ZW50KSB7XG5cdFx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdHJlZ3Jlc3NTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHR9XG5cblx0ZnVuY3Rpb24gcmVzZXRUcmFuc2l0aW9uaW5nKCkge1xuXHRcdGlzVHJhbnNpdGlvbmluZyA9IHRydWU7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0aXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cdFx0fSwgMTAwMCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhZHZhbmNlU2xpZGUoKSB7XG5cblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0bmV4dFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tbmV4dCcpO1xuXG5cdFx0aWYgKG5leHRTbGlkZSkge1xuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXHRcblx0ZnVuY3Rpb24gcmVncmVzc1NsaWRlKCkge1xuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRwcmV2aW91c1NsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0cHJldmlvdXNTbGlkZSA9IHByZXZpb3VzU2xpZGVzW3ByZXZpb3VzU2xpZGVzLmxlbmd0aCAtIDFdO1xuXG5cdFx0aWYgKHByZXZpb3VzU2xpZGUpIHtcblx0XHRcdC8vIFNldHMgbmV4dCBhY3R1YWwgc2xpZGUgKG5vdCBjaHJvbm9sb2dpY2FsbHkpIHRvIHByZXZpb3VzIHNsaWRlXG5cdFx0XHRuZXh0U2xpZGUgPSBwcmV2aW91c1NsaWRlO1xuXG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgaG9tZVNjcm9sbDtcbiIsIi8qKlxuICogQWxsb3dzIGZvciBsZWZ0L3JpZ2h0IG5hdmlnYXRpb24gaW4gam91cm5hbFxuICovXG5sZXQgam91cm5hbE5hdiA9IChmdW5jdGlvbigpIHtcblx0bGV0IHByZXZpb3VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlX19uYXZpZ2F0aW9uLS1wcmV2aW91cyBhJyk7XG5cdGxldCBuZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlX19uYXZpZ2F0aW9uLS1uZXh0IGEnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmROYXYpO1xuXHR9XG5cblx0ZnVuY3Rpb24ga2V5Ym9hcmROYXYoZXZlbnQpIHtcblx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdGNhc2UgMzc6XG5cdFx0XHRcdGlmIChwcmV2aW91cykge1xuXHRcdFx0XHRcdGdvVG9MaW5rKCBwcmV2aW91cy5ocmVmICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDM5OlxuXHRcdFx0XHRpZiAobmV4dCkge1xuXHRcdFx0XHRcdGdvVG9MaW5rKCBuZXh0LmhyZWYgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBnb1RvTGluayhsaW5rKSB7XG5cdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaW5rO1xuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlTmF2KGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsTmF2O1xuIiwiLyoqXG4gKiBIYW5kbGVzIG1vYmlsZSBtZW51XG4gKi9cbmxldCBtZW51ID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcicpO1xuXHRsZXQgdG9nZ2xlID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXJfX21lbnUtdG9nZ2xlJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dG9nZ2xlTWVudSgpO1xuXHRcdFx0Y2hhbmdlVGV4dCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcblx0XHRoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbC1zaXRlaGVhZGVyLS1uYXYtaXMtb3BlbicpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2hhbmdlVGV4dCgpIHtcblx0XHRpZiAodG9nZ2xlLmlubmVySFRNTCA9PSAnTWVudScpIHtcdFxuXHRcdFx0dG9nZ2xlLmlubmVySFRNTCA9ICdDbG9zZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvZ2dsZS5pbm5lckhUTUwgPSAnTWVudSc7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1lbnU7XG4iLCIvKipcbiAqIFByaW1lIExhYnNcbiAqIEpTIGZvciB0aGUgUHJpbWUgTGFicyBjYXNlIHN0dWR5LlxuICovXG5sZXQgcHJpbWVsYWJzID0gKGZ1bmN0aW9uICgpIHtcblx0Ly8gSW5pdCBjb250cm9sbGVyXG5cdGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRsZXQgcHJvYmxlbVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fcHJvYmxlbXMnKTtcblx0bGV0IHN0YW5kYXJkU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19hcy1zdGFuZGFyZCcpO1xuXHRsZXQgY2Fyb3VzZWxTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX2Nhcm91c2VsJyk7XG5cdGxldCBiYWNrc3RvcnlTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX2JhY2tzdG9yeScpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJQWN0aW9ucygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJQWN0aW9ucygpIHtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBiYWNrc3RvcnlTZWN0aW9uLCBiYWNrc3RvcnlIYW5kbGVyKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBwcm9ibGVtU2VjdGlvbiwgcHJvYmxlbUhhbmRsZXIpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIHN0YW5kYXJkU2VjdGlvbiwgc3RhbmRhcmRIYW5kbGVyKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBjYXJvdXNlbFNlY3Rpb24sIGNhcm91c2VsSGFuZGxlcik7XG5cdH1cblxuXHRmdW5jdGlvbiBiYWNrc3RvcnlIYW5kbGVyKCkge1xuXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCh7ZGVsYXk6IDF9KTtcblx0XHRsZXQgbG9nbyA9IGJhY2tzdG9yeVNlY3Rpb24ucXVlcnlTZWxlY3RvcignI3ByaW1lLWxhYnNfX2JhY2tzdG9yeV9fbG9nbycpO1xuXHRcdGxldCBidWJibGVCb3R0b20gPSBsb2dvLnF1ZXJ5U2VsZWN0b3IoJyNidWJibGVCb3R0b20nKTtcblx0XHRsZXQgYnViYmxlTWlkZGxlID0gbG9nby5xdWVyeVNlbGVjdG9yKCcjYnViYmxlTWlkZGxlJyk7XG5cdFx0bGV0IGJ1YmJsZVRvcCA9IGxvZ28ucXVlcnlTZWxlY3RvcignI2J1YmJsZVRvcCcpO1xuXG5cdFx0dGwudG8obG9nbywgMSwge29wYWNpdHk6IDEsIGVhc2U6IFBvd2VyMS5lYXNlSW59KVxuXHRcdCAgLnRvKGJ1YmJsZUJvdHRvbSwgMSwge29wYWNpdHk6IDF9LCAnYm90dG9tJylcblx0XHQgIC50byhidWJibGVNaWRkbGUsIDEsIHtvcGFjaXR5OiAxfSwgJ21pZGRsZScpXG5cdFx0ICAudG8oYnViYmxlQm90dG9tLCAxLCB7b3BhY2l0eTogMH0sICdtaWRkbGUnKVxuXHRcdCAgLnRvKGJ1YmJsZVRvcCwgMSwge29wYWNpdHk6IDF9LCAndG9wJylcblx0XHQgIC50byhidWJibGVNaWRkbGUsIDEsIHtvcGFjaXR5OiAwfSwgJ3RvcCcpXG5cdFx0ICAudG8oYnViYmxlTWlkZGxlLCAxLCB7b3BhY2l0eTogMX0sICdmaW5hbCcpXG5cdFx0ICAudG8oYnViYmxlQm90dG9tLCAxLCB7b3BhY2l0eTogMX0sICdmaW5hbCcpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2Fyb3VzZWxIYW5kbGVyKCkge1xuXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCh7ZGVsYXk6IDIsIHJlcGVhdDogMX0pO1xuXHRcdGxldCB0aXRsZSA9IGNhcm91c2VsU2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuaGVhZGluZy0xJyk7XG5cblx0XHR0bC50byh0aXRsZSwgMywge3g6ICcxNTAlJywgb3BhY2l0eTogJzAnLCBlYXNlOiBQb3dlcjEuZWFzZUluIH0pO1xuXHRcdHRsLnNldCh0aXRsZSwge3g6ICctMTUwJSd9KTtcblx0XHR0bC50byh0aXRsZSwgMywge3g6ICcwJScsIG9wYWNpdHk6ICcxJywgZWFzZTogUG93ZXIxLmVhc2VPdXQgfSk7XG5cdH1cblxuXHQvLyBBZGRzIGEgc2NlbmUgd2l0aCBwcmVkZWZpbmVkIG9wdGlvbnMgdG8gdGhlIGNvbnRyb2xsZXJcblx0ZnVuY3Rpb24gYWRkU2NlbmUoY29udHJvbGxlciwgZWxlbWVudCwgaGFuZGxlcikge1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdFx0dHJpZ2dlckVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRvZmZzZXQ6IDUwLFxuXHRcdFx0cmV2ZXJzZTogZmFsc2Vcblx0XHR9O1xuXG5cdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKG9wdGlvbnMpLm9uKCdzdGFydCcsIGhhbmRsZXIpLmFkZFRvKGNvbnRyb2xsZXIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJvYmxlbUhhbmRsZXIoKSB7XG5cdFx0cHJvYmxlbVNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncHJpbWUtbGFic19fcHJvYmxlbXMtLWlzLWFjdGl2ZScpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc3RhbmRhcmRIYW5kbGVyKCkge1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX192aWRlbycpLnBsYXkoKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpbWVsYWJzO1xuIl19
