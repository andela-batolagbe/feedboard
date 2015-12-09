import React from 'react';
import {Route} from 'react-router';
import {IndexRoute} from 'react-router';
import App from './components/mainApp';
import Home from './components/home';
import About from './components/about';
import Subscribe from './components/subscribe';
import Contact from './components/contact';

export default (
  <Route path ='/' component={App}>
    <IndexRoute component= {Home} />
    <Route name='home' path='/' component={Home} />
    <Route path='about' component={About} />
    <Route path='subscribe' component={Subscribe} />
    <Route path='contact' component={Contact} />
  </Route>
);
