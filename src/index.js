import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import {browserHistory} from 'react-router'

import 'bootstrap/dist/css/bootstrap.css'

import App from './containers/App/App'


import makeMainRoutes from './views/Main/routes'

const routes = makeMainRoutes()

render(
    <App history={browserHistory}
        routes={routes} />,
    document.getElementById('app'))