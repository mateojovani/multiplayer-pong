import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { login } from '../../reducers/authentication'

class Login extends Component {
    constructor(props) {
        super(props);
        this.inputChangeHandler = this.inputChangeHandler.bind(this)
        this.handleLogin = this.handleLogin.bind(this)

        let email, password

        this.state = {
            email: email || '',
            password: password || ''
        };
    }

    inputChangeHandler(e){
        let stateObj = {}
        stateObj[e.target.id] = e.target.value
        this.setState(stateObj)
    }

    handleLogin(){
        this.props.login(this.state.email, this.state.password)
    }

    render(){
        return (
            <div className="col-md-6 mx-auto px-4">
                <form className="form-signin">
                    <h2 className="form-signin-heading">Sign in</h2>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input type="email" id="email" className="form-control" placeholder="Email address" required autoFocus value={this.state.email} onChange={this.inputChangeHandler}/>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" id="password" className="form-control" placeholder="Password" required value={this.state.password} onChange={this.inputChangeHandler}/>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={ this.handleLogin }>Sign in</button>
                </form>
            </div>    
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    login
}, dispatch)
  
export default connect(
    null, 
    mapDispatchToProps
)(Login)