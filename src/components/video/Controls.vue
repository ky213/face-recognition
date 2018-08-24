<template>
        <div class="row justify-content-center mt-3">
            <Icon class="col-3 mt-1 text-center text-info controlIcon" type="ios-cloud-upload-outline" size="52" title="upload" />
            <Button v-if="capture" @click="$emit('takeSnapshot')" type="error" shape="circle" size="large" class="col-3" title="Stop tracking">
                            <Icon type="ios-square" size="42"/>
                           </Button>
            <Button v-else @click="$emit('getCamera')" type="primary" shape="circle" size="large" class="col-3" title="Start tracking">
                             <Icon type="ios-camera" size="42"/>
                              </Button>
            <Icon class="col-3 text-center text-info controlIcon" type="ios-reverse-camera-outline" size="52" title="reverse camera" />
        </div>
</template>

<script>
    export default {
        props: ["capture"]
    };
</script>

<style lang="scss" scoped>
    .controlIcon {
        color: lightgray !important;
        cursor: not-allowed;
    }
    
    .controlIcon:hover {
        color: gray !important;
    }
</style>
