import React from "react";
import Let from "./Let";
import SkillItem from "./SkillItem";
import OtherSkills from "./OtherSkills";
import skills from "./skills";
import useMaxWidth from "./useMaxWidth";

function SkillsContainer() {
    const isMobile = useMaxWidth(900);
    let mySkills = "My-Skills".split("");

    return (
        <div id="skills" className="content">
            <div className="skillsInner">
                <h1>
                    {mySkills.map((e, index) => (
                        <Let key={index} letter={e} />
                    ))}
                </h1>

                <div id="skillDiv">
                    {skills.map((e) => {
                        return <SkillItem key={e.id} name={e.name} percent={e.percent} img={e.img} id={e.id} />;
                    })}

                </div>
                {isMobile ? <OtherSkills className="skillsExtras" showHeading={true} /> : null}

            </div>
        </div>
    )
};
export default SkillsContainer;