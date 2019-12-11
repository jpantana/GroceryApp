import Vue from 'vue';
import Vuex from 'vuex';
import { router } from '../main.js'
import usersData from '../helpers/data/usersData.js';
import firebase from 'firebase/app';
import 'firebase/auth';
import itemsData from '../helpers/data/itemsData.js';
import groceryListData from '../helpers/data/groceryListData.js';

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
  //~~~~~~~~~~~~~~~~ MUTATIONS SECTION ~~~~~~~~~~~~~~~~~~~
  mutations: {
    addUserToState (state, payload) {
      localStorage.setItem('user-token', payload.token);
      // SEE IF USER ALREADY EXISTS
      firebase.auth().onAuthStateChanged((user) => {
        usersData.getSingleUser(user.uid)
        .then((response) => {
          if (!response.length) {
            // code block for firstime google auth
            const newUser = {
              "FirstName": payload.FirstName,
              "LastName": payload.LastName,
              "Email": user.email,
              "Uid": user.uid,
            };
            usersData.addNewUser(newUser)
              .then((res) => {
                state.user = {
                  firstName: res.data.firstName,
                  lastName: res.data.lastName,
                  email: res.data.email,
                  uid: res.data.uid,
                  authed: true,
                  token: localStorage.getItem('user-token')
                };
              })
              .catch(err => console.error(err));
          } else if (response.length) {
          // } else if (!payload.firsttimeUser) {
            // code for returning user
            usersData.getSingleUser(user.uid)
              .then((res) => {
                state.user = {
                  firstName: res[0].firstName,
                  lastName: res[0].lastName,
                  email: res[0].email,
                  uid: res[0].uid,
                  authed: true,
                  token: localStorage.getItem('user-token')
                };
              })
              .catch(err => console.error(err));
          }
        })
        .catch();
      });
      router.push({ name: 'myHome', path: '/' });
    },
    // LOGOUT METHOD
    revokeToken (state, payload) {
      localStorage.removeItem('user-token');
      state.user = payload;
    },
    // VUEX store doesn't maintain login records when browser refreshes, so here is a clunky work around
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
    // UPDATE/ADD USER NAME TO EXISTING USER (works correctly and maintains state)
    UpdateOrAddUserName (state, payload) {
      state.user.firstName = payload.firstName;
      state.user.lastName = payload.lastName;
      // get the user to update
      usersData.getSingleUser(state.user.uid)
        .then((resp) => {
          payload.Uid = resp[0].uid;
          // now, update said user
          usersData.updateUser(resp[0].uid, payload)
            .then((r) => {
              // r gets updated to state in another code block
            })
            .catch(err => console.error(err));
        }).catch(err => console.error(err));
    }
  },
  //~~~~~~~~~~~~~~~~ ACTIONS SECTION ~~~~~~~~~~~~~~~~~~~
  actions: {
      loginGoogleEvent: ({ commit }) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(res => {
              commit('addUserToState', {
                token: res.credential.accessToken,
                firsttimeUser: res.additionalUserInfo.isNewUser,
                FirstName: null,
                LastName: null
              });
          });
      },
      submitNewEmailSignup: ({ commit }, payload) => {
        if (payload.email.length > 1) {
          const myEmail = payload.email;
          const password = payload.password;
          firebase.auth().createUserWithEmailAndPassword(myEmail, password)
            .then(res => {
              commit('addUserToState', {
                firsttimeUser: res.additionalUserInfo.isNewUser,
                token: res.user.refreshToken,
                FirstName: payload.firstName,
                LastName: payload.lastName
              });
            }).catch(err => alert(err.message));
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
              commit('addUserToState', {
                firsttimeUser: res.additionalUserInfo.isNewUser,
                token: res.user.refreshToken,
                FirstName: payload.firstName,
                LastName: payload.lastName
              });
              }).catch((err) => alert('Sorry. This email/password is incorrect', err));
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
          usersData.getSingleUser(payload.uid)
              .then((resp) => {
                    commit('refreshUserState', {
                      token: localStorage.getItem('user-token'),
                      FirstName: !resp[0].firstName ? '' : resp[0].firstName,
                      LastName: !resp[0].lastName ? '' : resp[0].lastName,
                      Uid: resp[0].uid,
                      Email: resp[0].email
                    });
                  // }
              }).catch(err => console.error(err));
      },
      // needs to receive payload from user input catpure in Header.vue
      upadteUserProfile: ({ commit }, payload) => {
        commit('UpdateOrAddUserName', payload);
      },
      addNewFoodToList: ({ commit }, payload) => {
        //console.log(payload, 'new food item');
        // groceryListData.getMyGroceryList
        // If no grocerylist is assocated w user, we must FIRST create that table, then take its PK and pass it as our remaing FK for new Item
        itemsData.addItem(payload)
          .then((resp) => {

          })
          .catch(err => console.error(err));
      },
      seeGroceryLists: ({ commit }, payload) => {
        // console.error(payload);
        groceryListData.makeGroceryList(payload)
          .then()
          .catch(err => console.error(err));
      }
    }
});
