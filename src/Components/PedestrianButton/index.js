import React from 'react';

import "./index.css"

const PedestrianButton = ({ onClick }) => {
  return (
    <button type="button" className="pedestrian_button" onClick={onClick}>
      Request Crossing
    </button>
  );
};

export default PedestrianButton;
