import React, { Component } from 'react';

class ServerErrorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorData: null
        };
    }

    componentDidMount() {
        const search = window.location.search.substring(1);
        const decoded = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
        const errorData = JSON.parse(decoded.errorData);
        this.setState({ errorData });
    }
    getQueryParams = () => {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams;
    };

    render() {
        const { errorData } = this.state;

        if(!errorData){
            return null;
        }

        return (
            <main>
                <h1>{errorData.message}</h1>

                {errorData && (
                    <div>
                        <h2>{errorData.data}</h2>
                    </div>
                )}
                <br/>
                <button onClick={() => window.location.href = '/'} className="blue-btn btn">
                    Go to Home
                </button>
            </main>
        );
    }
}

export default ServerErrorPage;
