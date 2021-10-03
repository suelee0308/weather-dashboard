var currentContainer = $(".currentContainer");
var currentWeather = $("currentWeather");
var forecastContainer = $(".card-deck");
var currentContainer = $(".currentContainer");
var search = $(".btn");

// add event listener for search button
search.on("click", function(event) {
    event.preventDefault();
    var cityName = $(".inputArea").val();
    console.log(cityName);
    getWeather(cityName);

});

function getWeather(cityName) {
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
                console.log(data)
                console.log(data.city.coord)
                // extract lat/long coordinates from data
                cityLat = data.city.coord.lat;
                cityLon = data.city.coord.lon;
                console.log(cityLat);
                console.log(typeof cityLat);
                console.log(cityLon);

                // city name in header
                var cityHeader = $("#city");
                var cityDataName = data.city.name;
                console.log(cityDataName);
                console.log(typeof cityDataName);
                cityHeader.text(cityDataName);

                
                // need to generate html dynamically in for loop and put in data
                for (i = 5; i < data.list.length; i+=8) {
                    var day = moment(data.list[i].dt_txt).format('ddd, M/D/YYYY');
                    var temp5 = data.list[i].main.temp; //instead of temp5, grab html element it is going into!!!!
                    var wind5 = data.list[i].wind.speed;
                    var humidity5 = data.list[i].main.humidity;
                    var iconURL = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png"
                    console.log(day);
                    console.log(iconURL);
                    // variables for all elements in the card for 5 day forecast
                    var forecastCards = $("<div class = 'card forecastCards'>");
                    var img = $("<img class = 'card-img-top' alt='5 day forecast icon'/>");
                    img.attr("src", iconURL);
                    var cardBodyDiv = $("<div class = 'card-body'>");
                    var date = $("<h4 class='card-title'></h4>");
                    var temp = $("<p class='card-text temp5'></p>");
                    var wind = $("<p class='card-text wind5'></p>");
                    var humidity = $("<p class='card-text humidity5'></p>");
                    // add text to each element from data
                    date.text(day);
                    temp.text("Temp: " + temp5 + String.fromCharCode(176) + "F");
                    wind.text("Wind: " + wind5 + " MPH");
                    humidity.text("Humidity: " + humidity5 + "%");
                    // append logistically into divs
                    cardBodyDiv.append(date);
                    cardBodyDiv.append(temp);
                    cardBodyDiv.append(wind);
                    cardBodyDiv.append(humidity);
                    forecastCards.append(img);
                    forecastCards.append(cardBodyDiv);
                    forecastContainer.append(forecastCards);

                }

                currentWeather(cityLat, cityLon)
            })

            function currentWeather(cityLat, cityLon) {
                    var requestWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly,daily,alerts&appid=deb2d4595b0266d3dd7a3a63088c406d`;
                    console.log(requestWeather); 

                // second fetch with above-complete api url
                fetch (requestWeather)
                
                .then (function (response){
                    console.log(response);
                    if (response.status === 200) {
                        return response.json();
                    }
                })
                .then (function(data)  {
                    console.log(data);

                    var currentTemp = data.current.temp;
                    var currentWind = data.current.wind_speed;
                    var currentHumidity = data.current.humidity;
                    var currentUvIndex = data.current.uvi;
                    var currentDate = data.current.dt;
                    console.log(currentTemp);

                    var todaysDate = moment(currentDate).format(' ' + '(ddd, M/D/YYYY)');
                    var temp = $(".temp");
                    var wind = $(".wind");
                    var humidity = $(".humidity");
                    var uvIndex = $(".uvIndex");
                    var uv = $(".uv");
                    var header = $("#city");

                    temp.text("Temp: " + currentTemp + String.fromCharCode(176) + "F");
                    wind.text("Wind: " + currentWind + "MPH");
                    humidity.text("Humidity: " + currentHumidity + "%");
                    uvIndex.text("UV Index: ");
                    uv.text(currentUvIndex);
                    header.append(todaysDate);

                    // add if/else for color of uv number)
                    if (currentUvIndex <=3) {
                        uv.css({"background-color": "green", "color": "white", "padding":"8px", "border-radius":"8px"});
                    } else if (currentUvIndex > 3 && currentUvIndex < 8){
                        uv.css({"background-color": "gold", "padding":"8px", "border-radius":"8px"})
                    } else {
                        uv.css({"background-color": "red", "color": "white", "padding":"8px", "border-radius":"8px"})
                    }

                })
            }

}

