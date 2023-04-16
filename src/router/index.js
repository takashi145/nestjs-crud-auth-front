import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import PostList from '../views/post/PostList.vue';
import CreatePost from '../views/post/CreatePost.vue';
import UpdatePost from '../views/post/UpdatePost.vue';
import NotFound from '../views/NotFound.vue';
import { useAuthStore } from '@/store/auth';
import Welcome from '@/views/Welcome.vue';

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/post',
    name: 'post-list',
    component: PostList,
    meta: { auth: true }
  },
  {
    path: '/post/create',
    name: 'create-post',
    component: CreatePost,
    meta: { auth: true }
  },
  {
    path: '/post/:id/edit',
    name: 'update-post',
    component: UpdatePost,
    meta: { auth: true }
  },
  {
    path: '/:catchAll(.*)',
    name: 'notfound',
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if(!authStore.user) {
    await authStore.me();
  }
  if(to.matched.some(record => record.meta.auth)) {
    if(authStore.user) {
      next();
    }else {
      next({ name: 'login' });
    }
  }else {
    if(authStore.user) {
      next({ name: 'post-list' });
    }else {
      next();
    }
  }
})

export default router
