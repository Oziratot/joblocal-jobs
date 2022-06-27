import React, { useCallback, useEffect, useState } from "react";
import SearchInput from "../SearchInput/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { searchJobsAsync } from "../../actions/jobs";
import Button from "../Button/Button";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useHistory, useRouteMatch } from "react-router-dom";

const radiusSelectOptions = [
    { label: '5 km', value: '5' },
    { label: '10 km', value: '10' },
    { label: '20 km', value: '20' },
    { label: '35 km', value: '35' },
    { label: '50 km', value: '50' },
    { label: '100 km', value: '100' },
    { label: 'All over', value: '0' },
];

function Header({ filtersApplied, setFiltersApplied }) {
    const history = useHistory();
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const [search, setSearch] = useState({ query: '', location: '' });
    const [clientWindowHeight, setClientWindowHeight] = useState(0);
    const loading = useSelector((state) => state.jobs.jobs.loading);

    const handleScroll = useCallback(() => setClientWindowHeight(window.scrollY), [window.scrollY]);

    const handleSearchChange = useCallback((e) => {
        setSearch({ ...search, query: e.target.value });
    }, [search]);
    const handleLocationChange = useCallback((e) => {
        setSearch({ ...search, location: e.target.value });
    }, [search]);
    const handleRadiusChange = useCallback((e) => {
        setFiltersApplied({ ...filtersApplied, radius: e.target.value });
    }, [filtersApplied]);
    const handleSearchClick = useCallback(() => {
        setFiltersApplied((prevState) => ({ ...prevState, working_time: [], qualification: [], employment_type: [] }));
        dispatch(searchJobsAsync({
            search,
            filter: filtersApplied,
        })).then(() => {
                if (!match.isExact) {
                    history.push('/');
                }
            })
    }, [search, filtersApplied.radius, match.isExact]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    return (
        <header className={classnames("header", { scrolled: clientWindowHeight > 20 })}>
            <div className="container">
                <div className="header-wrapper">
                    <SearchInput
                        className="header-input search"
                        placeholder="Activity, keyword, or job title"
                        onChange={(e) => handleSearchChange(e)}
                    />
                    <SearchInput
                        className="header-input location"
                        placeholder="Location"
                        onChange={handleLocationChange}
                    />
                    <select className="radius-select" value={filtersApplied.radius} onChange={(e) => handleRadiusChange(e)}>
                        {radiusSelectOptions.map(({ label, value }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                    <Button
                        className="search-button"
                        loading={loading}
                        onClick={handleSearchClick}
                    >
                        Search
                    </Button>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    filtersApplied: PropTypes.object,
    setFiltersApplied: PropTypes.func,
}

export default Header;
