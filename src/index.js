const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, _) => {
  console.log(`${req.method} ${req.url}`);
});

app.use(express.static("client/dist"));

routes(app);

app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

mongoose.connect(process.env.MONGO_DB_URI).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

module.exports = app;
