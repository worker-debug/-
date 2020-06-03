import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../components/home/Home.vue'
import SearchList from '../components/searchList/SearchList.vue'
import Lyric from '../components/lyric/Lyric.vue'
import Recommend from '../components/recommend/Recommend.vue'
import MvPlay from '../components/mvPlay/MvPlay.vue'
import Toplist from '../components/toplist/Toplist.vue'
import Songmenu from '../components/songMenu/songmenu.vue'
import menuSongList from '../components/menuSongLIst/menuSongList.vue'
import Singer from '../components/singer/Singer.vue'
import SingerSongs from '../components/singerSongs/Singeraongs.vue'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/recommend' },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/searchList',
          component: SearchList
        },
        {
          path: '/lyric',
          component: Lyric
        },
        {
          path: '/recommend',
          component: Recommend
        },
        {
          path: '/mvPlay',
          component: MvPlay
        },
        {
          path: '/toplist',
          component: Toplist
        },
        {
          path: '/songmenu',
          component: Songmenu
        },
        {
          path: '/menusonglist',
          component: menuSongList
        },
        {
          path: '/singer',
          component: Singer
        },
        {
          path: '/singersongs',
          component: SingerSongs
        }
      ]
    }
  ]
})
