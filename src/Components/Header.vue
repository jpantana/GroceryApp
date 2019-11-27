<template>
    <nav class="">
        <!-- BRAND -->
        <a class="navbarBrand" href="#">SweetCarts</a>

        <div class="navItemsWrapper" id="">
            <!-- SEARCH NAV -->
            <!-- <form class="">
                <input class="" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success submitBtn" type="submit">Search</button>
            </form> -->

         <!-- LINKS -->
            <ul class="navBtns">
                <li style="list-style-type: none;">
                    <router-link to="/" tag="li" active-class="active" exact>
                        <a class="navbarLinks">Recipes <span class="sr-only">(current)</span></a>
                    </router-link>
                </li>
                <li style="list-style-type: none;">
                    <router-link to="/list" tag="li" active-class="active" exact>
                        <a class="navbarLinks">Lists <span class="sr-only">(current)</span></a>
                    </router-link>
                </li>
            </ul>
            <button @click.prevent="firebaseLogout" class="btn btn-danger">Logout</button>
        </div>
    </nav>
</template>

<script>
    import firebase from 'firebase/app';
    export default {
        methods: {
            firebaseLogout() {
                firebase.auth().signOut();
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';

    nav {
        display: flex;
        width: 100%;
        height: 6em;
        flex-flow: row nowrap;
        justify-content: space-between;
        background-color: $mainBlue;
        // border-bottom: 15px solid $mainPink;
        .navItemsWrapper {
            display: flex;
            flex-direction: row;
            margin: auto;
            .navBtns {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                margin-top: 12px;
            .navbarLinks {
                margin: .6em;
                padding: 15px 4px;
                color: $fontColorLight;
                font-family: $regFont;
                font-weight: 800;
                font-size: 1.8em;
                text-decoration: none;
                letter-spacing: -.06ch;
                &:hover {
                        transition: .7s;
                        color: $hoverLightFont;
                        // color: $mainPink;
                        // text-shadow: -1px 1px 9px rgba(255,255,255,.5);
                        border-top: 8px solid rgba(255, 255, 255, .8);
                    }
                }
            }
        }
        
        .navbarBrand {
            margin: auto;
            width: 60%;
            color: $fontColorLight;
            font-size: 3.5em;
            font-family: $brandFont;
            &:hover {
                text-decoration: none;
                transition: .8s;
                // text-shadow: -1px 1px 9px rgba(255,255,255,.5);
                color: $hoverLightFont;
            }
        }
    }
</style>