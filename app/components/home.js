import React from 'react';
import searchLocationSpots from '../actions/searchSpot';
import spotsStore from '../stores/spotStores';
import Router from 'react-router';

class Home extends  React.Component{

constructor(props) {
    super(props);
    this.state = spotsStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    spotsStore.listen(this.onChange);
  }

  componentWillUnmount() {
    spotsStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

handleClick(event) {
  event.preventDefault();

  var location = this.state.location.trim();
  if (!location){
    return 1;
  }
    searchLocationSpots.searchSpots(location);
    this.props.history.push('searches');
}

  render() {
    return (<section className ="landing-bg">
      <div className="center heading"><h1 className="yellow-text text-darken-4">Find the Fun, Then Go Have It!</h1>
      <h4 className="blue-text text-lighten-2">gidiHots tells you what and where it is happening near you, <br />
      then you can decide to join the excitement</h4>
      </div>
      <form onSubmit={this.handleClick.bind(this)} >
      <div className = "row centered">
      <div className="input-field col s6 z-depth-4">
      <i className="material-icons prefix blue-text text-lighten-2">search</i>
      <input onChange={searchLocationSpots.updateLocation} type = "text" className = "blue-text text-lighten-2" id="loc-search"></input>
      <label className="blue-text text-lighten-2" htmlFor="loc-search">Enter your location</label>
      </div>
     <button type="submit" className =" btn btn-large right yellow darken-4 blue-text text-darken-4" >
      Find</button>
        </div>
      </form>
      </section>)

  }
};

export default Home;