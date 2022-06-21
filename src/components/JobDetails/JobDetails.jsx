import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as LocationIcon } from "../../assets/svg/location.svg";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function JobDetails() {
    const params = useQuery();
    const jobs = useSelector((state) => state.jobs.jobs.searchJobResults);
    const currentJobId = useMemo(() => params.get("jobadid"), [params]);
    const { attributes: job } = jobs[currentJobId];

    return (
        <div className="page-job-details">
            <div className="container">
                <div className="job details">
                    <h1 className="job-title">{job.title}</h1>
                    <div className="flex-container">
                        <LocationIcon className="location-icon" />
                        <span className="location">{job.location.city}</span>
                    </div>
                    <div className="flex-container between">
                        <p className="company">{job.company.name}</p>
                        {/*<p className="pusblished">{`${publishedAgo} days ago`}</p>*/}
                    </div>

                    <p>{job.introduction}</p>
                    <br />
                    <p>{job.responsibilities}</p>
                    <br />
                    <p>{job.requirements}</p>
                    <br />
                    <p>{job.benefits}</p>
                    <br />
                    <p>{job.closingText}</p>
                </div>
            </div>
        </div>
    );
}

export default JobDetails;
