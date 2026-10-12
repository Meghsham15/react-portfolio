import React from "react";
import Images from "./Images";
import OtherSkills from "./OtherSkills";
import WeatherWidget from "./WeatherWidget";
import useMaxWidth from "./useMaxWidth";

function LeftContainer() {
    const isMobile = useMaxWidth(900);

    return (
        <div className="leftContainer">
            <div className="logo">
                <a href="/react-portfolio/"><img src={Images.mjLogo} alt="" /></a>
            </div>
            {isMobile ? null : <OtherSkills showHeading={true} />}
            {isMobile ? null : <WeatherWidget />}
            <div className="downScrollL">
                <span className="scroll">scroll ---&gt;</span>
            </div>
        </div>
    );
}

export default LeftContainer;
