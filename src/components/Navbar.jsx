import React from "react";
import Images from "./Images";

function Navbar() {

    function handleResumeClick(){
        document.querySelector("#resumeCon").classList.remove("display");
    }

    return (
        <div class="navbar">

            <div class="invert">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <ul>
                <li><a href="https://github.com/Meghsham15" target="_blank"><img src={Images.gitHubImage}
                    alt="img not found" /></a></li>
                <li><a href="https://www.linkedin.com/in/meghsham-jade-2a3406218/" target="_blank"><img
                    src={Images.lindkdenImage} alt="img not found" /></a></li>
                <li><a href="mailto:meghshamjade50@gmail.com?subject=Hii"><img src={Images.gmailImage}
                    alt="img not found" /></a></li>
                <li><a><img onClick={handleResumeClick} id="resume" src={Images.resumecover} alt="img not found" /></a></li>
            </ul>
        </div>
    )
}

export default Navbar;