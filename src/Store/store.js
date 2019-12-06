import Vue from 'vue';
import Vuex from 'vuex';
import { router } from '../main.js'
import userData from '../helpers/data/usersData.js';
import firebase from 'firebase/app';
import 'firebase/auth';


Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {
      firstName: '',
      lastName: '',
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
      if (!payload.Uid) { // Would have to come from exisiting user login to be true
        firebase.auth().onAuthStateChanged((user) => {
          if (user !== null) {
            state.user = { ...state.user}; // NOT SURE YOU NEED. RESEAECH NEEDED
            state.user = {
              email: user.email,
              uid: user.uid,
              authed: true,
              token: payload.token,
              firstName: payload.FirstName,
              lastName: payload.LastName
            };
            // AXIOS REQUEST TO DB
            if (state.user) {}
            userData.getSingleUser(state.user.uid)
            .then((resp) => {
              if (resp.length === 0) {
                const newUser = {
                  "FirstName": payload.FirstName,
                  "LastName": payload.LastName,
                  "Email": user.email,
                  "Uid": user.uid
                };
                userData.addNewUser(newUser)
                  .then(res => console.error(res, 'once axios is sent w user')).catch(err => console.error(err));
              }
            }).catch(err => console.error(err));
            router.push({ name: 'myHome', path: '/' });
          }
        });
      } else {
        state.user = {
          email: payload.Email,
          uid: payload.Uid,
          authed: true,
          token: payload.token,
          firstName: payload.FirstName,
          lastName: payload.LastName
        };
        router.push({ name: 'myHome', path: '/' });
      }
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
          const firstName = payload.firstName;
          const lastName = payload.lastName;
          firebase.auth().createUserWithEmailAndPassword(myEmail, password)
            .then(res => {
              commit('addTokenToState', {
                token: res.user.refreshToken,
                FirstName: firstName,
                LastName: lastName
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
      existingEmailSignIn ({ commit }, payload) {
        if (payload.email.length > 1) { // Validation for signup login form
          const myEmail = payload.email;
          const password = payload.password;
          firebase.auth().signInWithEmailAndPassword(myEmail, password)
            .then(res => {
              userData.getSingleUser(res.user.uid)
                .then((resp) => {
                  commit('addTokenToState', {
                    token: res.user.refreshToken,
                    FirstName: resp[0].firstName,
                    LastName: resp[0].lastName,
                    Uid: resp[0].uid,
                    Email: resp[0].email
                  });
                });
              }).catch((err) => {
                console.error(err);
                alert('Sorry. This email/password is incorrect');
              });
          } else {
          alert('Please enter a valid email address and/or password');
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
