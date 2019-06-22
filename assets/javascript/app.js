//mapbox info
// stuff and stuff

var map = L.map('mapid', {
     //center: [43.64701, -79.39425], //comment out one of the centers
     center: [40, -80],
     zoom: 15
   });
   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);



//var mymap = L.map('mapid').setView([51.505, -0.09], 13);

//L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   maxZoom: 18,
//    id: 'mapbox.streets',
//    accessToken: 'your.mapbox.access.token'
//}).addTo(mymap);

//var marker = L.marker([51.5, -0.09]).addTo(mymap);

//var circle = L.circle([51.508, -0.11], {
//    color: 'red',
//    fillColor: '#f03',
//    fillOpacity: 0.5,
//    radius: 500
//}).addTo(mymap);

var popup = L.popup()
    .setLatLng([40, -80])
    .setContent("Hello World.")
    .openOn(map);

//wikipedia search



var searchTerm;
var searchRefined;
var wikiResults;
var QRimg = $('<img>');
$('#qrstuff').append(QRimg);

console.log(wikiUrl);
var wikiUrl;

// $(document).ready(function(){
$('#submit').on("click", function(){ 
searchTerm = $('#state');
searchRefined = searchTerm[0].value;

wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search="  + searchRefined + "&format=json&origin=*";


    $.ajax({
        type: "GET",
        url: wikiUrl,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log(data[2][0]);
            wikiResults = data[2][0];
        },
        error: function (errorMessage) {
        }
    });
	searchTerm = $('#state');
  console.log(wikiResults);
  var stuffToQr = wikiResults;
  var getUrl = "http://api.qrserver.com/v1/create-qr-code/?data=" + stuffToQr + "!&size=100x100";
  $('#results').text(wikiResults);
  QRimg.attr('src', getUrl);
});

//more stuff below

$("#message").html("<h1>Stuff to QR</h1>");




// QRimg.attr('src', getUrl);


//$('#submit').on("click", function() {

//var stateValue = state[0].value.trim();
//var breweryValue = brewery[0].value.trim();


//mapboxgl.accessToken = 'undefined';
//var map = new mapboxgl.Map({
//container: 'map',
//style: 'mapbox://styles/mapbox/streets-v9'
//});


//?by_state=NY
//&by_name=cooper
//&by_tag=patio
//&by_type=micro



var patioOptions = ['dog-friendly', 'patio', 'food-service', 'food-truck', 'tours'];
var typeOptions = ['micro','regional','brewpub','large','planning','bar','contract','proprietor'];

for (var i = 0; i < patioOptions.length; i++) {
	var option1 = $('<option>');
	option1.attr('id', 'typeSelect1');
	option1.attr('value', 'val'+patioOptions[i].indexOf());
	option1.text(patioOptions[i]);
	$('#select1').append(option1);
};

//for (var j = 0; j < typeOptions.length; j++) {
//        var option2 = $('<option>');
//        option2.attr('id', 'typesSelect2');
//        option2.attr('value', 'val'+typeOptions[j].indexOf());
//        option2.text(typeOptions[j]);
//        $('#select2').append(option2);
//};




//getUrl += '?' + $.param({
//	'X-RapidAPI-Host': 'brianswu-open-brewery-db-v1'
//});
//getUrl += '?' + $.param({
//	'X-RapidAPI-Key': '8c39383b6amsh3d2896d8d2ecd7cp1a2540jsn0b22b35cb22f'
//});


//if (stateValue != "") {
//        console.log(stateValue);
//        getUrl += "&by_state=" + stateValue;
//};

//if (breweryValue != "") {
//        console.log(breweryValue);
//        getUrl += "&by_name=" + breweryValue;
//};



//$.ajax({
//	url: getUrl,
//	type: "GET",
//	dataType: 'JSON',
//	success: function(data) {
//		console.log(data);
//	},
//	error: function() {
//		console.log("failure to retrieve API");
//	}
//});

//});
