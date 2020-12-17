import Vue from 'vue';
import VueRouter from 'vue-router';
import main from '../components/main.vue';
import css from '../components/css/css.vue';
import css1 from '../components/css/css1.vue';
import css2 from '../components/css/css2.vue';
import js from '../components/js/js.vue';
import js1 from '../components/js/js1.vue';
import vue from '../components/vue/vue.vue';
import vue1 from '../components/vue/vue1.vue';
import vue2 from '../components/vue/vue2.vue';
import air from '../components/js/air.vue';
import covid from '../components/js/covid.vue';

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/', component: main },
		{ path: '/css', component: css,
			children : [
				{ path: '/css', components: {sub : css1} },
				{ path: '/css/css2', components: {sub : css2} },
			]
		},
		{ path: '/js', component: js,
			children : [
				{ path: '/js', components: {sub : js1} },
				{ path: '/js/covid', components: {sub : covid} },
			]
		},
		{ path: '/vue', component: vue,
			children : [
				{ path: '/vue', components: {sub : vue1} },
				{ path: '/vue/vue2', components: {sub : vue2} },
			]
		},
	]
})