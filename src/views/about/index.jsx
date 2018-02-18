import React, { Component } from 'react'

class About extends Component {
    render(){
        return (
            <div className="col-md-10 mx-auto mt-2">
                 <div className="card p-3">
                        <div className="card-block">
                            <h4 className="card-title">About this project</h4>
                            <p className="card-text">
                                This is a small project consisting on React and DOM Canvas rendering. The server runs on Node and Mongo. Socket.IO is used for the web socket connection <br/>
                            </p>
                            <hr />
                            <a href="https://github.com/mateojovani" rel="noopener noreferrer" target="_blank" className="btn btn-primary"><i className="fab fa-github"></i> Find me on  GitHub</a>
                        </div>
                    </div>
            </div>
        )       
    }
}

export default About