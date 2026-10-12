import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    customTooltip: {
        backgroundColor: 'black',
        color: 'red',
        fontSize: '1.1vw',
        borderRadius: '8px',
        padding: '8px',
        border: "1px solid #03989e",
        fontFamily: '"Josefin Sans", sans-serif',
        boxShadow: "0px 0px 3px 0.5px #03989e",
    },
});

const NAV_ITEMS = [
    { id: "intro", label: "Intro/Home" },
    { id: "skills", label: "My skills" },
    { id: "projects", label: "My projects" }
];

function Footer(props) {
    const activeSection = props.activeSection || "intro";
    const readyClass = props.navReady ? " nav-ready" : "";

    function handleNavClick(event, id) {
        event.preventDefault();
        if (props.onNavigate) {
            props.onNavigate(id);
        }
    }

    return (
        <footer className={"site-nav" + readyClass}>
            <ul>
                {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                        <li
                            key={item.id}
                            id={"f-" + item.id}
                            className={isActive ? "footer-click" : "footer"}
                        >
                            <Tooltip title={item.label} classes={{ tooltip: props.classes.customTooltip }}>
                                <a
                                    className={isActive ? "navigator-click" : "navigator"}
                                    href={"#" + item.id}
                                    aria-label={item.label}
                                    onClick={(event) => handleNavClick(event, item.id)}
                                >
                                    <span className="navDotLabel">{item.label}</span>
                                </a>
                            </Tooltip>
                        </li>
                    );
                })}
            </ul>
        </footer>
    );
}

export default withStyles(styles)(Footer);
