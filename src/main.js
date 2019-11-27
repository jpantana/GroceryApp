import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';
import App from './App.vue';
import { firebaseApp } from './helpers/data/connection.js';
import { routes } from './Routing/routes.js';
import { store } from './Store/store.js';
// import { mapGetters, mapActions, mapMutations } from 'vuex';
// STYLES
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'animate.css';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes,
  mode: 'history',
  store,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return {x: 0, y: 0};
  },
  methods: {
    updateThisUser(thisUser) {
      this.$store.commit('updateStoreUser', thisUser);
    }
  }
});


router.beforeEach((to, from, next) => {
  const authenticated = firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      vm.myUser = {
        userid: user.uid,
        email: user.email,
        authed: true
      }
      // currently line below breaks code push
      // let thisUser = vm.myUser;
      router.push({ name: 'myHome', path: '/' });
    } else {
      router.push({ name: 'myLogin', path: '/login' })
    }
  })
  next();
});

var vm = new Vue({
    el: "#app",
    router,
    data() {
      return {
        myUser: {
          userid: null,
          email: null,
          authed: false
        }
      }
    },
    store,
    render: h => h(App),
    base: firebaseApp(),
    watchers: {
      myUser: function() {
        console.error('change noted');
        router.updateThisUser(vm.myUser);
      }
    } 
  })

