const functions = require("firebase-functions");
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const Rekognition = require("aws-sdk/clients/rekognition");

const rekognition = new Rekognition({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIAI7OAENSXOOELK3WA",
    secretAccessKey: "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"
  }
});

rekognition.createCollection(
  { CollectionId: "myCollection" },
  (error, data) => {
    console.log("Colelction creation: ", error || data);
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "8mb" }));
app.use(bodyParser.json({ limit: "8mb" }));


app.post("/detect", (req, res) => {
  const pictureBuffer = new Buffer(req.body.picture, "base64");
  const params = {
    Image: {
      Bytes: pictureBuffer
    }
  };
  rekognition.detectFaces(params, (error, data) => {
    res.send(error || data)
  });
});

app.post("/rekognize", (req, res) => {
  const pictureBuffer = new Buffer(req.body.picture, "base64");
  const params = {
    CollectionId: "myCollection",
    Image: {
      Bytes: pictureBuffer
    }
  };
  rekognition.searchFacesByImage(params, (error, data) => {
    console.log(error || data);
    res.send(error || data);
  });
});

app.post("/enroll", (req, res) => {
  const pictureBuffer = new Buffer(req.body.picture, "base64");
  const params = {
    CollectionId: "myCollection",
    ExternalImageId: req.body.name,
    Image: {
      Bytes: pictureBuffer
    }
  };
  rekognition.indexFaces(params, (error, data) => {
    res.send(error || data);
  });
});

// app.listen(3000, () => {
//   console.log("server listening on port 3000");
// });

exports.recognizer = functions.https.onRequest(app);
