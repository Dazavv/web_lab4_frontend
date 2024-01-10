import React from "react";
import { useAppDispatch } from "../utils/hook";
import { setLogin } from "../utils/login";
import { setPassword } from "../utils/password";
import { useNavigate } from "react-router-dom";

function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function logOut() {
        dispatch(setLogin(""));
        dispatch(setPassword(""));
        navigate("/");
    }

    return (
        <div style={{ position: "fixed", top: 0, left: 0, padding: "10px" }}>
            <button onClick={logOut} style={{ backgroundColor: "black", borderColor: "black", color: "white" }}>
                Log out
            </button>
        </div>
    );
}

export default Header;
