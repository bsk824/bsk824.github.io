<template>
	<div id="wrap">
		<h1>{{result}}</h1>
		<button @click="getData('20201201', '20201202')">click</button>
	</div>
</template>

<script>
// export default {
// 	data() {
// 		return {
// 			result: 'air',
// 		}
// 	},
// 	methods: {
// 		onChg() {
// 			this.result = 'aa';
// 		},
// 		getData(start, end){
// 			var data;
// 			var httpRequest;
// 			httpRequest = new XMLHttpRequest();
// 			httpRequest.open('GET', 'http://localhost:8080/data/?start='+start+'&end='+end, true);
// 			httpRequest.send();

// 			httpRequest.onload = function() {
// 				data = JSON.parse(this.responseText);
// 				console.log(data);
// 			}
// 		}
// 	}
// }
</script>