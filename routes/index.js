import Vue from 'vue';
import VueRouter from 'vue-router';
import main from '../components/main.vue';
import css from '../components/css/css.vue';
import cssSub from '../components/css/sub.vue';
import flexList from '../components/css/flexList.vue';
import js from '../components/js/js.vue';
import js1 from '../components/js/js1.vue';
import vue from '../components/vue/vue.vue';
import covid from '../components/vue/covid.vue';

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/', component: main },
		{ path: '/css', component: css,
			children : [
				{ path: '/css', components: {sub : cssSub} },
				{ path: '/css/flexList', components: {sub : flexList} },
			]
		},
		{ path: '/js', component: js,
			children : [
				{ path: '/js', components: {sub : js1} },
			]
		},
		{ path: '/vue', component: vue,
			children : [
				{ path: '/vue/covid', components: {sub : covid} },
			]
		},
	]
})