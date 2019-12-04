<template>
    <nav id="myNav">
        <!-- BRAND -->
        <div class="brandDiv animated rotateIn">
            <a class="navbarBrand" href="#">Sweet<span id="carts">Carts</span></a>
            <!-- <p class="brandTag">shop together. stay together</p> -->
        </div>

        <div class="navItemsWrapper" id="navItemsWrapperId">
            <!-- SEARCH NAV -->
            <!-- <form class="">
                <input class="" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success submitBtn" type="submit">Search</button>
            </form> -->

            <!-- LINKS -->
            <ul class="navBtns">
                <!-- <router-link v-for="link in links" :key="link.id" :to="{ name: link.page }" exact style="list-style-type: none;">
                    <div class="homeWrapper">
                        <font-awesome-icon icon={{link.icon}} class="faHome animated bounceIn" />
                        <a class="navbarLinks animated bounceIn">{{ link.text }}</a>
                    </div>
                </router-link> -->
                <div class="homeWrapper">
                    <router-link 
                        id="homeLink" 
                        :to="{ name: 'myHome' }" 
                        tag="a" 
                        exact 
                        class="navbarLinks animated bounceIn"
                    >
                    <font-awesome-icon icon="home" class="faHome animated bounceIn" /><br>
                    Home</router-link>
                </div>

                <div class="listWrapper">
                    <router-link
                        id="listLink" 
                        :to="{ name: 'myList' }"
                        tag="a" 
                        exact 
                        class="navbarLinks animated bounceIn"
                    >
                    <font-awesome-icon icon="list" class="faList animated bounceIn" /><br>
                    Lists
                    </router-link>
                </div>
            </ul>

            <div class="dropdown settingsDiv">
                <button class="btn btn-secondary dropdown-toggle myDropdownBtn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" no-caret>
                    <font-awesome-icon icon="angle-down" class="faAngle animated bounceIn" />
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <a class="logoutBtn dropdown-item" href="#" @click.prevent="firebaseLogout" >Logout</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import firebase from 'firebase/app';
    import { router } from '../main.js';
    import 'animate.css';

    export default {
        data() {
            return {
                
            }
        },
        methods: {
            firebaseLogout() {
                firebase.auth().signOut()
                    .then(() => {
                        localStorage.removeItem('user-token');
                        router.push({ name: 'myHome', path: '/' })
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
    #myNav {
        display: flex;
        width: 100%;
        height: 8em;
        flex-flow: row nowrap;
        justify-content: space-between;
        background: $blueGradient;
        .navItemsWrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 2em 3em 0 0;
            .navBtns {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                margin-top: 5px;
                .navbarLinks {
                    color: $fontColorLight;
                    font-family: $regFont;
                    font-weight: 800;
                    font-size: 1.8em;
                    text-decoration: none;
                    letter-spacing: -.06ch;
                    // display: flex;
                    // flex-direction: column;
                    // justify-content: flex-start;
                    &:hover {
                        cursor: pointer;
                    }
                }
                .homeWrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin: 0 2em;
                    margin-top: -2em;
                    padding: 1em 0 0 0;
                    &:hover {
                        transition: .7s;
                        color: $hoverLightFont;
                        border-top: 8px solid rgba(255, 255, 255, .8);
                    }
                    .faHome {
                        color: $fontColorLight;
                        font-size: 37px;
                        margin: auto;
                        position: relative;
                        left: .5em;
                        &:hover {
                            cursor: pointer;
                        }
                    }
                }
                .listWrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin: 0 2em;
                    margin-top: -2em;
                    padding: 1em 0 0 0;
                    &:hover {
                        transition: .7s;
                        color: $hoverLightFont;
                        border-top: 8px solid rgba(255, 255, 255, .8);
                    }
                    .faList {
                        color: $fontColorLight;
                        font-size: 37px;
                        margin: auto;
                        position: relative;
                        left: .25em;
                        &:hover {
                            cursor: pointer;
                        }
                    }
                }

            }
            // DROPDOWN
            .settingsDiv {
                padding: 0;
                .myDropdownBtn {
                    border: none;
                    background-color: transparent;
                    height: 45px;
                    width: 45px;
                    margin: 10px -20px 0 30px;
                    &:hover {
                        border: none !important;
                        background-color: transparent;
                        outline: 0;
                    }
                    &:focus {
                        outline: none !important;
                        box-shadow: none !important;
                    }
                }
                .dropdown-toggle:after { 
                    content: none;
                }
                .dropdown-menu {
                    background-color:rgba(206, 202, 202, 0.5);
                }
                .faAngle {
                    color: $fontColorLight;
                    font-size: 27px;
                    &:hover {
                        cursor: pointer;
                        transform: scale(1.2);
                        transition: .8s;
                    }
                }
            }
        }
        .brandDiv {
            background-color: white;
            border-radius: 50%;
            height: auto;
            width: 7.5em;
            margin: 0px 0 0 2em;
            .navbarBrand {
                margin: auto;
                color: $mainBlue;
                font-size: 3em;
                letter-spacing: -.06ch;
                font-family: $font1;
                position: relative;
                left: -.07em;
                top: .2em;
                text-shadow: 1px 1px 1px rgb(225, 225, 225);
                &:hover {
                    text-decoration: none;
                    transition: .8s;
                }
                #carts {
                    position: relative;
                    top: .7em;
                    left: -1.4em;
                }
            }
        }
    }
    
    // MOBILE
@media (max-width: 550px) {
    #myNav {
        height: 6.5em;
        display: flex;
        flex-flow: row nowrap;
        .navItemsWrapper {
            margin: auto 0;
            .navBtns {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                margin-top: 12px;
                .navbarLinks {
                    font-size: 1em;
                    .faHome {
                        font-size: 27px;
                        left: .23em;
                    }
                    .faList {
                        font-size: 27px;
                        left: .09em;
                    }
                }
            }
        }
    }
    .brandDiv {
        width: 6em !important;
        height: 6em !important;
        margin: .25em 0 0 1em !important;
        margin-left: 1em;
        .navbarBrand {
            font-size: 2.35em !important;
        }
    }
    .homeWrapper {
        margin: auto 15px !important;
    }
    .listWrapper {
        margin: auto 15px !important;
    }
    .dropdown-toggle {
        margin: 2em auto !important;
    }
}
</style>