import React from "react";
import Images from "./Images";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    customTooltip: {
        backgroundColor: 'black', // Customize background color
        color: 'red', // Customize text color
        fontSize: '1.1vw', // Customize font size
        borderRadius: '8px', // Customize border radius
        padding: '8px', // Add padding
        // Add any other custom styles here
        border: "1px solid #03989e",
        fontFamily: '"Josefin Sans", sans-serif',
        boxShadow: "0px 0px 3px 0.5px #03989e",
    },
});

function Navbar({ classes }) {

    function handleResumeClick() {
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
                <Tooltip title="Github" classes={{ tooltip: classes.customTooltip }}>
                    <li><a href="https://github.com/Meghsham15" target="_blank"><img src={Images.gitHubImage}
                        alt="img not found" /></a></li>
                </Tooltip>
                <Tooltip title="Linkedin" classes={{ tooltip: classes.customTooltip }}>
                    <li><a href="https://www.linkedin.com/in/meghsham-jade-2a3406218/" target="_blank"><img
                        src={Images.lindkdenImage} alt="img not found" /></a></li>
                </Tooltip>
                <Tooltip title="Mail me" classes={{ tooltip: classes.customTooltip }}>
                    <li><a href="mailto:meghshamjade50@gmail.com?subject=Hii"><img src={Images.gmailImage}
                        alt="img not found" /></a></li>
                </Tooltip>
                <Tooltip title="My Resume" classes={{ tooltip: classes.customTooltip }}>
                    <li><a><img onClick={handleResumeClick} id="resume" src={Images.resumecover} alt="img not found" /></a></li>
                </Tooltip>
            </ul>
        </div>
    )
}

export default withStyles(styles)(Navbar);