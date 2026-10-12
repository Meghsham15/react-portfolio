import React, { useEffect, useState } from "react";
import Date from "./Date";
import Chatbot from "./Chatbot";

function pad(value) {
    return String(value).padStart(2, "0");
}

function RightContainer(props) {
    const [time, setTime] = useState("");

    useEffect(() => {
        function countDown() {
            const dt = new window.Date();
            let hrs = dt.getHours();
            const ap = hrs >= 12 ? "pm" : "am";
            hrs = hrs % 12;
            if (hrs === 0) {
                hrs = 12;
            }
            setTime(hrs + ":" + pad(dt.getMinutes()) + ":" + pad(dt.getSeconds()) + " " + ap);
        }
        countDown();
        const timer = setInterval(countDown, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div id="rightContainer" className={"rightContainer" + (props.chatOpen ? " chat-open" : "")}>
            <div className="downScrollR">
                <span className="scroll">scroll ---&gt;</span>
            </div>
            <div className="dateTime">
                <div id="date" className="date">
                    {Date}
                </div>
                <div id="time" className="time">
                    {time}
                </div>
            </div>
            <div className="chatPanel">
                <Chatbot onClose={props.onCloseChat} />
            </div>
        </div>
    );
}

export default RightContainer;
