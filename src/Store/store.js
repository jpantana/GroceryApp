import Vue from 'vue';
import Vuex from 'vuex';
import { router } from '../main.js'
import usersData from '../helpers/data/usersData.js';
import firebase from 'firebase/app';
import 'firebase/auth';
import itemsData from '../helpers/data/itemsData.js';
import familyData from '../helpers/data/familyData.js';
// import groceryListData from '../helpers/data/groceryListData.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {
      firstName: '',
      lastName: '',
      familyId: '',
      email: null,
      uid: null,
      authed: false,
      token: '',
      id: '',
      photoURL: ''
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
            // First, a user needs to create a Family
            let famLastName = '';
            let famFirstName = ''
            if (user.displayName) {
              famLastName = user.displayName.split(" ");
              famFirstName = famLastName[0];
              famLastName = famLastName[famLastName.length - 1];
            } else {
              famLastName = payload.LastName;
            }
            const newFam = { Name: famLastName };
            familyData.createFamily(newFam)
              .then((famData) => {
                // famData now created
                const newUser = {
                  "FirstName": !payload.FirstName ? famFirstName :  payload.FirstName,
                  "LastName": !payload.LastName ? famLastName : payload.LastName,
                  "Email": user.email,
                  "Uid": user.uid,
                  "FamilyId": famData.data.id,
                  "PhotoURL": payload.photoURL
                };
                usersData.addNewUser(newUser)
                  .then((res) => {
                    state.user = {
                      firstName: res.data.firstName,
                      lastName: res.data.lastName,
                      email: res.data.email,
                      uid: res.data.uid,
                      authed: true,
                      token: localStorage.getItem('user-token'),
                      familyId: res.data.familyId,
                      id: res.data.id,
                      photoURL: res.data.PhotoURL
                    };
                  })
              })
              .catch(err => console.error('no family created and/or user', err)); // two catch's seemed to make for duplicate data posts
          } else if (response.length) {
            // code for returning user
            usersData.getSingleUser(user.uid)
              .then((res) => {
                state.user = {
                  firstName: res[0].firstName,
                  lastName: res[0].lastName,
                  email: res[0].email,
                  uid: res[0].uid,
                  authed: true,
                  token: localStorage.getItem('user-token'),
                  familyId: res[0].familyId,
                  id: res[0].id,
                  photoURL: res[0].PhotoURL
                };
              })
              .catch(err => console.error(err));
          }
        })
        .catch(err => console.error(err));
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
        lastName: payload.LastName,
        familyId: payload.familyId,
        id: payload.Id,
        photoURL: payload.PhotoURL
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
    },
    // getMyFamily (state, payload) {
    //   state.family = payload;
    // }
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
                LastName: null,
                photoURL: res.user.photoURL
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
        // payload returns user from FB request in Header (gets called on login too and need to fix)
          usersData.getSingleUser(payload.uid)
              .then((resp) => {
                    commit('refreshUserState', {
                      token: localStorage.getItem('user-token'),
                      FirstName: !resp[0].firstName ? '' : resp[0].firstName,
                      LastName: !resp[0].lastName ? '' : resp[0].lastName,
                      Uid: resp[0].uid,
                      Email: resp[0].email,
                      familyId: resp[0].familyId,
                      Id: resp[0].id,
                      PhotoURL: resp[0].photoURL
                    });
              }).catch(err => console.error(err, 'no user on refresh'));
      },
      // needs to receive payload from user input catpure in Header.vue
      upadteUserProfile: ({ commit }, payload) => {
        commit('UpdateOrAddUserName', payload);
      },
      addNewFoodToList: ({ commit }, payload) => {
        // If no grocerylist is assocated w user, we must FIRST create that table, then take its PK and pass it as our remaing FK for new Item
        itemsData.addItem(payload)
          .then((resp) => {

          })
          .catch(err => console.error(err));
      },
      deleteThisUser: ({ commit }, payload) => {
        usersData.deleteUser(payload.uid)
          .then()
          .catch(err => console.error(err));
      }
    }
});
