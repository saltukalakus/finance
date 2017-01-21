import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'

import 'bootstrap/dist/css/bootstrap.css'
import './app.css'

import App from './containers/App/App'

import {browserHistory} from 'react-router'
import makeRoutes from './routes'

const routes = makeRoutes()

/*const mountNode = document.querySelector('#root');
ReactDOM.render(
  <App history={browserHistory}
        routes={routes} />,
mountNode);*/

render(
    <App history={browserHistory}
        routes={routes} />,
    document.getElementById('app'))
