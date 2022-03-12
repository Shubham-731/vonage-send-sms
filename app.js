// Loading the packages
const express = require("express");
const ejs = require("ejs");
const Vonage = require("@vonage/server-sdk");
require("dotenv").config();

// Init Vonage
const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// EJS
app.set("view engine", "html");
app.engine("html", ejs.renderFile);

// Static files
app.use(express.static(__dirname + "/public"));

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  console.log(req.body);
  const from = "Vonage APIs";
  const to = req.body.phoneNo;
  const text = req.body.msgText;

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      console.log(responseData);
      if (responseData.messages[0]["status"] === "0") {
        console.log("Message sent successfully.");
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]["error-text"]}`
        );
      }
    }
  });
});

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
