import React from 'react';
import './index.css';

const TrafficLight = ({ currentLight }) => {
  return (
    <div className="traffic_light">
      <div className={`light green ${currentLight === 'Green' ? 'active' : ''}`}></div>
      <div className={`light yellow ${currentLight === 'Yellow' ? 'active' : ''}`}></div>
      <div className={`light red ${currentLight === 'Red' ? 'active' : ''}`}></div>
    </div>
  );
};

export default TrafficLight;
