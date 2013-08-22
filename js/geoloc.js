// Requires:
// <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>

var geoloc = {}

if (navigator.geolocation) {
  geoloc.supported = true

  geoloc.locate = function(success) {

    var error = function() {
      console.log("geolocation failed")
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

} else {

  console.log("geolocation not supported")
  geoloc.supported = false

}

geoloc._geocoder = new google.maps.Geocoder();

geoloc.reverseGeocoding = function(lat, lng, callback) {

  var request = {
    'latLng': new google.maps.LatLng(lat, lng)
  }

  geoloc._geocoder.geocode(request, function (results, status) {

      if (status !== google.maps.GeocoderStatus.OK) {
          alert(status);
      }

      if (status == google.maps.GeocoderStatus.OK) {
          console.log("Reverse geocoding results: ", results);
          callback(results);
      }

  });

}

// callback (location, reverseGeocodingResult)
geoloc.perform = function(callback) {
  if (geoloc.supported) {
    geoloc.locate(function(location) {
      console.log("Geolocation: ", location);
      geoloc.reverseGeocoding(location.coords.latitude, location.coords.longitude, function(results) {
        callback(location, results);
      })
    });
  }
}
//
geoloc.findCurrentLocality = function(callback) {
  geoloc.perform(function(loc, res) {
    var components = res[0].address_components;
    var locality = null;
    for (var i = 0; i < components.length; i++) {
      var types = components[i].types;
      var subloc = types.indexOf("sublocality") != -1;
      var loc = types.indexOf("locality") != -1;
      if (subloc || loc) {
        locality = components[i].long_name;
        break;
      }
    }
    if (locality) {
      console.log("Found:", locality);
      callback(locality);
    } else {
      consolor.log("Locality not found")
    }
  })
}
