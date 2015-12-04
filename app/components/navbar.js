var NavBar = React.createClass({
  render: function() {
    return <nav className = "navbar-fixed z-depth-1 amber darken">
      <div className = "nav-wrapper">
      <image src = "../../assets/images/gidi-logo.jpg"
    className = "brand-logo left text-darken-3">
      </image>
      <ul className="right">
      <li><a className = "btn-flat" href = "/about"> About GidiHots</a></li>
      <li><a className = "btn-flat" href = "/subscribe"> Get Informed</a></li>
      <li><a className = "btn-flat" href = "/contact"> Talk To Us </a></li>
      </ul>
    </div>
    </nav>

  }
});
