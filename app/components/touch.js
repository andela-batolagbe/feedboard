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
