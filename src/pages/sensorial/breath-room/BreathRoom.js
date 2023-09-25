import React, { useEffect, useState } from 'react';
import './Breath.css';

function BreathRoom() {
  const [breath, setBreath] = useState("Respire");

  useEffect(() => {
    const interval = setInterval(() => {
      setBreath((prevBreath) => (prevBreath === "Respire" ? "Expire" : "Respire"));
    }, 6000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

  return (
    <>
        <div className="ball-container">
            <h1>{breath}</h1>
            <div className="ball animated"></div>
            <div className="ball sm-static"></div>
            <div className="ball md-static"></div>
            <div className="ball lg-static"></div>
        </div>
    </>
  );
}

export default BreathRoom;
