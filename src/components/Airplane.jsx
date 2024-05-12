import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Airplane(props) {
  const { nodes, materials } = useGLTF("/models/jet.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["��������������_0"].geometry}
          material={materials["Scene_-_Root"]}
          position={[0, 2, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["��������������002_0"].geometry}
          material={materials["Scene_-_Root"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/jet.glb");
