import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from '../../axios/axios';
import "./Login.css";

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
                Role:role,
                Email:email
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
    }

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
                    console.log(response.data);
                    navigate("/dashboard");
                } else {
                    localStorage.setItem('authtoken', '');
                    localStorage.setItem('role', '');
                    localStorage.setItem('name', '');
                    console.log(response.data);
                    alert("Something went wrong")
                }
            })
            .catch(response => {
                localStorage.setItem('authtoken', '');
                localStorage.setItem('role', '');
                localStorage.setItem('name', '');
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
                <div className="auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Sign Up
                            </span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mt-3">
                                <label>Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    name='password'
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
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
            <div className="auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>

                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                            Sign In
                        </span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                name="username"
                                type="text"
                                className="form-control mt-1"
                                placeholder="e.g Jane Doe"
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Enter Email</label>
                            <input
                                name="email"
                                type="email"
                                className="form-control mt-1"
                                placeholder="enter email"
                                required
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>Enter Password</label>
                            <input
                                name="password"
                                type="password"
                                className="form-control mt-1"
                                placeholder="password"
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label for="role-type">Role</label>

                            <select name="role" id="role" className="form-control mt-1" required>
                                <option value="" hidden>
                                    --Please choose an option--
                                </option>
                                <option value="normal">Customer</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
