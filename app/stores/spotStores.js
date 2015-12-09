import Flux from '../flux';
import searchLocationSpots from '../actions/searchSpot';

class spotsStore {
  constructor() {
    this.bindActions(searchLocationSpots);
    this.location= '';
    this.spots = [];
  }

  onSearchSpotsSuccess(data) {
    this.spots = data;
  }

  onSearchSpotsError(errorMessage) {
    console.log(errorMessage);
  }
}

export default Flux.createStore(spotsStore);