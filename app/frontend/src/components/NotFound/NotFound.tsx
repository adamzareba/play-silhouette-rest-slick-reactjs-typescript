import * as React from 'react';
import './NotFound.css';

class NotFound extends React.Component<{}, {}> {

    render() {
        return (
            <div className="container">
                <div className="starter-template">
                    <h1>Page not found.</h1>
                </div>
            </div>
        );
    }
}

export default NotFound;
