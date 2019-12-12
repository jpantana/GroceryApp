<template>
    <div class="divE">
        <div class="divWrapper">
            <app-item-create
                :groceryListDataObj="groceryListDat"
                @newGroceryItem="addGroceryItem"
            ></app-item-create>

            <app-grocery-list
                @newSelectedList="selected"
                @newGroceryList="receiveNewGroceryList"
                @deleteGroceryListAndItms="deleteGroceryListAndItems"
                :groceryLists="lists"
            ></app-grocery-list>

            <app-item-cards
                :cards="items"
                :groceryListData="groceryListDat"
                @deleteItem="deleteThisItem"
            ></app-item-cards>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import itemsData from '../helpers/data/itemsData.js';
    import userData from '../helpers/data/usersData.js';
    import groceryListData from '../helpers/data/groceryListData.js';
    import { mapActions } from 'vuex';
    import { isNull } from 'util';
    import GroceryList from './GroceryList.vue';
    import ItemCreate from './ItemCreate.vue';
    import ItemCards from './ItemCards.vue'
    import 'animate.css';
    export default {
        data() {
            return {
                items: [],
                lists: [],
                userId: '',
                groceryListDat: {
                    groceryListId: 0,
                    userId: ''
                },
                newFood: {
                    Name: null,
                    GroceryStoreId: 0,
                    userId: this.$store.state.user.id // id doesn't exist in state ~ uid only
                }
            }
        },
        components: {
            appGroceryList: GroceryList,
            appItemCreate: ItemCreate,
            appItemCards: ItemCards
        },
        methods: {
             ...mapActions([
                'addNewFoodToList',
                'seeGroceryLists'
            ]),
            getGroceryLists() {
                firebase.auth().onAuthStateChanged((user) => {
                    userData.getSingleUser(user.uid)
                        .then((res) => {
                            this.userId = res[0].id;
                            // Go Ahead and get this user data so when new item is added it can just be appended to item obj that passes to store
                            this.newFood.userId = res[0].id;
                            // now that we know the user, we can get the grocery list...
                            groceryListData.getMyGroceryList(res[0].id)
                                .then((resp) => {
                                    if (!resp.length) {
                                       // do nothing
                                    } else if (resp.length > 0) {
                                        this.lists = resp;
                                    }
                                })
                                .catch(err => console.error(err));
                        }).catch(err => console.error(err));
                });
            },
            addGroceryItem(payload) {
                itemsData.addItem(payload)
                    .then(() => {
                        this.updateListOfGroceries();
                    })
                    .catch(err => console.error(err));
            },
            deleteThisItem(itmId) {
                itemsData.deleteItem(itmId)
                    .then((resp) => {
                       // reload the items section
                        //this.$emit('updateGroceries');
                        this.updateListOfGroceries();
                    })
                    .catch(err => console.error(err));
            },
            // called on created/added/deleted
            updateListOfGroceries() {
                itemsData.getUsersItems(this.groceryListDat.groceryListId)
                    .then((res) => {
                        this.items = res;
                    }).catch(err => console.error(err))
            },
            // call back from groceryLIST child comp
            selected(payload) {
                // receives data from whatever selected from drop down in child component
                this.groceryListDat = payload;
            },
            receiveNewGroceryList(payload) {
                const item = {
                    Name: payload,
                    UserId: this.userId
                };
                groceryListData.makeGroceryList(item)
                    .then((res) => {
                        this.getGroceryLists();
                        // this.propmtCreateList();
                    }).catch(err => console.error(err));
            },
            deleteGroceryListAndItems() {
                const deleteId = this.groceryListDat.groceryListId;
                const itmsToDelete = this.items;
                itmsToDelete.forEach((itm) => {
                    this.deleteThisItem(itm.id);
                });
                groceryListData.deleteList(deleteId)
                    .then((res) => {
                        this.getGroceryLists();
                    }).catch(err => console.error(err));
            }
        },
        watch: {
            groceryListDat: function(newVal, oldVal) {
                this.updateListOfGroceries();
            }
        },
        created() {
            this.getGroceryLists();
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
    .divE {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;
        margin-top: 0;
        .divWrapper {
            margin: auto;
            max-width: 35em;
            max-width: 36.5em;
            background-color: $bottomNavColor;
            box-shadow: $myShadow;
            padding: 1.5em;
            padding: 0em;
        }
    }
    @media (max-width: 516px) {
        .divE {
            max-width: 32em;
            .divWrapper {
                padding: 0;
            }
        }
    }
</style>
