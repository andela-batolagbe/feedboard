import Flux from '../flux';
import searchLocationSpots from '../actions/searchSpot';


class spotsStore {
  constructor() {
    this.bindActions(searchLocationSpots);
    this.place = 'a';
    this.lat = 'a';
    this.lng = 'a';
    this.err = null;
  }

  onSearchSuccess(data) {
    this.place = data.place;
    this.lat = data.placeCord.lat;
    this.lng = data.placeCord.lng;
  } 

onSearchError(err) {
    this.err = err.status + ' error fetching hotspots in your location, try again';
    }

  onUpdateLocation(event) {
    this.location = event.target.value;
  }
}

export default Flux.createStore(spotsStore);
