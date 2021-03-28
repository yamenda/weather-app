const request = require('request');

const forecast = (long, lat, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=72afa6da39bf276e139bb8047cffcfb5&query=" + lat + "," + long + "&units=f";
    request({url, json: true}, (error, { body }) => {
    
        if(error) {
            callback("Unable to connect to weather service!.", undefined);
        }else if (body.error) {
            callback("Unable to find location. Try another search.", undefined);
        }else {
            callback(undefined, body.current.weather_descriptions[0] + ", It is currntly: " + body.current.temperature + ". There is a " + body.current.precip + "% chance to raine.");  
        }

    });
}

module.exports = forecast;