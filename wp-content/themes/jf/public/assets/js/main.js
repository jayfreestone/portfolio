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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYXJ0aWFscy9kYXNoYm9hcmQuanMiLCJzcmMvanMvcGFydGlhbHMvZmFkZUJhY2tncm91bmRJbWFnZS5qcyIsInNyYy9qcy9wYXJ0aWFscy9mYWRlSXNIaWRkZW4uanMiLCJzcmMvanMvcGFydGlhbHMvaGVhZGVyLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7O0FBRXpELGdCQUFLLElBQUw7O0FBRUEsd0JBQWEsSUFBYjs7QUFFQSxLQUFJLFNBQVMsYUFBVCxDQUF1QixzQkFBdkIsQ0FBSixFQUFvRDtBQUNuRCxtQkFBTyxJQUFQO0FBQ0E7O0FBRUQsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBSixFQUE2QztBQUM1Qyx1QkFBVyxJQUFYO0FBQ0E7O0FBRUQsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBSixFQUEyQztBQUMxQyxzQkFBVSxJQUFWO0FBQ0E7O0FBRUQsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBSixFQUEwQztBQUN6QyxzQkFBVSxJQUFWO0FBQ0E7O0FBRUQsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsaUJBQXZCLENBQUosRUFBK0M7QUFDOUMsdUJBQVcsSUFBWDtBQUNBO0FBQ0QsQ0F6QkQ7Ozs7Ozs7OztBQ0pBOzs7Ozs7QUFFQSxJQUFJLFlBQWEsWUFBWTtBQUM1QixLQUFJLGdCQUFnQixT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SixFQUFVLFNBQVMsR0FBbkIsRUFBd0IsTUFBTSxPQUFPLE9BQXJDLEVBQWhCO0FBQ0E7OztBQUdELFVBQVMsUUFBVCxDQUFrQixVQUFsQixFQUE4QixPQUE5QixFQUF1QyxPQUF2QyxFQUFnRDtBQUMvQyxNQUFJLFVBQVU7QUFDYixtQkFBZ0IsT0FESDtBQUViLFdBQVEsRUFGSztBQUdiLFlBQVM7QUFISSxHQUFkOztBQU1BLE1BQUksWUFBWSxLQUFoQixDQUFzQixPQUF0QixFQUErQixFQUEvQixDQUFrQyxPQUFsQyxFQUEyQyxPQUEzQyxFQUFvRCxLQUFwRCxDQUEwRCxVQUExRDtBQUNBOztBQUVELFVBQVMsY0FBVCxHQUEwQjtBQUN6QixpQkFBZSxTQUFmLENBQXlCLEdBQXpCLENBQTZCLGlDQUE3QjtBQUNBOztBQUVELFVBQVMsZUFBVCxHQUEyQjtBQUMxQixXQUFTLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLElBQTdDO0FBQ0E7O0FBRUQsUUFBTztBQUNOLFFBQU07QUFEQSxFQUFQO0FBR0EsQ0FwRWdCLEVBQWpCOztrQkFzRWUsUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgcHJpbWVsYWJzIGZyb20gJy4vcGFydGlhbHMvcHJpbWVsYWJzLmpzJztcbmltcG9ydCBtZW51IGZyb20gJy4vcGFydGlhbHMvbWVudS5qcyc7XG5pbXBvcnQgaG9tZVNjcm9sbCBmcm9tICcuL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMnO1xuaW1wb3J0IGpvdXJuYWxOYXYgZnJvbSAnLi9wYXJ0aWFscy9qb3VybmFsTmF2LmpzJztcbmltcG9ydCBkYXNoYm9hcmQgZnJvbSAnLi9wYXJ0aWFscy9kYXNoYm9hcmQuanMnO1xuaW1wb3J0IGhlYWRlciBmcm9tICcuL3BhcnRpYWxzL2hlYWRlci5qcyc7XG5pbXBvcnQgZmFkZUlzSGlkZGVuIGZyb20gJy4vcGFydGlhbHMvZmFkZUlzSGlkZGVuLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblxuXHRtZW51LmluaXQoKTtcblxuXHRmYWRlSXNIaWRkZW4uaW5pdCgpO1xuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyLS13aGl0ZScpKSB7XG5cdFx0aGVhZGVyLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3JykpIHtcblx0XHRob21lU2Nyb2xsLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFicycpKSB7XG5cdFx0cHJpbWVsYWJzLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkJykpIHtcblx0XHRkYXNoYm9hcmQuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZScpKSB7XG5cdFx0am91cm5hbE5hdi5pbml0KCk7XG5cdH1cbn0pO1xuIiwiLyoqXG4gKiBEYXNoYm9hcmRcbiAqIEpTIGZvciB0aGUgRGFzaGJvYXJkIGNhc2Ugc3R1ZHkuXG4gKi9cbmltcG9ydCBmYWRlQmFja2dyb3VuZEltYWdlIGZyb20gJy4vZmFkZUJhY2tncm91bmRJbWFnZS5qcyc7XG5cbmxldCBkYXNoYm9hcmQgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgZ3JvdW5kU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2dyb3VuZHdvcmsnKTtcblx0bGV0IGRlcGxveW1lbnRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZGVwbG95bWVudCcpO1xuXHRsZXQgZGVtb1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19kZW1vJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlBY3Rpb25zKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlBY3Rpb25zKCkge1xuXHRcdC8vIEluaXQgY29udHJvbGxlclxuXHRcdGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRcdC8vIEFkZCBzY2VuZXNcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBncm91bmRTZWN0aW9uLCByZWFjdEFuaW1hdGlvbik7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgZGVwbG95bWVudFNlY3Rpb24sIHRlcm1pbmFsQW5pbWF0aW9uKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBkZW1vU2VjdGlvbiwgZGVtb0hhbmRsZXIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gdGVybWluYWxBbmltYXRpb24oKSB7XG5cdFx0bGV0IGNvZGVXaW5kb3cgPSBkZXBsb3ltZW50U2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX190ZXJtaW5hbCBjb2RlJyk7XG5cdFx0d3JpdGVTdHJpbmcoJ2NhcCBzdGFnaW5nIGRlcGxveScsIGNvZGVXaW5kb3cpO1xuXHR9XG5cblx0ZnVuY3Rpb24gd3JpdGVTdHJpbmcoc3RyaW5nVG9UeXBlLCBwbGFjZVRvVHlwZSkge1xuXHRcdGxldCBpID0gMDtcblxuXHRcdChmdW5jdGlvbiB3cml0ZUNoYXIoKSB7XG5cdFx0XHRpZiAoc3RyaW5nVG9UeXBlLmxlbmd0aCA+IGkpIHtcblx0XHRcdFx0cGxhY2VUb1R5cGUuaW5uZXJIVE1MID0gcGxhY2VUb1R5cGUuaW5uZXJIVE1MICsgc3RyaW5nVG9UeXBlW2ldO1xuXHRcdFx0XHRpKys7XG5cblx0XHRcdFx0bGV0IGRlbGF5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwMCkpICsgMTQwO1xuXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR3cml0ZUNoYXIoKTtcblx0XHRcdFx0fSwgZGVsYXkpO1xuXHRcdFx0fVxuXHRcdH0pKClcblx0fVxuXG5cdGZ1bmN0aW9uIGRlbW9IYW5kbGVyKCkge1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2RlbW8gdmlkZW8nKS5wbGF5KCk7XG5cdH1cblxuXHQvLyBBZGRzIGEgc2NlbmUgd2l0aCBwcmVkZWZpbmVkIG9wdGlvbnMgdG8gdGhlIGNvbnRyb2xsZXJcblx0ZnVuY3Rpb24gYWRkU2NlbmUoY29udHJvbGxlciwgZWxlbWVudCwgaGFuZGxlcikge1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdFx0dHJpZ2dlckVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRvZmZzZXQ6IDUwLFxuXHRcdFx0cmV2ZXJzZTogZmFsc2Vcblx0XHR9O1xuXG5cdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKG9wdGlvbnMpLm9uKCdzdGFydCcsIGhhbmRsZXIpLmFkZFRvKGNvbnRyb2xsZXIpO1xuXHR9XG5cblxuXHQvLyBSZWFjdCBMb2dvIEFuaW1hdGlvblxuXHRmdW5jdGlvbiByZWFjdEFuaW1hdGlvbigpIHtcblx0XHRsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcblxuXHRcdGxldCBsb2dvID0gZ3JvdW5kU2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdzdmcnKTtcblx0XHRsZXQgcGF0aHMgPSBBcnJheS5mcm9tKGxvZ28ucXVlcnlTZWxlY3RvckFsbCgncGF0aCcpKTtcblxuXHRcdGZvciAoY29uc3QgcGF0aCBvZiBwYXRocykge1xuXHRcdFx0c2V0RGFzaChwYXRoKTtcblx0XHR9XG5cblx0XHR0bC50byhwYXRocywgMywgeyAnc3Ryb2tlLWRhc2hvZmZzZXQnOiAwLCBvcGFjaXR5OiAnMScsIGVhc2U6IFBvd2VyMS5lYXNlSW4gfSlcblx0XHQudG8ocGF0aHMsIDEsIHsgJ2ZpbGwnOiAnIzAwZDhmZicsICdzdHJva2UnOiAnIzAwZDhmZicsIGVhc2U6IFBvd2VyMS5lYXNlSW4gfSk7XG5cdH1cblxuXHQvLyBTZXRzIERhc2ggYXJyYXkvb2Zmc2V0IG9uIGVsZW1lbnRcblx0ZnVuY3Rpb24gc2V0RGFzaChwYXRoKSB7XG5cdFx0bGV0IGxlbmd0aCA9IHBhdGguZ2V0VG90YWxMZW5ndGgoKTtcblx0XHRwYXRoLnN0eWxlWydzdHJva2UtZGFzaG9mZnNldCddID0gbGVuZ3RoO1xuXHRcdHBhdGguc3R5bGVbJ3N0cm9rZS1kYXNoYXJyYXknXSA9IGxlbmd0aDtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgZGFzaGJvYXJkO1xuIiwiLyoqXG4gKiBGYWRlcyBpbiBhIGJhY2tncm91bmQgaW1hZ2Ugb25jZSBsb2FkZWRcbiAqL1xubGV0IGZhZGVCYWNrZ3JvdW5kSW1hZ2UgPSAoZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBmYWRlKGltYWdlKSB7XG5cdFx0bGV0IGJhY2tncm91bmRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGltYWdlKVsnYmFja2dyb3VuZC1pbWFnZSddO1xuXHRcdGxldCBpbWFnZVRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuXHRcdGlmICggYmFja2dyb3VuZFN0eWxlICE9PSAnbm9uZScgKSB7XG5cdFx0XHRsZXQgYmFja2dyb3VuZEltYWdlID0gYmFja2dyb3VuZFN0eWxlLm1hdGNoKC9cXC9cXC8oW2EtejAtOTpcXC1cXC5cXC9dKykvKVswXTtcblx0XHRcdGltYWdlVGVtcC5zcmMgPSBiYWNrZ3JvdW5kSW1hZ2UucmVwbGFjZSgvXCIvZywgJycpO1xuXHRcdFx0aW1hZ2VUZW1wLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aW1hZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuLWJnJyk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aW1hZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuLWJnJyk7XG5cdFx0fVxuXG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGZhZGU6IGZhZGVcblx0fVxufSgpKTtcbmV4cG9ydCBkZWZhdWx0IGZhZGVCYWNrZ3JvdW5kSW1hZ2U7XG4iLCIvKipcbiAqIEZhZGVzIGluIGJhY2tncm91bmQgaW1hZ2VzIHdpdGggJ2lzLWhpZGRlbicgY2xhc3NcbiAqL1xuaW1wb3J0IGZhZGVCYWNrZ3JvdW5kSW1hZ2UgZnJvbSAnLi9mYWRlQmFja2dyb3VuZEltYWdlLmpzJztcblxubGV0IGZhZGVJc0hpZGRlbiA9IChmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0bGV0IGlzSGlkZGVuQWxsID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaXMtaGlkZGVuLWJnJykpO1xuXG5cdFx0Zm9yIChjb25zdCBpc0hpZGRlbiBvZiBpc0hpZGRlbkFsbCkge1xuXHRcdFx0ZmFkZUJhY2tncm91bmRJbWFnZS5mYWRlKGlzSGlkZGVuKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZmFkZUlzSGlkZGVuO1xuIiwibGV0IGhlYWRlciA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyJyk7XG5cdGxldCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUtbWFpbicpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0aWYgKG1haW4pIHtcblxuXHRcdFx0Ly8gaW5pdCBjb250cm9sbGVyXG5cdFx0XHR2YXIgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cblx0XHRcdC8vIGNyZWF0ZSBhIHNjZW5lXG5cdFx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xuXHRcdFx0XHR0cmlnZ2VyRWxlbWVudDogbWFpbixcblx0XHRcdFx0dHJpZ2dlckhvb2s6ICdvbkxlYXZlJyxcblx0XHRcdH0pLm9uKCdzdGFydCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dG9nZ2xlV2hpdGVvdXQoKTtcblxuXHRcdFx0fSlcblx0XHRcdC5hZGRUbyhjb250cm9sbGVyKTsgLy8gYXNzaWduIHRoZSBzY2VuZSB0byB0aGUgY29udHJvbGxlclxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHRvZ2dsZVdoaXRlb3V0KCkge1xuXHRcdGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdsLXNpdGVoZWFkZXItLXdoaXRlJyk7XG5cdH1cblxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgaGVhZGVyO1xuIiwiLyoqXG4gKiBIb21lIFNjcm9sbFxuICogSGFuZGxlcyB0aGUgaG9tZXBhZ2UgY2Fyb3VzZWxcbiAqL1xubGV0IGhvbWVTY3JvbGwgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgbmF2SXRlbXM7XG5cdGxldCBkZWx0YSA9IDA7XG5cdGxldCBjdXJyZW50U2xpZGU7XG5cdGxldCBuZXh0U2xpZGU7XG5cdGxldCBwcmV2aW91c1NsaWRlO1xuXHRsZXQgcHJldmlvdXNTbGlkZXM7XG5cdGxldCBpc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcblx0bGV0IGxhc3RTY3JvbGxlZDtcblx0bGV0IG1vdXNld2hlZWxDYW5TY3JvbGwgPSB0cnVlO1xuXHRsZXQgbGFzdE1vdXNld2hlZWxUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblx0bGV0IGxhc3RTY3JvbGxUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblx0bGV0IHNjcm9sbHMgPSBbXTtcblx0bGV0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctY29udGFpbmVyX19uYXYnKTtcblx0bGV0IHdvcmtTbGlkZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3JykpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0aWYgKG5hdikge1xuXHRcdFx0bmF2SXRlbXMgPSBBcnJheS5mcm9tKG5hdi5xdWVyeVNlbGVjdG9yQWxsKCdhJykpO1xuXHRcdH1cblxuXHRcdGFuaW1hdGVJbml0aWFsKCk7XG5cdFx0b2JqZWN0Rml0VGVzdCgpO1xuXHRcdHN0YXJ0Q2Fyb3VzZWwoKTtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdC8vIEFuaW1hdGVzIHRoZSBsb2FkIG9mIHRoZSBpbml0aWFsIHNsaWRlXG5cdGZ1bmN0aW9uIGFuaW1hdGVJbml0aWFsKCkge1xuXHRcdGxldCBmaXJzdFdvcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS0xJyk7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRmaXJzdFdvcmsuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuYXZJdGVtc1swXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy1jb250YWluZXJfX25hdl9faXRlbS0taXMtYWN0aXZlJyk7XG5cdFx0fSwgMjAwKTtcblx0fVxuXG5cdC8vIFRlc3RzIGlmIHdlIGNhbiB1c2UgaW1hZ2VzIG9yIGhhdmUgdG8gZmFsbCBiYWNrIHRvIGJhY2tncm91bmQgaW1hZ2VzXG5cdGZ1bmN0aW9uIG9iamVjdEZpdFRlc3QoKSB7XG5cdFx0bGV0IG9iamVjdEZpdCA9ICdvYmplY3QtZml0JyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJykuc3R5bGU7XG5cdFx0bGV0IG9iamVjdFBvc2l0aW9uID0gJ29iamVjdC1wb3NpdGlvbicgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpLnN0eWxlO1xuXG5cdFx0Ly8gSWYgdGhlIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IGVpdGhlciAod2UgbmVlZCBib3RoKVxuXHRcdGlmICghb2JqZWN0UG9zaXRpb24gfHwgIW9iamVjdEZpdCkge1xuXHRcdFx0Ly8gSGlkZSB0aGUgYWN0dWFsIGltYWdlIGFuZCBqdW1wIHRvIHRoZSBmYWxsYmFjayBcblx0XHRcdGxldCBpbWFnZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXdfX2ltYWdlLXByZWxvYWQnKSk7XG5cblx0XHRcdGZvciAoY29uc3QgaW1hZ2Ugb2YgaW1hZ2VzKSB7XG5cdFx0XHRcdGltYWdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHR9XG5cblx0XHRcdGxvYWRJbWFnZXMoKTtcblx0XHR9XG5cdH1cblxuXHQvLyBSdW5zIGxvYWRJbWFnZSBvbiB0aGUgd29yay1wcmV2aWV3IGNhcm91c2VsIGltYWdlcy5cblx0ZnVuY3Rpb24gbG9hZEltYWdlcygpIHtcblx0XHRsZXQgcHJldmlld0ltYWdlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlldycpKTtcblxuXHRcdGZvciAoIGNvbnN0IHByZXZpZXdJbWFnZSBvZiBwcmV2aWV3SW1hZ2VzICkge1xuXHRcdFx0bG9hZEltYWdlKCBwcmV2aWV3SW1hZ2UgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBEaXNwbGF5cyB0aGUgY29udGVudCBpbWFnZSBhcyBhIGJhY2tncm91bmQgaW1hZ2UuXG5cdGZ1bmN0aW9uIGxvYWRJbWFnZShpbWFnZSkge1xuXHRcdGxldCBpbWFnZUhvbGRlciA9IGltYWdlLnF1ZXJ5U2VsZWN0b3IoICcud29yay1wcmV2aWV3X19pbWFnZScgKTtcblxuXHRcdC8vIEltYWdlIGlzIGRpc3BsYXkgbm9uZVxuXHRcdGxldCBpbWFnZVByZWxvYWQgPSBpbWFnZS5xdWVyeVNlbGVjdG9yKCAnLndvcmstcHJldmlld19faW1hZ2UtcHJlbG9hZCcgKTtcblx0XHRsZXQgYmFja2dyb3VuZFN0eWxlID0gaW1hZ2VQcmVsb2FkLmN1cnJlbnRTcmMgfHwgaW1hZ2VQcmVsb2FkLnNyYztcblxuXHRcdC8vIFNlZW1zIHRvIGJlIG1vcmUgcmVsaWFibGUgdGhhbiBhdHRhY2hpbmcgZGlyZWN0bHlcblx0XHRsZXQgdG1wSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0dG1wSW1nLnNyYyA9IGJhY2tncm91bmRTdHlsZTtcblxuXHRcdHRtcEltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGZ1bmN0aW9uKCl7XG5cdFx0XHQvLyBJbWFnZSBwbGFjZWhvbGRlciBpcyBnaXZlbiBiYWNrZ3JvdW5kIGltYWdlXG5cdFx0XHRpZiAoIGJhY2tncm91bmRTdHlsZSApIHtcblx0XHRcdFx0aW1hZ2VIb2xkZXIuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcIicgKyBiYWNrZ3JvdW5kU3R5bGUgKyAnXCIpJztcblx0XHRcdFx0aW1hZ2VIb2xkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG5cdFx0XHR9XG5cdFx0fSkpO1xuXHR9XG5cblx0Ly8gQmluZHMgVUkgRXZlbnRzXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHQvLyBPbiByZXNpemUsIHJlLWV2YWx1YXRlIGlmIHdlIHNob3VsZCBzdGFydCB0aGUgSlMgY2Fyb3VzZWxcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRzdGFydENhcm91c2VsKCk7XG5cdFx0fSk7XG5cblx0XHQvLyBIb29rcyB1cCBuYXZpZ2F0aW9uXG5cdFx0Zm9yIChjb25zdCBuYXZJdGVtIG9mIG5hdkl0ZW1zKSB7XG5cdFx0XHRuYXZJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlTmF2KTtcblx0XHR9XG5cdH1cblxuXHQvLyBIb29rcyB1cCB0aGUgSlMgY2Fyb3VzZWwgaWYgd2luZG93IGlzIGFib3ZlIGEgY2VydGFpbiBoZWlnaHRcblx0ZnVuY3Rpb24gc3RhcnRDYXJvdXNlbCgpIHtcblx0XHQvLyBHZXQgdGhlIGN1cnJlbnQgcmVtIHZhbHVlXG5cdFx0bGV0IHJlbVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLmZvbnRTaXplIHx8IDE2O1xuXG5cdFx0Ly8gQXQgMzByZW0gd2Ugc3dpdGNoIHRvIHRoZSBjYXJvdXNlbCBsYXlvdXRcblx0XHRpZiAoIHdpbmRvdy5pbm5lckhlaWdodCA+ICggcmVtVmFsdWUgKiAzMCApICkge1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZE5hdik7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBzY3JvbGxOYXYpO1xuXG5cdFx0XHQvLyBTdG9wcyB0b3VjaG1vdmUgd29ya2luZyBvdXRyaWdodFxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gU2V0cyB1cCBIYW1tZXIgdG8gaGFuZGxlIHRvdWNoIGV2ZW50c1xuXHRcdFx0bGV0IHdvcmtDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LWNvbnRhaW5lcicpO1xuXHRcdFx0bGV0IHRvdWNoID0gbmV3IEhhbW1lcih3b3JrQ29udGFpbmVyKTtcblxuXHRcdFx0Ly8gRW5hYmxlcyB2ZXJ0aWNhbCBzd2lwZSBkZXRlY3Rpb25cblx0XHRcdHRvdWNoLmdldCgnc3dpcGUnKS5zZXQoeyBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fQUxMIH0pO1xuXG5cdFx0XHQvLyBHZXN0dXJlcyB0aGF0IGVxdWFsIGZvcndhcmRcblx0XHRcdHRvdWNoLm9uKCdzd2lwZXVwIHN3aXBlbGVmdCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIEdlc3R1cmVzIHRoYXQgZXF1YWwgYmFja3dhcmRzXG5cdFx0XHR0b3VjaC5vbignc3dpcGVkb3duIHN3aXBlcmlnaHQnLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBSZW1vdmUgdGhlIGxpc3RlbmVycyBpZiB0aGUgd2luZG93IGlzIHRvbyBzaG9ydFxuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZE5hdik7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBzY3JvbGxOYXYpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2V0U2Nyb2xsKCkge1xuXHRcdHNjcm9sbHMgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGxzQXZnKG9mZnNldCkge1xuXHRcdGxldCBzdW0gPSAwO1xuXG5cdFx0bGV0IGVsbXMgPSBzY3JvbGxzLnNsaWNlKE1hdGgubWF4KHNjcm9sbHMubGVuZ3RoIC0gb2Zmc2V0LCAxKSk7XG5cblx0XHRmb3IgKCBjb25zdCBlbG0gb2YgZWxtcyApIHtcblx0XHRcdHN1bSArPSBlbG07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGguY2VpbChzdW0gLyBvZmZzZXQpO1xuXHR9XG5cblxuXG5cdGZ1bmN0aW9uIGhhbmRsZU5hdihldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IHNsaWRlTnVtYmVyID0gZXZlbnQudGFyZ2V0LmlubmVySFRNTC5zdWJzdHJpbmcoMSk7XG5cblx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRnb1RvU2xpZGUoc2xpZGVOdW1iZXIpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGhpZ2hsaWdodEFjdGl2ZU5hdigpIHtcblx0XHQvLyBSZW1vdmUgdGhlIGFjdGl2ZSBjbGFzc1xuXHRcdGxldCBhY3RpdmVOYXZDbGFzcyA9ICd3b3JrLXByZXZpZXctY29udGFpbmVyX19uYXZfX2l0ZW0tLWlzLWFjdGl2ZSc7XG5cdFx0bGV0IGFjdGl2ZU5hdkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGFjdGl2ZU5hdkNsYXNzKTtcblx0XHRhY3RpdmVOYXZJdGVtLmNsYXNzTGlzdC5yZW1vdmUoYWN0aXZlTmF2Q2xhc3MpO1xuXG5cdFx0bGV0IG5leHROdW1iZXIgPSBuZXh0U2xpZGUuaWQuc3Vic3RyaW5nKG5leHRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXHRcdGNvbnNvbGUubG9nKG5leHROdW1iZXIpO1xuXG5cdFx0bmF2SXRlbXNbbmV4dE51bWJlciAtIDFdLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZChhY3RpdmVOYXZDbGFzcyk7XG5cdH1cblxuXHRmdW5jdGlvbiBnb1RvU2xpZGUoc2xpZGVOdW1iZXIpIHtcblx0XHRuZXh0U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS0nICsgc2xpZGVOdW1iZXIgKTtcblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRpZiAobmV4dFNsaWRlKSB7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXG5cdFx0XHRsZXQgY3VycmVudE51bWJlciA9IGN1cnJlbnRTbGlkZS5pZC5zdWJzdHJpbmcoY3VycmVudFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cdFx0XHRsZXQgbmV4dE51bWJlciA9IG5leHRTbGlkZS5pZC5zdWJzdHJpbmcobmV4dFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cblx0XHRcdGlmIChjdXJyZW50TnVtYmVyID4gbmV4dE51bWJlcikge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZ29pbmcgYmFja3dhcmRzJyk7XG5cdFx0XHRcdC8vIElmIHdlJ3JlIGdvaW5nIGJhY2t3YXJkc1xuXHRcdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cblx0XHRcdFx0Ly8gTmVlZCB0byBhZGQgbmV4dCB0byBBTEwgZ29pbmcgZm9yd2FyZFxuXHRcdFx0XHRsZXQgcHJldmlvdXNTbGlkZXMgPSB3b3JrU2xpZGVzLnNsaWNlKG5leHROdW1iZXIsIGN1cnJlbnROdW1iZXIgLSAxKTtcblxuXHRcdFx0XHRmb3IgKCBjb25zdCBwcmV2aW91c1NsaWRlIG9mIHByZXZpb3VzU2xpZGVzICkge1xuXHRcdFx0XHRcdHByZXZpb3VzU2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0XHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSWYgd2UncmUgZ29pbmcgZm9yd2FyZHNcblx0XHRcdFx0Y29uc29sZS5sb2coJ2dvaW5nIGZvcndhcmRzJyk7XG5cdFx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHR9XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGxOYXYoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGNvbnNvbGUubG9nKCdzY3JvbGwgZmlyZWQnKTtcblxuXHRcdGxldCBzY3JvbGxUaHJlc2hvbGQgPSA0MDtcblxuXHRcdGxldCB2YWx1ZSA9IC1lLmRlbHRhWTtcblxuXHRcdGlmIChzY3JvbGxzLmxlbmd0aCA+IDE1MCkge1xuXHRcdFx0c2Nyb2xscy5zaGlmdCgpO1xuXHRcdH1cblxuXHRcdHNjcm9sbHMucHVzaChNYXRoLmFicyh2YWx1ZSkpO1xuXG5cdFx0dmFyIGN1cnJUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuXHRcdGlmICgoY3VyclRpbWUgLSBsYXN0TW91c2V3aGVlbFRpbWUpID4gMjAwKSB7XG5cdFx0XHRyZXNldFNjcm9sbCgpO1xuXHRcdH1cblxuXHRcdGxhc3RNb3VzZXdoZWVsVGltZSA9IGN1cnJUaW1lO1xuXG5cdFx0dmFyIGxhc3RBdmcgPSBzY3JvbGxzQXZnKDUpO1xuXHRcdHZhciBtaWRBdmcgPSBzY3JvbGxzQXZnKDQwKTtcblxuXHRcdGlmIChsYXN0QXZnID4gbWlkQXZnKSB7XG5cdFx0XHRpZiAobW91c2V3aGVlbENhblNjcm9sbCAmJiBpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAodmFsdWUgPCAwKSB7XG5cdFx0XHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBrZXlib2FyZE5hdihldmVudCkge1xuXHRcdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRcdGNhc2UgMzg6XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgNDA6XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2V0VHJhbnNpdGlvbmluZygpIHtcblx0XHRpc1RyYW5zaXRpb25pbmcgPSB0cnVlO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGlzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXHRcdH0sIDEwMDApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYWR2YW5jZVNsaWRlKCkge1xuXG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdG5leHRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLW5leHQnKTtcblxuXHRcdGlmIChuZXh0U2xpZGUpIHtcblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblx0XG5cdGZ1bmN0aW9uIHJlZ3Jlc3NTbGlkZSgpIHtcblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0cHJldmlvdXNTbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdHByZXZpb3VzU2xpZGUgPSBwcmV2aW91c1NsaWRlc1twcmV2aW91c1NsaWRlcy5sZW5ndGggLSAxXTtcblxuXHRcdGlmIChwcmV2aW91c1NsaWRlKSB7XG5cdFx0XHQvLyBTZXRzIG5leHQgYWN0dWFsIHNsaWRlIChub3QgY2hyb25vbG9naWNhbGx5KSB0byBwcmV2aW91cyBzbGlkZVxuXHRcdFx0bmV4dFNsaWRlID0gcHJldmlvdXNTbGlkZTtcblxuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGhvbWVTY3JvbGw7XG4iLCIvKipcbiAqIEFsbG93cyBmb3IgbGVmdC9yaWdodCBuYXZpZ2F0aW9uIGluIGpvdXJuYWxcbiAqL1xubGV0IGpvdXJuYWxOYXYgPSAoZnVuY3Rpb24oKSB7XG5cdGxldCBwcmV2aW91cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZV9fbmF2aWdhdGlvbi0tcHJldmlvdXMgYScpO1xuXHRsZXQgbmV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZV9fbmF2aWdhdGlvbi0tbmV4dCBhJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkTmF2KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGtleWJvYXJkTmF2KGV2ZW50KSB7XG5cdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRjYXNlIDM3OlxuXHRcdFx0XHRpZiAocHJldmlvdXMpIHtcblx0XHRcdFx0XHRnb1RvTGluayggcHJldmlvdXMuaHJlZiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzOTpcblx0XHRcdFx0aWYgKG5leHQpIHtcblx0XHRcdFx0XHRnb1RvTGluayggbmV4dC5ocmVmICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gZ29Ub0xpbmsobGluaykge1xuXHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbGluaztcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZU5hdihldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgam91cm5hbE5hdjtcbiIsIi8qKlxuICogSGFuZGxlcyBtb2JpbGUgbWVudVxuICovXG5sZXQgbWVudSA9IChmdW5jdGlvbigpIHtcblx0bGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXInKTtcblx0bGV0IHRvZ2dsZSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyX19tZW51LXRvZ2dsZScpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0dG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRvZ2dsZU1lbnUoKTtcblx0XHRcdGNoYW5nZVRleHQoKTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XG5cdFx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2wtc2l0ZWhlYWRlci0tbmF2LWlzLW9wZW4nKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZVRleHQoKSB7XG5cdFx0aWYgKHRvZ2dsZS5pbm5lckhUTUwgPT0gJ01lbnUnKSB7XHRcblx0XHRcdHRvZ2dsZS5pbm5lckhUTUwgPSAnQ2xvc2UnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0b2dnbGUuaW5uZXJIVE1MID0gJ01lbnUnO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBtZW51O1xuIiwiLyoqXG4gKiBQcmltZSBMYWJzXG4gKiBKUyBmb3IgdGhlIFByaW1lIExhYnMgY2FzZSBzdHVkeS5cbiAqL1xubGV0IHByaW1lbGFicyA9IChmdW5jdGlvbiAoKSB7XG5cdC8vIEluaXQgY29udHJvbGxlclxuXHRsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cblx0bGV0IHByb2JsZW1TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3Byb2JsZW1zJyk7XG5cdGxldCBzdGFuZGFyZFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fYXMtc3RhbmRhcmQnKTtcblx0bGV0IGNhcm91c2VsU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19jYXJvdXNlbCcpO1xuXHRsZXQgYmFja3N0b3J5U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19iYWNrc3RvcnknKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUFjdGlvbnMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUFjdGlvbnMoKSB7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgYmFja3N0b3J5U2VjdGlvbiwgYmFja3N0b3J5SGFuZGxlcik7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgcHJvYmxlbVNlY3Rpb24sIHByb2JsZW1IYW5kbGVyKTtcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBzdGFuZGFyZFNlY3Rpb24sIHN0YW5kYXJkSGFuZGxlcik7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgY2Fyb3VzZWxTZWN0aW9uLCBjYXJvdXNlbEhhbmRsZXIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmFja3N0b3J5SGFuZGxlcigpIHtcblx0XHRsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoe2RlbGF5OiAxfSk7XG5cdFx0bGV0IGxvZ28gPSBiYWNrc3RvcnlTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJyNwcmltZS1sYWJzX19iYWNrc3RvcnlfX2xvZ28nKTtcblx0XHRsZXQgYnViYmxlQm90dG9tID0gbG9nby5xdWVyeVNlbGVjdG9yKCcjYnViYmxlQm90dG9tJyk7XG5cdFx0bGV0IGJ1YmJsZU1pZGRsZSA9IGxvZ28ucXVlcnlTZWxlY3RvcignI2J1YmJsZU1pZGRsZScpO1xuXHRcdGxldCBidWJibGVUb3AgPSBsb2dvLnF1ZXJ5U2VsZWN0b3IoJyNidWJibGVUb3AnKTtcblxuXHRcdHRsLnRvKGxvZ28sIDEsIHtvcGFjaXR5OiAxLCBlYXNlOiBQb3dlcjEuZWFzZUlufSlcblx0XHQgIC50byhidWJibGVCb3R0b20sIDEsIHtvcGFjaXR5OiAxfSwgJ2JvdHRvbScpXG5cdFx0ICAudG8oYnViYmxlTWlkZGxlLCAxLCB7b3BhY2l0eTogMX0sICdtaWRkbGUnKVxuXHRcdCAgLnRvKGJ1YmJsZUJvdHRvbSwgMSwge29wYWNpdHk6IDB9LCAnbWlkZGxlJylcblx0XHQgIC50byhidWJibGVUb3AsIDEsIHtvcGFjaXR5OiAxfSwgJ3RvcCcpXG5cdFx0ICAudG8oYnViYmxlTWlkZGxlLCAxLCB7b3BhY2l0eTogMH0sICd0b3AnKVxuXHRcdCAgLnRvKGJ1YmJsZU1pZGRsZSwgMSwge29wYWNpdHk6IDF9LCAnZmluYWwnKVxuXHRcdCAgLnRvKGJ1YmJsZUJvdHRvbSwgMSwge29wYWNpdHk6IDF9LCAnZmluYWwnKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNhcm91c2VsSGFuZGxlcigpIHtcblx0XHRsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoe2RlbGF5OiAyLCByZXBlYXQ6IDF9KTtcblx0XHRsZXQgdGl0bGUgPSBjYXJvdXNlbFNlY3Rpb24ucXVlcnlTZWxlY3RvcignLmhlYWRpbmctMScpO1xuXG5cdFx0dGwudG8odGl0bGUsIDMsIHt4OiAnMTUwJScsIG9wYWNpdHk6ICcwJywgZWFzZTogUG93ZXIxLmVhc2VJbiB9KTtcblx0XHR0bC5zZXQodGl0bGUsIHt4OiAnLTE1MCUnfSk7XG5cdFx0dGwudG8odGl0bGUsIDMsIHt4OiAnMCUnLCBvcGFjaXR5OiAnMScsIGVhc2U6IFBvd2VyMS5lYXNlT3V0IH0pO1xuXHR9XG5cblx0Ly8gQWRkcyBhIHNjZW5lIHdpdGggcHJlZGVmaW5lZCBvcHRpb25zIHRvIHRoZSBjb250cm9sbGVyXG5cdGZ1bmN0aW9uIGFkZFNjZW5lKGNvbnRyb2xsZXIsIGVsZW1lbnQsIGhhbmRsZXIpIHtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdHRyaWdnZXJFbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0b2Zmc2V0OiA1MCxcblx0XHRcdHJldmVyc2U6IGZhbHNlXG5cdFx0fTtcblxuXHRcdG5ldyBTY3JvbGxNYWdpYy5TY2VuZShvcHRpb25zKS5vbignc3RhcnQnLCBoYW5kbGVyKS5hZGRUbyhjb250cm9sbGVyKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHByb2JsZW1IYW5kbGVyKCkge1xuXHRcdHByb2JsZW1TZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3ByaW1lLWxhYnNfX3Byb2JsZW1zLS1pcy1hY3RpdmUnKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHN0YW5kYXJkSGFuZGxlcigpIHtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fdmlkZW8nKS5wbGF5KCk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IHByaW1lbGFicztcbiJdfQ==
