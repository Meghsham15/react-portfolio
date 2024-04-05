import React from "react";
import Let from "./Let";
import SkillItem from "./SkillItem";
import skills from "./skills";

function SkillsContainer() {
    
    let mySkills = "My-Skills".split("");

    return (
        <div id="skills" class="content">
            <div className="skillsInner">
                <h1>
                    {mySkills.map((e, index) => (
                        <Let key={index} letter={e} />
                    ))}
                    {/* Hello skills here */}
                </h1>

                <div id="skillDiv">
                    {skills.map((e,index)=>{
                        return<SkillItem key={e.id} name={e.name} img={e.img} id={e.id} />
                        {/* console.log(e.name); */}
                    })}

                </div>


            </div>
        </div>
    )
};
export default SkillsContainer;