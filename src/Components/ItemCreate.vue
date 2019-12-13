<template>
    <div class="formDiv animated fadeIn">
        <b-container class="formContainer" fluid>
            <b-row>
                <label class="inputLabel" for="foodNameInput">Add Some Groceries</label>
                <b-form-input
                    class="fieldInput"
                    v-on:keyup.enter.native="addNewItem"
                    v-model.lazy="newFoodName"
                    placeholder="Eggplant"
                    id="foodNameInput">
                </b-form-input>
            </b-row>
            <!-- <b-row >
                <label for="getLastName">Which grocery store is it at?</label>
                <b-form-input class="fieldInput" v-model.lazy="newFood.GroceryStore" placeholder="Piggly Wiggly" id="foodsGroceryStoreInput"></b-form-input>
            </b-row> -->
            <button for="foodNameInput" @click.prevent="addNewItem" class="btn addAnItemBtn">Add!</button>
        </b-container>
    </div>
</template>

<script>
import 'animate.css';
export default {
    data() {
        return {
            newFoodName:  null
        }
    },
    props: ['groceryListDataObj'],
    methods: {
        addNewItem() {
            if (this.newFoodName != '') {
                if (this.groceryListDataObj.groceryListId) {
                     const newFood = {
                        GroceryListId: this.groceryListDataObj.groceryListId,
                        Name: this.newFoodName,
                        GroceryStoreId: 1
                        // WILL EVENTUALLY NEED A WAY TO CHOOSE GROCERY STORE
                    }
                this.$emit('newGroceryItem', newFood);
                this.newFoodName = '';
                }
            } else {
                alert('Make sure you have selected a grocery list and entered an item name!');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';

        .formDiv {
            margin: auto;
            margin-top: 1.5em;
            // width: 22.5em;
            width: 100%;
            // background: $blueGradient;
            .formContainer {
                width: 20.5em;
                .inputLabel {
                    text-align: center;
                    font-size: 22px;
                    font-family: $regFont;
                    font-weight: 600;
                    border-radius: 3px;
                    width: 100%;
                    padding: 10px;
                    color: $fontColorLight;
                    background: $blueGradient;
                    box-shadow: $myShadow;
                }
                .fieldInput {
                    border-radius: 10px;
                    height: 39.25px;
                }
                .addAnItemBtn {
                    border: 1px solid $mainBlue;
                    border-radius: 0 10px 10px 0;
                    background-color: $mainBlue;
                    color: $fontColorLight;
                    width: 27%;
                    height: 39.25px;
                    position: relative;
                    top: -2.44em;
                    right: -14.6em;
                    &:hover {
                        transition: .7s;
                        background: $blueGradient;
                    }
                }
            }
        }
        @media (max-width: 400px) {
            .formDiv {
                width: 100%;
                margin-top: .5em;
                .formContainer {
                    width: 100%;
                    .inputLabel {
                        border-radius: 0px !important;
                    }
                    .fieldInput {
                        margin: auto;
                        width: 18.8em;
                    }
                    .addAnItemBtn {
                        right: -14.4em;
                    }
                }
            }
        }
</style>
