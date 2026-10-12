import React, { useEffect, useState } from "react";
import Images from "./Images";

function Loader(props) {
    // const [isHidden, setHidden] = useState(false);

    // setHidden(props.isHidden);
    useEffect(()=>{
        console.log("from loader "+props.Images.mjlogo);
    },[])

    return (
        <div
            id="loadingIndicator"
            className={"image-container" + (props.isHidden ? " is-hidden" : "")}
            hidden={props.isHidden}
            aria-hidden={props.isHidden}
        >
            <img id="rotatingImage" src={props.Images && props.Images.mjlogo} alt="Loading" />
        </div>
    );
}

export default Loader;