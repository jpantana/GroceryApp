<template>
    <div class="divWrapper">
        <div class="bannerDiv animated fadeIn">
            <h4 class="banner" v-show="!signUp">Join Sweet Carts today!</h4>
            <h4 class="banner animated fadeIn" v-show="signUp">Create Your Account</h4>
        </div>
        <form class="animated fadeIn">
            <!-- SIGN UP FORM SECTION -->
            <div v-show="signUp" class="animated fadeIn">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input v-model.lazy="user.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input v-model.lazy="user.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <hr>
                <div class="form-group">
                    <label for="userFirstName">First Name</label>
                    <input novalidate="true" v-model.lazy="user.firstName" type="text" class="form-control" id="exampleInputFirstname1" aria-describeby="firstname" placeholder="First name">
                </div>

                <div class="form-group">
                    <label for="userLastName">Last Name</label>
                    <input v-model.lazy="user.lastName" type="text" class="form-control" id="exampleInputLastname1" aria-describeby="lastname" placeholder="Last name">
                </div>

                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label v-model="user.subscribe = true" class="form-check-label" for="exampleCheck1">Subscribe to our montly email</label>
                </div>
                <hr>
                <button type="submit" @click.prevent="submitNewEmailSignup(user)" class="btn submitBtn">Submit</button>
            </div>


            <!-- SIGN IN EXISTING USER FORM SECTION -->
            <div v-show="signIn" class="animated fadeIn">
                    <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input v-model.lazy="user.email" type="email" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp2" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword2">Password</label>
                    <input v-model.lazy="user.password" type="password" class="form-control" id="exampleInputPassword2" placeholder="Password">
                </div>

                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck2">
                    <label v-model="user.subscribe = true" class="form-check-label" for="exampleCheck2">Subscribe to our montly email</label>
                </div>

                <button type="submit" @click.prevent="existingEmailSignIn(user)" class="btn submitBtn">Sign In</button>
                <hr>
            </div>

            <!-- LOGIN OPTIONS SECTION -->

            <button v-show="!signUp" type="submit" @click.prevent="makeNewEmailPasswordAcct" class="btn submitBtn">Sign Up</button>
             <hr>
            <div class="googleBtnDiv">
                    <button class="btn googleBtn" @click.prevent="loginGoogleEvent">
                        <GoogleIcon id="googleIcon"/>
                        <span>Login with Google</span>
                    </button>
                </div>
            <hr>

            <div class="registeredDiv">
                <p v-show="!signIn">Already have an account? Sign in here</p>
                <button v-show="!signIn" type="submit" @click.prevent="signBackIn" class="btn submitBtn">Log In</button>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import 'animate.css';
    import GoogleIcon from '../../assets/googleLogo.svg';

    export default {
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    subscribe: false
                },
                signUp: false,
                signIn: false
            }
        },
        methods: {
            ...mapActions([
                'loginGoogleEvent',
                'submitNewEmailSignup',
                'existingEmailSignIn'
            ]),
            makeNewEmailPasswordAcct() {
                this.signIn = false;
                this.signUp = true;
            },
            signBackIn() {
                this.signIn = true;
                this.signUp = false;
            }
        },
        components: {
            GoogleIcon
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
    .divWrapper {
        padding: 4em 1em;
        margin: auto;
        width: 25em;
    }
    button {
        &:hover {
            color: white !important;
        }
    }
    .bannerDiv {
        // background-color: $mainBlue;
        background: $blueGradient;
        height: 4em;
        border: 1px solid $mainBlue;
        border-radius: 4px 4px 0 0;
        .banner {
            position: relative;
            top: 17px;
            font-weight: 600;
            letter-spacing: -.03ch;
            font-size: 24px;
            color: $fontColorLight;
            text-align: center;
        }
    }
    form {
        border: .5px solid $mainBlue;
        border-radius: 0 0 4px 4px;
        padding: 1em;
        font-family: $regFont;
        input {
            border-color: $mainBlue;
        }
        .googleBtn {
            border: 1px solid $mainBlue;
            margin: auto;
            // background: $blueGradient;
            background-color: $mainBlue;
            color: $fontColorLight;
            width: 100%;
            height: 3em;
            // font-family: Helvetica, sans-serif;
            font-size: 16px;
            &:hover {
                transition: .7s;
                transform: scale(1.1);
            }
            span {
                font-size: 20px;
                float: left;
            }
            #googleIcon {
                max-height: 2em;
                max-width: 2em;
                margin-right: 2.7em;
                float: left;
            }
        }
        .submitBtn {
            border: 1px solid $mainBlue;
            // background: $blueGradient;
            background-color: $mainBlue;
            color: $fontColorLight;
            width: 100%;
            &:hover {
                transition: .7s;
                transform: scale(1.1);
            }
        }
        .registeredDiv {
            position: relative;
            z-index: 100;
        }
    }

    @media (max-width: 400px) {
        .divWrapper {
                width: 20em !important;
                span {
                    font-size: 18px !important;
                    margin-left: -20px;
                }
                #googleIcon {
                    max-height: 2em;
                    max-width: 2em;
                    margin-right: -1em;
                    float: left;
                }
            }
    }
</style>
