// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

//Check to see if geolocation is enabled and store geographic coords
$(document).ready(function() {
  
  function getLocation() {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(callAPI);
      
    }
    function callAPI(position) {
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + 
                "&lon=" + position.coords.longitude + "&APPID=1eb6312fea8898dab0a01d28198be121", function(json) {
        var myObject = json;
        console.log(myObject);
        $("#location_name").text(myObject.name + ", " + myObject.sys.country);
        $("#temperature").text((Math.floor(myObject.main.temp)) - 273 + "°");
        $("#weather_condition").text(myObject.weather[0].description.slice(0, 1).toUpperCase() + myObject.weather[0].description.slice(1));
        $("#weather_icon").html("<img src='" + "http://openweathermap.org/img/w/" + myObject.weather[0].icon + ".png'>");
        $("#changeUnit").on('click', function() {
          if($(this).text() === "C") {
            $(this).text("F");
            $("#temperature").text((Math.floor(myObject.main.temp*9/5 - 459.67)) + "°");
          } else {
            $(this).text("C");
            $("#temperature").text((Math.floor(myObject.main.temp)) - 273 + "°");
          }
        });
      });
    }
  }
  getLocation();
  
});


