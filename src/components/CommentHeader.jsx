import React from "react";

function CommentHeader(props){
    return(<>
        <div id="cmt">
            <h3>Keep comments short and sweet</h3>
        </div>
        <h4>Welcome @{props.username}</h4>
        </>
    )
}

export default CommentHeader;