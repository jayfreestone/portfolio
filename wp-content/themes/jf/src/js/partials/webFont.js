var cookies = (function () {
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
		return "";
	}

	return {
		set: setCookie,
		get: getCookie
	};
}());

var webFont = (function() {
	var html = document.querySelector('html');

	function init() {
		checkCookie();
		fontLoad();
	}

	function checkCookie() {
		var fontCookie = cookies.get('webfont');
		console.log('Font cookie '+ fontCookie);
		if ( fontCookie === 'loaded' ) {
			addClass();
		}
	}

	function addClass() {
		html.className += ' wf-graphikweb-n4-active wf-active';
		console.log('Class added');
	}

	function fontLoad() {
		var WebFontConfig = {
			custom: {
				families: ['Graphik Web']
			},
			active: function () {
				console.log('Setting active');
				cookies.set('webfont', 'loaded', 7);
			}
		};

		var wf = document.createElement('script'), s = document.scripts[0];
		wf.src = '//cdnjs.cloudflare.com/ajax/libs/webfont/1.6.24/webfontloader.js';
		s.parentNode.insertBefore(wf, s);
	}

	return {
		init: init
	};
}());

webfont.init();
