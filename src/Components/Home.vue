<template>
    <div class="divWrapper animated bounceIn">
        <app-user-profile></app-user-profile>
    </div>
</template>

<script>
    import usersData from '../helpers/data/usersData.js';
    import UserProfile from './UserProfile.vue';
    import 'animate.css';
    export default {
        data() {
            return {
                users: []
            }
        },
        components: {
            appUserProfile: UserProfile
        },
        methods: {
            callUsers() {
                usersData.getAllUsers()
                    .then((res) => {
                        this.users = res;
                    }).catch();
            }
        },
        created() {

        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';

    .divWrapper {
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: transparent;
        width: 90%;
        height: auto;
    }
</style>
