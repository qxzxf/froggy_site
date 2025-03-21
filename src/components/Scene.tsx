'use client'

import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Float, 
  Cloud, 
  Stars,
  useTexture,
  Effects,
  Sparkles
} from '@react-three/drei'
import { 
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette
} from '@react-three/postprocessing'
import { Suspense, useRef, useEffect } from 'react'
import { Frog3D } from './Frog3D'
import * as THREE from 'three'
import { useSpring, animated } from '@react-spring/three'

function WaterSurface() {
  const waterRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (waterRef.current) {
      waterRef.current.rotation.x = -Math.PI / 2
    }
  }, [])

  const { position } = useSpring({
    from: { position: [0, -1, 0] },
    to: { position: [0, -0.9, 0] },
    config: { mass: 1, tension: 280, friction: 120 },
    loop: true
  })

  return (
    <animated.mesh ref={waterRef} position={position} receiveShadow>
      <planeGeometry args={[100, 100, 128, 128]} />
      <meshPhysicalMaterial 
        color="#0c4a6e"
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={1.5}
        clearcoat={1}
        clearcoatRoughness={0.2}
        transmission={0.8}
        transparent={true}
        opacity={0.9}
        ior={1.3}
        thickness={1}
        attenuationColor="#0c4a6e"
        attenuationDistance={1}
      />
    </animated.mesh>
  )
}

function Waterlily({ position }: { position: [number, number, number] }) {
  const lilyRef = useRef<THREE.Group>(null)

  const { rotation } = useSpring({
    from: { rotation: [0, 0, 0] },
    to: { rotation: [0, Math.PI * 2, 0] },
    config: { duration: 20000 },
    loop: true
  })

  return (
    <animated.group ref={lilyRef} position={position} rotation={rotation}>
      {/* Лист кувшинки */}
      <mesh rotation={[-Math.PI / 2, 0, Math.random() * Math.PI * 2]} position={[0, 0, 0]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial 
          color="#15803d"
          metalness={0.1}
          roughness={0.9}
          side={2}
        />
      </mesh>
      {/* Цветок */}
      {Math.random() > 0.5 && (
        <group position={[0.3, 0.1, 0.3]} rotation={[0, Math.random() * Math.PI * 2, 0]}>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#fef3c7" emissive="#fef3c7" emissiveIntensity={0.2} />
          </mesh>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos(i * Math.PI / 4) * 0.2,
                0,
                Math.sin(i * Math.PI / 4) * 0.2
              ]}
              rotation={[0, i * Math.PI / 4, 0]}
            >
              <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
              <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.1} />
            </mesh>
          ))}
        </group>
      )}
    </animated.group>
  )
}

function Environment3D() {
  return (
    <>
      {/* Основное освещение */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.7} castShadow />
      <pointLight position={[-5, 2, -5]} intensity={0.3} color="#4ade80" />
      <pointLight position={[5, 2, -5]} intensity={0.3} color="#22c55e" />
      
      {/* Звезды и искры */}
      <Stars radius={50} depth={50} count={1000} factor={4} fade speed={0.5} />
      <Sparkles count={50} scale={10} size={2} speed={0.3} opacity={0.1} />
      
      {/* Декоративные облака */}
      <Cloud position={[-4, 2, -5]} speed={0.2} opacity={0.3} color="#4ade80" />
      <Cloud position={[4, 3, -6]} speed={0.2} opacity={0.3} color="#22c55e" />
      
      {/* Водная поверхность */}
      <WaterSurface />

      {/* Кувшинки */}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 15
        const z = (Math.random() - 0.5) * 15
        return (
          <Float key={i} speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
            <Waterlily position={[x, -0.95, z]} />
          </Float>
        )
      })}
      
      {/* Плавающие лягушки */}
      <Frog3D position={[-2, -0.1, 0]} side="left" scale={1.5} />
      <Frog3D position={[2, -0.1, 0]} side="left" scale={1.5} />
    </>
  )
}

export default function Scene() {
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[0, 2, 8]} />
      <OrbitControls 
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
      
      <Suspense fallback={null}>
        <Environment3D />
        <Environment preset="night" background blur={0.8} />
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.7}
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration
            offset={[0.001, 0.001]}
          />
          <Vignette
            darkness={0.4}
            offset={0.5}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
} 