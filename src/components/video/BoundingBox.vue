<template>
    <div id="trackingGroup" :style="coordinates" class="d-flex flex-column align-items-center">
        <div id="rectangle" :style="{borderColor:recognizedFace ? '#28a745' : 'red'}"></div>
        <input v-if="!recognizedFace" v-model="imageName" placeholder="name.." class="name position-absolute" />
        <p v-else class="name position-absolute text-center text-light bg-success">{{recognizedFace}} <p/>
    </div>
</template>

<script>
import { mapState,mapGetters } from "vuex";

export default {
  data() {
    return {
      imageName: ""
    };
  },
  computed:{
    ...mapGetters(["coordinates"]),
    ...mapState(["recognizedFace"])

  }
};
</script>

<style lang="scss" scoped>
#trackingGroup {
  position: absolute;
  z-index: 2;
}

#rectangle {
  width: 100%;
  height: 100%;
  border: 2px solid red;
}

.name {
  bottom: -26px;
  width: 100%;
}
</style>
