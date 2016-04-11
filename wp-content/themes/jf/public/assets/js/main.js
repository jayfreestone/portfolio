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
	var tl = new TimelineMax();

	var inner = document.querySelector('.dashboard__process__inner');

	function init() {

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

		setTimeout(function () {

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
		}, 1000);
	}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvd2F5cG9pbnRzL2xpYi9ub2ZyYW1ld29yay53YXlwb2ludHMubWluLmpzIiwic3JjL2pzL21haW4uanMiLCJzcmMvanMvcGFydGlhbHMvZGFzaGJvYXJkLmpzIiwic3JjL2pzL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMiLCJzcmMvanMvcGFydGlhbHMvam91cm5hbE5hdi5qcyIsInNyYy9qcy9wYXJ0aWFscy9tZW51LmpzIiwic3JjL2pzL3BhcnRpYWxzL3ByaW1lbGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDTkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBWTtBQUN6RCxnQkFBSyxJQUFMLEdBRHlEOztBQUd6RCxLQUFJLFNBQVMsYUFBVCxDQUF1QixlQUF2QixDQUFKLEVBQTZDO0FBQzVDLHVCQUFXLElBQVgsR0FENEM7RUFBN0M7O0FBSUEsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBSixFQUEyQztBQUMxQyxzQkFBVSxJQUFWLEdBRDBDO0VBQTNDOztBQUlBLEtBQUksU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQUosRUFBMEM7QUFDekMsc0JBQVUsSUFBVixHQUR5QztFQUExQzs7QUFJQSxLQUFJLFNBQVMsYUFBVCxDQUF1QixpQkFBdkIsQ0FBSixFQUErQztBQUM5Qyx1QkFBVyxJQUFYLEdBRDhDO0VBQS9DO0NBZjZDLENBQTlDOzs7Ozs7OztBQ05BLElBQUksWUFBYSxZQUFZO0FBQzVCLEtBQUksS0FBSyxJQUFJLFdBQUosRUFBTCxDQUR3Qjs7QUFHNUIsS0FBSSxRQUFRLFNBQVMsYUFBVCxDQUF1Qiw0QkFBdkIsQ0FBUixDQUh3Qjs7QUFLNUIsVUFBUyxJQUFU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UyxlQUFUO0FBQ0EsV0FBUSxLQUFSO0FBQ0EsWUFBUyxpQkFBUyxTQUFULEVBQW9CO0FBQzVCLGFBQVMsYUFBVCxDQUF1QixvQkFBdkIsRUFBNkMsSUFBN0MsR0FENEI7SUFBcEI7R0FISyxDQUFYLENBbEJXO0VBQWhCOztBQTRCQSxRQUFPO0FBQ04sUUFBTSxJQUFOO0VBREQsQ0FqQzRCO0NBQVosRUFBYjs7a0JBc0NXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIVxuV2F5cG9pbnRzIC0gNC4wLjBcbkNvcHlyaWdodCDCqSAyMDExLTIwMTUgQ2FsZWIgVHJvdWdodG9uXG5MaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5odHRwczovL2dpdGh1Yi5jb20vaW1ha2V3ZWJ0aGluZ3Mvd2F5cG9pbnRzL2Jsb2cvbWFzdGVyL2xpY2Vuc2VzLnR4dFxuKi9cbiFmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQobil7aWYoIW4pdGhyb3cgbmV3IEVycm9yKFwiTm8gb3B0aW9ucyBwYXNzZWQgdG8gV2F5cG9pbnQgY29uc3RydWN0b3JcIik7aWYoIW4uZWxlbWVudCl0aHJvdyBuZXcgRXJyb3IoXCJObyBlbGVtZW50IG9wdGlvbiBwYXNzZWQgdG8gV2F5cG9pbnQgY29uc3RydWN0b3JcIik7aWYoIW4uaGFuZGxlcil0aHJvdyBuZXcgRXJyb3IoXCJObyBoYW5kbGVyIG9wdGlvbiBwYXNzZWQgdG8gV2F5cG9pbnQgY29uc3RydWN0b3JcIik7dGhpcy5rZXk9XCJ3YXlwb2ludC1cIitlLHRoaXMub3B0aW9ucz10LkFkYXB0ZXIuZXh0ZW5kKHt9LHQuZGVmYXVsdHMsbiksdGhpcy5lbGVtZW50PXRoaXMub3B0aW9ucy5lbGVtZW50LHRoaXMuYWRhcHRlcj1uZXcgdC5BZGFwdGVyKHRoaXMuZWxlbWVudCksdGhpcy5jYWxsYmFjaz1uLmhhbmRsZXIsdGhpcy5heGlzPXRoaXMub3B0aW9ucy5ob3Jpem9udGFsP1wiaG9yaXpvbnRhbFwiOlwidmVydGljYWxcIix0aGlzLmVuYWJsZWQ9dGhpcy5vcHRpb25zLmVuYWJsZWQsdGhpcy50cmlnZ2VyUG9pbnQ9bnVsbCx0aGlzLmdyb3VwPXQuR3JvdXAuZmluZE9yQ3JlYXRlKHtuYW1lOnRoaXMub3B0aW9ucy5ncm91cCxheGlzOnRoaXMuYXhpc30pLHRoaXMuY29udGV4dD10LkNvbnRleHQuZmluZE9yQ3JlYXRlQnlFbGVtZW50KHRoaXMub3B0aW9ucy5jb250ZXh0KSx0Lm9mZnNldEFsaWFzZXNbdGhpcy5vcHRpb25zLm9mZnNldF0mJih0aGlzLm9wdGlvbnMub2Zmc2V0PXQub2Zmc2V0QWxpYXNlc1t0aGlzLm9wdGlvbnMub2Zmc2V0XSksdGhpcy5ncm91cC5hZGQodGhpcyksdGhpcy5jb250ZXh0LmFkZCh0aGlzKSxpW3RoaXMua2V5XT10aGlzLGUrPTF9dmFyIGU9MCxpPXt9O3QucHJvdG90eXBlLnF1ZXVlVHJpZ2dlcj1mdW5jdGlvbih0KXt0aGlzLmdyb3VwLnF1ZXVlVHJpZ2dlcih0aGlzLHQpfSx0LnByb3RvdHlwZS50cmlnZ2VyPWZ1bmN0aW9uKHQpe3RoaXMuZW5hYmxlZCYmdGhpcy5jYWxsYmFjayYmdGhpcy5jYWxsYmFjay5hcHBseSh0aGlzLHQpfSx0LnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dGhpcy5jb250ZXh0LnJlbW92ZSh0aGlzKSx0aGlzLmdyb3VwLnJlbW92ZSh0aGlzKSxkZWxldGUgaVt0aGlzLmtleV19LHQucHJvdG90eXBlLmRpc2FibGU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbmFibGVkPSExLHRoaXN9LHQucHJvdG90eXBlLmVuYWJsZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmNvbnRleHQucmVmcmVzaCgpLHRoaXMuZW5hYmxlZD0hMCx0aGlzfSx0LnByb3RvdHlwZS5uZXh0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ3JvdXAubmV4dCh0aGlzKX0sdC5wcm90b3R5cGUucHJldmlvdXM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5ncm91cC5wcmV2aW91cyh0aGlzKX0sdC5pbnZva2VBbGw9ZnVuY3Rpb24odCl7dmFyIGU9W107Zm9yKHZhciBuIGluIGkpZS5wdXNoKGlbbl0pO2Zvcih2YXIgbz0wLHI9ZS5sZW5ndGg7cj5vO28rKyllW29dW3RdKCl9LHQuZGVzdHJveUFsbD1mdW5jdGlvbigpe3QuaW52b2tlQWxsKFwiZGVzdHJveVwiKX0sdC5kaXNhYmxlQWxsPWZ1bmN0aW9uKCl7dC5pbnZva2VBbGwoXCJkaXNhYmxlXCIpfSx0LmVuYWJsZUFsbD1mdW5jdGlvbigpe3QuaW52b2tlQWxsKFwiZW5hYmxlXCIpfSx0LnJlZnJlc2hBbGw9ZnVuY3Rpb24oKXt0LkNvbnRleHQucmVmcmVzaEFsbCgpfSx0LnZpZXdwb3J0SGVpZ2h0PWZ1bmN0aW9uKCl7cmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodH0sdC52aWV3cG9ydFdpZHRoPWZ1bmN0aW9uKCl7cmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aH0sdC5hZGFwdGVycz1bXSx0LmRlZmF1bHRzPXtjb250ZXh0OndpbmRvdyxjb250aW51b3VzOiEwLGVuYWJsZWQ6ITAsZ3JvdXA6XCJkZWZhdWx0XCIsaG9yaXpvbnRhbDohMSxvZmZzZXQ6MH0sdC5vZmZzZXRBbGlhc2VzPXtcImJvdHRvbS1pbi12aWV3XCI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0LmlubmVySGVpZ2h0KCktdGhpcy5hZGFwdGVyLm91dGVySGVpZ2h0KCl9LFwicmlnaHQtaW4tdmlld1wiOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29udGV4dC5pbm5lcldpZHRoKCktdGhpcy5hZGFwdGVyLm91dGVyV2lkdGgoKX19LHdpbmRvdy5XYXlwb2ludD10fSgpLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0KXt3aW5kb3cuc2V0VGltZW91dCh0LDFlMy82MCl9ZnVuY3Rpb24gZSh0KXt0aGlzLmVsZW1lbnQ9dCx0aGlzLkFkYXB0ZXI9by5BZGFwdGVyLHRoaXMuYWRhcHRlcj1uZXcgdGhpcy5BZGFwdGVyKHQpLHRoaXMua2V5PVwid2F5cG9pbnQtY29udGV4dC1cIitpLHRoaXMuZGlkU2Nyb2xsPSExLHRoaXMuZGlkUmVzaXplPSExLHRoaXMub2xkU2Nyb2xsPXt4OnRoaXMuYWRhcHRlci5zY3JvbGxMZWZ0KCkseTp0aGlzLmFkYXB0ZXIuc2Nyb2xsVG9wKCl9LHRoaXMud2F5cG9pbnRzPXt2ZXJ0aWNhbDp7fSxob3Jpem9udGFsOnt9fSx0LndheXBvaW50Q29udGV4dEtleT10aGlzLmtleSxuW3Qud2F5cG9pbnRDb250ZXh0S2V5XT10aGlzLGkrPTEsdGhpcy5jcmVhdGVUaHJvdHRsZWRTY3JvbGxIYW5kbGVyKCksdGhpcy5jcmVhdGVUaHJvdHRsZWRSZXNpemVIYW5kbGVyKCl9dmFyIGk9MCxuPXt9LG89d2luZG93LldheXBvaW50LHI9d2luZG93Lm9ubG9hZDtlLnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24odCl7dmFyIGU9dC5vcHRpb25zLmhvcml6b250YWw/XCJob3Jpem9udGFsXCI6XCJ2ZXJ0aWNhbFwiO3RoaXMud2F5cG9pbnRzW2VdW3Qua2V5XT10LHRoaXMucmVmcmVzaCgpfSxlLnByb3RvdHlwZS5jaGVja0VtcHR5PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5BZGFwdGVyLmlzRW1wdHlPYmplY3QodGhpcy53YXlwb2ludHMuaG9yaXpvbnRhbCksZT10aGlzLkFkYXB0ZXIuaXNFbXB0eU9iamVjdCh0aGlzLndheXBvaW50cy52ZXJ0aWNhbCk7dCYmZSYmKHRoaXMuYWRhcHRlci5vZmYoXCIud2F5cG9pbnRzXCIpLGRlbGV0ZSBuW3RoaXMua2V5XSl9LGUucHJvdG90eXBlLmNyZWF0ZVRocm90dGxlZFJlc2l6ZUhhbmRsZXI9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KCl7ZS5oYW5kbGVSZXNpemUoKSxlLmRpZFJlc2l6ZT0hMX12YXIgZT10aGlzO3RoaXMuYWRhcHRlci5vbihcInJlc2l6ZS53YXlwb2ludHNcIixmdW5jdGlvbigpe2UuZGlkUmVzaXplfHwoZS5kaWRSZXNpemU9ITAsby5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodCkpfSl9LGUucHJvdG90eXBlLmNyZWF0ZVRocm90dGxlZFNjcm9sbEhhbmRsZXI9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KCl7ZS5oYW5kbGVTY3JvbGwoKSxlLmRpZFNjcm9sbD0hMX12YXIgZT10aGlzO3RoaXMuYWRhcHRlci5vbihcInNjcm9sbC53YXlwb2ludHNcIixmdW5jdGlvbigpeyghZS5kaWRTY3JvbGx8fG8uaXNUb3VjaCkmJihlLmRpZFNjcm9sbD0hMCxvLnJlcXVlc3RBbmltYXRpb25GcmFtZSh0KSl9KX0sZS5wcm90b3R5cGUuaGFuZGxlUmVzaXplPWZ1bmN0aW9uKCl7by5Db250ZXh0LnJlZnJlc2hBbGwoKX0sZS5wcm90b3R5cGUuaGFuZGxlU2Nyb2xsPWZ1bmN0aW9uKCl7dmFyIHQ9e30sZT17aG9yaXpvbnRhbDp7bmV3U2Nyb2xsOnRoaXMuYWRhcHRlci5zY3JvbGxMZWZ0KCksb2xkU2Nyb2xsOnRoaXMub2xkU2Nyb2xsLngsZm9yd2FyZDpcInJpZ2h0XCIsYmFja3dhcmQ6XCJsZWZ0XCJ9LHZlcnRpY2FsOntuZXdTY3JvbGw6dGhpcy5hZGFwdGVyLnNjcm9sbFRvcCgpLG9sZFNjcm9sbDp0aGlzLm9sZFNjcm9sbC55LGZvcndhcmQ6XCJkb3duXCIsYmFja3dhcmQ6XCJ1cFwifX07Zm9yKHZhciBpIGluIGUpe3ZhciBuPWVbaV0sbz1uLm5ld1Njcm9sbD5uLm9sZFNjcm9sbCxyPW8/bi5mb3J3YXJkOm4uYmFja3dhcmQ7Zm9yKHZhciBzIGluIHRoaXMud2F5cG9pbnRzW2ldKXt2YXIgbD10aGlzLndheXBvaW50c1tpXVtzXSxhPW4ub2xkU2Nyb2xsPGwudHJpZ2dlclBvaW50LGg9bi5uZXdTY3JvbGw+PWwudHJpZ2dlclBvaW50LHA9YSYmaCx1PSFhJiYhaDsocHx8dSkmJihsLnF1ZXVlVHJpZ2dlcihyKSx0W2wuZ3JvdXAuaWRdPWwuZ3JvdXApfX1mb3IodmFyIGMgaW4gdCl0W2NdLmZsdXNoVHJpZ2dlcnMoKTt0aGlzLm9sZFNjcm9sbD17eDplLmhvcml6b250YWwubmV3U2Nyb2xsLHk6ZS52ZXJ0aWNhbC5uZXdTY3JvbGx9fSxlLnByb3RvdHlwZS5pbm5lckhlaWdodD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVsZW1lbnQ9PXRoaXMuZWxlbWVudC53aW5kb3c/by52aWV3cG9ydEhlaWdodCgpOnRoaXMuYWRhcHRlci5pbm5lckhlaWdodCgpfSxlLnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24odCl7ZGVsZXRlIHRoaXMud2F5cG9pbnRzW3QuYXhpc11bdC5rZXldLHRoaXMuY2hlY2tFbXB0eSgpfSxlLnByb3RvdHlwZS5pbm5lcldpZHRoPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWxlbWVudD09dGhpcy5lbGVtZW50LndpbmRvdz9vLnZpZXdwb3J0V2lkdGgoKTp0aGlzLmFkYXB0ZXIuaW5uZXJXaWR0aCgpfSxlLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dmFyIHQ9W107Zm9yKHZhciBlIGluIHRoaXMud2F5cG9pbnRzKWZvcih2YXIgaSBpbiB0aGlzLndheXBvaW50c1tlXSl0LnB1c2godGhpcy53YXlwb2ludHNbZV1baV0pO2Zvcih2YXIgbj0wLG89dC5sZW5ndGg7bz5uO24rKyl0W25dLmRlc3Ryb3koKX0sZS5wcm90b3R5cGUucmVmcmVzaD1mdW5jdGlvbigpe3ZhciB0LGU9dGhpcy5lbGVtZW50PT10aGlzLmVsZW1lbnQud2luZG93LGk9ZT92b2lkIDA6dGhpcy5hZGFwdGVyLm9mZnNldCgpLG49e307dGhpcy5oYW5kbGVTY3JvbGwoKSx0PXtob3Jpem9udGFsOntjb250ZXh0T2Zmc2V0OmU/MDppLmxlZnQsY29udGV4dFNjcm9sbDplPzA6dGhpcy5vbGRTY3JvbGwueCxjb250ZXh0RGltZW5zaW9uOnRoaXMuaW5uZXJXaWR0aCgpLG9sZFNjcm9sbDp0aGlzLm9sZFNjcm9sbC54LGZvcndhcmQ6XCJyaWdodFwiLGJhY2t3YXJkOlwibGVmdFwiLG9mZnNldFByb3A6XCJsZWZ0XCJ9LHZlcnRpY2FsOntjb250ZXh0T2Zmc2V0OmU/MDppLnRvcCxjb250ZXh0U2Nyb2xsOmU/MDp0aGlzLm9sZFNjcm9sbC55LGNvbnRleHREaW1lbnNpb246dGhpcy5pbm5lckhlaWdodCgpLG9sZFNjcm9sbDp0aGlzLm9sZFNjcm9sbC55LGZvcndhcmQ6XCJkb3duXCIsYmFja3dhcmQ6XCJ1cFwiLG9mZnNldFByb3A6XCJ0b3BcIn19O2Zvcih2YXIgciBpbiB0KXt2YXIgcz10W3JdO2Zvcih2YXIgbCBpbiB0aGlzLndheXBvaW50c1tyXSl7dmFyIGEsaCxwLHUsYyxmPXRoaXMud2F5cG9pbnRzW3JdW2xdLGQ9Zi5vcHRpb25zLm9mZnNldCx5PWYudHJpZ2dlclBvaW50LGc9MCx3PW51bGw9PXk7Zi5lbGVtZW50IT09Zi5lbGVtZW50LndpbmRvdyYmKGc9Zi5hZGFwdGVyLm9mZnNldCgpW3Mub2Zmc2V0UHJvcF0pLFwiZnVuY3Rpb25cIj09dHlwZW9mIGQ/ZD1kLmFwcGx5KGYpOlwic3RyaW5nXCI9PXR5cGVvZiBkJiYoZD1wYXJzZUZsb2F0KGQpLGYub3B0aW9ucy5vZmZzZXQuaW5kZXhPZihcIiVcIik+LTEmJihkPU1hdGguY2VpbChzLmNvbnRleHREaW1lbnNpb24qZC8xMDApKSksYT1zLmNvbnRleHRTY3JvbGwtcy5jb250ZXh0T2Zmc2V0LGYudHJpZ2dlclBvaW50PWcrYS1kLGg9eTxzLm9sZFNjcm9sbCxwPWYudHJpZ2dlclBvaW50Pj1zLm9sZFNjcm9sbCx1PWgmJnAsYz0haCYmIXAsIXcmJnU/KGYucXVldWVUcmlnZ2VyKHMuYmFja3dhcmQpLG5bZi5ncm91cC5pZF09Zi5ncm91cCk6IXcmJmM/KGYucXVldWVUcmlnZ2VyKHMuZm9yd2FyZCksbltmLmdyb3VwLmlkXT1mLmdyb3VwKTp3JiZzLm9sZFNjcm9sbD49Zi50cmlnZ2VyUG9pbnQmJihmLnF1ZXVlVHJpZ2dlcihzLmZvcndhcmQpLG5bZi5ncm91cC5pZF09Zi5ncm91cCl9fXJldHVybiBvLnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe2Zvcih2YXIgdCBpbiBuKW5bdF0uZmx1c2hUcmlnZ2VycygpfSksdGhpc30sZS5maW5kT3JDcmVhdGVCeUVsZW1lbnQ9ZnVuY3Rpb24odCl7cmV0dXJuIGUuZmluZEJ5RWxlbWVudCh0KXx8bmV3IGUodCl9LGUucmVmcmVzaEFsbD1mdW5jdGlvbigpe2Zvcih2YXIgdCBpbiBuKW5bdF0ucmVmcmVzaCgpfSxlLmZpbmRCeUVsZW1lbnQ9ZnVuY3Rpb24odCl7cmV0dXJuIG5bdC53YXlwb2ludENvbnRleHRLZXldfSx3aW5kb3cub25sb2FkPWZ1bmN0aW9uKCl7ciYmcigpLGUucmVmcmVzaEFsbCgpfSxvLnJlcXVlc3RBbmltYXRpb25GcmFtZT1mdW5jdGlvbihlKXt2YXIgaT13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx0O2kuY2FsbCh3aW5kb3csZSl9LG8uQ29udGV4dD1lfSgpLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0LGUpe3JldHVybiB0LnRyaWdnZXJQb2ludC1lLnRyaWdnZXJQb2ludH1mdW5jdGlvbiBlKHQsZSl7cmV0dXJuIGUudHJpZ2dlclBvaW50LXQudHJpZ2dlclBvaW50fWZ1bmN0aW9uIGkodCl7dGhpcy5uYW1lPXQubmFtZSx0aGlzLmF4aXM9dC5heGlzLHRoaXMuaWQ9dGhpcy5uYW1lK1wiLVwiK3RoaXMuYXhpcyx0aGlzLndheXBvaW50cz1bXSx0aGlzLmNsZWFyVHJpZ2dlclF1ZXVlcygpLG5bdGhpcy5heGlzXVt0aGlzLm5hbWVdPXRoaXN9dmFyIG49e3ZlcnRpY2FsOnt9LGhvcml6b250YWw6e319LG89d2luZG93LldheXBvaW50O2kucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt0aGlzLndheXBvaW50cy5wdXNoKHQpfSxpLnByb3RvdHlwZS5jbGVhclRyaWdnZXJRdWV1ZXM9ZnVuY3Rpb24oKXt0aGlzLnRyaWdnZXJRdWV1ZXM9e3VwOltdLGRvd246W10sbGVmdDpbXSxyaWdodDpbXX19LGkucHJvdG90eXBlLmZsdXNoVHJpZ2dlcnM9ZnVuY3Rpb24oKXtmb3IodmFyIGkgaW4gdGhpcy50cmlnZ2VyUXVldWVzKXt2YXIgbj10aGlzLnRyaWdnZXJRdWV1ZXNbaV0sbz1cInVwXCI9PT1pfHxcImxlZnRcIj09PWk7bi5zb3J0KG8/ZTp0KTtmb3IodmFyIHI9MCxzPW4ubGVuZ3RoO3M+cjtyKz0xKXt2YXIgbD1uW3JdOyhsLm9wdGlvbnMuY29udGludW91c3x8cj09PW4ubGVuZ3RoLTEpJiZsLnRyaWdnZXIoW2ldKX19dGhpcy5jbGVhclRyaWdnZXJRdWV1ZXMoKX0saS5wcm90b3R5cGUubmV4dD1mdW5jdGlvbihlKXt0aGlzLndheXBvaW50cy5zb3J0KHQpO3ZhciBpPW8uQWRhcHRlci5pbkFycmF5KGUsdGhpcy53YXlwb2ludHMpLG49aT09PXRoaXMud2F5cG9pbnRzLmxlbmd0aC0xO3JldHVybiBuP251bGw6dGhpcy53YXlwb2ludHNbaSsxXX0saS5wcm90b3R5cGUucHJldmlvdXM9ZnVuY3Rpb24oZSl7dGhpcy53YXlwb2ludHMuc29ydCh0KTt2YXIgaT1vLkFkYXB0ZXIuaW5BcnJheShlLHRoaXMud2F5cG9pbnRzKTtyZXR1cm4gaT90aGlzLndheXBvaW50c1tpLTFdOm51bGx9LGkucHJvdG90eXBlLnF1ZXVlVHJpZ2dlcj1mdW5jdGlvbih0LGUpe3RoaXMudHJpZ2dlclF1ZXVlc1tlXS5wdXNoKHQpfSxpLnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24odCl7dmFyIGU9by5BZGFwdGVyLmluQXJyYXkodCx0aGlzLndheXBvaW50cyk7ZT4tMSYmdGhpcy53YXlwb2ludHMuc3BsaWNlKGUsMSl9LGkucHJvdG90eXBlLmZpcnN0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMud2F5cG9pbnRzWzBdfSxpLnByb3RvdHlwZS5sYXN0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMud2F5cG9pbnRzW3RoaXMud2F5cG9pbnRzLmxlbmd0aC0xXX0saS5maW5kT3JDcmVhdGU9ZnVuY3Rpb24odCl7cmV0dXJuIG5bdC5heGlzXVt0Lm5hbWVdfHxuZXcgaSh0KX0sby5Hcm91cD1pfSgpLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0KXtyZXR1cm4gdD09PXQud2luZG93fWZ1bmN0aW9uIGUoZSl7cmV0dXJuIHQoZSk/ZTplLmRlZmF1bHRWaWV3fWZ1bmN0aW9uIGkodCl7dGhpcy5lbGVtZW50PXQsdGhpcy5oYW5kbGVycz17fX12YXIgbj13aW5kb3cuV2F5cG9pbnQ7aS5wcm90b3R5cGUuaW5uZXJIZWlnaHQ9ZnVuY3Rpb24oKXt2YXIgZT10KHRoaXMuZWxlbWVudCk7cmV0dXJuIGU/dGhpcy5lbGVtZW50LmlubmVySGVpZ2h0OnRoaXMuZWxlbWVudC5jbGllbnRIZWlnaHR9LGkucHJvdG90eXBlLmlubmVyV2lkdGg9ZnVuY3Rpb24oKXt2YXIgZT10KHRoaXMuZWxlbWVudCk7cmV0dXJuIGU/dGhpcy5lbGVtZW50LmlubmVyV2lkdGg6dGhpcy5lbGVtZW50LmNsaWVudFdpZHRofSxpLnByb3RvdHlwZS5vZmY9ZnVuY3Rpb24odCxlKXtmdW5jdGlvbiBpKHQsZSxpKXtmb3IodmFyIG49MCxvPWUubGVuZ3RoLTE7bz5uO24rKyl7dmFyIHI9ZVtuXTtpJiZpIT09cnx8dC5yZW1vdmVFdmVudExpc3RlbmVyKHIpfX12YXIgbj10LnNwbGl0KFwiLlwiKSxvPW5bMF0scj1uWzFdLHM9dGhpcy5lbGVtZW50O2lmKHImJnRoaXMuaGFuZGxlcnNbcl0mJm8paShzLHRoaXMuaGFuZGxlcnNbcl1bb10sZSksdGhpcy5oYW5kbGVyc1tyXVtvXT1bXTtlbHNlIGlmKG8pZm9yKHZhciBsIGluIHRoaXMuaGFuZGxlcnMpaShzLHRoaXMuaGFuZGxlcnNbbF1bb118fFtdLGUpLHRoaXMuaGFuZGxlcnNbbF1bb109W107ZWxzZSBpZihyJiZ0aGlzLmhhbmRsZXJzW3JdKXtmb3IodmFyIGEgaW4gdGhpcy5oYW5kbGVyc1tyXSlpKHMsdGhpcy5oYW5kbGVyc1tyXVthXSxlKTt0aGlzLmhhbmRsZXJzW3JdPXt9fX0saS5wcm90b3R5cGUub2Zmc2V0PWZ1bmN0aW9uKCl7aWYoIXRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50KXJldHVybiBudWxsO3ZhciB0PXRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxpPWUodGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQpLG49e3RvcDowLGxlZnQ6MH07cmV0dXJuIHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QmJihuPXRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkse3RvcDpuLnRvcCtpLnBhZ2VZT2Zmc2V0LXQuY2xpZW50VG9wLGxlZnQ6bi5sZWZ0K2kucGFnZVhPZmZzZXQtdC5jbGllbnRMZWZ0fX0saS5wcm90b3R5cGUub249ZnVuY3Rpb24odCxlKXt2YXIgaT10LnNwbGl0KFwiLlwiKSxuPWlbMF0sbz1pWzFdfHxcIl9fZGVmYXVsdFwiLHI9dGhpcy5oYW5kbGVyc1tvXT10aGlzLmhhbmRsZXJzW29dfHx7fSxzPXJbbl09cltuXXx8W107cy5wdXNoKGUpLHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKG4sZSl9LGkucHJvdG90eXBlLm91dGVySGVpZ2h0PWZ1bmN0aW9uKGUpe3ZhciBpLG49dGhpcy5pbm5lckhlaWdodCgpO3JldHVybiBlJiYhdCh0aGlzLmVsZW1lbnQpJiYoaT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnQpLG4rPXBhcnNlSW50KGkubWFyZ2luVG9wLDEwKSxuKz1wYXJzZUludChpLm1hcmdpbkJvdHRvbSwxMCkpLG59LGkucHJvdG90eXBlLm91dGVyV2lkdGg9ZnVuY3Rpb24oZSl7dmFyIGksbj10aGlzLmlubmVyV2lkdGgoKTtyZXR1cm4gZSYmIXQodGhpcy5lbGVtZW50KSYmKGk9d2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50KSxuKz1wYXJzZUludChpLm1hcmdpbkxlZnQsMTApLG4rPXBhcnNlSW50KGkubWFyZ2luUmlnaHQsMTApKSxufSxpLnByb3RvdHlwZS5zY3JvbGxMZWZ0PWZ1bmN0aW9uKCl7dmFyIHQ9ZSh0aGlzLmVsZW1lbnQpO3JldHVybiB0P3QucGFnZVhPZmZzZXQ6dGhpcy5lbGVtZW50LnNjcm9sbExlZnR9LGkucHJvdG90eXBlLnNjcm9sbFRvcD1mdW5jdGlvbigpe3ZhciB0PWUodGhpcy5lbGVtZW50KTtyZXR1cm4gdD90LnBhZ2VZT2Zmc2V0OnRoaXMuZWxlbWVudC5zY3JvbGxUb3B9LGkuZXh0ZW5kPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCh0LGUpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiB0JiZcIm9iamVjdFwiPT10eXBlb2YgZSlmb3IodmFyIGkgaW4gZSllLmhhc093blByb3BlcnR5KGkpJiYodFtpXT1lW2ldKTtyZXR1cm4gdH1mb3IodmFyIGU9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSxpPTEsbj1lLmxlbmd0aDtuPmk7aSsrKXQoZVswXSxlW2ldKTtyZXR1cm4gZVswXX0saS5pbkFycmF5PWZ1bmN0aW9uKHQsZSxpKXtyZXR1cm4gbnVsbD09ZT8tMTplLmluZGV4T2YodCxpKX0saS5pc0VtcHR5T2JqZWN0PWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSBpbiB0KXJldHVybiExO3JldHVybiEwfSxuLmFkYXB0ZXJzLnB1c2goe25hbWU6XCJub2ZyYW1ld29ya1wiLEFkYXB0ZXI6aX0pLG4uQWRhcHRlcj1pfSgpOyIsImltcG9ydCBwcmltZWxhYnMgZnJvbSAnLi9wYXJ0aWFscy9wcmltZWxhYnMuanMnO1xuaW1wb3J0IG1lbnUgZnJvbSAnLi9wYXJ0aWFscy9tZW51LmpzJztcbmltcG9ydCBob21lU2Nyb2xsIGZyb20gJy4vcGFydGlhbHMvaG9tZVNjcm9sbC5qcyc7XG5pbXBvcnQgam91cm5hbE5hdiBmcm9tICcuL3BhcnRpYWxzL2pvdXJuYWxOYXYuanMnO1xuaW1wb3J0IGRhc2hib2FyZCBmcm9tICcuL3BhcnRpYWxzL2Rhc2hib2FyZC5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdG1lbnUuaW5pdCgpO1xuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3JykpIHtcblx0XHRob21lU2Nyb2xsLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFicycpKSB7XG5cdFx0cHJpbWVsYWJzLmluaXQoKTtcblx0fVxuXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkJykpIHtcblx0XHRkYXNoYm9hcmQuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZScpKSB7XG5cdFx0am91cm5hbE5hdi5pbml0KCk7XG5cdH1cbn0pO1xuIiwibGV0IGRhc2hib2FyZCA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xuXG5cdGxldCBpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX3Byb2Nlc3NfX2lubmVyJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblxuXHRcdC8vIEZpZ3VyZXNcblx0XHRsZXQgbG9jYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19maWd1cmUtLWxvY2FsJyk7XG5cdFx0bGV0IHJlbW90ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2ZpZ3VyZS0tcmVtb3RlJyk7XG5cdFx0bGV0IGdpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2ZpZ3VyZS0tZ2l0Jyk7XG5cdFx0bGV0IGZpbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZmlndXJlLS1maWxlcycpO1xuXHRcdGxldCByZWxlYXNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhc2hib2FyZF9fZmlndXJlLS1yZWxlYXNlJyk7XG5cblx0XHQvLyBDb25uZWN0b3JzXG5cdFx0bGV0IGNvbm5lY3RvckNhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2Nvbm5lY3Rvci0tY2FwaXN0cmFubycpO1xuXHRcdGxldCBjb25uZWN0b3JHaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19jb25uZWN0b3ItLWdpdCcpO1xuXHRcdGxldCBjb25uZWN0b3JGaWxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2Nvbm5lY3Rvci0tZmlsZXMnKTtcblx0XHRsZXQgY29ubmVjdG9yUmVsZWFzZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19jb25uZWN0b3ItLXJlbGVhc2VzJyk7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0YWRkRmlndXJlKGxvY2FsKTtcblxuXHRcdFx0c2V0QWN0aXZlKGxvY2FsKTtcblxuXHRcdFx0YWRkTGluZShjb25uZWN0b3JDYXAsICdjb25uZWN0b3JDYXAnKTtcblxuXHRcdFx0YWRkRmlndXJlKHJlbW90ZSwgJ3B1bHNlQ2FwJyk7XG5cblx0XHRcdHNlbmRQdWxzZShjb25uZWN0b3JDYXAsICdwdWxzZUNhcCcpO1xuXG5cdFx0XHRzZXRBY3RpdmUocmVtb3RlKTtcblxuXHRcdFx0YWRkTGluZShjb25uZWN0b3JHaXQsICdjb25uZWN0b3JHaXQnKTtcblxuXHRcdFx0YWRkRmlndXJlKGdpdCk7XG5cblx0XHRcdHNlbmRQdWxzZShjb25uZWN0b3JHaXQsICdwdWxzZUdpdCcpO1xuXG5cdFx0XHRzZXRBY3RpdmUoZ2l0KTtcblxuXHRcdFx0c2VuZFB1bHNlKGNvbm5lY3RvckdpdCwgJ3B1bHNlR2l0JywgJ2xlZnQnKTtcblxuXHRcdFx0dW5zZXRBY3RpdmUoZ2l0KTtcblxuXHRcdFx0cmVtb3ZlRmlndXJlKGdpdCk7XG5cblx0XHRcdHJlbW92ZUxpbmUoY29ubmVjdG9yR2l0KTtcblxuXHRcdFx0YWRkTGluZShjb25uZWN0b3JGaWxlcywgJ2Nvbm5lY3RvckZpbGVzJyk7XG5cblx0XHRcdGFkZEZpZ3VyZShmaWxlcyk7XG5cblx0XHRcdGFkZExpbmUoY29ubmVjdG9yUmVsZWFzZXMsICdjb25uZWN0b3JSZWxlYXNlcycpO1xuXG5cdFx0XHRhZGRGaWd1cmUocmVsZWFzZSk7XG5cdFx0fSwgMTAwMCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhZGRGaWd1cmUoZmlndXJlKSB7XG5cdFx0dGwuZnJvbShmaWd1cmUsIDEsIHsgd2lkdGg6IDAgfSlcblx0XHQudG8oZmlndXJlLCAxLCB7IG9wYWNpdHk6IDEgfSk7XG5cdH1cblxuXHRmdW5jdGlvbiByZW1vdmVGaWd1cmUoZmlndXJlKSB7XG5cdFx0dGwudG8oZmlndXJlLCAwLjUsIHsgb3BhY2l0eTogMCB9KVxuXHRcdC50byhmaWd1cmUsIDEsIHsgd2lkdGg6ICcwJywgbWFyZ2luOiAwLCBmbGV4OiAwIH0pO1xuXHRcdC8vIC5zZXQoZmlndXJlLCB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnIH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gcmVtb3ZlTGluZShjb25uZWN0b3IpIHtcblx0XHR0bC50byhjb25uZWN0b3IsIDAuNSwgeyBvcGFjaXR5OiAwIH0pXG5cdFx0LnRvKGNvbm5lY3RvciwgMSwgeyB3aWR0aDogJzAnLCBtYXJnaW46IDAsIGZsZXg6IDAgfSk7XG5cdFx0Ly8gLnNldChjb25uZWN0b3IsIHsgcG9zaXRpb246ICdhYnNvbHV0ZScgfSk7XG5cdH1cblxuXHRmdW5jdGlvbiBzZXRBY3RpdmUoZmlndXJlKSB7XG5cdFx0bGV0IHBhdGggPSBmaWd1cmUucXVlcnlTZWxlY3RvcigncGF0aCcpO1xuXHRcdHRsLnRvKHBhdGgsIDAuNSwgeyBmaWxsOiAnIzlkMGUxMicgfSk7XG5cdH1cblxuXHRmdW5jdGlvbiB1bnNldEFjdGl2ZShmaWd1cmUpIHtcblx0XHRsZXQgcGF0aCA9IGZpZ3VyZS5xdWVyeVNlbGVjdG9yKCdwYXRoJyk7XG5cdFx0dGwudG8ocGF0aCwgMC41LCB7IGZpbGw6ICdibGFjaycgfSk7XG5cdH1cblxuXHRmdW5jdGlvbiBhZGRMaW5lKGNvbm5lY3RvciwgbGF5ZXIpIHtcblx0XHRsZXQgbGluZSA9IGNvbm5lY3Rvci5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkX19jb25uZWN0b3JfX2xpbmUnKTtcblxuXHRcdHRsLnRvKGNvbm5lY3RvciwgMSwgeyBvcGFjaXR5OiAxIH0sIGxheWVyKVxuXHRcdC5mcm9tKGNvbm5lY3RvciwgMSwgeyB3aWR0aDogMCwgeTogLTIwIH0sIGxheWVyKVxuXHRcdC50byhsaW5lLCAxLCB7IHdpZHRoOiAnMTAwJScgfSk7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIHNlbmRQdWxzZShjb25uZWN0b3IsIGxheWVyLCBkaXJlY3Rpb24gPSAncmlnaHQnKSB7XG5cdFx0bGV0IHB1bHNlID0gY29ubmVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmRfX2Nvbm5lY3Rvcl9fcHVsc2UnKTtcblxuXHRcdGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuXHRcdFx0dGwuc2V0KHB1bHNlLCB7IGxlZnQ6ICcxMDAlJyB9KVxuXHRcdFx0LnRvKHB1bHNlLCAwLjMsIHsgb3BhY2l0eTogMSB9KVxuXHRcdFx0LnRvKHB1bHNlLCAyLCB7IGxlZnQ6ICcwJyB9KVxuXHRcdFx0LnRvKHB1bHNlLCAwLjMsIHsgb3BhY2l0eTogMCB9KVxuXHRcdFx0LnNldChwdWxzZSwgeyBsZWZ0OiAnMTAwJScgfSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRsLnRvKHB1bHNlLCAwLjMsIHsgb3BhY2l0eTogMSB9KVxuXHRcdFx0LnRvKHB1bHNlLCAyLCB7IGxlZnQ6ICcxMDAlJyB9KVxuXHRcdFx0LnRvKHB1bHNlLCAwLjMsIHsgb3BhY2l0eTogMCB9KVxuXHRcdFx0LnRvKHB1bHNlLCAwLCB7IGxlZnQ6ICcwJyB9KTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRhc2hib2FyZDtcbiIsImxldCBob21lU2Nyb2xsID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IG5hdkl0ZW1zO1xuXHRsZXQgZGVsdGEgPSAwO1xuXHRsZXQgY3VycmVudFNsaWRlO1xuXHRsZXQgbmV4dFNsaWRlO1xuXHRsZXQgcHJldmlvdXNTbGlkZTtcblx0bGV0IHByZXZpb3VzU2xpZGVzO1xuXHRsZXQgaXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cdGxldCBsYXN0U2Nyb2xsZWQ7XG5cdGxldCBtb3VzZXdoZWVsQ2FuU2Nyb2xsID0gdHJ1ZTtcblx0bGV0IGxhc3RNb3VzZXdoZWVsVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdGxldCBsYXN0U2Nyb2xsVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdGxldCBzY3JvbGxzID0gW107XG5cdGxldCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2Jyk7XG5cdGxldCB3b3JrU2xpZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlldycpKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGlmIChuYXYpIHtcblx0XHRcdG5hdkl0ZW1zID0gbmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcblx0XHR9XG5cdFx0YW5pbWF0ZUluaXRpYWwoKTtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2V0U2Nyb2xsKCkge1xuXHRcdHNjcm9sbHMgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGxzQXZnKG9mZnNldCkge1xuXHRcdGxldCBzdW0gPSAwO1xuXG5cdFx0bGV0IGVsbXMgPSBzY3JvbGxzLnNsaWNlKE1hdGgubWF4KHNjcm9sbHMubGVuZ3RoIC0gb2Zmc2V0LCAxKSk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGVsbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHN1bSArPSBlbG1zW2ldO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLmNlaWwoc3VtIC8gb2Zmc2V0KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFuaW1hdGVJbml0aWFsKCkge1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGxldCBmaXJzdFdvcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS0xJyk7XG5cdFx0XHRmaXJzdFdvcmsuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuYXZJdGVtc1swXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy1jb250YWluZXJfX25hdl9faXRlbS0taXMtYWN0aXZlJyk7XG5cdFx0fSwgMjAwKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkTmF2KTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBzY3JvbGxOYXYpO1xuXG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5hdkl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRuYXZJdGVtc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZU5hdik7XG5cdFx0fVxuXHRcdFxuXHRcdC8vICQoJy53b3JrLXByZXZpZXctY29udGFpbmVyJykuc3dpcGUoe1xuXHRcdC8vIFx0c3dpcGU6ZnVuY3Rpb24oZXZlbnQsIGRpcmVjdGlvbiwgZGlzdGFuY2UsIGR1cmF0aW9uLCBmaW5nZXJDb3VudCkge1xuXHRcdC8vIFx0XHRjb25zb2xlLmxvZyggXCJZb3Ugc3dpcGVkIFwiICsgZGlyZWN0aW9uICk7XG5cdFx0Ly8gXHR9LFxuXHRcdC8vIFx0YWxsb3dQYWdlU2Nyb2xsOid2ZXJ0aWNhbCdcblx0XHQvLyB9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZU5hdihldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IHNsaWRlTnVtYmVyID0gZXZlbnQudGFyZ2V0LmlubmVySFRNTC5zdWJzdHJpbmcoMSk7XG5cblx0XHRpZiAoaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRnb1RvU2xpZGUoc2xpZGVOdW1iZXIpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGhpZ2hsaWdodEFjdGl2ZU5hdigpIHtcblx0XHQvLyBSZW1vdmUgdGhlIGFjdGl2ZSBjbGFzc1xuXHRcdGxldCBhY3RpdmVOYXZDbGFzcyA9ICd3b3JrLXByZXZpZXctY29udGFpbmVyX19uYXZfX2l0ZW0tLWlzLWFjdGl2ZSc7XG5cdFx0bGV0IGFjdGl2ZU5hdkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGFjdGl2ZU5hdkNsYXNzKTtcblx0XHRhY3RpdmVOYXZJdGVtLmNsYXNzTGlzdC5yZW1vdmUoYWN0aXZlTmF2Q2xhc3MpO1xuXG5cdFx0bGV0IG5leHROdW1iZXIgPSBuZXh0U2xpZGUuaWQuc3Vic3RyaW5nKG5leHRTbGlkZS5pZC5sZW5ndGggLTEpO1xuXHRcdGNvbnNvbGUubG9nKG5leHROdW1iZXIpO1xuXG5cdFx0bmF2SXRlbXNbbmV4dE51bWJlciAtIDFdLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZChhY3RpdmVOYXZDbGFzcyk7XG5cdH1cblxuXHRmdW5jdGlvbiBnb1RvU2xpZGUoc2xpZGVOdW1iZXIpIHtcblx0XHRuZXh0U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS0nICsgc2xpZGVOdW1iZXIgKTtcblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRpZiAobmV4dFNsaWRlKSB7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXG5cdFx0XHRsZXQgY3VycmVudE51bWJlciA9IGN1cnJlbnRTbGlkZS5pZC5zdWJzdHJpbmcoY3VycmVudFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cdFx0XHRsZXQgbmV4dE51bWJlciA9IG5leHRTbGlkZS5pZC5zdWJzdHJpbmcobmV4dFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cblx0XHRcdGlmIChjdXJyZW50TnVtYmVyID4gbmV4dE51bWJlcikge1xuXHRcdFx0XHQvLyBJZiB3ZSdyZSBnb2luZyBiYWNrd2FyZHNcblx0XHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXG5cdFx0XHRcdC8vIE5lZWQgdG8gYWRkIG5leHQgdG8gQUxMIGdvaW5nIGZvcndhcmRcblx0XHRcdFx0bGV0IHByZXZpb3VzU2xpZGVzID0gd29ya1NsaWRlcy5zbGljZShuZXh0TnVtYmVyLCBjdXJyZW50TnVtYmVyIC0gMSk7XG5cblx0XHRcdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgcHJldmlvdXNTbGlkZXMubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdFx0cHJldmlvdXNTbGlkZXNbaV0uY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSWYgd2UncmUgZ29pbmcgZm9yd2FyZHNcblx0XHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdH1cblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNjcm9sbE5hdihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdC8vIGNvbnNvbGUubG9nKCdmaXJlZCcpO1xuXG5cdFx0bGV0IHNjcm9sbFRocmVzaG9sZCA9IDQwO1xuXG5cdFx0bGV0IHZhbHVlID0gLWUuZGVsdGFZO1xuXG5cdFx0aWYgKHNjcm9sbHMubGVuZ3RoID4gMTUwKSB7XG5cdFx0XHRzY3JvbGxzLnNoaWZ0KCk7XG5cdFx0fVxuXG5cdFx0c2Nyb2xscy5wdXNoKE1hdGguYWJzKHZhbHVlKSk7XG5cblx0XHR2YXIgY3VyclRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG5cdFx0aWYgKChjdXJyVGltZSAtIGxhc3RNb3VzZXdoZWVsVGltZSkgPiAyMDApIHtcblx0XHRcdHJlc2V0U2Nyb2xsKCk7XG5cdFx0fVxuXG5cdFx0bGFzdE1vdXNld2hlZWxUaW1lID0gY3VyclRpbWU7XG5cblx0XHR2YXIgbGFzdEF2ZyA9IHNjcm9sbHNBdmcoNSk7XG5cdFx0dmFyIG1pZEF2ZyA9IHNjcm9sbHNBdmcoNDApO1xuXG5cdFx0aWYgKGxhc3RBdmcgPiBtaWRBdmcpIHtcblx0XHRcdGlmIChtb3VzZXdoZWVsQ2FuU2Nyb2xsICYmIGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdG1vdXNld2hlZWxDYW5TY3JvbGwgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICh2YWx1ZSA8IDApIHtcblx0XHRcdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZWdyZXNzU2xpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1vdXNld2hlZWxDYW5TY3JvbGwgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGtleWJvYXJkTmF2KGV2ZW50KSB7XG5cdFx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdHJlZ3Jlc3NTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdGFkdmFuY2VTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHR9XG5cblx0ZnVuY3Rpb24gcmVzZXRUcmFuc2l0aW9uaW5nKCkge1xuXHRcdGlzVHJhbnNpdGlvbmluZyA9IHRydWU7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0aXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cdFx0fSwgMTAwMCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhZHZhbmNlU2xpZGUoKSB7XG5cblx0XHRjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0bmV4dFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tbmV4dCcpO1xuXG5cdFx0aWYgKG5leHRTbGlkZSkge1xuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cdFx0XHRyZXNldFRyYW5zaXRpb25pbmcoKTtcblxuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdFx0bmV4dFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXHRcblx0ZnVuY3Rpb24gcmVncmVzc1NsaWRlKCkge1xuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRwcmV2aW91c1NsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXByZXZpZXctLXByZXZpb3VzJyk7XG5cdFx0cHJldmlvdXNTbGlkZSA9IHByZXZpb3VzU2xpZGVzW3ByZXZpb3VzU2xpZGVzLmxlbmd0aCAtIDFdO1xuXG5cdFx0aWYgKHByZXZpb3VzU2xpZGUpIHtcblx0XHRcdC8vIFNldHMgbmV4dCBhY3R1YWwgc2xpZGUgKG5vdCBjaHJvbm9sb2dpY2FsbHkpIHRvIHByZXZpb3VzIHNsaWRlXG5cdFx0XHRuZXh0U2xpZGUgPSBwcmV2aW91c1NsaWRlO1xuXG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0XHRwcmV2aW91c1NsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgaG9tZVNjcm9sbDtcbiIsIi8qKlxuICogQWxsb3dzIGZvciBsZWZ0L3JpZ2h0IG5hdmlnYXRpb24gaW4gam91cm5hbFxuICovXG5sZXQgam91cm5hbE5hdiA9IChmdW5jdGlvbigpIHtcblx0bGV0IHByZXZpb3VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlX19uYXZpZ2F0aW9uLS1wcmV2aW91cyBhJyk7XG5cdGxldCBuZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvdXJuYWwtc2luZ2xlX19uYXZpZ2F0aW9uLS1uZXh0IGEnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmROYXYpO1xuXHR9XG5cblx0ZnVuY3Rpb24ga2V5Ym9hcmROYXYoZXZlbnQpIHtcblx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdGNhc2UgMzc6XG5cdFx0XHRcdGlmIChwcmV2aW91cykge1xuXHRcdFx0XHRcdGdvVG9MaW5rKCBwcmV2aW91cy5ocmVmICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDM5OlxuXHRcdFx0XHRpZiAobmV4dCkge1xuXHRcdFx0XHRcdGdvVG9MaW5rKCBuZXh0LmhyZWYgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBnb1RvTGluayhsaW5rKSB7XG5cdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaW5rO1xuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlTmF2KGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsTmF2O1xuIiwiLyoqXG4gKiBIYW5kbGVzIG1vYmlsZSBtZW51XG4gKi9cbmxldCBtZW51ID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcicpO1xuXHRsZXQgdG9nZ2xlID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5sLXNpdGVoZWFkZXJfX21lbnUtdG9nZ2xlJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRiaW5kVUlFdmVudHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJpbmRVSUV2ZW50cygpIHtcblx0XHR0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dG9nZ2xlTWVudSgpO1xuXHRcdFx0Y2hhbmdlVGV4dCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcblx0XHRoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbC1zaXRlaGVhZGVyLS1uYXYtaXMtb3BlbicpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2hhbmdlVGV4dCgpIHtcblx0XHRpZiAodG9nZ2xlLmlubmVySFRNTCA9PSAnTWVudScpIHtcdFxuXHRcdFx0dG9nZ2xlLmlubmVySFRNTCA9ICdDbG9zZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvZ2dsZS5pbm5lckhUTUwgPSAnTWVudSc7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1lbnU7XG4iLCJpbXBvcnQgd2F5cG9pbnRzIGZyb20gJy4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dheXBvaW50cy9saWIvbm9mcmFtZXdvcmsud2F5cG9pbnRzLm1pbi5qcyc7XG5cbmxldCBwcmltZWxhYnMgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgcHJvYmxlbVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fc2VjdGlvbi0tcHJvYmxlbXMnKTtcblx0bGV0IG1vZHVsYXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3NlY3Rpb24tLW1vZHVsYXItYm94ZXMnKTtcblx0bGV0IHN0YW5kYXJkU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19zZWN0aW9uLS1hcy1zdGFuZGFyZCcpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cblx0XHRsZXQgcHJvYmxlbXMgPSBuZXcgV2F5cG9pbnQoe1xuXHRcdFx0ZWxlbWVudDogcHJvYmxlbVNlY3Rpb24sXG5cdFx0XHRvZmZzZXQ6ICc1MCUnLFxuXHRcdFx0aGFuZGxlcjogZnVuY3Rpb24gKGRpcmVjdGlvbikge1xuXHRcdFx0XHRwcm9ibGVtU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdwcmltZS1sYWJzX19zZWN0aW9uLS1wcm9ibGVtcy0taXMtYWN0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRsZXQgbW9kdWxhciA9IG5ldyBXYXlwb2ludCh7XG5cdFx0XHRlbGVtZW50OiBtb2R1bGFyU2VjdGlvbixcblx0XHRcdG9mZnNldDogJzYwJScsXG5cdFx0XHRoYW5kbGVyOiBmdW5jdGlvbihkaXJlY3Rpb24pIHtcblx0XHRcdFx0bW9kdWxhclNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncHJpbWUtbGFic19fc2VjdGlvbi0tbW9kdWxhci1ib3hlcy0taXMtYWN0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRsZXQgc3RhbmRhcmQgPSBuZXcgV2F5cG9pbnQoe1xuXHRcdFx0ZWxlbWVudDogc3RhbmRhcmRTZWN0aW9uLFxuXHRcdFx0b2Zmc2V0OiAnNTAlJyxcblx0XHRcdGhhbmRsZXI6IGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fdmlkZW8nKS5wbGF5KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpbWVsYWJzO1xuIl19
