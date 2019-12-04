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
import 'bootstrap/js/dist/dropdown';
import 'animate.css';
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas, faOm } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue);
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
    // NOT BEING CALLED
    // updateThisUser(thisUser) {
    //   // console.log('from router main updateThisUser fn', thisUser);
    //   this.$store.commit('updateStoreUser', thisUser);
    // }
  }
});

router.beforeEach((to, from, next) => {
  console.log(store.getters['hasPermission']);
  if (store.getters['hasPermission'] && from.path == '/login') {
    console.error('successful login and redirect');
    next('/');
  }
  if (!store.getters['hasPermission'] && from.path !== '/login') {
    console.error('you logged out');
    next('/login');
  }
  if (store.getters['hasPermission'] == false) {
    console.error('not logged in');
  }
  console.error('just plain next');
  next();

  // const authenticated = firebase.auth().onAuthStateChanged((user) => {
  //   console.error(to.path);

  //   if (user !== null) {
  //       // vm.myUser = {
  //       //   userid: user.uid,
  //       //   email: user.email,
  //       //   authed: true
  //       // }
  //     router.push({ name: 'myHome', path: '/' });
  //   } 
  //   if (to.path === '/') {
  //     next();
  //     router.push({ name: 'myList', path: '/list'});
  //   } 
  //   else {
  //     router.push({ name: 'myLogin', path: '/login' })
  //   }
  // })
  // next();
  // if (localStorage.getItem('user-token') === null) {
  //   // console.error(vm.myUser);
  //   const authenticated = firebase.auth().onAuthStateChanged((user) => {
  //     // sets state in data for main instance w user. Simultaneously the store state is being updated by other means
  //     if (user !== null) {
  //       vm.myUser = {
  //         userid: user.uid,
  //         email: user.email,
  //         authed: true,
  //       };
  //       next('/');
  //     }
  //     next('/login');
  //   });
  // } else if (localStorage.getItem('user-token') !== null) {
  //   next();
  // } else {
  //   next('/login');
  // }
  // if (store.getters["hasPermission"]) {
  //   next('/')
  // } else {
  //   next({
  //     name: "myLogin" // back to safety route //
  //   });
  // }

    // var hasPermission = store.getters["hasPermission"];
    // console.error(hasPermission, to, from);
    // if (hasPermission) {
    //   // console.error('true from router before each');
    //   // next();
    // } 

    // next('/login');
    // console.error('false from router before each');

  // if (localStorage.getItem('user-token')) {
  //   console.error('there is an access token');
    // if (to.path !== '/') {
    //   next({
    //     name: 'myHome'
    //   });
    // }
  //   if (from.path === '/login') {
  //     router.push({ name: 'myHome', path: '/' });
  //   }
  //   console.error('already logged in w token', from.path);
  //   next();
  // } 
  // if (!localStorage.getItem('user-token')) {
  //     if (to.path !== '/login') {
  //       console.error('lets redirect with logout');
  //       router.push({ name: 'myLogin', path: '/login' });
  //     }
  //     console.error('no access token, and already on /login');
  //   next(); 
  // }
});

// router.beforeResolve((to, from, next) => {
//   console.error(localStorage.getItem('user-token'), routes.name, from.path);
//   if (from.name == 'myLogin' && localStorage.getItem('user-token') !== null) {
//     console.error('before resolve has what it needs');
//     next('/');
//   }
//   if (localStorage.getItem('user-token') === null) {
//     console.error('so it is');
//     // next('/login');
//   }
//   next();
// });

//router.beforeResolve((to, from, next) => {
  // console.error(this.store.state);
  // if (from.name == 'myLogin' && vm.user.authed) {
  //   console.error('authed and from mylogin');
  //   next('/');
  // }
  // if (vm.user.authed) {
  //   console.error('authed but been logged in');
  //   next();
  // }
  // next();
//});

// router.beforeEach((to, from, next) => {

// });

// router.afterEach((to, from) => {
//   if (to.name == 'myLogin') {
//     console.error(to.name);
//     // vm.removeUser();
//     // store.state.user.email = '';
//     // store.state.user.uid = '';
//     // store.state.user.authed = false;
//     // console.log(store.state.user);
//   }
// });

var vm = new Vue({
    router,
    store,
    data() {
      return {
        // NOT SURE I ACTUALLY NEED THIS BC OF STORE GETTER
        // myUser: {
        //   userid: null,
        //   email: null,
        //   authed: false,
        //   token: null
        // }
      }
    },
    render: h => h(App),
    base: firebaseApp(),
    methods: {
      // MAY NOT NEED THIS METHOD DEPENDING ON STORE GETTER
      removeUser() {
        if (this.myUser.userid.length > 1) {
            this.myUser = {
            userid: '',
            email: '',
            authed: false
          };
        }
      }
    },
    // beforeCreate() {
    //   console.error('created');
    //     const authenticated = firebase.auth().onAuthStateChanged((user) => {
    //       // sets state in data for main instance w user. Simultaneously the store state is being updated by other means
    //       if (user !== null) {
    //         vm.myUser = {
    //           userid: user.uid,
    //           email: user.email,
    //           authed: true,
    //         }
    //       }
    //     });
    // },
    // ACCOMPLISHED IN STORE MUTATION
    // watch: {
    //   myUser: () => {
    //     console.error(store.state.user);
    //     store.state.user.email = vm.myUser.email;
    //     store.state.user.uid = vm.myUser.userid;
    //     store.state.user.authed = vm.myUser.authed;
    //     console.log(store.state.user);
    //   }
    // } 
  }).$mount( '#app' );