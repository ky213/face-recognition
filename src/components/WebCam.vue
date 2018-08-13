<template>
  <div id="container">
    <div id="video-group" class="watch mt-3">
      <video id="video" ref="video" autoplay></video>
      <div id="trackingRectangle" :style="rectangle"></div>
      <canvas ref="canvas"></canvas>
    </div>
    <div class="btn btn-primary btn-block btn-lg my-3" @click="takeSnapshot">snapshot</div>
  </div>
</template>

<script>
  let trackingTask = null;
  
  export default {
    data: function() {
      return {
        snapShot: false,
        rectangle: {
          width: 0,
          height: 0,
          top: 0,
          left: 0
        },
      };
    },
    mounted: function() {
      // navigator.getMedia =
      //   navigator.getUserMedia ||
      //   navigator.webkitGetUserMedia ||
      //   navigator.mozGetUserMedia ||
      //   navigator.msGetUserMedia;
      // const url = window.URL || window.webkitURL;
  
      navigator.mediaDevices
        .getUserMedia({
          video: true
        })
        .then(stream => {
          const {
            video,
            canvas
          } = this.$refs;
          video.srcObject = stream;
          this.startTracking();
        })
        .catch(error => {
          console.log("Error dude !!!", error);
        });
    },
    methods: {
      takeSnapshot() {
        this.snapShot = true;
        const {
          video,
          canvas
        } = this.$refs;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        trackingTask.stop();
        //video.srcObject.getVideoTracks().forEach(track => track.stop())
      },
      startTracking() {
        const rectangle = this.rectangle;
        const faceTracker = new tracking.ObjectTracker(["face"]);
  
        faceTracker.on("track", function(event) {
          if (event.data.length === 0) {
            console.log("No faces !");
          } else {
            event.data.forEach(function(rect) {
              console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
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
*{
  box-sizing: content-box;
}
 
  #video-group{
    position: relative;
    border: 10px solid #ddd;
    background: #ccc;
    width: 400px;
    height: 300px;
    margin: auto;
    video{
      width: 100%;
      height: 100%
    };
    canvas{
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1
    };
    #trackingRectangle {
      position: absolute;
      border:1px solid rgb(155, 31, 31);
      z-index: 2
    }
  }
</style>
