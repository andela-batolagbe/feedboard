import React from 'react';
import {Link} from 'react-router';
import spotsStore from '../stores/spotStores';

class DisplayResult extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = spotsStore.getState();
  }

  componentDidMount() {
    this.initialize();
  }


  initialize() {
    let mapCanvas = document.getElementById('result-map');
    
    const mapOptions = {
      center: new google.maps.LatLng(this.props.mapLat, this.props.mapLong),
      zoom: this.props.initialZoom
    };
    let map = new google.maps.Map(mapCanvas, mapOptions);

    let infowindow = new google.maps.InfoWindow();

    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: {
        lat: this.props.lat,
        lng: this.props.lng,
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
}
 
  render(){
    return (<section>
    <div>
    <h4 className = "yellow-text text-darken-4 center info detail">Hot Spots Around You.</h4>
    </div>
    <div id = "result-map" className="row col s12">
    </div>
    <div className="center"><Link to='/'><button className=" btn z-dept-2 btn-flat yellow darken-4 black-text">
    Take Me Back</button></Link></div>
    </section>)
  }
}

DisplayResult.defaultProps = {
  initialZoom: 16,
  mapLat: 6.45311,
  mapLong: 3.3958
};

export default DisplayResult;
