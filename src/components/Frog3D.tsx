'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'

interface Frog3DProps {
  position?: [number, number, number]
  side?: 'left' | 'right'
  scale?: number
}

export function Frog3D({ position = [0, 0, 0], side = 'left', scale = 1 }: Frog3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const frogGeometry = useLoader(STLLoader, '/models/FredTheCowboy.stl')

  // Материал без спецэффектов
  const material = new THREE.MeshStandardMaterial({
    color: '#1B5E20',
    metalness: 0.1,
    roughness: 0.7,
  })

  // Анимация
  useFrame((state) => {
    if (meshRef.current) {
      // Плавное покачивание только по вертикали
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05 + position[1]
    }
  })

  return (
    <mesh 
      ref={meshRef} 
      scale={[scale * 0.05, scale * 0.05, scale * 0.05]}
      position={position}
      rotation={[-Math.PI / 2, 0, 0]} // Корректируем ориентацию модели
      material={material}
    >
      <primitive object={frogGeometry} attach="geometry" />
    </mesh>
  )
} 