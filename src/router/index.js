import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GameList from '@/components/game/GameList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Universo Gamer',
      showHeader: true,
    },
  },
  {
    path: '/games',
    name: 'games',
    component: GameList,
    meta: {
      title: 'Juegos',
      showHeader: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/',
  },
  {
    path: '/game/:id',
    name: 'game-detail',
    component: () => import('@/views/GameDetail.vue'),
    meta: {
      title: 'Detalle del Juego',
      showHeader: true,
    },
  },
  {
    path: '/top5',
    name: 'top5',
    component: () => import('@/views/Top5View.vue'),
    meta: {
      title: 'Mi Top 5',
      showHeader: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'GameDiscover'
  next()
})

export default router
