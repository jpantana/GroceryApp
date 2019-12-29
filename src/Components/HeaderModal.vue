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
                        ref="myFiles"
                        v-on:keyup.enter.native="updateThisUser"
                    ></b-form-input>
                </b-row>
                <b-row>
                    <p>Start a group to share lists with friends, family, and collegues</p>
                </b-row>

                <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~  submit  ~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                <button @click.prevent="updateThisUser" class="btn submitBtn">Save Changes</button>

                <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~  upload profile picture  ~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                <app-upload-image
                    @closeThisModal="closeModalMid"
                ></app-upload-image>
            </b-container>
        </div>
</template>

<script>
    import UploadImage from './UploadImage.vue';
    export default {
        components: {
            appUploadImage: UploadImage
        },
        props: ['updateUser', 'closeModal'],
        methods: {
            updateThisUser() {
                this.$emit('updatedUserInfo');
            },
            // calls back to updateUserProfileBtn which toggles my-modal
            // this function passes to upload-image comp and it uses closingModal funct to emit to this func, then back to header
            closeModalMid() {
                this.$emit('closeModal');
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
