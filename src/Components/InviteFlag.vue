<template>
    <div>
        <!-- MODAL 2 HERE -->
        <b-modal ref="my-modal2" hide-footer title="You've been invited to share your lists">
            <div class="divContainsModal2">
                <p>You've been invited to share lists with {{ this.otherUser.firstName }} {{ this.otherUser.lastName }}</p>
                <div class="divAcceptDecline">
                    <button @click="acceptOrDecline(true)" class="btn accept">Accept</button>
                    <button @click="acceptOrDecline(false)" class="btn decline">Decline</button>
                </div>
            </div>
        </b-modal>

        <div class="invitesDiv" v-show="invites.length > 0">
            <font-awesome-icon
                icon="flag"
                id="linkToJoinFamily"
                class="faFlag animated bounceIn flagIcon"
                @click="showInvites"
            ></font-awesome-icon>
        </div>
    </div>
</template>

<script>
    import 'animate.css';
    import invitationData from '../helpers/data/invitationData.js';
    import userData from '../helpers/data/usersData.js';
    export default {
        data() {
            return {
                recipient: '',
                famId: '',
                otherUser: '',
                invites: [],
            }
        },
        methods: {
            showInvites() {
                this.$refs['my-modal2'].toggle('#linkToJoinFamily');
            },
            listenForInvites() {
                invitationData.getInvites(this.recipient)
                    .then((res) => {
                        this.invites = res;
                        if (this.invites.length > 1) {
                            // loop over invites and display options to this user
                            // for now you'll only see most recent invite
                        } else if (this.invites.length ==1 ) {
                            const id = this.invites[0].fromId;
                            this.famId = this.invites[0].familyId;
                            userData.getSingleUserById(id)
                                .then(resp => this.otherUser = resp[0])
                                .catch(err => console.error(err));
                        }
                    }).catch(err => console.error(err));
            },
            acceptOrDecline(bool) {
                if (bool) {
                    // code here updates user and deletes invite
                    userData.changeFamily(this.recipient, this.famId)
                        .then((res) => {
                            if (this.invites.length == 1) {
                                // Deletes the invitation
                                invitationData.deleteInvitation(this.invites[0].id)
                                    .then(() => {
                                        this.$state.dispatch('showFamilyMemberBubbles');
                                        then.$state.dispatch('updateInviteFlagKey');
                                    })
                                    .catch(err => console.error(err));
                             }
                    }).catch(err => console.error(err));
                } else if (!bool) {
                    // deletes the invitation
                    if (this.invites.length == 1) {
                        invitationData.deleteInvitation(this.invites[0].id)
                            .then().catch(err => console.error(err));
                        }
                }
                this.$refs['my-modal2'].toggle('#linkToJoinFamily');
            },
        },
        mounted() {
                this.recipient = this.$store.state.user.id;
                this.listenForInvites();
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';

    .invitesDiv {
        width: 20px;
        height: auto;
        margin-right: 5px;
        &:hover {
            transform: scale(1.2);
            transition: .4s;
        }
        .flagIcon {
            margin-top: 9px;
            color: $secondBlue;
            &:hover {
                cursor: pointer;
                transform: scale(1.2);
                transition: .4s;
                color: $secondBlueHover;
            }
        }
    }

    // MODAL
.divContainsModal2 {
    .divAcceptDecline {
        display: flex;
        flex-direction: row;
        justify-content: center;
        .accept {
            border: 1px solid $mainBlue;
            margin-right: 0;
            border-radius: 12px 0 0 12px;
            background-color: $mainBlue;
            color: $fontColorLight;
            width: 5em;
            &:hover {
                transition: .7s;
                transform: scale(1.05);
            }
        }
        .decline {
            border: 1px solid $secondBlue;
            margin-left: 0;
            border-radius: 0px 12px 12px 0px;
            background-color: $secondBlue;
            color: $fontColorLight;
            width: 5em;
            &:hover {
                transition: .7s;
                transform: scale(1.05);
            }
        }
    }
}
</style>