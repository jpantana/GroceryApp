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
                        >
                            <option
                                :key="`${i}option`"
                                v-for="(list, i) in gLists"
                            >{{ list.name }}</option>
                        </select>
                </div>
            </form>
        </div>

    <div>{{ groceryLists }} {{ gLists }}</div>

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
                gLists: this.groceryLists.length == 0 ? ['Make a list'] : this.groceryLists,
            }
        },
        props: ['isList', 'groceryLists'],
        methods: {
            callBackToListWithNewList(e) {
                // console.error(e, this.listName);
                this.addGroceryList = false;
                this.$emit('newGroceryList', this.listName);
            }
        },
        watch: {
            selectedGrocery: function(val) {
                this.$emit('newSelectedList', val);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';

    .selectDiv {
        // background-color: pink;
        width: 100%;
        // background-color: pink;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .secondDiv {
            margin: auto;
            width: 20.5em;
            display: flex;
            flex-direction: row;
            justify-content: space-between !important;
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
                //width: 100%;
                .dropDownDiv {
                    width: 17em;
                    // float: right;
                    margin-top: .5em;
                    // display: flex;
                    // flex-direction: column;
                    // justify-content: center;
                }
            }
        }
        .makeNewDiv {
            display: flex;
            flex-direction: column;
            // margin-bottom: 1em;
            // background-color: $bottomNavColor;
            // padding: 1em;
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
