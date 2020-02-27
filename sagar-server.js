const fetch = require('node-fetch');

const sagarServer = (req, res) => {
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
    const apiId = '&appid=8c5355ebde563c344d085cfbf8fd1996';

    const zipCode = req.query.zipcode;
    const finalUrl = baseUrl + zipCode + apiId;
    console.log(finalUrl);

    fetch(finalUrl)
        .then(res => res.json())
        .then(data => {
            let status = "";
            if(data.cod == "200"){
                res.send({
                    status: "OK",
                    date: new Date(),
                    params: req.query.zipcode,
                    response: {data} 
                })
            }
            else{
                res.send({
                    status: "Error: Not valid Zipcode"
                })
            }
        })
        .catch( err => {
            console.log(err);
        });
}

module.exports = sagarServer;