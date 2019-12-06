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
        background: $blueGradient;
        height: 3.5em;
        width: 100%;
        .contentDiv {
            margin: auto;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-evenly;
            width: 30em;
            .tagname {
                font-family: $regFont;
                // text-align: center;
                color: $fontColorLight;
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
        .tagname {
            font-size: 11px;
            margin: auto;
            }
            .contactEmail {
                font-size: 11px;
            }
    }
</style>