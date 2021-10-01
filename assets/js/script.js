var cityName = "dallas" //document.getElementById('userInput');

// this URL responds with 5/3 day forecast
var requestUV5 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=deb2d4595b0266d3dd7a3a63088c406d`;

// this URL responds with temp, wind, humidity, UV index
// lat and lon defined in fetch
var cityLat;
var cityLon;
var requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,daily,alerts&appid=deb2d4595b0266d3dd7a3a63088c406d`;

// Get user input to fill in the api url


// Function for fetching data
// var 5dayData = 

fetch (requestUV5) 
    .then (function (response) {
        console.log(response);
        if (response.status === 200) {
            return response.json();
        }
    })
    .then (function (data) {
        console.log(data)
        console.log(data.city.coord)
        // extract lat/long coordinates from data
        cityLat = data.city.coord.lat;
        cityLon = data.city.coord.lon;
        console.log(cityLat);
        console.log(typeof cityLat);
        console.log(cityLon);
        return
    })

console.log(requestURL);