import React from "react";

function Let(props){

    function handleMouseEnter(e){
        let ele = e.target;
        ele.style.animation =  "letter 0.6s ease-out 2 alternate";
        // console.log(ele.style.animation);
    }

    function handleMouseLeave(e){
        let ele = e.target;
        let interval = setInterval(function () {
            ele.style = "none";
            clearInterval(interval)
        },1000);
        // setInterval(function () {
        //     ele.style = "none";
        // }, 1500);
    }

    return(
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} class="let">
            {props.letter} 
        </div>
    )
};

export default Let;