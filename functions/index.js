const functions = require("firebase-functions");
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });
const Rekognition = require("aws-sdk/clients/rekognition");

const rekognition = new Rekognition({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIAIJ6ACUPII7XRIPTQ",
    secretAccessKey: "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"
  }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "8mb" }));
app.use(bodyParser.json({ limit: "8mb" }));

app.post("/detect", upload.single("picture"), (req, res) => {
  const buffer = fs.readFileSync(req.file.path, read => {});
  const params = {
    Image: {
      Bytes: buffer
    }
  };
  rekognition.detectFaces(params, (error, data) => {
    console.log("faces", error, data);
    fs.unlink(req.file.path, () => {});
    res.send(data);
  });
});

app.post("/enroll",upload.single("picture"), (req, res) => {

  
});

app.listen(3000, () => {
  console.log("listening on port 3000...");
});

exports.recognizer = functions.https.onRequest(app);
