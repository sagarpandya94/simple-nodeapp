const fetch = require("node-fetch");

const aadityaServer = (req, res) => {
  console.log("In the aaditya server");
  stringQuery = req.query.name;
  url = "https://www.breakingbadapi.com/api/characters?name="; //API url
  finalUrl = url + stringQuery; //Appending url with the query

  fetch(finalUrl)
    .then(res => res.json())
    .then(data => {
      if (res.status(200)) {
        if (data.length !== 0) {
          res.send({
            // data,
            status: "OK",
            date: new Date(),
            params: {
              name: stringQuery
            },
            response: {
              name: data[0].name,
              occupation: data[0].occupation,
              status: data[0].status,
              nickname: data[0].nickname,
              "portrayed by": data[0].portrayed
            }
          });
        } else if (data.length === 0) {
          res.send({
            status: "Error",
            Message: "Please Enter a Valid a Character name"
          });
        }
      } else if (res.status(400)) {
        res.send("Error: There is something wrong at the moment.");
      }
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = aadityaServer;
