import React from "react";
import projects from "./projects";
import Let from "./Let";
import ProjectItem from "./ProjectItem";
import leftB from "./img/leftB.png";
import rightB from "./img/rightB.png";
import Carosel from "./Carosel";

function ProjectsContainer() {
    let myProjects = "My-Projects".split("");
    let carosel = new Carosel();

    function handleClickLeft() {
        carosel.left();
        document.querySelectorAll(".proInner").forEach((ele)=>{
            ele.style.animation = "slideleft 0.5s ease-in-out";
        });
        let interval = setInterval(function () {
            document.querySelectorAll(".proInner").forEach((ele)=>{
                ele.style.animation = "none";
            });
            clearInterval(interval);
        }, 500);
    }

    function handleClickRight() {
        carosel.right();
        document.querySelectorAll(".proInner").forEach((ele)=>{
            ele.style.animation = "slideRight 0.5s ease-in-out";
        });
        let interval = setInterval(function () {
            document.querySelectorAll(".proInner").forEach((ele)=>{
                ele.style.animation = "none";
            });
            clearInterval(interval);
        }, 500);
    };


    return (
        <div id="projects" className="content">
            <div className="projectsInner">
                <h1>
                    {myProjects.map((e, index) => (
                        <Let key={index} letter={e} />
                    ))}

                </h1>
                <div className="buttons">
                    <button id="lB"><img className="proButtons" onClick={handleClickLeft} src={leftB} alt="" id="left" /></button>
                    <button id="rB"><img className="proButtons" onClick={handleClickRight} src={rightB} alt="" id="right" /></button>
                </div>
                <div className="projectBox">
                    <div id="projectSlide" className="projectSlide">
                        {projects.map((e) => {
                            return <ProjectItem key={e.id} projectObj={e}  img={e.img} name={e.name} id={e.id} />
                        })}
                    </div>
                </div>

            </div>
        </div>
    );

}



export default ProjectsContainer;