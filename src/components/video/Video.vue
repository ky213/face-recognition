<template>
  <div id="container" class="row justify-content-center">
    <div id="video-group" class="watch mt-3">
      <InfoLayer/>
      <video id="video" ref="video" autoplay></video>
      <BoundingBox />
      <canvas ref="canvas"></canvas>
      <Controls  @getCamera="getCamera" @takeSnapshot="takeSnapshot" @recognize="recognize" @swapCamera="swapCamera" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Controls from "./Controls";
import BoundingBox from "./BoundingBox";
import InfoLayer from "./InfoLayer";

let trackingTask = null;

export default {
  data: function() {
    return {
      facingMode: "user" // front or rear camera
    };
  },
  mounted: function() {
    this.getCamera();
  },
  methods: {
    ...mapMutations(["positionBoundingBox", "toggleState"]),
    getCamera() {
      navigator.getMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      navigator.getMedia(
        {
          video: {
            facingMode: this.facingMode
          }
        },
        stream => {
          const { video } = this.$refs;
          video.srcObject = stream;
          this.startTracking();
          this.recognizedPerson = "";
        },
        error => {
          this.$Message.config({
            top: 250
          });
          this.$Message.error({
            content: "Camera Needed!",
            duration: 5,
            closable: true
          });
        }
      );
    },
    startTracking() {
      const rectangle = this.rectangle;
      const faceTracker = new tracking.ObjectTracker(["face"]);

      this.toggleState({tracking:true });
      faceTracker.on("track", event => {
        if (event.data.length === 0) {
          this.positionBoundingBox(0);
          this.noFaces = true;
        } else {
          this.noFaces = false;
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

      this.toggleState({ tracking:false, recognizedFace:"" });
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.pictureURL = canvas.toDataURL();
      trackingTask.stop();
      video.srcObject.getVideoTracks().forEach(track => track.stop());
    },
    recognize() {
      const picture = this.pictureURL.split(",")[1];
      const pictureBinary = atob(picture);
      const pictureBytes = new ArrayBuffer(pictureBinary.length);
      const pictureBuffer = new Uint8Array(pictureBytes);
      for (var i = 0; i < pictureBinary.length; i++) {
        pictureBuffer[i] = pictureBinary.charCodeAt(i);
      }
      this.toggleState({tracking:false, recognizing:true})
      this.detectFaces(pictureBuffer);
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
