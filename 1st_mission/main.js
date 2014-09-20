document.addEventListener('DOMContentLoaded', function() {googlePlay.basicFunctions.fInit();}, false);
window.addEventListener('load', function() {
	googlePlay.globalVariables.elLoadingDiv.style.display = 'none';
}, false);

var googlePlay = {
	globalVariables: {
		elIconsSubmenu: null,
		elGenreList: null,
		elGenreMenu: null,
		elBody: null,
		nlGenreSubmenu: null,
		elContents: null,
		elDrawerIcon: null,
		elLoadingDiv: null,
	},
	basicFunctions: {
		fInit: function() {
			this.fGetElements(googlePlay.globalVariables);
			this.fAddEventHandlers(googlePlay.globalVariables, this.fEventHandlers);
			this.fAddTouchEventHandlers(googlePlay.globalVariables, this.fTouchEventHandlers);
		},
		fGetElements: function(globalVariables) {
			globalVariables.elIconsSubmenu = document.querySelector('.icons .submenu');
			globalVariables.elGenreList = document.getElementById('genre_list');
			globalVariables.elGenreMenu = document.getElementById('genre');
			globalVariables.elBody = document.body;
			globalVariables.nlGenreSubmenu = document.querySelectorAll('#genre_list .submenu');
			globalVariables.elContents = document.querySelector('.contents');
			globalVariables.nlBookLists = document.querySelectorAll('.content_ul');
			globalVariables.elDrawerIcon = document.getElementById('drawerIcon');
			globalVariables.elLoadingDiv = document.getElementById('loading');
		},
		fAddEventHandlers: function(globalVariables, fEventHandlers) {
			globalVariables.elIconsSubmenu.addEventListener('mousedown', function(e) {fEventHandlers.fIconsSubmenuEventHandler(e);}, false);
			globalVariables.nlGenreSubmenu[0].addEventListener('click', function(e) {fEventHandlers.fSubmenuEventHandler(e);}, false);
			globalVariables.elContents.addEventListener('click', function(e) {fEventHandlers.fContentsEventHandler(e);}, false);
			globalVariables.elDrawerIcon.addEventListener('click', function(e) {fEventHandlers.fDrawerIconEventHandler()}, false);
			globalVariables.elGenreMenu.addEventListener('click', function(e) {
				if(e.target.parentNode.id === 'genre' || e.target.parentNode.parentNode.id === 'genre') {
					if(globalVariables.elGenreList.style.display !== 'block') {
						globalVariables.elGenreList.style.display = 'block';
						return;
					}
					globalVariables.elGenreList.style.display = 'none';
				}
			}, false);
			globalVariables.elBody.addEventListener('click', function(e) {
				if(e.target.id !== 'genre_list' && e.target.parentNode.id !== 'genre_list' && e.target.parentNode.id !== 'genre' && e.target.parentNode.parentNode.id !== 'genre') {
					globalVariables.elGenreList.style.display = 'none';
				}
				if(e.target.parentNode.id !== 'drawerIcon' && e.target.id !== 'icons_submenu_ul' && e.target.parentNode.id !== 'icons_submenu_ul' && e.target.parentNode.parentNode.id !== 'icons_submenu_ul' && e.target.parentNode.parentNode.parentNode.id !== 'icons_submenu_ul') {
					document.getElementById('icons_submenu_div').style.display = 'none';
				}
			}, false);
		},
		fAddTouchEventHandlers: function(globalVariables, fTouchEventHandlers) {
			for(var i = 0; i < globalVariables.nlBookLists.length; i++) {
				globalVariables.nlBookLists[i].addEventListener('touchstart', function(e) {fTouchEventHandlers.fBookListTouchStartEventHandler(e, googlePlay.mobile)}, false);
				globalVariables.nlBookLists[i].addEventListener('touchmove', function(e) {fTouchEventHandlers.fBookListTouchMoveEventHandler(e, googlePlay.mobile)}, false);
				globalVariables.nlBookLists[i].addEventListener('touchend', function(e) {fTouchEventHandlers.fBookListTouchEndEventHandler(e, googlePlay.mobile)}, false);
				globalVariables.nlBookLists[i].addEventListener('touchcancel', function(e) {fTouchEventHandlers.fBookListTouchCancelEventHandler()}, false);
			}
		},
		fEventHandlers: {
			fIconsSubmenuEventHandler: function(e) {
				var fSelectIconsSubmenuEvent = googlePlay.drawer.functions.fSelectIconsSubmenuEvent;
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
			},
			fSubmenuEventHandler: function(e) {
				if (e.target.nodeName === "LI") {
					var elLoadingDiv = googlePlay.globalVariables.elLoadingDiv;
					elLoadingDiv.style.display = 'block';
					window.setTimeout(function() {
						elLoadingDiv.style.display = 'none';
					}, 100);
					var nlContentUls = document.getElementsByClassName('content_ul');
					googlePlay.aJax.fAddBooks(nlContentUls, 1);
					return;
				}
			},
			fContentsEventHandler: function(e) {
				if (e.target.className === 'more') {
					var nTarget = e.target.parentNode.parentNode.children[2];
					googlePlay.aJax.fAddBooks(nTarget);
				}
				return false;
			},
			fDrawerIconEventHandler: function() {
				var elDrawerIcon = document.getElementById('icons_submenu_div');
				if(elDrawerIcon.style.display === 'block') {
					elDrawerIcon.style.display = 'none';
					return;
				}
				elDrawerIcon.style.display = 'block';
			},
		},
		fTouchEventHandlers: {
			fBookListTouchStartEventHandler: function(e, mobile) {
				mobile.variables.fTimeout = setTimeout(mobile.functions.fBookListTouchCancel, 1000);
				var tlTouches = e.changedTouches;	
				for (var i = 0; i < tlTouches.length; i++) {
					mobile.variables.aOngoingTouches.push(mobile.functions.copyTouch(tlTouches[i]));
				}
			},
			fBookListTouchMoveEventHandler: function(e, mobile) {
				var tlTouches = e.changedTouches;	
				var aOngoingTouches = mobile.variables.aOngoingTouches;
				for (var i = 0; i < tlTouches.length; i++) {
					var idx = mobile.functions.fSearchIndexOfOngoingTouchById(tlTouches[i].identifier);
					if (idx >= 0) {
						if (aOngoingTouches[idx].pageY - tlTouches[i].pageY> mobile.variables.SCROLL_IDENTIFIER) {
							mobile.functions.fBookListTouchCancel();
							return;
						}
						if (tlTouches[i].pageY - aOngoingTouches[idx].pageY> mobile.variables.SCROLL_IDENTIFIER) {
							mobile.functions.fBookListTouchCancel();
							return;
						}
					}
				}
			},
			fBookListTouchEndEventHandler: function(e, mobile) {
				clearTimeout(mobile.variables.fTimeout);
				var tlTouches = e.changedTouches;
				var aOngoingTouches = mobile.variables.aOngoingTouches;
				for (var i = 0; i < tlTouches.length; i++) {
					var idx = mobile.functions.fSearchIndexOfOngoingTouchById(tlTouches[i].identifier);
					if (idx >= 0) {
						if (aOngoingTouches[idx].pageX - tlTouches[i].pageX > mobile.variables.SWIPE_LIMIT) {
							mobile.functions.fDEnvisibleBooks(e);
						}
						if (tlTouches[i].pageX - aOngoingTouches[idx].pageX> mobile.variables.SWIPE_LIMIT) {
							mobile.functions.fEnvisibleBooks(e);
						}
						aOngoingTouches.splice(idx, 1);
					}
				}
			},
			fBookListTouchCancelEventHandler: function() {
				mobile.functions.fBookListTouchCancel();
			}
		},
	},
	drawer: {
		functions: {
			fSelectIconsSubmenuEvent: function(el, e1) {
				var elSubmenuUl = document.getElementById('icons_submenu_ul');
				var functions = googlePlay.drawer.functions;
				var rectOfEl = functions.fGetCoordinates(el);
				var rectOfDiv = functions.fGetCoordinates(document.querySelector('.icons .submenu'));
				var rectOfIcon01 = functions.fGetCoordinates(elSubmenuUl.children[0]);
				var rectOfIcon02 = functions.fGetCoordinates(elSubmenuUl.children[1]);
				var rectOfIcon03 = functions.fGetCoordinates(elSubmenuUl.children[2]);
				var rectOfIcon04 = functions.fGetCoordinates(elSubmenuUl.children[3]);
				var rectOfIcon05 = functions.fGetCoordinates(elSubmenuUl.children[4]);
				var rectOfIcon06 = functions.fGetCoordinates(elSubmenuUl.children[5]);
				var rectOfIcon07 = functions.fGetCoordinates(elSubmenuUl.children[6]);
				var rectOfIcon08 = functions.fGetCoordinates(elSubmenuUl.children[7]);
				var elCopiedIcon = el.cloneNode(true);
				var fMouseMoveEventListener = function(e2) {
					elCopiedIcon.style.left = e2.pageX - e1.pageX + rectOfEl.left - rectOfIcon01.left + 28 + 'px';
					elCopiedIcon.style.top = e2.pageY - e1.pageY  + rectOfEl.top - rectOfIcon01.top + 28 + 'px';

					functions.fReorderIcons(e2, el, rectOfIcon01, elSubmenuUl, 1);
					functions.fReorderIcons(e2, el, rectOfIcon02, elSubmenuUl, 2);
					functions.fReorderIcons(e2, el, rectOfIcon03, elSubmenuUl, 3);
					functions.fReorderIcons(e2, el, rectOfIcon04, elSubmenuUl, 4);
					functions.fReorderIcons(e2, el, rectOfIcon05, elSubmenuUl, 5);
					functions.fReorderIcons(e2, el, rectOfIcon06, elSubmenuUl, 6);
					functions.fReorderIcons(e2, el, rectOfIcon07, elSubmenuUl, 7);
					functions.fReorderIcons(e2, el, rectOfIcon08, elSubmenuUl, 8);

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
			},
			fReorderIcons: function(event, element, rectOfIcon, ulElement, order) {
				var rectOfEl = googlePlay.drawer.functions.fGetCoordinates(element);
				if(rectOfIcon.left <= event.pageX && rectOfIcon.right >= event.pageX && rectOfIcon.top <= event.pageY && rectOfIcon.bottom >= event.pageY) {
					if(rectOfEl.top < rectOfIcon.top || (rectOfEl.top === rectOfIcon.top && rectOfEl.left < rectOfIcon.left)) {
						ulElement.insertBefore(element, ulElement.children[order]);
						return;
					}
					ulElement.insertBefore(element, ulElement.children[order - 1]);
					return;
				}
			},
			fGetCoordinates: function(el) {
				return el.getBoundingClientRect();
			},
		},
	},
	aJax: {
		fAddBooks: function(nTarget, dFlag) {
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
						nTarget.insertAdjacentHTML('beforeend', googlePlay.aJax.fAppendBooks(result));
						nTarget.style.overflow = "visible";
					}
					if (dFlag === 1) {
						for (var i = 0; i < nTarget.length; i++) {
							nTarget[i].innerHTML = googlePlay.aJax.fAppendBooks(result);
						}
					}
				}
			}

			function fAbortReq() {
				request.abort();
			}
		},
		fAppendBooks: function(aData) {
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
	},
	mobile: {
		variables: {
			fTimeout: null,
			aOngoingTouches: new Array(),
			SWIPE_LIMIT: 50,
			SCROLL_IDENTIFIER: 30
		},
		functions: {
			fBookListTouchCancel: function() {
				var aOngoingTouches = googlePlay.mobile.variables.aOngoingTouches;
				for (var i = 0; i < aOngoingTouches.length; i++) {
					aOngoingTouches.splice(i, 1);
				}
			},
			fSearchIndexOfOngoingTouchById: function(id) {
				var aOngoingTouches = googlePlay.mobile.variables.aOngoingTouches;
				for (var i = 0; i < aOngoingTouches.length; i++) {
					var idOfTouch = aOngoingTouches[i].identifier;
					if (idOfTouch === id) {
						return i;
					}
				}
				return -1;
			},
			fDEnvisibleBooks: function(e) {
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
			},
			fEnvisibleBooks: function(e) {
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
			},
			copyTouch: function(touch) {
				return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
			},
		},
	},
}
