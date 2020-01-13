import Vue from 'vue';
import Vuex from 'vuex';
import { router } from '../main.js'
import userData from '../helpers/data/usersData.js';
import firebase from 'firebase/app';
import 'firebase/auth';
import itemsData from '../helpers/data/itemsData.js';
import familyData from '../helpers/data/familyData.js';

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
    },
    keyForUserProfilePicture: 1,
    whoIsInMyFamily: 1,
    keyForGroceryList: 1,
    keyForInviteFlag: 1,
    // trying to use async for Family.vue
    family: [],
  },
  //~~~~~~~~~~~~~~~~~ GETTERS SECTION ~~~~~~~~~~~~~~~~~~~~
  getters: {
    user: (state) => {
      this.actions.stateIsInUpdateKeys();
      return state.user;
    }
    // using mapState to accomplish (which auto creates getters)
  },
  //~~~~~~~~~~~~~~~~ MUTATIONS SECTION ~~~~~~~~~~~~~~~~~~~
  mutations: {
    addUserToState (state, payload) {
      localStorage.setItem('user-token', payload.token);
      // SEE IF USER ALREADY EXISTS
      firebase.auth().onAuthStateChanged((user) => {
        userData.getSingleUser(user.uid)
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
                userData.addNewUser(newUser)
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
                      photoURL: res.data.photoURL
                    };
                  })
              })
              .catch(err => console.error('no family created and/or user', err)); // two catch's seemed to make for duplicate data posts
          } else if (response.length) {
            // code for returning user
            userData.getSingleUser(user.uid)
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
      userData.getSingleUser(state.user.uid)
        .then((resp) => {
          payload.Uid = resp[0].uid;
          // now, update said user
          userData.updateUser(resp[0].uid, payload)
            .then((r) => {
              // r gets updated to state in another code block
            })
            .catch(err => console.error(err));
        }).catch(err => console.error(err));
    },
    updateUserProfileImageAction (state, payload) {
      const updatedUserObj = { PhotoURL: payload }
      userData.updateProfileImage(state.user.uid, updatedUserObj)
        .then(() => {
          state.user.photoURL = payload;
        }).catch(err => console.error(err));
    },
    userProfileImageAfterUpload (state, payload) {
      state.keyForUserProfilePicture = state.keyForUserProfilePicture + 1;
    },
    showFamilyMemberBubbles (state, payload) {
        state.whoIsInMyFamily = state.whoIsInMyFamily + 1; 
    },
    increaseGroceryListKey (state, payload) {
        state.keyForGroceryList = state.keyForGroceryList + 1;
    },
    updateFamilyMembers (state, payload) {
      const famId = state.user.familyId;
      console.error(state);
       familyData.getMyFamily(famId)
          .then((res) => {
              state.family = res;
          }).catch(err => console.error('not getting my family', err));
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
              commit('userProfileImageAfterUpload');
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
          userData.getSingleUser(payload.uid)
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
                    // call the stateIsIn action
              }).catch(err => console.error(err, 'no user on refresh'));
      },
      // needs to receive payload from user input catpure in Header.vue
      upadteUserProfile: ({ commit }, payload) => {
        commit('UpdateOrAddUserName', payload);
        commit('showFamilyMemberBubbles');
      },
      updateUserProfileImage: ({ commit }, payload) => {
        commit('updateUserProfileImageAction', payload);
      },
      refreshUserProfileImageAfterUpload: ({ commit }, payload) => {
        commit('userProfileImageAfterUpload');
      },
      addNewFoodToList: ({ commit }, payload) => {
        // If no grocerylist is assocated w user, we must FIRST create that table, then take its PK and pass it as our remaing FK for new Item
        itemsData.addItem(payload)
          .then((resp) => {

          })
          .catch(err => console.error(err));
      },
      deleteThisUser: ({ commit }, payload) => {
        userData.deleteUser(payload.uid)
          .then()
          .catch(err => console.error(err));
      },
     showFamilyMembers: ({ commit }, payload) => {
        commit('showFamilyMemberBubbles');
     },
     increaseKeyCountGroceryList: ({ commit }, payload) => {
        commit('increaseGroceryListKey');
     },
     // getter in store calls this action
     stateIsInUpdateKeys: ({ commit }, payload) => {
        // Header flag invites, family member bubbles, profile pic are currently using setTimeout
        console.log(this.state.user, 'state is in');
        commit();
     },
     getFamily: ({ commit }, payload) => {
        console.error('getFamily');
        commit('updateFamilyMembers');
    }
  },
});
