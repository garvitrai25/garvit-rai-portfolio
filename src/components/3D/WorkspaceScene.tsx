import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const WorkspaceScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const monitorRef = useRef<THREE.Mesh>(null);
  const keyboardRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (monitorRef.current) {
      monitorRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={0.8}>
      {/* Desk */}
      <Box args={[4, 0.1, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2d3748" />
      </Box>
      
      {/* Monitor */}
      <group ref={monitorRef} position={[0, 1, -0.5]}>
        <Box args={[2, 1.2, 0.05]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1a202c" />
        </Box>
        {/* Screen */}
        <Box args={[1.8, 1, 0.01]} position={[0, 0, 0.03]}>
          <meshStandardMaterial 
            color="#0ea5e9" 
            emissive="#0284c7" 
            emissiveIntensity={0.2}
          />
        </Box>
        {/* Stand */}
        <Cylinder args={[0.05, 0.05, 0.8]} position={[0, -0.6, 0]}>
          <meshStandardMaterial color="#4a5568" />
        </Cylinder>
      </group>

      {/* Keyboard */}
      <Box ref={keyboardRef} args={[1.5, 0.05, 0.5]} position={[0, 0.05, 0.3]}>
        <meshStandardMaterial color="#2d3748" />
      </Box>

      {/* Mouse */}
      <Box args={[0.3, 0.05, 0.5]} position={[1, 0.05, 0.3]}>
        <meshStandardMaterial color="#4a5568" />
      </Box>

      {/* Coffee Cup */}
      <group position={[-1.5, 0.2, 0]}>
        <Cylinder args={[0.15, 0.12, 0.25]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Cylinder>
        {/* Coffee */}
        <Cylinder args={[0.13, 0.11, 0.02]} position={[0, 0.12, 0]}>
          <meshStandardMaterial color="#3e2723" />
        </Cylinder>
      </group>

      {/* Books */}
      <group position={[1.2, 0.1, -0.7]}>
        <Box args={[0.3, 0.05, 0.8]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#e53e3e" />
        </Box>
        <Box args={[0.3, 0.05, 0.8]} position={[0, 0.05, 0]}>
          <meshStandardMaterial color="#3182ce" />
        </Box>
        <Box args={[0.3, 0.05, 0.8]} position={[0, 0.1, 0]}>
          <meshStandardMaterial color="#38a169" />
        </Box>
      </group>

      {/* Floating Elements */}
      <Sphere args={[0.05]} position={[-2, 1.5, 1]}>
        <meshStandardMaterial color="#d946ef" emissive="#c026d3" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[0.03]} position={[2.5, 1.2, -1]}>
        <meshStandardMaterial color="#0ea5e9" emissive="#0284c7" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[0.04]} position={[-1.8, 2, -1.5]}>
        <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={0.5} />
      </Sphere>
    </group>
  );
};

export default WorkspaceScene;