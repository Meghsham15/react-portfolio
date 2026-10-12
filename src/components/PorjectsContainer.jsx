import React from "react";
import projects from "./projects";
import Let from "./Let";
import ProjectItem from "./ProjectItem";
import Carosel from "./Carosel";
import Images from "./Images";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    customTooltip: {
        backgroundColor: '#1c1914', // Customize background color
        color: '#efe8de', // Customize text color
        fontSize: '1.1vw', // Customize font size
        borderRadius: '4px', // Customize border radius
        padding: '8px', // Add padding
        // Add any other custom styles here
        border: "1px solid #c9a46a",
        fontFamily: '"Figtree", sans-serif',
        boxShadow: "0px 8px 24px rgba(20, 18, 15, 0.45)",
    },
});

function ProjectsContainer(props) {
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
                <Tooltip title="Previous" classes={{ tooltip: props.classes.customTooltip }}>
                    <button id="lB"><img className="proButtons" onClick={handleClickLeft} src={Images.leftB} alt="" id="left" /></button>
                    </Tooltip>
                    <Tooltip title="Next" classes={{ tooltip: props.classes.customTooltip }}>
                    <button id="rB"><img className="proButtons" onClick={handleClickRight} src={Images.rightB} alt="" id="right" /></button>
                    </Tooltip>
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



export default withStyles(styles)(ProjectsContainer);