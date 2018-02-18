import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home/index.jsx'
import Play from '../play/index.jsx'
import PlayOffline from '../play/offline.jsx'
import Login from '../authenticate/login.jsx'
import Register from '../authenticate/register.jsx'
import About from '../about/index.jsx'
import { LocalStorage } from '../../utils'

const Main = () => (
  <div>
    <header>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
        <Link className="navbar-brand" to="/">
            <img src="/assets/logo.png" width="32" height="32" className="d-inline-block align-top" alt="" /> Multiplayer Pong
        </Link>
        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item"><Link className="nav-link" to="/play"> Play</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/scores">Scoreboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            </ul>
            {   LocalStorage.hasToken() ? 
                (<button className='btn btn-default' onClick={() => {
                    LocalStorage.flushToken()
                    window.location.reload()
                } }><i className="fas fa-sign-out-alt"></i> Logout</button>):
                (<Link to="/login"><button className='btn btn-success'><i className="fas fa-sign-in-alt"></i> Login</button></Link>)
            }
        </div>
        </nav>
    </header>

    <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/play" component={Play} />
        <Route exact path="/play/offline" component={PlayOffline} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
    </main>
  </div>
)

export default Main