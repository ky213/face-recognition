<template>
  <div id="container" class="row justify-content-center">
    <div id="video-group" class="watch mt-3">
      <InfoLayer :tracking="tracking " :recognizing="recognizing" :noFaces="noFaces" :person ="recognizedPerson" />
      <video id="video" ref="video" autoplay></video>
      <Landmark :coordinates="rectangle" :person="recognizedPerson" />
      <canvas ref="canvas"></canvas>
      <Controls :tracking="tracking" :noFaces="noFaces" :recognizing="recognizing" @getCamera="getCamera" @takeSnapshot="takeSnapshot" @recognize="recognize" @swapCamera="swapCamera" />
      <MyUpload :picture="pictureURL" />
    </div>
  </div>
</template>

<script>
import Controls from "./Controls";
import MyUpload from "./MyUpload";
import Landmark from "./Landmark";
import InfoLayer from "./InfoLayer";

let trackingTask = null;

export default {
  data: function() {
    return {
      facingMode: "user", // front or rear camera
      pictureURL: "",
      tracking: null,
      recognizing: null,
      noFaces: null,
      recognizedPerson: "",
      rectangle: {
        width: 0,
        height: 0,
        top: 0,
        left: 0
      }
    };
  },
  mounted: function() {
    this.getCamera();
  },
  methods: {
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

      this.tracking = true;
      faceTracker.on("track", event => {
        if (event.data.length === 0) {
          rectangle.width = 0;
          rectangle.height = 0;
          rectangle.top = 0;
          rectangle.left = 0;
          this.noFaces = true;
        } else {
          this.noFaces = false;
          event.data.forEach(rect => {
            rectangle.top = rect.y + "px";
            rectangle.left = rect.x + "px";
            rectangle.height = rect.height + "px";
            rectangle.width = rect.width + "px";
          });
        }
      });
      trackingTask = tracking.track("video", faceTracker);
    },
    takeSnapshot() {
      const { video, canvas } = this.$refs;
      const context = canvas.getContext("2d");

      this.tracking = false;
      this.recognizedPerson = "";
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

      this.tracking = false;
      this.recognizing = true;
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
    MyUpload,
    Landmark,
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
