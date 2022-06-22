import axios from "axios";
import { useState } from "react";
import { Formik, Field, Form } from 'formik';
import { API } from "../api";



export function Signup(){
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
   
    function handleSubmit(values, {resetForm}){
        setLoading(true)
        axios.post(API.auth.signup, values)
            .then(res => {
                resetForm()
                setSuccess(true)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return(
        <div>
            {success && "You will receive a verification email."}
            {loading && "Loading..."}
            <Formik
                initialValues={{
                    email: '',
                    password1: '',
                    password2: '',
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

                        
                        <Field name="password1">
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
                                        form.touched.password1 && form.errors.password1 ? (
                                            {border: "2px solid var(--primary-red)"}
                                        ) : null
                                    }
                                    />
                                </label>
                            )}
                        </Field>

                        <Field name="password2">
                            {({ field, form }) => (
                                
                                <label className="block mt-3">
                                    <span className="text-gray-700">Confirm Password </span>
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
                                        form.touched.password2 && form.errors.password2 ? (
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