import React from "react";
import resume from "./img/resumeMj.jpg";

function ResumeContainer(){
    function handleClick(){
        document.querySelector("#resumeCon").classList.add("display");
    }
    return(
        <div id="resumeCon" class="resumeCont display">
        <img src={resume} alt=""/>
        <a onClick={handleClick} id="resumeD">
            <p>⨯</p>
        </a>
    </div>
    );
}


export default ResumeContainer;