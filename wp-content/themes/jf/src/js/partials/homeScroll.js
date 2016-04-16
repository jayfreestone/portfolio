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
			navItems = nav.querySelectorAll('a');
		}
		animateInitial();
		bindUIEvents();
	}

	function resetScroll() {
		scrolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	}

	function scrollsAvg(offset) {
		let sum = 0;

		let elms = scrolls.slice(Math.max(scrolls.length - offset, 1));

		for (let i = 0; i < elms.length; i++) {
			sum += elms[i];
		}

		return Math.ceil(sum / offset);
	}

	function animateInitial() {
		setTimeout(function(){
			let firstWork = document.querySelector('.work-preview--1');
			firstWork.classList.add('work-preview--current');
			navItems[0].parentNode.classList.add('work-preview-container__nav__item--is-active');
		}, 200);
	}

	function bindUIEvents() {
		window.addEventListener('keydown', keyboardNav);
		window.addEventListener('wheel', scrollNav);


		for (let i = 0; i < navItems.length; i++) {
			navItems[i].addEventListener('click', handleNav);
		}
		
		// $('.work-preview-container').swipe({
		// 	swipe:function(event, direction, distance, duration, fingerCount) {
		// 		console.log( "You swiped " + direction );
		// 	},
		// 	allowPageScroll:'vertical'
		// });
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

				for ( let i = 0; i < previousSlides.length; i++ ) {
					previousSlides[i].classList.add('work-preview--next');
					previousSlides[i].classList.remove('work-preview--previous');
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
		// console.log('fired');

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
