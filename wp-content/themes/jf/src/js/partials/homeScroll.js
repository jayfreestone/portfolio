/**
 * Home Scroll
 * Handles the homepage carousel
 */
let homeScroll = (function () {
	let navItems;
	let delta = 0;
	let currentSlide;
	let nextSlide;
	let previousSlide;
	let previousSlides;
	let isTransitioning = false;
	let lastScrolled;
	let mousewheelCanScroll = true;
	let lastMousewheelTime = (new Date()).getTime();
	let lastScrollTime = (new Date()).getTime();
	let scrolls = [];
	let nav = document.querySelector('.work-preview-container__nav');
	let workSlides = Array.prototype.slice.call(document.querySelectorAll('.work-preview'));

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
		let firstWork = document.querySelector('.work-preview--1');

		setTimeout(function(){
			firstWork.classList.add('work-preview--current');
			navItems[0].parentNode.classList.add('work-preview-container__nav__item--is-active');
		}, 200);
	}

	// Tests if we can use images or have to fall back to background images
	function objectFitTest() {
		let objectFit = 'object-fit' in document.createElement('i').style;
		let objectPosition = 'object-position' in document.createElement('i').style;

		// If the browser doesn't support either (we need both)
		if (!objectPosition || !objectFit) {
			// Hide the actual image and jump to the fallback 
			let images = Array.from(document.querySelectorAll('.work-preview__image-preload'));

			for (const image of images) {
				image.style.display = 'none';
			}

			loadImages();
		}
	}

	// Runs loadImage on the work-preview carousel images.
	function loadImages() {
		let previewImages = Array.from(document.querySelectorAll('.work-preview'));

		for ( const previewImage of previewImages ) {
			loadImage( previewImage );
		}
	}

	// Displays the content image as a background image.
	function loadImage(image) {
		let imageHolder = image.querySelector( '.work-preview__image' );

		// Image is display none
		let imagePreload = image.querySelector( '.work-preview__image-preload' );
		let backgroundStyle = imagePreload.currentSrc || imagePreload.src;

		// Seems to be more reliable than attaching directly
		let tmpImg = document.createElement('img');
		tmpImg.src = backgroundStyle;

		tmpImg.addEventListener('load', (function(){
			// Image placeholder is given background image
			if ( backgroundStyle ) {
				imageHolder.style.backgroundImage = 'url("' + backgroundStyle + '")';
				imageHolder.classList.remove('is-hidden');
			}
		}));
	}

	// Binds UI Events
	function bindUIEvents() {
		// On resize, re-evaluate if we should start the JS carousel
		window.addEventListener('resize', function() {
			startCarousel();
		});

		// Hooks up navigation
		for (const navItem of navItems) {
			navItem.addEventListener('click', handleNav);
		}
	}

	// Hooks up the JS carousel if window is above a certain height
	function startCarousel() {
		// Get the current rem value
		let remValue = document.querySelector('body').style.fontSize || 16;

		// At 30rem we switch to the carousel layout
		if ( window.innerHeight > ( remValue * 30 ) ) {
			window.addEventListener('keydown', keyboardNav);
			window.addEventListener('wheel', scrollNav);

			// Stops touchmove working outright
			window.addEventListener('touchmove', function(event) {
				event.preventDefault();
			});

			// Sets up Hammer to handle touch events
			let workContainer = document.querySelector('.work-preview-container');
			let touch = new Hammer(workContainer);

			// Enables vertical swipe detection
			touch.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

			// Gestures that equal forward
			touch.on('swipeup swipeleft', function(){
				if (isTransitioning == false) {
					advanceSlide();
				}
			});

			// Gestures that equal backwards
			touch.on('swipedown swiperight', function(){
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
		let sum = 0;

		let elms = scrolls.slice(Math.max(scrolls.length - offset, 1));

		for ( const elm of elms ) {
			sum += elm;
		}

		return Math.ceil(sum / offset);
	}



	function handleNav(event) {
		event.preventDefault();
		let slideNumber = event.target.innerHTML.substring(1);

		if (isTransitioning == false) {
			goToSlide(slideNumber);
		}
	}

	function highlightActiveNav() {
		// Remove the active class
		let activeNavClass = 'work-preview-container__nav__item--is-active';
		let activeNavItem = document.querySelector('.' + activeNavClass);
		activeNavItem.classList.remove(activeNavClass);

		let nextNumber = nextSlide.id.substring(nextSlide.id.length -1);
		console.log(nextNumber);

		navItems[nextNumber - 1].parentNode.classList.add(activeNavClass);
	}

	function goToSlide(slideNumber) {
		nextSlide = document.querySelector('.work-preview--' + slideNumber );
		currentSlide = document.querySelector('.work-preview--current');

		if (nextSlide) {
			resetTransitioning();
			highlightActiveNav();

			let currentNumber = currentSlide.id.substring(currentSlide.id.length -1);
			let nextNumber = nextSlide.id.substring(nextSlide.id.length -1);

			if (currentNumber > nextNumber) {
				console.log('going backwards');
				// If we're going backwards
				currentSlide.classList.add('work-preview--next');

				// Need to add next to ALL going forward
				let previousSlides = workSlides.slice(nextNumber, currentNumber - 1);

				for ( const previousSlide of previousSlides ) {
					previousSlide.classList.add('work-preview--next');
					previousSlide.classList.remove('work-preview--previous');
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

		let scrollThreshold = 40;

		let value = -e.deltaY;

		if (scrolls.length > 150) {
			scrolls.shift();
		}

		scrolls.push(Math.abs(value));

		var currTime = (new Date()).getTime();

		if ((currTime - lastMousewheelTime) > 200) {
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
		setTimeout(function(){
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
	}
}());

export default homeScroll;
