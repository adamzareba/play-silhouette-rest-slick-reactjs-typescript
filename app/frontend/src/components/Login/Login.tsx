import * as React from 'react';
import './Login.css';
import { Redirect } from 'react-router';
import { authenticationService } from '../../services/authenticationService';
import NavigationBar from '../NavigationBar/NavigationBar';

interface LoginState {
    username?: string;
    password?: string;
    redirect?: boolean;
}

class Login extends React.Component<{}, LoginState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            username: undefined,
            password: undefined,
            redirect: false
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    login() {
        if (this.state.username && this.state.password) {
            authenticationService.login(this.state.username as string, this.state.password as string)
                .then(item => {
                    localStorage.setItem('token', item.token);
                    this.setState({
                        redirect: true
                    });
                    this.context.push({pathname: '/'});
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    onChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        } as LoginState);
    }

    render() {
        if (this.state.redirect || authenticationService.isAuthenticated()) {
            return (<Redirect to={'/'}/>);
        }

        return (
            <div>
                <NavigationBar/>
                <div className="container">
                    <h1>Login Page</h1>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" placeholder="username" className="form-control" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="password" className="form-control" onChange={this.onChange}/>
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this.login}>Submit</button>
                </div>
            </div>
        );
    }
}

export default Login;
