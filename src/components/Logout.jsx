import React from "react";

function Logout(props) {
    let auth = props.authTool;
    async function handleClick(){
        // console.log(":logout clicked");
        props.setLoader(false);
        let res = await auth.logout();
        if(res){
            props.setAuth(false);
            props.setUserObj();
        }else{
           alert( "error occured");
        }
        props.setLoader(true);
    }
    return (
        <div id="logout">
            <a id="logoutUser">
                <div class="logout" id="logoutUser" onClick={handleClick}>Logout</div>
            </a>
        </div>
    )
}

export default Logout;