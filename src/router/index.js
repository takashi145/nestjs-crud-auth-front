import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import PostList from '../views/post/Index.vue';
import CreatePost from '../views/post/Create.vue';
import UpdatePost from '../views/post/Update.vue';
import axios from 'axios';
import { ref } from 'vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { auth: true }
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach(async (to, from, next) => {
  const user = ref(null);
  try {
    const res = await axios.get('/user');
    user.value = res.data
  }finally {
    if(to.matched.some(record => record.meta.auth)) {
      if(user.value) {
        next();
      }else {
        next({ name: 'login' });
      }
    }else {
      if(user.value) {
        next({ name: '/' });
      }else {
        next();
      }
    }  
  }
})

export default router
