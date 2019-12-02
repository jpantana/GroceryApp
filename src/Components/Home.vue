<template>
    <div class="divWrapper animated bounceIn">
        <h1 class="myH1">Home Component</h1>
    </div>
</template>

<script>
    import 'animate.css';
    export default {
        
    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: blue;
        width: 200px;
        height: 200px;
    }
</style>