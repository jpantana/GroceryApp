<template>
    <div class="divE">

        <app-grocery-list
            @newSelectedList="selected"
            @newGroceryList="receiveNewGroceryList"
            :groceryLists="lists"
        ></app-grocery-list>


        <app-item-create

        ></app-item-create>

        <ul>
            <li :key="i" v-for="(item, i) in items">{{ item.name }}</li>
        </ul>
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
    export default {
        data() {
            return {
                items: [],
                lists: [],
                newFood: {
                    Name: null,
                    GroceryStoreId: 0,
                    userId: this.$store.state.user.id // id doesn't exist in state - uid
                },
                userId: '',
            }
        },
        components: {
            appGroceryList: GroceryList,
            appItemCreate: ItemCreate
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
                                    // if (isNull) {
                                       // do nothing
                                    } else if (resp.length > 0) {
                                        this.lists = resp;
                                        // THIS IS FOR FOOD, BUT WE HAVE LISTS HERE this.$store.dispatch('seeGroceryLists', resp);
                                    }
                                })
                                .catch(err => console.error(err));
                        }).catch(err => console.error(err));
                });
            },
            // Shows add new button when list is null

            // come from grocery LIST child comp
            selected(payload) {
                this.groceryList = payload;
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
    }

</style>
