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
    // NOT REALLY USING THIS
    // userPermissions: state => {
    //   return state.user.token;
    // }
  },
  mutations: {
    addTokenToState (state, payload) {
      localStorage.setItem('user-token', payload.token);
      if (!payload.Uid) { // ELSE: exisiting user returning to login
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
            userData.getSingleUser(state.user.uid)
            .then((resp) => {
              if (resp.length === 0) { // Means this is a first time login and FB data needs to get to DB
                const newUser = {
                  "FirstName": payload.FirstName,
                  "LastName": payload.LastName,
                  "Email": user.email,
                  "Uid": user.uid
                };
                userData.addNewUser(newUser) // Here we take action and add new user to DB
                  .then()
                  .catch(err => console.error(err));
              }
            }).catch(err => console.error(err));
            router.push({ name: 'myHome', path: '/' }); // Force navigation not that auth has been recorded (a little hacky maybe, but beforeEach gave trouble)
          }
        });
      } else { // Existing user in FB and DB returning
        state.user = {
          email: payload.Email,
          uid: payload.Uid,
          authed: true,
          token: payload.token,
          firstName: payload.FirstName,
          lastName: payload.LastName
        };
        router.push({ name: 'myHome', path: '/' }); // may could refactor here to only use this line once, and add a condition for auth status
      }
    },
    // LOGOUT METHOD
    revokeToken (state, payload) {
      localStorage.removeItem('user-token');
      state.user = payload;
    },
    // VUEX store doesn't maintain login records when browser refreshes, so here is work around. Too taxing.
    refreshUserState (state, payload) {
      state.user = {
        email: payload.Email,
        uid: payload.Uid,
        authed: true,
        token: payload.token,
        firstName: payload.FirstName,
        lastName: payload.LastName
      };
    },
    // UPDATE/ADD USER NAME TO EXISTING USER
    UpdateOrAddUserName (state, payload) {
      state.user.firstName = payload.firstName;
      state.user.lastName = payload.lastName;
      userData.getSingleUser(state.user.uid)
        .then((resp) => {
          payload.Uid = resp[0].uid;
          // console.error(resp[0].uid, 'testisangasdg', payload);
          userData.updateUser(resp[0].uid, payload)
            .then((r) => console.error(r))
            .catch(err => console.error(err));
          // code for update call here.
        }).catch(err => console.error(err));
    }
  },
  actions: {
      loginGoogleEvent: ({ commit }, event) => {
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
      },
      rebuildStateAfterRefresh: ({ commit }, payload) => {
        // payload returns user from FB request
        if (!store.state.user.Uid) {
          userData.getSingleUser(payload.uid)
              .then((resp) => {
                  if (resp.firstName !== null) {
                    // console.error('do something with payload');
                    commit('refreshUserState', {
                      token: localStorage.getItem('user-token'),
                      FirstName: resp[0].firstName,
                      LastName: resp[0].lastName,
                      Uid: resp[0].uid,
                      Email: resp[0].email
                    });
                  }
              }).catch(err => console.error(err));
            } else {
              console.log('create calls rebuild in store and hits else');
            }
        },
      // needs to receive payload from user input catpure in Header.vue
        upadteUserProfile: ({ commit }, payload) => {
          // const uid = store.state.user.Uid;
          // console.error(store.state.user, payload);
          commit('UpdateOrAddUserName', payload);
        },
      }
});
