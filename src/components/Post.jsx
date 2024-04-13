import React, { useState } from "react";
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

function Post(props){

    return(
        <div className="post">
        <Tooltip title={`${props.username} says ${props.comment}`} classes={{ tooltip: props.classes.customTooltip }}>
            <div className="comment postTable">
                <p>{props.comment}</p>
                <div className="name">{props.username}</div>
            </div>
            </Tooltip>
        </div>
        
    )

}

export default withStyles(styles)(Post);