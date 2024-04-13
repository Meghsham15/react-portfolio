import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    customTooltip: {
        backgroundColor: 'black', // Customize background color
        color: 'red', // Customize text color
        fontSize: '14px', // Customize font size
        borderRadius: '8px', // Customize border radius
        padding: '8px', // Add padding
        // Add any other custom styles here
        border:"1px solid #03989e",
        fontFamily: '"Josefin Sans", sans-serif',
        boxShadow:"0px 0px 3px 0.5px #03989e",
    },
});

function Login({classes}) {
    function handleClick(e) {
        e.preventDefault();
        document.querySelector("#proPop"+105).classList.remove("display");
        
    }

    let interval1 = setInterval(function () {
        if(document.querySelector("#login")){
            document.querySelector("#login").style.animation= "pop 0.5s ease-in-out";
        }
        clearInterval(interval1);
    }, 3000);
    
    let interval2 = setInterval(function () {
        if(document.querySelector("#login")){
            document.querySelector("#login").style.animation = "none";
        }
        clearInterval(interval2);
    }, 4000);
    
    return (
        <div class="login">
            <h3>Leave a review - </h3>
            <div class="btn">
                <form>
                    <marquee behavior="" direction="right">→</marquee>
                    <Tooltip title="Login to leave a review" classes={{ tooltip: classes.customTooltip }}><button onClick={handleClick} id="login" class="104">login</button>
                    </Tooltip>
                    <marquee behavior="" direction="left"> ← </marquee>
                </form>
            </div>
        </div>
    );
}

export default withStyles(styles)(Login);