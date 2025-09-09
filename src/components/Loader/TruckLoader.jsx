import React from "react";
// import "../../App.css";
import "./TruckLoader.css"
import { Center } from "@react-three/drei";

const TruckLoader = () => {
  return (
    <div className="TruckLoader">
        <h1 style={{marginTop:"0px",color:"white",fontSize:"24px",fontWeight:600,fontFamily:"'Inter', sans-serif"}}>SISAM</h1>
      <div className="TruckLoader-cab"></div>
      <div className="TruckLoader-smoke"></div>
    </div>
  );
};

export default TruckLoader;
