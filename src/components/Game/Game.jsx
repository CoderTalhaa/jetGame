import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

function Game() {
  return (
    <div className='w-full h-screen'>
        <Canvas>
            <OrbitControls />
            <mesh>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh>
        </Canvas>
    </div>
  )
}

export default Game