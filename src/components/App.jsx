import React, { useEffect } from "react";
import { Api } from "../utils/api-client";
import normalize from 'json-api-normalizer';
// import { Provider } from 'react-redux';
// import { store } from "../store/store";

function App() {
    useEffect(() => {
        Api.searchJobs()
            .then((res) => console.log(normalize(res.data, { endpoint: '/search-jobs' })))
    }, []);

    return (
        // <Provider store={store}>
            <div className="App">
                <header className="App-header">
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        // </Provider>
    );
}

export default App;
