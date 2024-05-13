import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import React, { Suspense } from "react";

function Game() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Game;
