import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import SingerDetail from 'components/singerDetail/singerDetail'
import disc from 'components/disc/disc'
import topList from 'components/top-list/top-list'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/recommend'
  }, {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: disc
      }
    ]
  }, {
    path: '/singer',
    component: Singer,
    children: [{
      path: ':id',
      component: SingerDetail
    }]
  }, {
    path: '/rank',
    component: Rank,
    children: [{
      path: ':id',
      component: topList
    }]
  }, {
    path: '/search',
    component: Search
  }]
})