import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import localMusic from '@/components/localMusic'
import live from '@/components/Live'
import my from '@/components/my'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'home',
		component: Home,
		children: [{
			path: '',
			component: localMusic
		}, {
			path: '/localMusic',
			component: localMusic
		}, {
			path: '/live',
			component: live
		}, {
			path: '/my',
			component: my
		}]
	}]
})