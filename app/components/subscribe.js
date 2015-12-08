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
