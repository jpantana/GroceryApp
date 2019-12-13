<template>
        <div class="d-block text-center">
            <b-container fluid>
                <b-row>
                    <label for="getFirstName">Firstname</label>
                    <b-form-input
                        v-model.lazy="updateUser.firstName"
                        placeholder="Enter your firstname"
                        id="getFirstName"
                    ></b-form-input>
                </b-row>
                <b-row>
                    <label for="getLastName">LastName</label>
                    <b-form-input
                        v-model.lazy="updateUser.lastName"
                        placeholder="Enter your lastname"
                        id="getLastName"
                        v-on:keyup.enter.native="updateThisUser"
                    ></b-form-input>
                </b-row>
                <button @click.prevent="updateThisUser" class="btn submitBtn">Save Changes</button>
            </b-container>
        </div>
</template>

<script>
    export default {
        props: ['updateUser'],
        methods: {
            updateThisUser() {
                this.$emit('updatedUserInfo');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
    .submitBtn {
        border: 1px solid $mainBlue;
        background-color: $mainBlue;
        color: $fontColorLight;
        width: 100%;
        margin-top: 1em;
        &:hover {
            transition: .4s;
            transform: scale(1.03);
            color: $fontColorLight;
        }
    }
</style>
