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
  const [Images, setImages] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let hideTimer;
    let cancelled = false;

    async function start() {
      await Auth.makeGetRequest();
      if (cancelled) {
        return;
      }
      setImages(Auth.getImages());
      setLoaded(true);
      hideTimer = setTimeout(function () {
        if (!cancelled) {
          setHidden(true);
        }
      }, 1900);
    }

    start();

    return () => {
      cancelled = true;
      clearTimeout(hideTimer);
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Loader Images={Images} isHidden={isHidden} />
      <RegLogin Images={Images} setLoader={setHidden} setCommentsArr={setComments} isAuthFun={setAuth} />
      <ResumeContainer Images={Images} />
      <Container Images={Images} setLoader={setHidden} setComments={setComments} comments={comments} setAuth={setAuth} isAuth={isAuth} />
    </>
  );
}

export default App;
