import * as React from 'react';
import './Home.css';
import { exampleDataService } from '../../services/exampleDataService';
import ColorMessage from '../ColorMessage/ColorMessage';
import BadPassword from '../BadPassword/BadPassword';
import NavigationBar from '../NavigationBar/NavigationBar';
import { authenticationService } from '../../services/authenticationService';
import { Grid } from 'material-ui';

interface WelcomeState {
    welcomeTitle: string;
    colors: string[];
    badPassword: string;
}

class Welcome extends React.Component<{}, WelcomeState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            welcomeTitle: 'Bootstrap starter template',
            colors: [],
            badPassword: ''
        };
    }

    componentDidMount() {
        exampleDataService.getColors()
            .then(item => this.setState({
                colors: item,
                badPassword: this.state.badPassword
            }));

        let token: string = localStorage.getItem('token') as string;
        if (token != null) {
            exampleDataService.getBadPassword(token)
                .then(item => this.setState({
                    colors: this.state.colors,
                    badPassword: item.result
                }));
        }
    }

    render() {
        return (
            <div>
                <NavigationBar/>

                <Grid container={true} alignItems="center" justify="center" spacing={24}>
                    <Grid item={true} xs={12}>
                        <div>
                            <BadPassword value={this.state.badPassword}/>
                        </div>
                        <div>
                            <h3>Did you know that fancy colors?</h3>
                            {this.state.colors.map(color =>
                                <ColorMessage name={color} key={color}/>
                            )}
                        </div>
                    </Grid>
                    {!authenticationService.isAuthenticated() &&
                    <Grid item={true} xs={12}>
                        <p>To see restricted content, please login or create account.</p>
                    </Grid>
                    }
                </Grid>
            </div>
        );
    }
}

export default Welcome;
