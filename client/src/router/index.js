import Cookie from 'js-cookie';

import { createRouter, createWebHistory } from 'vue-router';
import ExploreLayout from "../layouts/ExploreView.vue";
import LandingLayout from "../layouts/LandingView.vue";

import HomeView from "../views/Explore/HomeView.vue";
import AdminRegister from "../views/Landing/AdminRegister.vue";
import SinglePageView from "../views/Explore/SinglePage.vue";
import CreateProductView from "../views/Explore/CreateProductView.vue";

import AccountView from "../views/Explore/AccountView.vue";
import RegisterView from "../views/Landing/RegisterView.vue";
import LoginView from "../views/Landing/LoginView.vue";
import IndexView from "../views/Landing/IndexView.vue";

// Admin
import AdminPage from "../views/Admin/AdminPage.vue"; 
import Users from "../views/Admin/Pages/Users.vue";
import Products from "../views/Admin/Pages/Products.vue";
import Account from "../views/Admin/Pages/Account.vue";

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingLayout,
    children: [
      {
        //  route =>  /
        path: "",
        name: 'IndexView',
        component: IndexView
      },
      {
        //  route =>  /home/register
        path: "register",
        name: 'register',
        component: RegisterView
      },
      {
        //  route =>  /home/register
        path: "login",
        name: 'Login',
        component: LoginView 
      },
      {
        //  route =>  /home/register
        path: "/adminlogin",
        name: 'AdminRegister',
        component: AdminRegister 
      }
    ],
    beforeEnter: (to, from, next) => {
      if(Cookie.get('token')){
        window.location.href = '/explore'
      } else {
        next();
      }
    }
  },
  {
    path: "/explore",
    name: "Explore",
    component: ExploreLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: HomeView
      },
      {
        path: "/explore/account",
        name: "AccountView",
        component: AccountView
      },
      {
        path: "/explore/create",
        name: CreateProductView,
        component: CreateProductView
      },
      {
        path: '/explore/singlepage/:id',
        name: "SinglePageView",
        component: SinglePageView,
        props: true
      }
    ],
    beforeEnter: (to, from, next) => {
      if(!Cookie.get('token')){
        window.location.href = '/'
      } else {
        next();
      }
    }
  },
  {
    path: '/admin',
    name: "Admin",
    component: AdminPage,
    children: [
      {
        path: "users",
        name: "Users",
        component: Users
      },
      {
        path: "products",
        name: "Products",
        component: Products
      },
      {
        path: "account",
        name: "Account",
        component: Account
      }
    ],
    beforeEnter: (to, from, next) => {
      if(!Cookie.get('token')){
        window.location.href = '/'
      } else {
        next();
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
