<template>
    <div v-if="!tracking && showAlert">
        <Alert v-if="!recognizing && noFaces" class="alert" type="error" show-icon closable>
            No faces were detected
            <span slot="desc">Please check the illumination or adjust the  camera position and then start tracking again.</span>
        </Alert>
        <Alert v-else class="alert" type="success" show-icon closable>
            Good to go
            <span slot="desc">Use the cloud upload button to start recognition</span>
        </Alert>
        <Alert v-if="recognizing && !noFaces" class="alert" type="info" show-icon closable>
            Recognizing...
            <span slot="desc">Getting data from the server.</span>
        </Alert>
        <div v-if="recognizing" id="loading-layer">
            <Spin size="large" fix style="opacity:.6"></Spin>
        </div>
    
    </div>
</template>

<script>
    export default {
        data(){
            return {
                showAlert:false
            }
        },
        props: ["tracking", "recognizing", "noFaces"],
        beforeUpdate(){
            this.showAlert = true;
        }
    };
</script>

<style lang="scss" scoped>
    #loading-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .alert {
        position: absolute;
        bottom: 0;
        left: 85px;
        width: 250px;
        z-index: 10;
    }
</style>
