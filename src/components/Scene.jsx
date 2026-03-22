import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function FloatingObjects() {
  const group = useRef();
  const glassRef = useRef();
  const brassRef = useRef();
  const marbleRef = useRef();

  useFrame((state) => {
    const scrollY = window.scrollY;
    
    // React to scroll physically with cinematic lag/smoothness
    if (group.current) {
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, scrollY * -0.003, 0.05);
      group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, scrollY * 0.002, 0.05);
    }
    
    // Individual elements also react to scroll (cinematic rotation)
    if (glassRef.current) {
      glassRef.current.rotation.x = scrollY * 0.001;
      glassRef.current.rotation.y = scrollY * 0.002;
    }
    if (brassRef.current) {
      brassRef.current.rotation.x = scrollY * 0.005;
      brassRef.current.position.z = THREE.MathUtils.lerp(1, scrollY * 0.003 - 2, 0.1);
    }
    if (marbleRef.current) {
      marbleRef.current.position.x = THREE.MathUtils.lerp(3, 3 + scrollY * 0.002, 0.05);
    }
  });

  return (
    <group ref={group}>
      {/* Cinematic Frosted Glass Centerpiece */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={glassRef} position={[0, 0, 0]}>
          <boxGeometry args={[4.5, 6, 0.15]} />
          <MeshTransmissionMaterial 
            backside
            samples={6}
            thickness={2.5}
            roughness={0.15}
            ior={1.4}
            chromaticAberration={0.06}
            transmission={1}
            color="#ffffff"
          />
        </mesh>
      </Float>

      {/* Luxury Brass Ring */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
        <mesh ref={brassRef} position={[-3, 1, -2]} rotation={[Math.PI/4, 0, 0]}>
          <torusGeometry args={[1.8, 0.04, 64, 128]} />
          <meshStandardMaterial color="#c5a55a" metalness={1} roughness={0.1} />
        </mesh>
      </Float>

      {/* Smooth Dark Ceramic/Marble Sphere */}
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.5}>
        <mesh ref={marbleRef} position={[3.5, -2, -1]}>
          <sphereGeometry args={[1.4, 64, 64]} />
          <meshStandardMaterial color="#1f1b18" roughness={0.2} metalness={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
        <color attach="background" args={['#1a1614']} />
        
        {/* Cinematic Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <spotLight position={[-10, 10, -10]} intensity={3} angle={0.4} penumbra={1} color="#C67B5C" />
        
        <FloatingObjects />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
