<template>
    <div v-if="!tracking">
        <Alert v-if="noFaces" id="alert" type="error" show-icon closable>
            No faces were detected
            <span slot="desc">Please check the illumination or adjust the  camera position and then start tracking again.</span>
        </Alert>
        <div v-if="recognizing" id="loading-layer">
            <Spin size="large" fix style="opacity:.6"></Spin>
        </div>
        <Alert v-if="recognizing && !noFaces" id="alert" type="info" show-icon closable>
            Recognizing...
            <span slot="desc">Getting data from the server.</span>
        </Alert>
    </div>
</template>

<script>
    export default {
        props: ["tracking", "recognizing", "noFaces"],
    }
</script>

<style lang="scss" scoped>
    #loading-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    #alert {
        position: absolute;
        bottom: 0;
        left: 85px;
        width: 250px;
        z-index: 10;
    }
</style>
