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
		var isHidden = document.querySelectorAll('.is-hidden-bg');

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
		var previewImages = document.querySelectorAll('.work-preview');

		for (var i = 0; i < previewImages.length; i++) {
			loadImage(previewImages[i]);
		}

		// Re-evaluate image sizes
		// window.addEventListener('resize', function() {
		// loadImages();
		// });
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

		for (var i = 0; i < elms.length; i++) {
			sum += elms[i];
		}

		return Math.ceil(sum / offset);
	}

	function animateInitial() {
		var firstWork = document.querySelector('.work-preview--1');
		// fadeBackgroundImage(firstWork.querySelector('.work-preview__image'));

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
}(); // import objectFitImages from 'object-fit-images';


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
	var standardSection = document.querySelector('.prime-labs__section--as-standard');
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
		problemSection.classList.add('prime-labs__section--problems--is-active');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYXJ0aWFscy9kYXNoYm9hcmQuanMiLCJzcmMvanMvcGFydGlhbHMvZmFkZUJhY2tncm91bmRJbWFnZS5qcyIsInNyYy9qcy9wYXJ0aWFscy9mYWRlSXNIaWRkZW4uanMiLCJzcmMvanMvcGFydGlhbHMvaGVhZGVyLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFDekQsZ0JBQUssSUFBTCxHQUR5RDs7QUFHekQsd0JBQWEsSUFBYixHQUh5RDs7QUFLekQsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsc0JBQXZCLENBQUosRUFBb0Q7QUFDbkQsbUJBQU8sSUFBUCxHQURtRDtFQUFwRDs7QUFJQSxLQUFJLFNBQVMsYUFBVCxDQUF1QixlQUF2QixDQUFKLEVBQTZDO0FBQzVDLHVCQUFXLElBQVgsR0FENEM7RUFBN0M7O0FBSUEsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBSixFQUEyQztBQUMxQyxzQkFBVSxJQUFWLEdBRDBDO0VBQTNDOztBQUlBLEtBQUksU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQUosRUFBMEM7QUFDekMsc0JBQVUsSUFBVixHQUR5QztFQUExQzs7QUFJQSxLQUFJLFNBQVMsYUFBVCxDQUF1QixpQkFBdkIsQ0FBSixFQUErQztBQUM5Qyx1QkFBVyxJQUFYLEdBRDhDO0VBQS9DO0NBckI2QyxDQUE5Qzs7Ozs7Ozs7O0FDUkE7Ozs7OztBQUVBLElBQUksWUFBYSxZQUFZO0FBQzVCLEtBQUksZ0JBQWdCLFNBQVMsYUFBVCxDQUF1Qix3QkFBdkIsQ0FBaEIsQ0FEd0I7QUFFNUIsS0FBSSxvQkFBb0IsU0FBUyxhQUFULENBQXVCLHdCQUF2QixDQUFwQixDQUZ3Qjs7QUFJNUIsVUFBUyxJQUFULEdBQWdCO0FBQ2Ysa0JBRGU7RUFBaEI7O0FBSUEsVUFBUyxhQUFULEdBQXlCOztBQUV4QixNQUFJLGFBQWEsSUFBSSxZQUFZLFVBQVosRUFBakI7OztBQUZvQixVQUt4QixDQUFTLFVBQVQsRUFBcUIsYUFBckIsRUFBb0MsY0FBcEMsRUFMd0I7QUFNeEIsV0FBUyxVQUFULEVBQXFCLGlCQUFyQixFQUF3QyxpQkFBeEMsRUFOd0I7RUFBekI7O0FBU0EsVUFBUyxpQkFBVCxHQUE2QjtBQUM1QixNQUFJLGFBQWEsa0JBQWtCLGFBQWxCLENBQWdDLDJCQUFoQyxDQUFiOzs7OztBQUR3QixhQU01QixDQUFZLG9CQUFaLEVBQWtDLFVBQWxDLEVBTjRCO0VBQTdCOztBQVVBLFVBQVMsV0FBVCxDQUFxQixZQUFyQixFQUFtQyxXQUFuQyxFQUFnRDtBQUMvQyxNQUFJLElBQUksQ0FBSixDQUQyQzs7QUFHL0MsR0FBQyxTQUFTLFNBQVQsR0FBcUI7QUFDckIsT0FBSSxhQUFhLE1BQWIsR0FBc0IsQ0FBdEIsRUFBeUI7QUFDNUIsZ0JBQVksU0FBWixHQUF3QixZQUFZLFNBQVosR0FBd0IsYUFBYSxDQUFiLENBQXhCLENBREk7QUFFNUIsUUFGNEI7O0FBSTVCLFFBQUksUUFBUSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBaUIsR0FBakIsQ0FBWCxHQUFvQyxHQUFwQyxDQUpnQjs7QUFNNUIsZUFBVyxZQUFVO0FBQ3BCLGlCQURvQjtLQUFWLEVBRVIsS0FGSCxFQU40QjtJQUE3QjtHQURBLENBQUQsR0FIK0M7RUFBaEQ7OztBQTNCNEIsVUE2Q25CLFFBQVQsQ0FBa0IsVUFBbEIsRUFBOEIsT0FBOUIsRUFBdUMsT0FBdkMsRUFBZ0Q7QUFDL0MsTUFBSSxVQUFVO0FBQ2IsbUJBQWdCLE9BQWhCO0FBQ0EsV0FBUSxFQUFSO0FBQ0EsWUFBUyxLQUFUO0dBSEcsQ0FEMkM7O0FBTy9DLE1BQUksWUFBWSxLQUFaLENBQWtCLE9BQXRCLEVBQStCLEVBQS9CLENBQWtDLE9BQWxDLEVBQTJDLE9BQTNDLEVBQW9ELEtBQXBELENBQTBELFVBQTFELEVBUCtDO0VBQWhEOzs7QUE3QzRCLFVBeURuQixjQUFULEdBQTBCO0FBQ3pCLE1BQUksS0FBSyxJQUFJLFdBQUosRUFBTCxDQURxQjs7QUFHekIsTUFBSSxPQUFPLGNBQWMsYUFBZCxDQUE0QixLQUE1QixDQUFQLENBSHFCO0FBSXpCLE1BQUksUUFBUSxLQUFLLGdCQUFMLENBQXNCLE1BQXRCLENBQVIsQ0FKcUI7O0FBTXpCLE9BQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLE1BQU0sTUFBTixFQUFjLEdBQWxDLEVBQXdDO0FBQ3ZDLFdBQVEsTUFBTSxDQUFOLENBQVIsRUFEdUM7R0FBeEM7O0FBSUEsS0FBRyxFQUFILENBQU0sS0FBTixFQUFhLENBQWIsRUFBZ0IsRUFBRSxxQkFBcUIsQ0FBckIsRUFBd0IsU0FBUyxHQUFULEVBQWMsTUFBTSxPQUFPLE1BQVAsRUFBOUQsRUFDQyxFQURELENBQ0ksS0FESixFQUNXLENBRFgsRUFDYyxFQUFFLFFBQVEsU0FBUixFQUFtQixVQUFVLFNBQVYsRUFBcUIsTUFBTSxPQUFPLE1BQVAsRUFEOUQsRUFWeUI7RUFBMUI7OztBQXpENEIsVUF3RW5CLE9BQVQsQ0FBaUIsSUFBakIsRUFBdUI7QUFDdEIsTUFBSSxTQUFTLEtBQUssY0FBTCxFQUFULENBRGtCO0FBRXRCLE9BQUssS0FBTCxDQUFXLG1CQUFYLElBQWtDLE1BQWxDLENBRnNCO0FBR3RCLE9BQUssS0FBTCxDQUFXLGtCQUFYLElBQWlDLE1BQWpDLENBSHNCO0VBQXZCOztBQU1BLFFBQU87QUFDTixRQUFNLElBQU47RUFERCxDQTlFNEI7Q0FBWixFQUFiOztrQkFtRlc7Ozs7Ozs7Ozs7O0FDbEZmLElBQUksc0JBQXVCLFlBQVk7QUFDdEMsVUFBUyxJQUFULENBQWMsS0FBZCxFQUFxQjtBQUNwQixNQUFJLGtCQUFrQixPQUFPLGdCQUFQLENBQXdCLEtBQXhCLEVBQStCLGtCQUEvQixDQUFsQixDQURnQjtBQUVwQixNQUFJLFlBQVksU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVosQ0FGZ0I7O0FBSXBCLE1BQUssb0JBQW9CLE1BQXBCLEVBQTZCO0FBQ2pDLE9BQUksa0JBQWtCLGdCQUFnQixLQUFoQixDQUFzQix3QkFBdEIsRUFBZ0QsQ0FBaEQsQ0FBbEIsQ0FENkI7QUFFakMsYUFBVSxHQUFWLEdBQWdCLGdCQUFnQixPQUFoQixDQUF3QixJQUF4QixFQUE4QixFQUE5QixDQUFoQixDQUZpQztBQUdqQyxhQUFVLGdCQUFWLENBQTJCLE1BQTNCLEVBQW1DLFlBQVc7QUFDN0MsVUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLGNBQXZCLEVBRDZDO0lBQVgsQ0FBbkMsQ0FIaUM7R0FBbEMsTUFNTztBQUNOLFNBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixjQUF2QixFQURNO0dBTlA7RUFKRDs7QUFnQkEsUUFBTztBQUNOLFFBQU0sSUFBTjtFQURELENBakJzQztDQUFaLEVBQXZCO2tCQXFCVzs7Ozs7Ozs7O0FDckJmOzs7Ozs7QUFFQSxJQUFJLGVBQWUsWUFBYTtBQUMvQixVQUFTLElBQVQsR0FBZ0I7QUFDZixNQUFJLFdBQVcsU0FBUyxnQkFBVCxDQUEwQixlQUExQixDQUFYLENBRFc7O0FBR2YsT0FBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksU0FBUyxNQUFULEVBQWlCLEdBQXJDLEVBQTBDO0FBQ3pDLGlDQUFvQixJQUFwQixDQUF5QixTQUFTLENBQVQsQ0FBekIsRUFEeUM7R0FBMUM7RUFIRDs7QUFRQSxRQUFPO0FBQ04sUUFBTSxJQUFOO0VBREQsQ0FUK0I7Q0FBWixFQUFoQjs7Ozs7a0JBY1c7Ozs7Ozs7O0FDbkJmLElBQUksU0FBVSxZQUFZO0FBQ3pCLEtBQUksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBVCxDQURxQjtBQUV6QixLQUFJLE9BQU8sU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQVAsQ0FGcUI7O0FBSXpCLFVBQVMsSUFBVCxHQUFnQjtBQUNmLE1BQUksSUFBSixFQUFVOzs7QUFHVCxPQUFJLGFBQWEsSUFBSSxZQUFZLFVBQVosRUFBakI7OztBQUhLLE9BTUwsWUFBWSxLQUFaLENBQWtCO0FBQ3JCLG9CQUFnQixJQUFoQjtBQUNBLGlCQUFhLFNBQWI7SUFGRCxFQUdHLEVBSEgsQ0FHTSxPQUhOLEVBR2UsWUFBWTtBQUMxQixxQkFEMEI7SUFBWixDQUhmLENBT0MsS0FQRCxDQU9PLFVBUFA7QUFOUyxHQUFWO0VBREQ7O0FBa0JBLFVBQVMsY0FBVCxHQUEwQjtBQUN6QixTQUFPLFNBQVAsQ0FBaUIsTUFBakIsQ0FBd0IscUJBQXhCLEVBRHlCO0VBQTFCOztBQUtBLFFBQU87QUFDTixRQUFNLElBQU47RUFERCxDQTNCeUI7Q0FBWixFQUFWOztrQkFnQ1c7Ozs7Ozs7OztBQy9CZjs7Ozs7O0FBRUEsSUFBSSxhQUFjLFlBQVk7QUFDN0IsS0FBSSxpQkFBSixDQUQ2QjtBQUU3QixLQUFJLFFBQVEsQ0FBUixDQUZ5QjtBQUc3QixLQUFJLHFCQUFKLENBSDZCO0FBSTdCLEtBQUksa0JBQUosQ0FKNkI7QUFLN0IsS0FBSSxzQkFBSixDQUw2QjtBQU03QixLQUFJLHVCQUFKLENBTjZCO0FBTzdCLEtBQUksa0JBQWtCLEtBQWxCLENBUHlCO0FBUTdCLEtBQUkscUJBQUosQ0FSNkI7QUFTN0IsS0FBSSxzQkFBc0IsSUFBdEIsQ0FUeUI7QUFVN0IsS0FBSSxxQkFBcUIsSUFBSyxJQUFKLEVBQUQsQ0FBYSxPQUFiLEVBQXJCLENBVnlCO0FBVzdCLEtBQUksaUJBQWlCLElBQUssSUFBSixFQUFELENBQWEsT0FBYixFQUFqQixDQVh5QjtBQVk3QixLQUFJLFVBQVUsRUFBVixDQVp5QjtBQWE3QixLQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLDhCQUF2QixDQUFOLENBYnlCO0FBYzdCLEtBQUksYUFBYSxNQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0IsSUFBdEIsQ0FBMkIsU0FBUyxnQkFBVCxDQUEwQixlQUExQixDQUEzQixDQUFiLENBZHlCOztBQWdCN0IsVUFBUyxJQUFULEdBQWdCO0FBQ2YsTUFBSSxHQUFKLEVBQVM7QUFDUixjQUFXLElBQUksZ0JBQUosQ0FBcUIsR0FBckIsQ0FBWCxDQURRO0dBQVQ7O0FBSUEsbUJBTGU7QUFNZixpQkFOZTtBQU9mLGtCQVBlO0VBQWhCOztBQVVBLFVBQVMsYUFBVCxHQUF5QjtBQUN4QixNQUFJLFlBQVksZ0JBQWdCLFNBQVMsYUFBVCxDQUF1QixHQUF2QixFQUE0QixLQUE1QixDQURSO0FBRXhCLE1BQUksaUJBQWlCLHFCQUFxQixTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsRUFBNEIsS0FBNUI7OztBQUZsQixNQUtwQixDQUFDLFNBQUQsSUFBYyxDQUFDLGNBQUQsRUFBaUI7O0FBRWxDLFlBQVMsYUFBVCxDQUF1Qiw4QkFBdkIsRUFBdUQsS0FBdkQsQ0FBNkQsT0FBN0QsR0FBdUUsTUFBdkUsQ0FGa0M7QUFHbEMsZ0JBSGtDO0dBQW5DO0VBTEQ7OztBQTFCNkIsVUF1Q3BCLFVBQVQsR0FBc0I7QUFDckIsTUFBSSxnQkFBZ0IsU0FBUyxnQkFBVCxDQUEwQixlQUExQixDQUFoQixDQURpQjs7QUFHckIsT0FBTSxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksY0FBYyxNQUFkLEVBQXNCLEdBQTNDLEVBQWlEO0FBQ2hELGFBQVcsY0FBYyxDQUFkLENBQVgsRUFEZ0Q7R0FBakQ7Ozs7OztBQUhxQixFQUF0Qjs7O0FBdkM2QixVQXFEcEIsU0FBVCxDQUFtQixLQUFuQixFQUEwQjtBQUN6QixNQUFJLGNBQWMsTUFBTSxhQUFOLENBQXFCLHNCQUFyQixDQUFkOzs7QUFEcUIsTUFJckIsZUFBZSxNQUFNLGFBQU4sQ0FBcUIsOEJBQXJCLENBQWYsQ0FKcUI7QUFLekIsTUFBSSxrQkFBa0IsYUFBYSxVQUFiOzs7QUFMRyxNQVFyQixTQUFTLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFULENBUnFCO0FBU3pCLFNBQU8sR0FBUCxHQUFhLGVBQWIsQ0FUeUI7O0FBV3pCLFNBQU8sZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBaUMsWUFBVTs7QUFFMUMsT0FBSyxlQUFMLEVBQXVCO0FBQ3RCLGdCQUFZLEtBQVosQ0FBa0IsZUFBbEIsR0FBb0MsVUFBVSxlQUFWLEdBQTRCLElBQTVCLENBRGQ7QUFFdEIsZ0JBQVksU0FBWixDQUFzQixNQUF0QixDQUE2QixXQUE3QixFQUZzQjtJQUF2QjtHQUZnQyxDQUFqQyxDQVh5QjtFQUExQjs7QUFvQkEsVUFBUyxXQUFULEdBQXVCO0FBQ3RCLFlBQVUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxFQUEyQyxDQUEzQyxFQUE4QyxDQUE5QyxFQUFpRCxDQUFqRCxFQUFvRCxDQUFwRCxFQUF1RCxDQUF2RCxFQUEwRCxDQUExRCxFQUE2RCxDQUE3RCxFQUFnRSxDQUFoRSxDQUFWLENBRHNCO0VBQXZCOztBQUlBLFVBQVMsVUFBVCxDQUFvQixNQUFwQixFQUE0QjtBQUMzQixNQUFJLE1BQU0sQ0FBTixDQUR1Qjs7QUFHM0IsTUFBSSxPQUFPLFFBQVEsS0FBUixDQUFjLEtBQUssR0FBTCxDQUFTLFFBQVEsTUFBUixHQUFpQixNQUFqQixFQUF5QixDQUFsQyxDQUFkLENBQVAsQ0FIdUI7O0FBSzNCLE9BQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssTUFBTCxFQUFhLEdBQWpDLEVBQXNDO0FBQ3JDLFVBQU8sS0FBSyxDQUFMLENBQVAsQ0FEcUM7R0FBdEM7O0FBSUEsU0FBTyxLQUFLLElBQUwsQ0FBVSxNQUFNLE1BQU4sQ0FBakIsQ0FUMkI7RUFBNUI7O0FBWUEsVUFBUyxjQUFULEdBQTBCO0FBQ3pCLE1BQUksWUFBWSxTQUFTLGFBQVQsQ0FBdUIsa0JBQXZCLENBQVo7OztBQURxQixZQUl6QixDQUFXLFlBQVU7QUFDcEIsYUFBVSxTQUFWLENBQW9CLEdBQXBCLENBQXdCLHVCQUF4QixFQURvQjtBQUVwQixZQUFTLENBQVQsRUFBWSxVQUFaLENBQXVCLFNBQXZCLENBQWlDLEdBQWpDLENBQXFDLDhDQUFyQyxFQUZvQjtHQUFWLEVBR1IsR0FISCxFQUp5QjtFQUExQjs7QUFVQSxVQUFTLFlBQVQsR0FBd0I7QUFDdkIsU0FBTyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxXQUFuQyxFQUR1QjtBQUV2QixTQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFNBQWpDOzs7QUFGdUIsUUFLdkIsQ0FBTyxnQkFBUCxDQUF3QixXQUF4QixFQUFxQyxVQUFTLEtBQVQsRUFBZ0I7QUFDcEQsU0FBTSxjQUFOLEdBRG9EO0dBQWhCLENBQXJDOzs7QUFMdUIsTUFVbkIsZ0JBQWdCLFNBQVMsYUFBVCxDQUF1Qix5QkFBdkIsQ0FBaEIsQ0FWbUI7QUFXdkIsTUFBSSxRQUFRLElBQUksTUFBSixDQUFXLGFBQVgsQ0FBUjs7O0FBWG1CLE9BY3ZCLENBQU0sR0FBTixDQUFVLE9BQVYsRUFBbUIsR0FBbkIsQ0FBdUIsRUFBRSxXQUFXLE9BQU8sYUFBUCxFQUFwQzs7O0FBZHVCLE9BaUJ2QixDQUFNLEVBQU4sQ0FBUyxtQkFBVCxFQUE4QixZQUFVO0FBQ3ZDLE9BQUksbUJBQW1CLEtBQW5CLEVBQTBCO0FBQzdCLG1CQUQ2QjtJQUE5QjtHQUQ2QixDQUE5Qjs7O0FBakJ1QixPQXdCdkIsQ0FBTSxFQUFOLENBQVMsc0JBQVQsRUFBaUMsWUFBVTtBQUMxQyxPQUFJLG1CQUFtQixLQUFuQixFQUEwQjtBQUM3QixtQkFENkI7SUFBOUI7R0FEZ0MsQ0FBakM7OztBQXhCdUIsT0ErQmxCLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxTQUFTLE1BQVQsRUFBaUIsR0FBckMsRUFBMEM7QUFDekMsWUFBUyxDQUFULEVBQVksZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsU0FBdEMsRUFEeUM7R0FBMUM7RUEvQkQ7O0FBdUNBLFVBQVMsU0FBVCxDQUFtQixLQUFuQixFQUEwQjtBQUN6QixRQUFNLGNBQU4sR0FEeUI7QUFFekIsTUFBSSxjQUFjLE1BQU0sTUFBTixDQUFhLFNBQWIsQ0FBdUIsU0FBdkIsQ0FBaUMsQ0FBakMsQ0FBZCxDQUZxQjs7QUFJekIsTUFBSSxtQkFBbUIsS0FBbkIsRUFBMEI7QUFDN0IsYUFBVSxXQUFWLEVBRDZCO0dBQTlCO0VBSkQ7O0FBU0EsVUFBUyxrQkFBVCxHQUE4Qjs7QUFFN0IsTUFBSSxpQkFBaUIsOENBQWpCLENBRnlCO0FBRzdCLE1BQUksZ0JBQWdCLFNBQVMsYUFBVCxDQUF1QixNQUFNLGNBQU4sQ0FBdkMsQ0FIeUI7QUFJN0IsZ0JBQWMsU0FBZCxDQUF3QixNQUF4QixDQUErQixjQUEvQixFQUo2Qjs7QUFNN0IsTUFBSSxhQUFhLFVBQVUsRUFBVixDQUFhLFNBQWIsQ0FBdUIsVUFBVSxFQUFWLENBQWEsTUFBYixHQUFxQixDQUFyQixDQUFwQyxDQU55QjtBQU83QixVQUFRLEdBQVIsQ0FBWSxVQUFaLEVBUDZCOztBQVM3QixXQUFTLGFBQWEsQ0FBYixDQUFULENBQXlCLFVBQXpCLENBQW9DLFNBQXBDLENBQThDLEdBQTlDLENBQWtELGNBQWxELEVBVDZCO0VBQTlCOztBQVlBLFVBQVMsU0FBVCxDQUFtQixXQUFuQixFQUFnQztBQUMvQixjQUFZLFNBQVMsYUFBVCxDQUF1QixvQkFBb0IsV0FBcEIsQ0FBbkMsQ0FEK0I7QUFFL0IsaUJBQWUsU0FBUyxhQUFULENBQXVCLHdCQUF2QixDQUFmLENBRitCOztBQUkvQixNQUFJLFNBQUosRUFBZTtBQUNkLHdCQURjO0FBRWQsd0JBRmM7O0FBSWQsT0FBSSxnQkFBZ0IsYUFBYSxFQUFiLENBQWdCLFNBQWhCLENBQTBCLGFBQWEsRUFBYixDQUFnQixNQUFoQixHQUF3QixDQUF4QixDQUExQyxDQUpVO0FBS2QsT0FBSSxhQUFhLFVBQVUsRUFBVixDQUFhLFNBQWIsQ0FBdUIsVUFBVSxFQUFWLENBQWEsTUFBYixHQUFxQixDQUFyQixDQUFwQyxDQUxVOztBQU9kLE9BQUksZ0JBQWdCLFVBQWhCLEVBQTRCO0FBQy9CLFlBQVEsR0FBUixDQUFZLGlCQUFaOztBQUQrQixnQkFHL0IsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLG9CQUEzQjs7O0FBSCtCLFFBTTNCLGtCQUFpQixXQUFXLEtBQVgsQ0FBaUIsVUFBakIsRUFBNkIsZ0JBQWdCLENBQWhCLENBQTlDLENBTjJCOztBQVEvQixTQUFNLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxnQkFBZSxNQUFmLEVBQXVCLEdBQTVDLEVBQWtEO0FBQ2pELHFCQUFlLENBQWYsRUFBa0IsU0FBbEIsQ0FBNEIsR0FBNUIsQ0FBZ0Msb0JBQWhDLEVBRGlEO0FBRWpELHFCQUFlLENBQWYsRUFBa0IsU0FBbEIsQ0FBNEIsTUFBNUIsQ0FBbUMsd0JBQW5DLEVBRmlEO0tBQWxEO0lBUkQsTUFhTzs7QUFFTixZQUFRLEdBQVIsQ0FBWSxnQkFBWixFQUZNO0FBR04saUJBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQix3QkFBM0IsRUFITTtJQWJQOztBQW1CQSxnQkFBYSxTQUFiLENBQXVCLE1BQXZCLENBQThCLHVCQUE5QixFQTFCYztBQTJCZCxhQUFVLFNBQVYsQ0FBb0IsR0FBcEIsQ0FBd0IsdUJBQXhCLEVBM0JjO0FBNEJkLGFBQVUsU0FBVixDQUFvQixNQUFwQixDQUEyQixvQkFBM0IsRUE1QmM7R0FBZjtFQUpEOztBQW9DQSxVQUFTLFNBQVQsQ0FBbUIsQ0FBbkIsRUFBc0I7QUFDckIsSUFBRSxjQUFGLEdBRHFCOztBQUdyQixNQUFJLGtCQUFrQixFQUFsQixDQUhpQjs7QUFLckIsTUFBSSxRQUFRLENBQUMsRUFBRSxNQUFGLENBTFE7O0FBT3JCLE1BQUksUUFBUSxNQUFSLEdBQWlCLEdBQWpCLEVBQXNCO0FBQ3pCLFdBQVEsS0FBUixHQUR5QjtHQUExQjs7QUFJQSxVQUFRLElBQVIsQ0FBYSxLQUFLLEdBQUwsQ0FBUyxLQUFULENBQWIsRUFYcUI7O0FBYXJCLE1BQUksV0FBVyxJQUFLLElBQUosRUFBRCxDQUFhLE9BQWIsRUFBWCxDQWJpQjs7QUFlckIsTUFBSSxRQUFDLEdBQVcsa0JBQVgsR0FBaUMsR0FBbEMsRUFBdUM7QUFDMUMsaUJBRDBDO0dBQTNDOztBQUlBLHVCQUFxQixRQUFyQixDQW5CcUI7O0FBcUJyQixNQUFJLFVBQVUsV0FBVyxDQUFYLENBQVYsQ0FyQmlCO0FBc0JyQixNQUFJLFNBQVMsV0FBVyxFQUFYLENBQVQsQ0F0QmlCOztBQXdCckIsTUFBSSxVQUFVLE1BQVYsRUFBa0I7QUFDckIsT0FBSSx1QkFBdUIsbUJBQW1CLEtBQW5CLEVBQTBCO0FBQ25ELDBCQUFzQixLQUF0QixDQURtRDs7QUFHbkQsUUFBSSxRQUFRLENBQVIsRUFBVztBQUNkLG9CQURjO0tBQWYsTUFFTztBQUNOLG9CQURNO0tBRlA7SUFIRjtHQURELE1BVU87QUFDTix5QkFBc0IsSUFBdEIsQ0FETTtHQVZQO0VBeEJEOztBQXVDQSxVQUFTLFdBQVQsQ0FBcUIsS0FBckIsRUFBNEI7QUFDMUIsVUFBUSxNQUFNLE9BQU47QUFDUCxRQUFLLEVBQUw7QUFDQyxVQUFNLGNBQU4sR0FERDtBQUVDLFFBQUksbUJBQW1CLEtBQW5CLEVBQTBCO0FBQzdCLG9CQUQ2QjtLQUE5QjtBQUdBLFVBTEQ7QUFERCxRQU9NLEVBQUw7QUFDQyxVQUFNLGNBQU4sR0FERDtBQUVDLFFBQUksbUJBQW1CLEtBQW5CLEVBQTBCO0FBQzdCLG9CQUQ2QjtLQUE5QjtBQUdBLFVBTEQ7QUFQRCxHQUQwQjtFQUE1Qjs7QUFrQkEsVUFBUyxrQkFBVCxHQUE4QjtBQUM3QixvQkFBa0IsSUFBbEIsQ0FENkI7QUFFN0IsYUFBVyxZQUFVO0FBQ3BCLHFCQUFrQixLQUFsQixDQURvQjtHQUFWLEVBRVIsSUFGSCxFQUY2QjtFQUE5Qjs7QUFPQSxVQUFTLFlBQVQsR0FBd0I7O0FBRXZCLGlCQUFlLFNBQVMsYUFBVCxDQUF1Qix3QkFBdkIsQ0FBZixDQUZ1QjtBQUd2QixjQUFZLFNBQVMsYUFBVCxDQUF1QixxQkFBdkIsQ0FBWixDQUh1Qjs7QUFLdkIsTUFBSSxTQUFKLEVBQWU7QUFDZCx3QkFEYztBQUVkLHdCQUZjOztBQUlkLGdCQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsd0JBQTNCLEVBSmM7QUFLZCxnQkFBYSxTQUFiLENBQXVCLE1BQXZCLENBQThCLHVCQUE5QixFQUxjOztBQU9kLGFBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3Qix1QkFBeEIsRUFQYztBQVFkLGFBQVUsU0FBVixDQUFvQixNQUFwQixDQUEyQixvQkFBM0IsRUFSYztHQUFmO0VBTEQ7O0FBaUJBLFVBQVMsWUFBVCxHQUF3QjtBQUN2QixpQkFBZSxTQUFTLGFBQVQsQ0FBdUIsd0JBQXZCLENBQWYsQ0FEdUI7QUFFdkIsbUJBQWlCLFNBQVMsZ0JBQVQsQ0FBMEIseUJBQTFCLENBQWpCLENBRnVCO0FBR3ZCLGtCQUFnQixlQUFlLGVBQWUsTUFBZixHQUF3QixDQUF4QixDQUEvQixDQUh1Qjs7QUFLdkIsTUFBSSxhQUFKLEVBQW1COztBQUVsQixlQUFZLGFBQVosQ0FGa0I7O0FBSWxCLHdCQUprQjtBQUtsQix3QkFMa0I7O0FBT2xCLGdCQUFhLFNBQWIsQ0FBdUIsTUFBdkIsQ0FBOEIsdUJBQTlCLEVBUGtCO0FBUWxCLGlCQUFjLFNBQWQsQ0FBd0IsR0FBeEIsQ0FBNEIsdUJBQTVCLEVBUmtCOztBQVVsQixpQkFBYyxTQUFkLENBQXdCLE1BQXhCLENBQStCLHdCQUEvQixFQVZrQjtBQVdsQixnQkFBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLG9CQUEzQixFQVhrQjtHQUFuQjtFQUxEOztBQW9CQSxRQUFPO0FBQ04sUUFBTSxJQUFOO0VBREQsQ0F4UzZCO0NBQVosRUFBZDs7O2tCQTZTVzs7Ozs7Ozs7Ozs7QUM3U2YsSUFBSSxhQUFjLFlBQVc7QUFDNUIsS0FBSSxXQUFXLFNBQVMsYUFBVCxDQUF1Qix5Q0FBdkIsQ0FBWCxDQUR3QjtBQUU1QixLQUFJLE9BQU8sU0FBUyxhQUFULENBQXVCLHFDQUF2QixDQUFQLENBRndCOztBQUk1QixVQUFTLElBQVQsR0FBZ0I7QUFDZixpQkFEZTtFQUFoQjs7QUFJQSxVQUFTLFlBQVQsR0FBd0I7QUFDdkIsU0FBTyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxXQUFuQyxFQUR1QjtFQUF4Qjs7QUFJQSxVQUFTLFdBQVQsQ0FBcUIsS0FBckIsRUFBNEI7QUFDM0IsVUFBUSxNQUFNLE9BQU47QUFDUCxRQUFLLEVBQUw7QUFDQyxRQUFJLFFBQUosRUFBYztBQUNiLGNBQVUsU0FBUyxJQUFULENBQVYsQ0FEYTtLQUFkO0FBR0EsVUFKRDtBQURELFFBTU0sRUFBTDtBQUNDLFFBQUksSUFBSixFQUFVO0FBQ1QsY0FBVSxLQUFLLElBQUwsQ0FBVixDQURTO0tBQVY7QUFHQSxVQUpEO0FBTkQsR0FEMkI7RUFBNUI7O0FBZUEsVUFBUyxRQUFULENBQWtCLElBQWxCLEVBQXdCO0FBQ3ZCLFNBQU8sUUFBUCxDQUFnQixJQUFoQixHQUF1QixJQUF2QixDQUR1QjtFQUF4Qjs7QUFJQSxVQUFTLFNBQVQsQ0FBbUIsS0FBbkIsRUFBMEI7QUFDekIsUUFBTSxjQUFOLEdBRHlCO0VBQTFCOztBQUlBLFFBQU87QUFDTixRQUFNLElBQU47RUFERCxDQW5DNEI7Q0FBWCxFQUFkOztrQkF3Q1c7Ozs7Ozs7Ozs7O0FDeENmLElBQUksT0FBUSxZQUFXO0FBQ3RCLEtBQUksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBVCxDQURrQjtBQUV0QixLQUFJLFNBQVMsT0FBTyxhQUFQLENBQXFCLDRCQUFyQixDQUFULENBRmtCOztBQUl0QixVQUFTLElBQVQsR0FBZ0I7QUFDZixpQkFEZTtFQUFoQjs7QUFJQSxVQUFTLFlBQVQsR0FBd0I7QUFDdkIsU0FBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFTLEtBQVQsRUFBZTtBQUMvQyxTQUFNLGNBQU4sR0FEK0M7QUFFL0MsZ0JBRitDO0FBRy9DLGdCQUgrQztHQUFmLENBQWpDLENBRHVCO0VBQXhCOztBQVFBLFVBQVMsVUFBVCxHQUFzQjtBQUNyQixTQUFPLFNBQVAsQ0FBaUIsTUFBakIsQ0FBd0IsMkJBQXhCLEVBRHFCO0VBQXRCOztBQUlBLFVBQVMsVUFBVCxHQUFzQjtBQUNyQixNQUFJLE9BQU8sU0FBUCxJQUFvQixNQUFwQixFQUE0QjtBQUMvQixVQUFPLFNBQVAsR0FBbUIsT0FBbkIsQ0FEK0I7R0FBaEMsTUFFTztBQUNOLFVBQU8sU0FBUCxHQUFtQixNQUFuQixDQURNO0dBRlA7RUFERDs7QUFRQSxRQUFPO0FBQ04sUUFBTSxJQUFOO0VBREQsQ0E1QnNCO0NBQVgsRUFBUjs7a0JBaUNXOzs7Ozs7OztBQ3BDZixJQUFJLFlBQWEsWUFBWTs7QUFFNUIsS0FBSSxhQUFhLElBQUksWUFBWSxVQUFaLEVBQWpCLENBRndCOztBQUk1QixLQUFJLGlCQUFpQixTQUFTLGFBQVQsQ0FBdUIsZ0NBQXZCLENBQWpCLENBSndCO0FBSzVCLEtBQUksa0JBQWtCLFNBQVMsYUFBVCxDQUF1QixtQ0FBdkIsQ0FBbEIsQ0FMd0I7QUFNNUIsS0FBSSxrQkFBa0IsU0FBUyxhQUFULENBQXVCLHVCQUF2QixDQUFsQixDQU53QjtBQU81QixLQUFJLG1CQUFtQixTQUFTLGFBQVQsQ0FBdUIsd0JBQXZCLENBQW5CLENBUHdCOztBQVM1QixVQUFTLElBQVQsR0FBZ0I7QUFDZixrQkFEZTtFQUFoQjs7QUFJQSxVQUFTLGFBQVQsR0FBeUI7QUFDeEIsV0FBUyxVQUFULEVBQXFCLGdCQUFyQixFQUF1QyxnQkFBdkMsRUFEd0I7QUFFeEIsV0FBUyxVQUFULEVBQXFCLGNBQXJCLEVBQXFDLGNBQXJDLEVBRndCO0FBR3hCLFdBQVMsVUFBVCxFQUFxQixlQUFyQixFQUFzQyxlQUF0QyxFQUh3QjtBQUl4QixXQUFTLFVBQVQsRUFBcUIsZUFBckIsRUFBc0MsZUFBdEMsRUFKd0I7RUFBekI7O0FBT0EsVUFBUyxnQkFBVCxHQUE0QjtBQUMzQixNQUFJLEtBQUssSUFBSSxXQUFKLENBQWdCLEVBQUMsT0FBTyxDQUFQLEVBQWpCLENBQUwsQ0FEdUI7QUFFM0IsTUFBSSxPQUFPLGlCQUFpQixhQUFqQixDQUErQiw4QkFBL0IsQ0FBUCxDQUZ1QjtBQUczQixNQUFJLGVBQWUsS0FBSyxhQUFMLENBQW1CLGVBQW5CLENBQWYsQ0FIdUI7QUFJM0IsTUFBSSxlQUFlLEtBQUssYUFBTCxDQUFtQixlQUFuQixDQUFmLENBSnVCO0FBSzNCLE1BQUksWUFBWSxLQUFLLGFBQUwsQ0FBbUIsWUFBbkIsQ0FBWixDQUx1Qjs7QUFPM0IsS0FBRyxFQUFILENBQU0sSUFBTixFQUFZLENBQVosRUFBZSxFQUFDLFNBQVMsQ0FBVCxFQUFZLE1BQU0sT0FBTyxNQUFQLEVBQWxDLEVBQ0csRUFESCxDQUNNLFlBRE4sRUFDb0IsQ0FEcEIsRUFDdUIsRUFBQyxTQUFTLENBQVQsRUFEeEIsRUFDcUMsUUFEckMsRUFFRyxFQUZILENBRU0sWUFGTixFQUVvQixDQUZwQixFQUV1QixFQUFDLFNBQVMsQ0FBVCxFQUZ4QixFQUVxQyxRQUZyQyxFQUdHLEVBSEgsQ0FHTSxZQUhOLEVBR29CLENBSHBCLEVBR3VCLEVBQUMsU0FBUyxDQUFULEVBSHhCLEVBR3FDLFFBSHJDLEVBSUcsRUFKSCxDQUlNLFNBSk4sRUFJaUIsQ0FKakIsRUFJb0IsRUFBQyxTQUFTLENBQVQsRUFKckIsRUFJa0MsS0FKbEMsRUFLRyxFQUxILENBS00sWUFMTixFQUtvQixDQUxwQixFQUt1QixFQUFDLFNBQVMsQ0FBVCxFQUx4QixFQUtxQyxLQUxyQyxFQU1HLEVBTkgsQ0FNTSxZQU5OLEVBTW9CLENBTnBCLEVBTXVCLEVBQUMsU0FBUyxDQUFULEVBTnhCLEVBTXFDLE9BTnJDLEVBT0csRUFQSCxDQU9NLFlBUE4sRUFPb0IsQ0FQcEIsRUFPdUIsRUFBQyxTQUFTLENBQVQsRUFQeEIsRUFPcUMsT0FQckMsRUFQMkI7RUFBNUI7O0FBaUJBLFVBQVMsZUFBVCxHQUEyQjtBQUMxQixNQUFJLEtBQUssSUFBSSxXQUFKLENBQWdCLEVBQUMsT0FBTyxDQUFQLEVBQVUsUUFBUSxDQUFSLEVBQTNCLENBQUwsQ0FEc0I7QUFFMUIsTUFBSSxRQUFRLGdCQUFnQixhQUFoQixDQUE4QixZQUE5QixDQUFSLENBRnNCOztBQUkxQixLQUFHLEVBQUgsQ0FBTSxLQUFOLEVBQWEsQ0FBYixFQUFnQixFQUFDLEdBQUcsTUFBSCxFQUFXLFNBQVMsR0FBVCxFQUFjLE1BQU0sT0FBTyxNQUFQLEVBQWhELEVBSjBCO0FBSzFCLEtBQUcsR0FBSCxDQUFPLEtBQVAsRUFBYyxFQUFDLEdBQUcsT0FBSCxFQUFmLEVBTDBCO0FBTTFCLEtBQUcsRUFBSCxDQUFNLEtBQU4sRUFBYSxDQUFiLEVBQWdCLEVBQUMsR0FBRyxJQUFILEVBQVMsU0FBUyxHQUFULEVBQWMsTUFBTSxPQUFPLE9BQVAsRUFBOUMsRUFOMEI7RUFBM0I7OztBQXJDNEIsVUErQ25CLFFBQVQsQ0FBa0IsVUFBbEIsRUFBOEIsT0FBOUIsRUFBdUMsT0FBdkMsRUFBZ0Q7QUFDL0MsTUFBSSxVQUFVO0FBQ2IsbUJBQWdCLE9BQWhCO0FBQ0EsV0FBUSxFQUFSO0FBQ0EsWUFBUyxLQUFUO0dBSEcsQ0FEMkM7O0FBTy9DLE1BQUksWUFBWSxLQUFaLENBQWtCLE9BQXRCLEVBQStCLEVBQS9CLENBQWtDLE9BQWxDLEVBQTJDLE9BQTNDLEVBQW9ELEtBQXBELENBQTBELFVBQTFELEVBUCtDO0VBQWhEOztBQVVBLFVBQVMsY0FBVCxHQUEwQjtBQUN6QixpQkFBZSxTQUFmLENBQXlCLEdBQXpCLENBQTZCLDBDQUE3QixFQUR5QjtFQUExQjs7QUFJQSxVQUFTLGVBQVQsR0FBMkI7QUFDMUIsV0FBUyxhQUFULENBQXVCLG9CQUF2QixFQUE2QyxJQUE3QyxHQUQwQjtFQUEzQjs7QUFJQSxRQUFPO0FBQ04sUUFBTSxJQUFOO0VBREQsQ0FqRTRCO0NBQVosRUFBYjs7a0JBc0VXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBwcmltZWxhYnMgZnJvbSAnLi9wYXJ0aWFscy9wcmltZWxhYnMuanMnO1xuaW1wb3J0IG1lbnUgZnJvbSAnLi9wYXJ0aWFscy9tZW51LmpzJztcbmltcG9ydCBob21lU2Nyb2xsIGZyb20gJy4vcGFydGlhbHMvaG9tZVNjcm9sbC5qcyc7XG5pbXBvcnQgam91cm5hbE5hdiBmcm9tICcuL3BhcnRpYWxzL2pvdXJuYWxOYXYuanMnO1xuaW1wb3J0IGRhc2hib2FyZCBmcm9tICcuL3BhcnRpYWxzL2Rhc2hib2FyZC5qcyc7XG5pbXBvcnQgaGVhZGVyIGZyb20gJy4vcGFydGlhbHMvaGVhZGVyLmpzJztcbmltcG9ydCBmYWRlSXNIaWRkZW4gZnJvbSAnLi9wYXJ0aWFscy9mYWRlSXNIaWRkZW4uanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHRtZW51LmluaXQoKTtcblxuXHRmYWRlSXNIaWRkZW4uaW5pdCgpO1xuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyLS13aGl0ZScpKSB7XG5cdFx0aGVhZGVyLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3JykpIHtcblx0XHRob21lU2Nyb2xsLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFicycpKSB7XG5cdFx0cHJpbWVsYWJzLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkJykpIHtcblx0XHRkYXNoYm9hcmQuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZScpKSB7XG5cdFx0am91cm5hbE5hdi5pbml0KCk7XG5cdH1cbn0pO1xuIiwiaW1wb3J0IGZhZGVCYWNrZ3JvdW5kSW1hZ2UgZnJvbSAnLi9mYWRlQmFja2dyb3VuZEltYWdlLmpzJztcblxubGV0IGRhc2hib2FyZCA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBncm91bmRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZ3JvdW5kd29yaycpO1xuXHRsZXQgZGVwbG95bWVudFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19kZXBsb3ltZW50Jyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlBY3Rpb25zKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlBY3Rpb25zKCkge1xuXHRcdC8vIEluaXQgY29udHJvbGxlclxuXHRcdGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRcdC8vIEFkZCBzY2VuZXNcblx0XHRhZGRTY2VuZShjb250cm9sbGVyLCBncm91bmRTZWN0aW9uLCByZWFjdEFuaW1hdGlvbik7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgZGVwbG95bWVudFNlY3Rpb24sIHRlcm1pbmFsQW5pbWF0aW9uKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHRlcm1pbmFsQW5pbWF0aW9uKCkge1xuXHRcdGxldCBjb2RlV2luZG93ID0gZGVwbG95bWVudFNlY3Rpb24ucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fdGVybWluYWwgY29kZScpO1xuXG5cdFx0Ly8gbGV0IGNvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb2RlJyk7XG5cdFx0Ly8gbGV0IGNvZGVOb2RlID0gY29kZVdpbmRvdy5hcHBlbmRDaGlsZChjb2RlKTtcblxuXHRcdHdyaXRlU3RyaW5nKCdjYXAgc3RhZ2luZyBkZXBsb3knLCBjb2RlV2luZG93KTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gd3JpdGVTdHJpbmcoc3RyaW5nVG9UeXBlLCBwbGFjZVRvVHlwZSkge1xuXHRcdGxldCBpID0gMDtcblxuXHRcdChmdW5jdGlvbiB3cml0ZUNoYXIoKSB7XG5cdFx0XHRpZiAoc3RyaW5nVG9UeXBlLmxlbmd0aCA+IGkpIHtcblx0XHRcdFx0cGxhY2VUb1R5cGUuaW5uZXJIVE1MID0gcGxhY2VUb1R5cGUuaW5uZXJIVE1MICsgc3RyaW5nVG9UeXBlW2ldO1xuXHRcdFx0XHRpKys7XG5cblx0XHRcdFx0bGV0IGRlbGF5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwMCkpICsgMTQwO1xuXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR3cml0ZUNoYXIoKTtcblx0XHRcdFx0fSwgZGVsYXkpO1xuXHRcdFx0fVxuXHRcdH0pKClcblx0fVxuXG5cdC8vIEFkZHMgYSBzY2VuZSB3aXRoIHByZWRlZmluZWQgb3B0aW9ucyB0byB0aGUgY29udHJvbGxlclxuXHRmdW5jdGlvbiBhZGRTY2VuZShjb250cm9sbGVyLCBlbGVtZW50LCBoYW5kbGVyKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHR0cmlnZ2VyRWxlbWVudDogZWxlbWVudCxcblx0XHRcdG9mZnNldDogNTAsXG5cdFx0XHRyZXZlcnNlOiBmYWxzZVxuXHRcdH07XG5cblx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUob3B0aW9ucykub24oJ3N0YXJ0JywgaGFuZGxlcikuYWRkVG8oY29udHJvbGxlcik7XG5cdH1cblxuXG5cdC8vIFJlYWN0IExvZ28gQW5pbWF0aW9uXG5cdGZ1bmN0aW9uIHJlYWN0QW5pbWF0aW9uKCkge1xuXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xuXG5cdFx0bGV0IGxvZ28gPSBncm91bmRTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuXHRcdGxldCBwYXRocyA9IGxvZ28ucXVlcnlTZWxlY3RvckFsbCgncGF0aCcpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkgKyspIHtcblx0XHRcdHNldERhc2gocGF0aHNbaV0pO1xuXHRcdH1cblxuXHRcdHRsLnRvKHBhdGhzLCAzLCB7ICdzdHJva2UtZGFzaG9mZnNldCc6IDAsIG9wYWNpdHk6ICcxJywgZWFzZTogUG93ZXIxLmVhc2VJbiB9KVxuXHRcdC50byhwYXRocywgMSwgeyAnZmlsbCc6ICcjMDBkOGZmJywgJ3N0cm9rZSc6ICcjMDBkOGZmJywgZWFzZTogUG93ZXIxLmVhc2VJbiB9KTtcblx0fVxuXG5cdC8vIFNldHMgRGFzaCBhcnJheS9vZmZzZXQgb24gZWxlbWVudFxuXHRmdW5jdGlvbiBzZXREYXNoKHBhdGgpIHtcblx0XHRsZXQgbGVuZ3RoID0gcGF0aC5nZXRUb3RhbExlbmd0aCgpO1xuXHRcdHBhdGguc3R5bGVbJ3N0cm9rZS1kYXNob2Zmc2V0J10gPSBsZW5ndGg7XG5cdFx0cGF0aC5zdHlsZVsnc3Ryb2tlLWRhc2hhcnJheSddID0gbGVuZ3RoO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBkYXNoYm9hcmQ7XG4iLCIvKipcbiAqIEZhZGVzIGluIGEgYmFja2dyb3VuZCBpbWFnZSBvbmNlIGxvYWRlZFxuICovXG5sZXQgZmFkZUJhY2tncm91bmRJbWFnZSA9IChmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIGZhZGUoaW1hZ2UpIHtcblx0XHRsZXQgYmFja2dyb3VuZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoaW1hZ2UpWydiYWNrZ3JvdW5kLWltYWdlJ107XG5cdFx0bGV0IGltYWdlVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG5cdFx0aWYgKCBiYWNrZ3JvdW5kU3R5bGUgIT09ICdub25lJyApIHtcblx0XHRcdGxldCBiYWNrZ3JvdW5kSW1hZ2UgPSBiYWNrZ3JvdW5kU3R5bGUubWF0Y2goL1xcL1xcLyhbYS16MC05OlxcLVxcLlxcL10rKS8pWzBdO1xuXHRcdFx0aW1hZ2VUZW1wLnNyYyA9IGJhY2tncm91bmRJbWFnZS5yZXBsYWNlKC9cIi9nLCAnJyk7XG5cdFx0XHRpbWFnZVRlbXAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4tYmcnKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4tYmcnKTtcblx0XHR9XG5cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0ZmFkZTogZmFkZVxuXHR9XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgZmFkZUJhY2tncm91bmRJbWFnZTtcbiIsIi8qKlxuICogRmFkZXMgaW4gYmFja2dyb3VuZCBpbWFnZXMgd2l0aCAnaXMtaGlkZGVuJyBjbGFzc1xuICovXG5pbXBvcnQgZmFkZUJhY2tncm91bmRJbWFnZSBmcm9tICcuL2ZhZGVCYWNrZ3JvdW5kSW1hZ2UuanMnO1xuXG5sZXQgZmFkZUlzSGlkZGVuID0gKGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRsZXQgaXNIaWRkZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaXMtaGlkZGVuLWJnJyk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGlzSGlkZGVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRmYWRlQmFja2dyb3VuZEltYWdlLmZhZGUoaXNIaWRkZW5baV0pO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBmYWRlSXNIaWRkZW47XG4iLCJsZXQgaGVhZGVyID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXInKTtcblx0bGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZS1tYWluJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpZiAobWFpbikge1xuXG5cdFx0XHQvLyBpbml0IGNvbnRyb2xsZXJcblx0XHRcdHZhciBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRcdFx0Ly8gY3JlYXRlIGEgc2NlbmVcblx0XHRcdG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XG5cdFx0XHRcdHRyaWdnZXJFbGVtZW50OiBtYWluLFxuXHRcdFx0XHR0cmlnZ2VySG9vazogJ29uTGVhdmUnLFxuXHRcdFx0fSkub24oJ3N0YXJ0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0b2dnbGVXaGl0ZW91dCgpO1xuXG5cdFx0XHR9KVxuXHRcdFx0LmFkZFRvKGNvbnRyb2xsZXIpOyAvLyBhc3NpZ24gdGhlIHNjZW5lIHRvIHRoZSBjb250cm9sbGVyXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlV2hpdGVvdXQoKSB7XG5cdFx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2wtc2l0ZWhlYWRlci0td2hpdGUnKTtcblx0fVxuXG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXI7XG4iLCIvLyBpbXBvcnQgb2JqZWN0Rml0SW1hZ2VzIGZyb20gJ29iamVjdC1maXQtaW1hZ2VzJztcbmltcG9ydCBmYWRlQmFja2dyb3VuZEltYWdlIGZyb20gJy4vZmFkZUJhY2tncm91bmRJbWFnZS5qcyc7XG5cbmxldCBob21lU2Nyb2xsID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IG5hdkl0ZW1zO1xuXHRsZXQgZGVsdGEgPSAwO1xuXHRsZXQgY3VycmVudFNsaWRlO1xuXHRsZXQgbmV4dFNsaWRlO1xuXHRsZXQgcHJldmlvdXNTbGlkZTtcblx0bGV0IHByZXZpb3VzU2xpZGVzO1xuXHRsZXQgaXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cdGxldCBsYXN0U2Nyb2xsZWQ7XG5cdGxldCBtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gdHJ1ZTtcblx0bGV0IGxhc3RNb3VzZXdoZWVsVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdGxldCBsYXN0U2Nyb2xsVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdGxldCBzY3JvbGxzID0gW107XG5cdGxldCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2Jyk7XG5cdGxldCB3b3JrU2xpZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlldycpKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGlmIChuYXYpIHtcblx0XHRcdG5hdkl0ZW1zID0gbmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcblx0XHR9XG5cblx0XHRhbmltYXRlSW5pdGlhbCgpO1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHRcdG9iamVjdEZpdFRlc3QoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIG9iamVjdEZpdFRlc3QoKSB7XG5cdFx0bGV0IG9iamVjdEZpdCA9ICdvYmplY3QtZml0JyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJykuc3R5bGU7XG5cdFx0bGV0IG9iamVjdFBvc2l0aW9uID0gJ29iamVjdC1wb3NpdGlvbicgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpLnN0eWxlO1xuXG5cdFx0Ly8gSWYgdGhlIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IGVpdGhlciAod2UgbmVlZCBib3RoKVxuXHRcdGlmICghb2JqZWN0Rml0IHx8ICFvYmplY3RQb3NpdGlvbikge1xuXHRcdFx0Ly8gSGlkZSB0aGUgYWN0dWFsIGltYWdlIGFuZCBqdW1wIHRvIHRoZSBmYWxsYmFjayBcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXdfX2ltYWdlLXByZWxvYWQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0bG9hZEltYWdlcygpO1xuXHRcdH1cblx0fVxuXG5cdC8vIFJ1bnMgbG9hZEltYWdlIG9uIHRoZSB3b3JrLXByZXZpZXcgY2Fyb3VzZWwgaW1hZ2VzLlxuXHRmdW5jdGlvbiBsb2FkSW1hZ2VzKCkge1xuXHRcdGxldCBwcmV2aWV3SW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlldycpO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgcHJldmlld0ltYWdlcy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdGxvYWRJbWFnZSggcHJldmlld0ltYWdlc1tpXSApO1xuXHRcdH1cblxuXHRcdC8vIFJlLWV2YWx1YXRlIGltYWdlIHNpemVzXG5cdFx0Ly8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gbG9hZEltYWdlcygpO1xuXHRcdC8vIH0pO1xuXHR9XG5cblx0Ly8gRGlzcGxheXMgdGhlIGltYWdlcyBhcyBiYWNrZ3JvdW5kIGltYWdlcy5cblx0ZnVuY3Rpb24gbG9hZEltYWdlKGltYWdlKSB7XG5cdFx0bGV0IGltYWdlSG9sZGVyID0gaW1hZ2UucXVlcnlTZWxlY3RvciggJy53b3JrLXByZXZpZXdfX2ltYWdlJyApO1xuXG5cdFx0Ly8gSW1hZ2UgaXMgZGlzcGxheSBub25lXG5cdFx0bGV0IGltYWdlUHJlbG9hZCA9IGltYWdlLnF1ZXJ5U2VsZWN0b3IoICcud29yay1wcmV2aWV3X19pbWFnZS1wcmVsb2FkJyApO1xuXHRcdGxldCBiYWNrZ3JvdW5kU3R5bGUgPSBpbWFnZVByZWxvYWQuY3VycmVudFNyYztcblxuXHRcdC8vIFNlZW1zIHRvIGJlIG1vcmUgcmVsaWFibGUgdGhhbiBhdHRhY2hpbmcgZGlyZWN0bHlcblx0XHRsZXQgdG1wSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0dG1wSW1nLnNyYyA9IGJhY2tncm91bmRTdHlsZTtcblxuXHRcdHRtcEltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGZ1bmN0aW9uKCl7XG5cdFx0XHQvLyBJbWFnZSBwbGFjZWhvbGRlciBpcyBnaXZlbiBiYWNrZ3JvdW5kIGltYWdlXG5cdFx0XHRpZiAoIGJhY2tncm91bmRTdHlsZSApIHtcblx0XHRcdFx0aW1hZ2VIb2xkZXIuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcIicgKyBiYWNrZ3JvdW5kU3R5bGUgKyAnXCIpJztcblx0XHRcdFx0aW1hZ2VIb2xkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG5cdFx0XHR9XG5cdFx0fSkpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcmVzZXRTY3JvbGwoKSB7XG5cdFx0c2Nyb2xscyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNjcm9sbHNBdmcob2Zmc2V0KSB7XG5cdFx0bGV0IHN1bSA9IDA7XG5cblx0XHRsZXQgZWxtcyA9IHNjcm9sbHMuc2xpY2UoTWF0aC5tYXgoc2Nyb2xscy5sZW5ndGggLSBvZmZzZXQsIDEpKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZWxtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0c3VtICs9IGVsbXNbaV07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGguY2VpbChzdW0gLyBvZmZzZXQpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYW5pbWF0ZUluaXRpYWwoKSB7XG5cdFx0bGV0IGZpcnN0V29yayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLTEnKTtcblx0XHQvLyBmYWRlQmFja2dyb3VuZEltYWdlKGZpcnN0V29yay5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3X19pbWFnZScpKTtcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGZpcnN0V29yay5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5hdkl0ZW1zWzBdLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2X19pdGVtLS1pcy1hY3RpdmUnKTtcblx0XHR9LCAyMDApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmROYXYpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNjcm9sbE5hdik7XG5cblx0XHQvLyBTdG9wcyB0b3VjaG1vdmUgd29ya2luZyBvdXRyaWdodFxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9KTtcblxuXHRcdC8vIFNldHMgdXAgSGFtbWVyIHRvIGhhbmRsZSB0b3VjaCBldmVudHNcblx0XHRsZXQgd29ya0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctY29udGFpbmVyJyk7XG5cdFx0bGV0IHRvdWNoID0gbmV3IEhhbW1lcih3b3JrQ29udGFpbmVyKTtcblxuXHRcdC8vIEVuYWJsZXMgdmVydGljYWwgc3dpcGUgZGV0ZWN0aW9uXG5cdFx0dG91Y2guZ2V0KCdzd2lwZScpLnNldCh7IGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9BTEwgfSk7XG5cblx0XHQvLyBHZXN0dXJlcyB0aGF0IGVxdWFsIGZvcndhcmRcblx0XHR0b3VjaC5vbignc3dpcGV1cCBzd2lwZWxlZnQnLCBmdW5jdGlvbigpe1xuXHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEdlc3R1cmVzIHRoYXQgZXF1YWwgYmFja3dhcmRzXG5cdFx0dG91Y2gub24oJ3N3aXBlZG93biBzd2lwZXJpZ2h0JywgZnVuY3Rpb24oKXtcblx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBIb29rcyB1cCBuYXZpZ2F0aW9uXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuYXZJdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bmF2SXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVOYXYpO1xuXHRcdH1cblxuXG5cdFx0XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVOYXYoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGxldCBzbGlkZU51bWJlciA9IGV2ZW50LnRhcmdldC5pbm5lckhUTUwuc3Vic3RyaW5nKDEpO1xuXG5cdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0Z29Ub1NsaWRlKHNsaWRlTnVtYmVyKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBoaWdobGlnaHRBY3RpdmVOYXYoKSB7XG5cdFx0Ly8gUmVtb3ZlIHRoZSBhY3RpdmUgY2xhc3Ncblx0XHRsZXQgYWN0aXZlTmF2Q2xhc3MgPSAnd29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2X19pdGVtLS1pcy1hY3RpdmUnO1xuXHRcdGxldCBhY3RpdmVOYXZJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBhY3RpdmVOYXZDbGFzcyk7XG5cdFx0YWN0aXZlTmF2SXRlbS5jbGFzc0xpc3QucmVtb3ZlKGFjdGl2ZU5hdkNsYXNzKTtcblxuXHRcdGxldCBuZXh0TnVtYmVyID0gbmV4dFNsaWRlLmlkLnN1YnN0cmluZyhuZXh0U2xpZGUuaWQubGVuZ3RoIC0xKTtcblx0XHRjb25zb2xlLmxvZyhuZXh0TnVtYmVyKTtcblxuXHRcdG5hdkl0ZW1zW25leHROdW1iZXIgLSAxXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoYWN0aXZlTmF2Q2xhc3MpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ29Ub1NsaWRlKHNsaWRlTnVtYmVyKSB7XG5cdFx0bmV4dFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tJyArIHNsaWRlTnVtYmVyICk7XG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0aWYgKG5leHRTbGlkZSkge1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblxuXHRcdFx0bGV0IGN1cnJlbnROdW1iZXIgPSBjdXJyZW50U2xpZGUuaWQuc3Vic3RyaW5nKGN1cnJlbnRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXHRcdFx0bGV0IG5leHROdW1iZXIgPSBuZXh0U2xpZGUuaWQuc3Vic3RyaW5nKG5leHRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXG5cdFx0XHRpZiAoY3VycmVudE51bWJlciA+IG5leHROdW1iZXIpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2dvaW5nIGJhY2t3YXJkcycpO1xuXHRcdFx0XHQvLyBJZiB3ZSdyZSBnb2luZyBiYWNrd2FyZHNcblx0XHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXG5cdFx0XHRcdC8vIE5lZWQgdG8gYWRkIG5leHQgdG8gQUxMIGdvaW5nIGZvcndhcmRcblx0XHRcdFx0bGV0IHByZXZpb3VzU2xpZGVzID0gd29ya1NsaWRlcy5zbGljZShuZXh0TnVtYmVyLCBjdXJyZW50TnVtYmVyIC0gMSk7XG5cblx0XHRcdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgcHJldmlvdXNTbGlkZXMubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdFx0cHJldmlvdXNTbGlkZXNbaV0uY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0XHRcdFx0cHJldmlvdXNTbGlkZXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIElmIHdlJ3JlIGdvaW5nIGZvcndhcmRzXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdnb2luZyBmb3J3YXJkcycpO1xuXHRcdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0fVxuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gc2Nyb2xsTmF2KGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRsZXQgc2Nyb2xsVGhyZXNob2xkID0gNDA7XG5cblx0XHRsZXQgdmFsdWUgPSAtZS5kZWx0YVk7XG5cblx0XHRpZiAoc2Nyb2xscy5sZW5ndGggPiAxNTApIHtcblx0XHRcdHNjcm9sbHMuc2hpZnQoKTtcblx0XHR9XG5cblx0XHRzY3JvbGxzLnB1c2goTWF0aC5hYnModmFsdWUpKTtcblxuXHRcdHZhciBjdXJyVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cblx0XHRpZiAoKGN1cnJUaW1lIC0gbGFzdE1vdXNld2hlZWxUaW1lKSA+IDIwMCkge1xuXHRcdFx0cmVzZXRTY3JvbGwoKTtcblx0XHR9XG5cblx0XHRsYXN0TW91c2V3aGVlbFRpbWUgPSBjdXJyVGltZTtcblxuXHRcdHZhciBsYXN0QXZnID0gc2Nyb2xsc0F2Zyg1KTtcblx0XHR2YXIgbWlkQXZnID0gc2Nyb2xsc0F2Zyg0MCk7XG5cblx0XHRpZiAobGFzdEF2ZyA+IG1pZEF2Zykge1xuXHRcdFx0aWYgKG1vdXNld2hlZWxDYW5TY3JvbGwgJiYgaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0bW91c2V3aGVlbENhblNjcm9sbCA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKHZhbHVlIDwgMCkge1xuXHRcdFx0XHRcdFx0YWR2YW5jZVNsaWRlKCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlZ3Jlc3NTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bW91c2V3aGVlbENhblNjcm9sbCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24ga2V5Ym9hcmROYXYoZXZlbnQpIHtcblx0XHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0XHRjYXNlIDM4OlxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDQwOlxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0YWR2YW5jZVNsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdH1cblxuXHRmdW5jdGlvbiByZXNldFRyYW5zaXRpb25pbmcoKSB7XG5cdFx0aXNUcmFuc2l0aW9uaW5nID0gdHJ1ZTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRpc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcblx0XHR9LCAxMDAwKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkdmFuY2VTbGlkZSgpIHtcblxuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRuZXh0U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cblx0XHRpZiAobmV4dFNsaWRlKSB7XG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cdFxuXHRmdW5jdGlvbiByZWdyZXNzU2xpZGUoKSB7XG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdHByZXZpb3VzU2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRwcmV2aW91c1NsaWRlID0gcHJldmlvdXNTbGlkZXNbcHJldmlvdXNTbGlkZXMubGVuZ3RoIC0gMV07XG5cblx0XHRpZiAocHJldmlvdXNTbGlkZSkge1xuXHRcdFx0Ly8gU2V0cyBuZXh0IGFjdHVhbCBzbGlkZSAobm90IGNocm9ub2xvZ2ljYWxseSkgdG8gcHJldmlvdXMgc2xpZGVcblx0XHRcdG5leHRTbGlkZSA9IHByZXZpb3VzU2xpZGU7XG5cblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdHByZXZpb3VzU2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRcdHByZXZpb3VzU2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBob21lU2Nyb2xsO1xuIiwiLyoqXG4gKiBBbGxvd3MgZm9yIGxlZnQvcmlnaHQgbmF2aWdhdGlvbiBpbiBqb3VybmFsXG4gKi9cbmxldCBqb3VybmFsTmF2ID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgcHJldmlvdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam91cm5hbC1zaW5nbGVfX25hdmlnYXRpb24tLXByZXZpb3VzIGEnKTtcblx0bGV0IG5leHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam91cm5hbC1zaW5nbGVfX25hdmlnYXRpb24tLW5leHQgYScpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZE5hdik7XG5cdH1cblxuXHRmdW5jdGlvbiBrZXlib2FyZE5hdihldmVudCkge1xuXHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0Y2FzZSAzNzpcblx0XHRcdFx0aWYgKHByZXZpb3VzKSB7XG5cdFx0XHRcdFx0Z29Ub0xpbmsoIHByZXZpb3VzLmhyZWYgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzk6XG5cdFx0XHRcdGlmIChuZXh0KSB7XG5cdFx0XHRcdFx0Z29Ub0xpbmsoIG5leHQuaHJlZiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGdvVG9MaW5rKGxpbmspIHtcblx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpbms7XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVOYXYoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxOYXY7XG4iLCIvKipcbiAqIEhhbmRsZXMgbW9iaWxlIG1lbnVcbiAqL1xubGV0IG1lbnUgPSAoZnVuY3Rpb24oKSB7XG5cdGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyJyk7XG5cdGxldCB0b2dnbGUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcl9fbWVudS10b2dnbGUnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0b2dnbGVNZW51KCk7XG5cdFx0XHRjaGFuZ2VUZXh0KCk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuXHRcdGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdsLXNpdGVoZWFkZXItLW5hdi1pcy1vcGVuJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBjaGFuZ2VUZXh0KCkge1xuXHRcdGlmICh0b2dnbGUuaW5uZXJIVE1MID09ICdNZW51Jykge1x0XG5cdFx0XHR0b2dnbGUuaW5uZXJIVE1MID0gJ0Nsb3NlJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dG9nZ2xlLmlubmVySFRNTCA9ICdNZW51Jztcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgbWVudTtcbiIsImxldCBwcmltZWxhYnMgPSAoZnVuY3Rpb24gKCkge1xuXHQvLyBJbml0IGNvbnRyb2xsZXJcblx0bGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG5cdGxldCBwcm9ibGVtU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19zZWN0aW9uLS1wcm9ibGVtcycpO1xuXHRsZXQgc3RhbmRhcmRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3NlY3Rpb24tLWFzLXN0YW5kYXJkJyk7XG5cdGxldCBjYXJvdXNlbFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fY2Fyb3VzZWwnKTtcblx0bGV0IGJhY2tzdG9yeVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fYmFja3N0b3J5Jyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlBY3Rpb25zKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlBY3Rpb25zKCkge1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIGJhY2tzdG9yeVNlY3Rpb24sIGJhY2tzdG9yeUhhbmRsZXIpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIHByb2JsZW1TZWN0aW9uLCBwcm9ibGVtSGFuZGxlcik7XG5cdFx0YWRkU2NlbmUoY29udHJvbGxlciwgc3RhbmRhcmRTZWN0aW9uLCBzdGFuZGFyZEhhbmRsZXIpO1xuXHRcdGFkZFNjZW5lKGNvbnRyb2xsZXIsIGNhcm91c2VsU2VjdGlvbiwgY2Fyb3VzZWxIYW5kbGVyKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJhY2tzdG9yeUhhbmRsZXIoKSB7XG5cdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KHtkZWxheTogMX0pO1xuXHRcdGxldCBsb2dvID0gYmFja3N0b3J5U2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcjcHJpbWUtbGFic19fYmFja3N0b3J5X19sb2dvJyk7XG5cdFx0bGV0IGJ1YmJsZUJvdHRvbSA9IGxvZ28ucXVlcnlTZWxlY3RvcignI2J1YmJsZUJvdHRvbScpO1xuXHRcdGxldCBidWJibGVNaWRkbGUgPSBsb2dvLnF1ZXJ5U2VsZWN0b3IoJyNidWJibGVNaWRkbGUnKTtcblx0XHRsZXQgYnViYmxlVG9wID0gbG9nby5xdWVyeVNlbGVjdG9yKCcjYnViYmxlVG9wJyk7XG5cblx0XHR0bC50byhsb2dvLCAxLCB7b3BhY2l0eTogMSwgZWFzZTogUG93ZXIxLmVhc2VJbn0pXG5cdFx0ICAudG8oYnViYmxlQm90dG9tLCAxLCB7b3BhY2l0eTogMX0sICdib3R0b20nKVxuXHRcdCAgLnRvKGJ1YmJsZU1pZGRsZSwgMSwge29wYWNpdHk6IDF9LCAnbWlkZGxlJylcblx0XHQgIC50byhidWJibGVCb3R0b20sIDEsIHtvcGFjaXR5OiAwfSwgJ21pZGRsZScpXG5cdFx0ICAudG8oYnViYmxlVG9wLCAxLCB7b3BhY2l0eTogMX0sICd0b3AnKVxuXHRcdCAgLnRvKGJ1YmJsZU1pZGRsZSwgMSwge29wYWNpdHk6IDB9LCAndG9wJylcblx0XHQgIC50byhidWJibGVNaWRkbGUsIDEsIHtvcGFjaXR5OiAxfSwgJ2ZpbmFsJylcblx0XHQgIC50byhidWJibGVCb3R0b20sIDEsIHtvcGFjaXR5OiAxfSwgJ2ZpbmFsJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBjYXJvdXNlbEhhbmRsZXIoKSB7XG5cdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KHtkZWxheTogMiwgcmVwZWF0OiAxfSk7XG5cdFx0bGV0IHRpdGxlID0gY2Fyb3VzZWxTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkaW5nLTEnKTtcblxuXHRcdHRsLnRvKHRpdGxlLCAzLCB7eDogJzE1MCUnLCBvcGFjaXR5OiAnMCcsIGVhc2U6IFBvd2VyMS5lYXNlSW4gfSk7XG5cdFx0dGwuc2V0KHRpdGxlLCB7eDogJy0xNTAlJ30pO1xuXHRcdHRsLnRvKHRpdGxlLCAzLCB7eDogJzAlJywgb3BhY2l0eTogJzEnLCBlYXNlOiBQb3dlcjEuZWFzZU91dCB9KTtcblx0fVxuXG5cdC8vIEFkZHMgYSBzY2VuZSB3aXRoIHByZWRlZmluZWQgb3B0aW9ucyB0byB0aGUgY29udHJvbGxlclxuXHRmdW5jdGlvbiBhZGRTY2VuZShjb250cm9sbGVyLCBlbGVtZW50LCBoYW5kbGVyKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHR0cmlnZ2VyRWxlbWVudDogZWxlbWVudCxcblx0XHRcdG9mZnNldDogNTAsXG5cdFx0XHRyZXZlcnNlOiBmYWxzZVxuXHRcdH07XG5cblx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUob3B0aW9ucykub24oJ3N0YXJ0JywgaGFuZGxlcikuYWRkVG8oY29udHJvbGxlcik7XG5cdH1cblxuXHRmdW5jdGlvbiBwcm9ibGVtSGFuZGxlcigpIHtcblx0XHRwcm9ibGVtU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdwcmltZS1sYWJzX19zZWN0aW9uLS1wcm9ibGVtcy0taXMtYWN0aXZlJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBzdGFuZGFyZEhhbmRsZXIoKSB7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3ZpZGVvJykucGxheSgpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBwcmltZWxhYnM7XG4iXX0=
