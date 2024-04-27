// import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import Auth from "./Auth";

function CommentForm(props) {
    const [commentInput,setCommentInput] = useState("");
    const [commentText,setCommentText] = useState("Comment");
    const [isDisabled,setDisabled] = useState(false);
    let auth = Auth;

    async function handleClick(e){
        // props.setLoader(false);
        setCommentText("loading...");
        setDisabled(true);
        e.preventDefault();
        let res = await auth.addChat(commentInput);
        // console.log(res);
        if(res){
            // alert("succes! added a chat");
            let comments = await auth.getComments();
            props.setComments(comments);
        }else{
            alert('error occured');
        }
        props.scrollTop();
        // props.setLoader(true);
        setDisabled(false)
        setCommentText("Comment");
        setCommentInput("");
    }

    function handleReset(e){
        e.preventDefault()
        setCommentInput("");
    }

    

    return (
        <form id="commentForm">
        {/* <input id="cUsername" type="hidden" value={props.username} />
        <input id="cPass" type="hidden" value={props.password} /> */}
        <textarea value={commentInput} onChange={(e)=>setCommentInput(e.target.value)} cols="30" rows="2" id="commentInput" requried="true"></textarea>
        <div id="buttons"><button id="buttonC" style={isDisabled?{color: "#b6a7a7",background: "#023c4e"}:{}} disabled={isDisabled} onClick={handleClick}>{commentText}</button><button id="buttonR" onClick={handleReset}>Reset</button></div>
        </form>
            );
}

export default CommentForm;