import Vue from 'vue'
import VueRouter from 'vue-router'
const Movie = () => import('../views/Movie')
const Cinema = () => import('../views/Cinema')
const Mine = () => import('../views/Mine')
const Login = () => import('../views/Login')
const Register = () => import('../views/Register')
const Forgetpwd = () => import('../views/Forgetpwd')

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/movie'
  },
  {
    path: '/movie',
    name: 'movie',
    component: Movie,
    children: [
      {
        path: 'city',
        component: () => import('@/components/City/City')
      },
      {
        path: 'nowPlaying',
        component: () => import('@/components/NowPlaying/NowPlaying')
      },
      {
        path: 'comingSoon',
        component: () => import('@/components/ComingSoon/ComingSoon')
      },
      {
        path: 'search',
        component: () => import('@/components/Search/Search')
      },
      {
        path: 'detail/:movieId',
        components: {
          detail: () => import('@/views/Movie/detail')
        },
        props: {
          // 多个components对应多个props
          detail: true
        }
      },
      {
        path: '/movie',
        redirect: '/movie/nowPlaying'
      }
    ]
  },
  {
    path: '/cinema',
    name: 'cinema',
    component: Cinema
  },
  {
    path: '/mine',
    name: 'mine',
    component: Mine
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/forgetpwd',
    name: 'forgetpwd',
    component: Forgetpwd
  }
]

const router = new VueRouter({
  mode: 'history',
  base: 'ordinary',
  routes
})

export default router
