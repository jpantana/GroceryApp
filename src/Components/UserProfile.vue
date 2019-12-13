<template>
    <div class="myContainer">
        <div class="makeDivCirclePic">
            <font-awesome-icon icon="user" class="faUser aniamated fadeIn userIcon" />
        </div>
    </div>
</template>

<script>
    import 'animate.css';
    export default {

    }
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
    .myContainer {
        margin: auto;
        margin-top: 1em;
        display: flex;
        flex-direction: column;
        .makeDivCirclePic {
            border-radius: 12em;
            width: 12em;
            height: 12em;
            background-color: $fontColorLight;
            .userIcon {
                font-size: 150px;
                color: $secondBlue;
                position: relative;
                top: .1em;
                right: -.2em;
            }
        }
    }
</style>
