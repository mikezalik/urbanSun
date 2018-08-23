// UrbanSun JQuery
// variables


var api = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?";
var key = "&APPID=8c77ba2f06ce2e1985605723650676a9";
var lat, lon;
var tempUnit = 'C';
var currentTemperatureInCelsius;

// Geolocation - Lat and Lon for openweathermap api.
$( document ).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  // Temp conversion
  $("#tempunit").click(function () {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
      $("#temperature").text(fahTemperature + " " + String.fromCharCode(176));
    } else {
      $("#temperature").text(currentTemperatureInCelsius + " " + String.fromCharCode(176));
    }
  });
})

// AJAX request - Data received in JSON
function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon + key;
  $.ajax({
    url: urlString, success: function (result) {
      $("#city").text(result.name);
      currentTemperature = Math.round((result.main.temp * 9/5) - 459.67);
      $("#temperature").text(currentTemperature + " " + String.fromCharCode(176));
      $("#summary").text(result.weather[0].description);
      $("#humidity").text(result.main.humidity + "%");
    }
  });
}



