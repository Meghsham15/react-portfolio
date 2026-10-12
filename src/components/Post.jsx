import React, { useState } from "react";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
 
const styles = (theme) => ({
    customTooltip: {
        backgroundColor: '#1c1914', // Customize background color
        color: '#efe8de', // Customize text color
        fontSize: '1.1vw', // Customize font size
        borderRadius: '4px', // Customize border radius
        padding: '8px', // Add padding
        // Add any other custom styles here
        border:"1px solid #c9a46a",
        fontFamily: '"Figtree", sans-serif',
        boxShadow:"0px 8px 24px rgba(20, 18, 15, 0.45)",
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