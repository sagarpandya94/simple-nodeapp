const express = require("express");
const app = express();
const sagarServer = require("./sagar-server");
const aadityaServer = require("./aaditya-server");
const sushilServer = require("./sushil-server");
app.use(express.json());

app.use((req, res, next) => {
  //Applies to all Endpoints(URL)
  console.log(req.originalUrl);
  next();
});

//Sagar Pandya
app.get("/weather", sagarServer);

//Aaditya Chokshi
app.get("/breakingbad", aadityaServer);

//Sushil Plassar
app.get("/top-headlines", sushilServer);

app.get("/", (req, res) => {
  if (res.status(200)) {
    res.send("Welcome to NauJavano");
  } else if (res.status(404)) {
    res.send({
      status: "Error",
      message: "Please enter a valid endpoint"
    });
  }
});

app.get("/*", (req, res) => {
  if (res.status(404)) {
    res.send({
      status: "Error",
      message: "Please enter a valid endpoint"
    });
  }
});

app.listen(2305);
