<template>
  <div id="container" class="row justify-content-center">
    <div id="video-group" class="watch mt-3">
      <video id="video" ref="video" autoplay></video>
      <Landmark :coordinates="rectangle"/>
      <canvas ref="canvas"></canvas>
      <Controls :capture="capture" @getCamera="getCamera" @takeSnapshot="takeSnapshot" />
      <MyUpload/>
    </div>
  </div>
</template>

<script>
  import Controls from "./Controls"
  import MyUpload from "./MyUpload"
  import Landmark from "./Landmark"
  let trackingTask = null;
  
  export default {
    data: function() {
      return {
        pictureURL: "",
        capture: false,
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
  
        navigator.getMedia({
            video: true
          },
          stream => {
            const {
              video
            } = this.$refs;
            video.srcObject = stream;
            this.startTracking();
          },
          error => {
            console.log("Error!", error);
          }
        );
      },
      startTracking() {
        const rectangle = this.rectangle;
        const faceTracker = new tracking.ObjectTracker(["face"]);
  
        this.capture = true;
        faceTracker.on("track", event => {
          if (event.data.length === 0) {
            rectangle.width = 0;
            rectangle.height = 0;
            rectangle.top = 0;
            rectangle.left = 0;
          } else {
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
        const {
          video,
          canvas
        } = this.$refs;
        const context = canvas.getContext("2d");
  
        this.capture = false;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          blob => {
            this.pictureURL = URL.createObjectURL(blob);
          },
          "image/jpeg",
          1
        );
        trackingTask.stop();
        video.srcObject.getVideoTracks().forEach(track => track.stop());
      }
    },
    components: {
      Controls,
      MyUpload,
      Landmark
    }
  };
</script>

<style lang="scss" scoped>
  * {
    box-sizing: content-box;
  }
  
  #video-group {
    position: relative;
    border: 10px solid #ddd;
    background: #ccc;
    width: 400px;
    height: 300px;
    margin: auto;
    video {
      width: 400px;
      height: 300px;
    }
    canvas {
      display: none;
      width: 400px;
      height: 300px;
    }
  
  } 
</style>
