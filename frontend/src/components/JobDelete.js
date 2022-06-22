import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { API } from "../api";
import { AuthContext } from "../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";


export function JobDelete(){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [loadingJob, setLoadingJob] = useState(false)
    const {user: {token}} = useContext(AuthContext)

    const [job, setJob] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        if(job && !job.is_owner){
        navigate("/")
        }
        return () => null
    })

    useEffect(() => {
        setLoadingJob(true)
        function fetchJob(){
            axios.get(API.jobs.retrieve(id), {
                headers:{
                    "Authorization": `Token ${token}`
                }
            })
            .then(res => {
                setJob(res.data)
            })
            .finally(() => {
                setLoadingJob(false)
            })
        }
        fetchJob()
        return () => null
    }, [id, token])


    function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        axios.delete(API.jobs.delete(id), {
            headers:{
                "Authorization": `Token ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                navigate("/")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return(
        <div>
            {loading && "Loading..."}
            {loadingJob && "Fetching Job details..."}
            {job && (
                <form onSubmit={handleSubmit}>  
                    <button 
                     type="submit" 
                     className="mt-3 bg-red-100 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-red-200"
                     >
                         Submit
                     </button>
                </form>
            )}
        </div>
    )
}