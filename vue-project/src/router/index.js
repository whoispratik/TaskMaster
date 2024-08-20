import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ManageView from '../views/ManageView.vue'
import { useUserStore } from '@/stores/user'
import { useModalStore } from '@/stores/modal'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: '/home'
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/manage',
      name: 'Manage',
      component: ManageView,
      meta: { requiresAuth: true }
    },
    {
      path: '/manage/userlist',
      name: 'userlist'
    }
  ],
  linkExactActiveClass: 'active'
}) //A router instance is returned
router.beforeEach((to, from, next) => {
  const modalStore = useModalStore()
  const userStore = useUserStore()
  if (!to.meta.requiresAuth) {
    next()
    return
  }
  if (userStore.userLoggedIn) {
    next()
  } else {
    if (from.name == 'home') {
      modalStore.isopen = true
    }
    next({ name: 'home' })
  }
})
export default router
