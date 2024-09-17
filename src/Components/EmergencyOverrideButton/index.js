import React from 'react';

import "./index.css"

const EmergencyOverrideButton = ({ onClick }) => {
  return (
    <button type="button" className="emergency_button" onClick={onClick}>
      Emergency Crossing
    </button>
  );
};

export default EmergencyOverrideButton;
