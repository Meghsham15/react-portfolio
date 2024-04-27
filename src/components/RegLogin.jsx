import React, { useEffect, useState } from "react";
import projects from "./projects";
import Pop from "./Pop";
import Auth from "./Auth";

function RegLogin(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [credentials, setCredentials] = useState();
    const [comments, setComments] = useState([{ comment: "heelllo noice work", username: "mj" }]);
    let authUser = Auth;

    async function handleRegistration(e) {
        e.preventDefault();
        // props.setCommentsArr()
        props.setLoader(false);
        setCredentials({ username, password });
        // console.log(JSON.stringify(credentials));
        let res = await authUser.register(username, password);
        if (res) {
            // console.log("Cred - " + JSON.stringify(credentials));
            let comments = await authUser.getComments();
            setComments(comments);
            props.setCommentsArr(comments);
            props.isAuthFun(true);
            document.querySelector("#proPop104").classList.add("display");
            setUsername("");
            setPassword("");
        } else {
            alert("error occured please try again");
            setUsername("");
            setPassword("");
        }
        props.setLoader(true);
    }

    async function handleLogin(e) {
        e.preventDefault();
        // props.setCommentsArr()
        props.setLoader(false);
        setCredentials({ username, password });
        setUsername("");
        setPassword("");
        let res = await authUser.login(username, password);
        if(res){
            // console.log("Cred - " + JSON.stringify(credentials));
            let comments = await authUser.getComments();
            setComments(comments);
            props.setCommentsArr(comments);
            props.isAuthFun(true);
            document.querySelector("#proPop105").classList.add("display");
            setUsername("");
            setPassword("");
        }else{
            alert("error occured");
            setUsername("");
            setPassword("");
        }
        props.setLoader(true);

    }

    useEffect(() => {
        props.isAuthFun(false);
        props.setCommentsArr([]);
    }, []);

    function handleClick(e) {
        document.querySelector("#proPop" + e).classList.add("display");
    }

    function handleChange(e) {
        if (e === 105) {
            let regId = e - 1;
            document.querySelector("#proPop" + regId).classList.add("display");
            document.querySelector("#proPop" + e).classList.remove("display");
        } else {
            let loginId = e + 1;
            document.querySelector("#proPop" + loginId).classList.add("display");
            document.querySelector("#proPop" + e).classList.remove("display");
        }

    }

    return (
        <div id="projectPop">
            <div id="proPop104" className="proPop display">
                <div className="loginContainer">
                    <h1>Register</h1>
                    <form >
                        <input value={username} onChange={(e) => setUsername(e.target.value)} id="usernameR" type="text" className="focus" name="username" placeholder="Enter Username"
                            required />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} id="passwordR" type="password" className="focus" name="password" placeholder="Enter Password"
                            required />
                        <button onClick={handleRegistration} id="registerUser">Register</button>
                    </form>
                    <div className="ask">
                        <a onClick={() => handleChange(105)} className="105">
                            <div>Login</div>
                        </a>
                    </div>
                </div>
                <a onClick={() => handleClick("104")} id="proPopB104" className="proPopB">
                    <p>⨯</p>
                </a>
            </div>

            <div id="proPop105" className="proPop display">
                <div className="loginContainer">
                    <h1>Login</h1>
                    <form action="/index.html">
                        <input value={username} onChange={(e) => setUsername(e.target.value)} id="usernameL" type="text" className="focus" name="username" placeholder="Enter Username" required />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} id="passwordL" type="password" className="focus" name="password" placeholder="Enter Password" required />
                        <button onClick={handleLogin} id="loginUser">Login</button>
                    </form>
                    <div className="ask">
                        <a onClick={() => handleChange(104)} className="104">
                            <div>Register</div>
                        </a>
                    </div>

                </div>
                <a onClick={() => handleClick("105")} id="proPopB105" className="proPopB">
                    <p>⨯</p>
                </a>
            </div>

            {projects.map((e) => {
                return <Pop clickFunc={handleClick} key={e.id} id={e.id} name={e.name} des={e.des} link={e.link} img={e.img} />
            })}

        </div>
    )
};

export default RegLogin;