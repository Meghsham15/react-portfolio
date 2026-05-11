import React, { useEffect, useState } from "react";
import Images from "./Images";

function Loader(props) {
    // const [isHidden, setHidden] = useState(false);

    // setHidden(props.isHidden);
    useEffect(()=>{
        console.log("from loader "+props.Images.mjlogo);
    },[])

    return (
        <div hidden={props.isHidden} id="loadingIndicator" className="image-container" >
            <img id="rotatingImage" src={props.Images.mjlogo} alt="Rotating Image" />
        </div>
    );
}

export default Loader;