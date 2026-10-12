import React from "react";

function Pop(props) {
    return (
        <div id={"proPop"+props.id} className="proPop display">
            <div className="popMain">
                <img src={props.img} alt="" />
                <h1>{props.name}</h1>
                <h3>{props.des}</h3>
                <div className="webLink">
                    <h4>Website Link -</h4>
                    <a target="_blank" rel="noreferrer" href={props.link}>{props.link}</a>
                </div>
            </div>
            <button type="button" onClick={()=>props.clickFunc(Number(props.id))} id={"proPopB" + props.id} className="proPopB" aria-label="Close project">
                <span>⨯</span>
            </button>
        </div>
    )
}

export default Pop;