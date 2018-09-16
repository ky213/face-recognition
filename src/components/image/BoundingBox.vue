<template>
    <div id="image-box" class="position-relative">
        <div id="image" :style="{backgroundImage:`url(${picture})`}" alt="your picture" ref="picture"></div>
        <div id="bounding-box" class="position-absolute" :style="style.box"></div>
    </div>
</template>

<script>
    export default {
        props: ["box", "picture"],
        computed: {
            style() {
                return {
                    box: {
                        width: this.box.Width * 100 + "%",
                        height: this.box.Height * 100 + "%",
                        top: this.box.Top * 100 + "%",
                        left: this.box.Left * 100 + "%"
                    }
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    #image-box {
        height: 300px;
    }
    
    #image {
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }
    
    #bounding-box {
        z-index: 1;
        border: 2px solid #28a745;
    }
</style>
