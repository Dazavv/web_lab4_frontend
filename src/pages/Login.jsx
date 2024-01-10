import React  from "react";
import Header    from "../components/Header";
import LoginForm from "../components/LoginForm";


function LoginPage(){
    return (
        <div className={"loginPageBody"}>
            <Header/>
            <LoginForm/>
        </div>
    );
}

export default LoginPage;