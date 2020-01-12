<template>
    <div class="containerDiv">
        <div class="sideNavHome animated fadeIn">
            <app-family
                :family="this.$store.state.family"
                :key="this.$store.state.whoIsInMyFamily"
            ></app-family>
        </div>

        <div class="divWrapper animated fadeIn">
            <app-user-profile
                :key="this.$store.state.keyForUserProfilePicture"
            ></app-user-profile>
        </div>
    </div>
</template>

<script>
    import usersData from '../helpers/data/usersData.js';
    import UserProfile from './UserProfile.vue';
    import Family from './Family.vue'
    import familyData from '../helpers/data/familyData.js';
    import { store } from 'vuex';
    import 'animate.css';
    import invitationData from '../helpers/data/invitationData';
    export default {
        data() {
            return {
                users: [],
                family: [],
                invites: [],
                recipient: '',
                newProfilePicture: false,
                newProfilePictureCounter: 1,
                profilePic: ''
            }
        },
        components: {
            appUserProfile: UserProfile,
            appFamily: Family
        },
        methods: {
            // getProfilePic() {
            //     this.profilePic = this.$store.state.user.photoURL;
                
            // }
        },
        mounted() {
            this.$store.dispatch('showFamilyMembers');
            // setTimeout(() => {
            //     this.getProfilePic()
            // },3000);
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
    .containerDiv {
        display: flex;
        flex-direction: row;
        justify-content: space-between !important;
        padding: 0 1em;
        width: 40em;
        margin: auto;
        .divWrapper {
            margin: auto;
            display: flex;
            flex-direction: row;
            justify-content: center;
            background-color: transparent;
            height: auto;
        }
        .sideNavHome {
            border-radius: 2px;
            margin-top: 1em;
            background-color: $fontColorLight;
            max-width:16em;
            min-width:16em;
            box-shadow: $myShadow;
        }
    }

    @media (max-width: 650px) {
        .containerDiv {
            display: flex;
            flex-direction: column;
            padding: 1em 0em;
            width: 100%;
        }
        .sideNavHome {
            margin: auto !important;
            min-width: 19em !important;
            max-width: 19em !important;
        }
    }
</style>
