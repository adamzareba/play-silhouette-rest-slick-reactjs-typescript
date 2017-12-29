import * as React from 'react';
import './Home.css';
import { exampleDataService } from '../../services/exampleDataService';
import ColorMessage from '../ColorMessage/ColorMessage';
import BadPassword from '../BadPassword/BadPassword';
import NavigationBar from '../NavigationBar/NavigationBar';

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
                <div className="container">
                    <div className="container">
                        <div>
                            <BadPassword value={this.state.badPassword}/>
                        </div>
                        <div>
                            <h3>Did you know that fancy colors?</h3>
                            {this.state.colors.map(color =>
                                <ColorMessage name={color} key={color}/>
                            )}
                        </div>
                    </div>
                    {!localStorage.getItem('token') &&
                    <div className="starter-template">
                        <p className="lead">To see restricted content, please login or create account.</p>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default Welcome;
