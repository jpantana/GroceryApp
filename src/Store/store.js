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
      authed: false
    }
  },
  getters: {

  },
  mutations: {
    updateStoreUser: (state, thisUser) => {
      state.user = thisUser;
    }
  },
  actions: {
      loginGEvent: ({ commit }) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
      },
      submitNewEmailSignup: ({ commit }, payload) => {
        if (payload.email.length > 1) {
          // NProgress.start();
          const myEmail = payload.email;
          const password = payload.password;
          firebase.auth().createUserWithEmailAndPassword(myEmail, password)
            .then(resp => {
              // console.error(resp);
              // NProgress.done();
            }).catch(err => {
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
          firebase.auth().signInWithEmailAndPassword(myEmail, password).then()
          .catch((err) => {
            alert('Sorry. This email/password is incorrect');
          });
        } else {
          alert('Please enter a valid email address and password');
        }
      }
  }
});