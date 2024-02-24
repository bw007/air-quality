import { createRouter, createWebHistory } from 'vue-router'
import homeLayout from '../layouts/home-layout.vue'
import { menu } from '@/stores/utils/menu'
import { useDark } from "@vueuse/core";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: homeLayout,
      children: [
        ...menu,
        {
          path: '/:pathMatch(.*)*',
          name: 'error',
          meta: {
            title: 'Sahifa topilmadi',
          },
          component: () => import("@/views/ErrorView.vue")
        }
      ]
    }
  ]
})

router.beforeEach(() => {
  useDark()
})

export default router
