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
