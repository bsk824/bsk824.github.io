function getCookie(name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");

		if (x==name) return unescape(y);
	}
}
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var find = {
	obj : null,
	parent : function(el, str) {
		var tag = el.parentNode.tagName.toLowerCase();
		var cls = el.parentNode.classList;
		var id = el.parentNode.getAttribute('id');
		find.obj = el.parentNode;
		if(str !== tag && !cls.contains(str) && str != id) {
			if(tag != 'body') {
				find.parent(find.obj, str);
			} else {
				find.obj = null;
			}
		}
		return find.obj;
	},
	child : function(el, str) {
		var arr = [];
		el.childNodes.forEach(function(obj){
			if(obj.nodeType == 1) {
				var tag = obj.tagName.toLowerCase();
				var cls = obj.classList;
				var id = obj.getAttribute('id');
				if(str === tag || cls.contains(str) || str === id) {
					find.obj = obj;
					arr.push(obj);
				} else {
					find.obj = null;
				}
			}
		});
		if(arr.length > 1) {
			return arr;
		} else {
			return find.obj;
		}
	},
	prevNode : function(str) {
		if(str.previousSibling != null) {
			if(str.previousSibling.nodeType == 1) {
				find.obj = str.previousSibling;
			} else {
				find.prevNode(str.previousSibling);
			}
			return find.obj;
		}
	},
	nextNode : function(str) {
		if(str.nextSibling != null) {
			if(str.nextSibling.nodeType == 1) {
				find.obj = str.nextSibling;
			} else {
				find.nextNode(str.nextSibling);
			}
			return find.obj;
		}
	}
}

// select
var select = {
	obj : {},
	wrap : null,
	btn : null,
	listBox : null,
	list : null,
	option : null,
	init : function(name) {
		if(name) {
			select.obj[name] = {}
			select.obj[name]['option'] = document.querySelectorAll('input[name="'+name+'"]');
			select.obj[name]['wrap'] = find.parent(select.obj[name].option[0], 'select');
			select.obj[name]['btn'] = select.obj[name].wrap.querySelector('.sel-btn');
		} else {
			select.btn = event.currentTarget || event.srcElement;
			select.wrap = find.parent(select.btn, 'select');
			select.listBox = select.wrap.querySelector('.sel-list');
			select.list = select.listBox.querySelectorAll('li');
			select.option = select.listBox.querySelectorAll('input[type="radio"]');
		}
	},
	trigger : function(type) {
		(event.stopPropagation) ? event.stopPropagation() : event.cancelBubble = true;
		
		select.init();
		var sel = document.querySelectorAll('.select'); 
		[].forEach.call(sel, function(obj){
			var btn = obj.querySelector('.sel-btn');
			if(btn != select.btn) obj.classList.remove('open');
		});
		select.wrap.classList.toggle('open');
		if(type != 'check') {
			[].forEach.call(select.list, function(obj){
				obj.addEventListener('click', function(){
					if(obj.querySelector('input[type="radio"]').disabled == false) {
						select.wrap.classList.remove('open');
						setTimeout(function(){select.btn.focus();},100);
					}
				});
			});
			[].forEach.call(select.option, function(obj){
				if(obj.checked == true) obj.focus();
				obj.addEventListener('click', function(){
					(event.stopPropagation) ? event.stopPropagation() : event.cancelBubble = true;
					var _this = this;
					var txt = _this.nextSibling.nextSibling.innerText;
					(_this.value != "") ? select.btn.classList.add('on') : select.btn.classList.remove('on');
					if(type == 'option') {
						var valStr = select.btn.querySelector('.val');
						valStr.style.display = 'inline-block';
						valStr.innerText = txt;
					} else {
						select.btn.innerText = txt;
					}
				});
				obj.addEventListener('keydown', function(){
					if(event.keyCode == 13) {
						var _this = this;
						var txt = _this.nextSibling.nextSibling.innerText;
						(_this.value != "") ? select.btn.classList.add('on') : select.btn.classList.remove('on');
						if(type == 'option') {
							var valStr = select.btn.querySelector('.val');
							valStr.style.display = 'inline-block';
							valStr.innerText = txt;
						} else {
							select.btn.innerText = txt;
						}
						select.wrap.classList.remove('open');
						setTimeout(function(){select.btn.focus();},100);
					}
				});
			});
		}
		select.wrap.addEventListener('click', function() {
			(event.stopPropagation) ? event.stopPropagation() : event.cancelBubble = true;
		});
		window.addEventListener('click', function() {
			select.wrap.classList.remove('open');
		});
	},
	active : function(name, idx, type) {
		select.init(name);

		if(select.obj[name].option[idx].disabled == false) {
			select.obj[name].option[idx].checked = true;
			var val = nextFind(select.obj[name].option[idx]);
			if(type == 'option') {
				var valStr = select.obj[name].btn.querySelector('.val');
				valStr.style.display = 'inline-block';
				valStr.innerText = val.innerText;
			} else {
				select.obj[name].btn.innerText = val.innerText;
				(select.obj[name].option[idx].value != "") ? select.obj[name].btn.classList.add('on') : select.obj[name].btn.classList.remove('on');
			}
		}
	},
	value : function(name) {
		select.option = document.querySelectorAll('input[name="'+name+'"]');
		var val = '';
		[].forEach.call(select.option, function(obj){
			if(obj.checked) val = obj.value;
		});
		return val;
	}
}