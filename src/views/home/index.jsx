import { Link } from 'react-router-dom'
import React, { Component } from 'react'

class Home extends Component {
    render(){
        return (
            <div className="col-md-10 mx-auto mt-2">
                <div className="card p-3">
                <img className="card-img-top mx-auto" src="/assets/pong-game.png" alt="Pong Game" style={{width: '50%'}} height="300"/><br />
                <div className="card-block">
                    <h4 className="card-title">Welcome Player</h4>
                    <p className="card-text">Pong is a two-dimensional sports game that simulates table tennis. <br />
                    You control an in-game paddle by moving it vertically across the left or right side of the screen. You can compete against either a computer-controlled opponent or another player controlling a second paddle on the opposing side. <br />
                    Players use the paddles to hit a ball back and forth. The goal is for you to reach eleven points before the opponent; points are earned when one fails to return the ball to the other.</p>
                    <hr />
                    <Link to="/play"><button className="btn btn-primary"><i className="fas fa-play"></i> Play</button></Link>
                </div>
                </div>
            </div>
        )       
    }
}

export default Home