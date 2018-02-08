import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Play from '../play'

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
                <li className="nav-item"><Link className="nav-link" to="/play">Play</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/scores">Scoreboard</Link></li>
            </ul>
            <Link to="/authenticate"><button className='btn btn-default'>Login/Register</button></Link>
        </div>
        </nav>
    </header>

    <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/play" component={Play} />
    </main>
  </div>
)

export default Main