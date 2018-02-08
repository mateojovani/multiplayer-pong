import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component } from 'react'

class Home extends Component {
    render(){
        return (
            <div class="col-md-12" style={{"top": "20px"}}>
                <div className="card" style={{"width": "80%", "padding": "10px", "margin": "auto"}}>
                <div className="card-block">
                    <h4 className="card-title">Welcome Player</h4>
                    <p className="card-text">Pong is a two-dimensional sports game that simulates table tennis. <br />
                    You control an in-game paddle by moving it vertically across the left or right side of the screen. You can compete against either a computer-controlled opponent or another player controlling a second paddle on the opposing side. <br />
                    Players use the paddles to hit a ball back and forth. The goal is for you to reach eleven points before the opponent; points are earned when one fails to return the ball to the other.</p>
                    <hr />
                    <a href="/play" className="btn btn-primary">Play</a>
                </div>
                </div>
            </div>
        )       
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/play')
}, dispatch)

export default connect(
  null, 
  mapDispatchToProps
)(Home)