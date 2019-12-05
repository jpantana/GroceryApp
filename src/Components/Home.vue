<template>
    <div class="divWrapper animated bounceIn">
        <h1 class="myH1">{{ h1Text }}</h1>
    </div>
</template>

<script>
    import 'animate.css';
    export default {
        data() {
            return {
                h1Text: 'This is a big home component'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';

    div {
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: blue;
        width: 200px;
        height: 200px;
    }
</style>