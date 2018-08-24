<template>
      <div id="trackingRectangle" :style="coordinates"></div>
</template>

<script>
export default {
    props:["coordinates"]
}
</script>

<style lang="scss" scoped>
      #trackingRectangle {
      position: absolute;
      border: 1px solid rgb(155, 31, 31);
      z-index: 2;
    }
</style>
