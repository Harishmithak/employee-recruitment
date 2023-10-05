import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'; 

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
   
  },
  {
    path: '/about',
    name: 'about',

    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/companyuser',
    name: 'companyuser',
    
    component: () => import( '../views/Register/CompanyuserView.vue')

  },
  {
    path: '/login',
    name: 'login',

    component: () => import( '../views/login/LoginView.vue')
  },
  {
    path: '/user',
    name: 'user',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Register/UserView.vue')
    beforeEnter: (to, from, next) => {
      window.location.href = 'http://127.0.0.1:8000/api/register';
      next(false);
    }
  },
  {
    path: '/companyjob',
    name: 'companyjob',

    component: () => import('../views/jobs/CompanyjobView.vue')
  },

  {
    path: '/userjob',
    name: 'userjob',
    beforeEnter: (to, from, next) => {
      if (store.state.isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    },
    component: () => import( '../views/jobs/UserjobView.vue')
  },
  {
    path: '/academic/:candidate_id/:company_id/:job_id',
    name: 'academic',
    component: () => import( '../views/jobs/AcademicdetailView.vue')
  },
  {
    path: '/experience/:candidate_id/:academic_id/:company_id/:job_id',
    name: 'experience',
    component: () => import( '../views/jobs/ExperiencedetailView.vue')
  },
  {
    path: '/display',
    name: 'display',
    component: () => import( '../views/jobs/DisplayView.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
