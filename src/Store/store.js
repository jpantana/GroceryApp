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
      loginEvent: ({ commit }) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
      },
      submitNewEmailSignup: ({ commit }, payload) => {
        console.error('from store', payload.password);
        const myEmail = payload.email;
        const password = payload.password;
        // NOTE: payload includes input for email subscribe, but data not passed to any existing db as of yet
        firebase.auth().createUserWithEmailAndPassword(myEmail, password)
          .then(resp => console.error(resp))
          .catch(err => console.error('no new user created', err));
      }
  }
});