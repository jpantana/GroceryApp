import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './Routing/routes.js';
// STYLES
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return {x: 0, y: 0};
  }
});

router.beforeEach((to, from, next) => {
  // if (to.meta.requiresAuth) {
  //   const authUser = JSON.parse(window.localStorage.getItem('authUser'))
  //   if (authUser && authUser.access_token) {
  //     next()
  //   } else {
  //     next({name: 'home'})
  //   }
  // }
  next()
});

new Vue({
    el: "#app",
    router,
    render: h => h(App)
  })

