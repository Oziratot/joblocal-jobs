import React, { useCallback, useEffect, useState } from "react";
import SearchInput from "../SearchInput/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { searchJobsAsync } from "../../actions/jobs";
import Button from "../Button/Button";
import classnames from "classnames";

const radiusSelectOptions = [
    { label: '5 km', value: '5' },
    { label: '10 km', value: '10' },
    { label: '20 km', value: '20' },
    { label: '35 km', value: '35' },
    { label: '50 km', value: '50' },
    { label: '100 km', value: '100' },
    { label: 'All over', value: '0' },
];

function Header() {
    const dispatch = useDispatch()
    const [search, setSearch] = useState();
    const [location, setLocation] = useState();
    const [radius, setRadius] = useState('0');
    const [clientWindowHeight, setClientWindowHeight] = useState(0);
    const loading = useSelector((state) => state.jobs.jobs.loading);

    const handleScroll = useCallback(() => setClientWindowHeight(window.scrollY), [window.scrollY]);

    const handleSearchChange = useCallback((e) => {
        setSearch(e.target.value);
    }, []);
    const handleLocationChange = useCallback((e) => {
        setLocation(e.target.value);
    }, []);
    const handleRadiusChange = useCallback((e) => {
        setRadius(e.target.value);
    }, []);
    const handleSearchClick = useCallback(() => dispatch(searchJobsAsync({
        search,
        location,
        radius,
    })), [search, location, radius]);

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
                    <select className="radius-select" value={radius} onChange={(e) => handleRadiusChange(e)}>
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

export default Header;
