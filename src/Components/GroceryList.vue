<template>
<!-- SELECT GROCERY LIST (i.e. Party, etc.) -->
    <div class="selectDiv">

    <app-modal
        :showModal="showModal"
        @deleteListAndItems="deleteListAndItems"
    ></app-modal>

        <div class="secondDiv">
            <span class="spanPlus">
                <font-awesome-icon
                    icon="plus"
                    class="faPlus animated bounceIn plusIcon"
                    @click="addGroceryList = !addGroceryList"
                />
            </span>

            <form class="aniamted fadeIn myFormForDropDown">
                <div class="form-group dropDownDiv">
                    <!-- <label for="GroceryStore">My grocery lists</label> -->
                    <select
                        name="GroceryStore"
                        id="groceryStoreSelect"
                        class="form-control"
                        v-model="selected"
                    >
                        <option
                            :key="list.id"
                            :id="`${list.id}`"
                            v-for="list in groceryLists"
                        >{{ list.name }}</option>
                    </select>
                </div>
            </form>

            <font-awesome-icon
                icon="backspace"
                class="faBackspace animated fadeIn"
                @click="deleteListAndItemsModal" />
        </div>

        <div
            class="makeNewDiv animated fadeIn"
            v-show="addGroceryList">
        <hr>
            <b-container class="formContainer animated fadeIn" fluid>
                <b-row>
                    <b-form-input
                        class="fieldInput"
                        v-on:keyup.enter.native="callBackToListWithNewList"
                        v-model.lazy="listName"
                        placeholder="e.g. Brunch List"
                        id="exampleInputAddGroceryList1">
                    </b-form-input>
                </b-row>
                <button @click="callBackToListWithNewList" class="btn makeNewBtn">Add!</button>
            </b-container>
            <hr>
        </div>
    </div>


</template>

<script>
    import 'animate.css';
    import DeleteModal from './DeleteModal.vue';
    export default {
        data() {
            return {
                listName: '',
                addGroceryList: false,
                // selected: this.groceryLists.length > 1 ? '' : this.groceryLists[0].name,
                selected: '',
                showModal: false,
                forItm: {
                    userId: '',
                    groceryListId: 0,
                },
            }
        },
        props: ['groceryLists'],
        components: {
            appModal: DeleteModal
        },
        methods: {
            callBackToListWithNewList(e) {
                this.addGroceryList = false;
                this.$emit('newGroceryList', this.listName);
                this.listName = '';
            },
            deleteListAndItemsModal() {
                this.showModal = !this.showModal;
            },
            deleteListAndItems(payload) {
                if (payload == true) {
                    this.$emit('deleteGroceryListAndItms');
                } else {
                    // do nothing
                }
            }
        },
        watch: {
            selected: function(val) {
                const items = this.groceryLists;
                const res = items.filter(itm => itm.name == val);
                // gives us GroceryStoreId, and UserId (courtesy of drop down)
                const myItem = {
                    userId: res[0].userId,
                    groceryListId: res[0].id
                };
                this.forItm = myItem;
                this.$emit('newSelectedList', myItem);
            },
            groceryLists: function(val) {
                this.selected = this.groceryLists[0].name;
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
    .selectDiv {
        width: 100%;
        min-width: 25em;
        margin: auto;
        margin-top: -1.5em;
        display: flex;
        flex-direction: column;
        justify-content: space-around !important;
        background-color: $secondBlue;
        box-shadow: $myShadow;

        .secondDiv {
            margin: auto;
            width: 19.5em;
            height: 4.4em;
            display: flex;
            flex-direction: row;
            justify-content: space-around !important;
            // background-color: pink;
            border-radius: 4px;
            .spanPlus {
                &:hover {
                    transition: .4s;
                    transform: scale(1.15);
                }
                .plusIcon {
                    color: $fontColorLight;
                    font-size: 30px;
                    border-radius: 20px;
                    background-color: $mainBlue;
                    width: 35px;
                    height: 35px;
                    margin: .5em .3em 0 0;
                    &:hover {
                        cursor: pointer;
                        transition: .4s;
                    }
                }
            }
            .myFormForDropDown {
                // width: 100%;
                // background-color: pink;
                .dropDownDiv {
                    width: 13em;
                    margin-top: .9em;
                }
            }
            .faBackspace {
                color: $fontColorLight;
                font-size: 20px;
                margin-top: 1.23em;
                &:hover {
                    transition: 1s;
                    transform: scale(1.2);
                    cursor: pointer;
                }
            }
        }
        .makeNewDiv {
            display: flex;
            flex-direction: column;
            border-radius: 2px;
            width: auto;
            height: 3.2em;
            margin: auto;
            margin-top: 0;
            .formContainer {
                width: 20.5em;
                .inputLabel {
                    background: $blueGradient;
                    border-radius: 3px;
                    width: 100%;
                    padding: 10px;
                    color: $fontColorLight;
                }
                .fieldInput {
                    border-radius: 10px;
                    height: 39.25px;
                    margin-top: -2em;
                }
                .makeNewBtn {
                    border: 1px solid $mainBlue;
                    border-radius: 0 10px 10px 0;
                    background-color: $mainBlue;
                    color: $fontColorLight;
                    width: 5em;
                    height: 39.25px;
                    position: relative;
                    top: -2.45em;
                    right: -14.6em;
                    &:hover {
                        transition: 1s;
                        transform: scale(1.1);
                        background: $blueGradient;
                    }
                }
            }
        }
    }

    @media (max-width: 401px) {
        .selectDiv {
            width: 100%;
            min-width: 22em;
            .secondDiv {
                margin-left: auto;
                width: 20.5em !important;
                width: auto !important;
                .myFormForDropDown {
                    .dropDownDiv {
                        width: 12em !important;
                        margin-right: .5em;
                    }
                }
                .selectDiv {
                    width: 100%;
                }
            }
        }
        .formContainer {
            width: 100% !important;
            .inputLabel {

            }
            .fieldInput {
                border-radius: 10px;
                height: 39.25px;
                margin-top: -2em;
                width: 20em;
            }
            .makeNewBtn {
                top: -2.45em;
                right: -14.1em !important;
            }
        }
    }

    // @media (max-width: 455px) {
    //     .faBackspace {
    //         right: -13em !important;
    //     }
    // }
</style>
