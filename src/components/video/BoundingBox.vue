<template>
    <div id="trackingGroup" :style="coordinates" class="d-flex flex-column align-items-center">
        <div id="rectangle" :style="{borderColor:recognizedFace ? '#28a745' : 'red'}"></div>
        <input v-if="enrollNewFace && !recognizedFace" :value="value" @input="$emit('input', $event.target.value)" placeholder="name.." class="name position-absolute" />
        <p v-if="recognizedFace" class="name position-absolute text-center text-light bg-success">{{recognizedFace}} <p/>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props:["value"],
  computed:{
    ...mapGetters(["coordinates"]),
    ...mapState(["recognizedFace","enrollNewFace"])
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

input{
  width :150% !important;
  border:2px solid lightgray;
  text-align:center;
  bottom:-20px;
  padding:2px;
  border-radius:5px

}
</style>
