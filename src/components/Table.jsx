import React, { useContext } from "react";
import { DotsFormContext } from "./InputFieldContext";
import "../css/styles.scss"
function DotsTable() {
    const context = useContext(DotsFormContext);
    return (
        <table>
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>попадание</th>
                <th>время выполнения</th>
                <th style={{ marginLeft: "10px" }}>текущее время</th>
            </tr>
            </thead>
            <tbody>
            {context &&
                context.getDots.length > 0 &&
                context?.getDots.map((dot, index) => (
                    <tr key={index}>
                        <td>{dot.x}</td>
                        <td>{dot.y}</td>
                        <td>{dot.r}</td>
                        <td>{dot.status ? "да" : "нет"}</td>
                        <td style={{ marginLeft: "10px" }}>
                            {dot.scriptTime ? (dot.scriptTime / 1000).toFixed(0) : "..."}
                        </td>
                        <td style={{ marginLeft: "10px" }}>
                            {dot.time}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DotsTable;
