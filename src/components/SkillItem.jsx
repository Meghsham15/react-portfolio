import React, { useEffect, useState } from "react";

function SkillItem(props) {
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

    return (
        <div className="skill">
            <div id={props.id} className="skl">
                <img onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="let" src={props.img} alt="" />
                <h3>
                    {props.name}
                </h3>
            </div>
        </div>
    )
}

export default SkillItem;