import React from "react";
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

function Footer(props) {
    return (
        <footer>
            <ul>
                <li class="footer-click" id="f1">
                    <Tooltip title="Intro/Home" classes={{ tooltip: props.classes.customTooltip }}>
                        <a class="navigator-click" href="#intro">..</a>
                    </Tooltip>
                </li>
                <li class="footer" id="f2">
                    <Tooltip title="My skills" classes={{ tooltip: props.classes.customTooltip }}>
                        <a class="navigator" href="#skills">..</a>
                    </Tooltip>
                </li>
                <li title="Projects" class="footer" id="f3">
                    <Tooltip title="My projects" classes={{ tooltip: props.classes.customTooltip }}>
                        <a class="navigator" href="#projects">..</a>
                    </Tooltip>
                </li>
            </ul>
        </footer>
    );
};

export default withStyles(styles)(Footer);
