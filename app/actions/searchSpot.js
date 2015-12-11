import Flux from '../flux';

class searchLocationSpots {
  constructor() {
    this.generateActions(
      'updateLocation'
    );
  }

  searchSuccess(response){
    return response;
  }

  searchError(err){
    return err;
  }

  searchSpots(place) {

    let self = this;

    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({
      'address': place,
      componentRestrictions: {
        country: 'NG'
      }
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      
      let locationLatLng = {
        lat: results[0].geometry.location.lat(), 
        lng: results[0].geometry.location.lng()
      }        
       self.searchSuccess({ok: true, place: place, placeCord: locationLatLng});

    }  else {
        self.searchError({ok: false, status: status});
      }
    });

  }

}
export default Flux.createActions(searchLocationSpots);
