 import React from 'react';
 import Navbar from './navbar';
 import Home from './home';
 import About from './about';
 import Subscribe from './subscribe';
 import Contact from './contact';
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