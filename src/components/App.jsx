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
  const [Images,setImages] = useState();
  const [loaded,setLoaded] = useState(false);
  useEffect(async () => {
    await getImages();

    if(window.innerWidth<630){
      alert('Use laptop or desktop for better experience')
    };
    let interval = setTimeout(function () {
      setHidden(true);
      clearInterval(interval);
    }, 1900);
  }, []);

  async function getImages(){
    await Auth.makeGetRequest();
    let data = Auth.getImages(); 
    console.log("image url -"+  data.mjlogo);
    setImages(data);
    setLoaded(true);
  };
  // useEffect(() => {
  //   let interval = setTimeout(function () {
  //     document.getElementById("loadingIndicator").style.display = "none";
  //     clearInterval(interval);
  //   }, 2000);
  // }, []);

  return (
    <>
      {loaded?<><Loader Images={Images} isHidden={isHidden} />
      
      <RegLogin Images={Images} setLoader={setHidden} setCommentsArr={setComments} isAuthFun={setAuth} />

      <ResumeContainer Images={Images} />

      <Container Images={Images} setLoader={setHidden} setComments={setComments} comments={comments} setAuth={setAuth} isAuth={isAuth} /></>:<></>}
    </>
  );
}

export default App;
