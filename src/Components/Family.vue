<template>
    <div class="familyContainer">
        <p class="fmHeader">Your Family</p>
        <div class="holdsBubblesDiv">
            <div
                class="familyBubbleDiv animated bounceIn"
                :key="`${i}member`"
                v-show="family.length > 0"
                v-for="(member, i) in family"
            >
                <div
                    class="familyBubbleText animated fadeIn"
                >{{ member.firstName.split("")[0] }} {{ member.lastName.split("")[0] }}
                </div>
            </div>
        </div>
        <hr>
        <div class="inviteDiv">
            <label for="inviteInput" class="inviteLabel">Invite someone to join your family</label>
            <b-form-input
                type="email"
                placeholder="email address"
                class="form-control fieldInput"
                id="inviteInput"
                aria-describedby="emailHelp"
                v-model.lazy="emailToInvite"
                v-on:keyup.enter.native="addBtnClicked"
            />
            <button
                class="btn addFamilyBtn"
                @click.prevent="addBtnClicked"
            >Send</button>
        </div>
    </div>
</template>

<script>
import usersData from '../helpers/data/usersData.js';
import invitationData from '../helpers/data/invitationData.js';
import familyData from '../helpers/data/familyData.js';
import 'animate.css';
export default {
    data() {
        return {
            familyMembers: [],
            emailToInvite: '',
            family: [],
        }
    },
    methods: {
        addBtnClicked(e) {
            // code here. axios send link
            if (this.emailToInvite.length > 1) {
                usersData.getSingleUserByEmailLookup(this.emailToInvite)
                    .then((res) =>{
                        if (res) {
                            const newInvite = {
                                FamilyId: this.$store.state.user.familyId,
                                ToId: res[0].id,
                                FromId: this.$store.state.user.id
                            };
                            invitationData.sendInvite(newInvite)
                                .then((rez) => {
                                    if (rez) {
                                        alert('invite sent');
                                        this.emailToInvite = '';
                                        }
                                    })
                                .catch(err => console.error('that user does not exist', err))
                        } else {
                            alert('Sorry. That user email does not exist');
                            this.emailToInvite = '';
                        }
                    }).catch(err => console.error(err, 'error at getSingleUserByEmailLookup'));
            }
        },
    },
    created() {
        setTimeout(() => {
            const famId = this.$store.state.user.familyId;
            familyData.getMyFamily(famId)
                .then((res) => {
                    this.family = res;
                }).catch(err => console.error('not getting my family', err));  
        }, 3000);  
    }
}
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
    .familyContainer {
        padding: 1em;
        .fmHeader {
            color: rgb(161, 161, 161);
            font-family: $regFont;
            letter-spacing: .1ch;
            font-weight: 800;
            margin: auto;
            padding: 0;
            text-align: center;
        }
        .holdsBubblesDiv {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            margin-bottom: 1.5em;
            // background-color: pink;
        .familyBubbleDiv {
                width: 3.5em;
                height: 3.5em;
                background-color: $secondBlue;
                border-radius: 3.5em;
                color: $fontColorLight;
                box-shadow: $myShadow;
                margin: .3em;
                .familyBubbleText {
                    font-family: $regFont;
                    font-weight: 800;
                    font-size: 24px;
                    letter-spacing: -.15ch;
                    color: $fontColorLight;
                    position: relative;
                    top: 10px;
                    right: -14px;
                }
            }
        }
        .inviteDiv {
            margin-top: 1em;
            .inviteLabel {
                font-family: $regFont;
                color: rgb(161, 161, 161);
                font-size: 11px;
                text-align: center;
                margin-left: 2.5em;
            }
            .fieldInput {
                border-radius: 10px;
                height: 39.25px;
                font-size: 14px;
            }
            .addFamilyBtn {
                border: 1px solid $mainBlue;
                border-radius: 0 10px 10px 0;
                background-color: $mainBlue;
                color: $fontColorLight;
                width: 33%;
                height: 39.25px;
                position: relative;
                top: -2.44em;
                right: -9.4em;
                &:hover {
                    transition: .7s;
                    background: $blueGradient;
                }
                &:active {
                    outline: none;
                    border: none;
                }
            }
        }
    }

    @media (max-width: 650px) {
        .familyContainer {
            padding-bottom: 0;
            margin-bottom: 0;
            .holdsBubblesDiv {
                margin-bottom: 0 !important;
            }
            .inviteDiv {
                margin: 0 !important;
                padding: 0 !important;
                .inviteLabel {
                    margin-left: 5em;
                }
                .addFamilyBtn {
                    position: relative;
                    right: -11.4em;
                }
            }
        }
    }
</style>
