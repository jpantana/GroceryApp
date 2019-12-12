<template>
    <div class="itemsWrapper">
        <div class="itemsUl">
                <div
                    :key="`${i}`"
                    v-for="(card, i) in cards"
                    class="singleItemDiv animated bounceIn"
                    @click="deleteItem"
                >
                    <div :id="`${card.id}`" class="singleItemLi">{{ card.name }}</div>
                </div>
        </div>
    </div>
</template>

<script>
    import itemsData from '../helpers/data/itemsData.js';
    export default {
        data() {
            return {
            }
        },
        props: ['cards', 'groceryListData'],
        methods: {
            deleteItem(e) {
                const itmId = e.target.id;
                // itemsData.deleteItem(itmId)
                //     .then((resp) => {
                //        // reload the items section
                        this.$emit('deleteItem', itmId);
                    // })
                    // .catch(err => console.error(err));
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
     .itemsWrapper {
        max-width: 28em;
        margin: auto;
        // background: $bottomNavColor;
        height: 32em;
        .itemsUl {
            max-width: 25em;
            margin: auto;
            display: flex;
            flex-flow: row wrap;
            justify-content: center;
            object-fit: contain;
            .singleItemDiv {
                margin: 1em;
                width: 8em;
                height: 4em;
                font-family: $regFont;
                font-weight: 600;
                border: .5px solid $shadow;
                border-radius: 2px;
                box-shadow: $myShadow;
                background-color: $secondBlue;
                color: $fontColorLight;
                object-fit: contain;
                &:hover {
                    cursor: pointer;
                    transition: .5s;
                    box-shadow: 10px 1px 15px $shadow;
                }
                .singleItemLi {
                    height: 4em;
                    width: 8em;
                    display:table-cell;
                    vertical-align:middle;
                    text-align:center;
                }
            }
        }
    }


    @media (max-width: 588px) {
        .itemsWrapper {
            width: 100%;
            padding: 0.4em;
            .itemsUl {
                width: 90%;
                margin: auto;
            }
        }
    }

    @media (max-width: 387px) {
        .singleItemDiv {
            width: 7em !important;
            height: 3.5em !important;
            .singleItemLi {
                width: 7em !important;
                height: 3.5em !important;
            }
        }
    }
</style>
