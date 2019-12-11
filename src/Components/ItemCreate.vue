<template>
    <div class="formDiv animated fadeIn">
        <b-container class="formContainer" fluid>
            <b-row>
                <label class="inputLabel" for="foodNameInput">Add to your list...</label>
                <b-form-input class="fieldInput" v-model.lazy="newFoodName" placeholder="Eggplant" id="foodNameInput"></b-form-input>
            </b-row>
            <!-- <b-row >
                <label for="getLastName">Which grocery store is it at?</label>
                <b-form-input class="fieldInput" v-model.lazy="newFood.GroceryStore" placeholder="Piggly Wiggly" id="foodsGroceryStoreInput"></b-form-input>
            </b-row> -->
            <button @click.prevent="addNewItem" class="btn addAnItemBtn">Add!</button>
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
    methods: {
        addNewItem() {
            this.$emit('newGroceryItem', this.newFoodName);
        }
    },
    // watch: {
    //     newFood: function(val) {
    //         this.$emit('newGroceryItem', val);
    //     }
    // }
}
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';

        .formDiv {
            margin: auto;
            width: 22.5em !important;
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
                }
                .addAnItemBtn {
                    border: 1px solid $mainBlue;
                    border-radius: 0 10px 10px 0;
                    background-color: $mainBlue;
                    color: $fontColorLight;
                    width: 27%;
                    position: relative;
                    top: -2.38em;
                    right: -14.5em;
                    &:hover {
                        transition: .7s;
                        background: $blueGradient;
                    }
                }
            }
        }
</style>
