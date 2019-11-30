<template>
    <div class="myContainer">
        <transition>
            <router-view name="header-top"></router-view>
        </transition>
        <div class="signupWrapper">
            <transition>
                <router-view name="myLogin"></router-view>
            </transition>

            <transition>
                <!-- home component -->
                <router-view></router-view>
            </transition>

            <transition>
                <router-view name="myList"></router-view>
            </transition>
        </div>
        <transition>
            <router-view name="app-footer"></router-view>
        </transition>
        
    </div>
</template>

<script>
    import Header from './Components/Header.vue'; 
    import Home from './Components/Home.vue';
    import List from './Components/List.vue';
    import SignUp from './Components/SignUp.vue'
    export default {
        components: {
            appHeader: Header,
            appHome: Home,
            appList: List,
            appLogin: SignUp
        }
    }
</script>

<style lang="scss" scoped>
    .myContainer {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: auto;
    }
    .myWrapper {
        display: flex;
        flex-direction: row;
        padding: 1em;
        margin: 2em;
    }

</style>