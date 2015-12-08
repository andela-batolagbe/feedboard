
var Landing = React.createClass({
  render: function() {
    return <section className ="landing-bg">
      <div className="center heading"><h1 className="yellow-text text-darken-4">Find the Fun, Then Go Have It!</h1>
      <h4 className="blue-text text-lighten-2">gidiHots tells you what and where it is happening near you, <br />
      then you can decide to join the excitement</h4>
      </div>
      <div className = "row centered z-dept-1-half">
      <div className="input-field col s6">
      <i className="material-icons prefix blue-text text-lighten-2">search</i>
      <input type = "text" className = "blue-text text-lighten-2" id="loc-search"></input>
      <label className="blue-text text-lighten-2" htmlFor="loc-search">Enter your location</label>
      </div>
      <button className =" btn btn-block yellow darken-4 blue-text text-darken-4 submit" >Find</button>
      </div>
      </section>

  }
});
