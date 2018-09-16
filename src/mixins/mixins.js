import Rekognition from "aws-sdk/clients/rekognition";

const rekognition = new Rekognition({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIAIJ6ACUPII7XRIPTQ",
    secretAccessKey: "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"
  }
});

rekognition.createCollection(
  { CollectionId: "myCollection" },
  (erro, data) => {}
);

rekognition.deleteCollection(
  { CollectionId: "emptyCollection" },
  (error, data) => {
    rekognition.createCollection(
      { CollectionId: "emptyCollection" },
      (error, data) => {}
    );
  }
);

const mixin = {
  data() {
    return {
      imageName: ""
    };
  },
  methods: {
    detectFaces(picture) {
      const params = {
        CollectionId: "emptyCollection",
        Image: {
          Bytes: picture
        },
        FaceMatchThreshold: 99
      };

      rekognition.searchFacesByImage(params, (error, data) => {
        this.toggleState({ recognizing: false });

        if (data.FaceMatches.length) {
          const { Face } = data.FaceMatches.shift();
          this.toggleState({ recognizedFace: Face.ExternalImageId, recognizing:false, enrollNewFace:false });
          this.newFaceName = "";
        } else {
          this.$Notice.warning({
            title: "No face name",
            desc:
              "This face is not registered, please enter a name and upload again",
            duration: 8
          });
          this.toggleState({ enrollNewFace: true });
        }
      });
    },
    enrollFaces(picture, newFaceName) {
      const params = {
        CollectionId: "myCollection",
        ExternalImageId: newFaceName,
        Image: {
          Bytes: picture
        }
      };
      rekognition.indexFaces(params, (error, data) => {
        if (error) {
          this.toggleState({ recognizedFace: "", recognizing:false, enrollNewFace:false });
          this.newFaceName = ""
        }
        if (data.FaceRecords.length) {
          const { Face } = data.FaceRecords.shift();
          this.toggleState({ recognizedFace: Face.ExternalImageId, recognizing:false, enrollNewFace:false });
          this.newFaceName = ""
        }
      });
    }
  }
};

export default mixin;
