<template>
    <div class="containerDiv">
        <div class="sideNavHome animated fadeIn">
            <app-family
                :family="family"
            ></app-family>
        </div>

        <div class="divWrapper animated bounceIn">
            <app-user-profile></app-user-profile>
        </div>

        <div>Invites
            <ul>
                <li :key="`${i}invite`" v-for="(invite, i) in invites">{{ invite.fromId }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import usersData from '../helpers/data/usersData.js';
    import UserProfile from './UserProfile.vue';
    import Family from './Family.vue'
    import familyData from '../helpers/data/familyData.js';
    import { store } from 'vuex';
    import 'animate.css';
import invitationData from '../helpers/data/invitationData';
    export default {
        data() {
            return {
                users: [],
                family: [],
                invites: []
            }
        },
        components: {
            appUserProfile: UserProfile,
            appFamily: Family
        },
        methods: {
            callGetFamily() {
                const famId = this.$store.state.user.familyId;
                familyData.getMyFamily(famId)
                .then((res) => {
                    this.family = res;
                }).catch(err => console.error('not getting my family', err));
            },
            listenForInvites() {
                const recipId = this.$store.state.user.id;
                invitationData.getInvites(recipId)
                    .then((res) => {
                        this.invites = res;
                    }).catch(err => console.error(err));
            }

        },
        created() {
            this.listenForInvites();
        },
        mounted() {
            this.callGetFamily();
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
    .containerDiv {
        display: flex;
        flex-direction: row;
        .divWrapper {
            margin: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: transparent;
            width: 90%;
            height: auto;
        }
        .sideNavHome {
            margin-right: auto;
            margin-left: 2em;
            background-color: $fontColorLight;
            min-width:13em;
            max-width:13em;
            min-height: 25em;
            box-shadow: $myShadow;
        }
    }
</style>
