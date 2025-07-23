import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface SkillCard3DProps {
  color: string;
}

const SkillCard3D: React.FC<SkillCard3DProps> = ({ color }) => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={0.5}>
      {/* Central Sphere */}
      <Sphere ref={sphereRef} args={[0.5]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>

      {/* Orbiting Cubes */}
      <Box args={[0.2, 0.2, 0.2]} position={[1.5, 0, 0]}>
        <meshStandardMaterial color={color} opacity={0.7} transparent />
      </Box>
      <Box args={[0.2, 0.2, 0.2]} position={[-1.5, 0, 0]}>
        <meshStandardMaterial color={color} opacity={0.7} transparent />
      </Box>
      <Box args={[0.2, 0.2, 0.2]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color={color} opacity={0.7} transparent />
      </Box>
      <Box args={[0.2, 0.2, 0.2]} position={[0, -1.5, 0]}>
        <meshStandardMaterial color={color} opacity={0.7} transparent />
      </Box>

      {/* Connecting Lines */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 3]} />
        <meshStandardMaterial color={color} opacity={0.3} transparent />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 3]} />
        <meshStandardMaterial color={color} opacity={0.3} transparent />
      </mesh>
    </group>
  );
};

export default SkillCard3D;