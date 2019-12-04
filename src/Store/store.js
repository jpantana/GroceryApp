import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';


Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {
      email: null,
      uid: null,
      authed: false,
      token: localStorage.getItem('user-token') || ''
    }
  },
  getters: {
    hasPermission: state => {
      if (state.user.token !== null) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user !== null) {
            state.user = {
              email: user.email,
              uid: user.uid,
              authed: true,
              token: localStorage.getItem('user-token')
            }
            // console.error(state.user);
          } else {
            localStorage.removeItem('user-token');
            return false
          }
        });
        return true;
      } 
      return false;
    }
  },
  mutations: {
    // NOT BEING HEARD
    // updateStoreUser: (state, thisUser) => {
    //   // called in main.js router const
    //   state.user = thisUser;
    // }
  },
  actions: {
      loginGEvent: ({ commit }) => {
        const provider = new firebase.auth.GoogleAuthProvider();
          // i want to pull auth data from firebase and set state auth to true 'ie token in local storage';
          // then have a whether that says if true then setTimeout function to run logout if it's been say an hour
        firebase.auth().signInWithPopup(provider)
          .then(res => localStorage.setItem('user-token',res.credential.accessToken));
      },
      submitNewEmailSignup: ({ commit }, payload) => {
        if (payload.email.length > 1) {
          // NProgress.start();
          const myEmail = payload.email;
          const password = payload.password;
          firebase.auth().createUserWithEmailAndPassword(myEmail, password)
            .then(res => localStorage.setItem('user-token',res.credential.accessToken))
            .catch(err => {
              console.error('no new user created', err);
              alert(err.message);
            });
          } else {
            alert('Please enter a valid email address and password');
          }  
      },
      // not yet submitted
      existingEmailSignIn: ({ commit }, payload) => {
        if (payload.email.length > 1) {
          const myEmail = payload.email;
          const password = payload.password;
          firebase.auth().signInWithEmailAndPassword(myEmail, password)
            .then(res => localStorage.setItem('user-token',res.credential.accessToken))
            .catch((err) => {
              alert('Sorry. This email/password is incorrect');
            });
        } else {
          alert('Please enter a valid email address and password');
        }
      }
  }
});