import React, { Component } from 'react'
import { Rect } from 'react-konva'

class Paddle extends Component {
    componentDidMount(){
        if(typeof this.props.onKeyDown === 'function')
            document.addEventListener("keydown", this.props.onKeyDown, false)
    }

    to(destination, callback){
        this.refs.rect.to(destination, callback)
    }

    render() {
        return (
            <Rect
                ref="rect"
                x={this.props.x}
                y={this.props.y}
                width={10}
                height={50}
                fill={this.props.fill}
            />
        )
    }
}

export default Paddle