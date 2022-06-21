import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageJobs from "./PageJobs/PageJobs";
import Header from "./Header/Header";
import { Provider } from "react-redux";
import { store } from "../store/store";
import JobDetails from "./JobDetails/JobDetails";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path='/jobs/:id' component={JobDetails} />
                    <Route path='/' component={PageJobs} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
