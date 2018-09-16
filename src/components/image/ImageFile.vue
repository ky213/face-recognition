<template>
  <div class="">
    <BoundingBox :box="box" :picture="picture"/>
    <Upload 
    name="picture" 
    class="mt-4"
    type="drag" 
    action="http://localhost:3000/detect" 
    accept=".jpeg, .jpg, .png"
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
      picture: "",
      box: {}
    };
  },
  methods: {
    beforeUpload(file) {
      this.picture = URL.createObjectURL(file);
    },
    successHandler({ FaceDetails }) {
      console.log("bounding box", FaceDetails.slice());
      if (FaceDetails) {
        const { BoundingBox } = FaceDetails.pop();
          this.box = BoundingBox
      } else
        this.$Notice.error({
          title: "Face Detection Error",
          desc: "No faces in this picture"
        });
    },
    errorHandler(error) {
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
    }
  },

  components:{
    BoundingBox
  }
};
</script>

<style lang="scss" scoped>

</style>
