<template>
    <div id="image-box" class="position-relative">
        <div id="image" :style="{backgroundImage:`url(${picture})`}" alt="your picture" ref="picture"></div>
        <div id="bounding-box" :class="name ? '' : 'd-none'" :style="style.box">
            <h5 id="name" class="text-light text-center bg-success">{{name}}</h5>
        </div>
        <form v-if="enroll" @submit.prevent= "$emit('addNewFace',$event)">
            <div class="input-group mb-3 w-75 m-auto">
                <input type="text" class="form-control" placeholder="name">
                <div class="input-group-append">
                    <button class="btn btn-outline-primary" type="submit" id="button-addon2">Go!</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  props: ["box", "picture", "name", "enroll"],
  computed: {
    style() {
      return {
        box: {
          width: this.box.Width * 100 + "%",
          height: this.box.Height * 100 + "%",
          top: this.box.Top * 100 + "%",
          left: this.box.Left * 100 + "%",
          border: "2px solid " + (this.name ? "#28a745" : "red")
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
#image-box {
  height: 300px;
}

#image {
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

#bounding-box {
  position: absolute;
  z-index: 1;
}

#name {
  position: absolute;
  bottom: -29px;
  left: 0;
  margin: auto;
  width: 100%;
}

button {
  top: 0;
  right: 0;
}
</style>
