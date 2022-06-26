import React, { useCallback, useMemo } from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import { ReactComponent as LocationIcon } from '../../assets/svg/location.svg'
import { Link } from "react-router-dom";

function Job({ match, history, attributes }) {
    const { title, previewText, location, company, publications,relativeDetailUrl } = attributes;
    const handleClick = useCallback(() => history.push(`${relativeDetailUrl}`), [match, relativeDetailUrl]);
    const publishedAgo = useMemo(() => moment().diff(moment(publications[0].publicationTime), 'days'), [publications]);
    return (
        <div className="job flex-container" onClick={handleClick}>
            <div className="job-desc">
                <h2 className="job-title">{title}</h2>
                <div className="flex-container info">
                    <LocationIcon className="location-icon" />
                    <span className="location">{location.city}</span>
                </div>
                <div className="flex-container between info">
                    <p className="company">{company.name}</p>
                    <p className="pusblished">{`${publishedAgo} days ago`}</p>
                </div>
                <p className="preview-text">{previewText}</p>
            </div>
            <img className="company-logo" src={company.logo} alt="company-logo" />
            <Link to={`${relativeDetailUrl}`} className="job-link">Learn more...</Link>
        </div>
    );
}

Job.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    attributes: PropTypes.object.isRequired
}

export default Job;
