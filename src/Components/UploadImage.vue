<template>
    <div class="container">
        <hr>
        <p class="header">Add a Profile Picture</p>

        <div>
            <input type="file" @change="previewImage" class="uploadBtn" accept="image/*" >
        </div>
        <div>
            <p
                v-show="ifPicture"
                class="animated fadeIn"
            >Progress: {{uploadValue.toFixed()+"%"}}
            <progress
                id="progress"
                :value="uploadValue"
                max="100"
            ></progress>  </p>
        </div>
        <div v-if="imageData!=null">
            <img class="preview" :src="picture">
            <br>
            <button v-show="!changeBtn" class="btn" @click="onUpload">Upload</button>
            <button v-show="changeBtn" class="btn" @click="closingModal">Close</button>
        </div>

    </div>

</template>

<script>
    import firebase from 'firebase/app';
    import storage from 'firebase/storage';
    import userData from '../helpers/data/usersData.js';
    import 'animate.css';
    export default {
        data() {
            return {
                imageData: null,
                uploadValue: 3,
                picture: null,
                changeBtn: false,
                ifPicture: false,
            }
        },
        props: ['closeThisModal'],
        methods: {
            previewImage(event) {
                this.uploadValue=0;
                this.picture=null;
                this.ifPicture=true;
                this.imageData = event.target.files[0];
            },
            onUpload() {
                this.picture=null;
                const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
                storageRef.on(`state_changed`,snapshot => {
                    this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
                }, err=>{console.error(err.message)},
                () => {
                    this.uploadValue = 100;
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                        this.picture = url;
                        this.$store.dispatch('updateUserProfileImage', url);
                        setTimeout(() => {
                            this.ifPicture=false;
                        },1500);
                        this.changeBtn = !this.changeBtn;
                    });
                })
            },
            closingModal() {
                this.$store.dispatch('refreshUserProfileImageAfterUpload');
                this.$emit('closeThisModal');
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
    .container {
        margin: auto;
        margin-top: 1em;
        .header {
            width: auto;
            font-family: $regFont;
            font-weight: 700;
            font-size: 18px;
            text-align: center;
            // border-bottom: .5px solid lightgray;
        }
        button {
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
        img.preview {
            width: 15em;
            border-radius: 100%;
            margin-bottom: 10px;
        }
        progress {
            background-color: $secondBlue !important;
            border-radius: 5px;
        }
    }
</style>
