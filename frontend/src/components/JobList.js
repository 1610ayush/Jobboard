import { useEffect, useState } from "react";
import axios from "axios";
import {API} from "../api";
import { NavLink } from "react-router-dom";


function JobListItem({ job }){
  return(
      <div className="border border-gray-200 px-3 py-3 shadow-sm rounded-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {job.company_logo && (
              <img src={job.company_logo} className="h-20 w-20 px-3 py-3" alt={job.company_name} />
            )}
            <NavLink to={`/jobs/${job.id}`}>
              <h3 className="text-2xl text-gray-800 font-semibold">{job.title}</h3>
            </NavLink>
          </div>
          <div className="text-gray-800">
            Added on {" "}
            {new Date(job.date_created).toDateString()}
          </div>
        </div>
        
        <p className="mt-1 text-lg text-gray-600">${job.salary}</p>
        <p className="mt-1 italic text-sm text-gray-500">
          {job.company_name}
          <a className="ml-3 text-blue-500 hover:text-blue-600 text-sm" href={job.company_website} target="_blank" rel="noopener noreferrer">
            Visit website
          </a>
        </p>
        <p className="mt-3 text-gray-500">{job.description}</p>
        {job.remote && (
          <p className="text-gray-500">
            Remote 📍
          </p>
        )}

        {job.location && (
          <p className="text-gray-500">
            {job.location}
          </p>
        )}
      </div>
  )
}

export function JobList() {
  const [jobs, setJobs] = useState(null)

  useEffect(() => {
    function fetchJobs() {
      axios.get(API.jobs.list)
        .then(res => {
          setJobs(res.data)
        })
    }
    fetchJobs()
  }, [])

  return (
    <div>
        {!jobs && "Loading..."}
        {jobs && jobs.map(job => {
            return (
              <JobListItem key={job.id} job={job} />
            )
        })}
    </div>
  );
}