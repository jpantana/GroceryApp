<template>
    <div class="myContainer">
        <transition>
            <router-view name="header-top"></router-view>
        </transition>

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

        <transition>
            <app-footer class="footer"></app-footer>
         </transition>
    </div>
</template>

<script>
    import Header from './Components/Header.vue';
    import Home from './Components/Home.vue';
    import List from './Components/List.vue';
    import SignUp from './Components/SignUp.vue';
    import Footer from './Components/Footer.vue';
    export default {
        components: {
            appHeader: Header,
            appHome: Home,
            appList: List,
            appFooter: Footer,
            appLogin: SignUp
        }
    }
</script>

<style lang="scss" scoped>
    @import '../public/main.scss';
    .myContainer {
        background-color: $shadow;
        width: 100%;
        min-height: 100vh;
        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
</style>
