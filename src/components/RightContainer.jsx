import React, { useState } from "react";
import Date from "./Date";
import Login from "./Login";
import CommentsContianer from "./CommentsContainer";
import Logout from "./Logout";

function RightContainer(props){
    const [time,setTime] = useState("");

    function countDown() {
        let dt = new window.Date();
        let hrs = dt.getHours();
        let ap = "";
        if (dt.getHours() >= 12) {
            ap = "pm";
            hrs = dt.getHours() - 12;
        }
        else {
            ap = "am";
            hrs = dt.getHours();
        }
        if(hrs===0){
            hrs=12;
        }
        let mins = dt.getMinutes();
        let secs = dt.getSeconds();
        setTime(hrs + ":" + mins + ":" + secs + " " + ap);
    }
    setInterval(countDown, 1000);

    function scrollTop(){
        let element = document.getElementById('comments');
        element.scrollTop = element.scrollHeight+90;
    }

    // function handleScroll(e){
    //     console.log(e.target.scrollTop);
    // }

    return (
        <div id="rightContainer" className="rightContainer">
            <div className="downScrollR">
                <marquee behavior="" direction="right" className="scroll">scroll---&gt;</marquee>
            </div>
            <div className="dateTime">
                <div id="date" className="date">
                    {Date}
                </div>
                <div id="time" className="time">
                    {time}
                </div>
            </div>
            <div id="comments" className={props.authStatus?"comments commentsLog":""}>
                {props.authStatus?<CommentsContianer setLoader={props.setLoader} scrollTop={scrollTop} setComments={props.setComments} authTool={props.authTool} userObj={props.userObj} commentsArr={props.comments}/>:<Login/>}
            </div>
            {props.authStatus?<Logout setLoader={props.setLoader} setUserObj={props.setUserObj} authTool={props.authTool} setAuth={props.setAuth} />:<></>}
        </div>

    );

};

export default RightContainer;