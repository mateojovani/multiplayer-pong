import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { login } from '../../reducers/authentication'
import { LocalStorage } from '../../utils'

class Login extends Component {
    constructor(props) {
        super(props);

        if(LocalStorage.hasToken())
            this.props.changePage('/')

        this.inputChangeHandler = this.inputChangeHandler.bind(this)
        this.handleLogin = this.handleLogin.bind(this)

        let username, password

        this.state = {
            validationError: false,
            username: username || '',
            password: password || ''
        };
    }

    inputChangeHandler(e) {
        let stateObj = {}
        stateObj[e.target.id] = e.target.value
        this.setState(stateObj)
    }

    validate(){
        let valid = true
        if(this.state.username === "" && this.state.password === ""){
            this.setState({
                validationError: true,
                validationErrorList: ["Username field is required", "Password field is required"]
            })

            valid = false
        } else if(this.state.username === ""){
            this.setState({
                validationError: true,
                validationErrorList: ["Username field is required"]
            })

            valid = false
        } else if(this.state.password === ""){
            this.setState({
                validationError: true,
                validationErrorList: ["Password field is required"]
            })

            valid = false
        }
        
        else {
            this.setState({
                validationError: false
            })

            valid = true
        }   
            
        return valid
    }

    handleLogin(e) {
        e.preventDefault()

        if(this.validate()){
            this.props.login(this.state.username, this.state.password).then(
                resolve => {
                    this.props.changePage('/')
                    LocalStorage.setToken(resolve.data, this.state.username)
                    window.location.reload()
                },
    
                reject => {
                    this.setState({
                        validationError: true,
                        validationErrorList: [reject.data]
                    })
                }
            )
        }
    }

    render() {
        return (
            <div className="col-md-6 mx-auto px-4">
                <form className="form-signin">
                    <h2 className="form-signin-heading">Sign in</h2>
                    
                    { this.state.validationError ? ( 
                        <div className="alert alert-danger" role="alert">
                            {this.state.validationErrorList.map((error, index) => <div key={index}>{ error }</div>)}
                        </div>) : (<span></span>)
                    }
    
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input type="text" id="username" className="form-control" placeholder="Username" required autoFocus value={this.state.username} onChange={this.inputChangeHandler} />
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" id="password" className="form-control" placeholder="Password" required value={this.state.password} onChange={this.inputChangeHandler} />
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleLogin}>Sign in</button>
                    <hr />
                    <Link to="/register">Register</Link>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    login,
    changePage: (page) => push(page)
}, dispatch)

const mapStateToProps = state => ({
    token: state.authentication.token,
    isLoggedIn: state.authentication.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)