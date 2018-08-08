<template>
    <div id="nav" class="py-2 row text-center position-relative">
        <h5 class="links col-6 m-0" @click="scrollOffset = 0">
           
            <router-link to="/camera" class="text-info d-block py-2">
                <Camera/> 
                 Camera
                </router-link>
        </h5>
        <h5 class="links col-6 m-0" @click="scrollOffset = 6">
            <router-link to="/file" class="text-info d-block py-2">
            <FileImage/>
            File
            </router-link>
        </h5>
        <div id="scroller" :class="'col-6 offset-'+scrollOffset+' position-absolute'"></div>
    </div>
</template>

<script>
import Camera from "vue-material-design-icons/camera.vue"
import FileImage from "vue-material-design-icons/file-image.vue"
export default {
  data: function() {
    return {
      scrollOffset: 0
    };
  },
  components:{
      Camera,
      FileImage
  }
};
</script>

<style lang="scss" scoped>
a:hover {
  text-decoration: none;
}
#nav {
  border-bottom: 1px solid lightgray;
}
#scroller {
  border: 3px solid lightblue;
  bottom: -3px;
  left: 0;
  transition: margin-left 0.3s ease-in-out;
}
</style>
