import React from "react";
import Images from "./Images"
import Let from "./Let";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    customTooltip: {
        backgroundColor: 'black', // Customize background color
        color: 'red', // Customize text color
        fontSize: '18px', // Customize font size
        borderRadius: '8px', // Customize border radius
        padding: '8px', // Add padding
        // Add any other custom styles here
        border: "1px solid #03989e",
        fontFamily: '"Josefin Sans", sans-serif',
        boxShadow:"0px 0px 5px 0.5px #03989e",
        // fontWeight:"bold"
    },
});


function IntroContainer({ classes }) {
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
        <div id="intro" className="content">
            <div className="introInner">
                <div className="msg">
                    <div className="letters">

                        {fullStack.map((e, index) => (
                            <Let key={index} letter={e} />
                        ))}
                    </div>
                    <div className="letters2">
                        {webDeveloper.map((e, index) => (
                            <Let key={index} letter={e} />
                        ))}
                    </div>
                    <div className="hi">
                        Hi,
                    </div>
                    <div className="hi">
                        Myself Meghsham Jade
                    </div>
                    <div className="normal">
                        <h4>{intro}
                        </h4>
                    </div>
                </div>
                <div className="img">
                    <Tooltip title="Meghsham Jade " classes={{ tooltip: classes.customTooltip }}>

                    <img src={Images.mj} alt="MJ" />
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(IntroContainer);