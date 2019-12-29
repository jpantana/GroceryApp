<template>
    <div class="myContainer">
        <h2 class="h2Name animated bounceIn">{{ this.$store.state.user.firstName }} {{ this.$store.state.user.lastName }}</h2>
        <div class="makeDivCirclePic">
            <font-awesome-icon v-show="profilePic.length == 0" icon="user" class="faUser aniamated fadeIn userIcon" />
            <div
                class="profilePicDiv"
                v-show="profilePic.length > 0"
            >
                <img
                    v-bind:src="profilePic"
                    alt="user profile image"
                    class="profilePic" />

            </div>
        </div>
    </div>
</template>

<script>
    import 'animate.css';
    import firebase from 'firebase/app';
    import { mapState } from 'vuex';
    import userData from '../helpers/data/usersData.js';
    export default {
        props: ['receivedNewProfilePicture', 'changedProfilePicture'],
        data() {
            return {
                profilePic: ''
            }
        },
        watch: {
            profilePic: function(val) {
                this.photo = val;
            }
        },
        beforeCreate() {
            firebase.auth().onAuthStateChanged((user) => {
                userData.getSingleUser(user.uid).then((res) => {
                    this.profilePic = res[0].photoURL;
                }).catch(err => console.error(err));
            });
        }

    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
    .myContainer {
        margin: auto;
        margin-top: 1em;
        display: flex;
        flex-direction: column;
        background-color: $secondBlue;
        border-radius: 2px;
        box-shadow: $myShadow;
        padding: 1em 2em;
        .h2Name {
            font-family: $regFont;
            font-size: 26px;
            color: $fontColorLight;
            text-align: center;
        }
        .makeDivCirclePic {
            border-radius: 15em;
            width: 15em;
            height: 15em;
            background-color: $fontColorLight;
            .userIcon {
                font-size: 150px;
                color: $secondBlue;
                position: relative;
                top: .2em;
                right: -.35em;
            }
            .profilePicDiv {
                height: 15em;
                width: auto;
                object-fit: contain;
                overflow: hidden;
                border-radius: 15em;
                .profilePic {
                    height: 15em;
                    width: auto;
                }
            }
        }
    }

    @media (max-width: 650px) {
        .myContainer {
            height: 21em !important;
        }
    }
</style>
