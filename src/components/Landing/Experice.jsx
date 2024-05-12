import React, { useEffect, useRef, useState } from "react";
import { Airplane } from "../Airplane";
import {
  CubeCamera,
  Environment,
  Html,
  PerspectiveCamera,
  PositionalAudio,
  Stars,
} from "@react-three/drei";
import Ground from "./Ground";
import { Particles } from "./HyperSpace";
import * as THREE from "three";
import gsap from "gsap";
import useGameStore from "../../store/gameStore";
import { useFrame } from "@react-three/fiber";

function Experice() {
  const group = useRef();
  const html = useRef();

  const [play, setPlay] = useState(true);

  const { status, setStatus } = useGameStore();
  const [jump, setJump] = useState(false);

  const R2 = useRef();
  const cam = useRef();
  const damping = 0.02;
  const targetVelocity = new THREE.Vector3();
  const currentVelocity = new THREE.Vector3();
  const activeTargetPosition = [-9.6, 3, 20];
  const continueTargetPosition = [0, 3, -1];
  const targetZ = useRef(0);

  useEffect(() => {
    if (status === "active") {
      gsap.to(cam.current.position, {
        duration: 10,
        x: activeTargetPosition[0],
        y: activeTargetPosition[1],
        z: activeTargetPosition[2],
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(html.current, { display: "block" });
        },
      });
    }

    if (status === "anim") {
      gsap.set(html.current, { display: "none" });
      gsap.to(cam.current.position, {
        duration: 4,
        x: continueTargetPosition[0],
        y: continueTargetPosition[1],
        z: continueTargetPosition[2],
        ease: "expo.inOut",
        onComplete: () => {
          setStatus("takeOff");
        },
      });
    }

    if (status === "takeOff") {
      const tl = gsap.timeline();

      tl.to(
        group.current.position,
        {
          duration: 8,
          z: 5,
          y: 2,
        },
        "start"
      );
      tl.to(
        group.current.rotation,
        {
          duration: 5,
          y: -Math.PI / 2,
          delay: 3,
        },
        "start"
      );
      tl.add("end");
      if (R2.current) {
        tl.set(R2.current, { play: true, delay: 1 }, "end");
      }
      tl.to(
        group.current.position,
        {
          duration: 10,
          x: -20,
          y: 2,
        },
        "end"
      );
      tl.to(
        group.current.position,
        {
          duration: 4,
          x: -2000,
          ease: "expo.in",
          delay: 0,
        },
        "end"
      );
      setTimeout(() => {
        setJump(true);
      }, 8000);
      setTimeout(() => {
        setStatus("done");
      }, 12000);
    }
  }, [status]);

  const handleAnim = () => {
    setStatus("anim");
  };

  useFrame(({ clock, mouse }) => {
    const groupPosition = group.current.position.clone();

    groupPosition.y += 1;
    targetVelocity.x = mouse.x * 1;
    targetVelocity.y = mouse.y * 1;
    groupPosition.z = targetZ.current;
    currentVelocity.x += (targetVelocity.x - currentVelocity.x) * damping;
    currentVelocity.y += (targetVelocity.y - currentVelocity.y) * damping;

    groupPosition.x += currentVelocity.x;
    groupPosition.y += currentVelocity.y;

    cam.current.lookAt(groupPosition);
    cam.current.rotation.x += Math.sin(clock.getElapsedTime() / 5) / 30;
    cam.current.rotation.y += Math.cos(clock.getElapsedTime() / 5) / 30;

    if (status === "takeOff") {
      cam.current.rotation.y = -Math.PI - targetVelocity.x / 10;
      cam.current.rotation.x = 0 - targetVelocity.y / 10;
      cam.current.rotation.z = 0;
    }
  });

  return (
    <>
      <ambientLight intensity={5} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={5}
      />
      {jump && <Particles />}
      {play ? (
        <PositionalAudio
          ref={R2}
          url="/sounds/R2TAKEOFF.mp3"
          distance={10}
          loop={false}
        />
      ) : null}
      <group ref={group}>
        <PerspectiveCamera
          fov={35}
          ref={cam}
          near={0.1}
          far={1000}
          makeDefault
          position={[5, 3, 17]}
        />
        <CubeCamera resolution={256} frames={Infinity}>
          {(texture) => (
            <>
              <Environment preset="city" />
              <Airplane />
              <Html position={[0, 3, 0]}>
                <div ref={html} className="annotation" onClick={handleAnim}>
                  START
                </div>
              </Html>
            </>
          )}
        </CubeCamera>
      </group>
      <Ground />
    </>
  );
}

export default Experice;
