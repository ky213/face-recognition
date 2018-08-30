<template>
    <div id="trackingGroup" :style="coordinates" class="d-flex flex-column align-items-center">
        <div id="rectangle"></div>
        <Input v-model="value" placeholder="name.." class="name position-absolute d-none" />
    </div>
</template>

<script>
    export default {
        props: ["coordinates"]
    }
</script>

<style lang="scss" scoped>
    #trackingGroup {
        position: absolute;
        z-index: 2;
    }

    #rectangle {
        width: 100%;
        height: 100%;
        border: 2px solid red
    }

    .name {
        bottom: -35px;
        width: 120%
    }
</style>
