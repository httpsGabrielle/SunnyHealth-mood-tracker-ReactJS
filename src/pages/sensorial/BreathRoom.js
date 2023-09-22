import React, { useState } from 'react';
import './Breath.css';

function BreathRoom() {

  return (
    <>
        <div className="bola-animada">
            <h1>Respire</h1>
            <div className="ball animated"></div>
            <div className="ball sm-static"></div>
            <div className="ball md-static"></div>
            <div className="ball lg-static"></div>
        </div>
    </>
  );
}

export default BreathRoom;
