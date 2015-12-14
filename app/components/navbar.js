import React from 'react';
import {Link} from 'react-router';

class NavBar extends React.Component{
  
  render() {
    return (<nav className = "main-nav navbar-fixed z-depth-2 grey darken-4">
      <div className = "nav-wrapper">
      <Link to="/"><image  src = "../../assets/images/gidi-logo.jpg"
    className = "brand-logo left text-darken-3">
      </image></Link>
    <Link to="/" data-activates="mobile" className=" right button-collapse">
    <i className="material-icons yellow-text text-darken-4">menu</i></Link>
      <ul className="right hide-on-med-and-down">
      <li><a className = "btn-flat yellow-text text-darken-4" href= "#about"> About GidiHots</a></li>
      <li ><a className = "btn-flat yellow-text text-darken-4" href= "#subscribe"> Get Informed</a></li>
      <li ><a className = "btn-flat yellow-text text-darken-4" href= "#contact"> Talk To Us </a></li>
      </ul>
      <ul className="right black side-nav" id="mobile">
      <li ><a className = "btn-flat yellow-text text-darken-4" href= "#about"> About GidiHots</a></li>
      <li ><a className = "btn-flat yellow-text text-darken-4" href= "#subscribe"> Get Informed</a></li>
      <li ><a className = "btn-flat yellow-text text-darken-4" href= "#contact"> Talk To Us </a></li>
      </ul>
    </div>
    </nav>)

  }
};

export default NavBar;