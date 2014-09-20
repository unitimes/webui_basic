document.addEventListener('DOMContentLoaded', fInit, false);

function fInit() {
	var elIconsSubmenu = document.querySelector('.icons .submenu');
	var elGenreList = document.getElementById('genre_list');
	var elGenreMenu = document.getElementById('genre');
	var elBody = document.body;
	var nlGenreSubmenu = document.querySelectorAll('#genre_list .submenu');
	var elContents = document.querySelector('.contents');
	var nlBookLists = document.querySelectorAll('.content_ul');
	var elDrawerIcon = document.getElementById('drawerIcon');
	var aOngoingTouches = new Array();
	var SWIPE_LIMIT = 50;
	var SCROLL_IDENTIFIER = 30;
	var fTimeout;

	elIconsSubmenu.addEventListener('mousedown', fIconsSubmenuEventHandler, false);
	nlGenreSubmenu[0].addEventListener('click', fSubmenuEventHandler, false);
	elContents.addEventListener('click', fContentsEventHandler, false);
	elDrawerIcon.addEventListener('click', fDrawerIconEventHandler, false);
	nlBookLists[0].addEventListener('touchstart', fBookListTouchStartEventHandler, false);
	nlBookLists[0].addEventListener('touchmove', fBookListTouchMoveEventHandler, false);
	nlBookLists[0].addEventListener('touchend', fBookListTouchEndEventHandler, false);
	nlBookLists[0].addEventListener('touchcancel', fBookListTouchCancelEventHandler, false);

	elGenreMenu.addEventListener('click', function(e) {
		if(e.target.offsetParent.id === 'genre') {
			if(elGenreList.style.display !== 'block') {
				elGenreList.style.display = 'block';
				return;
			}
			elGenreList.style.display = 'none';
		}
	}, false);
	elBody.addEventListener('click', function(e) {
		if(e.target.id !== 'genre_list' && e.target.offsetParent.id !== 'genre_list' && e.target.offsetParent.id !== 'genre') {
			elGenreList.style.display = 'none';
		}
		if(e.target.parentNode.id !== 'drawerIcon' && e.target.id !== 'icons_submenu_ul' && e.target.parentNode.id !== 'icons_submenu_ul' && e.target.parentNode.parentNode.id !== 'icons_submenu_ul' && e.target.parentNode.parentNode.parentNode.id !== 'icons_submenu_ul') {
			document.getElementById('icons_submenu_div').style.display = 'none';
		}
	}, false);
	function fDrawerIconEventHandler() {
		var elDrawerIcon = document.getElementById('icons_submenu_div');
		if(elDrawerIcon.style.display === 'block') {
			elDrawerIcon.style.display = 'none';
			return;
		}
		elDrawerIcon.style.display = 'block';
	}
	function fBookListTouchStartEventHandler(e) {
		console.log("touchStart");
		fTimeout = setTimeout(fBookListTouchCancel, 1000);
		var tlTouches = e.changedTouches;	
		for (var i = 0; i < tlTouches.length; i++) {
			aOngoingTouches.push(copyTouch(tlTouches[i]));
		}
	}

	function fBookListTouchMoveEventHandler(e) {
		console.log("touchMove");
		var tlTouches = e.changedTouches;	
		for (var i = 0; i < tlTouches.length; i++) {
			var idx = fSearchIndexOfOngoingTouchById(tlTouches[i].identifier);
			if (idx >= 0) {
				if (aOngoingTouches[idx].pageY - tlTouches[i].pageY> SCROLL_IDENTIFIER) {
					fBookListTouchCancel();
					return;
				}
				if (tlTouches[i].pageY - aOngoingTouches[idx].pageY> SCROLL_IDENTIFIER) {
					fBookListTouchCancel();
					return;
				}
			}
		}
	}

	function fBookListTouchEndEventHandler(e) {
		clearTimeout(fTimeout);
		var tlTouches = e.changedTouches;
		for (var i = 0; i < tlTouches.length; i++) {
			var idx = fSearchIndexOfOngoingTouchById(tlTouches[i].identifier);
			if (idx >= 0) {
				if (aOngoingTouches[idx].pageX - tlTouches[i].pageX > SWIPE_LIMIT) {
					fDEnvisibleBooks(e);
				}
				if (tlTouches[i].pageX - aOngoingTouches[idx].pageX> SWIPE_LIMIT) {
					fEnvisibleBooks(e);
				}
				aOngoingTouches.splice(idx, 1);
			}
		}
	}

	function fBookListTouchCancelEventHandler(e) {
		var tlTouches = e.changedTouches;
		for (var i = 0; i < tlTouches.length; i++) {
			aOngoingTouches.splice(i, 1);
		}
	}

	function fBookListTouchCancel() {
		for (var i = 0; i < aOngoingTouches.length; i++) {
			aOngoingTouches.splice(i, 1);
		}
	}

	function fSearchIndexOfOngoingTouchById(id) {
		for (var i = 0; i < aOngoingTouches.length; i++) {
			var idOfTouch = aOngoingTouches[i].identifier;
			if (idOfTouch === id) {
				return i;
			}
		}
		return -1;
	}

	function fDEnvisibleBooks(e) {
		var iCounter = 2;
		for (var i = 0; i < e.currentTarget.children.length; i++) {
			if (iCounter === 0) {
				return;
			}
			if (e.currentTarget.children[i].style.display !== 'none') {
				e.currentTarget.children[i].style.display = 'none';
				iCounter--;
			}
		}
	}

	function fEnvisibleBooks(e) {
		var iCounter = 2;
		for (var i = e.currentTarget.children.length - 1; i >= 0; i--) {
			if (iCounter === 0) {
				return;
			}
			if (e.currentTarget.children[i].style.display === 'none') {
				e.currentTarget.children[i].style.display = 'list-item';
				iCounter--;
			}
		}
	}

	function copyTouch(touch) {
		return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
	}
}

function fIconsSubmenuEventHandler(e) {
	if(e.target.parentNode.parentNode.id === 'apps_icon01' || e.target.parentNode.id === 'apps_icon01') {
		var elIconLi = document.getElementById('apps_icon01');
		fSelectIconsSubmenuEvent(elIconLi, e);
		return;
	}
	if(e.target.parentNode.parentNode.id === 'apps_icon02' || e.target.parentNode.id === 'apps_icon02') {
		var elIconLi = document.getElementById('apps_icon02');
		fSelectIconsSubmenuEvent(elIconLi, e);
		return;
	}
	if(e.target.parentNode.parentNode.id === 'apps_icon03' || e.target.parentNode.id === 'apps_icon03') {
		var elIconLi = document.getElementById('apps_icon03');
		fSelectIconsSubmenuEvent(elIconLi, e);
		return;
	}
	if(e.target.parentNode.parentNode.id === 'apps_icon04' || e.target.parentNode.id === 'apps_icon04') {
		var elIconLi = document.getElementById('apps_icon04');
		fSelectIconsSubmenuEvent(elIconLi, e);
		return;
	}
	if(e.target.parentNode.parentNode.id === 'apps_icon05' || e.target.parentNode.id === 'apps_icon05') {
		var elIconLi = document.getElementById('apps_icon05');
		fSelectIconsSubmenuEvent(elIconLi, e);
		return;
	}
	if(e.target.parentNode.parentNode.id === 'apps_icon06' || e.target.parentNode.id === 'apps_icon06') {
		var elIconLi = document.getElementById('apps_icon06');
		fSelectIconsSubmenuEvent(elIconLi, e);
		return;
	}
	if(e.target.parentNode.parentNode.id === 'apps_icon07' || e.target.parentNode.id === 'apps_icon07') {
		var elIconLi = document.getElementById('apps_icon07');
		fSelectIconsSubmenuEvent(elIconLi, e);
		return;
	}
	if(e.target.parentNode.parentNode.id === 'apps_icon08' || e.target.parentNode.id === 'apps_icon08') {
		var elIconLi = document.getElementById('apps_icon08');
		fSelectIconsSubmenuEvent(elIconLi, e);
		return;
	}
}
function fSelectIconsSubmenuEvent(el, e1) {
	var elSubmenuUl = document.getElementById('icons_submenu_ul');
	var rectOfEl = fGetCoordinates(el);
	var rectOfDiv = fGetCoordinates(document.querySelector('.icons .submenu'));
	var rectOfIcon01 = fGetCoordinates(elSubmenuUl.children[0]);
	var rectOfIcon02 = fGetCoordinates(elSubmenuUl.children[1]);
	var rectOfIcon03 = fGetCoordinates(elSubmenuUl.children[2]);
	var rectOfIcon04 = fGetCoordinates(elSubmenuUl.children[3]);
	var rectOfIcon05 = fGetCoordinates(elSubmenuUl.children[4]);
	var rectOfIcon06 = fGetCoordinates(elSubmenuUl.children[5]);
	var rectOfIcon07 = fGetCoordinates(elSubmenuUl.children[6]);
	var rectOfIcon08 = fGetCoordinates(elSubmenuUl.children[7]);
	var elCopiedIcon = el.cloneNode(true);
	var fMouseMoveEventListener = function(e2) {
		elCopiedIcon.style.left = e2.pageX - e1.pageX + rectOfEl.left - rectOfIcon01.left + 28 + 'px';
		elCopiedIcon.style.top = e2.pageY - e1.pageY  + rectOfEl.top - rectOfIcon01.top + 28 + 'px';

		fReoderIcons(e2, el, rectOfIcon01, elSubmenuUl, 1);
		fReoderIcons(e2, el, rectOfIcon02, elSubmenuUl, 2);
		fReoderIcons(e2, el, rectOfIcon03, elSubmenuUl, 3);
		fReoderIcons(e2, el, rectOfIcon04, elSubmenuUl, 4);
		fReoderIcons(e2, el, rectOfIcon05, elSubmenuUl, 5);
		fReoderIcons(e2, el, rectOfIcon06, elSubmenuUl, 6);
		fReoderIcons(e2, el, rectOfIcon07, elSubmenuUl, 7);
		fReoderIcons(e2, el, rectOfIcon08, elSubmenuUl, 8);

		if(rectOfDiv.left > e2.pageX || rectOfDiv.right < e2.pageX || rectOfDiv.top > e2.pageY || rectOfDiv.bottom < e2.pageY) {
			elSubmenuUl.insertBefore(el, elSubmenuUl.children[8]);
		}
	}

	elCopiedIcon.className = 'dummy';
	elSubmenuUl.appendChild(elCopiedIcon);
	el.style.visibility = 'hidden';
	elCopiedIcon.style.position = 'absolute';
	elCopiedIcon.style.left = rectOfEl.left - rectOfIcon01.left + 28 + 'px';
	elCopiedIcon.style.top = rectOfEl.top - rectOfIcon01.top + 28 + 'px';
	document.addEventListener('mousemove', fMouseMoveEventListener, false);
	document.addEventListener('mouseup', function fMouseUpEventListener(e3) {
		document.removeEventListener('mousemove', fMouseMoveEventListener, false);
		elSubmenuUl.removeChild(document.querySelector('.dummy'));
		el.style.visibility = 'visible';
		if(e1.pageX === e3.pageX && e1.pageY === e3.pageY) {
			window.location = el.children[0].href;
		}
		document.removeEventListener('mouseup', fMouseUpEventListener, false);
	}, false);
}
function fReoderIcons(event, element, rectOfIcon, ulElement, order) {
	var rectOfEl = fGetCoordinates(element);
	if(rectOfIcon.left <= event.pageX && rectOfIcon.right >= event.pageX && rectOfIcon.top <= event.pageY && rectOfIcon.bottom >= event.pageY) {
		if(rectOfEl.top < rectOfIcon.top || (rectOfEl.top === rectOfIcon.top && rectOfEl.left < rectOfIcon.left)) {
			ulElement.insertBefore(element, ulElement.children[order]);
			return;
		}
		ulElement.insertBefore(element, ulElement.children[order - 1]);
		return;
	}
}
function fGetCoordinates(el) {
	return el.getBoundingClientRect();
}
function fContentsEventHandler(e) {
	if (e.target.className === 'more') {
		var nTarget = e.target.parentNode.parentNode.children[2];
		fAddBooks(nTarget);
	}
	return false;
}

function fAddBooks(nTarget, dFlag) {
	var url = "http://192.168.0.13:8000/response.json";
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.send(null);
	var timeoutID = window.setTimeout(fAbortReq, 50);

	request.onreadystatechange = function() {
		if (request.status !== 200 && request.status !== 304) {
			alert("Request Error. Status is: " + request.status);
		}
		if (request.readyState === 4 && request.status === 200) {
			result = request.responseText;
			result = JSON.parse(result);
			if (dFlag !== 1) {
				nTarget.insertAdjacentHTML('beforeend', fAppendBooks(result));
				nTarget.style.overflow = "visible";
			}
			if (dFlag === 1) {
				for (var i = 0; i < nTarget.length; i++) {
					nTarget[i].innerHTML = fAppendBooks(result);
				}
			}
		}
	}

	function fAbortReq() {
		request.abort();
	}
}

function fAppendBooks(aData) {
	var sTemplate = "<li class='content_li'><div class='cover'><div class='hover'></div><img src=<%=imgSrc%> alt='' /></div><section><header class='book_title'><h2 class='title'><%=bookTitle%></h2><span class='writer'><%=author%></span></header><div class='price_wrapper'><a class='price'><%=price%></a></div></section></li>";
	var aDummyData = aData;
	function fReplaceContentUl(sTemplate, aDummyData) {
		var sResult = '';
		function fReplaceTemplate(sTemplate, aEachDummy) {
			var i = 0;
			function replacer(match) {
				return aEachDummy[i++];
			}
			return sTemplate.replace(/<%=[a-z]+%>/gi, replacer);
		}
		for (var j = 0; j < aDummyData.length; j++) {
			sResult += fReplaceTemplate(sTemplate, aDummyData[j]);
		}
		return sResult;
	}
	return fReplaceContentUl(sTemplate, aDummyData);
}

function fSubmenuEventHandler(e) {
	if (e.target.nodeName === "LI") {
		var elLoadingDiv = document.getElementById('loading');
		elLoadingDiv.style.display = 'block';
		window.setTimeout(function() {
			document.getElementById('loading').style.display = 'none';
		}, 100);
		var nlContentUls = document.getElementsByClassName('content_ul');
		fAddBooks(nlContentUls, 1);
		return;
	}
}
