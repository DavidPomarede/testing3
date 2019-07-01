document.body.style.backgroundImage = "url('assets/images/trees.png')";


$( document ).ready(function() {


    var latitude;
    var longitude;
    var searchTerm;
    var searchRefined;
    var searchRefined2;
    var searchRefined3;
    var wikiSearch;
    var QRimg = $('<img>');
    $('#qrstuff').append(QRimg);
    var zipCode;
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
    // var weatherButtons = $('#weatherButtons');
    var recentBox = $('#recentBox');
    // var sunrise = $('#sunrise');
    // var sunset = $('#sunset');
    // var moon = $('#moon');
    var events = $('#events');
    // var recent = $('#recent');
    var wikiSuccess = true;
    // var weatherMsg1;
    // var weatherMsg2;
    // var weatherMsg3;
    // var weatherMsg4;
    // var weatherMsg5;
    // var weatherTemp1;
    // var weatherTemp2;
    // var weatherTemp3;
    // var weatherTemp4;
    // var weatherTemp5;
    // var UVindex1;
    // var UVindex2;
    // var UVindex3;
    // var UVindex4;
    // var UVindex5;
    // var sunrise1;
    // var sunrise2;
    // var sunrise3;
    // var sunrise4;
    // var sunrise5;
    // var sunset1;
    // var sunset2;
    // var sunset3;
    // var sunset4;
    // var sunset5;
    // var moon1;
    // var moon2;
    // var moon3;
    // var moon4;
    // var moon5;
    
    var offset;
    var searches = [];
    
    $('#submit').click(function(){ 
    searchTerm = $('#state');
    searchRefined = searchTerm[0].value;

    searches.push(searchRefined);
    console.log(searches);

    var eventTitle = $('#eventTitle');
    eventTitle.html("<strong>Local Events:</strong>");


    recentBox.empty();
    var recentCard = $('<div>');
    recentCard.attr('class', 'card bg-light mb-3').attr('style', 'max-width: 25rem;');
    var recentCardHead = $('<div>');
    var recentCardBody = $('<div>');
    recentCardHead.attr('class', 'card-header').text('Recent Searches');
    recentCardBody.attr('class', 'card-body').attr('id', 'recent');
    recentCard.append(recentCardHead);
    recentCard.append(recentCardBody);

    recentBox.append(recentCard);

    
    recentCardBody.empty();    
    for(j=0; j<searches.length; j++){
        var searchListItem = $('<p>');
        searchListItem.text(searches[j]).attr('class', 'card-text');

        recentCardBody.append(searchListItem);
    };



    
        // recentCardBody.append(searches);
    // var label1 = $('<label>');
    // label1.attr('class', 'btn btn-secondary active');
    // var radio1 = $('<input>');
    // radio1.attr('type', 'radio').attr('name', 'options').attr('id', 'option1').attr('autocomplete', 'off').attr('checked');
    // radio1.html('Today');
    // label1.append(radio1);
    // weatherButtons.append(label1);
    // var label2 = $('<label>');
    // label2.attr('class', 'btn btn-secondary active');
    // var radio2 = $('<input>');
    // radio2.attr('type', 'radio').attr('name', 'options').attr('id', 'option2').attr('autocomplete', 'off').attr('checked');
    // radio2.html('Today');
    // label2.append(radio1);
    // weatherButtons.append(label2);
    // for(k=1;k<6;k++){
    //     var label = $('<label>');
    //     label.attr('class', 'btn btn-secondary active');
    //     var radio = $('<input>');
    //     radio.attr('type', 'radio').attr('name', 'options').attr('id', 'option'+ [k]).attr('autocomplete', 'off').attr('checked');
    //     radio.text('Today');
    //     label.append(radio);
    //     weatherButtons.append(label);
    // };






    addressDisplay.append();








    wikiSuccess = true;
    
    
    var today = moment(new Date()).format("YYYY-MM-DD");
    var day2 = moment(new Date()).add(1,'days').format("YYYY-MM-DD");
    var day3 = moment(new Date()).add(2,'days').format("YYYY-MM-DD");
    var day4 = moment(new Date()).add(3,'days').format("YYYY-MM-DD");
    var day5 = moment(new Date()).add(4,'days').format("YYYY-MM-DD");
    
    
    
    // GETTING LATITUDE / LONGITUDE FROM MAPQUEST
    
    wikiUrl = "https://open.mapquestapi.com/geocoding/v1/address?key=KL6bvb80lfLEE1Ys5TjUKyu6Be7gdXLX&location="  + searchRefined;
    
        $.ajax({
            type: "GET",
            url: wikiUrl,
            contentType: "application/json; charset=utf-8",
            async: true,
            dataType: "json",
            error: function (request, status, error) {
                console.log("1: " + request.responseText);
            }
          }).then(function(data, success) {
              if(success) {
                latitude = data.results[0].locations[0].latLng.lat;
                longitude = data.results[0].locations[0].latLng.lng;
                // zipCode = data.results[0].locations[0].postalCode;
                searchRefined2 = data.results[0].locations[0].adminArea4;
                searchRefined3 = data.results[0].locations[0].adminArea5;
                var givenAddress = data.results[0].providedLocation.location;
                addressDisplay.html("<strong>" + givenAddress + "</strong>");
                if (searchRefined2 == "") {
                    wikiSearch = searchRefined3;
                } else if (searchRefined3 == "") {
                    wikiSearch = searchRefined2;
                } else if ((searchRefined2 == "")&&(searchRefined3 == "")) {
                    wikiSearch = givenAddress;
                } else {
                    wikiSearch = givenAddress;
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
    
    
    
    // // TIMEZONE INFO
    
    // }).then(function(){$.ajax({
    //     method: "GET",
    //     url: "http://api.timezonedb.com/v2.1/get-time-zone?key=O6FIVUVSCHY5&format=json&by=position&lat=" + latitude + "&lng=" + longitude,
    //     error: function (request, status, error) {
    //         console.log("5: " + request.responseText);
    //     }
    // }).then(function(data10, success) {
    
    
    //     if(wikiSuccess) {
    //         console.log("Timezone data ");
    //         console.log(data10);
    //         console.log(data10.gmtOffset);
    //         offset = (data10.gmtOffset / 60) / 60;
    //         console.log("offset: " + offset);
    //     } else {
    //         return;
    //     };
    //     })
    
    
    
    
    
    // OPEN WEATHER MAP
    
        }).then(function(){$.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast/?lat=" + latitude + "&lon=" + longitude + "&APPID=0cd45b9194d49ecbc168d3cc2ab3902e",
            error: function (request, status, error) {
                console.log("2: " + request.responseText);
            }
        }).then(function(data2) {
            if(wikiSuccess) {
                console.log("Open Weather: ");
                console.log(data2);
                weatherDay.html("<br><strong>Today:</strong> " + data2.list[0].weather[0].description);
                temperature.html("Temp: " + Math.ceil(((data2.list[0].main.temp - 273.15) * 1.8) + 32) + "°F");
                weatherDay2.html("<strong>Tomorrow:</strong> " + data2.list[8].weather[0].description);
                temperature2.html("Temp: " + Math.ceil(((data2.list[8].main.temp - 273.15) * 1.8) + 32) + "°F");
                weatherDay3.html("<strong>The day after tomorrow:</strong> " + data2.list[16].weather[0].description);
                temperature3.html("Temp: " + Math.ceil(((data2.list[16].main.temp - 273.15) * 1.8) + 32) + "°F");
                
                weatherMsg1 = data2.list[0].weather[0].description;
                weatherMsg2 = data2.list[8].weather[0].description;            
                weatherMsg3 = data2.list[16].weather[0].description;
                weatherMsg4 = data2.list[24].weather[0].description;
                weatherMsg5 = data2.list[32].weather[0].description;
            
                weatherTemp1 = Math.ceil(((data2.list[0].main.temp - 273.15) * 1.8) + 32) + "°F";            
                weatherTemp2 = Math.ceil(((data2.list[8].main.temp - 273.15) * 1.8) + 32) + "°F";
                weatherTemp3 = Math.ceil(((data2.list[16].main.temp - 273.15) * 1.8) + 32) + "°F";
                weatherTemp4 = Math.ceil(((data2.list[24].main.temp - 273.15) * 1.8) + 32) + "°F";
                weatherTemp5 = Math.ceil(((data2.list[32].main.temp - 273.15) * 1.8) + 32) + "°F";
            }
            })
    
    // AIR POLLUTION
    
        }).then(function(){$.ajax({
            method: "GET",
            url: "https://cors-anywhere.herokuapp.com/http://api.airpollutionapi.com/1.0/aqi?lat=" + latitude + "&lon=" + longitude + "&APPID=qb5f8bub81ciq4e1rgrf5kcdo1",
            error: function () {
                pm.text("Error: There is no air quality information available for that area. You are too far away from a measurement station (500km+).")
            }
        }).then(function(data3) {
            if(wikiSuccess) {
                console.log("Air Pollution:");
                console.log(data3);
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
                console.log("3: " + request.responseText);
            }    }).then(function(data6) {
                if(wikiSuccess) {
                console.log("Uv INdex:")
                console.log(data6);
                var uvData = data6[0].value;
                var uvData2 = data6[1].value;
                var uvData3 = data6[2].value;
                $('#uvIndex').html("UV Index: " + uvData);
                uvIndex2.text("UV Index: " + uvData2);
                uvIndex3.text("UV Index: " + uvData3);
                UVindex1 = data6[0].value;
                UVindex2 = data6[1].value;
                UVindex3 = data6[2].value;
                UVindex4 = data6[3].value;
                UVindex5 = data6[4].value;
                } else {
                    return;
                }
            })
    
    // POPULATION INFO
    
    
        }).then(function(){$.ajax({
            method: "GET",
            url: "https://cors-anywhere.herokuapp.com/http://www.datasciencetoolkit.org/coordinates2statistics/" + latitude + "%2c" + longitude + "?statistics=population_density",
            error: function (request, status, error) {
                console.log("4: " + request.responseText);
            }
        }).then(function(data7) {
            if(wikiSuccess) {
                console.log("Population info: ");
                console.log(data7);
                var population = data7[0].statistics.population_density.value;
                var popPerMile = Math.ceil(population / 0.6213712);
                populationDisplay.html("<br><strong>Population Density:</strong> <br>" + popPerMile + " inhabitants per Sq. Mile");
            }
            })
    
    //  WIKIPEDIA
    
        }).then(function(){$.ajax({
            method: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=opensearch&search="  + wikiSearch + "&format=json&origin=*",
            error: function (request, status, error) {
                console.log("5: " + request.responseText);
            }
        }).then(function(data8, success) {
    
    
            if(wikiSuccess) {
                console.log("Wikipedia info ");
                console.log(data8);
    
                var wikiInfo = $('#wikiInfo');
                var wikiData = data8[2][0] + data8[2][1];
                var wikiData2 = data8[3][0];
                wikiInfo.html("<p><stong>Fun Facts about " + wikiSearch + ":</strong></p>" + wikiData);
                var stuffToQr = wikiData;
                var getUrl = "https://api.qrserver.com/v1/create-qr-code/?data=" + stuffToQr + "!&size=100x100";
                QRimg.attr('src', getUrl);
                // map widget
                document.getElementById('mapid').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
                var map = L.map('map', {
                    center: [latitude, longitude],
                    zoom: 15
                });
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap'
                }).addTo(map);
                // map popup label
                var popup = L.popup()
                .setLatLng([latitude, longitude])
                .setContent("You are here")
                .openOn(map);
                            } else {
                                return;
                            };
            })
    
    
    
    
    // sunrise/sunset times
    
    // today
    // }).then(function(){$.ajax({
    //     method: "GET",
    //     url: "https://cors-anywhere.herokuapp.com/https://api.sunrise-sunset.org/json?lat=" + latitude + "&lng=" + longitude + "&date=" + today,
    //     error: function (request, status, error) {
    //         console.log("6: " + request.responseText);
    //     }
    // }).then(function(data11, success) {
    //     if(wikiSuccess) {
    //         console.log("Sunrise/sunset ");
    //         console.log(data11); 
    //         console.log(data11.results.sunrise);
    //         console.log(data11.results.sunset);
    //         console.log("making sure offset works " + offset);
    //         var sunriseDate1 = today + " " + data11.results.sunrise;
    //         console.log(moment.utc(sunriseDate1, "YYYY-MM-DD HH:MM:SS A").add(4, 'h'));
    //         console.log(moment(sunriseDate1).add(-4, "Hours"));
    //     } else {
    //         return;
    //     };
    //     })
    
    // // day2
    // }).then(function(){$.ajax({
    //     method: "GET",
    //     url: "https://cors-anywhere.herokuapp.com/https://api.sunrise-sunset.org/json?lat=" + latitude + "&lng=" + longitude + "&date=" + day2,
    //     error: function (request, status, error) {
    //         console.log("7: " + request.responseText);
    //     }
    // }).then(function(data12, success) {
    //     if(wikiSuccess) {
    //         console.log("Sunrise/sunset ");
    //         console.log(data12); 
    //     } else {
    //         return;
    //     };
    //     })
    
    // //day3
    // }).then(function(){$.ajax({
    //     method: "GET",
    //     url: "https://cors-anywhere.herokuapp.com/https://api.sunrise-sunset.org/json?lat=" + latitude + "&lng=" + longitude + "&date=" + day3,
    //     error: function (request, status, error) {
    //         console.log("8: " + request.responseText);
    //     }
    // }).then(function(data13, success) {
    //     if(wikiSuccess) {
    //         console.log("Sunrise/sunset ");
    //         console.log(data13); 
    //     } else {
    //         return;
    //     };
    //     })
    
    
    // //day4
    // }).then(function(){$.ajax({
    //     method: "GET",
    //     url: "https://cors-anywhere.herokuapp.com/https://api.sunrise-sunset.org/json?lat=" + latitude + "&lng=" + longitude + "&date=" + day4,
    //     error: function (request, status, error) {
    //         console.log("9: " + request.responseText);
    //     }
    // }).then(function(data14, success) {
    //     if(wikiSuccess) {
    //         console.log("Sunrise/sunset ");
    //         console.log(data14); 
    //     } else {
    //         return;
    //     };
    //     })
    
    // //day5
    // }).then(function(){$.ajax({
    //     method: "GET",
    //     url: "https://cors-anywhere.herokuapp.com/https://api.sunrise-sunset.org/json?lat=" + latitude + "&lng=" + longitude + "&date=" + day5,
    //     error: function (request, status, error) {
    //         console.log("10: " + request.responseText);
    //     }
    // }).then(function(data15, success) {
    //     if(wikiSuccess) {
    //         console.log("Sunrise/sunset ");
    //         console.log(data15);
    //     } else {
    //         return;
    //     };
    //     })
    
    // // STORMGLASS SUNRISE/ SUNSET
    
    //     }).then(function(){$.ajax({
    //         method: "GET",
    //         url: "https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search?location.longitude=-123.11236500000001&location.latitude=49.279974&expand=venue&client_id=LKOQIDY3WZYVP22KGG",
    //         // beforeSend: function(request) {
    //         //     request.setRequestHeader("Authorization: Bearer LKOQIDY3WZYVP22KGG");
    //         //   },
    //         error: function (request, status, error) {
    //             console.log("eventbrite error: " + request);
    //             console.log("THIS: " + this)
    //             console.log(error);
    //         },
    //         success: function (data12) {
    //             console.log("data12: "+ data12)
    //         }
    //     }).then(function(data12, success) {
    //         console.log('EVENTBRITE SUCCESS')
    //         console.log(data12);
    //         if(wikiSuccess) {
    //             console.log("StormGlass: ");
    //             console.log(data12);

    
    //                         } else {
    //                             return;
    //                         };
    //         })
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search/?q=outdoor&location.address=" + wikiSearch,
        "method": "GET",
        "headers": {
          "Authorization": "Bearer JYTLQXWT72FLMYNCZ25W",
       
          "Accept": "*/*",
          "Cache-Control": "no-cache",
          "Postman-Token": "a2c9afb5-0f2a-464a-a11d-e1775353abdc,72f698c3-f3bc-4a69-82d0-53ac8b22564e",
       
       
          "cache-control": "no-cache"
        }
       }
       
       $.ajax(settings).done(function (response) {
        console.log("Eventbrite222: " + response);
        console.log("*********************************");
        console.log(response);
        console.log(response.events[0].logo.url);
        console.log(response.events[0].description.html);
        console.log(response.events[0].name.text);
        console.log("eventbrite URL: ");
        console.log(response.events[0].url);
        events.empty();
        var box = function() {
            for (i=0; i<10; i++){
                var container = $('<div>');
                container.attr('class', 'card bg-light mb-3').attr('style', 'max-width: 34rem;');
                var title = $('<div>');
                title.attr('class', 'card-header').html("<i>" + response.events[i].name.text + "</i>");
                console.log(response.events[i].name.text);
                container.append(title);
                var cardBody = $('<div>');
                cardBody.attr('class', 'card-body');
                container.append(cardBody);
                var imgP = $('<p>');
                imgP.attr('class', 'card-text');
                var img = $('<img>');
                img.attr('style', 'width: 70%').attr('style', 'max-width: 18rem;');
                imgP.append(img);
                cardBody.append(imgP);
                var text = $('<p>');
                img.attr('src', response.events[i].logo.url);
                console.log(response.events[i].logo.url);
                text.html(response.events[i].description.text).attr('class', 'card-text');
                console.log(response.events[i].description.html);
                cardBody.append(text);
                events.append(container);
                var eventUrl = $('<a>');
                eventUrl.attr('href', response.events[i].url);
                eventUrl.text("Learn More");
                cardBody.append(eventUrl);
            }
        };
        box();
       
       });
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
    
    
    
    //radio buttons:
    
    // $("input[id='option1']").change(function(){
    //     weatherDay.html(weatherMsg1);
    //     temperature.html("Temp: " + weatherTemp1);
    //     uvIndex.html("UV Index: " + UVindex1);
    //     sunrise.html("Sunrise: " + sunrise1);
    //     sunset.html("Sunset: " + sunset1);
    //     moon.html("Moonphase: " + moon1);
    // });
    // $("input[id='option2']").change(function(){
    //     weatherDay.html(weatherMsg2);
    //     temperature.html("Temp: " + weatherTemp2);
    //     uvIndex.html("UV Index: " + UVindex2);
    //     sunrise.html("Sunrise: " + sunrise2);
    //     sunset.html("Sunset: " + sunset2);
    //     moon.html("Moonphase: " + moon2);
    // });
    // $("input[id='option3']").change(function(){
    //     weatherDay.html(weatherMsg3);
    //     temperature.html("Temp: " + weatherTemp3);
    //     uvIndex.html("UV Index: " + UVindex3);
    //     sunrise.html("Sunrise: " + sunrise3);
    //     sunset.html("Sunset: " + sunset3);
    //     moon.html("Moonphase: " + moon3);
    // });
    // $("input[id='option4']").change(function(){
    //     weatherDay.html(weatherMsg4);
    //     temperature.html("Temp: " + weatherTemp4);
    //     uvIndex.html("UV Index: " + UVindex4);
    //     sunrise.html("Sunrise: " + sunrise4);
    //     sunset.html("Sunset: " + sunset4);
    //     moon.html("Moonphase: " + moon4);
    // });
    // $("input[id='option5']").change(function(){
    //     weatherDay.html(weatherMsg5);
    //     temperature.html("Temp: " + weatherTemp5);
    //     uvIndex.html("UV Index: " + UVindex5);
    //     sunrise.html("Sunrise: " + sunrise5);
    //     sunset.html("Sunset: " + sunset5);
    //     moon.html("Moonphase: " + moon5);
    // });
    
    
    
    
    
    // document.addEventListener("DOMContentLoaded",loadPage);
    
    
    // hit return key function
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            $('#submit').click()
        }
     });
    
    
    
    });
    