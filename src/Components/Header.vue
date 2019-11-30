<template>
    <nav class="myNav">
        <!-- BRAND -->
        <div class="brandDiv animated rotateIn">
            <a class="navbarBrand" href="#">Sweet<span id="carts">Carts</span></a>
            <!-- <p class="brandTag">shop together. stay together</p> -->
        </div>

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
                        <a class="navbarLinks">Home <span class="sr-only">(current)</span></a>
                    </router-link>
                </li>
                <li style="list-style-type: none;">
                    <router-link to="/list" tag="li" active-class="active" exact>
                        <a class="navbarLinks">Lists <span class="sr-only">(current)</span></a>
                    </router-link>
                </li>
            </ul>

            <!-- DROP DOWN -->
            <!-- Bootstrap vue option. cannot remove caret and not sure why -->
            <!-- <div class="settingsDiv">
                <b-dropdown variant="success" right no-caret text="">    
                    <span slot="text">Split Dropdown Button<font-awesome-icon icon="angle-down" class="faAngle" /></span>

                    <b-dropdown-item href="#">Action</b-dropdown-item>
                    <b-dropdown-item href="#">Another action</b-dropdown-item>
                    <b-dropdown-item href="#">Something else here</b-dropdown-item>
                </b-dropdown>
            </div> -->

            <div class="dropdown settingsDiv">
                <button class="btn btn-secondary dropdown-toggle myDropdownBtn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" no-caret>
                    <font-awesome-icon icon="angle-down" class="faAngle" @click="showLeftDropdown = !showLeftDropdown" />
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <a class="logoutBtn dropdown-item" href="#" @click.prevent="firebaseLogout" >Logout</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </div>


            <!-- <div class="settingsDiv">
                <font-awesome-icon icon="angle-down" class="faAngle" @click="showLeftDropdown = !showLeftDropdown" />
                <div v-click-outside="clickedOutsideDropdown" class="leftDropdownDiv animated fadeIn" v-show="showLeftDropdown">
                    <div class="logoutBtn" @click.prevent="firebaseLogout" >Logout</div>
                </div>
            </div> -->
        </div>
    </nav>
</template>

<script>
    import firebase from 'firebase/app';
    import 'animate.css';

    export default {
        methods: {
            firebaseLogout() {
                firebase.auth().signOut();
            }
        },
        data() {
            return {
                showLeftDropdown: false,
            }
        },
        events: {
            clickedOutsideDropdown(event) {
                this.showLeftDropdown = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';

    nav {
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
                        border-top: 8px solid rgba(255, 255, 255, .8);
                    }
                }
            }
            .settingsDiv {
                // display: flex;
                // flex-direction: row;
                // justify-content: flex-end;
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
                    }
                }
                .dropDownBtn {

                }
                .leftDropdownDiv {
                    position: fixed;
                    width: 12em;
                    height: 12em;
                    top: 4.4em;
                    right: 1.7em;
                    background-color: rgba(111, 109, 109, 0.4);
                    border-radius: 2px;
                    box-shadow: 1px 5px 5px lightgray;
                    .logoutBtn {
                        cursor: pointer;
                        // border: 1px solid $mainBlue;
                        font-size: 23px;
                        font-family: $regFont;
                        background-color: $mainWhite;
                        color: rgba(0, 0, 0, 0.7);
                        &:hover {
                            transition: .7s;
                            // transform: scale(1.1);
                        }
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
</style>