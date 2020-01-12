<template>
    <nav>
    <!-- MODAL 1 HERE -->
        <b-modal ref="my-modal" hide-footer title="Tell us more about yourself...">
            <app-header-modal
                :updateUser="updateUser"
                @updatedUserInfo="sendUpdatedUserInfo"
                @closeModal="updateUserProfileBtn"
            >
            </app-header-modal>
        </b-modal>
    <!-- MODAL 1 HERE -->
        <b-modal ref="my-modal2" hide-footer title="You've been invited to share your lists">
            <div class="divContainsModal2">
                <p>You've been invited to share lists with {{ this.otherUser.firstName }} {{ this.otherUser.lastName }}</p>
                <div class="divAcceptDecline">
                    <button @click="acceptOrDecline(true)" class="btn accept">Accept</button>
                    <button @click="acceptOrDecline(false)" class="btn decline">Decline</button>
                </div>
            </div>
        </b-modal>
        <div  id="myNav">
        <!-- BRAND -->
            <div class="brandDiv animated rotateIn">
                <a class="navbarBrand" href="#">Sweet<span id="carts">Carts</span></a>
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

                <app-dropdown
                    @firebaseLogout="firebaseLogout"
                    @updateUserProfile="updateUserProfileBtn"
                ></app-dropdown>
            </div>
        </div>

        <div id="bottomNavBar">
            <span class="userProfileSpan">
                <div class="userProfCondDiv" v-show="!user.length">
                    <font-awesome-icon icon="user" class="faAngle animated bounceIn userIcon" />
                    <p class="usersName">{{ this.$store.state.user.firstName }}</p>
                </div>
            </span>
            <div class="invitesDiv" v-show="invites.length > 0">
                <font-awesome-icon
                    icon="flag"
                    id="linkToJoinFamily"
                    class="faFlag animated bounceIn flagIcon"
                    @click="showInvites"
                ></font-awesome-icon>
            </div>
        </div>
    </nav>
</template>

<script>
    import firebase from 'firebase/app';
    import invitationData from '../helpers/data/invitationData.js';
    import { store } from 'vuex';
    import userData from '../helpers/data/usersData.js';
    import { mapActions } from 'vuex';
    import { router } from '../main.js';
    import 'animate.css';
    import 'jquery';
    import HeaderDropdown from './HeaderDropdown.vue';
    import HeaderModal from './HeaderModal.vue';
    import 'animate.css';

    export default {
        data() {
            return {
                user: '',
                updateUser: {
                    firstName: null,
                    lastName: null
                },
                recipient: '',
                invites: [],
                otherUser: '',
                famId: '',
            }
        },
        components: {
            appDropdown: HeaderDropdown,
            appHeaderModal: HeaderModal
        },
        methods: {
            ...mapActions([
                'upadteUserProfile',
                'signOut',
                'rebuildStateAfterRefresh'
            ]),
            updateUserProfileBtn() {
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
            listenForInvites() {
                invitationData.getInvites(this.recipient)
                    .then((res) => {
                        this.invites = res;
                        if (this.invites.length > 1) {
                            // loop over invites and display options to this user
                        } else if (this.invites.length ==1 ) {
                            const id = this.invites[0].fromId;
                            this.famId = this.invites[0].familyId;
                            userData.getSingleUserById(id)
                                .then(resp => this.otherUser = resp[0])
                                .catch(err => console.error(err));
                        }
                    }).catch(err => console.error(err));
            },
            showInvites() {
                this.$refs['my-modal2'].toggle('#linkToJoinFamily');
            },
            acceptOrDecline(bool) {
                if (bool) {
                    // code here updates user and deletes invite
                    userData.changeFamily(this.recipient, this.famId)
                        .then((res) => {
                            if (this.invites.length == 1) {
                                // Deletes the invitation
                                invitationData.deleteInvitation(this.invites[0].id)
                                    .then(() => this.$state.dispatch('showFamilyMemberBubbles'))
                                    .catch(err => console.error(err));
                             }
                    }).catch(err => console.error(err));
                } else if (!bool) {
                    // deletes the invitation
                    if (this.invites.length == 1) {
                        invitationData.deleteInvitation(this.invites[0].id)
                            .then().catch(err => console.error(err));
                        }
                }
                this.$refs['my-modal2'].toggle('#linkToJoinFamily');
            }
        },
        created() {
            // check for firebase user and dispatch a login action for axios comparison
            firebase.auth().onAuthStateChanged((fbUser) => {
                if (fbUser) {
                    this.$store.dispatch('rebuildStateAfterRefresh', fbUser);
                }
            });
        },
        mounted() {
            setTimeout(() => {
                this.recipient = this.$store.state.user.id;
                this.listenForInvites();
            },2500);
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
        // background-color: $secondBlue;
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
        .invitesDiv {
            width: 20px;
            height: auto;
            margin-right: 5px;
            &:hover {
                transform: scale(1.2);
                transition: .4s;
            }
            .flagIcon {
                margin-top: 9px;
                color: $secondBlue;
                &:hover {
                    cursor: pointer;
                    transform: scale(1.2);
                    transition: .4s;
                    color: $secondBlueHover;
                }
            }
        }
    }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// MODAL
.divContainsModal2 {
    .divAcceptDecline {
        display: flex;
        flex-direction: row;
        justify-content: center;
        .accept {
            border: 1px solid $mainBlue;
            margin-right: 0;
            border-radius: 12px 0 0 12px;
            background-color: $mainBlue;
            color: $fontColorLight;
            width: 5em;
            &:hover {
                transition: .7s;
                transform: scale(1.05);
            }
        }
        .decline {
            border: 1px solid $secondBlue;
            margin-left: 0;
            border-radius: 0px 12px 12px 0px;
            background-color: $secondBlue;
            color: $fontColorLight;
            width: 5em;
            &:hover {
                transition: .7s;
                transform: scale(1.05);
            }
        }
    }
}



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
}
</style>
