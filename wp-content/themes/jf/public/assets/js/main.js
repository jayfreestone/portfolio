(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function t(n){if(!n)throw new Error("No options passed to Waypoint constructor");if(!n.element)throw new Error("No element option passed to Waypoint constructor");if(!n.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,n),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=n.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var n in i)e.push(i[n]);for(var o=0,r=e.length;r>o;o++)e[o][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=o.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,n[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,n={},o=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete n[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,o.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||o.isTouch)&&(e.didScroll=!0,o.requestAnimationFrame(t))})},e.prototype.handleResize=function(){o.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var n=e[i],o=n.newScroll>n.oldScroll,r=o?n.forward:n.backward;for(var s in this.waypoints[i]){var l=this.waypoints[i][s],a=n.oldScroll<l.triggerPoint,h=n.newScroll>=l.triggerPoint,p=a&&h,u=!a&&!h;(p||u)&&(l.queueTrigger(r),t[l.group.id]=l.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?o.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?o.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var n=0,o=t.length;o>n;n++)t[n].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),n={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var l in this.waypoints[r]){var a,h,p,u,c,f=this.waypoints[r][l],d=f.options.offset,y=f.triggerPoint,g=0,w=null==y;f.element!==f.element.window&&(g=f.adapter.offset()[s.offsetProp]),"function"==typeof d?d=d.apply(f):"string"==typeof d&&(d=parseFloat(d),f.options.offset.indexOf("%")>-1&&(d=Math.ceil(s.contextDimension*d/100))),a=s.contextScroll-s.contextOffset,f.triggerPoint=g+a-d,h=y<s.oldScroll,p=f.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!w&&u?(f.queueTrigger(s.backward),n[f.group.id]=f.group):!w&&c?(f.queueTrigger(s.forward),n[f.group.id]=f.group):w&&s.oldScroll>=f.triggerPoint&&(f.queueTrigger(s.forward),n[f.group.id]=f.group)}}return o.requestAnimationFrame(function(){for(var t in n)n[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in n)n[t].refresh()},e.findByElement=function(t){return n[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},o.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},o.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),n[this.axis][this.name]=this}var n={vertical:{},horizontal:{}},o=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var n=this.triggerQueues[i],o="up"===i||"left"===i;n.sort(o?e:t);for(var r=0,s=n.length;s>r;r+=1){var l=n[r];(l.options.continuous||r===n.length-1)&&l.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=o.Adapter.inArray(e,this.waypoints),n=i===this.waypoints.length-1;return n?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=o.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=o.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return n[t.axis][t.name]||new i(t)},o.Group=i}(),function(){"use strict";function t(t){return t===t.window}function e(e){return t(e)?e:e.defaultView}function i(t){this.element=t,this.handlers={}}var n=window.Waypoint;i.prototype.innerHeight=function(){var e=t(this.element);return e?this.element.innerHeight:this.element.clientHeight},i.prototype.innerWidth=function(){var e=t(this.element);return e?this.element.innerWidth:this.element.clientWidth},i.prototype.off=function(t,e){function i(t,e,i){for(var n=0,o=e.length-1;o>n;n++){var r=e[n];i&&i!==r||t.removeEventListener(r)}}var n=t.split("."),o=n[0],r=n[1],s=this.element;if(r&&this.handlers[r]&&o)i(s,this.handlers[r][o],e),this.handlers[r][o]=[];else if(o)for(var l in this.handlers)i(s,this.handlers[l][o]||[],e),this.handlers[l][o]=[];else if(r&&this.handlers[r]){for(var a in this.handlers[r])i(s,this.handlers[r][a],e);this.handlers[r]={}}},i.prototype.offset=function(){if(!this.element.ownerDocument)return null;var t=this.element.ownerDocument.documentElement,i=e(this.element.ownerDocument),n={top:0,left:0};return this.element.getBoundingClientRect&&(n=this.element.getBoundingClientRect()),{top:n.top+i.pageYOffset-t.clientTop,left:n.left+i.pageXOffset-t.clientLeft}},i.prototype.on=function(t,e){var i=t.split("."),n=i[0],o=i[1]||"__default",r=this.handlers[o]=this.handlers[o]||{},s=r[n]=r[n]||[];s.push(e),this.element.addEventListener(n,e)},i.prototype.outerHeight=function(e){var i,n=this.innerHeight();return e&&!t(this.element)&&(i=window.getComputedStyle(this.element),n+=parseInt(i.marginTop,10),n+=parseInt(i.marginBottom,10)),n},i.prototype.outerWidth=function(e){var i,n=this.innerWidth();return e&&!t(this.element)&&(i=window.getComputedStyle(this.element),n+=parseInt(i.marginLeft,10),n+=parseInt(i.marginRight,10)),n},i.prototype.scrollLeft=function(){var t=e(this.element);return t?t.pageXOffset:this.element.scrollLeft},i.prototype.scrollTop=function(){var t=e(this.element);return t?t.pageYOffset:this.element.scrollTop},i.extend=function(){function t(t,e){if("object"==typeof t&&"object"==typeof e)for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t}for(var e=Array.prototype.slice.call(arguments),i=1,n=e.length;n>i;i++)t(e[0],e[i]);return e[0]},i.inArray=function(t,e,i){return null==e?-1:e.indexOf(t,i)},i.isEmptyObject=function(t){for(var e in t)return!1;return!0},n.adapters.push({name:"noframework",Adapter:i}),n.Adapter=i}();
},{}],2:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
	_menu2.default.init();

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

},{"./partials/dashboard.js":3,"./partials/homeScroll.js":4,"./partials/journalNav.js":5,"./partials/menu.js":6,"./partials/primelabs.js":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var dashboard = function () {
	var processSection = document.querySelector('.dashboard__process');
	var scrollSection = document.querySelector('.dashboard__site-scroll');

	function init() {

		// init controller
		var controller = new ScrollMagic.Controller();

		// create a scene
		new ScrollMagic.Scene({
			triggerElement: processSection,
			offset: 50,
			reverse: false
		}).on('start', function () {
			animationProcess();
		}).addTo(controller); // assign the scene to the controller

		// create a scene
		new ScrollMagic.Scene({
			triggerElement: scrollSection,
			offset: 50,
			reverse: false
		}).on('start', function () {
			siteScroll();
		}).addTo(controller); // assign the scene to the controller
	}

	function siteScroll() {
		var image = scrollSection.querySelector('img');
	}

	function animationProcess() {
		var tl = new TimelineMax();
		var inner = document.querySelector('.dashboard__process__inner');

		// Figures
		var local = document.querySelector('.dashboard__figure--local');
		var remote = document.querySelector('.dashboard__figure--remote');
		var git = document.querySelector('.dashboard__figure--git');
		var files = document.querySelector('.dashboard__figure--files');
		var release = document.querySelector('.dashboard__figure--release');

		// Connectors
		var connectorCap = document.querySelector('.dashboard__connector--capistrano');
		var connectorGit = document.querySelector('.dashboard__connector--git');
		var connectorFiles = document.querySelector('.dashboard__connector--files');
		var connectorReleases = document.querySelector('.dashboard__connector--releases');

		// Animation
		addFigure(local);
		setActive(local);
		addLine(connectorCap, 'connectorCap');
		addFigure(remote, 'pulseCap');
		sendPulse(connectorCap, 'pulseCap');
		setActive(remote);
		addLine(connectorGit, 'connectorGit');
		addFigure(git);
		sendPulse(connectorGit, 'pulseGit');
		setActive(git);
		sendPulse(connectorGit, 'pulseGit', 'left');
		unsetActive(git);
		removeFigure(git);
		removeLine(connectorGit);
		addLine(connectorFiles, 'connectorFiles');
		addFigure(files);
		addLine(connectorReleases, 'connectorReleases');
		addFigure(release);

		// Helper functions
		function addFigure(figure) {
			tl.from(figure, 1, { width: 0 }).to(figure, 1, { opacity: 1 });
		}

		function removeFigure(figure) {
			tl.to(figure, 0.5, { opacity: 0 }).to(figure, 1, { width: '0', margin: 0, flex: 0 });
			// .set(figure, { position: 'absolute' });
		}

		function removeLine(connector) {
			tl.to(connector, 0.5, { opacity: 0 }).to(connector, 1, { width: '0', margin: 0, flex: 0 });
			// .set(connector, { position: 'absolute' });
		}

		function setActive(figure) {
			var path = figure.querySelector('path');
			tl.to(path, 0.5, { fill: '#9d0e12' });
		}

		function unsetActive(figure) {
			var path = figure.querySelector('path');
			tl.to(path, 0.5, { fill: 'black' });
		}

		function addLine(connector, layer) {
			var line = connector.querySelector('.dashboard__connector__line');

			tl.to(connector, 1, { opacity: 1 }, layer).from(connector, 1, { width: 0, y: -20 }, layer).to(line, 1, { width: '100%' });
		}

		function sendPulse(connector, layer) {
			var direction = arguments.length <= 2 || arguments[2] === undefined ? 'right' : arguments[2];

			var pulse = connector.querySelector('.dashboard__connector__pulse');

			if (direction === 'left') {
				tl.set(pulse, { left: '100%' }).to(pulse, 0.3, { opacity: 1 }).to(pulse, 2, { left: '0' }).to(pulse, 0.3, { opacity: 0 }).set(pulse, { left: '100%' });
			} else {
				tl.to(pulse, 0.3, { opacity: 1 }).to(pulse, 2, { left: '100%' }).to(pulse, 0.3, { opacity: 0 }).to(pulse, 0, { left: '0' });
			}
		}
	}

	return {
		init: init
	};
}();

exports.default = dashboard;

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

		for (var i = 0; i < navItems.length; i++) {
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
				// If we're going backwards
				currentSlide.classList.add('work-preview--next');

				// Need to add next to ALL going forward
				var _previousSlides = workSlides.slice(nextNumber, currentNumber - 1);

				for (var i = 0; i < _previousSlides.length; i++) {
					_previousSlides[i].classList.add('work-preview--next');
				}
			} else {
				// If we're going forwards
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

var _noframeworkWaypointsMin = require('./../../../node_modules/waypoints/lib/noframework.waypoints.min.js');

var _noframeworkWaypointsMin2 = _interopRequireDefault(_noframeworkWaypointsMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var primelabs = function () {
	var problemSection = document.querySelector('.prime-labs__section--problems');
	var modularSection = document.querySelector('.prime-labs__section--modular-boxes');
	var standardSection = document.querySelector('.prime-labs__section--as-standard');

	function init() {

		var problems = new Waypoint({
			element: problemSection,
			offset: '50%',
			handler: function handler(direction) {
				problemSection.classList.add('prime-labs__section--problems--is-active');
			}
		});

		var modular = new Waypoint({
			element: modularSection,
			offset: '60%',
			handler: function handler(direction) {
				modularSection.classList.add('prime-labs__section--modular-boxes--is-active');
			}
		});

		var standard = new Waypoint({
			element: standardSection,
			offset: '50%',
			handler: function handler(direction) {
				document.querySelector('.prime-labs__video').play();
			}
		});
	}

	return {
		init: init
	};
}();

exports.default = primelabs;

},{"./../../../node_modules/waypoints/lib/noframework.waypoints.min.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvd2F5cG9pbnRzL2xpYi9ub2ZyYW1ld29yay53YXlwb2ludHMubWluLmpzIiwic3JjL2pzL21haW4uanMiLCJzcmMvanMvcGFydGlhbHMvZGFzaGJvYXJkLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDTkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBWTtBQUN6RCxnQkFBSyxJQUFMLEdBRHlEOztBQUd6RCxLQUFJLFNBQVMsYUFBVCxDQUF1QixlQUF2QixDQUFKLEVBQTZDO0FBQzVDLHVCQUFXLElBQVgsR0FENEM7RUFBN0M7O0FBSUEsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBSixFQUEyQztBQUMxQyxzQkFBVSxJQUFWLEdBRDBDO0VBQTNDOztBQUlBLEtBQUksU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQUosRUFBMEM7QUFDekMsc0JBQVUsSUFBVixHQUR5QztFQUExQzs7QUFJQSxLQUFJLFNBQVMsYUFBVCxDQUF1QixpQkFBdkIsQ0FBSixFQUErQztBQUM5Qyx1QkFBVyxJQUFYLEdBRDhDO0VBQS9DO0NBZjZDLENBQTlDOzs7Ozs7OztBQ05BLElBQUksWUFBYSxZQUFZO0FBQzVCLEtBQUksaUJBQWlCLFNBQVMsYUFBVCxDQUF1QixxQkFBdkIsQ0FBakIsQ0FEd0I7QUFFNUIsS0FBSSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLHlCQUF2QixDQUFoQixDQUZ3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NUIsS0FBSSxpQkFBaUIsU0FBUyxhQUFULENBQXVCLGdDQUF2QixDQUFqQixDQUR3QjtBQUU1QixLQUFJLGlCQUFpQixTQUFTLGFBQVQsQ0FBdUIscUNBQXZCLENBQWpCLENBRndCO0FBRzVCLEtBQUksa0JBQWtCLFNBQVMsYUFBVCxDQUF1QixtQ0FBdkIsQ0FBbEIsQ0FId0I7O0FBSzVCLFVBQVMsSUFBVCxHQUFnQjs7QUFFZixNQUFJLFdBQVcsSUFBSSxRQUFKLENBQWE7QUFDM0IsWUFBUyxjQUFUO0FBQ0EsV0FBUSxLQUFSO0FBQ0EsWUFBUyxpQkFBVSxTQUFWLEVBQXFCO0FBQzdCLG1CQUFlLFNBQWYsQ0FBeUIsR0FBekIsQ0FBNkIsMENBQTdCLEVBRDZCO0lBQXJCO0dBSEssQ0FBWCxDQUZXOztBQVVmLE1BQUksVUFBVSxJQUFJLFFBQUosQ0FBYTtBQUMxQixZQUFTLGNBQVQ7QUFDQSxXQUFRLEtBQVI7QUFDQSxZQUFTLGlCQUFTLFNBQVQsRUFBb0I7QUFDNUIsbUJBQWUsU0FBZixDQUF5QixHQUF6QixDQUE2QiwrQ0FBN0IsRUFENEI7SUFBcEI7R0FISSxDQUFWLENBVlc7O0FBa0JmLE1BQUksV0FBVyxJQUFJLFFBQUosQ0FBYTtBQUMzQixZQUFTLGVBQVQ7QUFDQSxXQUFRLEtBQVI7QUFDQSxZQUFTLGlCQUFTLFNBQVQsRUFBb0I7QUFDNUIsYUFBUyxhQUFULENBQXVCLG9CQUF2QixFQUE2QyxJQUE3QyxHQUQ0QjtJQUFwQjtHQUhLLENBQVgsQ0FsQlc7RUFBaEI7O0FBNEJBLFFBQU87QUFDTixRQUFNLElBQU47RUFERCxDQWpDNEI7Q0FBWixFQUFiOztrQkFzQ1ciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohXG5XYXlwb2ludHMgLSA0LjAuMFxuQ29weXJpZ2h0IMKpIDIwMTEtMjAxNSBDYWxlYiBUcm91Z2h0b25cbkxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbmh0dHBzOi8vZ2l0aHViLmNvbS9pbWFrZXdlYnRoaW5ncy93YXlwb2ludHMvYmxvZy9tYXN0ZXIvbGljZW5zZXMudHh0XG4qL1xuIWZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdChuKXtpZighbil0aHJvdyBuZXcgRXJyb3IoXCJObyBvcHRpb25zIHBhc3NlZCB0byBXYXlwb2ludCBjb25zdHJ1Y3RvclwiKTtpZighbi5lbGVtZW50KXRocm93IG5ldyBFcnJvcihcIk5vIGVsZW1lbnQgb3B0aW9uIHBhc3NlZCB0byBXYXlwb2ludCBjb25zdHJ1Y3RvclwiKTtpZighbi5oYW5kbGVyKXRocm93IG5ldyBFcnJvcihcIk5vIGhhbmRsZXIgb3B0aW9uIHBhc3NlZCB0byBXYXlwb2ludCBjb25zdHJ1Y3RvclwiKTt0aGlzLmtleT1cIndheXBvaW50LVwiK2UsdGhpcy5vcHRpb25zPXQuQWRhcHRlci5leHRlbmQoe30sdC5kZWZhdWx0cyxuKSx0aGlzLmVsZW1lbnQ9dGhpcy5vcHRpb25zLmVsZW1lbnQsdGhpcy5hZGFwdGVyPW5ldyB0LkFkYXB0ZXIodGhpcy5lbGVtZW50KSx0aGlzLmNhbGxiYWNrPW4uaGFuZGxlcix0aGlzLmF4aXM9dGhpcy5vcHRpb25zLmhvcml6b250YWw/XCJob3Jpem9udGFsXCI6XCJ2ZXJ0aWNhbFwiLHRoaXMuZW5hYmxlZD10aGlzLm9wdGlvbnMuZW5hYmxlZCx0aGlzLnRyaWdnZXJQb2ludD1udWxsLHRoaXMuZ3JvdXA9dC5Hcm91cC5maW5kT3JDcmVhdGUoe25hbWU6dGhpcy5vcHRpb25zLmdyb3VwLGF4aXM6dGhpcy5heGlzfSksdGhpcy5jb250ZXh0PXQuQ29udGV4dC5maW5kT3JDcmVhdGVCeUVsZW1lbnQodGhpcy5vcHRpb25zLmNvbnRleHQpLHQub2Zmc2V0QWxpYXNlc1t0aGlzLm9wdGlvbnMub2Zmc2V0XSYmKHRoaXMub3B0aW9ucy5vZmZzZXQ9dC5vZmZzZXRBbGlhc2VzW3RoaXMub3B0aW9ucy5vZmZzZXRdKSx0aGlzLmdyb3VwLmFkZCh0aGlzKSx0aGlzLmNvbnRleHQuYWRkKHRoaXMpLGlbdGhpcy5rZXldPXRoaXMsZSs9MX12YXIgZT0wLGk9e307dC5wcm90b3R5cGUucXVldWVUcmlnZ2VyPWZ1bmN0aW9uKHQpe3RoaXMuZ3JvdXAucXVldWVUcmlnZ2VyKHRoaXMsdCl9LHQucHJvdG90eXBlLnRyaWdnZXI9ZnVuY3Rpb24odCl7dGhpcy5lbmFibGVkJiZ0aGlzLmNhbGxiYWNrJiZ0aGlzLmNhbGxiYWNrLmFwcGx5KHRoaXMsdCl9LHQucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0aGlzLmNvbnRleHQucmVtb3ZlKHRoaXMpLHRoaXMuZ3JvdXAucmVtb3ZlKHRoaXMpLGRlbGV0ZSBpW3RoaXMua2V5XX0sdC5wcm90b3R5cGUuZGlzYWJsZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVuYWJsZWQ9ITEsdGhpc30sdC5wcm90b3R5cGUuZW5hYmxlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29udGV4dC5yZWZyZXNoKCksdGhpcy5lbmFibGVkPSEwLHRoaXN9LHQucHJvdG90eXBlLm5leHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5ncm91cC5uZXh0KHRoaXMpfSx0LnByb3RvdHlwZS5wcmV2aW91cz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmdyb3VwLnByZXZpb3VzKHRoaXMpfSx0Lmludm9rZUFsbD1mdW5jdGlvbih0KXt2YXIgZT1bXTtmb3IodmFyIG4gaW4gaSllLnB1c2goaVtuXSk7Zm9yKHZhciBvPTAscj1lLmxlbmd0aDtyPm87bysrKWVbb11bdF0oKX0sdC5kZXN0cm95QWxsPWZ1bmN0aW9uKCl7dC5pbnZva2VBbGwoXCJkZXN0cm95XCIpfSx0LmRpc2FibGVBbGw9ZnVuY3Rpb24oKXt0Lmludm9rZUFsbChcImRpc2FibGVcIil9LHQuZW5hYmxlQWxsPWZ1bmN0aW9uKCl7dC5pbnZva2VBbGwoXCJlbmFibGVcIil9LHQucmVmcmVzaEFsbD1mdW5jdGlvbigpe3QuQ29udGV4dC5yZWZyZXNoQWxsKCl9LHQudmlld3BvcnRIZWlnaHQ9ZnVuY3Rpb24oKXtyZXR1cm4gd2luZG93LmlubmVySGVpZ2h0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0fSx0LnZpZXdwb3J0V2lkdGg9ZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRofSx0LmFkYXB0ZXJzPVtdLHQuZGVmYXVsdHM9e2NvbnRleHQ6d2luZG93LGNvbnRpbnVvdXM6ITAsZW5hYmxlZDohMCxncm91cDpcImRlZmF1bHRcIixob3Jpem9udGFsOiExLG9mZnNldDowfSx0Lm9mZnNldEFsaWFzZXM9e1wiYm90dG9tLWluLXZpZXdcIjpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNvbnRleHQuaW5uZXJIZWlnaHQoKS10aGlzLmFkYXB0ZXIub3V0ZXJIZWlnaHQoKX0sXCJyaWdodC1pbi12aWV3XCI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0LmlubmVyV2lkdGgoKS10aGlzLmFkYXB0ZXIub3V0ZXJXaWR0aCgpfX0sd2luZG93LldheXBvaW50PXR9KCksZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQpe3dpbmRvdy5zZXRUaW1lb3V0KHQsMWUzLzYwKX1mdW5jdGlvbiBlKHQpe3RoaXMuZWxlbWVudD10LHRoaXMuQWRhcHRlcj1vLkFkYXB0ZXIsdGhpcy5hZGFwdGVyPW5ldyB0aGlzLkFkYXB0ZXIodCksdGhpcy5rZXk9XCJ3YXlwb2ludC1jb250ZXh0LVwiK2ksdGhpcy5kaWRTY3JvbGw9ITEsdGhpcy5kaWRSZXNpemU9ITEsdGhpcy5vbGRTY3JvbGw9e3g6dGhpcy5hZGFwdGVyLnNjcm9sbExlZnQoKSx5OnRoaXMuYWRhcHRlci5zY3JvbGxUb3AoKX0sdGhpcy53YXlwb2ludHM9e3ZlcnRpY2FsOnt9LGhvcml6b250YWw6e319LHQud2F5cG9pbnRDb250ZXh0S2V5PXRoaXMua2V5LG5bdC53YXlwb2ludENvbnRleHRLZXldPXRoaXMsaSs9MSx0aGlzLmNyZWF0ZVRocm90dGxlZFNjcm9sbEhhbmRsZXIoKSx0aGlzLmNyZWF0ZVRocm90dGxlZFJlc2l6ZUhhbmRsZXIoKX12YXIgaT0wLG49e30sbz13aW5kb3cuV2F5cG9pbnQscj13aW5kb3cub25sb2FkO2UucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt2YXIgZT10Lm9wdGlvbnMuaG9yaXpvbnRhbD9cImhvcml6b250YWxcIjpcInZlcnRpY2FsXCI7dGhpcy53YXlwb2ludHNbZV1bdC5rZXldPXQsdGhpcy5yZWZyZXNoKCl9LGUucHJvdG90eXBlLmNoZWNrRW1wdHk9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLkFkYXB0ZXIuaXNFbXB0eU9iamVjdCh0aGlzLndheXBvaW50cy5ob3Jpem9udGFsKSxlPXRoaXMuQWRhcHRlci5pc0VtcHR5T2JqZWN0KHRoaXMud2F5cG9pbnRzLnZlcnRpY2FsKTt0JiZlJiYodGhpcy5hZGFwdGVyLm9mZihcIi53YXlwb2ludHNcIiksZGVsZXRlIG5bdGhpcy5rZXldKX0sZS5wcm90b3R5cGUuY3JlYXRlVGhyb3R0bGVkUmVzaXplSGFuZGxlcj1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXtlLmhhbmRsZVJlc2l6ZSgpLGUuZGlkUmVzaXplPSExfXZhciBlPXRoaXM7dGhpcy5hZGFwdGVyLm9uKFwicmVzaXplLndheXBvaW50c1wiLGZ1bmN0aW9uKCl7ZS5kaWRSZXNpemV8fChlLmRpZFJlc2l6ZT0hMCxvLnJlcXVlc3RBbmltYXRpb25GcmFtZSh0KSl9KX0sZS5wcm90b3R5cGUuY3JlYXRlVGhyb3R0bGVkU2Nyb2xsSGFuZGxlcj1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXtlLmhhbmRsZVNjcm9sbCgpLGUuZGlkU2Nyb2xsPSExfXZhciBlPXRoaXM7dGhpcy5hZGFwdGVyLm9uKFwic2Nyb2xsLndheXBvaW50c1wiLGZ1bmN0aW9uKCl7KCFlLmRpZFNjcm9sbHx8by5pc1RvdWNoKSYmKGUuZGlkU2Nyb2xsPSEwLG8ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHQpKX0pfSxlLnByb3RvdHlwZS5oYW5kbGVSZXNpemU9ZnVuY3Rpb24oKXtvLkNvbnRleHQucmVmcmVzaEFsbCgpfSxlLnByb3RvdHlwZS5oYW5kbGVTY3JvbGw9ZnVuY3Rpb24oKXt2YXIgdD17fSxlPXtob3Jpem9udGFsOntuZXdTY3JvbGw6dGhpcy5hZGFwdGVyLnNjcm9sbExlZnQoKSxvbGRTY3JvbGw6dGhpcy5vbGRTY3JvbGwueCxmb3J3YXJkOlwicmlnaHRcIixiYWNrd2FyZDpcImxlZnRcIn0sdmVydGljYWw6e25ld1Njcm9sbDp0aGlzLmFkYXB0ZXIuc2Nyb2xsVG9wKCksb2xkU2Nyb2xsOnRoaXMub2xkU2Nyb2xsLnksZm9yd2FyZDpcImRvd25cIixiYWNrd2FyZDpcInVwXCJ9fTtmb3IodmFyIGkgaW4gZSl7dmFyIG49ZVtpXSxvPW4ubmV3U2Nyb2xsPm4ub2xkU2Nyb2xsLHI9bz9uLmZvcndhcmQ6bi5iYWNrd2FyZDtmb3IodmFyIHMgaW4gdGhpcy53YXlwb2ludHNbaV0pe3ZhciBsPXRoaXMud2F5cG9pbnRzW2ldW3NdLGE9bi5vbGRTY3JvbGw8bC50cmlnZ2VyUG9pbnQsaD1uLm5ld1Njcm9sbD49bC50cmlnZ2VyUG9pbnQscD1hJiZoLHU9IWEmJiFoOyhwfHx1KSYmKGwucXVldWVUcmlnZ2VyKHIpLHRbbC5ncm91cC5pZF09bC5ncm91cCl9fWZvcih2YXIgYyBpbiB0KXRbY10uZmx1c2hUcmlnZ2VycygpO3RoaXMub2xkU2Nyb2xsPXt4OmUuaG9yaXpvbnRhbC5uZXdTY3JvbGwseTplLnZlcnRpY2FsLm5ld1Njcm9sbH19LGUucHJvdG90eXBlLmlubmVySGVpZ2h0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWxlbWVudD09dGhpcy5lbGVtZW50LndpbmRvdz9vLnZpZXdwb3J0SGVpZ2h0KCk6dGhpcy5hZGFwdGVyLmlubmVySGVpZ2h0KCl9LGUucHJvdG90eXBlLnJlbW92ZT1mdW5jdGlvbih0KXtkZWxldGUgdGhpcy53YXlwb2ludHNbdC5heGlzXVt0LmtleV0sdGhpcy5jaGVja0VtcHR5KCl9LGUucHJvdG90eXBlLmlubmVyV2lkdGg9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbGVtZW50PT10aGlzLmVsZW1lbnQud2luZG93P28udmlld3BvcnRXaWR0aCgpOnRoaXMuYWRhcHRlci5pbm5lcldpZHRoKCl9LGUucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt2YXIgdD1bXTtmb3IodmFyIGUgaW4gdGhpcy53YXlwb2ludHMpZm9yKHZhciBpIGluIHRoaXMud2F5cG9pbnRzW2VdKXQucHVzaCh0aGlzLndheXBvaW50c1tlXVtpXSk7Zm9yKHZhciBuPTAsbz10Lmxlbmd0aDtvPm47bisrKXRbbl0uZGVzdHJveSgpfSxlLnByb3RvdHlwZS5yZWZyZXNoPWZ1bmN0aW9uKCl7dmFyIHQsZT10aGlzLmVsZW1lbnQ9PXRoaXMuZWxlbWVudC53aW5kb3csaT1lP3ZvaWQgMDp0aGlzLmFkYXB0ZXIub2Zmc2V0KCksbj17fTt0aGlzLmhhbmRsZVNjcm9sbCgpLHQ9e2hvcml6b250YWw6e2NvbnRleHRPZmZzZXQ6ZT8wOmkubGVmdCxjb250ZXh0U2Nyb2xsOmU/MDp0aGlzLm9sZFNjcm9sbC54LGNvbnRleHREaW1lbnNpb246dGhpcy5pbm5lcldpZHRoKCksb2xkU2Nyb2xsOnRoaXMub2xkU2Nyb2xsLngsZm9yd2FyZDpcInJpZ2h0XCIsYmFja3dhcmQ6XCJsZWZ0XCIsb2Zmc2V0UHJvcDpcImxlZnRcIn0sdmVydGljYWw6e2NvbnRleHRPZmZzZXQ6ZT8wOmkudG9wLGNvbnRleHRTY3JvbGw6ZT8wOnRoaXMub2xkU2Nyb2xsLnksY29udGV4dERpbWVuc2lvbjp0aGlzLmlubmVySGVpZ2h0KCksb2xkU2Nyb2xsOnRoaXMub2xkU2Nyb2xsLnksZm9yd2FyZDpcImRvd25cIixiYWNrd2FyZDpcInVwXCIsb2Zmc2V0UHJvcDpcInRvcFwifX07Zm9yKHZhciByIGluIHQpe3ZhciBzPXRbcl07Zm9yKHZhciBsIGluIHRoaXMud2F5cG9pbnRzW3JdKXt2YXIgYSxoLHAsdSxjLGY9dGhpcy53YXlwb2ludHNbcl1bbF0sZD1mLm9wdGlvbnMub2Zmc2V0LHk9Zi50cmlnZ2VyUG9pbnQsZz0wLHc9bnVsbD09eTtmLmVsZW1lbnQhPT1mLmVsZW1lbnQud2luZG93JiYoZz1mLmFkYXB0ZXIub2Zmc2V0KClbcy5vZmZzZXRQcm9wXSksXCJmdW5jdGlvblwiPT10eXBlb2YgZD9kPWQuYXBwbHkoZik6XCJzdHJpbmdcIj09dHlwZW9mIGQmJihkPXBhcnNlRmxvYXQoZCksZi5vcHRpb25zLm9mZnNldC5pbmRleE9mKFwiJVwiKT4tMSYmKGQ9TWF0aC5jZWlsKHMuY29udGV4dERpbWVuc2lvbipkLzEwMCkpKSxhPXMuY29udGV4dFNjcm9sbC1zLmNvbnRleHRPZmZzZXQsZi50cmlnZ2VyUG9pbnQ9ZythLWQsaD15PHMub2xkU2Nyb2xsLHA9Zi50cmlnZ2VyUG9pbnQ+PXMub2xkU2Nyb2xsLHU9aCYmcCxjPSFoJiYhcCwhdyYmdT8oZi5xdWV1ZVRyaWdnZXIocy5iYWNrd2FyZCksbltmLmdyb3VwLmlkXT1mLmdyb3VwKTohdyYmYz8oZi5xdWV1ZVRyaWdnZXIocy5mb3J3YXJkKSxuW2YuZ3JvdXAuaWRdPWYuZ3JvdXApOncmJnMub2xkU2Nyb2xsPj1mLnRyaWdnZXJQb2ludCYmKGYucXVldWVUcmlnZ2VyKHMuZm9yd2FyZCksbltmLmdyb3VwLmlkXT1mLmdyb3VwKX19cmV0dXJuIG8ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7Zm9yKHZhciB0IGluIG4pblt0XS5mbHVzaFRyaWdnZXJzKCl9KSx0aGlzfSxlLmZpbmRPckNyZWF0ZUJ5RWxlbWVudD1mdW5jdGlvbih0KXtyZXR1cm4gZS5maW5kQnlFbGVtZW50KHQpfHxuZXcgZSh0KX0sZS5yZWZyZXNoQWxsPWZ1bmN0aW9uKCl7Zm9yKHZhciB0IGluIG4pblt0XS5yZWZyZXNoKCl9LGUuZmluZEJ5RWxlbWVudD1mdW5jdGlvbih0KXtyZXR1cm4gblt0LndheXBvaW50Q29udGV4dEtleV19LHdpbmRvdy5vbmxvYWQ9ZnVuY3Rpb24oKXtyJiZyKCksZS5yZWZyZXNoQWxsKCl9LG8ucmVxdWVzdEFuaW1hdGlvbkZyYW1lPWZ1bmN0aW9uKGUpe3ZhciBpPXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHQ7aS5jYWxsKHdpbmRvdyxlKX0sby5Db250ZXh0PWV9KCksZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQsZSl7cmV0dXJuIHQudHJpZ2dlclBvaW50LWUudHJpZ2dlclBvaW50fWZ1bmN0aW9uIGUodCxlKXtyZXR1cm4gZS50cmlnZ2VyUG9pbnQtdC50cmlnZ2VyUG9pbnR9ZnVuY3Rpb24gaSh0KXt0aGlzLm5hbWU9dC5uYW1lLHRoaXMuYXhpcz10LmF4aXMsdGhpcy5pZD10aGlzLm5hbWUrXCItXCIrdGhpcy5heGlzLHRoaXMud2F5cG9pbnRzPVtdLHRoaXMuY2xlYXJUcmlnZ2VyUXVldWVzKCksblt0aGlzLmF4aXNdW3RoaXMubmFtZV09dGhpc312YXIgbj17dmVydGljYWw6e30saG9yaXpvbnRhbDp7fX0sbz13aW5kb3cuV2F5cG9pbnQ7aS5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3RoaXMud2F5cG9pbnRzLnB1c2godCl9LGkucHJvdG90eXBlLmNsZWFyVHJpZ2dlclF1ZXVlcz1mdW5jdGlvbigpe3RoaXMudHJpZ2dlclF1ZXVlcz17dXA6W10sZG93bjpbXSxsZWZ0OltdLHJpZ2h0OltdfX0saS5wcm90b3R5cGUuZmx1c2hUcmlnZ2Vycz1mdW5jdGlvbigpe2Zvcih2YXIgaSBpbiB0aGlzLnRyaWdnZXJRdWV1ZXMpe3ZhciBuPXRoaXMudHJpZ2dlclF1ZXVlc1tpXSxvPVwidXBcIj09PWl8fFwibGVmdFwiPT09aTtuLnNvcnQobz9lOnQpO2Zvcih2YXIgcj0wLHM9bi5sZW5ndGg7cz5yO3IrPTEpe3ZhciBsPW5bcl07KGwub3B0aW9ucy5jb250aW51b3VzfHxyPT09bi5sZW5ndGgtMSkmJmwudHJpZ2dlcihbaV0pfX10aGlzLmNsZWFyVHJpZ2dlclF1ZXVlcygpfSxpLnByb3RvdHlwZS5uZXh0PWZ1bmN0aW9uKGUpe3RoaXMud2F5cG9pbnRzLnNvcnQodCk7dmFyIGk9by5BZGFwdGVyLmluQXJyYXkoZSx0aGlzLndheXBvaW50cyksbj1pPT09dGhpcy53YXlwb2ludHMubGVuZ3RoLTE7cmV0dXJuIG4/bnVsbDp0aGlzLndheXBvaW50c1tpKzFdfSxpLnByb3RvdHlwZS5wcmV2aW91cz1mdW5jdGlvbihlKXt0aGlzLndheXBvaW50cy5zb3J0KHQpO3ZhciBpPW8uQWRhcHRlci5pbkFycmF5KGUsdGhpcy53YXlwb2ludHMpO3JldHVybiBpP3RoaXMud2F5cG9pbnRzW2ktMV06bnVsbH0saS5wcm90b3R5cGUucXVldWVUcmlnZ2VyPWZ1bmN0aW9uKHQsZSl7dGhpcy50cmlnZ2VyUXVldWVzW2VdLnB1c2godCl9LGkucHJvdG90eXBlLnJlbW92ZT1mdW5jdGlvbih0KXt2YXIgZT1vLkFkYXB0ZXIuaW5BcnJheSh0LHRoaXMud2F5cG9pbnRzKTtlPi0xJiZ0aGlzLndheXBvaW50cy5zcGxpY2UoZSwxKX0saS5wcm90b3R5cGUuZmlyc3Q9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy53YXlwb2ludHNbMF19LGkucHJvdG90eXBlLmxhc3Q9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy53YXlwb2ludHNbdGhpcy53YXlwb2ludHMubGVuZ3RoLTFdfSxpLmZpbmRPckNyZWF0ZT1mdW5jdGlvbih0KXtyZXR1cm4gblt0LmF4aXNdW3QubmFtZV18fG5ldyBpKHQpfSxvLkdyb3VwPWl9KCksZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQpe3JldHVybiB0PT09dC53aW5kb3d9ZnVuY3Rpb24gZShlKXtyZXR1cm4gdChlKT9lOmUuZGVmYXVsdFZpZXd9ZnVuY3Rpb24gaSh0KXt0aGlzLmVsZW1lbnQ9dCx0aGlzLmhhbmRsZXJzPXt9fXZhciBuPXdpbmRvdy5XYXlwb2ludDtpLnByb3RvdHlwZS5pbm5lckhlaWdodD1mdW5jdGlvbigpe3ZhciBlPXQodGhpcy5lbGVtZW50KTtyZXR1cm4gZT90aGlzLmVsZW1lbnQuaW5uZXJIZWlnaHQ6dGhpcy5lbGVtZW50LmNsaWVudEhlaWdodH0saS5wcm90b3R5cGUuaW5uZXJXaWR0aD1mdW5jdGlvbigpe3ZhciBlPXQodGhpcy5lbGVtZW50KTtyZXR1cm4gZT90aGlzLmVsZW1lbnQuaW5uZXJXaWR0aDp0aGlzLmVsZW1lbnQuY2xpZW50V2lkdGh9LGkucHJvdG90eXBlLm9mZj1mdW5jdGlvbih0LGUpe2Z1bmN0aW9uIGkodCxlLGkpe2Zvcih2YXIgbj0wLG89ZS5sZW5ndGgtMTtvPm47bisrKXt2YXIgcj1lW25dO2kmJmkhPT1yfHx0LnJlbW92ZUV2ZW50TGlzdGVuZXIocil9fXZhciBuPXQuc3BsaXQoXCIuXCIpLG89blswXSxyPW5bMV0scz10aGlzLmVsZW1lbnQ7aWYociYmdGhpcy5oYW5kbGVyc1tyXSYmbylpKHMsdGhpcy5oYW5kbGVyc1tyXVtvXSxlKSx0aGlzLmhhbmRsZXJzW3JdW29dPVtdO2Vsc2UgaWYobylmb3IodmFyIGwgaW4gdGhpcy5oYW5kbGVycylpKHMsdGhpcy5oYW5kbGVyc1tsXVtvXXx8W10sZSksdGhpcy5oYW5kbGVyc1tsXVtvXT1bXTtlbHNlIGlmKHImJnRoaXMuaGFuZGxlcnNbcl0pe2Zvcih2YXIgYSBpbiB0aGlzLmhhbmRsZXJzW3JdKWkocyx0aGlzLmhhbmRsZXJzW3JdW2FdLGUpO3RoaXMuaGFuZGxlcnNbcl09e319fSxpLnByb3RvdHlwZS5vZmZzZXQ9ZnVuY3Rpb24oKXtpZighdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQpcmV0dXJuIG51bGw7dmFyIHQ9dGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LGk9ZSh0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudCksbj17dG9wOjAsbGVmdDowfTtyZXR1cm4gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCYmKG49dGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSx7dG9wOm4udG9wK2kucGFnZVlPZmZzZXQtdC5jbGllbnRUb3AsbGVmdDpuLmxlZnQraS5wYWdlWE9mZnNldC10LmNsaWVudExlZnR9fSxpLnByb3RvdHlwZS5vbj1mdW5jdGlvbih0LGUpe3ZhciBpPXQuc3BsaXQoXCIuXCIpLG49aVswXSxvPWlbMV18fFwiX19kZWZhdWx0XCIscj10aGlzLmhhbmRsZXJzW29dPXRoaXMuaGFuZGxlcnNbb118fHt9LHM9cltuXT1yW25dfHxbXTtzLnB1c2goZSksdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIobixlKX0saS5wcm90b3R5cGUub3V0ZXJIZWlnaHQ9ZnVuY3Rpb24oZSl7dmFyIGksbj10aGlzLmlubmVySGVpZ2h0KCk7cmV0dXJuIGUmJiF0KHRoaXMuZWxlbWVudCkmJihpPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudCksbis9cGFyc2VJbnQoaS5tYXJnaW5Ub3AsMTApLG4rPXBhcnNlSW50KGkubWFyZ2luQm90dG9tLDEwKSksbn0saS5wcm90b3R5cGUub3V0ZXJXaWR0aD1mdW5jdGlvbihlKXt2YXIgaSxuPXRoaXMuaW5uZXJXaWR0aCgpO3JldHVybiBlJiYhdCh0aGlzLmVsZW1lbnQpJiYoaT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnQpLG4rPXBhcnNlSW50KGkubWFyZ2luTGVmdCwxMCksbis9cGFyc2VJbnQoaS5tYXJnaW5SaWdodCwxMCkpLG59LGkucHJvdG90eXBlLnNjcm9sbExlZnQ9ZnVuY3Rpb24oKXt2YXIgdD1lKHRoaXMuZWxlbWVudCk7cmV0dXJuIHQ/dC5wYWdlWE9mZnNldDp0aGlzLmVsZW1lbnQuc2Nyb2xsTGVmdH0saS5wcm90b3R5cGUuc2Nyb2xsVG9wPWZ1bmN0aW9uKCl7dmFyIHQ9ZSh0aGlzLmVsZW1lbnQpO3JldHVybiB0P3QucGFnZVlPZmZzZXQ6dGhpcy5lbGVtZW50LnNjcm9sbFRvcH0saS5leHRlbmQ9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHQsZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIHQmJlwib2JqZWN0XCI9PXR5cGVvZiBlKWZvcih2YXIgaSBpbiBlKWUuaGFzT3duUHJvcGVydHkoaSkmJih0W2ldPWVbaV0pO3JldHVybiB0fWZvcih2YXIgZT1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLGk9MSxuPWUubGVuZ3RoO24+aTtpKyspdChlWzBdLGVbaV0pO3JldHVybiBlWzBdfSxpLmluQXJyYXk9ZnVuY3Rpb24odCxlLGkpe3JldHVybiBudWxsPT1lPy0xOmUuaW5kZXhPZih0LGkpfSxpLmlzRW1wdHlPYmplY3Q9ZnVuY3Rpb24odCl7Zm9yKHZhciBlIGluIHQpcmV0dXJuITE7cmV0dXJuITB9LG4uYWRhcHRlcnMucHVzaCh7bmFtZTpcIm5vZnJhbWV3b3JrXCIsQWRhcHRlcjppfSksbi5BZGFwdGVyPWl9KCk7IiwiaW1wb3J0IHByaW1lbGFicyBmcm9tICcuL3BhcnRpYWxzL3ByaW1lbGFicy5qcyc7XG5pbXBvcnQgbWVudSBmcm9tICcuL3BhcnRpYWxzL21lbnUuanMnO1xuaW1wb3J0IGhvbWVTY3JvbGwgZnJvbSAnLi9wYXJ0aWFscy9ob21lU2Nyb2xsLmpzJztcbmltcG9ydCBqb3VybmFsTmF2IGZyb20gJy4vcGFydGlhbHMvam91cm5hbE5hdi5qcyc7XG5pbXBvcnQgZGFzaGJvYXJkIGZyb20gJy4vcGFydGlhbHMvZGFzaGJvYXJkLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblx0bWVudS5pbml0KCk7XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXcnKSkge1xuXHRcdGhvbWVTY3JvbGwuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzJykpIHtcblx0XHRwcmltZWxhYnMuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmQnKSkge1xuXHRcdGRhc2hib2FyZC5pbml0KCk7XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlJykpIHtcblx0XHRqb3VybmFsTmF2LmluaXQoKTtcblx0fVxufSk7XG4iLCJsZXQgZGFzaGJvYXJkID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IHByb2Nlc3NTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fcHJvY2VzcycpO1xuXHRsZXQgc2Nyb2xsU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX3NpdGUtc2Nyb2xsJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblxuXHRcdC8vIGluaXQgY29udHJvbGxlclxuXHRcdHZhciBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuXHRcdC8vIGNyZWF0ZSBhIHNjZW5lXG5cdFx0bmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcblx0XHRcdHRyaWdnZXJFbGVtZW50OiBwcm9jZXNzU2VjdGlvbixcblx0XHRcdG9mZnNldDogNTAsXG5cdFx0XHRyZXZlcnNlOiBmYWxzZVxuXHRcdH0pLm9uKCdzdGFydCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGFuaW1hdGlvblByb2Nlc3MoKTtcblx0XHR9KVxuXHRcdC5hZGRUbyhjb250cm9sbGVyKTsgLy8gYXNzaWduIHRoZSBzY2VuZSB0byB0aGUgY29udHJvbGxlclxuXG5cdFx0Ly8gY3JlYXRlIGEgc2NlbmVcblx0XHRuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xuXHRcdFx0dHJpZ2dlckVsZW1lbnQ6IHNjcm9sbFNlY3Rpb24sXG5cdFx0XHRvZmZzZXQ6IDUwLFxuXHRcdFx0cmV2ZXJzZTogZmFsc2Vcblx0XHR9KS5vbignc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzaXRlU2Nyb2xsKCk7XG5cdFx0fSlcblx0XHQuYWRkVG8oY29udHJvbGxlcik7IC8vIGFzc2lnbiB0aGUgc2NlbmUgdG8gdGhlIGNvbnRyb2xsZXJcblxuXHR9XG5cblx0ZnVuY3Rpb24gc2l0ZVNjcm9sbCgpIHtcblx0XHRsZXQgaW1hZ2UgPSBzY3JvbGxTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYW5pbWF0aW9uUHJvY2VzcygpIHtcblx0XHRsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcblx0XHRsZXQgaW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19wcm9jZXNzX19pbm5lcicpO1xuXG5cdFx0Ly8gRmlndXJlc1xuXHRcdGxldCBsb2NhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2ZpZ3VyZS0tbG9jYWwnKTtcblx0XHRsZXQgcmVtb3RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZmlndXJlLS1yZW1vdGUnKTtcblx0XHRsZXQgZ2l0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZmlndXJlLS1naXQnKTtcblx0XHRsZXQgZmlsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19maWd1cmUtLWZpbGVzJyk7XG5cdFx0bGV0IHJlbGVhc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19maWd1cmUtLXJlbGVhc2UnKTtcblxuXHRcdC8vIENvbm5lY3RvcnNcblx0XHRsZXQgY29ubmVjdG9yQ2FwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fY29ubmVjdG9yLS1jYXBpc3RyYW5vJyk7XG5cdFx0bGV0IGNvbm5lY3RvckdpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2Nvbm5lY3Rvci0tZ2l0Jyk7XG5cdFx0bGV0IGNvbm5lY3RvckZpbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fY29ubmVjdG9yLS1maWxlcycpO1xuXHRcdGxldCBjb25uZWN0b3JSZWxlYXNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2Nvbm5lY3Rvci0tcmVsZWFzZXMnKTtcblxuXHRcdC8vIEFuaW1hdGlvblxuXHRcdGFkZEZpZ3VyZShsb2NhbCk7XG5cdFx0c2V0QWN0aXZlKGxvY2FsKTtcblx0XHRhZGRMaW5lKGNvbm5lY3RvckNhcCwgJ2Nvbm5lY3RvckNhcCcpO1xuXHRcdGFkZEZpZ3VyZShyZW1vdGUsICdwdWxzZUNhcCcpO1xuXHRcdHNlbmRQdWxzZShjb25uZWN0b3JDYXAsICdwdWxzZUNhcCcpO1xuXHRcdHNldEFjdGl2ZShyZW1vdGUpO1xuXHRcdGFkZExpbmUoY29ubmVjdG9yR2l0LCAnY29ubmVjdG9yR2l0Jyk7XG5cdFx0YWRkRmlndXJlKGdpdCk7XG5cdFx0c2VuZFB1bHNlKGNvbm5lY3RvckdpdCwgJ3B1bHNlR2l0Jyk7XG5cdFx0c2V0QWN0aXZlKGdpdCk7XG5cdFx0c2VuZFB1bHNlKGNvbm5lY3RvckdpdCwgJ3B1bHNlR2l0JywgJ2xlZnQnKTtcblx0XHR1bnNldEFjdGl2ZShnaXQpO1xuXHRcdHJlbW92ZUZpZ3VyZShnaXQpO1xuXHRcdHJlbW92ZUxpbmUoY29ubmVjdG9yR2l0KTtcblx0XHRhZGRMaW5lKGNvbm5lY3RvckZpbGVzLCAnY29ubmVjdG9yRmlsZXMnKTtcblx0XHRhZGRGaWd1cmUoZmlsZXMpO1xuXHRcdGFkZExpbmUoY29ubmVjdG9yUmVsZWFzZXMsICdjb25uZWN0b3JSZWxlYXNlcycpO1xuXHRcdGFkZEZpZ3VyZShyZWxlYXNlKTtcblxuXHRcdC8vIEhlbHBlciBmdW5jdGlvbnNcblx0XHRmdW5jdGlvbiBhZGRGaWd1cmUoZmlndXJlKSB7XG5cdFx0XHR0bC5mcm9tKGZpZ3VyZSwgMSwgeyB3aWR0aDogMCB9KVxuXHRcdFx0LnRvKGZpZ3VyZSwgMSwgeyBvcGFjaXR5OiAxIH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJlbW92ZUZpZ3VyZShmaWd1cmUpIHtcblx0XHRcdHRsLnRvKGZpZ3VyZSwgMC41LCB7IG9wYWNpdHk6IDAgfSlcblx0XHRcdC50byhmaWd1cmUsIDEsIHsgd2lkdGg6ICcwJywgbWFyZ2luOiAwLCBmbGV4OiAwIH0pO1xuXHRcdFx0Ly8gLnNldChmaWd1cmUsIHsgcG9zaXRpb246ICdhYnNvbHV0ZScgfSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVtb3ZlTGluZShjb25uZWN0b3IpIHtcblx0XHRcdHRsLnRvKGNvbm5lY3RvciwgMC41LCB7IG9wYWNpdHk6IDAgfSlcblx0XHRcdC50byhjb25uZWN0b3IsIDEsIHsgd2lkdGg6ICcwJywgbWFyZ2luOiAwLCBmbGV4OiAwIH0pO1xuXHRcdFx0Ly8gLnNldChjb25uZWN0b3IsIHsgcG9zaXRpb246ICdhYnNvbHV0ZScgfSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0QWN0aXZlKGZpZ3VyZSkge1xuXHRcdFx0bGV0IHBhdGggPSBmaWd1cmUucXVlcnlTZWxlY3RvcigncGF0aCcpO1xuXHRcdFx0dGwudG8ocGF0aCwgMC41LCB7IGZpbGw6ICcjOWQwZTEyJyB9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1bnNldEFjdGl2ZShmaWd1cmUpIHtcblx0XHRcdGxldCBwYXRoID0gZmlndXJlLnF1ZXJ5U2VsZWN0b3IoJ3BhdGgnKTtcblx0XHRcdHRsLnRvKHBhdGgsIDAuNSwgeyBmaWxsOiAnYmxhY2snIH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGFkZExpbmUoY29ubmVjdG9yLCBsYXllcikge1xuXHRcdFx0bGV0IGxpbmUgPSBjb25uZWN0b3IucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fY29ubmVjdG9yX19saW5lJyk7XG5cblx0XHRcdHRsLnRvKGNvbm5lY3RvciwgMSwgeyBvcGFjaXR5OiAxIH0sIGxheWVyKVxuXHRcdFx0LmZyb20oY29ubmVjdG9yLCAxLCB7IHdpZHRoOiAwLCB5OiAtMjAgfSwgbGF5ZXIpXG5cdFx0XHQudG8obGluZSwgMSwgeyB3aWR0aDogJzEwMCUnIH0pO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2VuZFB1bHNlKGNvbm5lY3RvciwgbGF5ZXIsIGRpcmVjdGlvbiA9ICdyaWdodCcpIHtcblx0XHRcdGxldCBwdWxzZSA9IGNvbm5lY3Rvci5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19jb25uZWN0b3JfX3B1bHNlJyk7XG5cblx0XHRcdGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuXHRcdFx0XHR0bC5zZXQocHVsc2UsIHsgbGVmdDogJzEwMCUnIH0pXG5cdFx0XHRcdC50byhwdWxzZSwgMC4zLCB7IG9wYWNpdHk6IDEgfSlcblx0XHRcdFx0LnRvKHB1bHNlLCAyLCB7IGxlZnQ6ICcwJyB9KVxuXHRcdFx0XHQudG8ocHVsc2UsIDAuMywgeyBvcGFjaXR5OiAwIH0pXG5cdFx0XHRcdC5zZXQocHVsc2UsIHsgbGVmdDogJzEwMCUnIH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGwudG8ocHVsc2UsIDAuMywgeyBvcGFjaXR5OiAxIH0pXG5cdFx0XHRcdC50byhwdWxzZSwgMiwgeyBsZWZ0OiAnMTAwJScgfSlcblx0XHRcdFx0LnRvKHB1bHNlLCAwLjMsIHsgb3BhY2l0eTogMCB9KVxuXHRcdFx0XHQudG8ocHVsc2UsIDAsIHsgbGVmdDogJzAnIH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBkYXNoYm9hcmQ7XG4iLCJsZXQgaG9tZVNjcm9sbCA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBuYXZJdGVtcztcblx0bGV0IGRlbHRhID0gMDtcblx0bGV0IGN1cnJlbnRTbGlkZTtcblx0bGV0IG5leHRTbGlkZTtcblx0bGV0IHByZXZpb3VzU2xpZGU7XG5cdGxldCBwcmV2aW91c1NsaWRlcztcblx0bGV0IGlzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXHRsZXQgbGFzdFNjcm9sbGVkO1xuXHRsZXQgbW91c2V3aGVlbENhblNjcm9sbCA9IHRydWU7XG5cdGxldCBsYXN0TW91c2V3aGVlbFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRsZXQgbGFzdFNjcm9sbFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRsZXQgc2Nyb2xscyA9IFtdO1xuXHRsZXQgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy1jb250YWluZXJfX25hdicpO1xuXHRsZXQgd29ya1NsaWRlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXcnKSk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpZiAobmF2KSB7XG5cdFx0XHRuYXZJdGVtcyA9IG5hdi5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG5cdFx0fVxuXHRcdGFuaW1hdGVJbml0aWFsKCk7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiByZXNldFNjcm9sbCgpIHtcblx0XHRzY3JvbGxzID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2Nyb2xsc0F2ZyhvZmZzZXQpIHtcblx0XHRsZXQgc3VtID0gMDtcblxuXHRcdGxldCBlbG1zID0gc2Nyb2xscy5zbGljZShNYXRoLm1heChzY3JvbGxzLmxlbmd0aCAtIG9mZnNldCwgMSkpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbG1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRzdW0gKz0gZWxtc1tpXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKHN1bSAvIG9mZnNldCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhbmltYXRlSW5pdGlhbCgpIHtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRsZXQgZmlyc3RXb3JrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tMScpO1xuXHRcdFx0Zmlyc3RXb3JrLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmF2SXRlbXNbMF0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctY29udGFpbmVyX19uYXZfX2l0ZW0tLWlzLWFjdGl2ZScpO1xuXHRcdH0sIDIwMCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZE5hdik7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgc2Nyb2xsTmF2KTtcblxuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuYXZJdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bmF2SXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVOYXYpO1xuXHRcdH1cblx0XHRcblx0XHQvLyAkKCcud29yay1wcmV2aWV3LWNvbnRhaW5lcicpLnN3aXBlKHtcblx0XHQvLyBcdHN3aXBlOmZ1bmN0aW9uKGV2ZW50LCBkaXJlY3Rpb24sIGRpc3RhbmNlLCBkdXJhdGlvbiwgZmluZ2VyQ291bnQpIHtcblx0XHQvLyBcdFx0Y29uc29sZS5sb2coIFwiWW91IHN3aXBlZCBcIiArIGRpcmVjdGlvbiApO1xuXHRcdC8vIFx0fSxcblx0XHQvLyBcdGFsbG93UGFnZVNjcm9sbDondmVydGljYWwnXG5cdFx0Ly8gfSk7XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVOYXYoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGxldCBzbGlkZU51bWJlciA9IGV2ZW50LnRhcmdldC5pbm5lckhUTUwuc3Vic3RyaW5nKDEpO1xuXG5cdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0Z29Ub1NsaWRlKHNsaWRlTnVtYmVyKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBoaWdobGlnaHRBY3RpdmVOYXYoKSB7XG5cdFx0Ly8gUmVtb3ZlIHRoZSBhY3RpdmUgY2xhc3Ncblx0XHRsZXQgYWN0aXZlTmF2Q2xhc3MgPSAnd29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2X19pdGVtLS1pcy1hY3RpdmUnO1xuXHRcdGxldCBhY3RpdmVOYXZJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBhY3RpdmVOYXZDbGFzcyk7XG5cdFx0YWN0aXZlTmF2SXRlbS5jbGFzc0xpc3QucmVtb3ZlKGFjdGl2ZU5hdkNsYXNzKTtcblxuXHRcdGxldCBuZXh0TnVtYmVyID0gbmV4dFNsaWRlLmlkLnN1YnN0cmluZyhuZXh0U2xpZGUuaWQubGVuZ3RoIC0xKTtcblx0XHRjb25zb2xlLmxvZyhuZXh0TnVtYmVyKTtcblxuXHRcdG5hdkl0ZW1zW25leHROdW1iZXIgLSAxXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoYWN0aXZlTmF2Q2xhc3MpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ29Ub1NsaWRlKHNsaWRlTnVtYmVyKSB7XG5cdFx0bmV4dFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tJyArIHNsaWRlTnVtYmVyICk7XG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0aWYgKG5leHRTbGlkZSkge1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblxuXHRcdFx0bGV0IGN1cnJlbnROdW1iZXIgPSBjdXJyZW50U2xpZGUuaWQuc3Vic3RyaW5nKGN1cnJlbnRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXHRcdFx0bGV0IG5leHROdW1iZXIgPSBuZXh0U2xpZGUuaWQuc3Vic3RyaW5nKG5leHRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXG5cdFx0XHRpZiAoY3VycmVudE51bWJlciA+IG5leHROdW1iZXIpIHtcblx0XHRcdFx0Ly8gSWYgd2UncmUgZ29pbmcgYmFja3dhcmRzXG5cdFx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblxuXHRcdFx0XHQvLyBOZWVkIHRvIGFkZCBuZXh0IHRvIEFMTCBnb2luZyBmb3J3YXJkXG5cdFx0XHRcdGxldCBwcmV2aW91c1NsaWRlcyA9IHdvcmtTbGlkZXMuc2xpY2UobmV4dE51bWJlciwgY3VycmVudE51bWJlciAtIDEpO1xuXG5cdFx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHByZXZpb3VzU2xpZGVzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRcdHByZXZpb3VzU2xpZGVzW2ldLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIElmIHdlJ3JlIGdvaW5nIGZvcndhcmRzXG5cdFx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHR9XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGxOYXYoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHQvLyBjb25zb2xlLmxvZygnZmlyZWQnKTtcblxuXHRcdGxldCBzY3JvbGxUaHJlc2hvbGQgPSA0MDtcblxuXHRcdGxldCB2YWx1ZSA9IC1lLmRlbHRhWTtcblxuXHRcdGlmIChzY3JvbGxzLmxlbmd0aCA+IDE1MCkge1xuXHRcdFx0c2Nyb2xscy5zaGlmdCgpO1xuXHRcdH1cblxuXHRcdHNjcm9sbHMucHVzaChNYXRoLmFicyh2YWx1ZSkpO1xuXG5cdFx0dmFyIGN1cnJUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuXHRcdGlmICgoY3VyclRpbWUgLSBsYXN0TW91c2V3aGVlbFRpbWUpID4gMjAwKSB7XG5cdFx0XHRyZXNldFNjcm9sbCgpO1xuXHRcdH1cblxuXHRcdGxhc3RNb3VzZXdoZWVsVGltZSA9IGN1cnJUaW1lO1xuXG5cdFx0dmFyIGxhc3RBdmcgPSBzY3JvbGxzQXZnKDUpO1xuXHRcdHZhciBtaWRBdmcgPSBzY3JvbGxzQXZnKDQwKTtcblxuXHRcdGlmIChsYXN0QXZnID4gbWlkQXZnKSB7XG5cdFx0XHRpZiAobW91c2V3aGVlbENhblNjcm9sbCAmJiBpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAodmFsdWUgPCAwKSB7XG5cdFx0XHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBrZXlib2FyZE5hdihldmVudCkge1xuXHRcdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRcdGNhc2UgMzg6XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgNDA6XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRhZHZhbmNlU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2V0VHJhbnNpdGlvbmluZygpIHtcblx0XHRpc1RyYW5zaXRpb25pbmcgPSB0cnVlO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGlzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXHRcdH0sIDEwMDApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYWR2YW5jZVNsaWRlKCkge1xuXG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdG5leHRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLW5leHQnKTtcblxuXHRcdGlmIChuZXh0U2xpZGUpIHtcblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5leHRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblx0XG5cdGZ1bmN0aW9uIHJlZ3Jlc3NTbGlkZSgpIHtcblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0cHJldmlvdXNTbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdHByZXZpb3VzU2xpZGUgPSBwcmV2aW91c1NsaWRlc1twcmV2aW91c1NsaWRlcy5sZW5ndGggLSAxXTtcblxuXHRcdGlmIChwcmV2aW91c1NsaWRlKSB7XG5cdFx0XHQvLyBTZXRzIG5leHQgYWN0dWFsIHNsaWRlIChub3QgY2hyb25vbG9naWNhbGx5KSB0byBwcmV2aW91cyBzbGlkZVxuXHRcdFx0bmV4dFNsaWRlID0gcHJldmlvdXNTbGlkZTtcblxuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdFx0cHJldmlvdXNTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGhvbWVTY3JvbGw7XG4iLCIvKipcbiAqIEFsbG93cyBmb3IgbGVmdC9yaWdodCBuYXZpZ2F0aW9uIGluIGpvdXJuYWxcbiAqL1xubGV0IGpvdXJuYWxOYXYgPSAoZnVuY3Rpb24oKSB7XG5cdGxldCBwcmV2aW91cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZV9fbmF2aWdhdGlvbi0tcHJldmlvdXMgYScpO1xuXHRsZXQgbmV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZV9fbmF2aWdhdGlvbi0tbmV4dCBhJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkTmF2KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGtleWJvYXJkTmF2KGV2ZW50KSB7XG5cdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRjYXNlIDM3OlxuXHRcdFx0XHRpZiAocHJldmlvdXMpIHtcblx0XHRcdFx0XHRnb1RvTGluayggcHJldmlvdXMuaHJlZiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzOTpcblx0XHRcdFx0aWYgKG5leHQpIHtcblx0XHRcdFx0XHRnb1RvTGluayggbmV4dC5ocmVmICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gZ29Ub0xpbmsobGluaykge1xuXHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbGluaztcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZU5hdihldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgam91cm5hbE5hdjtcbiIsIi8qKlxuICogSGFuZGxlcyBtb2JpbGUgbWVudVxuICovXG5sZXQgbWVudSA9IChmdW5jdGlvbigpIHtcblx0bGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXInKTtcblx0bGV0IHRvZ2dsZSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyX19tZW51LXRvZ2dsZScpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0dG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRvZ2dsZU1lbnUoKTtcblx0XHRcdGNoYW5nZVRleHQoKTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XG5cdFx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2wtc2l0ZWhlYWRlci0tbmF2LWlzLW9wZW4nKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZVRleHQoKSB7XG5cdFx0aWYgKHRvZ2dsZS5pbm5lckhUTUwgPT0gJ01lbnUnKSB7XHRcblx0XHRcdHRvZ2dsZS5pbm5lckhUTUwgPSAnQ2xvc2UnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0b2dnbGUuaW5uZXJIVE1MID0gJ01lbnUnO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBtZW51O1xuIiwiaW1wb3J0IHdheXBvaW50cyBmcm9tICcuLy4uLy4uLy4uL25vZGVfbW9kdWxlcy93YXlwb2ludHMvbGliL25vZnJhbWV3b3JrLndheXBvaW50cy5taW4uanMnO1xuXG5sZXQgcHJpbWVsYWJzID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IHByb2JsZW1TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3NlY3Rpb24tLXByb2JsZW1zJyk7XG5cdGxldCBtb2R1bGFyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19zZWN0aW9uLS1tb2R1bGFyLWJveGVzJyk7XG5cdGxldCBzdGFuZGFyZFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fc2VjdGlvbi0tYXMtc3RhbmRhcmQnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXG5cdFx0bGV0IHByb2JsZW1zID0gbmV3IFdheXBvaW50KHtcblx0XHRcdGVsZW1lbnQ6IHByb2JsZW1TZWN0aW9uLFxuXHRcdFx0b2Zmc2V0OiAnNTAlJyxcblx0XHRcdGhhbmRsZXI6IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcblx0XHRcdFx0cHJvYmxlbVNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncHJpbWUtbGFic19fc2VjdGlvbi0tcHJvYmxlbXMtLWlzLWFjdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0bGV0IG1vZHVsYXIgPSBuZXcgV2F5cG9pbnQoe1xuXHRcdFx0ZWxlbWVudDogbW9kdWxhclNlY3Rpb24sXG5cdFx0XHRvZmZzZXQ6ICc2MCUnLFxuXHRcdFx0aGFuZGxlcjogZnVuY3Rpb24oZGlyZWN0aW9uKSB7XG5cdFx0XHRcdG1vZHVsYXJTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3ByaW1lLWxhYnNfX3NlY3Rpb24tLW1vZHVsYXItYm94ZXMtLWlzLWFjdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0bGV0IHN0YW5kYXJkID0gbmV3IFdheXBvaW50KHtcblx0XHRcdGVsZW1lbnQ6IHN0YW5kYXJkU2VjdGlvbixcblx0XHRcdG9mZnNldDogJzUwJScsXG5cdFx0XHRoYW5kbGVyOiBmdW5jdGlvbihkaXJlY3Rpb24pIHtcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3ZpZGVvJykucGxheSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IHByaW1lbGFicztcbiJdfQ==
