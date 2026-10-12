import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItem: "center",
    },
    text: {
        backgroundColor: 'black', // Customize background color
        color: 'red', // Customize text color
        fontSize: '14px', // Customize font size
        // borderRadius: '8px', // Customize border radius
        // padding: '8px', // Add padding
        // Add any other custom styles here
        // border: "1px solid #03989e",
        fontFamily: '"Josefin Sans", sans-serif',
        margin: "0",
        padding: "0",
        // boxShadow: "0px 0px 3px 0.5px #03989e",
    },
    progress: {
        height: '4px', // Set the height of the progress bar
        margin: '4px 0', // Add margin to separate text and progress bar
        // color:"#03989e",
        borderRadius: "4px",
        width: "100px"
    },
});


function SkillItem(props) {
    function handleMouseEnter(e) {
        let ele = e.target;
        ele.style.animation = "letter 0.6s ease-out 2 alternate";
        // console.log(ele.style.animation);
    }

    function handleMouseLeave(e) {
        let ele = e.target;
        window.setTimeout(function () {
            ele.style.animation = "none";
        }, 1000);
        // setInterval(function () {
        //     ele.style = "none";
        // }, 1500);
    }

    return (
        <div className="skill">
            <Tooltip
                title={
                    <React.Fragment>
                        <div className={props.classes.text}>{props.name}</div>
                        <LinearProgress color="primary" className={props.classes.progress} variant="determinate" value={props.percent} />
                    </React.Fragment>
                }
                interactive
                classes={{ tooltip: props.classes.customTooltip }}
            >
                <div id={props.id} className="skl">
                    <img onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="let" src={props.img} alt="" />
                    <h3>
                        {props.name}
                    </h3>
                </div>
            </Tooltip>
        </div>
    )
}

export default withStyles(styles)(SkillItem);