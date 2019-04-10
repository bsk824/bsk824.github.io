function menu(d1,d2) {
	var header = $('#header')
		,d1List = header.find('#gnb > ul > li > a')
		,d2Wrap = header.find('.dep2')
		,d2List = d2Wrap.find('> div > .list > li > a') 
		,d3Wrap = header.find('.dep3')
		,d1Current = d1 - 1
		,d2Current = d2 - 1
		,gnbStatus;

	d1List.parent().eq(d1Current).addClass('current');
	d1List.parent().eq(d1Current).find('li').eq(d2Current).addClass('current');
	d1List.on('mouseenter', function(){
		var _this = $(this);

		d1List.parent().removeClass('on');
		_this.parent().addClass('on');

		if (gnbStatus != 1) {
			_this.next().stop().slideDown(200);
			gnbStatus = 1;
		} else {
			d2Wrap.hide();
			_this.next().show();
		}
	});
	d2List.on('mouseenter', function(){
		var _this = $(this);

		if (_this.next().hasClass('dep3')) {
			d2List.parent().removeClass('on');
			_this.parent().addClass('on');
		}
	});
	header.on('mouseleave', function(){
		d2Wrap.slideUp(200);
		d1List.parent().removeClass('on');
		gnbStatus = 0;
	});

}
function tabMenu(list,idx) {
	var tabBtn = list.find('a')
		,tabClass = 'tabItem'+tabBtn.length+''
		,tabCon;
	
	list.addClass(tabClass);
	tabBtn.parent().eq(idx).addClass('current');
	if (list.next().find('.tabCon').length) {
		tabCon = list.next().find('.tabCon');
		tabCon.eq(idx).addClass('on');
	}	
	tabBtn.click(function(){
		var _this = $(this)
			idx = _this.parent().index();
		tabBtn.parent().removeClass('current');
		_this.parent().addClass('current');
		if (list.next().find('.tabCon').length) {
			tabCon.removeClass('on');
			tabCon.eq(idx).addClass('on');
		}
		return false;
	});
}
function setCookie(name, value, expiredays) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}
function getCookie(name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");

		if (x==name) return unescape(y);
	}
}