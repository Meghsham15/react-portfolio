import { useEffect, useState } from "react";
import BootLoader from "./BootLoader";
import Container from "./Container";
import Loader from "./Loader";
import RegLogin from "./RegLogin";
import ResumeContainer from "./ResumeContainer";
import Auth from "./Auth";

function App() {
  const [isHidden, setHidden] = useState(true);
  const [isAuth, setAuth] = useState();
  const [comments, setComments] = useState();
  const [Images, setImages] = useState();
  const [loaded, setLoaded] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      await Auth.makeGetRequest();
      if (cancelled) {
        return;
      }
      setImages(Auth.getImages());
      setLoaded(true);
    }

    start();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {bootDone ? null : (
        <BootLoader
          ready={loaded}
          onReveal={function () {
            setRevealed(true);
          }}
          onDone={function () {
            setBootDone(true);
          }}
        />
      )}
      {revealed && loaded ? (
        <>
          <Loader Images={Images} isHidden={isHidden} />
          <RegLogin Images={Images} setLoader={setHidden} setCommentsArr={setComments} isAuthFun={setAuth} />
          <ResumeContainer Images={Images} />
          <Container Images={Images} setLoader={setHidden} setComments={setComments} comments={comments} setAuth={setAuth} isAuth={isAuth} />
        </>
      ) : null}
    </>
  );
}

export default App;
