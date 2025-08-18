import React, { Suspense } from "react";
import { Cloud } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Hero from "./Hero";
import Services from "./Services";

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", margin: 0, padding: 0 }}>
      <div style={{ position: "relative" }}>
        <Canvas
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "320vh", 
            pointerEvents: "none",
            zIndex: 6
          }}
          gl={{ alpha: true }}
          camera={{ position: [0.5, 0.5, 7], fov: 70 }}
        >
          <ambientLight intensity={0.2} />
          <directionalLight position={[15, 5, 5]} intensity={1.5} />
          <directionalLight position={[-5, 10, -5]} intensity={0.8} />
          <Suspense fallback={null}>
             <Cloud
              opacity={0.07}
              speed={0.1}
              width={10}
              depth={0.001}
              segments={20}
              color="#ffffff"
              position={[1, -1, -20]}
              scale={[2, 2, 2]}
            /> 
             <Cloud
              opacity={0.07}
              speed={0.1}
              width={15}
              depth={0.001}
              segments={20}
              color="#ffffff"
              position={[-15, -3, -20]}
              scale={[2, 2, 2]}
            />
               <Cloud
              opacity={0.07}
              speed={0.1}
              width={20}
              depth={0.001}
              segments={20}
              color="#ffffff"
              position={[10, -3, -28]}
              scale={[2, 2, 2]}
            />  
                  <Cloud
              opacity={0.07}
              speed={0.1}
              width={15}
              depth={0.001}
              segments={20}
              color="#ffffff"
              position={[-1, -6, -20]}
              scale={[2, 2, 2]}
            />


            {/* set */}

            <Cloud
              opacity={0.07}
              speed={0.1}
              width={100}
              depth={0.001}
              segments={20}
              color="#ffffffff"
              position={[-18, 10, -40]}
              scale={[2, 2, 2]}
            /> 
             <Cloud
              opacity={0.07}
              speed={0.1}
              width={10}
              depth={0.001}
              segments={20}
              color="#ffffff"
              position={[-2, 6, -30]}
              scale={[2, 2, 2]}
            /> 
               <Cloud
              opacity={0.07}
              speed={0.1}
              width={100}
              depth={0.001}
              segments={20}
              color="#ffffff"
              position={[17, 15, -30]}
              scale={[2, 2, 2]}
            /> 
                 <Cloud
              opacity={0.07}
              speed={0.1}
              width={100}
              depth={0.001}
              segments={20}
              color="#ffffff"
              position={[-24, 15, -30]}
              scale={[2, 2, 2]}
            /> 
                  <Cloud
              opacity={0.07}
              speed={0.1}
              width={100}
              depth={0.001}
              segments={20}
              color="#ffffff"
              position={[10, 8, -30]}
              scale={[2, 2, 2]}
            />
            {/* set  */}

               
          </Suspense>
        </Canvas>

        {/* Section 1 */}
        <div
          style={{
            height: "100vh",
            background: "tranparent",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            position: "relative"
          }}
        >
        {/* < Hero/> */}
        </div>

        {/* Section 2 */}
        <div
          style={{
            height: "120vh",
            background: "#ff6e40",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
            // borderRadius: "20px",
            marginTop: "0px",
            marginBottom: "0px",
            // boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
          }}
        >
        </div>
      </div>

      {/* Section 3 */}
      <div
        style={{
          height: "100vh",
          background: "#ff0000ff",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1
        }}
      >
        {/* <Services/> */}
      </div>
    </div>
  );
}
