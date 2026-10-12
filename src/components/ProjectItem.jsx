import React from "react";

function ProjectItem(props) {

    function handleClick(){
        document.querySelectorAll(".proPop").forEach((ele)=>{
            ele.classList.add("display");
        });
        document.querySelector("#proPop"+props.id).classList.remove("display");
        // console.log("#proPop"+props.id);
    }

    return (
        <div onClick={handleClick} id={props.id} className="projectContent">
            <div className="proInner">
                <div className="proImg">
                    <img src={props.img} alt="" />
                </div>
                <div className="proInfo">
                    <h2>
                        {props.name}
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default ProjectItem;