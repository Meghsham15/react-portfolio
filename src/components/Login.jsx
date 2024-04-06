import React from "react";

function Login() {
    function handleClick(e) {
        e.preventDefault();
        document.querySelector("#proPop"+105).classList.remove("display");
        
    }

    let interval1 = setInterval(function () {
        if(document.querySelector("#login")){
            document.querySelector("#login").style.animation= "pop 0.5s ease-in-out";
        }
        clearInterval(interval1);
    }, 3000);
    
    let interval2 = setInterval(function () {
        if(document.querySelector("#login")){
            document.querySelector("#login").style.animation = "none";
        }
        clearInterval(interval2);
    }, 4000);
    
    return (
        <div class="login">
            <h3>Leave a review - </h3>
            <div class="btn">
                <form>
                    <marquee behavior="" direction="right">→</marquee><button onClick={handleClick} id="login" class="104">login</button>
                    <marquee behavior="" direction="left"> ← </marquee>
                </form>
            </div>
        </div>
    );
}

export default Login;