// import React, { useEffect, useState } from 'react';
// import './App.css';

// const App = () => {
//   const [currentLight, setCurrentLight] = useState('Green'); // Start with Green light
//   const [countDown, setCountDown] = useState(10); // Countdown for Green
//   const [pedestrianRequest, setPedestrianRequest] = useState(false); // Track if a pedestrian crossing was requested
  
//   console.log(countDown);
//   // CSS class names based on active light
//   const GreenText = currentLight === 'Green' ? 'green_light' : 'Green_light_isActive';
//   const YellowText = currentLight === 'Yellow' ? 'yellow_light' : 'Yellow_light_isActive';
//   const RedText = currentLight === 'Red' ? 'red_light' : 'Red_light_isActive';

//   // Use useEffect for your timer logic and to handle any changes based on crossing requests
//   useEffect(() => {
//     let timer;
//     let countdownTimer;
//     let duration;

//     // Set the duration based on the current active light
//     if (currentLight === 'Green') {
//       duration = 10; // 10 seconds for Green
//     } else if (currentLight === 'Yellow') {
//       duration = 3; // 3 seconds for Yellow
//     } else if (currentLight === 'Red') {
//       duration = 7; // 7 seconds for Red
//     }

//     // Set countdown to the duration of the current light
//     setCountDown(duration);

//     // Countdown timer that decreases every second
//     countdownTimer = setInterval(() => {
//       setCountDown((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);

//     // Timer for light transitions
//     timer = setTimeout(() => {
//       // If a pedestrian request exists, go to Red after the current light ends
//       if (pedestrianRequest && currentLight !== 'Red') {
//         setCurrentLight('Red');
//         setPedestrianRequest(false); // Reset pedestrian request after switching to Red
//       } else {
//         // Normal light sequence
//         if (currentLight === 'Green') {
//           setCurrentLight('Yellow');
//         } else if (currentLight === 'Yellow') {
//           setCurrentLight('Red');
//         } else if (currentLight === 'Red') {
//           setCurrentLight('Green');
//         }
//       }
//     }, duration * 1000); // Transition after the duration ends

//     // Cleanup the timers when the effect is rerun or component unmounts
//     return () => {
//       clearTimeout(timer);
//       clearInterval(countdownTimer);
//     };
//   }, [currentLight, pedestrianRequest]); // Re-run effect when current light or pedestrian request changes

//   // Handle pedestrian crossing request
//   const handleCrossingRequest = () => {
//     if (currentLight !== 'Red') {
//       setPedestrianRequest(true); // Set pedestrian request if the light is not Red
//     }
//   };

//   const onclickEmergency = () => {

//   }

//   return (
//     <div className="Triffic_bg_container">
//       <div className="Triffic_light_container">
//         <div className={GreenText}></div>
//         <div className={YellowText}></div>
//         <div className={RedText}></div>
//       </div>
//       <div className="countdown_timer">Time Remaining: {countDown} seconds</div>
//       <button
//         type="button"
//         className="triffic_btn Request"
//         onClick={handleCrossingRequest}
//       >
//         Request Crossing
//       </button>
//       <button type="button" className="triffic_btn Emergency" onClick={onclickEmergency}>
//         Emergency Crossing
//       </button>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import TrafficLight from './Components/TrafficLight';
import PedestrianButton from './Components/PedestrianButton';
import EmergencyOverrideButton from './Components/EmergencyOverrideButton';

const App = () => {
  const [currentLight, setCurrentLight] = useState('Green');
  const [countDown, setCountDown] = useState(10);
  const [pedestrianRequested, setPedestrianRequested] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  useEffect(() => {
    let timer;
    let countdownTimer;
    let duration;

    if (emergencyMode) {
      duration = 5; // Emergency light duration
    } else {
      if (currentLight === 'Green') {
        duration = 10;
      } else if (currentLight === 'Yellow') {
        duration = 3;
      } else if (currentLight === 'Red') {
        duration = 7;
      }
    }

    setCountDown(duration);

    countdownTimer = setInterval(() => {
      setCountDown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    timer = setTimeout(() => {
      if (pedestrianRequested && currentLight !== 'Red') {
        setCurrentLight('Red');
        setPedestrianRequested(false);
      } else {
        if (currentLight === 'Green') {
          setCurrentLight('Yellow');
        } else if (currentLight === 'Yellow') {
          setCurrentLight('Red');
        } else if (currentLight === 'Red') {
          setCurrentLight('Green');
        }
      }
    }, duration * 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, [currentLight, pedestrianRequested, emergencyMode]);

  const handlePedestrianRequest = () => {
    if (currentLight !== 'Red') {
      setPedestrianRequested(true);
    }
  };

  const handleEmergencyOverride = () => {
    setEmergencyMode(!emergencyMode);
  };

  return (
    <div className="App">
      <TrafficLight currentLight={currentLight} />
      <div className="countdown_timer">Time Remaining: {countDown} seconds</div>
      <PedestrianButton onClick={handlePedestrianRequest} />
      <EmergencyOverrideButton onClick={handleEmergencyOverride} />
    </div>
  );
};

export default App;
