import { Link } from 'react-router-dom'
import React, { Component } from 'react'

class Play extends Component {
    render(){
        return (
            <div className="row col-md-10 mx-auto mt-2">
                <div className="col-md-4 p-2">
                    <div className="card p-3">
                        <div className="card-block">
                            <h4 className="card-title">Play Against Computer</h4>
                            <p className="card-text">Have nobody around to play against? Why don't you challenge our smart AI?</p>
                            <hr />
                            <Link to="/play/offline"><button className="btn btn-default"><i className="fas fa-laptop"></i> Go</button></Link>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 p-2">
                    <div className="card p-3">
                        <div className="card-block">
                            <h4 className="card-title">Local Multiplayer</h4>
                            <p className="card-text">Challenge your friends in a local area network this local web server is running</p>
                            <hr />
                            <Link to="/play/local"><button className="btn btn-default"><i className="far fa-building"></i> Go</button></Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 p-2">
                    <div className="card p-3">
                        <div className="card-block">
                            <h4 className="card-title">Online Multiplayer</h4>
                            <p className="card-text">Play against a randomly selected opponent or in a public room</p>
                            <hr />
                            <Link to="/play/online"><button className="btn btn-default" disabled><i className="fas fa-users"></i> Go (Coming Soon!)</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )       
    }
}

export default Play