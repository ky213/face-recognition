const functions = require("firebase-functions");
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const KairosAPI = require("kairos-api");

const kairos = new KairosAPI("34b89eef", "35374577eef017c9fec657638d392d14");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "8mb" }));
app.use(bodyParser.json({ limit: "8mb" }));

app.post("/enroll", (req, res) => {
  const config = {
    subject_id: req.body.name,
    image: req.body.picture,
    gallery_name: "myGallery"
  };

  kairos
    .enroll(config)
    .then(result => {
      console.log("got response!!!!!!!!");
      return res.json(result);
    })
    .catch(error => {
      console.log("got Error!!!");
      return res.json(error);
    });
});

app.post("/recognize", (req, res) => {
  const config = {
    image: req.body.picture,
    gallery_name: "myGallery"
  };

  kairos
    .recognize(config)
    .then(result => {
      console.log("got response!!!!!!!!");
      return res.json(result);
    })
    .catch(error => {
      console.log("got Error!!!");
      return res.json(error);
    });
});

app.listen(3000, () => {
  console.log("listening on port 3000...");
});

//exports.recognizer = functions.https.onRequest(app);
