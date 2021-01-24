import Vue from 'vue';
import axios from 'axios';
import index from './index.vue';
import router from './routes/index.js';

Vue.prototype.$axios = axios;

new Vue({
	render: function(h) {
		return h(index)
	},
	router,
}).$mount('#root');