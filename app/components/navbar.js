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
