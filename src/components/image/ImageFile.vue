<template>
  <div class="">
    <BoundingBox :box="box" :picture="picture" :name="name" :enroll="enroll" @addNewFace="addNewFace"/>
    <Upload 
    name="picture" 
    class="mt-5"
    type="drag" 
    action="http://localhost:3000/rekognize" 
    accept=".jpeg, .jpg, .png"
    :show-upload-list="false"
    :format="['jpeg','jpg','png']"
    :before-upload="beforeUpload"
    :on-success="successHandler"
    :on-error="errorHandler"
    :on-format-error="formatError"
    >
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>Click or drag files here to upload</p>
      </div>
    </Upload>
  </div>
</template>

<script>
import BoundingBox from "./BoundingBox";

export default {
  data() {
    return {
      name: "",
      picture: "",
      box: {},
      enroll: false
    };
  },
  methods: {
    beforeUpload(file) {
      const reader = new FileReader(file);
      const self = this;
      reader.onload = (function(file) {
        return function(e) {
          self.picture = e.target.result;
        };
      })(file);
      reader.readAsDataURL(file);

      return !this.enroll;
    },
    successHandler({ SearchedFaceBoundingBox, FaceMatches }) {
      this.box = SearchedFaceBoundingBox;
      if (FaceMatches.length) {
        this.enroll = false;
        this.name = FaceMatches[0].Face.ExternalImageId;
      } else {
        this.enroll = true;
        this.$Notice.error({
          title: "Not recognized",
          desc: "Please add a name and submit again to register new face"
        });
      }
    },
    errorHandler(error) {
      this.name = ""
      this.$Notice.error({
        title: "Error",
        desc: error
      });
    },
    formatError(error) {
      this.$Notice.error({
        title: "Format Error",
        desc: "only jpeg, jpg, png formats are accepted"
      });
    },
    addNewFace(event) {
      const newFace = {
        name: event.srcElement[0].value,
        picture: this.picture.split(",")[1]
      };
      if (!newFace.name.length && !newFace.picture.length) {
        this.$Notice.error({
          title: "something is messing",
          desc: "either name or image are missing"
        });
        return;
      } else
        fetch("http://localhost:3000/enroll", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newFace)
        })
          .then(async response => {
            const { FaceRecords } = await response.json();
            this.enroll = false;
            this.name = FaceRecords[0].Face.ExternalImageId;
          })
          .catch(error => {
            this.enroll = true;
            this.$Notice.error({
              title: "Error sending",
              desc: "Something went wrong while trying to send data"
            });
          });
    }
  },
  components: {
    BoundingBox
  }
};
</script>

<style lang="scss" scoped>
</style>
