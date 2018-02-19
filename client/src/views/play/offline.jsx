import React, { Component } from 'react'
import { LocalStorage } from '../../utils'
import { Stage, Layer, Label, Text, Tag } from 'react-konva'
import Paddle from './game/Paddle.jsx'
import Ball from './game/Ball.jsx'

const game = {
    movementSpeed: 0.1,
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
            dx: 15,
            dy: 15
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
            gameStarted: false,
            score: {
                human: "0",
                AI: "0"
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
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

    resetGame(){
        Math.random() >= 0.5 ? game.ball.movement.dy *= 1 : game.ball.movement.dy *= -1
        Math.random() >= 0.5 ? game.ball.movement.dx *= 1 : game.ball.movement.dx *= -1

        game.ball.x = this.state.canvasWidth/2
        game.ball.y = this.state.canvasHeight/2 + 5
        game.humanPaddle.y = this.state.canvasHeight/2 - 25
        game.AIPaddle.y = this.state.canvasHeight/2 - 25

        this.refs.ball.to({
            y : game.ball.y,
            x :  game.ball.x,
            duration : game.movementSpeed
        })

        this.refs.hummanPaddle.to({
            y : game.humanPaddle.y,
            duration : 0.1
        })

        this.refs.hummanPaddle.to({
            y : game.humanPaddle.y,
            duration : 0.1
        })

    }

    startGame(){
        this.setState({
            gameStarted: true
        })

        Math.random() >= 0.5 ? game.ball.movement.dy * 1 : game.ball.movement.dy * -1
        Math.random() >= 0.5 ? game.ball.movement.dx * 1 : game.ball.movement.dx * -1

        this.interval = setInterval(()=> {
            //move ball
            game.ball.y += game.ball.movement.dy
            game.ball.x += game.ball.movement.dx
            this.refs.ball.to({
                y : game.ball.y,
                x :  game.ball.x,
                duration : game.movementSpeed
            })

            //change direction
            if(game.ball.y < 10 || game.ball.y > this.state.canvasHeight - game.ball.radius)
                game.ball.movement.dy *= -1

            if(game.ball.x < 10){
                if(game.ball.y > game.humanPaddle.y && game.ball.y < game.humanPaddle.y + 50)
                    game.ball.movement.dx *= -1
                else{
                    //point for AI
                    this.refs.ball.to({x : -10, duration: 0})
                    this.setState(prevState => ++prevState.score.AI)
                    this.resetGame()
                }    
            }
                
            if(game.ball.x > this.state.canvasWidth - game.ball.radius){
                // if(game.ball.y - game.AIPaddle.y <= 50 - 2*game.ball.radius)
                    game.ball.movement.dx *= -1
            }

            //manage AI
            if(game.ball.x > this.setState.canvasWidth/2){
                game.AIPaddle.y = game.ball.y 
                this.refs.AIPaddle.to({
                    y : game.AIPaddle.y,
                    duration : 0.1
                })
            }else{
               // game.AIPaddle.y = this.setState.canvasHeight/2
                this.refs.AIPaddle.to({
                    y : game.AIPaddle.y,
                    duration : 0.1
                }) 
            }
          

        }, 100)
        
    }

    handlePaddleKeyDown(e){
        if(e.key === 'ArrowDown' && game.humanPaddle.y < this.state.canvasHeight - 55){
            game.humanPaddle.y += 22

            this.refs.hummanPaddle.to({
                y : game.humanPaddle.y,
                duration : 0.1
            })

        } else if(e.key === 'ArrowUp' && game.humanPaddle.y > 5){
            game.humanPaddle.y -= 22

            this.refs.hummanPaddle.to({
                y : game.humanPaddle.y,
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
                        <Label x={12} y={10}>
                            <Text text={this.state.score.human} fontFamily='Calibri' fontSize={40}  fill='blue'/>
                        </Label> 
                        <Label x={this.state.canvasWidth - 30} y={10}>
                            <Text text={this.state.score.AI} fontFamily='Calibri' fontSize={40} fill='blue'/>
                        </Label>        
                        <Paddle 
                            ref="hummanPaddle"
                            x={game.humanPaddle.x} 
                            y={game.humanPaddle.y} 
                            fill={game.humanPaddle.fill} 
                            transformsEnabled='position'
                            onKeyDown={this.handlePaddleKeyDown}/>
                        <Ball 
                            ref="ball"
                            x={game.ball.x} 
                            y={game.ball.y} 
                            fill={game.ball.fill} 
                            transformsEnabled='position'
                            radius={game.ball.radius}/>
                        <Paddle 
                            ref="AIPaddle"
                            x={game.AIPaddle.x} 
                            y={game.AIPaddle.y} 
                            transformsEnabled='position'
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
                                        pointerDirection='down'
                                        pointerWidth={0}
                                        pointerHeight={0}
                                        lineJoin='round'
                                        shadowColor='black'
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
