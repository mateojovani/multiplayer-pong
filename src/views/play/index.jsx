import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component } from 'react'

class Play extends Component {
    render(){
        return (
            <div className="row col-md-10 mx-auto mt-2">
                <div className="col-md-4 p-2">
                    <div className="card p-3">
                        <div className="card-block">
                            <p className="card-text">Play Against Computer</p>
                            <hr />
                            <button href="/play" className="btn btn-default">Go</button>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 p-2">
                    <div className="card p-3">
                        <div className="card-block">
                            <p className="card-text">Local Multiplayer</p>
                            <hr />
                            <button href="/play" className="btn btn-default">Go</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 p-2">
                    <div className="card p-3">
                        <div className="card-block">
                            <p className="card-text">Online Multiplayer</p>
                            <hr />
                            <button href="/play" className="btn btn-success" disabled>Go</button>
                        </div>
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
)(Play)