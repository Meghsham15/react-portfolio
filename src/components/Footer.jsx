import React from "react";

function Footer(){
    return(
        <footer>
            <ul>
                <li title="Intro/Home" class="footer-click" id="f1"><a class="navigator-click" href="#intro">..</a></li>
                <li title="Skills" class="footer" id="f2"><a class="navigator" href="#skills">..</a></li>
                <li title="Projects" class="footer" id="f3"><a class="navigator" href="#projects">..</a></li>
            </ul>
        </footer>
    );
};

export default Footer;
