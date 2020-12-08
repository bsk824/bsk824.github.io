import Vue from 'vue';

import index from './index.vue';
import axios from 'axios';
import router from './routes/index.js';

Vue.prototype.$axios = axios;

new Vue({
	render: h => h(index),
	router
}).$mount('#root');