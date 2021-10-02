  var userSearch = "dallas"; //document.getElementById('userInput');
var cityName;
// this URL responds with 5/3 day forecast

// this URL responds with temp, wind, humidity, UV index
// lat and lon defined in fetch

// Get user input to fill in the api url


// Function for fetching data

// function getApi () {
    // user's search value is made into a URL

        cityName = "Dallas"; //userSearch.value;
        var request5Day = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=deb2d4595b0266d3dd7a3a63088c406d`;

    
        
        fetch (request5Day) 

        // lat and lon data is fetched and then put into weather API call
            .then (function (response) {
                console.log(response);
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then (function (data) {
                    var cityLat;
                    var cityLon;
                    var temp5;
                    var wind5;
                    var humidity5;
                console.log(data)
                console.log(data.city.coord)
                // extract lat/long coordinates from data
                cityLat = data.city.coord.lat;
                cityLon = data.city.coord.lon;
                console.log(cityLat);
                console.log(typeof cityLat);
                console.log(cityLon);
                    var requestWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly,daily,alerts&appid=deb2d4595b0266d3dd7a3a63088c406d`;
                    console.log(requestWeather); 
                
                // need to generate html dynamically in for loop and put in data
                for (i = 5; i < data.length; i+8) {
                    temp5 = data.list[i].main.temp; //instead of temp5, grab html element it is going into!!!!
                    wind5 = data.list[i].wind.speed;
                    humidity5 = data.list[i].main.humidity;
                    console.log(temp5);
                }

                fetch (requestWeather)
                
                .then (function (response){
                    console.log(response);
                    if (response.status === 200) {
                        return response.json();
                    }
                })
            .then (function(data)  {
                console.log(data);

                var temp;
                var wind;
                var humidity;
                var uvIndex;

                temp = data.current.temp;
                wind = data.current.wind_speed;
                humidity = data.current.humidity;
                uvIndex = data.current.uvi;
                console.log(temp);
 
            })

        })

// }

// var date = Date.parse(2021-10-02 03:00:00);
// console.log(date);

