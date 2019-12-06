<template>
    <div class="divWrapper animated bounceIn">
        <h1 class="myH1">{{ h1Text }}</h1>
        <button @click="callUsers">See Users</button>
        <ul>
            <li :key="i" v-for="(user, i) in users">{{ user.firstName }}</li>
        </ul>
    </div>
</template>

<script>
    import usersData from '../helpers/data/usersData.js';
    import 'animate.css';
    export default {
        data() {
            return {
                h1Text: '',
                users: []
            }
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

    div {
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: lightgray;
        width: 80%;
        height: auto;
    }
</style>
