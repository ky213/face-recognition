<template>
    <div class="row justify-content-center mt-4">
        <button 
        ref="uploadButton"
        class="btn btn-link mt-2"
        :disabled="tracking || noFaces || recognizing || recognizedFace.length > 0 "
        title="upload for recognition"
        @click="$emit('recognize')"
         >
               <Icon type="ios-cloud-upload-outline" size="52"/>
           </button>
        <div class="col-5">
            <button v-if="tracking" class="btn btn-danger btn-lg btn-block"
            @click="$emit('takeSnapshot')"
            title="stop tracking"
            >
                           <Icon type="ios-square" size="52"/>
                       </button>
            <button 
            v-else class="btn btn-primary  btn-lg btn-block"
            @click="$emit('getCamera')"
            title="start face tracking"
            :disabled="recognizing"
            >
                           <Icon type="ios-camera" size="52"/>
                       </button>
    
        </div>
        <button 
        class="btn btn-link" 
        title="swap camera"
        :disabled="tracking || recognizing"
        @click="$emit('swapCamera')"
         >
               <Icon type="ios-reverse-camera-outline" size="52"/>
           </button>
    
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed:{
    ...mapState(["tracking", "recognizing", "noFaces", "recognizedFace"])
  }
};
</script>

<style lang="scss" scoped>
.btn {
  border-radius: 20px;
}

button:disabled {
  cursor: not-allowed !important;
}

.controlIcon {
  color: lightgray !important;
  cursor: not-allowed;
}

.controlIcon:hover {
  color: gray !important;
}
</style>
