import * as React from 'react';
import './NavigationBar.css';
import { authenticationService } from '../../services/authenticationService';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/Menu/MenuItem';
import { Link } from 'react-router-dom';

interface NavigationBarState {
    isAuthenticated: boolean;
    open: boolean;
    anchorEl?: HTMLElement;
}

class NavigationBar extends React.Component<{}, NavigationBarState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            isAuthenticated: authenticationService.isAuthenticated(),
            open: false,
            anchorEl: undefined
        };

        this.logout = this.logout.bind(this);
    }

    handleClick = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({open: true, anchorEl: event.currentTarget});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    logout() {
        localStorage.setItem('token', '');
        localStorage.clear();
        this.setState({
            isAuthenticated: false
        });
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Button aria-owns={this.state.open ? 'simple-menu' : null} onClick={this.handleClick} color="contrast">
                        Actions
                    </Button>
                    <Menu id="simple-menu" anchorEl={this.state.anchorEl} open={this.state.open} onClose={this.handleClose}>
                        <MenuItem onClick={this.handleClose}>
                            <Link to={'/'}>Home</Link>
                        </MenuItem>
                    </Menu>

                    <Typography type="title" color="inherit">
                        Silhouette FrontEnd App
                    </Typography>
                    {!this.state.isAuthenticated &&
                    <Button color="contrast" href={'/login'}>Login</Button>
                    }
                    {this.state.isAuthenticated &&
                    <Button color="contrast" href={'/'} onClick={this.logout}>Logout</Button>
                    }
                    {!this.state.isAuthenticated &&
                    <Button color="contrast" href={'/signup'}>Sign Up</Button>
                    }
                </Toolbar>
            </AppBar>
        );
    }
}

export default NavigationBar;
