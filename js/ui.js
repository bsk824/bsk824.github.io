$(function() {
	if (getCookie('hello') != 'end') {
		var hello = $('.hello');
		hello.show();
		setTimeout(function(){
			hello.addClass('startHello');
		},1);
		setTimeout(function(){
			hello.fadeOut();
			setCookie('hello','end',1);
		},8000);
	}
});
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
