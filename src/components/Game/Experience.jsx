import {
  Environment,
  Float,
  RenderTexture,
  Stars,
  Text,
} from "@react-three/drei";
import { Color } from "three";

function Experience() {
  const textColor = new Color("#fff");
  textColor.multiplyScalar(6);
  return (
    <>
      <Text
        position={[0, 1.3, 0]}
        scale={0.4}
        font="/Philosopher-Bold.ttf"
        anchorX="center"
        anchorY="center"
        maxWidth={1}
        overflowWrap="normal"
      >
        TO BE CONTINUED
        <meshBasicMaterial color={textColor} toneMapped={false}>
          <RenderTexture attach={"map"}>
            <color attach="background" args={["#ff2312"]} />
            <Environment preset="city" />
            <Float floatIntensity={4} rotationIntensity={3}>
              <Stars
                radius={100}
                depth={10}
                count={5000}
                factor={100}
                saturation={0}
                fade
                speed={0}
              />
            </Float>
          </RenderTexture>
        </meshBasicMaterial>
      </Text>
    </>
  );
}

export default Experience;
