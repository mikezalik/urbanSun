var api = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/";
var key = "aaf4e3d11b6e88832c7d784e4b1d189f/";
var lat, lon;
var tempUnit = 'C';
var currentTemperatureInCelsius;

$( document ).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  $("#tempunit").click(function () {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temperature").text(fahTemperature + " " + String.fromCharCode(176));
    } else {
      $("#temperature").text(currentTemperatureInCelsius + " " + String.fromCharCode(176));
    }
  });
  
})

var invocation = new XMLHttpRequest();
var url = 'https://api.darksky.net/forecast/';
   
function callOtherDomain() {
  if(invocation) {    
    invocation.open('GET', url, true);
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}

function getWeather(lat, lon) {
  var urlString = api + key+ lat + "," + lon;
  $.ajax({
    url: urlString, success: function (result) {
      $("#timezone").text(result.timezone);
      currentTemperature = Math.round(result.currently.temperature * 10) / 10;
      $("#temperature").text(currentTemperature + " " + String.fromCharCode(176));
      $("#summary").text(result.currently.summary);
    
    }
  });
}

function IconGen(desc) {
  var desc = desc.toLowerCase()
  switch (desc) {
    case 'drizzle':
      addIcon(desc)
      break;
    case 'clouds':
      addIcon(desc)
      break;
    case 'rain':
      addIcon(desc)
      break;
    case 'snow':
      addIcon(desc)
      break;
    case 'clear':
      addIcon(desc)
      break;
    case 'thunderstom':
      addIcon(desc)
      break;
    default:
      $('div.clouds').removeClass('hide');
  }
}

function addIcon(desc) {
  $('div.' + desc).removeClass('hide');
}

