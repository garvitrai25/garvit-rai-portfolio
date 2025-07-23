import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

const ContactScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const laptopRef = useRef<THREE.Group>(null);
  const envelope1Ref = useRef<THREE.Mesh>(null);
  const envelope2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    
    if (laptopRef.current) {
      laptopRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }

    if (envelope1Ref.current) {
      envelope1Ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
      envelope1Ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2) * 0.1;
    }

    if (envelope2Ref.current) {
      envelope2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.8 + Math.PI) * 0.4;
      envelope2Ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef} scale={0.6}>
      {/* Laptop */}
      <group ref={laptopRef} position={[0, 0, 0]}>
        {/* Laptop Base */}
        <Box args={[3, 0.1, 2]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#2d3748" />
        </Box>
        
        {/* Laptop Screen */}
        <Box args={[2.8, 1.8, 0.05]} position={[0, 1, -0.9]} rotation={[-0.1, 0, 0]}>
          <meshStandardMaterial color="#1a202c" />
        </Box>
        
        {/* Screen Display */}
        <Box args={[2.6, 1.6, 0.01]} position={[0, 1, -0.85]} rotation={[-0.1, 0, 0]}>
          <meshStandardMaterial 
            color="#0ea5e9" 
            emissive="#0284c7" 
            emissiveIntensity={0.3}
          />
        </Box>
      </group>

      {/* Floating Envelopes */}
      <group position={[-2, 1.5, 1]}>
        <Box ref={envelope1Ref} args={[0.8, 0.6, 0.02]} rotation={[0, 0.3, 0]}>
          <meshStandardMaterial color="#f59e0b" />
        </Box>
        {/* Envelope flap */}
        <Box args={[0.8, 0.4, 0.01]} position={[0, 0.2, 0.02]} rotation={[0.3, 0.3, 0]}>
          <meshStandardMaterial color="#d97706" />
        </Box>
      </group>

      <group position={[2.5, 2, -1]}>
        <Box ref={envelope2Ref} args={[0.6, 0.4, 0.02]} rotation={[0, -0.5, 0.2]}>
          <meshStandardMaterial color="#10b981" />
        </Box>
        {/* Envelope flap */}
        <Box args={[0.6, 0.3, 0.01]} position={[0, 0.15, 0.02]} rotation={[0.4, -0.5, 0.2]}>
          <meshStandardMaterial color="#059669" />
        </Box>
      </group>

      {/* Floating Communication Icons */}
      <Sphere args={[0.15]} position={[-3, 2.5, -0.5]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#7c3aed" emissiveIntensity={0.4} />
      </Sphere>
      
      <Torus args={[0.2, 0.05]} position={[3, 1.2, 1.5]} rotation={[0.5, 0, 0]}>
        <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.3} />
      </Torus>

      <Cylinder args={[0.1, 0.1, 0.3]} position={[1, 3, -2]} rotation={[0.5, 0, 0.3]}>
        <meshStandardMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={0.3} />
      </Cylinder>

      {/* Decorative Elements */}
      <Box args={[0.3, 0.3, 0.3]} position={[-1.5, -0.8, 2]} rotation={[0.3, 0.3, 0.3]}>
        <meshStandardMaterial color="#d946ef" opacity={0.7} transparent />
      </Box>
      
      <Sphere args={[0.2]} position={[2, -1, -1.5]}>
        <meshStandardMaterial color="#f97316" opacity={0.8} transparent />
      </Sphere>
    </group>
  );
};

export default ContactScene;