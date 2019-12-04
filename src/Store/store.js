import Vue from 'vue';
import Vuex from 'vuex';
import { router } from '../main.js'
import firebase from 'firebase/app';
import 'firebase/auth';


Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {
      email: null,
      uid: null,
      authed: false,
      token: ''
    }
  },
    getters: {
      userPermissions: state => {
        return state.user.token;
    }
  },
  mutations: {
    addTokenToState (state, payload) {
      localStorage.setItem('user-token', payload.token);
      firebase.auth().onAuthStateChanged((user) => {
        if (user !== null) {
          state.user.email = user.email;
          state.user.uid = user.uid;
          state.user.authed = true;
          state.user.token = payload.token;
          router.push({ name: 'myHome', path: '/' });
        }
      });
    },
    revokeToken (state, payload) {
      localStorage.removeItem('user-token');
      state.user = payload;
    }
  },
  actions: {
      loginGEvent: ({ commit }, event) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(res => {
            commit('addTokenToState', {
              token: res.credential.accessToken
            });
            router.push('/');
          });
      },
      submitNewEmailSignup: ({ commit }, payload) => {
        if (payload.email.length > 1) {
          const myEmail = payload.email;
          const password = payload.password;
          firebase.auth().createUserWithEmailAndPassword(myEmail, password)
            .then(res => {
              commit('addTokenToState', {
                token: res.credential.accessToken
              });
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
          firebase.auth().signInWithEmailAndPassword(myEmail, password)
            .then(res => {
              commit('addTokenToState', {
                token: res.credential.accessToken
              });
            }).catch(() => {
              alert('Sorry. This email/password is incorrect');
            });
        } else {
          alert('Please enter a valid email address and password');
        }
      },
      signOut: ({commit}) => {
        commit('revokeToken', {
          authed: false,
          uid: null,
          email: null,
          token: null
        });
      }
  }
});