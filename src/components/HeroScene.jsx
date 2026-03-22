import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, args, color, speed, distort }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.3;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} castShadow>
        <icosahedronGeometry args={args} />
        <MeshDistortMaterial
          color={color}
          roughness={0.3}
          metalness={0.8}
          distort={distort}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 80 }) {
  const points = useRef();
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#C67B5C"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ pointerEvents: 'none' }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#0d0d0d']} />
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#C67B5C" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#8B9E82" />
      <spotLight position={[0, 8, 0]} intensity={0.3} angle={0.5} penumbra={1} color="#ffdbce" />

      <FloatingShape position={[-3, 1.5, -2]} args={[1.2, 1]} color="#C67B5C" speed={1.5} distort={0.4} />
      <FloatingShape position={[3.5, -1, -3]} args={[0.9, 1]} color="#8B9E82" speed={2} distort={0.3} />
      <FloatingShape position={[1, 2.5, -4]} args={[0.7, 1]} color="#a86245" speed={1.8} distort={0.5} />
      <FloatingShape position={[-2, -2, -5]} args={[1.5, 0]} color="#52634b" speed={1} distort={0.2} />
      <FloatingShape position={[4, 1, -6]} args={[0.5, 1]} color="#ffb598" speed={2.5} distort={0.6} />

      <Particles count={100} />
    </Canvas>
  );
}
