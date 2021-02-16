import React from "react";
import { useParams } from "react-router-dom";

function DecksView() {
    const { id } = useParams<any>();
    return (
        <div>
            <h2>{id}</h2>
        </div>
    );
}

export default DecksView;
