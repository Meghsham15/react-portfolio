import React, { useState } from "react";

function Post(props){

    return(
        <div className="post">
            <div className="comment postTable">
                <p>{props.comment}</p>
                <div className="name">{props.username}</div>
            </div>
        </div>
        
    )

}

export default Post;