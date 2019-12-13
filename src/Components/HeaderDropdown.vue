<template>
    <div class="dropdown settingsDiv">
        <button class="btn btn-secondary dropdown-toggle myDropdownBtn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" no-caret>
            <font-awesome-icon icon="angle-down" class="faAngle animated bounceIn" />
        </button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <a
                class="logoutBtn dropdown-item" href="#"
                @click.prevent="logout"
            >
            <font-awesome-icon icon="sign-out-alt" class="faSignOutAlt animated bounceIn icon" />
            Sign Out</a>
            <!-- HERE IS WHERE I WANT TO CALL MODAL TO SHOW TRUE -->
            <a
                id="linkToUpdateUserName"
                @click.prevent="updateUserProfile"
                class="dropdown-item"
                href="#"
            >
            <font-awesome-icon icon="user" class="faUser animated bounceIn icon" />
            User Profile</a>
            <!-- <a class="dropdown-item" href="#">Delete Account</a> -->
        </div>
    </div>
</template>

<script>
    import 'animate.css';
    import 'jquery';
    export default {
        props: ['updateUserProfileBtn', 'firebaseLogout'],
        methods: {
            updateUserProfile() {
                this.$emit('updateUserProfile');
            },
            logout() {
                this.$emit('firebaseLogout');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';

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
    .icon {
        color: $secondBlue;
        margin-right: 7px;
    }
    .dropdown-toggle:after {
        content: none;
        &:active {
            background-color: blue !important;
        }
        &:focus {
            background-color: blue !important;
        }
    }
    #dropdownMenuButton {
        background-color: transparent;
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

@media (max-width: 550px) {
    .dropdown-toggle {
        margin: 2em auto !important;
    }

}
</style>
