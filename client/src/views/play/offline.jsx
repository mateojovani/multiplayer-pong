import React, { Component } from 'react'
import { LocalStorage } from '../../utils'
import { Stage, Layer, Label, Text, Tag } from 'react-konva'
import Paddle from './game/Paddle.jsx'
import Ball from './game/Ball.jsx'

const game = {
    movementSpeed: 0.2,
    humanPaddle: {
        x: 0,
        y: 0,
        fill: 'green'
    },
    AIPaddle: {
        x: 0,
        y: 0,
        fill: 'blue' 
    },
    ball: {
        x: 0,
        y: 0,
        radius: 8,
        fill: 'red',
        movement: {
            dx: 10,
            dy: 10
        }
    },
    start:{
        x: 0,
        y: 0,
        opacity: 0.75
    }      
}

class PlayOffline extends Component {
    constructor(props){
        super(props)
        
        if(!LocalStorage.hasToken())
            this.props.changePage('/login')
        
        this.handlePaddleKeyDown = this.handlePaddleKeyDown.bind(this)    
        this.startGame = this.startGame.bind(this)    

        this.state = {
            canvasWidth: 0,
            canvasHeight: 0,
            gameStarted: false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
        }   
    }

    componentDidMount(){
        //set canvas fill
        this.refs.layer.canvas._canvas.style.backgroundColor = '#ecf0f1'

        //set canvas size
        this.setState((prevState) => {
            prevState.canvasHeight = window.innerHeight - 200
            prevState.canvasWidth = this.refs.canvasParent.offsetWidth - 40

            //set game obj positions
            game.humanPaddle.y = prevState.canvasHeight/2 - 25
            game.AIPaddle.x = prevState.canvasWidth - 10
            game.AIPaddle.y = prevState.canvasHeight/2 - 25
            game.ball.x = prevState.canvasWidth/2
            game.ball.y = prevState.canvasHeight/2 + 5
            game.start.x = prevState.canvasWidth/2
            game.start.y = prevState.canvasHeight/2 + 15

            return prevState
        })
    }

    componentWillUnmount() {
        if(this.state.gameStarted){
            alert('Game is about to quit')
            window.location.reload()
            clearInterval(this.interval)
        }
    }

    startGame(){
        this.setState({
            gameStarted: true
        })

        this.interval = setInterval(()=> {
            let newY = game.ball.y + game.ball.movement.dy
            game.ball.y = newY

            let newX = game.ball.x + game.ball.movement.dx
            game.ball.x = newX

            this.refs.ball.to({
                y : newY,
                x : newX,
                duration : game.movementSpeed
            })

            //change direction
            if(newY < 5 || newY > this.state.canvasHeight - 5)
                game.ball.movement.dy *= -1

            // if(newX < 0 || newX > this.state.canvasWidth - 5)
            if(newX < 0){
                if(game.ball.y - game.humanPaddle.y <= 50 - 2*game.ball.radius)
                    game.ball.movement.dx *= -1
            }
                
            if(newX > this.state.canvasWidth - 5){
                // if(game.ball.y - game.AIPaddle.y <= 50 - 2*game.ball.radius)
                    game.ball.movement.dx *= -1
            }

        }, 100)
        
    }

    handlePaddleKeyDown(e){
        const humanPaddle = this.refs.hummanPaddle
      
        if(e.key === 'ArrowDown' && game.humanPaddle.y < this.state.canvasHeight - 55){
            let newY = game.humanPaddle.y + 25
            game.humanPaddle.y = newY

            humanPaddle.to({
                y : newY,
                duration : 0.1
            })

        } else if(e.key === 'ArrowUp' && game.humanPaddle.y > 5){
            let newY = game.humanPaddle.y - 25
            game.humanPaddle.y = newY

            humanPaddle.to({
                y : newY,
                duration : 0.1
            })
        } else if(e.key === 'Enter' && !this.state.gameStarted){
            this.startGame()
        }   
    }

    render(){
        return (
            <div ref='canvasParent' className="col-md-6 mx-auto mt-2" style={{color:'red'}}>
                <Stage width={this.state.canvasWidth} height={this.state.canvasHeight}>
                    <Layer ref="layer">
                        <Paddle 
                            ref="hummanPaddle"
                            x={game.humanPaddle.x} 
                            y={game.humanPaddle.y} 
                            fill={game.humanPaddle.fill} 
                            onKeyDown={this.handlePaddleKeyDown}/>
                        <Ball 
                            ref="ball"
                            x={game.ball.x} 
                            y={game.ball.y} 
                            fill={game.ball.fill} 
                            radius={game.ball.radius}/>
                        <Paddle 
                            ref="AIPaddle"
                            x={game.AIPaddle.x} 
                            y={game.AIPaddle.y} 
                            fill={game.AIPaddle.fill}/>
                        {this.state.gameStarted ? 
                            null : <Label
                                ref="start"
                                x={game.start.x}
                                y={game.start.y}
                                opacity={game.start.opacity}
                                onClick={this.startGame}>
                                    <Tag
                                        fill='blue'
                                        pointerDirection= 'down'
                                        pointerWidth={0}
                                        pointerHeight={0}
                                        lineJoin= 'round'
                                        shadowColor= 'black'
                                        />
                                    <Text
                                        text='Start'
                                        fontFamily='Calibri'
                                        fontSize={18}
                                        padding={5}
                                        fill='white'
                                        />
                                </Label>    
                        }    
                    </Layer>
                </Stage>
            </div>
        )       
    }
}

export default PlayOffline
