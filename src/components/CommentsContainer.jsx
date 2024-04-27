import React, { useEffect, useState } from "react";
import CommentHeader from "./CommentHeader";
import CommentForm from "./CommentForm";
import Post from "./Post";
import Auth from "./Auth";

function CommentsContianer(props){
    const [username,setUsername] = useState();
    const [commentsArr,setCommentsArr] = useState([]);
    let authUser = Auth;
    useEffect(()=>{
        let username = authUser.getUserName();
        let comments = authUser.getComments();
        setUsername(username);
        setCommentsArr(comments);
    },[]);

    return(<>
        <CommentHeader username ={username?username:""}/>
        <CommentForm setLoader={props.setLoader} scrollTop={props.scrollTop} setComments={props.setComments} />

        {commentsArr.length!==0?props.commentsArr.map((ele,index)=>{
            return <Post key={index} comment={ele.comment} username={ele.username}/>
        }):[]}
        {/* <Post comment="helloe nice work" username="MJ"/>
        <Post comment="helloe nice work" username="MJ"/>
        <Post comment="helloe nice work" username="MJ"/>
        <Post comment="helloe nice work" username="MJ"/>
        <Post comment="helloe nice work" username="MJ"/> */}
        </>
    )
};

export default CommentsContianer;