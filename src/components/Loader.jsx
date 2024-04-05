import React, { useEffect, useState } from "react";
import Logo from "./img/mjlogo.png"

function Loader(props) {
    // const [isHidden, setHidden] = useState(false);

    // setHidden(props.isHidden);

    return (
        <div hidden={props.isHidden} id="loadingIndicator" className="image-container" >
            <img id="rotatingImage" src={Logo} alt="Rotating Image" />
        </div>
    );
}

export default Loader;