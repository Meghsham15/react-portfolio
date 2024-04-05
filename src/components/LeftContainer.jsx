import React, { useEffect, useState } from "react";
import slackImg from "./img/slack.png";
import facebookImg from "./img/facebook.png";
import discordImg from "./img/discord.png";
import twitterImg from "./img/twitter.png";
import mjLogo from "./img/mjlogo.png";

function LeftContainer() {
    const [degree, setDegree] = useState("");
    const [des, setDes] = useState("");
    const [weatherIcon, setWheatherIcon] = useState("");

    function fetchWeather(city) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=c931035e8ef7ccea5ad27c6b2a8f7f9b')
            .then(response => response.json())
            .then(data => {
                if (Number(data.cod) !== 400) {
                    var temp = data["main"]["temp"];
                    var des = data["weather"][0]["description"];
                    const icon = data["weather"][0]["icon"];
                    const iconurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                    setDegree(temp + " °C");
                    setDes(des);
                    setWheatherIcon(iconurl);
                }
            });
    }

    useEffect(() => {
        fetchWeather("Pune");

    }, []);

    function handleCityChange(e) {
        fetchWeather(e);
    }

    function handelMouseEnter(e) {
        document.querySelector("#" + e + " a img").style.animation = "rot 0.6s ease-in-out";
        document.querySelector("#" + e + " a img").style.transform = "scale(0.8)";
    };

    function handelMouseLeave(e) {
        document.querySelector("#" + e + " a img").style.animation = "none";
        document.querySelector("#" + e + " a img").style.transform = "scale(1)";
    };

    let social = ["instagram", "faceBook", "discord", "twitter"];
    let prevNo = 0;

    setInterval(function () {
        let i = Math.floor(Math.random() * 4);
        // console.log(i);
        if (document.querySelector("#" + social[prevNo] + " a img")) {
            document.querySelector("#" + social[prevNo] + " a img").style.animation = "none";
        }
        document.querySelector("#" + social[i] + " a img").style.animation = "none";
        if (i === prevNo) {
            i = i + 1;
        }
        if (i >= 4) {
            i = 0;
        }
        document.querySelector("#" + social[i] + " a img").style.animation = "bnc 0.5s ease-in-out";
        prevNo = i;
    }, 1500);


    return (
        <div className="leftContainer">
            <div className="logo">
                <a href="/portfolio-mj/"><img src={mjLogo} alt="" /></a>
            </div>
            <div id="socials">
                <h3>Socials -</h3>
                <div id="instagram" onMouseLeave={(e) => handelMouseLeave("instagram")} onMouseEnter={(e) => handelMouseEnter("instagram")} className="social">
                    <a
                        href="https://join.slack.com/t/newworkspace-nig2346/shared_invite/zt-1lp9ax1n4-~Zecyj0U~tnztIMsmsK6uA" target="_blank">
                        <img src={slackImg} alt="" />
                        <p>@Meghsham Jade (MJ)</p>
                    </a>
                </div>
                <div id="faceBook" onMouseLeave={(e) => handelMouseLeave("faceBook")} onMouseEnter={(e) => handelMouseEnter("faceBook")} className="social fb">
                    <a href="https://www.facebook.com/meghsham.jade/" target="_blank">
                        <img src={facebookImg} alt="" />
                        <p>Meghsham Jade</p>
                    </a>
                </div>
                <div id="discord" onMouseLeave={(e) => handelMouseLeave("discord")} onMouseEnter={(e) => handelMouseEnter("discord")} className="social discord">
                    <a href="https://discord.gg/mFYaPHj6" target="_blank">
                        <img src={discordImg} alt="" />
                        <p>ÆRÉS#9264</p>
                    </a>
                </div>
                <div id="twitter" onMouseLeave={(e) => handelMouseLeave("twitter")} onMouseEnter={(e) => handelMouseEnter("twitter")} className="social twt" >
                    <a href="https://twitter.com/Meghsham6" target="_blank">
                        <img src={twitterImg} alt="" />
                        <p>@Meghsham6</p>
                    </a>
                </div>
            </div>
            <div className="weather">
                <div className="deg">
                    <p title="You can change the city by clicking on this" onBlur={(e) => handleCityChange(e.target.innerText)} contentEditable="true">Pune</p> : {degree}
                </div>
                <div className="des">
                    {des} <img src={weatherIcon} alt="" />
                </div>
            </div>
            <div className="downScrollL">
                <marquee behavior="" direction="right" className="scroll">scroll---&gt;</marquee>
            </div>
        </div>
    );

}

export default LeftContainer;