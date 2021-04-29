import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[

      { path: '',
      component: () => import('../views/secondguide/Defaulthome.vue')
      },
      { path: 'toplist',
      component: () => import(/* webpackChunkName: "about" */ '../views/songlist/Songlist.vue')
      },
      {
        path: 'playlist',
        name: 'Playlist',
        component: () => import(/* webpackChunkName: "about" */ '../views/songlist/Playlist.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'Defaulthome',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/secondguide/Defaulthome.vue'),
    meta:{
      title:'关于'
    }
  },
  {
    path: '/list',
    name: 'Songlist',
    component: () => import(/* webpackChunkName: "about" */ '../views/songlist/Songlist.vue'),
    meta:{
      title:'排行榜'
    }
  },
  {
    path: '/play',
    name: 'SongPlay',
    component: () => import(/* webpackChunkName: "about" */ '../views/Songplay.vue'),
    meta:{
      title:'播放'
    }
  },
  {
    path: '/song',
    name: 'Song',
    component: () => import(/* webpackChunkName: "about" */ '../views/song/Song.vue'),
    meta:{
      title:'歌曲'
    }
  }
  ,
  {
    path: '/songlistdetail',
    name: 'Songlistdetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/songlist/Songlistdetail.vue'),
    meta:{
      title:'歌单'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue'),
    meta:{
      title:'搜索'
    }
  },
  {
    path: '/singer',
    name: 'Singerdetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/Singerdetail.vue'),
    meta:{
      title:'歌手'
    }
  },
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/My.vue'),
    meta:{
      title:'我的'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  document.title=to.matched[0].meta.title;
  next()
})


export default router
