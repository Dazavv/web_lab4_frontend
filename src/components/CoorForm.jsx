import React, {useContext, useEffect} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import {TextField} from "@mui/material";
import toast from "react-hot-toast";
import {getLogin} from "../utils/login";
import {AuthorizationStore} from "../utils/authorizationStore";
import {getPassword} from "../utils/password";
import {DotsFormContext} from "./InputFieldContext";
import Input from "react-toolbox/lib/input";


function InputFields() {
    const context = useContext(DotsFormContext)

    useEffect(() => {
        fetch("/api/dots", {
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(getLogin(AuthorizationStore.getState()) + ":"
                    + getPassword(AuthorizationStore.getState()))
            }
        })
            .then(r => r.json())
            .then(r => context?.setDots(r))
    }, [])

    let validateX = (x) => parseFloat(x) <= 3 && parseFloat(x) >= -5;

    let validateY = (y) => parseFloat(y) <= 3 && parseFloat(y) >= -3;
    let validateR = (r) => parseFloat(r) <= 4 && parseFloat(r) >= 0;


    function parseFormSubmit(event) {
        event.preventDefault()
        if (!context || context.getX == null || context.getY == null || !context.getR == null){
            toast.error("Fill all boxes with coordinates!")
            return
        }
        if(!validateX(context.getX) || !validateY(context.getY) || !validateR(context.getR)){
            toast.error("Coordinates are not valid!")
            return
        }
        let formData = new FormData();
        formData.append("x", context.getX.toString())
        formData.append("y", context.getY.toString())
        formData.append("r", context.getR.toString())
        fetch("/api/dots", {
            method: "POST",
            headers: {"Authorization": "Basic " + btoa(getLogin(AuthorizationStore.getState()) + ":" + getPassword(AuthorizationStore.getState()))},
            body: formData
        })
            .then(r => {
                if (r.ok) return r
                else throw new Error(r.statusText)
            })
            .then(r => r.json())
            .then(r => {
                context.addDot(r)
            })
            .catch(e => toast.error(e.message));
    }

    function sendClear(){
        fetch("/api/dots", {
            method: "DELETE",
            headers: {"Authorization": "Basic " + btoa(getLogin(AuthorizationStore.getState()) + ":" + getPassword(AuthorizationStore.getState()))},
        })
            .then(r => {
                if (r.ok) {
                    context?.setDots([])
                }
            })
    }
    const xAndR =  [-5, -4, -3, -2, -1, 0, 1, 2, 3]



    if (!context) return (<></>);
    return (
        <div>
        <form onSubmit={e=> parseFormSubmit(e)} style={{backgroundColor: "beige", margin: "auto"}}>
            <Autocomplete
                value={context.getR}
                onChange={(event, value) => context.setR(value)}
                options={xAndR}
                getOptionLabel={(option) => option.toString()}
                renderInput={(params) => (
                    <TextField {...params} label="R" variant="standard" />
                )}
                style={{width: "100%"}}
            />
            <Autocomplete
                value={context.getX}
                onChange={(event, value) => context.setX(value)}
                options={xAndR}
                getOptionLabel={(option) => option.toString()}
                renderInput={(params) => (
                    <TextField {...params} label="X" variant="standard" />
                )}
                style={{width: "100%"}}
            />
            <Input style={{backgroundColor: "white"}}
                type='text'
                name='y'
                value={context.getY.toString()}
                placeholder={"Y"}
                onChange={(value) => context.setY(value)}
            />


            <button type={"submit"}>submit</button>
            <button type={"button"} onClick={sendClear} style={{ marginTop: "10px" }}>clear</button>
        </form>
        </div>
    )
}

export default InputFields;