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
                <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~  upload profile picture  ~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

                <div>
                    <div>
                        <p>Upload an image to Firebase:</p>
                        <input type="file" @change="previewImage" class="uploadBtn" accept="image/*" >
                    </div>
                    <div>
                        <p>Progress: {{uploadValue.toFixed()+"%"}}
                        <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
                    </div>
                    <div v-if="imageData!=null">
                        <img class="preview" :src="picture">
                        <br>
                        <button @click="onUpload">Upload</button>
                    </div>
                </div>
                <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~  submit  ~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                <button @click.prevent="updateThisUser" class="btn submitBtn">Save Changes</button>
            </b-container>
        </div>
</template>

<script>
    import firebase from 'firebase/app';
    import storage from 'firebase/storage';
    export default {
        data() {
            return {
                imageData: null,
                uploadValue: 0,
                picture: null
            }
        },
        props: ['updateUser'],
        methods: {
            updateThisUser() {
                this.$emit('updatedUserInfo');
            },
            previewImage(event) {
                this.uploadValue=0;
                this.picture=null;
                this.imageData = event.target.files[0];
            },
            onUpload () {
                this.picture=null;
                const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
                storageRef.on(`state_changed`,snapshot => {
                    this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
                }, err=>{console.log(err.message)},
                () => {
                    this.uploadValue = 100;
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                    this.picture = url;
                    });
                })
            },
        },
        watch: {
            uploadTask: function() {
            this.uploadTask.on('state_changed', sp => {
                    this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
                },
                null,
                () => {
                    this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    this.$emit('url', downloadURL)
                    })

                })
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
    .uploadBtn {

    }
    img.preview {
        width: 15em;
        border-radius: 100%;
        margin-bottom: 10px;
    }
</style>
