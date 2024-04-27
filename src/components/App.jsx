// import logo from './logo.svg';
import { useEffect, useState } from "react";
import Container from "./Container";
import Loader from "./Loader";
import RegLogin from "./RegLogin";
import ResumeContainer from "./ResumeContainer";

function App() {
  const [isHidden, setHidden] = useState(false);
  const [isAuth, setAuth] = useState();
  const [comments, setComments] = useState();
  
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
      <RegLogin setLoader={setHidden} setCommentsArr={setComments} isAuthFun={setAuth} />
      <ResumeContainer />
      <Container setLoader={setHidden} setComments={setComments} comments={comments} setAuth={setAuth} isAuth={isAuth} />
    </>
  );
}

export default App;
