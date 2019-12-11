import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';
import App from './App.vue';
import { firebaseApp } from './helpers/data/connection.js';
import { routes } from './Routing/routes.js';
import { store } from './Store/store.js';
// STYLES
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/dropdown';
import 'animate.css';
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas, faOm } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue);
Vue.use(VueRouter);

export const router = new VueRouter({
  routes,
  mode: 'history',
  store
});

// NOT WORKING AT ALL
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('user-token') === null) {
    if (to.path == '/login') {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

var vm = new Vue({
    router,
    store,
    render: h => h(App),
    base: firebaseApp(),
    methods: {

    },
    created() {

    }
  }).$mount( '#app' );
