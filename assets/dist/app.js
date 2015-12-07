
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

var NavBar = React.createClass({
  render: function() {
    return <nav className = "main-nav navbar-fixed z-depth-2 grey darken-4">
      <div className = "nav-wrapper">
      <image href = "#" src = "../../assets/images/gidi-logo.jpg"
    className = "brand-logo left text-darken-3">
      </image>
      <ul className="right">
      <li><a className = "btn-flat yellow-text text-darken-4" href = "#about"> About GidiHots</a></li>
      <li><a className = "btn-flat yellow-text text-darken-4" href = "#subscribe"> Get Informed</a></li>
      <li><a className = "btn-flat yellow-text text-darken-4" href = "#contact"> Talk To Us </a></li>
      </ul>
    </div>
    </nav>

  }
});

var Subscribe = React.createClass({
  subscribeMessage: "Get updates about happenings near you, subscribe for our weekly event updates.",
  render: function() {
    return <section id="subscribe" className ="sub">
      <div className="m1 center heading"><h4 className="yellow-text text-darken-4">{this.subscribeMessage}</h4>
      </div>
      <div className = "row center sub-wrapper abt-box z-dept-1-half">
   <form className="sub-form col s12">
     <div className="row">
       <div className="input-field col s12">
       <i className="material-icons prefix yellow-text text-darken-4">perm_identity</i>
         <input id="name" type="text" className="validate"/>
         <label className="yellow-text text-darken-4" htmlFor="name">Name</label>
       </div>
     </div>
     <div className="row">
       <div className="input-field col s12">
       <i className="material-icons prefix yellow-text text-darken-4">my_location</i>
         <input id="location" type="email" className="validate"/>
         <label className="yellow-text text-darken-4" htmlFor="location">Location</label>
       </div>
     </div>
     <div className="row">
       <div className="input-field col s12">
        <i className="material-icons prefix yellow-text text-darken-4">email</i>
         <input id="email" type="text" className="validate"/>
         <label className="yellow-text text-darken-4" htmlFor="email">Email</label>
       </div>
     </div>
     </form>
      <button className=" center btn btn-large yellow darken-4 black-text" >Subscribe</button>
      </div>
      </section>

  }
});

var Contact = React.createClass({
  contactMessage: "Add your business and events to our list, get in touch with us.",
  render: function() {
    return <section id="contact" className ="contact-bg">
      <div className="m1 center heading"><h5 className="yellow-text text-darken-4">{this.contactMessage}</h5>
      </div>
      <div className = "row contact-form center">
   <form className="sub-form col s12">
     <div className="row">
       <div className="input-field col s12">
       <i className="material-icons prefix yellow-text text-darken-4">perm_identity</i>
         <input id="name" type="text" className="validate"/>
         <label className="yellow-text text-darken-4" htmlFor="name">Name</label>
       </div>
     </div>
     <div className="row">
       <div className="input-field col s12">
       <i className="material-icons prefix yellow-text text-darken-4">message</i>
         <textarea rows ="4" cols = "2" id="message" type="email" className="materialize-textarea"></textarea>
         <label className="yellow-text text-darken-4" htmlFor="message">Message</label>
       </div>
     </div>
         </form>
      <button className=" center btn z-dept-2 btn-flat yellow darken-4 black-text" >Send</button>
      </div>
      <div className = "center"><h5 className="block info blue-text text-lighten-2">You can also reach us through our mail,</h5>
      <h5 className="email info blue-text text-lighten-2"> contact@gidihots.com
      </h5></div>
      </section>

  }
});

var Footer = React.createClass({
  render: function(){
    return <section>
    <footer className="page-footer yellow darken-4">
    <div className="footer-copyright yellow darken-4">
            <div className="footer">
            © 2015 gidiHots
            <a className="black-text right" href="https://github.com/andela-batolagbe">
            Design with  <i className="material-icons red-text text-lighten-3">favourite</i> by
            Bisoye from Andela </a>
            </div>
          </div>
        </footer>
    </section>
  }
})

'use strict';

var MainPage = React.createClass({
  render: function() {
    return ( <section><NavBar />
      <Landing/>
      <About/>
      <Subscribe/>
      <Contact/>
      <Footer/>
      </section>)

  }
});

ReactDOM.render( <MainPage /> , document.getElementById('main'));
