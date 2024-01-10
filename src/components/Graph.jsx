import React, { useContext, useEffect, useRef } from "react";
import Canvas from "./canvas";
import { DotsFormContext } from "./InputFieldContext";
import { getLogin } from "../utils/login";
import { AuthorizationStore } from "../utils/authorizationStore";
import { getPassword } from "../utils/password";
import toast from "react-hot-toast";

function Graph({ width, height }) {
    const context = useContext(DotsFormContext);
    const canvasRef = useRef(null);

    function fetchCoordinates(x, y, r) {
        let formData = new FormData();
        formData.append("x", x.toFixed(4));
        formData.append("y", y.toFixed(4));
        formData.append("r", r.toFixed(4));
        fetch("/api/dots", {
            method: "POST",
            headers: { "Authorization": "Basic " + btoa(getLogin(AuthorizationStore.getState()) + ":" + getPassword(AuthorizationStore.getState())) },
            body: formData,
        })
            .then((r) => {
                if (r.ok) return r;
                else throw new Error(r.statusText);
            })
            .then((r) => r.json())
            .then((r) => {
                context?.addDot(r);
            })
            .catch((e) => toast.error(e.message));
    }

    function parseClick(event) {
        if (!canvasRef.current) return;
        const xPixels = event.clientX - canvasRef.current.getBoundingClientRect().left;
        const yPixels = event.clientY - canvasRef.current.getBoundingClientRect().top;
        const SIZE = 300;
        const WIDTH_IN_POINTS = 10;
        const pointInPixels = SIZE / WIDTH_IN_POINTS;
        const x = -((SIZE/2 - xPixels) / pointInPixels);
        const y = (SIZE/2 - yPixels) / pointInPixels;
        sendCoordinates(x, y);
    }



    function sendCoordinates(x, y) {
        if (!context) return;
        let formData = new FormData();
        formData.append("x", x.toFixed(4));
        formData.append("y", y.toFixed(4));
        formData.append("r", context.getR.toString());
        fetch("/api/dots", {
            method: "POST",
            headers: { "Authorization": "Basic " + btoa(getLogin(AuthorizationStore.getState()) + ":" + getPassword(AuthorizationStore.getState())) },
            body: formData,
        })
            .then((r) => {
                if (r.ok) return r;
                else throw new Error(r.statusText);
            })
            .then((r) => r.json())
            .then((r) => {
                context.addDot(r);
            })
            .catch((e) => toast.error(e.message));
    }

    useEffect(() => {
        if (!canvasRef?.current?.getContext("2d")) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx === null) return;
        const graphPrinter = new Canvas(canvas, ctx, parseFloat(context?.getR), context?.getDots, fetchCoordinates);
        graphPrinter.drawStartImage();
    }, [context?.getR, context?.getDots]);

    return (
        <canvas ref={canvasRef}
                width={width}
                height={height}
                key={context?.getR}
                onClick={parseClick}
        />
    );
}

export default Graph;
