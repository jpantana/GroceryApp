<template>
<!-- SELECT GROCERY LIST (i.e. Party, etc.) -->
    <div class="selectDiv">
        <div class="secondDiv">
            <span>
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
                                :key="`${list.id}.key`"
                                :id="`${list.id}`"
                                v-for="list in groceryLists"
                            >{{ list.name }}</option>
                        </select>
                        <!-- <font-awesome-icon icon="backspace" class="faBackspace" /> -->
                </div>
            </form>
        </div>

         <div
            class="makeNewDiv animated fadeIn"
            v-show="addGroceryList">
        <hr>
            <b-container class="formContainer animated fadeIn" fluid>
                <b-row>
                    <b-form-input class="fieldInput" v-model.lazy="listName" placeholder="e.g. Brunch List" id="exampleInputAddGroceryList1"></b-form-input>
                </b-row>
                <button @click="callBackToListWithNewList" class="btn makeNewBtn">Add!</button>
            </b-container>
            <hr>
        </div>
    </div>


</template>

<script>
    import 'animate.css';

    export default {
        data() {
            return {
                listName: '',
                addGroceryList: false,
                selected: '',
                forItm: {
                    userId: '',
                    groceryListId: 0,
                }
            }
        },
        props: ['groceryLists'],
        methods: {
            callBackToListWithNewList(e) {
                this.addGroceryList = false;
                this.$emit('newGroceryList', this.listName);
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
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';

    .selectDiv {
        width: 100%;
        margin: auto;
        margin-top: -1.5em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .secondDiv {
            margin: auto;
            width: 20.5em;
            display: flex;
            flex-direction: row;
            justify-content: space-between !important;
            background-color: $secondBlue;
            border-radius: 4px;
            .plusIcon {
                background-color: $mainBlue;
                font-size: 30px;
                border-radius: 20px;
                color: $fontColorLight;
                width: 35px;
                height: 35px;
                margin: .3em;
                &:hover {
                    cursor: pointer;
                    background: $blueGradient;
                    transition: .4s;
                    box-shadow: 2px 4px 4px lightgray;
                }
            }
            .myFormForDropDown {
                // width: 100%;
                .dropDownDiv {
                    width: 17em;
                    margin-top: .5em;
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
                    position: relative;
                    top: -2.38em;
                    right: -14.5em;
                    &:hover {
                        transition: 1s;
                        transform: scale(1.1);
                        background: $blueGradient;
                    }
                }
            }
        }
    }
</style>
