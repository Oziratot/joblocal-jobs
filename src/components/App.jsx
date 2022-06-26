import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageJobs from "./PageJobs/PageJobs";
import Header from "./Header/Header";
import { Provider } from "react-redux";
import { store } from "../store/store";
import JobDetails from "./JobDetails/JobDetails";

function App() {
    const [filtersApplied, setFiltersApplied] = useState({ radius: '0', working_time: [], qualification: [], employment_type: [] });

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header filtersApplied={filtersApplied} setFiltersApplied={setFiltersApplied} />
                <Switch>
                    <Route path='/jobs/:id' component={JobDetails}  />
                    <Route path='/'>
                        <PageJobs filtersApplied={filtersApplied} setFiltersApplied={setFiltersApplied} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
