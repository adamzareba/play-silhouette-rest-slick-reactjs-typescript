import * as React from 'react';
import './SignUp.css';
import { authenticationService } from '../../services/authenticationService';
import { Redirect } from 'react-router';
import NavigationBar from '../NavigationBar/NavigationBar';

interface SignUpProperties {
    title: string;
}

interface SignUpState {
    username?: string;
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    redirect?: boolean;
}

class SignUp extends React.Component<SignUpProperties, SignUpState> {

    constructor(props: SignUpProperties) {
        super(props);
        this.state = {
            username: undefined,
            password: undefined,
            email: undefined,
            firstName: undefined,
            lastName: undefined,
            redirect: false
        };
        this.register = this.register.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    register() {
        authenticationService.register(this.state.username as string, this.state.password as string, this.state.email as string,
                                       this.state.firstName as string, this.state.lastName as string)
            .then(item => {
                localStorage.setItem('token', item.token);
                this.setState({
                    redirect: true
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        } as SignUpState);
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/"/>);
        }

        if (localStorage.getItem('token')) {
            return (<Redirect to={'/'}/>);
        }

        return (
            <div>
                <NavigationBar/>
                <div className="container">
                    <h1>Sign Up Page</h1>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" placeholder="username" className="form-control" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="password" className="form-control" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="name@example.com" className="form-control" onChange={this.onChange}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="firstName" placeholder="name" className="form-control" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Surname</label>
                        <input type="text" name="lastName" placeholder="surname" className="form-control" onChange={this.onChange}/>
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this.register}>Submit</button>
                </div>
            </div>
        );
    }
}

export default SignUp;
