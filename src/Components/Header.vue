<template>
    <nav>
    <!-- MODAL HERE -->
        <b-modal ref="my-modal" hide-footer title="Tell us more about yourself...">
            <div class="d-block text-center">
                <b-container fluid>
                    <b-row>
                        <label for="getFirstName">Firstname</label>
                        <b-form-input  v-model.lazy="updateUser.firstName" placeholder="Enter your firstname" id="getFirstName"></b-form-input>
                    </b-row>
                    <b-row>
                        <label for="getLastName">LastName</label>
                        <b-form-input  v-model.lazy="updateUser.lastName" placeholder="Enter your lastname" id="getLastName"></b-form-input>
                    </b-row>
                    <button @click.prevent="sendUpdatedUserInfo" class="btn btn-primary">Save Changes</button>
                </b-container>
            </div>
        </b-modal>

        <div  id="myNav">
        <!-- BRAND -->
            <div class="brandDiv animated rotateIn">
                <a class="navbarBrand" href="#">Sweet<span id="carts">Carts</span></a>
                <!-- <p class="brandTag">shop together. stay together</p> -->
            </div>

            <div class="navItemsWrapper" id="navItemsWrapperId">
                <!-- LINKS -->
                <ul class="navBtns">
                    <div class="homeWrapper">
                        <router-link
                            id="homeLink"
                            :to="{ name: 'myHome' }"
                            tag="a"
                            exact
                            class="navbarLinks animated bounceIn"
                        >
                        <font-awesome-icon icon="home" class="faHome animated bounceIn" /><br>
                        Home</router-link>
                    </div>

                    <div class="listWrapper">
                        <router-link
                            id="listLink"
                            :to="{ name: 'myList' }"
                            tag="a"
                            exact
                            class="navbarLinks animated bounceIn"
                        >
                        <font-awesome-icon icon="list" class="faList animated bounceIn" /><br>
                        Lists
                        </router-link>
                    </div>
                </ul>

                <!-- Stretch: make this its own component -->
                <div class="dropdown settingsDiv">
                    <button class="btn btn-secondary dropdown-toggle myDropdownBtn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" no-caret>
                        <font-awesome-icon icon="angle-down" class="faAngle animated bounceIn" />
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <a class="logoutBtn dropdown-item" href="#" @click.prevent="firebaseLogout" >Sign Out</a>
                        <!-- HERE IS WHERE I WANT TO CALL MODAL TO SHOW TRUE -->
                        <a
                            id="linkToUpdateUserName"
                            @click.prevent="updateUserProfileBtn"
                            class="dropdown-item"
                            href="#"
                        >User Profile</a>
                        <!-- <a class="dropdown-item" href="#">Delete Account</a> -->
                    </div>

                </div>
            </div>
        </div>

        <div id="bottomNavBar">
            <span class="userProfileSpan">
                <div class="userProfCondDiv" v-show="!user.length">
                    <font-awesome-icon icon="user" class="faAngle animated bounceIn userIcon" />
                    <p class="usersName">{{ this.$store.state.user.firstName }}</p>
                </div>
            </span>
        </div>
    </nav>
</template>

<script>
    import firebase from 'firebase/app';
    import { store } from 'vuex';
    import userData from '../helpers/data/usersData.js';
    import { mapActions } from 'vuex';
    import { router } from '../main.js';
    import 'animate.css';
    import 'jquery';

    export default {
        data() {
            return {
                user: '',
                updateUser: {
                    firstName: null,
                    lastName: null
                }
            }
        },
        methods: {
            ...mapActions([
                'upadteUserProfile',
                'signOut',
                'rebuildStateAfterRefresh'
            ]),
            updateUserProfileBtn() {
                // modal call would be good here
                this.$refs['my-modal'].toggle('#linkToUpdateUserName');
            },
            sendUpdatedUserInfo() {
                this.$refs['my-modal'].toggle('#linkToUpdateUserName');
                this.$store.dispatch('upadteUserProfile', this.updateUser);
            },
            firebaseLogout() {
                firebase.auth().signOut()
                    .then(() => {
                        this.$store.dispatch('signOut');
                        router.push({ name: 'myLogin', path: '/login' })
                    });
            },
        },
        created() {
            // check for firebase user and dispatch a login action for axios comparison
            firebase.auth().onAuthStateChanged((fbUser) => {
                if (fbUser) {
                    this.$store.dispatch('rebuildStateAfterRefresh', fbUser);
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
    #myNav {
        display: flex;
        width: 100%;
        height: 8em;
        flex-flow: row nowrap;
        justify-content: space-between;
        background: $blueGradient;
        .navItemsWrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 2em 3em 0 0;
            .navBtns {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                margin-top: 5px;
                .navbarLinks {
                    color: $fontColorLight;
                    font-family: $regFont;
                    font-weight: 800;
                    font-size: 1.8em;
                    text-decoration: none;
                    letter-spacing: -.06ch;
                    &:hover {
                        cursor: pointer;
                    }
                }
                .homeWrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin: 0 2em;
                    margin-top: -2em;
                    padding: 1em 0 0 0;
                    &:hover {
                        transition: .7s;
                        color: $hoverLightFont;
                        border-top: 8px solid rgba(255, 255, 255, .8);
                    }
                    .faHome {
                        color: $fontColorLight;
                        font-size: 37px;
                        margin: auto;
                        position: relative;
                        left: .5em;
                        &:hover {
                            cursor: pointer;
                        }
                    }
                }
                .listWrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin: 0 2em;
                    margin-top: -2em;
                    padding: 1em 0 0 0;
                    &:hover {
                        transition: .7s;
                        color: $hoverLightFont;
                        border-top: 8px solid rgba(255, 255, 255, .8);
                    }
                    .faList {
                        color: $fontColorLight;
                        font-size: 37px;
                        margin: auto;
                        position: relative;
                        left: .25em;
                        &:hover {
                            cursor: pointer;
                        }
                    }
                }

            }
            // DROPDOWN
            .settingsDiv {
                padding: 0;
                .myDropdownBtn {
                    border: none;
                    background-color: transparent;
                    height: 45px;
                    width: 45px;
                    margin: 10px -20px 0 30px;
                    &:hover {
                        border: none !important;
                        background-color: transparent;
                        outline: 0;
                    }
                    &:focus {
                        outline: none !important;
                        box-shadow: none !important;
                    }
                }
                .dropdown-toggle:after {
                    content: none;
                }
                .dropdown-menu {
                    background-color:rgba(206, 202, 202, 0.5);
                }
                .faAngle {
                    color: $fontColorLight;
                    font-size: 27px;
                    &:hover {
                        cursor: pointer;
                        transform: scale(1.2);
                        transition: .8s;
                    }
                }
            }
        }
        .brandDiv {
            background-color: white;
            border-radius: 50%;
            height: auto;
            width: 7.5em;
            margin: 0px 0 0 2em;
            .navbarBrand {
                margin: auto;
                color: $mainBlue;
                font-size: 3em;
                letter-spacing: -.06ch;
                font-family: $font1;
                position: relative;
                left: -.07em;
                top: .2em;
                text-shadow: 1px 1px 1px rgb(225, 225, 225);
                &:hover {
                    text-decoration: none;
                    transition: .8s;
                }
                #carts {
                    position: relative;
                    top: .7em;
                    left: -1.4em;
                }
            }
        }
    }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// LOWER NAVBAR
    #bottomNavBar {
        background-color: $bottomNavColor;
        height: 2.5em;
        width: 100%;
        margin-bottom: 1em;
        color: $fontColorLight;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        .userProfileSpan {
            //min-width: 50px;
            margin: 10px 10px 0 0;
            .userProfCondDiv {
                width: auto;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-evenly;
                .usersName {
                    font-size: 12px;
                    color: $fontColorDark;
                    font-style: italic;
                    margin: auto;

                }
                .userIcon {
                    color: $mainBlue;
                    font-size: 15px;
                    margin-right: 5px;
                    margin-top: 2px;
                }
            }
        }
    }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// MOBILE
@media (max-width: 550px) {
    #myNav {
        height: 6.5em;
        display: flex;
        flex-flow: row nowrap;
        .navItemsWrapper {
            margin: auto 0;
            .navBtns {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                margin-top: 12px;
                .navbarLinks {
                    font-size: 1em;
                    .faHome {
                        font-size: 27px;
                        left: .23em;
                    }
                    .faList {
                        font-size: 27px;
                        left: .09em;
                    }
                }
            }
        }
    }
    .brandDiv {
        width: 6em !important;
        height: 6em !important;
        margin: .25em 0 0 1em !important;
        margin-left: 1em;
        .navbarBrand {
            font-size: 2.35em !important;
        }
    }
    .homeWrapper {
        margin: auto 15px !important;
    }
    .listWrapper {
        margin: auto 15px !important;
    }
    .dropdown-toggle {
        margin: 2em auto !important;
    }
}
</style>
