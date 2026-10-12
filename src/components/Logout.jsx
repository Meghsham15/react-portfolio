import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Auth from "./Auth";

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

function Logout(props) {
    let auth = Auth;
    async function handleClick() {
        // console.log(":logout clicked");
        props.setLoader(false);
        let res = await auth.logout();
        if (res) {
            props.setAuth(false);
        } else {
            alert("error occured");
        }
        props.setLoader(true);
    }
    return (
        <div id="logout">
            <Tooltip title="Leave a comment before logout?" classes={{ tooltip: props.classes.customTooltip }}>
                <a id="logoutUser">
                    <div className="logout" id="logoutUser" onClick={handleClick}>Logout</div>
                </a>
            </Tooltip>
        </div>
    )
}

export default withStyles(styles)(Logout);