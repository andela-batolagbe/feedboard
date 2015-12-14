 import React from 'react';
 import Navbar from './navbar';
 import Home from './home';
 import Footer from './footer';

 class App extends React.Component {
     render() {
       return ( < section >
         < Navbar history ={this.props.history} />
         {this.props.children}
         < Footer />
         < /section>)

       }
     };

export default App;