import React, { Component } from 'react';
import { useSearchParams } from 'react-router-dom';

class ServerErrorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorData: null
        };
    }

    componentDidMount() {
        const {errorData} = this.getQueryParams();
        console.log('Error data:', errorData);
        this.setState({ errorData });
    }
    getQueryParams = () => {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams;
    };

    render() {
        const { errorData } = this.state;

        return (
            <main>
                <h1>Server Error</h1>
                <p>Something went wrong on our end. Please try again later.</p>

                {errorData && (
                    <div>
                        <h2>Error Details:</h2>
                        <pre style={{ textAlign: 'left', overflowX: 'auto' }}>
                            {JSON.stringify(errorData, null, 2)}
                        </pre>
                    </div>
                )}

                <button onClick={() => window.location.href = '/'} className="blue-btn btn">
                    Go to Home
                </button>
            </main>
        );
    }
}

export default ServerErrorPage;
