<template>
	<div>
		<div>
			<router-link to="/test">indeaefx</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
var xhr = new XMLHttpRequest();
var url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson'; /*URL*/
var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+'iaCYy%2BD%2FozKimBkI9tVvsO1QNfNnpBHAPCV1ZP%2BvrW6d%2FGxJyDIVseDgSaYxHfRRXQ2BVOl8H3uEdok7yTZVXA%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20200310'); /**/
queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20200315'); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
    }
};

xhr.send('');
import router from './routes';

export default {
	router,
}
</script>