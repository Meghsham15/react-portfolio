import React, { useEffect, useState } from "react";
import devSkills from "./devSkills";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    customTooltip: {
        backgroundColor: 'black',
        color: 'red',
        fontSize: '14px',
        borderRadius: '8px',
        padding: '8px',
        border: "1px solid #03989e",
        fontFamily: '"Josefin Sans", sans-serif',
        boxShadow: "0px 0px 3px 0.5px #03989e",
        maxWidth: '240px',
        lineHeight: 1.4,
    },
});

function OtherSkills({ classes, idSuffix, className, showHeading }) {
    const suffix = idSuffix || "";
    const [openId, setOpenId] = useState(null);

    function skillDomId(id) {
        return id + suffix;
    }

    function handelMouseEnter(e) {
        const icon = document.querySelector("#" + e + " a img");
        if (!icon) {
            return;
        }
        icon.style.animation = "rot 0.6s ease-in-out";
        icon.style.transform = "scale(0.8)";
    }

    function handelMouseLeave(e) {
        const icon = document.querySelector("#" + e + " a img");
        if (!icon) {
            return;
        }
        icon.style.animation = "none";
        icon.style.transform = "scale(1)";
    }

    useEffect(() => {
        const skillIds = devSkills.map((skill) => skillDomId(skill.id));
        let prevNo = 0;
        const timer = setInterval(function () {
            let i = Math.floor(Math.random() * skillIds.length);
            if (i === prevNo) {
                i = (i + 1) % skillIds.length;
            }
            const prevIcon = document.querySelector("#" + skillIds[prevNo] + " a img");
            const nextIcon = document.querySelector("#" + skillIds[i] + " a img");
            if (prevIcon) {
                prevIcon.style.animation = "none";
            }
            if (nextIcon) {
                nextIcon.style.animation = "bnc 0.5s ease-in-out";
            }
            prevNo = i;
        }, 1500);
        return () => clearInterval(timer);
    }, [suffix]);

    return (
        <div id={suffix ? "socials" + suffix : "socials"} className={className || ""}>
            {showHeading ? <h3>Other skills -</h3> : null}
            {devSkills.map((skill) => (
                <Tooltip key={skillDomId(skill.id)} title={skill.meaning} placement="top" classes={{ tooltip: classes.customTooltip }}>
                    <div
                        id={skillDomId(skill.id)}
                        onMouseLeave={() => handelMouseLeave(skillDomId(skill.id))}
                        onMouseEnter={() => handelMouseEnter(skillDomId(skill.id))}
                        className={"social" + (openId === skill.id ? " social-open" : "")}
                    >
                        <a
                            href="#skills"
                            onClick={(event) => {
                                event.preventDefault();
                                setOpenId((current) => current === skill.id ? null : skill.id);
                            }}
                        >
                            <img src={skill.img} alt={skill.label} />
                            <p>{skill.label}</p>
                        </a>
                    </div>
                </Tooltip>
            ))}
            {openId ? (
                <div className="skillMeaning">
                    <strong>{devSkills.find((skill) => skill.id === openId).label}</strong>
                    <p>{devSkills.find((skill) => skill.id === openId).meaning}</p>
                </div>
            ) : (
                <p className="skillMeaningHint">Tap an icon to read what it means.</p>
            )}
        </div>
    );
}

export default withStyles(styles)(OtherSkills);
