import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { JobList } from "./components/JobList";
import { JobDetail } from "./components/JobDetail";
import { JobCreate } from "./components/JobCreate";
import { AuthContext, AuthContextProvider } from './contexts/AuthContext';
import { Login } from "./components/login";
import { Navbar } from "./components/Navbar";
import { JobUpdate } from "./components/JobUpdate";
import { JobDelete } from "./components/JobDelete";
import { Signup } from "./components/Signup";
import { ConfirmEmail } from "./components/ConfirmEmail";



function PrivateRoute({children}){
  const {user} = useContext(AuthContext)
  return user ? children : <Navigate replace to="/login" />
}

export default function App() {

  return (
    <Router>
      <AuthContextProvider> 
          <div>        
            <Navbar />
            <div className="max-w-4xl mx-auto py-5 px-4">
              <Routes>
                <Route exact path="/" element={<JobList />} />
                <Route exact path="/jobs/:id" element={<PrivateRoute><JobDetail /></PrivateRoute>} />
                <Route exact path="/jobs/:id/update" element={<PrivateRoute><JobUpdate /></PrivateRoute>} />
                <Route exact path="/jobs/:id/delete" element={<PrivateRoute><JobDelete /></PrivateRoute>} />
                <Route exact path="/create-job" element={<PrivateRoute><JobCreate /></PrivateRoute>} />
                <Route exact path="/login" element={<Login />} />                
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/accounts/confirm-email/:key" element={<ConfirmEmail />} />
                <Route path="/about" element={<About />} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </div>
          </div>
      </AuthContextProvider>
    </Router>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Users() {
  return (
    <div>
      <h2>Users</h2>
    </div>
  );
}


