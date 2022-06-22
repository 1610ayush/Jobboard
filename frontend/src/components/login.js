import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import { API } from "../api";
import { AuthContext } from "../contexts/AuthContext";


export function Login(){
    const [loading, setLoading] = useState(false)
    const {login} = useContext(AuthContext)
    const navigate = useNavigate()

    function handleSubmit(values){
        setLoading(true)
        axios.post(API.auth.login, values)
            .then(res => {
                login(res.data.key)
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
                    email: '',
                    password: '',
                }}
                onSubmit={handleSubmit}>

                {({ errors, touched }) => (
                    <Form>
                        
                        
                        <Field name="email">
                            {({ field, form }) => (
                                
                                <label className="block mt-3">
                                    <span className="text-gray-700">Email </span>
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
                                    style={
                                        form.touched.email && form.errors.email ? (
                                            {border: "2px solid var(--primary-red)"}
                                        ) : null
                                    }
                                    />
                                </label>
                            )}
                        </Field>

                        
                        <Field name="password">
                            {({ field, form }) => (
                                
                                <label className="block mt-3">
                                    <span className="text-gray-700">Password </span>
                                    <input
                                    {...field}
                                    type="password"
                                    className="
                                        mt-0
                                        block
                                        w-full
                                        px-0.5
                                        border-0 border-b-2 border-gray-200
                                        focus:ring-0 focus:border-black
                                    "
                                    style={
                                        form.touched.password && form.errors.password ? (
                                            {border: "2px solid var(--primary-red)"}
                                        ) : null
                                    }
                                    />
                                </label>
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