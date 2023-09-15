import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from '../../axios/axios';
import "./Login.css";
import image from "../../images/image.jpg"

export default function Login() {

    const navigate = useNavigate();

    const [authMode, setAuthMode] = useState("signin");

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin");
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            if (authMode === "signin")
                sendRequestLogin(event);
            else
                sendRequestReg(event)
        }
    };

    const sendRequestReg = (event) => {
        const username = event.target.username.value;
        const password = event.target.password.value;
        const role = event.target.role.value;
        const email = event.target.email.value;

        axios.post('/register',
            {
                Username: username,
                Password: password,
                Role: role,
                Email: email
            }
        )
            .then(response => {
                if (response.data.type = "success") {
                    console.log(response.data);
                    alert("successfull");
                } else {
                    console.log(response.data);
                    alert("Something went wrong")
                }
            })
            .catch(response => {
                localStorage.setItem('authtoken', '');
                if (response.response) {
                    alert(response.response.data.message);
                } else {
                    alert("Something went wrong")
                }
            });
    };

    const sendRequestLogin = (event) => {
        const username = event.target.username.value;
        const password = event.target.password.value;

        axios.post('/login',
            {
                Username: username,
                Password: password
            }
        )
            .then(response => {
                if (response.data.type = "success") {
                    localStorage.setItem('authtoken', response.data.jwtToken);
                    localStorage.setItem('role', response.data.userrole);
                    localStorage.setItem('name', response.data.name);
                    localStorage.setItem('id', response.data.userid);
                    console.log(response.data);
                    if (response.data.userrole === 'admin') {
                        navigate("/admin/dashboard/" + response.data.userid)
                    } else {
                        navigate("/dashboard");
                    }
                } else {
                    localStorage.setItem('authtoken', '');
                    localStorage.setItem('role', '');
                    localStorage.setItem('name', '');
                    localStorage.setItem('id', '');
                    console.log(response.data);
                    alert("Something went wrong")
                }
            })
            .catch(response => {
                localStorage.setItem('authtoken', '');
                localStorage.setItem('role', '');
                localStorage.setItem('name', '');
                localStorage.setItem('id', '');
                if (response.response) {
                    alert(response.response.data.message);
                } else {
                    alert("Something went wrong")
                }
            });
    }

    if (authMode === "signin") {
        return (
            <div className="Auth-form-container">
                <div className="auth-image">
                    <img src={image} alt="Your Image" />
                </div>
                <div className="auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title" >Sign In</h3>
                        <div className="text-center" style={{ color: '#BFE0B5' }}>
                            Not registered yet?{" "}
                            <span className="signup-link" onClick={changeAuthMode} style={{ color: '#F63D38' }}>
                                Sign Up
                            </span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mt-3">
                                <label style={{ color: '#BFE0B5' }}>Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label style={{ color: '#BFE0B5' }}>Password</label>
                                <input
                                    name='password'
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#F63D38' }}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="Auth-form-container">
            <div className="auth-image">
                <img className='hero-image' src={image} alt="Your Image" />
            </div>

            <div className="auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>

                    <div className="text-center" style={{ color: '#BFE0B5' }}>
                        Already registered?{" "}
                        <span className="signin-link" onClick={changeAuthMode} style={{ color: '#F63D38' }}>
                            Sign In
                        </span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mt-3">
                            <label style={{ color: '#BFE0B5' }}>Username</label>
                            <input
                                name="username"
                                type="text"
                                className="form-control mt-1"
                                placeholder="e.g Jane Doe"
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label style={{ color: '#BFE0B5' }}>Enter Email</label>
                            <input
                                name="email"
                                type="email"
                                className="form-control mt-1"
                                placeholder="enter email"
                                required
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label style={{ color: '#BFE0B5' }}>Enter Password</label>
                            <input
                                name="password"
                                type="password"
                                className="form-control mt-1"
                                placeholder="password"
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label for="role-type" style={{ color: '#BFE0B5' }}>Role</label>

                            <select name="role" id="role" className="form-control mt-1" required>
                                <option value="" hidden>
                                    --Please choose an option--
                                </option>
                                <option value="normal">Customer</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#F63D38' }}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
