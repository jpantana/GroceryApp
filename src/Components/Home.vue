<template>
    <div class="containerDiv">
        <div class="sideNavHome animated fadeIn">
            <app-family></app-family>
        </div>

        <div class="divWrapper animated bounceIn">
            <app-user-profile></app-user-profile>
        </div>
    </div>
</template>

<script>
    import usersData from '../helpers/data/usersData.js';
    import UserProfile from './UserProfile.vue';
    import Family from './Family.vue'
    import { store } from 'vuex';
    import 'animate.css';
    export default {
        data() {
            return {
                users: []
            }
        },
        components: {
            appUserProfile: UserProfile,
            appFamily: Family
        },
        methods: {

        },
        created() {
            this.$store.dispatch('getFamilyMembers');
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
    .containerDiv {
        display: flex;
        flex-direction: row;
        .divWrapper {
            margin: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: transparent;
            width: 90%;
            height: auto;
        }
        .sideNavHome {
            margin-right: auto;
            margin-left: 2em;
            background-color: $fontColorLight;
            min-width:13em;
            max-width:13em;
            min-height: 25em;
            box-shadow: $myShadow;
        }
    }
</style>
