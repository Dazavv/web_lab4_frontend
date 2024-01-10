import React, { useContext, useEffect } from "react";
import InputFileds from "../components/CoorForm";
import Graph from "../components/Graph";
import { CoordinatesProvider, DotsFormContext } from "../components/InputFieldContext";
import DotsTable from "../components/Table";
import { AuthorizationStore } from "../utils/authorizationStore";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../utils/login";
import { getPassword } from "../utils/password";
import toast from "react-hot-toast";
import AuthHeader from "../components/AuthHeader";

function Dots() {
    const navigate = useNavigate();
    useEffect(() => {
        let state = AuthorizationStore.getState();
        if (getLogin(state).trim() === "" || getPassword(state).trim() === "") {
            navigate("/");
        }
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "beige" }}>
            <CoordinatesProvider>
                <AuthHeader />
                <div style={{ padding: "20px", boxSizing: "border-box" , margin: "auto"}}>
                    <Graph width={300} height={300} />
                    <InputFileds />
                </div>
                <div className="table-container">
                    <DotsTable />
                </div>

            </CoordinatesProvider>
        </div>
    );
}

export default Dots;
