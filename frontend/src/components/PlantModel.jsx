import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const RealPlant = () => {
  const { scene } = useGLTF("/models/plant.glb");

  return (
    <primitive
      object={scene}
      scale={0.7}
      position={[0, -0.1, 0]}
      rotation={[0, Math.PI / 8, 0]}
    />
  );
};

const PlantModel = () => {
  return (
    <div className="w-full max-w-md mx-auto h-[300px] md:h-[350px] 
                    rounded-2xl bg-gradient-to-br from-[#0b1f1a]/80 to-[#0b1f1a]/60
                    shadow-inner shadow-black/50 border border-mintGreen/40
                    flex items-center justify-center overflow-hidden">
      <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 2, -5]} intensity={0.4} />

        {/* Plant Model */}
        <Suspense fallback={null}>
          <RealPlant />
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.2}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 3.5}
        />
      </Canvas>
    </div>
  );
};

export default PlantModel;