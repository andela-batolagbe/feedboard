var About = React.createClass({
  getDefaultProps: function() {
    return {
      catchQuestns: "We know you love to have fun, but do you know all the fun places around \n you? " +
      "Are you aware of the exciting events happening this weekend in your hood? Are you just visiting Lagos?",
      aboutMessage: "gidiHots let you know where its happening, we tell you where to go, and show you all the fun spot around you. " +
      "No matter your area of interest, clubs, parties, concerts, cinema and movie premieres, sport events, and any other interesting activity "+
      "we get you informed, its simple, just provide your location or a city in Lagos you're considering visiting and "+
      "you get all the hotspots and events apears on a map as shown with directions to the places, its absolutely free!",
      initialZoom: 16,
      mapLat: 6.4311,
      mapLong: 3.4158
    };
  },
  componentDidMount: function initialize() {
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
      center: new google.maps.LatLng(this.props.mapLat, this.props.mapLong),
      zoom: this.props.initialZoom
    };
    var map = new google.maps.Map(mapCanvas, mapOptions)

    var infowindow = new google.maps.InfoWindow();

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: {
        lat: 6.4311,
        lng: 3.4158
      },
      radius: 500,
      types: ['restaurant', 'cafe', 'movie_theater', 'night_club']
    }, callback);

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
},

render: function() {

  return <section id = "about" className = "about-bg" >
    < div className = "z-depth-2">
    <div id= "map-canvas" ></div>
    </div>
    <div className = "detail center">
    <div className = "abt-box col s6 z-depth-2">
    < h5 className = "yellow-text text-darken-4" >{this.props.catchQuestns} </h5>
        < h5 className = "info blue-text text-lighten-2" >{this.props.aboutMessage} </h5>
    </div>
    </div>
  </section>

}
});
