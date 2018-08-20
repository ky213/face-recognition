<template>
    <div id="controls" class="col mt-2">
        <div class="row justify-content-center">
            <Icon class="col-2 mt-1 text-center text-info controlIcon" type="ios-cloud-upload-outline" size="52" title="upload" />
            <Button v-if="capture" @click="takeSnapshot" type="error" shape="circle" size="large" class="col-3" title="Stop tracking">
                    <Icon type="ios-square" size="42"/>
                   </Button>
            <Button v-else @click="getCamera" type="primary" shape="circle" size="large" class="col-3" title="Start tracking">
                     <Icon type="ios-camera" size="42"/>
                      </Button>
            <Icon class="col-2 text-center text-info controlIcon" type="ios-reverse-camera-outline" size="52" title="reverse camera" />
        </div>
    </div>
</template>

<script>
    export default {};
</script>

<style lang="scss" scoped>
    
</style>
