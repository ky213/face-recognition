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
  (error, data) => {}
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
        CollectionId: "myCollection",
        FaceMatchThreshold: 99,
        Image: {
          Bytes: picture
        }
      };

      rekognition.searchFacesByImage(params, (error, data) => {
        this.recognizing = false;
        if (error) return;

        const { Face } = data.FaceMatches.shift();

        if (Face) this.recognizedPerson = Face.ExternalImageId || "";
        else this.enrollFaces(picture);
      });
    },
    enrollFaces(picture) {
      const params = {
        CollectionId: "myCollection",
        ExternalImageName: this.imageName,
        Image: {
          Bytes: picture
        }
      };
      rekognition.indexFaces(params, (error, data) => {
        if (error) return;
        console.log("Indexes face: ", data);
      });
    }
  }
};

export default mixin;
