import React from "react";
import LeftContainer from "./LeftContainer.jsx";
import RightContainer from "./RightContainer.jsx";
import MidContainer from "./MidContainer.jsx";
import Footer from "./Footer.jsx"


function Container(props){

    return (
        <div class="container">
        <LeftContainer/>
        <MidContainer />
        <RightContainer setLoader={props.setLoader} setComments={props.setComments} setUserObj={props.setUserObj} authTool={props.authTool} userObj={props.userObj} comments={props.comments} setAuth={props.setAuth} authStatus={props.isAuth} />
        <Footer/>
        </div>

    )

}

export default Container;