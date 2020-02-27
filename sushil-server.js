const fetch = require("node-fetch");

const sushilServer = (req, res) => {
  //   console.log("Inside Sushil's top headlines server");
  console.log(req.query);
  stringCountry = req.query.country;

  console.log(req.query.country);

  const url = `https://newsapi.org/v2/top-headlines?country=${stringCountry}&apiKey=`;
  const api_key = "1d6e024d9d664b41a0b5c1d16010c666";

  finalUrl = url + api_key;
  console.log("final: " + finalUrl);

  fetch(finalUrl)
    .then(res => res.json())
    .then(data => {
      if (res.status(200)) {
        if (stringCountry === "") {
          res.send({
            status: "Error",
            Message: "Please Enter a Valid a Country Code"
          });
        } else if (data.articles.length === 0) {
          res.send({
            status: "Error",
            Message: "Please Enter a Valid a Country Code"
          });
        } else {
          res.send({
            status: "OK",
            date: new Date(),
            params: {
              countryName: stringCountry
            },
            response: {
              // Returns all the top-headlines for a particular day for the country
              // articles: data.articles

              // Returns only the single latest news item i.e. one item for the queryString.
              source: data.articles[0].source.name,
              author: data.articles[0].author,
              title: data.articles[0].title,
              description: data.articles[0].description,
              url: data.articles[0].url,
              publishedAt: data.articles[0].publishedAt,
              content: data.articles[0].content
            }
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

module.exports = sushilServer;
