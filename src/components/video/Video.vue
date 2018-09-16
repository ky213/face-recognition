<template>
  <div id="container" class="row justify-content-center">
    <div id="video-group" class="watch mt-3">
      <InfoLayer/>
      <video id="video" class="d-block m-auto" ref="video" autoplay></video>
      <BoundingBox v-model="newFaceName" />
      <canvas ref="canvas"></canvas>
      <Controls  @getCamera="getCamera" @takeSnapshot="takeSnapshot" @recognize="recognize" @swapCamera="swapCamera" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Controls from "./Controls";
import BoundingBox from "./BoundingBox";
import InfoLayer from "./InfoLayer";

let trackingTask = null;

export default {
  data: function() {
    return {
      facingMode: "user", // front or rear camera
      newFaceName: ""
    };
  },
  computed: {
    ...mapState(["picture", "enrollNewFace"])
  },
  mounted: function() {
    this.getCamera();
  },
  methods: {
    ...mapMutations(["positionBoundingBox", "toggleState"]),
    getCamera() {
        const { video } = this.$refs;
        navigator.getMedia =
          navigator.getUserMedia ||
         navigator.webkitGetUserMedia ||
         navigator.mozGetUserMedia ||
         navigator.msGetUserMedia;

         if(video.srcObject){
            video.play()
            this.startTracking();
            this.toggleState({ trackedFaces: false, recognizedFace: "" });
            return;
         }

      navigator.getMedia(
        {
          video: {
            facingMode: this.facingMode
          }
        },
        stream => {
            video.srcObject = stream;
            this.toggleState({ trackedFaces: false, recognizedFace: "" });
            this.startTracking();
        },
        error => {
          this.$Message.config({
            top: 250
          });
          this.$Message.error({
            content: "Please allow camera!",
            duration: 5,
            closable: true
          });
        }
      );
    },
    startTracking() {
      const rectangle = this.rectangle;
      const faceTracker = new tracking.ObjectTracker(["face"]);

      this.toggleState({ tracking: true, enrollNewFace:false });
      faceTracker.on("track", event => {
        if (event.data.length === 0) {
          this.positionBoundingBox(0);
          this.toggleState({ noFaces: true });
        } else {
          this.toggleState({ noFaces: false });
          event.data.forEach(rect => {
            this.positionBoundingBox(rect);
          });
        }
      });
      trackingTask = tracking.track("video", faceTracker);
    },
    takeSnapshot() {
      const { video, canvas } = this.$refs;
      const context = canvas.getContext("2d");

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const pictureURL = canvas.toDataURL()
      const pictureData = pictureURL.split(",")[1];
      const pictureBinary = atob(pictureData);
      const pictureBytes = new ArrayBuffer(pictureBinary.length);
      const pictureBuffer = new Uint8Array(pictureBytes);
      for (var i = 0; i < pictureBinary.length; i++) {
        pictureBuffer[i] = pictureBinary.charCodeAt(i);
      }

      this.toggleState({
        tracking: false,
        recognizedFace: "",
        picture:pictureBuffer 
      });
      trackingTask.stop();
      video.pause();
    },
    recognize() {
      this.toggleState({
        tracking: false,
        recognizing: true,
      });
      if (this.enrollNewFace) this.enrollFaces(this.picture, this.newFaceName);
      else this.detectFaces(this.picture);
    },
    swapCamera() {
      this.facingMode =
        this.facingMode === "user"
          ? {
              exact: "environment"
            }
          : "user";
      this.getCamera();
    }
  },
  components: {
    Controls,
    BoundingBox,
    InfoLayer
  }
};
</script>

<style lang="scss" scoped>
* {
  // box-sizing: content-box;
}

#video-group {
  position: relative;
  border: 10px solid #ddd;
  background: #ccc;
  width: 400px;
  height: 300px;
  // margin: auto;
  video {
    height: 100%;
  }
  canvas {
    display: none;
    height: 300px;
    width: 400px;
  }
}
</style>
