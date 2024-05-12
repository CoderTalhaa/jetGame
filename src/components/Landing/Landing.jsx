import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Ovarlay from "./Ovarlay.jsx";
import Experice from "./Experice.jsx";
import { OrbitControls } from "@react-three/drei";

function Landing() {
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          shadows="basic"
          dpr={[1, 1]}
          gl={{
            antialias: false,
          }}
        >
          <color attach="background" args={["#000"]} />
          <Suspense fallback={null}>
            <Experice />
          </Suspense>
          {/* <OrbitControls /> */}
        </Canvas>
        <Ovarlay />
      </div>
    </>
  );
}

export default Landing;
