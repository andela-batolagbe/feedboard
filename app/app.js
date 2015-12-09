'use strict';

import React from 'react';
import ReactDOM  from 'react-dom';
import Router from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import NavBar from './components/navbar';

let history = createBrowserHistory(); 

ReactDOM.render( <Router history={history}>{routes}</Router> , document.getElementById('app'));
