<template>
  <div id="container" class="row justify-content-center">
    <div id="video-group" class="watch mt-3">
      <video id="video" ref="video" autoplay></video>
      <div id="trackingRectangle" :style="rectangle"></div>
      <canvas ref="canvas"></canvas>
    </div>
    <Button v-if="capture" @click="takeSnapshot" type="error" shape="circle" size="large" class="mt-2 w-25 " title="Stop tracking">
          <Icon 
          type="ios-square" 
          size="42"/>
    </Button>
    <Button v-else @click="getCamera" type="primary" shape="circle" size="large" class="mt-2 w-25 " title="Start tracking">
          <Icon 
          type="ios-camera" 
          size="42"/>
    </Button>
  </div>
</template>

<script>
  let trackingTask = null;
  
  export default {
    data: function() {
      return {
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
      takeSnapshot() {
        const {
          video,
          canvas
        } = this.$refs;
        const context = canvas.getContext("2d");
  
        this.capture = false;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        trackingTask.stop();
        video.srcObject.getVideoTracks().forEach(track => track.stop());
      },
      startTracking() {
        const rectangle = this.rectangle;
        const faceTracker = new tracking.ObjectTracker(["face"]);
  
        this.capture = true;
        faceTracker.on("track", event => {
          if (event.data.length === 0) {
            console.log("No faces !");
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
      }
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
      width: 100%;
      height: 100%;
    }
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    #trackingRectangle {
      position: absolute;
      border: 1px solid rgb(155, 31, 31);
      z-index: 2;
    }
  }
</style>
