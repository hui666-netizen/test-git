import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login.vue'
import Test1 from '@/views/test1.vue'
import Test2 from '@/views/test2.vue'
import { ElMessage } from 'element-plus'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/test1',
      name: 'test1',
      component: Test1
    },
    {
      path: '/test2',
      name: 'test2',
      component: Test2
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    const token = localStorage.getItem('user-token');

    if (!token) {
      next({
        path: '/'
      });
      ElMessage({type:'error',message:'没有token'})
      return;
    }
  }
  next();
})
export default router
