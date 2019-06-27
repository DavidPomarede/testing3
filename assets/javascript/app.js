$( document ).ready(function() {





var latitude;
var longitude;
var searchTerm;
var searchTerm2;
var searchRefined;
var searchRefined2;
var searchRefined3;
var wikiSearch;
var wikiResults;
var QRimg = $('<img>');
$('#qrstuff').append(QRimg);
var zipCode;
var weatherUrl;
var pollutionUrl;
console.log(wikiUrl);
var wikiUrl;
var weatherDay = $('#weatherDay');
var weatherDay2 = $('#weatherDay2');
var weatherDay3 = $('#weatherDay3');
var weatherNight = $('#weatherNight');
var temperature = $('#temperature');
var temperature2 = $('#temperature2');
var temperature3 = $('#temperature3');

var populationDisplay = $('#population');
var aqiMessage = $('#aqiMessage');
var pm = $('#pm');
var humidity = $('#humidity');
var pressure = $('#pressure');
var windSpeed = $('#windSpeed');
var windDir = $('#windDir');
var uvIndex = $('#uvIndex');
var uvIndex2 = $('#uvIndex2');
var uvIndex3 = $('#uvIndex3');
var addressDisplay = $('#addressDisplay');

var wikiSuccess = true;



$('#submit').click(function(){ 
searchTerm = $('#state');
searchRefined = searchTerm[0].value;
wikiSuccess = true;

wikiUrl = "https://open.mapquestapi.com/geocoding/v1/address?key=KL6bvb80lfLEE1Ys5TjUKyu6Be7gdXLX&location="  + searchRefined;

    $.ajax({
        type: "GET",
        url: wikiUrl,
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: "json",
        error: function (request, status, error) {
            alert(request.responseText);
        }
      }).then(function(data, success) {
          console.log(success);
          if(success) {
            
            console.log(data);
            console.log(data.results[0].locations[0].latLng.lat);
            console.log(data.results[0].locations[0].latLng.lng);
            console.log(data.results[0].locations[0].postalCode);
            latitude = data.results[0].locations[0].latLng.lat;
            longitude = data.results[0].locations[0].latLng.lng;
            zipCode = data.results[0].locations[0].postalCode;
            console.log(zipCode);
            console.log("Address: " + data.results[0].providedLocation.location);
            console.log("Address: " + data.results[0].locations[0].adminArea4);
            console.log("Address: " + data.results[0].locations[0].adminArea5);
            searchRefined2 = data.results[0].locations[0].adminArea4;
            searchRefined3 = data.results[0].locations[0].adminArea5;
            var givenAddress = data.results[0].providedLocation.location;
            addressDisplay.html("<strong>" + givenAddress + "</strong>");
            if (searchRefined2 == "") {
                wikiSearch = searchRefined3;
                console.log("wikiSearch: " + wikiSearch); 
            } else if (searchRefined3 == "") {
                wikiSearch = searchRefined2;
                console.log("wikiSearch: " + wikiSearch); 
            } else if ((searchRefined2 == "")&&(searchRefined3 == "")) {
                wikiSearch = givenAddress;
                console.log("wikiSearch: " + wikiSearch); 
            };
            weatherUrl = "https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + zipCode + "?apikey=Hh3qVnjiiZZFlhLgskjnE1kxf4orP7uN";                    
            console.log("WIKISEARCH: " + wikiSearch);
            if (wikiSearch == "") {
                wikiSearch = "error";
                wikiSuccess = false;
                addressDisplay.html("<strong>Please enter a valid address, city, postcode or place name.</strong>")
                clearDivs();
            }
          } else {
              return;
          }

    }).then(function(){$.ajax({
        method: "GET",
        url: "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast/?lat=" + latitude + "&lon=" + longitude + "&APPID=0cd45b9194d49ecbc168d3cc2ab3902e",
        error: function (request, status, error) {
            alert(request.responseText);
        }
    }).then(function(data2) {
        if(wikiSuccess) {
            console.log("weather: " + data2);
            console.log(data2);
            console.log(data2.list[0].weather[0].description);
            console.log(data2.list[0].main.temp);
            weatherDay.html("Today: " + data2.list[0].weather[0].description);
            temperature.html("Temp: " + Math.ceil(((data2.list[0].main.temp - 273.15) * 1.8) + 32) + "°F");
            weatherDay2.html("Tomorrow: " + data2.list[8].weather[0].description);
            temperature2.html("Temp: " + Math.ceil(((data2.list[8].main.temp - 273.15) * 1.8) + 32) + "°F");
            weatherDay3.html("The day after tomorrow: " + data2.list[16].weather[0].description);
            temperature3.html("Temp: " + Math.ceil(((data2.list[16].main.temp - 273.15) * 1.8) + 32) + "°F");
        }
        })
    }).then(function(){$.ajax({
        method: "GET",
        url: "https://cors-anywhere.herokuapp.com/http://api.airpollutionapi.com/1.0/aqi?lat=" + latitude + "&lon=" + longitude + "&APPID=qb5f8bub81ciq4e1rgrf5kcdo1",
        error: function () {
            pm.text("Error: There is no air quality information available for that area. You are too far away from a measurement station (500km+).")
        }
    }).then(function(data3) {
        if(wikiSuccess) {
            console.log("weather: " + data3);
            console.log(data3);
            console.log(data3.msg);
            console.log(data3.data.alert);
            console.log(data3.data.aqiParams[0].value);
            console.log(data3.data.aqiParams[1].value);
            console.log(data3.data.aqiParams[2].value);
            console.log(data3.data.aqiParams[3].value);
            console.log(data3.data.aqiParams[4].value);
            aqiMessage.text(data3.data.alert);
            $('#pm').text(data3.msg);
            // pm.html(JSON.stringify(data3.data.aqiParams));
            pm.html("<br><strong>Air Quality:</strong><br>Particulate matter: " + data3.data.aqiParams[0].value);
            humidity.text("Humidity: " + data3.data.aqiParams[1].value);
            pressure.text("Pressure: " + data3.data.aqiParams[2].value);
            windSpeed.text("Wind Speed: " + data3.data.aqiParams[3].value);
            windDir.text("Wind Direction: " + data3.data.aqiParams[4].value);
        } else {
            return;
        }
        })       
    }).then(function(){$.ajax({
        method: "GET",
        url: "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=0cd45b9194d49ecbc168d3cc2ab3902e",
        error: function (request, status, error) {
            alert(request.responseText);
        }    }).then(function(data6) {
            if(wikiSuccess) {
            console.log(data6);
            console.log(data6[0].value);
            console.log(data6[1].value);
            console.log(data6[2].value);
            var uvData = data6[0].value;
            var uvData2 = data6[1].value;
            var uvData3 = data6[2].value;
            $('#uvIndex').html("UV Index: " + uvData);
            uvIndex2.text("UV Index: " + uvData2);
            uvIndex3.text("UV Index: " + uvData3);
            } else {
                return;
            }
        })
    }).then(function(){$.ajax({
        method: "GET",
        url: "https://cors-anywhere.herokuapp.com/http://www.datasciencetoolkit.org/coordinates2statistics/" + latitude + "%2c" + longitude + "?statistics=population_density",
        error: function (request, status, error) {
            alert(request.responseText);
        }
    }).then(function(data7) {
        if(wikiSuccess) {
            console.log(data7);
            console.log(data7[0].statistics.population_density.value);
            var population = data7[0].statistics.population_density.value;
            var popPerMile = Math.ceil(population / 0.6213712);
            populationDisplay.html("<br><strong>Population Density:</strong> <br>" + popPerMile + " inhabitants per Sq. Mile");
            console.log("population density: " + data7);
        }
        })
    }).then(function(){$.ajax({
        method: "GET",
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&search="  + wikiSearch + "&format=json&origin=*",
        error: function (request, status, error) {
            alert(request.responseText);
        }
    }).then(function(data8, success) {
        console.log(success);
        console.log("DATA 8 " + data8);
        if(wikiSuccess) {
            console.log(data8);
            console.log("wikipedia: " + data8[2][1]);
            console.log("wikipedia: " + data8[2][0]);
            console.log("wikipedia: " + data8[3][0]);
            var wikiInfo = $('#wikiInfo');
            var wikiData = data8[2][0] + data8[2][1];
            var wikiData2 = data8[3][0];
            wikiInfo.text(wikiData);
            var stuffToQr = wikiData;
            var getUrl = "https://api.qrserver.com/v1/create-qr-code/?data=" + stuffToQr + "!&size=100x100";
            QRimg.attr('src', getUrl);
            // map widget
            document.getElementById('mapid').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
            var map = L.map('map', {
                center: [latitude, longitude],
                zoom: 15
            });
            L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap'
            }).addTo(map);
            // map popup label
            console.log("5th lat" + latitude)
            var popup = L.popup()
            .setLatLng([latitude, longitude])
            .setContent("You are here")
            .openOn(map);
                        } else {
                            return;
                        };
        })
    });



// trying to reset the search here:
	searchTerm = $('#state');
  searchTerm[0].value = '';
});



var clearDivs = function() {
    weatherDay.empty();
    weatherDay2.empty();
    weatherDay3.empty();
    weatherNight.empty();
    temperature.empty();
    temperature2.empty();
    temperature3.empty();
    populationDisplay.empty();
    aqiMessage.empty();
    pm.empty();
    humidity.empty();
    pressure.empty();
    windSpeed.empty();
    windDir.empty();
    uvIndex.empty();
    uvIndex2.empty();
    uvIndex3.empty();
    $('#mapid').empty();
    $('#wikiInfo').empty();
    QRimg.empty();
    $('#qrstuff').empty();
    // addressDisplay.clear();
};

//more stuff below

$("#message").html("<h1>Travel Information</h1>");


// document.addEventListener("DOMContentLoaded",loadPage);

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        console.log("hi")
        $('#submit').click()
        // Do more work
    }
 });

});
