import React from "react";

function Pop(props) {
    return (
        <div id={"proPop"+props.id} class="proPop display">
            <div class="popMain">
                <img src={props.img} alt="" />
                <h1>{props.name}</h1>
                <h3>{props.des}</h3>
                <div class="webLink">
                    <h4>Website Link -</h4>
                    <a target="_blank" href={props.link}>{props.link}</a>
                </div>
            </div>
            <a onClick={()=>props.clickFunc(Number(props.id))} id={"proPopB" + props.id} class="proPopB"><p>⨯</p></a>
        </div>
    )
}

export default Pop;