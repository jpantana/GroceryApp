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
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   }
  //   if (to.hash) {
  //     return { selector: to.hash }
  //   }
  //   return {x: 0, y: 0};
  // },
  methods: {

  },
  computed: {
    
  }
});

router.beforeEach((to, from, next) => {
  console.error(typeof store.getters.userPermissions);
  if (store.getters.userPermissions !== '') {
    console.error(store.getters.userPermissions);
  }
  next();
});

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