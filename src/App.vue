<template>
    <div class="container">
        <div class="row">
            <div class="col">

                <transition>
                    <router-view name="header-top"></router-view>
                </transition>
                

                <transition>
                    <!-- home component -->
                    <router-view></router-view>
                </transition>

                <transition>
                    <router-view name="myList"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './Components/Header.vue'; 
    import Home from './Components/Home.vue';
    import List from './Components/List.vue';
    export default {
        components: {
            appHeader: Header,
            appHome: Home,
            appList: List
        }
    }
</script>