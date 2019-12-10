<template>
    <div class="divWrapper animated bounceIn">
        <h1 class="myH1">{{ h1Text }}</h1>
        <!-- <div class="addItemBtnDiv1">
            <button class="btn addAnItemBtn">Add To Your List!</button>
        </div> -->
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
