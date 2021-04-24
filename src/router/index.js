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
        path: '/playlist',
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
    component: () => import('../views/secondguide/Defaulthome.vue')
  },
  {
    path: '/list',
    name: 'Songlist',
    component: () => import(/* webpackChunkName: "about" */ '../views/songlist/Songlist.vue')
  },
  {
    path: '/play',
    name: 'SongPlay',
    component: () => import(/* webpackChunkName: "about" */ '../views/Songplay.vue')
  },
  {
    path: '/song',
    name: 'Song',
    component: () => import(/* webpackChunkName: "about" */ '../views/song/Song.vue')
  }
  ,
  {
    path: '/songlistdetail',
    name: 'Songlistdetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/songlist/Songlistdetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
