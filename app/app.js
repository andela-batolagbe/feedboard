'use strict';

var MainPage = React.createClass({
  render: function() {
    return ( <section><NavBar />
      <Landing/>
      </section>)

  }
});

ReactDOM.render( <MainPage /> , document.getElementById('main'));
