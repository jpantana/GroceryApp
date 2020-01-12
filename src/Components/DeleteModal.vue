<template>
        <!-- MODAL HERE -->
        <b-modal ref="my-modal" hide-footer title="You're about to delete a grocery list">
            <div class="d-block text-center">
                <b-container fluid>
                    <p>Doing so will delete both this list, and any items saved in this list.</p>
                    <button @click.prevent="deleteStatus(true)" class="btn myBtn">Delete</button>
                </b-container>
            </div>
        </b-modal>
</template>

<script>
    export default {
        data() {
            return {
                yesDelete: false,
            }
        },
        props: ['showModal', 'deleteListAndItems'],
        methods: {
            deleteStatus(e) {
                this.yesDelete = e;
                this.$refs['my-modal'].toggle('#linkToUpdateUserName');
                this.$emit('deleteListAndItems', this.yesDelete);
                this.$store.dispatch('increaseKeyCountGroceryList');
            }
        },
        watch: {
            showModal: function(oldVal, newVal) {
                this.$refs['my-modal'].toggle('#linkToUpdateUserName');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';

    .myBtn {
        border: 1px solid $mainBlue;
        // background: $blueGradient;
        background-color: $mainBlue;
        color: $fontColorLight;
        width: 100%;
        &:hover {
            transition: .7s;
            transform: scale(1.1);
        }

    }
</style>
