// Cloud.jsx
import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const atlasUrl = 'https://threejs.org/examples/textures/sprites/cloud10.png'

export default function Cloud({ position = [0, 0, 0], scale = 1, speed = 0.1 }) {
  const ref = useRef()

  // Load the cloud texture
  const texture = useLoader(THREE.TextureLoader, atlasUrl)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  // Animate cloud drifting
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.x += delta * speed
      if (ref.current.position.x > 50) {
        ref.current.position.x = -50 // reset to loop across the scene
      }
    }
  })

  return (
    <sprite ref={ref} position={position} scale={[scale * 20, scale * 10, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} />
    </sprite>
  )
}
