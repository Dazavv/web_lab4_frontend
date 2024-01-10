import React, { useState, createContext, ReactNode } from "react";

export const DotsFormContext = createContext(null);

export const CoordinatesProvider = ({ children }) => {
    const [getCoordinates, setCoordinates] = useState({
        x: "",
        y: "",
        r: ""
    });

    const [getDots, setDots] = useState([]);

    const updateX = (newX) => {
        setCoordinates((prevCoordinates) => ({
            ...prevCoordinates,
            x: newX,
        }));
    };

    const updateY = (newY) => {
        setCoordinates((prevCoordinates) => ({
            ...prevCoordinates,
            y: newY,
        }));
    };

    const updateR = (newR) => {
        setCoordinates((prevCoordinates) => ({
            ...prevCoordinates,
            r: newR,
        }));
    };
    const addDot = (dot) => {
        const dotWithTime = {
            ...dot,
            scriptTime: new Date().getTime(),
            time: new Date().toLocaleTimeString(),
        };
        setDots((prevState) => [...prevState, dotWithTime]);
    };


    // const addDot = (dot) => {
    //     setDots((prevState) => [...prevState, dot]);
    // };

    const store = {
        getX: getCoordinates.x,
        getY: getCoordinates.y,
        getR: getCoordinates.r,
        getDots: getDots,
        setDots: setDots,
        setX: updateX,
        setY: updateY,
        setR: updateR,
        addDot: addDot
    };

    return (
        <DotsFormContext.Provider value={store}>
            {children}
        </DotsFormContext.Provider>
    );
};
