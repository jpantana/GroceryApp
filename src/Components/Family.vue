<template>
    <div class="familyContainer">
        <ul class="familyUl">
            <li
                :key="`${i}member`"
                v-show="familyMembers.length > 0"
                v-for="(member, i) in familyMembers"
                class="familyLi animated fadeIn"
            >{{ member.firstName }} {{ member.lastName}}
            </li>
        </ul>
        <div class="animated bounceIn">
            <button
                class="btn famBtn"
                @click.prevent="getFamily"
            >See My Family</button>
        </div>
        <div class="inviteDiv">
            <label for="inviteInput">Invite someone to join your family</label>
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
import 'animate.css';
export default {
    data() {
        return {
            familyMembers: [],
            emailToInvite: '',
        }
    },
    props: [],
    methods: {
        getFamily() {
            this.familyMembers = this.$store.state.family;
        },
        addBtnClicked(e) {
            // code here. axios send link
            // make an invite db table (userId, senderId, familyId, dateCreated, )
            console.error('sent', e);
        }
    },
    created() {

    }
}
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
    .familyContainer {
        padding: 1em;
        .famBtn {
            border: 1px solid $mainBlue;
            background-color: $mainBlue;
            color: $fontColorLight;
            width: 100%;
            &:hover {
                transition: .7s;
                transform: scale(1.1);
            }
        }
        .familyUl {
            padding: 0;
            .familyLi {
                list-style-type: none;
                width: 100%;
                margin: 1em 0;
                text-align: center;
                padding: 4px;
                border-radius: 3px;
                background-color: $secondBlue;
                color: $fontColorLight;
                font-family: $regFont;
                font-size: 12px;
                font-style: italic;
                &:hover {
                    box-shadow: $myShadow;
                    background-color: $secondBlueHover;
                    transition: .7s;
                    cursor: pointer;
                    transform: scale(1.05);
                }
            }
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
                right: -7.3em;
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
</style>
