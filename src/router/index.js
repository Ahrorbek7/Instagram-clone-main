import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/log/Register.vue';
import MainView from '../views/layout/MainView.vue'
import { isLoggedIn } from '../state';
install: (app, options) => {
  app.component("InstagramFeed", InstagramFeed);
}
const router = createRouter({
    history: createWebHistory(),
    routes: [
  {
    path: '/',
    name: 'Home',
    component: () => (isLoggedIn == false ? Register : MainView),
  },
    {
        path: '/sign-in',
        component: () => import('../views/log/SignIn.vue')
    },
          {
            path: '/sign-up',
            name: 'SignUp',
            component: () => import('../views/log/SignUp.vue')
          },
          {
            path: '/reels',
            name: 'Reels',
            component: () => import('../components/Reels.vue')
          },
          {
            path: '/main-page',
            name: 'MainView',
            component: () => import('../views/layout/MainView.vue')
          },
          {
            path: '/explore',
            name: 'explore',
            component: () => import('../components/Explore.vue')
          },
          {
            path: '/profile',
            name: 'Profile',
            component: () => import('../components/Profile.vue')
          }
    ]
})

export default router