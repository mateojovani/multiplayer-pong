import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import Main from './views/main/index.jsx'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render( 
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Main />
            </div>
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
)

registerServiceWorker()
