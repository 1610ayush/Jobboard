import axios from "axios";
import { Formik, Field, Form } from 'formik';
import { useContext, useEffect, useState } from "react";
import { API } from "../api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ImagePreview({file}){
    const [imageSrc, setImageSrc] = useState(null)
    useEffect(() => {
        const reader = new FileReader()
        reader.onloadend = () => {
            setImageSrc(reader.result)
        }
        reader.readAsDataURL(file)
    })

    return (
        <div>
            {!imageSrc && "Loading..."}
            {imageSrc && (
                <img src={imageSrc} className="h-20 w-20 px-3 py-3" alt={file.name} />
            )}
        </div>
        
    )
}


export function JobCreate(){
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)
    const {user: {token}} = useContext(AuthContext)
    const navigate = useNavigate()

    function handleSubmit(values){
        setLoading(true)
        const data = new FormData()
        data.append("company_logo", file)
        data.append("title", values.title)
        data.append("company_name", values.company_name)
        data.append("company_website", values.company_website)
        data.append("location", values.location)
        data.append("salary", values.salary)
        data.append("available",values.available)
        data.append("remote", values.remote)
        
        axios.post(API.jobs.create, data, {
            headers:{
                "Authorization": `Token ${token}`
            }
        })
            .then(res => {
                navigate("/")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return(
        <div>
            {loading && "Loading..."}
            <Formik
                initialValues={{
                    title: '',
                    company_name: '',
                    company_logo: "",
                    company_website: '',
                    location: '',
                    salary: '',
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

                                
                        <div className="flex items-center">
                            <label className="block mt-3">
                                <span className="text-gray-700">Company Logo</span>
                                <input
                                onChange={e => setFile(e.target.files[0])}
                                type="file"
                                className="
                                    mt-1
                                    block
                                    w-full
                                    px-0.5
                                    border-0 border-gray-200
                                    focus:ring-0 focus:border-black
                                "
                                />
                            </label>
                            {file && (
                                <ImagePreview file={file} />
                            )}
                        </div>
                            
                       
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
        </div>
    )
}