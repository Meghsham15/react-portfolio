// import logo from './logo.svg';
import { useEffect, useState } from "react";
import Container from "./Container";
import Loader from "./Loader";
import RegLogin from "./RegLogin";
import ResumeContainer from "./ResumeContainer";
import Auth from "./Auth";

function App() {
  const [isHidden, setHidden] = useState(false);
  const [isAuth, setAuth] = useState();
  const [comments, setComments] = useState();
  const [userObj, setUserObj] = useState();
  let authUser = new Auth();
  
  useEffect(() => {
    if(window.innerWidth<630){
      alert('Use laptop or desktop for better experience')
    };
    let interval = setTimeout(function () {
      setHidden(true);
      clearInterval(interval);
    }, 1900);
  }, []);
  // useEffect(() => {
  //   let interval = setTimeout(function () {
  //     document.getElementById("loadingIndicator").style.display = "none";
  //     clearInterval(interval);
  //   }, 2000);
  // }, []);

  return (
    <>
      <Loader isHidden={isHidden} />
      <RegLogin setLoader={setHidden} setUserObj={setUserObj} authTool={authUser} setCommentsArr={setComments} isAuthFun={setAuth} />
      <ResumeContainer />
      <Container setLoader={setHidden} setUserObj={setUserObj} setComments={setComments} userObj={userObj} authTool={authUser} comments={comments} setAuth={setAuth} isAuth={isAuth} />
    </>
  );
}

export default App;
