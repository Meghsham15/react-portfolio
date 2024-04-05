import React from "react";
import Images from "./Images"
import Let from "./Let";

function IntroContainer() {
    let fullStack = "Full-Stack".split("");
    let webDeveloper = "Web-Developer".split("");
    let intro = process.env.REACT_APP_Intro;
    // console.log(intro);


    // function handleMouseEnter(e){
    //     let ele = e.target;
    //     ele.style.animation =  "letter 0.6s ease-out 2 forwards";
    //     console.log(ele.style.animation);
    // }

    // function handleMouseLeave(e){
    //     let ele = e.target;
    //     let interval = setInterval(function () {
    //         ele.style = "none";
    //         clearInterval(interval)
    //     },1000);
    //     // setInterval(function () {
    //     //     ele.style = "none";
    //     // }, 1500);
    // }

    return (
        <div id="intro" class="content">
            <div class="introInner">
                <div class="msg">
                    <div class="letters">

                        {fullStack.map((e, index) => (
                            <Let key={index} letter={e} />
                        ))}
                    </div>
                    <div class="letters2">
                        {webDeveloper.map((e, index) => (
                            <Let key={index} letter={e} />
                        ))}
                    </div>
                    <div class="hi">
                        Hi,
                    </div>
                    <div class="hi">
                        Myself Meghsham Jade
                    </div>
                    <div class="normal">
                        <h4>{intro}
                        </h4>
                    </div>
                </div>
                <div  class="img">
                    <img src={Images.mj} alt="MJ" />
                </div>
            </div>
        </div>
    )
}

export default IntroContainer;