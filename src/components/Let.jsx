import React from "react";

function Let(props){

    function handleMouseEnter(e){
        let ele = e.target;
        ele.style.animation =  "letter 0.6s ease-out 2 alternate";
        // console.log(ele.style.animation);
    }

    function handleMouseLeave(e){
        let ele = e.target;
        window.setTimeout(function () {
            ele.style.animation = "none";
        }, 1000);
    }

    return(
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="let">
            {props.letter} 
        </div>
    )
};

export default Let;