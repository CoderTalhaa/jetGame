import { useProgress } from "@react-three/drei";
import { useRef } from "react";
import gsap from "gsap";
import { useEffect } from "react";

function LoadingScreen() {
  const ref = useRef();

  const { progress } = useProgress();

  useEffect(() => {
      if (progress === 100) {
        gsap.to(ref.current, {
          duration: 1,
          opacity: 0,
          onComplete: () => {
            ref.current.style.display = "none";
          },
        });
      }
    }, [progress]);

  return (
    <div ref={ref} className="loading w-screen h-screen fixed top-0  ">
      <div className="logo   ">
        <img src="/TH.png" />
      </div>
      <div className="row">
        <div className="trails" style={{ width: `${progress}%` }}>
          <div className="trail"></div>
          <div className="trail"></div>
        </div>
        <div className="ship">
          <img src="/jet.png" />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
