import React, { useEffect, useState } from 'react';
import './Breath.css';
import { Grid, Typography } from '@mui/material';

function BreathRoom() {
  const [breath, setBreath] = useState("Inspira");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreath((prevBreath) => (prevBreath === "Inspira" ? "Expire" : "Inspira"));
    }, 6000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Grid
        container 
        sx={{ justifyContent: 'center', color: '#B49AFD'}}
      >
        <Typography variant="h1" sx={{fontSize: 64}}>{formatTime(timer)}</Typography>
      </Grid>
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
