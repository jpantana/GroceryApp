<template>
    <div class="footer">
        <div class="contentDiv">
            <p class="tagname">&copy; 2019 | SweetCarts ~ Make shopping together... easier |
                <a class="contactEmail" href="mailto:josh.pantana@gmail.com">contact us</a></p>

        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    @import '../../public/main.scss';
    .footer {
        margin-top: 100%;
        // background: $blueGradient;
        background: $shadow;
        height: 2.5em;
        width: 100%;
        .contentDiv {
            margin: auto;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-evenly;
            width: auto;
            padding-top: .45em;
            .tagname {
                font-family: $regFont;
                font-size: 14px;
                text-align: center;
                color: $fontColorLight;
                vertical-align: middle !important   ;
            }
            .contactEmail {
                text-align: center;
                margin: auto;
                text-decoration: none !important;
                color: $fontColorLight;
                font-family: $regFont;
            }
        }
    }

    @media (max-width: 600px) {
        .contentDiv {
            display: flex;
            flex-direction: column;
            margin: auto;
            height: 2em !important;
            .tagname {
                font-size: 9px !important;
                width: 100%;
                text-align: center;
                }
                .contactEmail {
                    font-size: 11px;
                }
            }
        }
</style>
