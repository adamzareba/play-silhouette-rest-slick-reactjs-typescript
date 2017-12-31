import * as React from 'react';
import './SignUp.css';
import { authenticationService } from '../../services/authenticationService';
import NavigationBar from '../NavigationBar/NavigationBar';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import {
    FormHelperText,
    TextField } from 'material-ui';
import {
    RouteComponentProps,
    withRouter } from 'react-router';

interface SignUpProperties extends RouteComponentProps<{}> {
    title: string;
}

interface SignUpState {
    username?: string;
    usernameError?: string;
    password?: string;
    passwordError?: string;
    email?: string;
    emailError?: string;
    firstName?: string;
    firstNameError?: string;
    lastName?: string;
    lastNameError?: string;
    credentialsError?: string;
}

class SignUp extends React.Component<SignUpProperties, SignUpState> {

    constructor(props: SignUpProperties) {
        super(props);
        this.state = {
            username: undefined,
            usernameError: undefined,
            password: undefined,
            passwordError: undefined,
            email: undefined,
            emailError: undefined,
            firstName: undefined,
            firstNameError: undefined,
            lastName: undefined,
            lastNameError: undefined,
            credentialsError: undefined
        };
        this.register = this.register.bind(this);
        this.onChange = this.onChange.bind(this);

        if (authenticationService.isAuthenticated()) {
            this.props.history.push('/');
        }
    }

    register() {
        authenticationService.register(this.state.username as string, this.state.password as string, this.state.email as string,
                                       this.state.firstName as string, this.state.lastName as string)
            .then(item => {
                localStorage.setItem('token', item.token);
                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({
                    credentialsError: 'Registration failed. Please, try again.'
                });
            });
    }

    onChange(event: React.FormEvent<HTMLInputElement>) {
        this.validate();
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        } as SignUpState);
    }

    validate() {
        if (!this.state.username || this.state.username.length < 3) {
            this.setState({
                    usernameError: 'Username is too short'
                }
            );
        } else {
            this.setState({
                    usernameError: undefined
                }
            );
        }

        if (!this.state.password || this.state.password.length < 3) {
            this.setState({
                    passwordError: 'Password is too short'
                }
            );
        } else {
            this.setState({
                    passwordError: undefined
                }
            );
        }

        if (!this.state.email || !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)) {
            this.setState({
                    emailError: 'E-mail address is incorrect'
                }
            );
        } else {
            this.setState({
                emailError: undefined
                }
            );
        }

        if (!this.state.firstName || this.state.firstName.length < 3) {
            this.setState({
                    firstNameError: 'First name is too short'
                }
            );
        } else {
            this.setState({
                    firstNameError: undefined
                }
            );
        }

        if (!this.state.lastName || this.state.lastName.length < 3) {
            this.setState({
                    lastNameError: 'Last name is too short'
                }
            );
        } else {
            this.setState({
                    lastNameError: undefined
                }
            );
        }
    }

    render() {
        return (
            <div>
                <NavigationBar/>

                <Grid container={true} alignItems="center" justify="center">
                    <div>
                        <h1>Sign Up Page</h1>

                        <FormHelperText error={this.state.credentialsError !== undefined}>
                            {this.state.credentialsError}
                        </FormHelperText>
                        <br />
                        <TextField
                            error={this.state.usernameError !== undefined}
                            aria-describedby="username-error-text"
                            name="username"
                            onChange={this.onChange}
                            label="Username"
                            value={this.state.username}
                        />
                        <FormHelperText id="username-error-text">{this.state.usernameError}</FormHelperText>
                        <br/>
                        <TextField
                            error={this.state.passwordError !== undefined}
                            aria-describedby="password-error-text"
                            name="password"
                            type="password"
                            onChange={this.onChange}
                            label="Password"
                            value={this.state.password}
                        />
                        <FormHelperText id="password-error-text">{this.state.passwordError}</FormHelperText>
                        <br/>
                        <TextField
                            error={this.state.emailError !== undefined}
                            aria-describedby="email-error-text"
                            name="email"
                            onChange={this.onChange}
                            label="E-mail address"
                            value={this.state.email}
                        />
                        <FormHelperText id="email-error-text">{this.state.emailError}</FormHelperText>
                        <br/>
                        <TextField
                            error={this.state.firstNameError !== undefined}
                            aria-describedby="firstName-error-text"
                            name="firstName"
                            onChange={this.onChange}
                            label="First name"
                            value={this.state.firstName}
                        />
                        <FormHelperText id="firstName-error-text">{this.state.firstNameError}</FormHelperText>
                        <br/>
                        <TextField
                            error={this.state.lastNameError !== undefined}
                            aria-describedby="lastName-error-text"
                            name="lastName"
                            onChange={this.onChange}
                            label="Last name"
                            value={this.state.lastName}
                        />
                        <FormHelperText id="lastName-error-text">{this.state.lastNameError}</FormHelperText>
                        <br/><br/>

                        <Button raised={true} color="primary" onClick={this.register}>
                            Submit
                        </Button>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default withRouter(SignUp);
