import Flux from '../flux';

const googleUrl = 'http://maps.google.com/maps/api/js?key=AIzaSyByBWK3irqo2wHU1mnFnx7r49j6JSsrNXI&libraries=places&output?json';

class searchLocationSpots {
  constructor() {
    this.generateActions(
      'searchSpotsSuccess',
      'searchSpotsFail'
    );
  }

  searchSpots(location) {
    $.ajax({
      type: 'POST',
      url: googleUrl,
      data: {location:location}
    })
      .done((data) => {
        this.actions.searchSpotsSuccess(data.message);
      })
      .fail((err) => {
        this.actions.searchSpotsError(err.responseJSON.message);
      });
  }
}

export default Flux.createActions(searchLocationSpots);