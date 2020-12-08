import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../index.vue';
import air from '../components/air.vue';
import covid from '../components/covid.vue';

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/air', component: air},
		{ path: '/covid', component: covid},
	]
})