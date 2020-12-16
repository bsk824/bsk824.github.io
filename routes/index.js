import Vue from 'vue';
import VueRouter from 'vue-router';
import main from '../components/main.vue';
import html from '../components/html/html.vue';
import html1 from '../components/html/html1.vue';
import html2 from '../components/html/html2.vue';
import css from '../components/css/css.vue';
import css1 from '../components/css/css1.vue';
import css2 from '../components/css/css2.vue';
import js from '../components/js/js.vue';
import js1 from '../components/js/js1.vue';
import air from '../components/js/air.vue';
import covid from '../components/js/covid.vue';

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/', component: main },
		{ path: '/html', component: html,
			children : [
				{ path: '/html', components: {sub : html1} },
				{ path: '/html/html2', components: {sub : html2} },
			]
		},
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
	]
})