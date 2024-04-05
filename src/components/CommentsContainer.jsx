import React from "react";
import CommentHeader from "./CommentHeader";
import CommentForm from "./CommentForm";
import Post from "./Post";

function CommentsContianer(props){
    

    return(<>
        <CommentHeader username ={props.userObj.username?props.userObj.username:""}/>
        <CommentForm setLoader={props.setLoader} scrollTop={props.scrollTop} setComments={props.setComments} authTool={props.authTool} userObj={props.userObj}/>
        {props.commentsArr?props.commentsArr.map((ele,index)=>{
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