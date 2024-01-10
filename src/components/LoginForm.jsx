import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "../utils/hook";
import { setLogin } from "../utils/login";
import { setPassword } from "../utils/password";
import { useNavigate } from "react-router-dom";
import "../css/styles.scss";
import Input from "react-toolbox/lib/input";



function LoginForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [newLogin, setNewLogin] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [type, setType] = useState("signIn");



    function loginRequest(event, login, password) {
        event.preventDefault();
        login = encodeURI(login.trim());
        password = encodeURI(password.trim());
        if (login === "" || password === "") {
            toast.error("Fields must be non empty", {
                position: "top-center"
            });
            return;
        }

        fetch("/api/login", {
            method: 'POST',
            headers: { "Authorization": "Basic " + btoa(login + ":" + password) }
        })
            .then(response => {
                if (response.ok) {
                    dispatch(setLogin(newLogin));
                    dispatch(setPassword(newPassword));
                    navigate("/main");
                } else {
                    response.json().then(data => {
                        const errorMessage = data.message || "An error occurred";
                        toast.error(errorMessage, {
                            position: "top-center"
                        });
                    });
                }
            })
            .catch(error => {
                console.error("Fetch error:", error);
                toast.error("An error occurred. Please try again.", {
                    position: "top-center"
                });
            });
    }

    function registerRequest(event, login, password) {
        event.preventDefault();
        login = encodeURI(login.trim());
        password = encodeURI(password.trim());
        if (login === "" || password === "") {
            toast.error("Fields must be non empty", {
                position: "top-center",
            });
            return;
        }
        let formData = new FormData();
        formData.append('login', login.toString());
        formData.append('password', password.toString());
        fetch("/api/register", {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    dispatch(setLogin(newLogin));
                    dispatch(setPassword(newPassword));
                    navigate("/main");
                } else {
                    response.json().then(data => {
                        const errorMessage = data.message || "An error occurred";
                        toast.error(errorMessage, {
                            position: "top-center"
                        });
                    });
                }
            })
            .catch(error => {
                console.error("Fetch error:", error);
                toast.error("An error occurred. Please try again.", {
                    position: "top-center"
                });
            });
    }

    const loginForm = (
        <div className="form-container sign-in-container">
            <form className="space-y-8">
                <h1>Sign in</h1>
                <div className="social-container"></div>
                <input
                    type="login"
                    placeholder="Login"
                    autoFocus={true}
                    name="login"
                    onChange={event => setNewLogin(event.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={event => setNewPassword(event.target.value)}
                />
                <button onClick={event => loginRequest(event, newLogin, newPassword)} value={newLogin}>
                    Login
                </button>
            </form>
        </div>
    );

    const registerForm = (
        <div className="form-container sign-up-container">
            <form className="space-y-8">
                <h1>Sign up</h1>
                <div className="social-container"></div>
                <Input
                    type="login"
                    placeholder="Login"
                    autoFocus={true}
                    name="login"
                    onChange={event => setNewLogin(event.target.value)}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={event => setNewPassword(event.target.value)}
                />
                <button onClick={event => registerRequest(event, newLogin, newPassword)} value={newPassword}>
                    Register
                </button>
            </form>
        </div>
    );

    return (
        <div className="App">
            <div className={"container " + (type === "signUp" ? "right-panel-active" : "")} id="container">
                {type === "signIn" ? loginForm : registerForm}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={() => setType("signIn")}>
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start the journey with us</p>
                            <button className="ghost" id="signUp" onClick={() => setType("signUp")}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
