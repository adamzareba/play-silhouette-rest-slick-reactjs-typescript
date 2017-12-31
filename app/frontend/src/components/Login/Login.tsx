import * as React from 'react';
import './Login.css';
import { authenticationService } from '../../services/authenticationService';
import NavigationBar from '../NavigationBar/NavigationBar';
import { FormHelperText, TextField } from 'material-ui';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { RouteComponentProps, withRouter } from 'react-router';

interface LoginState {
    username?: string;
    usernameError?: string;
    password?: string;
    passwordError?: string;
    credentialsError?: string;
}

class Login extends React.Component<RouteComponentProps<{}>, LoginState> {

    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            username: undefined,
            usernameError: undefined,
            password: undefined,
            passwordError: undefined,
            credentialsError: undefined
        };
        this.login = this.login.bind(this);

        if (authenticationService.isAuthenticated()) {
            this.props.history.push('/');
        }
    }

    login() {
        if (this.state.username && this.state.password) {
            authenticationService.login(this.state.username as string, this.state.password as string)
                .then(item => {
                    localStorage.setItem('token', item.token);
                    this.props.history.push('/');
                })
                .catch((error) => {
                    this.setState({
                        credentialsError: 'Username or password is not correct'
                    });
                });
        }
    }

    onChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.validate();
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        } as LoginState);
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
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <Grid container={true} alignItems="center" justify="center">
                    <div>
                        <h1>Login Page</h1>

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
                        <br/><br/>

                        <Button raised={true} color="primary" onClick={this.login}>
                            Submit
                        </Button>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default withRouter(Login);
