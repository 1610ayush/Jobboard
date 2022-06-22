import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, Form } from 'formik';
import { API } from "../api";
import { AuthContext } from "../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";


export function JobUpdate(){
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

    console.log(job)

    function handleSubmit(values){
        console.log(values)
        setLoading(true)
        axios.put(API.jobs.update(id), values, {
            headers:{
                "Authorization": `Token ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                navigate(`/jobs/${id}`)
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
                <Formik
                    initialValues={{
                        title: job.title,
                        company_name: job.company_name,
                        company_website: job.company_website,
                        location: job.location,
                        salary: job.salary,
                        available: true,
                        remote: false,
                    }}
                    onSubmit={handleSubmit}>

                    {({ errors, touched }) => (
                        <Form>
                            
                            <Field name="title">
                                {({ field, form }) => (
                                    
                                    <label className="block mt-3">
                                        <span className="text-gray-700">Title</span>
                                        <input
                                        {...field}
                                        type="text"
                                        className="
                                            mt-0
                                            block
                                            w-full
                                            px-0.5
                                            border-0 border-b-2 border-gray-200
                                            focus:ring-0 focus:border-black
                                        "
                                        placeholder="Software developer"
                                        style={
                                            form.touched.title && form.errors.title ? (
                                                {border: "2px solid var(--primary-red)"}
                                            ) : null
                                        }
                                        />
                                    </label>
                                )}
                            </Field>
                            
                            <Field name="company_name">
                                {({ field, form }) => (
                                    
                                    <label className="block mt-3">
                                        <span className="text-gray-700">Company Name</span>
                                        <input
                                        {...field}
                                        type="text"
                                        className="
                                            mt-0
                                            block
                                            w-full
                                            px-0.5
                                            border-0 border-b-2 border-gray-200
                                            focus:ring-0 focus:border-black
                                        "
                                        placeholder="Facebook"
                                        style={
                                            form.touched.company_name && form.errors.company_name ? (
                                                {border: "2px solid var(--primary-red)"}
                                            ) : null
                                        }
                                        />
                                    </label>
                                )}
                            </Field>
                        
                            <Field name="company_website">
                                {({ field, form }) => (
                                    
                                    <label className="block mt-3">
                                        <span className="text-gray-700">Company Website URL</span>
                                        <input
                                        {...field}
                                        type="text"
                                        className="
                                            mt-0
                                            block
                                            w-full
                                            px-0.5
                                            border-0 border-b-2 border-gray-200
                                            focus:ring-0 focus:border-black
                                        "
                                        placeholder="https://www..."
                                        style={
                                            form.touched.company_website && form.errors.company_website ? (
                                                {border: "2px solid var(--primary-red)"}
                                            ) : null
                                        }
                                        />
                                    </label>
                                )}
                            </Field>
                        
                            <Field name="location">
                                {({ field, form }) => (
                                    
                                    <label className="block mt-3">
                                        <span className="text-gray-700">Location</span>
                                        <input
                                        {...field}
                                        type="text"
                                        className="
                                            mt-0
                                            block
                                            w-full
                                            px-0.5
                                            border-0 border-b-2 border-gray-200
                                            focus:ring-0 focus:border-black
                                        "
                                        placeholder="London"
                                        style={
                                            form.touched.location && form.errors.location ? (
                                                {border: "2px solid var(--primary-red)"}
                                            ) : null
                                        }
                                        />
                                    </label>
                                )}
                            </Field>
                            
                        
                            <Field name="salary">
                                {({ field, form }) => (
                                    
                                    <label className="block mt-3">
                                        <span className="text-gray-700">Salary</span>
                                        <input
                                        {...field}
                                        type="number"
                                        className="
                                            mt-0
                                            block
                                            w-full
                                            px-0.5
                                            border-0 border-b-2 border-gray-200
                                            focus:ring-0 focus:border-black
                                        "
                                        style={
                                            form.touched.salary && form.errors.salary ? (
                                                {border: "2px solid var(--primary-red)"}
                                            ) : null
                                        }
                                        />
                                    </label>
                                )}
                            </Field>

                            <Field name="available">
                                {({ field, form }) => (
                                    <div className="block">
                                        <div className="mt-2">
                                            <div>
                                    
                                                <label className="inline-flex items-center">    
                                                    <input
                                                    {...field}
                                                    type="checkbox"
                                                    className="
                                                    rounded
                                                    bg-gray-200
                                                    border-transparent
                                                    focus:border-transparent focus:bg-blue-200
                                                    text-blue-700
                                                    focus:ring-1 focus:ring-offset-2 focus:ring-blue-500
                                                    "
                                                    style={
                                                        form.touched.available && form.errors.available ? (
                                                            {border: "2px solid var(--primary-red)"}
                                                        ) : null
                                                    }
                                                    />
                                                    <span className="ml-2">Available</span>
                                                </label>
                                            </div>
                                        </div> 
                                    </div>
                                )}
                            </Field>

                            <Field name="remote">
                                {({ field, form }) => (
                                    <div className="block">
                                        <div className="mt-2">
                                            <div>
                                    
                                                <label className="inline-flex items-center">    
                                                    <input
                                                    {...field}
                                                    type="checkbox"
                                                    className="
                                                    rounded
                                                    bg-gray-200
                                                    border-transparent
                                                    focus:border-transparent focus:bg-blue-200
                                                    text-blue-700
                                                    focus:ring-1 focus:ring-offset-2 focus:ring-blue-500
                                                    "
                                                    style={
                                                        form.touched.remote && form.errors.remote ? (
                                                            {border: "2px solid var(--primary-red)"}
                                                        ) : null
                                                    }
                                                    />
                                                    <span className="ml-2">Remote</span>
                                                </label>
                                            </div>
                                        </div> 
                                    </div>
                                )}
                            </Field>
                            

                            <button 
                            type="submit" 
                            className="mt-3 bg-blue-100 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-blue-200"
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    )
}