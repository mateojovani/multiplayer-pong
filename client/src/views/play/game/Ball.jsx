import React, { Component } from 'react'
import { Circle } from 'react-konva'

class Ball extends Component {
    to(destination){
        this.refs.circle.to(destination)
    }

    render() {
        return (
            <Circle
                ref="circle"
                x={this.props.x}
                y={this.props.y}
                radius={this.props.radius}
                fill={this.props.fill}
            />
        )
    }
}

export default Ball