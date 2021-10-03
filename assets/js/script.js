// $(document).ready(function(){
    var currentContainer = $(".currentContainer");
    var currentWeather = $("currentWeather");
    var forecastContainer = $(".card-deck");
    var search = $(".btn");
    // need array to store all cities searched
    var searchHistory = [];

    // add event listener for search button
    search.on("click", function(event) {
        event.preventDefault();
        // take input value to create city's name variable to pass to 5 day forecast function
        var cityName = $(".inputArea").val();
        console.log(cityName);

        // need to add city name to buttons
        var searchedBtn = $("<button class='btn btn-primary' type='button'>Search</button>");
        searchedBtn.click(function(event){
            event.preventDefault();
        })

        searchHistory.push(cityName);
        console.log(cityName);
        // convert object to JSON string
        const jsonCityArr = JSON.stringify(searchHistory);
        // save to local storage
        localStorage.setItem("city", jsonCityArr);
        searchedBtn.text(cityName);
        getWeather(cityName);
    });

    

// });

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
                // pass lat and long to get current weather in separate function
                currentWeather(cityLat, cityLon)
            })
            // create URL for one call with lat and long
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
                    // api call variables
                    var currentTemp = data.current.temp;
                    var currentWind = data.current.wind_speed;
                    var currentHumidity = data.current.humidity;
                    var currentUvIndex = data.current.uvi;
                    var currentDate = data.current.dt;
                    var iconURL = "http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png"
                    console.log(currentTemp);

                    // grab all html elements
                    var todaysDate = moment(currentDate).format(' ' + '(ddd, M/D/YYYY)');
                    var temp = $(".temp");
                    var wind = $(".wind");
                    var humidity = $(".humidity");
                    var uvIndex = $(".uvIndex");
                    var uv = $(".uv");
                    var header = $("#city");
                    var img = $("<img class ='currentImg'/>");
                    img.attr("src", iconURL);

                    // add text and append date and icon
                    temp.text("Temp: " + currentTemp + String.fromCharCode(176) + "F");
                    wind.text("Wind: " + currentWind + " MPH");
                    humidity.text("Humidity: " + currentHumidity + "%");
                    uvIndex.text("UV Index: ");
                    uv.text(currentUvIndex); //separate uv text to only color the background of the index
                    header.append(todaysDate);
                    header.append(img);


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

            clearContent();
            // getHistory();
}

function clearContent(){
    $(".card-deck").html("");
}

// function getHistory() {
//     if(localStorage.getItem("city")) {
//         // get string from local storage
//         searchHistory = JSON.parse(localStorage.getItem("city"));
//         console.log(searchHistory);


//     }
// }