import React from "react";
import Navbar from "./Navbar";
import IntroContainer from "./IntroContainer";
import SkillsContainer from "./SkillsContainer";
import ProjectsContainer from "./PorjectsContainer";



function MidContainer() {

    // function fadeUp() {
    //     var elements = document.querySelectorAll("#fadeUp1, #fadeUp2, #fadeUp3");
    //     elements.forEach(function (element) {
    //         element.style.animation = "fadeUp 1s ease-in-out forwards";
    //     });
    // }

    function fadeEle(ele,animation) {
        var elements = document.querySelectorAll(ele);
        elements.forEach(function (element) {
            element.style.animation = animation;
        });
    };

    function animateSkillEle(val){
        if (val > 280 && val < 903) {
            fadeEle("#fadeUp1, #fadeUp2, #fadeUp3","fadeUp 1s ease-in-out forwards");
            fadeEle("#fadeLeft1,#fadeLeft2,#fadeLeft3","fadeLeft 1s ease-in-out forwards");
            fadeEle("#fadeRight1,#fadeRight2,#fadeRight3","fadeRight 1s ease-in-out forwards");
            fadeEle(".skillsInner h1","fadeUpIn 1s ease-in-out forwards");
        } else {
            fadeEle("#fadeUp1,#fadeUp2,#fadeUp3","none");
            fadeEle("#fadeLeft1,#fadeLeft2,#fadeLeft3","none");
            fadeEle("#fadeRight1,#fadeRight2,#fadeRight3","none");
            fadeEle(".skillsInner h1","none");
        }

    }

    function removeFooterCss(){
        document.querySelectorAll("footer ul li ").forEach(function(ele){
            ele.classList.remove("footer-click");
        });
        document.querySelectorAll("footer ul li ").forEach(function(ele){
            ele.classList.add("footer");
        });
        document.querySelectorAll("footer ul li a").forEach(function(ele){
            ele.classList.remove("navigator-click");
        });
        document.querySelectorAll("footer ul li a").forEach(function(ele){
            ele.classList.add("navigator");
        });
    }

    function animateFooter(scrollVal){
        if (scrollVal > 0 && scrollVal < 453) {
            removeFooterCss();
            document.querySelector("#f1 a").classList.remove("navigator");
            document.querySelector("#f1 a").classList.add("navigator-click");
            document.querySelector("#f1").classList.remove("footer");
            document.querySelector("#f1").classList.add("footer-click");
            document.querySelectorAll(".downScrollL,.downScrollR").forEach(function(ele){
                ele.style.transform = "rotate(90deg)"
            });
        }
        if (scrollVal > 453 && scrollVal < 945) {
            // document.querySelector("footer ul li ").classList.remove("footer-click");
            // document.querySelector("footer ul li ").classList.add("footer");
            // document.querySelector("footer ul li a").classList.remove("navigator-click");
            // document.querySelector("footer ul li a").classList.add("navigator");
            removeFooterCss();
            document.querySelector("#f2 a").classList.remove("navigator");
            document.querySelector("#f2 a").classList.add("navigator-click");
            document.querySelector("#f2").classList.remove("footer");
            document.querySelector("#f2").classList.add("footer-click");
            document.querySelector(".downScrollL").style.transform =  "rotate(90deg)";
            document.querySelector(".downScrollR").style.transform = "rotate(270deg)";
        }
        if (scrollVal > 945 && scrollVal < 1120) {
            // document.querySelector("footer ul li ").classList.remove("footer-click");
            // document.querySelector("footer ul li ").classList.add("footer");
            // document.querySelector("footer ul li a").classList.remove("navigator-click");
            // document.querySelector("footer ul li a").classList.add("navigator");
            removeFooterCss();
            document.querySelector("#f3 a").classList.remove("navigator");
            document.querySelector("#f3 a").classList.add("navigator-click");
            document.querySelector("#f3").classList.remove("footer");
            document.querySelector("#f3").classList.add("footer-click");
            document.querySelectorAll(".downScrollL,.downScrollR").forEach(function(ele){
                ele.style.transform = "rotate(270deg)"
            });
        }
    }

    function animateProjectsEle(scrollVal){
        if (scrollVal > 900) {
            document.querySelector(".projectsInner h1").style.animation = "fadeUpIn 1s ease-in-out forwards";
            document.querySelector(".projectBox").style.animation = "popUpIn 1s ease-in-out forwards";
        } else {
            document.querySelector(".projectsInner h1").style.animation = "none";
            document.querySelector(".projectBox").style.animation = "none";
        }
    }


    function handleScroll(e) {
        let scrollVal = Math.floor(e.target.scrollTop);
        animateSkillEle(scrollVal);
        animateFooter(scrollVal);
        animateProjectsEle(scrollVal);
    }

    return (
        <div onScroll={handleScroll} className="midContainer">
            <div class="midMain">
                <Navbar />
                <IntroContainer />
                <SkillsContainer />
                <ProjectsContainer />
            </div>
        </div>

    );

};

export default MidContainer;