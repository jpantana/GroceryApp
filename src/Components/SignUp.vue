<template>
    <div class="divWrapper">
        <form class="animated bounce">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input v-model.lazy="user.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model.lazy="user.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>

            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label v-model="user.subscribe = true" class="form-check-label" for="exampleCheck1">Subscribe to our montly email</label>
            </div>

            <button type="submit" @click.prevent="submitNewEmailSignup(user)" class="btn submitBtn">Sign In</button>
            <hr>
            <div class="googleBtnDiv">
                <button class="btn googleBtn" @click.prevent="loginEvent">
                    <GoogleIcon id="googleIcon"/>
                    <span>Login with Google</span>
                </button>
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
                    subscribe: false
                }
            }
        },
        methods: {
            ...mapActions([
                'loginEvent',
                'submitNewEmailSignup'
            ]),
        },
        components: {
            GoogleIcon,
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
    form {
        border: .5px solid $mainBlue;
        border-radius: 4px;
        padding: 1em;
        font-family: $regFont;
        input {
            border-color: $mainBlue;
        }
        // .googleBtnDiv {
        //     margin: auto;
        // }
        .googleBtn {
            border: 1px solid $mainBlue;
            margin: auto;
            background: $blueGradient;
            color: $fontColorLight;
            width: 100%;
            // text-align: left;
            
            height: 3em;
            // letter-spacing: .2ch;
            font-family: Helvetica, sans-serif;
            // display: flex;
            // flex-direction: row;
            // justify-content: center;
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
                margin-right: 1.4em;
                float: left;
            }
        }
        .submitBtn {
            border: 1px solid $mainBlue;
            background: $blueGradient;
            color: $fontColorLight;
            &:hover {
                transition: .7s;
                transform: scale(1.1);
            }
        }
    }
</style>