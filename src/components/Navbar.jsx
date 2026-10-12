import React from "react";
import Images from "./Images";
import botIcon from "./icons/bot.svg";
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

function Navbar({ classes, onOpenChat }) {

    function handleResumeClick(event) {
        event.preventDefault();
        document.querySelector("#resumeCon").classList.remove("display");
    }

    return (
        <div className="navbar">
            <a className="navbarLogo" href="/react-portfolio/">
                <img src={Images.mjLogo} alt="MJ" />
            </a>
            <ul>
                <Tooltip title="Github" classes={{ tooltip: classes.customTooltip }}>
                    <li><a href="https://github.com/Meghsham15" target="_blank" rel="noreferrer"><img src={Images.gitHubImage}
                        alt="GitHub" /></a></li>
                </Tooltip>
                <Tooltip title="Linkedin" classes={{ tooltip: classes.customTooltip }}>
                    <li><a href="https://www.linkedin.com/in/meghsham-jade-2a3406218/" target="_blank" rel="noreferrer"><img
                        src={Images.lindkdenImage} alt="LinkedIn" /></a></li>
                </Tooltip>
                <Tooltip title="Mail me" classes={{ tooltip: classes.customTooltip }}>
                    <li><a href="mailto:meghshamjade.contact@gmail.com?subject=Hii"><img src={Images.gmailImage}
                        alt="Email" /></a></li>
                </Tooltip>
                <Tooltip title="My Resume" classes={{ tooltip: classes.customTooltip }}>
                    <li>
                        <a href="#resume" onClick={handleResumeClick}>
                            <img id="resume" src={Images.resumecover} alt="img not found" />
                        </a>
                    </li>
                </Tooltip>
                {onOpenChat ? (
                    <Tooltip title="Ask AI" classes={{ tooltip: classes.customTooltip }}>
                        <li className="navbarChatItem">
                            <button type="button" className="navbarChat" onClick={onOpenChat} aria-label="Ask AI">
                                <img src={botIcon} alt="" />
                            </button>
                        </li>
                    </Tooltip>
                ) : null}
            </ul>
        </div>
    )
}

export default withStyles(styles)(Navbar);