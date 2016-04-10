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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
	_menu2.default.init();

	if (document.querySelector('.work-preview')) {
		_homeScroll2.default.init();
	}

	if (document.querySelector('.prime-labs')) {
		_primelabs2.default.init();
	}

	if (document.querySelector('.journal-single')) {
		_journalNav2.default.init();
	}
});

},{"./partials/homeScroll.js":3,"./partials/journalNav.js":4,"./partials/menu.js":5,"./partials/primelabs.js":6}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvd2F5cG9pbnRzL2xpYi9ub2ZyYW1ld29yay53YXlwb2ludHMubWluLmpzIiwic3JjL2pzL21haW4uanMiLCJzcmMvanMvcGFydGlhbHMvaG9tZVNjcm9sbC5qcyIsInNyYy9qcy9wYXJ0aWFscy9qb3VybmFsTmF2LmpzIiwic3JjL2pzL3BhcnRpYWxzL21lbnUuanMiLCJzcmMvanMvcGFydGlhbHMvcHJpbWVsYWJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNOQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBWTtBQUN6RCxnQkFBSyxJQUFMLEdBRHlEOztBQUd6RCxLQUFJLFNBQVMsYUFBVCxDQUF1QixlQUF2QixDQUFKLEVBQTZDO0FBQzVDLHVCQUFXLElBQVgsR0FENEM7RUFBN0M7O0FBSUEsS0FBSSxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBSixFQUEyQztBQUMxQyxzQkFBVSxJQUFWLEdBRDBDO0VBQTNDOztBQUlBLEtBQUksU0FBUyxhQUFULENBQXVCLGlCQUF2QixDQUFKLEVBQStDO0FBQzlDLHVCQUFXLElBQVgsR0FEOEM7RUFBL0M7Q0FYNkMsQ0FBOUM7Ozs7Ozs7O0FDTEEsSUFBSSxhQUFjLFlBQVk7QUFDN0IsS0FBSSxpQkFBSixDQUQ2QjtBQUU3QixLQUFJLFFBQVEsQ0FBUixDQUZ5QjtBQUc3QixLQUFJLHFCQUFKLENBSDZCO0FBSTdCLEtBQUksa0JBQUosQ0FKNkI7QUFLN0IsS0FBSSxzQkFBSixDQUw2QjtBQU03QixLQUFJLHVCQUFKLENBTjZCO0FBTzdCLEtBQUksa0JBQWtCLEtBQWxCLENBUHlCO0FBUTdCLEtBQUkscUJBQUosQ0FSNkI7QUFTN0IsS0FBSSxzQkFBc0IsSUFB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QUFLNUIsVUFBUyxJQUFULEdBQWdCOztBQUVmLE1BQUksV0FBVyxJQUFJLFFBQUosQ0FBYTtBQUMzQixZQUFTLGNBQVQ7QUFDQSxXQUFRLEtBQVI7QUFDQSxZQUFTLGlCQUFVLFNBQVYsRUFBcUI7QUFDN0IsbUJBQWUsU0FBZixDQUF5QixHQUF6QixDQUE2QiwwQ0FBN0IsRUFENkI7SUFBckI7R0FISyxDQUFYLENBRlc7O0FBVWYsTUFBSSxVQUFVLElBQUksUUFBSixDQUFhO0FBQzFCLFlBQVMsY0FBVDtBQUNBLFdBQVEsS0FBUjtBQUNBLFlBQVMsaUJBQVMsU0FBVCxFQUFvQjtBQUM1QixtQkFBZSxTQUFmLENBQXlCLEdBQXpCLENBQTZCLCtDQUE3QixFQUQ0QjtJQUFwQjtHQUhJLENBQVYsQ0FWVzs7QUFrQmYsTUFBSSxXQUFXLElBQUksUUFBSixDQUFhO0FBQzNCLFlBQVMsZUFBVDtBQUNBLFdBQVEsS0FBUjtBQUNBLFlBQVMsaUJBQVMsU0FBVCxFQUFvQjtBQUM1QixhQUFTLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLElBQTdDLEdBRDRCO0lBQXBCO0dBSEssQ0FBWCxDQWxCVztFQUFoQjs7QUE0QkEsUUFBTztBQUNOLFFBQU0sSUFBTjtFQURELENBakM0QjtDQUFaLEVBQWI7O2tCQXNDVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiFcbldheXBvaW50cyAtIDQuMC4wXG5Db3B5cmlnaHQgwqkgMjAxMS0yMDE1IENhbGViIFRyb3VnaHRvblxuTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuaHR0cHM6Ly9naXRodWIuY29tL2ltYWtld2VidGhpbmdzL3dheXBvaW50cy9ibG9nL21hc3Rlci9saWNlbnNlcy50eHRcbiovXG4hZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KG4pe2lmKCFuKXRocm93IG5ldyBFcnJvcihcIk5vIG9wdGlvbnMgcGFzc2VkIHRvIFdheXBvaW50IGNvbnN0cnVjdG9yXCIpO2lmKCFuLmVsZW1lbnQpdGhyb3cgbmV3IEVycm9yKFwiTm8gZWxlbWVudCBvcHRpb24gcGFzc2VkIHRvIFdheXBvaW50IGNvbnN0cnVjdG9yXCIpO2lmKCFuLmhhbmRsZXIpdGhyb3cgbmV3IEVycm9yKFwiTm8gaGFuZGxlciBvcHRpb24gcGFzc2VkIHRvIFdheXBvaW50IGNvbnN0cnVjdG9yXCIpO3RoaXMua2V5PVwid2F5cG9pbnQtXCIrZSx0aGlzLm9wdGlvbnM9dC5BZGFwdGVyLmV4dGVuZCh7fSx0LmRlZmF1bHRzLG4pLHRoaXMuZWxlbWVudD10aGlzLm9wdGlvbnMuZWxlbWVudCx0aGlzLmFkYXB0ZXI9bmV3IHQuQWRhcHRlcih0aGlzLmVsZW1lbnQpLHRoaXMuY2FsbGJhY2s9bi5oYW5kbGVyLHRoaXMuYXhpcz10aGlzLm9wdGlvbnMuaG9yaXpvbnRhbD9cImhvcml6b250YWxcIjpcInZlcnRpY2FsXCIsdGhpcy5lbmFibGVkPXRoaXMub3B0aW9ucy5lbmFibGVkLHRoaXMudHJpZ2dlclBvaW50PW51bGwsdGhpcy5ncm91cD10Lkdyb3VwLmZpbmRPckNyZWF0ZSh7bmFtZTp0aGlzLm9wdGlvbnMuZ3JvdXAsYXhpczp0aGlzLmF4aXN9KSx0aGlzLmNvbnRleHQ9dC5Db250ZXh0LmZpbmRPckNyZWF0ZUJ5RWxlbWVudCh0aGlzLm9wdGlvbnMuY29udGV4dCksdC5vZmZzZXRBbGlhc2VzW3RoaXMub3B0aW9ucy5vZmZzZXRdJiYodGhpcy5vcHRpb25zLm9mZnNldD10Lm9mZnNldEFsaWFzZXNbdGhpcy5vcHRpb25zLm9mZnNldF0pLHRoaXMuZ3JvdXAuYWRkKHRoaXMpLHRoaXMuY29udGV4dC5hZGQodGhpcyksaVt0aGlzLmtleV09dGhpcyxlKz0xfXZhciBlPTAsaT17fTt0LnByb3RvdHlwZS5xdWV1ZVRyaWdnZXI9ZnVuY3Rpb24odCl7dGhpcy5ncm91cC5xdWV1ZVRyaWdnZXIodGhpcyx0KX0sdC5wcm90b3R5cGUudHJpZ2dlcj1mdW5jdGlvbih0KXt0aGlzLmVuYWJsZWQmJnRoaXMuY2FsbGJhY2smJnRoaXMuY2FsbGJhY2suYXBwbHkodGhpcyx0KX0sdC5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RoaXMuY29udGV4dC5yZW1vdmUodGhpcyksdGhpcy5ncm91cC5yZW1vdmUodGhpcyksZGVsZXRlIGlbdGhpcy5rZXldfSx0LnByb3RvdHlwZS5kaXNhYmxlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZW5hYmxlZD0hMSx0aGlzfSx0LnByb3RvdHlwZS5lbmFibGU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0LnJlZnJlc2goKSx0aGlzLmVuYWJsZWQ9ITAsdGhpc30sdC5wcm90b3R5cGUubmV4dD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmdyb3VwLm5leHQodGhpcyl9LHQucHJvdG90eXBlLnByZXZpb3VzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ3JvdXAucHJldmlvdXModGhpcyl9LHQuaW52b2tlQWxsPWZ1bmN0aW9uKHQpe3ZhciBlPVtdO2Zvcih2YXIgbiBpbiBpKWUucHVzaChpW25dKTtmb3IodmFyIG89MCxyPWUubGVuZ3RoO3I+bztvKyspZVtvXVt0XSgpfSx0LmRlc3Ryb3lBbGw9ZnVuY3Rpb24oKXt0Lmludm9rZUFsbChcImRlc3Ryb3lcIil9LHQuZGlzYWJsZUFsbD1mdW5jdGlvbigpe3QuaW52b2tlQWxsKFwiZGlzYWJsZVwiKX0sdC5lbmFibGVBbGw9ZnVuY3Rpb24oKXt0Lmludm9rZUFsbChcImVuYWJsZVwiKX0sdC5yZWZyZXNoQWxsPWZ1bmN0aW9uKCl7dC5Db250ZXh0LnJlZnJlc2hBbGwoKX0sdC52aWV3cG9ydEhlaWdodD1mdW5jdGlvbigpe3JldHVybiB3aW5kb3cuaW5uZXJIZWlnaHR8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHR9LHQudmlld3BvcnRXaWR0aD1mdW5jdGlvbigpe3JldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGh9LHQuYWRhcHRlcnM9W10sdC5kZWZhdWx0cz17Y29udGV4dDp3aW5kb3csY29udGludW91czohMCxlbmFibGVkOiEwLGdyb3VwOlwiZGVmYXVsdFwiLGhvcml6b250YWw6ITEsb2Zmc2V0OjB9LHQub2Zmc2V0QWxpYXNlcz17XCJib3R0b20taW4tdmlld1wiOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29udGV4dC5pbm5lckhlaWdodCgpLXRoaXMuYWRhcHRlci5vdXRlckhlaWdodCgpfSxcInJpZ2h0LWluLXZpZXdcIjpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNvbnRleHQuaW5uZXJXaWR0aCgpLXRoaXMuYWRhcHRlci5vdXRlcldpZHRoKCl9fSx3aW5kb3cuV2F5cG9pbnQ9dH0oKSxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCl7d2luZG93LnNldFRpbWVvdXQodCwxZTMvNjApfWZ1bmN0aW9uIGUodCl7dGhpcy5lbGVtZW50PXQsdGhpcy5BZGFwdGVyPW8uQWRhcHRlcix0aGlzLmFkYXB0ZXI9bmV3IHRoaXMuQWRhcHRlcih0KSx0aGlzLmtleT1cIndheXBvaW50LWNvbnRleHQtXCIraSx0aGlzLmRpZFNjcm9sbD0hMSx0aGlzLmRpZFJlc2l6ZT0hMSx0aGlzLm9sZFNjcm9sbD17eDp0aGlzLmFkYXB0ZXIuc2Nyb2xsTGVmdCgpLHk6dGhpcy5hZGFwdGVyLnNjcm9sbFRvcCgpfSx0aGlzLndheXBvaW50cz17dmVydGljYWw6e30saG9yaXpvbnRhbDp7fX0sdC53YXlwb2ludENvbnRleHRLZXk9dGhpcy5rZXksblt0LndheXBvaW50Q29udGV4dEtleV09dGhpcyxpKz0xLHRoaXMuY3JlYXRlVGhyb3R0bGVkU2Nyb2xsSGFuZGxlcigpLHRoaXMuY3JlYXRlVGhyb3R0bGVkUmVzaXplSGFuZGxlcigpfXZhciBpPTAsbj17fSxvPXdpbmRvdy5XYXlwb2ludCxyPXdpbmRvdy5vbmxvYWQ7ZS5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3ZhciBlPXQub3B0aW9ucy5ob3Jpem9udGFsP1wiaG9yaXpvbnRhbFwiOlwidmVydGljYWxcIjt0aGlzLndheXBvaW50c1tlXVt0LmtleV09dCx0aGlzLnJlZnJlc2goKX0sZS5wcm90b3R5cGUuY2hlY2tFbXB0eT1mdW5jdGlvbigpe3ZhciB0PXRoaXMuQWRhcHRlci5pc0VtcHR5T2JqZWN0KHRoaXMud2F5cG9pbnRzLmhvcml6b250YWwpLGU9dGhpcy5BZGFwdGVyLmlzRW1wdHlPYmplY3QodGhpcy53YXlwb2ludHMudmVydGljYWwpO3QmJmUmJih0aGlzLmFkYXB0ZXIub2ZmKFwiLndheXBvaW50c1wiKSxkZWxldGUgblt0aGlzLmtleV0pfSxlLnByb3RvdHlwZS5jcmVhdGVUaHJvdHRsZWRSZXNpemVIYW5kbGVyPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCgpe2UuaGFuZGxlUmVzaXplKCksZS5kaWRSZXNpemU9ITF9dmFyIGU9dGhpczt0aGlzLmFkYXB0ZXIub24oXCJyZXNpemUud2F5cG9pbnRzXCIsZnVuY3Rpb24oKXtlLmRpZFJlc2l6ZXx8KGUuZGlkUmVzaXplPSEwLG8ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHQpKX0pfSxlLnByb3RvdHlwZS5jcmVhdGVUaHJvdHRsZWRTY3JvbGxIYW5kbGVyPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCgpe2UuaGFuZGxlU2Nyb2xsKCksZS5kaWRTY3JvbGw9ITF9dmFyIGU9dGhpczt0aGlzLmFkYXB0ZXIub24oXCJzY3JvbGwud2F5cG9pbnRzXCIsZnVuY3Rpb24oKXsoIWUuZGlkU2Nyb2xsfHxvLmlzVG91Y2gpJiYoZS5kaWRTY3JvbGw9ITAsby5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodCkpfSl9LGUucHJvdG90eXBlLmhhbmRsZVJlc2l6ZT1mdW5jdGlvbigpe28uQ29udGV4dC5yZWZyZXNoQWxsKCl9LGUucHJvdG90eXBlLmhhbmRsZVNjcm9sbD1mdW5jdGlvbigpe3ZhciB0PXt9LGU9e2hvcml6b250YWw6e25ld1Njcm9sbDp0aGlzLmFkYXB0ZXIuc2Nyb2xsTGVmdCgpLG9sZFNjcm9sbDp0aGlzLm9sZFNjcm9sbC54LGZvcndhcmQ6XCJyaWdodFwiLGJhY2t3YXJkOlwibGVmdFwifSx2ZXJ0aWNhbDp7bmV3U2Nyb2xsOnRoaXMuYWRhcHRlci5zY3JvbGxUb3AoKSxvbGRTY3JvbGw6dGhpcy5vbGRTY3JvbGwueSxmb3J3YXJkOlwiZG93blwiLGJhY2t3YXJkOlwidXBcIn19O2Zvcih2YXIgaSBpbiBlKXt2YXIgbj1lW2ldLG89bi5uZXdTY3JvbGw+bi5vbGRTY3JvbGwscj1vP24uZm9yd2FyZDpuLmJhY2t3YXJkO2Zvcih2YXIgcyBpbiB0aGlzLndheXBvaW50c1tpXSl7dmFyIGw9dGhpcy53YXlwb2ludHNbaV1bc10sYT1uLm9sZFNjcm9sbDxsLnRyaWdnZXJQb2ludCxoPW4ubmV3U2Nyb2xsPj1sLnRyaWdnZXJQb2ludCxwPWEmJmgsdT0hYSYmIWg7KHB8fHUpJiYobC5xdWV1ZVRyaWdnZXIociksdFtsLmdyb3VwLmlkXT1sLmdyb3VwKX19Zm9yKHZhciBjIGluIHQpdFtjXS5mbHVzaFRyaWdnZXJzKCk7dGhpcy5vbGRTY3JvbGw9e3g6ZS5ob3Jpem9udGFsLm5ld1Njcm9sbCx5OmUudmVydGljYWwubmV3U2Nyb2xsfX0sZS5wcm90b3R5cGUuaW5uZXJIZWlnaHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbGVtZW50PT10aGlzLmVsZW1lbnQud2luZG93P28udmlld3BvcnRIZWlnaHQoKTp0aGlzLmFkYXB0ZXIuaW5uZXJIZWlnaHQoKX0sZS5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKHQpe2RlbGV0ZSB0aGlzLndheXBvaW50c1t0LmF4aXNdW3Qua2V5XSx0aGlzLmNoZWNrRW1wdHkoKX0sZS5wcm90b3R5cGUuaW5uZXJXaWR0aD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVsZW1lbnQ9PXRoaXMuZWxlbWVudC53aW5kb3c/by52aWV3cG9ydFdpZHRoKCk6dGhpcy5hZGFwdGVyLmlubmVyV2lkdGgoKX0sZS5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3ZhciB0PVtdO2Zvcih2YXIgZSBpbiB0aGlzLndheXBvaW50cylmb3IodmFyIGkgaW4gdGhpcy53YXlwb2ludHNbZV0pdC5wdXNoKHRoaXMud2F5cG9pbnRzW2VdW2ldKTtmb3IodmFyIG49MCxvPXQubGVuZ3RoO28+bjtuKyspdFtuXS5kZXN0cm95KCl9LGUucHJvdG90eXBlLnJlZnJlc2g9ZnVuY3Rpb24oKXt2YXIgdCxlPXRoaXMuZWxlbWVudD09dGhpcy5lbGVtZW50LndpbmRvdyxpPWU/dm9pZCAwOnRoaXMuYWRhcHRlci5vZmZzZXQoKSxuPXt9O3RoaXMuaGFuZGxlU2Nyb2xsKCksdD17aG9yaXpvbnRhbDp7Y29udGV4dE9mZnNldDplPzA6aS5sZWZ0LGNvbnRleHRTY3JvbGw6ZT8wOnRoaXMub2xkU2Nyb2xsLngsY29udGV4dERpbWVuc2lvbjp0aGlzLmlubmVyV2lkdGgoKSxvbGRTY3JvbGw6dGhpcy5vbGRTY3JvbGwueCxmb3J3YXJkOlwicmlnaHRcIixiYWNrd2FyZDpcImxlZnRcIixvZmZzZXRQcm9wOlwibGVmdFwifSx2ZXJ0aWNhbDp7Y29udGV4dE9mZnNldDplPzA6aS50b3AsY29udGV4dFNjcm9sbDplPzA6dGhpcy5vbGRTY3JvbGwueSxjb250ZXh0RGltZW5zaW9uOnRoaXMuaW5uZXJIZWlnaHQoKSxvbGRTY3JvbGw6dGhpcy5vbGRTY3JvbGwueSxmb3J3YXJkOlwiZG93blwiLGJhY2t3YXJkOlwidXBcIixvZmZzZXRQcm9wOlwidG9wXCJ9fTtmb3IodmFyIHIgaW4gdCl7dmFyIHM9dFtyXTtmb3IodmFyIGwgaW4gdGhpcy53YXlwb2ludHNbcl0pe3ZhciBhLGgscCx1LGMsZj10aGlzLndheXBvaW50c1tyXVtsXSxkPWYub3B0aW9ucy5vZmZzZXQseT1mLnRyaWdnZXJQb2ludCxnPTAsdz1udWxsPT15O2YuZWxlbWVudCE9PWYuZWxlbWVudC53aW5kb3cmJihnPWYuYWRhcHRlci5vZmZzZXQoKVtzLm9mZnNldFByb3BdKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkP2Q9ZC5hcHBseShmKTpcInN0cmluZ1wiPT10eXBlb2YgZCYmKGQ9cGFyc2VGbG9hdChkKSxmLm9wdGlvbnMub2Zmc2V0LmluZGV4T2YoXCIlXCIpPi0xJiYoZD1NYXRoLmNlaWwocy5jb250ZXh0RGltZW5zaW9uKmQvMTAwKSkpLGE9cy5jb250ZXh0U2Nyb2xsLXMuY29udGV4dE9mZnNldCxmLnRyaWdnZXJQb2ludD1nK2EtZCxoPXk8cy5vbGRTY3JvbGwscD1mLnRyaWdnZXJQb2ludD49cy5vbGRTY3JvbGwsdT1oJiZwLGM9IWgmJiFwLCF3JiZ1PyhmLnF1ZXVlVHJpZ2dlcihzLmJhY2t3YXJkKSxuW2YuZ3JvdXAuaWRdPWYuZ3JvdXApOiF3JiZjPyhmLnF1ZXVlVHJpZ2dlcihzLmZvcndhcmQpLG5bZi5ncm91cC5pZF09Zi5ncm91cCk6dyYmcy5vbGRTY3JvbGw+PWYudHJpZ2dlclBvaW50JiYoZi5xdWV1ZVRyaWdnZXIocy5mb3J3YXJkKSxuW2YuZ3JvdXAuaWRdPWYuZ3JvdXApfX1yZXR1cm4gby5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXtmb3IodmFyIHQgaW4gbiluW3RdLmZsdXNoVHJpZ2dlcnMoKX0pLHRoaXN9LGUuZmluZE9yQ3JlYXRlQnlFbGVtZW50PWZ1bmN0aW9uKHQpe3JldHVybiBlLmZpbmRCeUVsZW1lbnQodCl8fG5ldyBlKHQpfSxlLnJlZnJlc2hBbGw9ZnVuY3Rpb24oKXtmb3IodmFyIHQgaW4gbiluW3RdLnJlZnJlc2goKX0sZS5maW5kQnlFbGVtZW50PWZ1bmN0aW9uKHQpe3JldHVybiBuW3Qud2F5cG9pbnRDb250ZXh0S2V5XX0sd2luZG93Lm9ubG9hZD1mdW5jdGlvbigpe3ImJnIoKSxlLnJlZnJlc2hBbGwoKX0sby5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU9ZnVuY3Rpb24oZSl7dmFyIGk9d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZXx8dDtpLmNhbGwod2luZG93LGUpfSxvLkNvbnRleHQ9ZX0oKSxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCxlKXtyZXR1cm4gdC50cmlnZ2VyUG9pbnQtZS50cmlnZ2VyUG9pbnR9ZnVuY3Rpb24gZSh0LGUpe3JldHVybiBlLnRyaWdnZXJQb2ludC10LnRyaWdnZXJQb2ludH1mdW5jdGlvbiBpKHQpe3RoaXMubmFtZT10Lm5hbWUsdGhpcy5heGlzPXQuYXhpcyx0aGlzLmlkPXRoaXMubmFtZStcIi1cIit0aGlzLmF4aXMsdGhpcy53YXlwb2ludHM9W10sdGhpcy5jbGVhclRyaWdnZXJRdWV1ZXMoKSxuW3RoaXMuYXhpc11bdGhpcy5uYW1lXT10aGlzfXZhciBuPXt2ZXJ0aWNhbDp7fSxob3Jpem9udGFsOnt9fSxvPXdpbmRvdy5XYXlwb2ludDtpLnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24odCl7dGhpcy53YXlwb2ludHMucHVzaCh0KX0saS5wcm90b3R5cGUuY2xlYXJUcmlnZ2VyUXVldWVzPWZ1bmN0aW9uKCl7dGhpcy50cmlnZ2VyUXVldWVzPXt1cDpbXSxkb3duOltdLGxlZnQ6W10scmlnaHQ6W119fSxpLnByb3RvdHlwZS5mbHVzaFRyaWdnZXJzPWZ1bmN0aW9uKCl7Zm9yKHZhciBpIGluIHRoaXMudHJpZ2dlclF1ZXVlcyl7dmFyIG49dGhpcy50cmlnZ2VyUXVldWVzW2ldLG89XCJ1cFwiPT09aXx8XCJsZWZ0XCI9PT1pO24uc29ydChvP2U6dCk7Zm9yKHZhciByPTAscz1uLmxlbmd0aDtzPnI7cis9MSl7dmFyIGw9bltyXTsobC5vcHRpb25zLmNvbnRpbnVvdXN8fHI9PT1uLmxlbmd0aC0xKSYmbC50cmlnZ2VyKFtpXSl9fXRoaXMuY2xlYXJUcmlnZ2VyUXVldWVzKCl9LGkucHJvdG90eXBlLm5leHQ9ZnVuY3Rpb24oZSl7dGhpcy53YXlwb2ludHMuc29ydCh0KTt2YXIgaT1vLkFkYXB0ZXIuaW5BcnJheShlLHRoaXMud2F5cG9pbnRzKSxuPWk9PT10aGlzLndheXBvaW50cy5sZW5ndGgtMTtyZXR1cm4gbj9udWxsOnRoaXMud2F5cG9pbnRzW2krMV19LGkucHJvdG90eXBlLnByZXZpb3VzPWZ1bmN0aW9uKGUpe3RoaXMud2F5cG9pbnRzLnNvcnQodCk7dmFyIGk9by5BZGFwdGVyLmluQXJyYXkoZSx0aGlzLndheXBvaW50cyk7cmV0dXJuIGk/dGhpcy53YXlwb2ludHNbaS0xXTpudWxsfSxpLnByb3RvdHlwZS5xdWV1ZVRyaWdnZXI9ZnVuY3Rpb24odCxlKXt0aGlzLnRyaWdnZXJRdWV1ZXNbZV0ucHVzaCh0KX0saS5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKHQpe3ZhciBlPW8uQWRhcHRlci5pbkFycmF5KHQsdGhpcy53YXlwb2ludHMpO2U+LTEmJnRoaXMud2F5cG9pbnRzLnNwbGljZShlLDEpfSxpLnByb3RvdHlwZS5maXJzdD1mdW5jdGlvbigpe3JldHVybiB0aGlzLndheXBvaW50c1swXX0saS5wcm90b3R5cGUubGFzdD1mdW5jdGlvbigpe3JldHVybiB0aGlzLndheXBvaW50c1t0aGlzLndheXBvaW50cy5sZW5ndGgtMV19LGkuZmluZE9yQ3JlYXRlPWZ1bmN0aW9uKHQpe3JldHVybiBuW3QuYXhpc11bdC5uYW1lXXx8bmV3IGkodCl9LG8uR3JvdXA9aX0oKSxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCl7cmV0dXJuIHQ9PT10LndpbmRvd31mdW5jdGlvbiBlKGUpe3JldHVybiB0KGUpP2U6ZS5kZWZhdWx0Vmlld31mdW5jdGlvbiBpKHQpe3RoaXMuZWxlbWVudD10LHRoaXMuaGFuZGxlcnM9e319dmFyIG49d2luZG93LldheXBvaW50O2kucHJvdG90eXBlLmlubmVySGVpZ2h0PWZ1bmN0aW9uKCl7dmFyIGU9dCh0aGlzLmVsZW1lbnQpO3JldHVybiBlP3RoaXMuZWxlbWVudC5pbm5lckhlaWdodDp0aGlzLmVsZW1lbnQuY2xpZW50SGVpZ2h0fSxpLnByb3RvdHlwZS5pbm5lcldpZHRoPWZ1bmN0aW9uKCl7dmFyIGU9dCh0aGlzLmVsZW1lbnQpO3JldHVybiBlP3RoaXMuZWxlbWVudC5pbm5lcldpZHRoOnRoaXMuZWxlbWVudC5jbGllbnRXaWR0aH0saS5wcm90b3R5cGUub2ZmPWZ1bmN0aW9uKHQsZSl7ZnVuY3Rpb24gaSh0LGUsaSl7Zm9yKHZhciBuPTAsbz1lLmxlbmd0aC0xO28+bjtuKyspe3ZhciByPWVbbl07aSYmaSE9PXJ8fHQucmVtb3ZlRXZlbnRMaXN0ZW5lcihyKX19dmFyIG49dC5zcGxpdChcIi5cIiksbz1uWzBdLHI9blsxXSxzPXRoaXMuZWxlbWVudDtpZihyJiZ0aGlzLmhhbmRsZXJzW3JdJiZvKWkocyx0aGlzLmhhbmRsZXJzW3JdW29dLGUpLHRoaXMuaGFuZGxlcnNbcl1bb109W107ZWxzZSBpZihvKWZvcih2YXIgbCBpbiB0aGlzLmhhbmRsZXJzKWkocyx0aGlzLmhhbmRsZXJzW2xdW29dfHxbXSxlKSx0aGlzLmhhbmRsZXJzW2xdW29dPVtdO2Vsc2UgaWYociYmdGhpcy5oYW5kbGVyc1tyXSl7Zm9yKHZhciBhIGluIHRoaXMuaGFuZGxlcnNbcl0paShzLHRoaXMuaGFuZGxlcnNbcl1bYV0sZSk7dGhpcy5oYW5kbGVyc1tyXT17fX19LGkucHJvdG90eXBlLm9mZnNldD1mdW5jdGlvbigpe2lmKCF0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudClyZXR1cm4gbnVsbDt2YXIgdD10aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsaT1lKHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50KSxuPXt0b3A6MCxsZWZ0OjB9O3JldHVybiB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0JiYobj10aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpLHt0b3A6bi50b3AraS5wYWdlWU9mZnNldC10LmNsaWVudFRvcCxsZWZ0Om4ubGVmdCtpLnBhZ2VYT2Zmc2V0LXQuY2xpZW50TGVmdH19LGkucHJvdG90eXBlLm9uPWZ1bmN0aW9uKHQsZSl7dmFyIGk9dC5zcGxpdChcIi5cIiksbj1pWzBdLG89aVsxXXx8XCJfX2RlZmF1bHRcIixyPXRoaXMuaGFuZGxlcnNbb109dGhpcy5oYW5kbGVyc1tvXXx8e30scz1yW25dPXJbbl18fFtdO3MucHVzaChlKSx0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihuLGUpfSxpLnByb3RvdHlwZS5vdXRlckhlaWdodD1mdW5jdGlvbihlKXt2YXIgaSxuPXRoaXMuaW5uZXJIZWlnaHQoKTtyZXR1cm4gZSYmIXQodGhpcy5lbGVtZW50KSYmKGk9d2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50KSxuKz1wYXJzZUludChpLm1hcmdpblRvcCwxMCksbis9cGFyc2VJbnQoaS5tYXJnaW5Cb3R0b20sMTApKSxufSxpLnByb3RvdHlwZS5vdXRlcldpZHRoPWZ1bmN0aW9uKGUpe3ZhciBpLG49dGhpcy5pbm5lcldpZHRoKCk7cmV0dXJuIGUmJiF0KHRoaXMuZWxlbWVudCkmJihpPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudCksbis9cGFyc2VJbnQoaS5tYXJnaW5MZWZ0LDEwKSxuKz1wYXJzZUludChpLm1hcmdpblJpZ2h0LDEwKSksbn0saS5wcm90b3R5cGUuc2Nyb2xsTGVmdD1mdW5jdGlvbigpe3ZhciB0PWUodGhpcy5lbGVtZW50KTtyZXR1cm4gdD90LnBhZ2VYT2Zmc2V0OnRoaXMuZWxlbWVudC5zY3JvbGxMZWZ0fSxpLnByb3RvdHlwZS5zY3JvbGxUb3A9ZnVuY3Rpb24oKXt2YXIgdD1lKHRoaXMuZWxlbWVudCk7cmV0dXJuIHQ/dC5wYWdlWU9mZnNldDp0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wfSxpLmV4dGVuZD1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCxlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgdCYmXCJvYmplY3RcIj09dHlwZW9mIGUpZm9yKHZhciBpIGluIGUpZS5oYXNPd25Qcm9wZXJ0eShpKSYmKHRbaV09ZVtpXSk7cmV0dXJuIHR9Zm9yKHZhciBlPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksaT0xLG49ZS5sZW5ndGg7bj5pO2krKyl0KGVbMF0sZVtpXSk7cmV0dXJuIGVbMF19LGkuaW5BcnJheT1mdW5jdGlvbih0LGUsaSl7cmV0dXJuIG51bGw9PWU/LTE6ZS5pbmRleE9mKHQsaSl9LGkuaXNFbXB0eU9iamVjdD1mdW5jdGlvbih0KXtmb3IodmFyIGUgaW4gdClyZXR1cm4hMTtyZXR1cm4hMH0sbi5hZGFwdGVycy5wdXNoKHtuYW1lOlwibm9mcmFtZXdvcmtcIixBZGFwdGVyOml9KSxuLkFkYXB0ZXI9aX0oKTsiLCJpbXBvcnQgcHJpbWVsYWJzIGZyb20gJy4vcGFydGlhbHMvcHJpbWVsYWJzLmpzJztcbmltcG9ydCBtZW51IGZyb20gJy4vcGFydGlhbHMvbWVudS5qcyc7XG5pbXBvcnQgaG9tZVNjcm9sbCBmcm9tICcuL3BhcnRpYWxzL2hvbWVTY3JvbGwuanMnO1xuaW1wb3J0IGpvdXJuYWxOYXYgZnJvbSAnLi9wYXJ0aWFscy9qb3VybmFsTmF2LmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblx0bWVudS5pbml0KCk7XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXcnKSkge1xuXHRcdGhvbWVTY3JvbGwuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzJykpIHtcblx0XHRwcmltZWxhYnMuaW5pdCgpO1xuXHR9XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb3VybmFsLXNpbmdsZScpKSB7XG5cdFx0am91cm5hbE5hdi5pbml0KCk7XG5cdH1cbn0pO1xuIiwibGV0IGhvbWVTY3JvbGwgPSAoZnVuY3Rpb24gKCkge1xuXHRsZXQgbmF2SXRlbXM7XG5cdGxldCBkZWx0YSA9IDA7XG5cdGxldCBjdXJyZW50U2xpZGU7XG5cdGxldCBuZXh0U2xpZGU7XG5cdGxldCBwcmV2aW91c1NsaWRlO1xuXHRsZXQgcHJldmlvdXNTbGlkZXM7XG5cdGxldCBpc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcblx0bGV0IGxhc3RTY3JvbGxlZDtcblx0bGV0IG1vdXNld2hlZWxDYW5TY3JvbGwgPSB0cnVlO1xuXHRsZXQgbGFzdE1vdXNld2hlZWxUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblx0bGV0IGxhc3RTY3JvbGxUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblx0bGV0IHNjcm9sbHMgPSBbXTtcblx0bGV0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctY29udGFpbmVyX19uYXYnKTtcblx0bGV0IHdvcmtTbGlkZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1wcmV2aWV3JykpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0aWYgKG5hdikge1xuXHRcdFx0bmF2SXRlbXMgPSBuYXYucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXHRcdH1cblx0XHRhbmltYXRlSW5pdGlhbCgpO1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcmVzZXRTY3JvbGwoKSB7XG5cdFx0c2Nyb2xscyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNjcm9sbHNBdmcob2Zmc2V0KSB7XG5cdFx0bGV0IHN1bSA9IDA7XG5cblx0XHRsZXQgZWxtcyA9IHNjcm9sbHMuc2xpY2UoTWF0aC5tYXgoc2Nyb2xscy5sZW5ndGggLSBvZmZzZXQsIDEpKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZWxtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0c3VtICs9IGVsbXNbaV07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGguY2VpbChzdW0gLyBvZmZzZXQpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYW5pbWF0ZUluaXRpYWwoKSB7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0bGV0IGZpcnN0V29yayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLTEnKTtcblx0XHRcdGZpcnN0V29yay5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdG5hdkl0ZW1zWzBdLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LWNvbnRhaW5lcl9fbmF2X19pdGVtLS1pcy1hY3RpdmUnKTtcblx0XHR9LCAyMDApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmROYXYpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNjcm9sbE5hdik7XG5cblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbmF2SXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdG5hdkl0ZW1zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlTmF2KTtcblx0XHR9XG5cdFx0XG5cdFx0Ly8gJCgnLndvcmstcHJldmlldy1jb250YWluZXInKS5zd2lwZSh7XG5cdFx0Ly8gXHRzd2lwZTpmdW5jdGlvbihldmVudCwgZGlyZWN0aW9uLCBkaXN0YW5jZSwgZHVyYXRpb24sIGZpbmdlckNvdW50KSB7XG5cdFx0Ly8gXHRcdGNvbnNvbGUubG9nKCBcIllvdSBzd2lwZWQgXCIgKyBkaXJlY3Rpb24gKTtcblx0XHQvLyBcdH0sXG5cdFx0Ly8gXHRhbGxvd1BhZ2VTY3JvbGw6J3ZlcnRpY2FsJ1xuXHRcdC8vIH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlTmF2KGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRsZXQgc2xpZGVOdW1iZXIgPSBldmVudC50YXJnZXQuaW5uZXJIVE1MLnN1YnN0cmluZygxKTtcblxuXHRcdGlmIChpc1RyYW5zaXRpb25pbmcgPT0gZmFsc2UpIHtcblx0XHRcdGdvVG9TbGlkZShzbGlkZU51bWJlcik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGlnaGxpZ2h0QWN0aXZlTmF2KCkge1xuXHRcdC8vIFJlbW92ZSB0aGUgYWN0aXZlIGNsYXNzXG5cdFx0bGV0IGFjdGl2ZU5hdkNsYXNzID0gJ3dvcmstcHJldmlldy1jb250YWluZXJfX25hdl9faXRlbS0taXMtYWN0aXZlJztcblx0XHRsZXQgYWN0aXZlTmF2SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYWN0aXZlTmF2Q2xhc3MpO1xuXHRcdGFjdGl2ZU5hdkl0ZW0uY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVOYXZDbGFzcyk7XG5cblx0XHRsZXQgbmV4dE51bWJlciA9IG5leHRTbGlkZS5pZC5zdWJzdHJpbmcobmV4dFNsaWRlLmlkLmxlbmd0aCAtMSk7XG5cdFx0Y29uc29sZS5sb2cobmV4dE51bWJlcik7XG5cblx0XHRuYXZJdGVtc1tuZXh0TnVtYmVyIC0gMV0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKGFjdGl2ZU5hdkNsYXNzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdvVG9TbGlkZShzbGlkZU51bWJlcikge1xuXHRcdG5leHRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLScgKyBzbGlkZU51bWJlciApO1xuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblxuXHRcdGlmIChuZXh0U2xpZGUpIHtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXHRcdFx0aGlnaGxpZ2h0QWN0aXZlTmF2KCk7XG5cblx0XHRcdGxldCBjdXJyZW50TnVtYmVyID0gY3VycmVudFNsaWRlLmlkLnN1YnN0cmluZyhjdXJyZW50U2xpZGUuaWQubGVuZ3RoIC0xKTtcblx0XHRcdGxldCBuZXh0TnVtYmVyID0gbmV4dFNsaWRlLmlkLnN1YnN0cmluZyhuZXh0U2xpZGUuaWQubGVuZ3RoIC0xKTtcblxuXHRcdFx0aWYgKGN1cnJlbnROdW1iZXIgPiBuZXh0TnVtYmVyKSB7XG5cdFx0XHRcdC8vIElmIHdlJ3JlIGdvaW5nIGJhY2t3YXJkc1xuXHRcdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cblx0XHRcdFx0Ly8gTmVlZCB0byBhZGQgbmV4dCB0byBBTEwgZ29pbmcgZm9yd2FyZFxuXHRcdFx0XHRsZXQgcHJldmlvdXNTbGlkZXMgPSB3b3JrU2xpZGVzLnNsaWNlKG5leHROdW1iZXIsIGN1cnJlbnROdW1iZXIgLSAxKTtcblxuXHRcdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBwcmV2aW91c1NsaWRlcy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0XHRwcmV2aW91c1NsaWRlc1tpXS5jbGFzc0xpc3QuYWRkKCd3b3JrLXByZXZpZXctLW5leHQnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBJZiB3ZSdyZSBnb2luZyBmb3J3YXJkc1xuXHRcdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0fVxuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gc2Nyb2xsTmF2KGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Ly8gY29uc29sZS5sb2coJ2ZpcmVkJyk7XG5cblx0XHRsZXQgc2Nyb2xsVGhyZXNob2xkID0gNDA7XG5cblx0XHRsZXQgdmFsdWUgPSAtZS5kZWx0YVk7XG5cblx0XHRpZiAoc2Nyb2xscy5sZW5ndGggPiAxNTApIHtcblx0XHRcdHNjcm9sbHMuc2hpZnQoKTtcblx0XHR9XG5cblx0XHRzY3JvbGxzLnB1c2goTWF0aC5hYnModmFsdWUpKTtcblxuXHRcdHZhciBjdXJyVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cblx0XHRpZiAoKGN1cnJUaW1lIC0gbGFzdE1vdXNld2hlZWxUaW1lKSA+IDIwMCkge1xuXHRcdFx0cmVzZXRTY3JvbGwoKTtcblx0XHR9XG5cblx0XHRsYXN0TW91c2V3aGVlbFRpbWUgPSBjdXJyVGltZTtcblxuXHRcdHZhciBsYXN0QXZnID0gc2Nyb2xsc0F2Zyg1KTtcblx0XHR2YXIgbWlkQXZnID0gc2Nyb2xsc0F2Zyg0MCk7XG5cblx0XHRpZiAobGFzdEF2ZyA+IG1pZEF2Zykge1xuXHRcdFx0aWYgKG1vdXNld2hlZWxDYW5TY3JvbGwgJiYgaXNUcmFuc2l0aW9uaW5nID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0bW91c2V3aGVlbENhblNjcm9sbCA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKHZhbHVlIDwgMCkge1xuXHRcdFx0XHRcdFx0YWR2YW5jZVNsaWRlKCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlZ3Jlc3NTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bW91c2V3aGVlbENhblNjcm9sbCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24ga2V5Ym9hcmROYXYoZXZlbnQpIHtcblx0XHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0XHRjYXNlIDM4OlxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0cmVncmVzc1NsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDQwOlxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0aWYgKGlzVHJhbnNpdGlvbmluZyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0YWR2YW5jZVNsaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdH1cblxuXHRmdW5jdGlvbiByZXNldFRyYW5zaXRpb25pbmcoKSB7XG5cdFx0aXNUcmFuc2l0aW9uaW5nID0gdHJ1ZTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRpc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcblx0XHR9LCAxMDAwKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkdmFuY2VTbGlkZSgpIHtcblxuXHRcdGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRuZXh0U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cblx0XHRpZiAobmV4dFNsaWRlKSB7XG5cdFx0XHRoaWdobGlnaHRBY3RpdmVOYXYoKTtcblx0XHRcdHJlc2V0VHJhbnNpdGlvbmluZygpO1xuXG5cdFx0XHRjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmstcHJldmlldy0tY3VycmVudCcpO1xuXG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cdFx0XHRuZXh0U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1uZXh0Jyk7XG5cdFx0fVxuXHR9XG5cdFxuXHRmdW5jdGlvbiByZWdyZXNzU2xpZGUoKSB7XG5cdFx0Y3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstcHJldmlldy0tY3VycmVudCcpO1xuXHRcdHByZXZpb3VzU2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstcHJldmlldy0tcHJldmlvdXMnKTtcblx0XHRwcmV2aW91c1NsaWRlID0gcHJldmlvdXNTbGlkZXNbcHJldmlvdXNTbGlkZXMubGVuZ3RoIC0gMV07XG5cblx0XHRpZiAocHJldmlvdXNTbGlkZSkge1xuXHRcdFx0Ly8gU2V0cyBuZXh0IGFjdHVhbCBzbGlkZSAobm90IGNocm9ub2xvZ2ljYWxseSkgdG8gcHJldmlvdXMgc2xpZGVcblx0XHRcdG5leHRTbGlkZSA9IHByZXZpb3VzU2xpZGU7XG5cblx0XHRcdGhpZ2hsaWdodEFjdGl2ZU5hdigpO1xuXHRcdFx0cmVzZXRUcmFuc2l0aW9uaW5nKCk7XG5cblx0XHRcdGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrLXByZXZpZXctLWN1cnJlbnQnKTtcblx0XHRcdHByZXZpb3VzU2xpZGUuY2xhc3NMaXN0LmFkZCgnd29yay1wcmV2aWV3LS1jdXJyZW50Jyk7XG5cblx0XHRcdHByZXZpb3VzU2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd29yay1wcmV2aWV3LS1wcmV2aW91cycpO1xuXHRcdFx0Y3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoJ3dvcmstcHJldmlldy0tbmV4dCcpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBob21lU2Nyb2xsO1xuIiwiLyoqXG4gKiBBbGxvd3MgZm9yIGxlZnQvcmlnaHQgbmF2aWdhdGlvbiBpbiBqb3VybmFsXG4gKi9cbmxldCBqb3VybmFsTmF2ID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgcHJldmlvdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam91cm5hbC1zaW5nbGVfX25hdmlnYXRpb24tLXByZXZpb3VzIGEnKTtcblx0bGV0IG5leHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam91cm5hbC1zaW5nbGVfX25hdmlnYXRpb24tLW5leHQgYScpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFVJRXZlbnRzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kVUlFdmVudHMoKSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZE5hdik7XG5cdH1cblxuXHRmdW5jdGlvbiBrZXlib2FyZE5hdihldmVudCkge1xuXHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0Y2FzZSAzNzpcblx0XHRcdFx0aWYgKHByZXZpb3VzKSB7XG5cdFx0XHRcdFx0Z29Ub0xpbmsoIHByZXZpb3VzLmhyZWYgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzk6XG5cdFx0XHRcdGlmIChuZXh0KSB7XG5cdFx0XHRcdFx0Z29Ub0xpbmsoIG5leHQuaHJlZiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGdvVG9MaW5rKGxpbmspIHtcblx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpbms7XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVOYXYoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH1cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxOYXY7XG4iLCIvKipcbiAqIEhhbmRsZXMgbW9iaWxlIG1lbnVcbiAqL1xubGV0IG1lbnUgPSAoZnVuY3Rpb24oKSB7XG5cdGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zaXRlaGVhZGVyJyk7XG5cdGxldCB0b2dnbGUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmwtc2l0ZWhlYWRlcl9fbWVudS10b2dnbGUnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGJpbmRVSUV2ZW50cygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmluZFVJRXZlbnRzKCkge1xuXHRcdHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0b2dnbGVNZW51KCk7XG5cdFx0XHRjaGFuZ2VUZXh0KCk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuXHRcdGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdsLXNpdGVoZWFkZXItLW5hdi1pcy1vcGVuJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBjaGFuZ2VUZXh0KCkge1xuXHRcdGlmICh0b2dnbGUuaW5uZXJIVE1MID09ICdNZW51Jykge1x0XG5cdFx0XHR0b2dnbGUuaW5uZXJIVE1MID0gJ0Nsb3NlJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dG9nZ2xlLmlubmVySFRNTCA9ICdNZW51Jztcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgbWVudTtcbiIsImltcG9ydCB3YXlwb2ludHMgZnJvbSAnLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvd2F5cG9pbnRzL2xpYi9ub2ZyYW1ld29yay53YXlwb2ludHMubWluLmpzJztcblxubGV0IHByaW1lbGFicyA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBwcm9ibGVtU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX19zZWN0aW9uLS1wcm9ibGVtcycpO1xuXHRsZXQgbW9kdWxhclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbWUtbGFic19fc2VjdGlvbi0tbW9kdWxhci1ib3hlcycpO1xuXHRsZXQgc3RhbmRhcmRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW1lLWxhYnNfX3NlY3Rpb24tLWFzLXN0YW5kYXJkJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblxuXHRcdGxldCBwcm9ibGVtcyA9IG5ldyBXYXlwb2ludCh7XG5cdFx0XHRlbGVtZW50OiBwcm9ibGVtU2VjdGlvbixcblx0XHRcdG9mZnNldDogJzUwJScsXG5cdFx0XHRoYW5kbGVyOiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG5cdFx0XHRcdHByb2JsZW1TZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3ByaW1lLWxhYnNfX3NlY3Rpb24tLXByb2JsZW1zLS1pcy1hY3RpdmUnKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGxldCBtb2R1bGFyID0gbmV3IFdheXBvaW50KHtcblx0XHRcdGVsZW1lbnQ6IG1vZHVsYXJTZWN0aW9uLFxuXHRcdFx0b2Zmc2V0OiAnNjAlJyxcblx0XHRcdGhhbmRsZXI6IGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuXHRcdFx0XHRtb2R1bGFyU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdwcmltZS1sYWJzX19zZWN0aW9uLS1tb2R1bGFyLWJveGVzLS1pcy1hY3RpdmUnKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGxldCBzdGFuZGFyZCA9IG5ldyBXYXlwb2ludCh7XG5cdFx0XHRlbGVtZW50OiBzdGFuZGFyZFNlY3Rpb24sXG5cdFx0XHRvZmZzZXQ6ICc1MCUnLFxuXHRcdFx0aGFuZGxlcjogZnVuY3Rpb24oZGlyZWN0aW9uKSB7XG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmltZS1sYWJzX192aWRlbycpLnBsYXkoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBwcmltZWxhYnM7XG4iXX0=
