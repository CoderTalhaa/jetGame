import gsap from "gsap";
import React, { useRef } from "react";
import useGameStore from "../../store/gameStore";

function Ovarlay() {
  const ovarlay = useRef();
  const { setStatus } = useGameStore();

  const handleClick = () => {
    const tl = gsap.timeline();
    tl.to(ovarlay.current, {
      duration: 1,
      opacity: 0,
      ease: "expo.out",
    }),
      tl.set(ovarlay.current, { display: "none" });
    setStatus("active");
    
  };

  return (
    <>
      <div ref={ovarlay} className="ovarlay">
        <header className="flex justify-center gap-6 p-6 text-3xl">
          <div>COME FLY WITH ME</div>
        </header>
        <div className="border-2 w-full border-amber-100"></div>
        <div className="w-full h-full flex justify-center items-center">
          <button className="button" onClick={handleClick}>
            ENTER
          </button>
        </div>
      </div>
      
    </>
  );
}

export default Ovarlay;
