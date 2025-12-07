'use client';

import { useEffect, useState } from 'react';

export default function LoadingSpinner() {
  const [statusText, setStatusText] = useState("Forecasting...");
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const statuses = [
      "Scanning...",
      "Clouds...",
      "Rain...",
      "Clearing...",
    ];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % statuses.length;
      setFade(false); 
      
      setTimeout(() => {
        setStatusText(statuses[index]);
        setFade(true); 
      }, 150); // Faster fade transition
    }, 1500); // 1.5s loop to match animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Scaled down container */}
      <div className="loader-container transform scale-50 origin-center">
        <div className="weather-scene">
          <div className="sun-wrapper">
            <div className="sun"></div>
          </div>
          
          <div className="cloud-wrapper">
            <div className="cloud"></div>
          </div>
          
          <div className="rain-wrapper">
            <div className="rain">
              <span className="drop"></span>
              <span className="drop"></span>
              <span className="drop"></span>
              <span className="drop"></span>
            </div>
          </div>
        </div>

        <div className="loading-text mt-[-20px]">
          <span 
            className="sub-text block text-2xl font-bold text-white transition-opacity duration-300"
            style={{ opacity: fade ? 1 : 0 }}
          >
            {statusText}
          </span>
        </div>
      </div>

      <style jsx>{`
        .loader-container {
          text-align: center;
          position: relative;
          width: 150px; /* Keep original internal size for layout stability */
          height: 150px;
        }

        .weather-scene {
          position: relative;
          width: 100%;
          height: 100%;
        }

        /* --- DURATIONS UPDATED TO 1.5s --- */

        /* --- SUN ANIMATIONS --- */
        .sun-wrapper {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          animation: sun-cycle 1.5s ease-in-out infinite;
        }

        .sun {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 60px;
          height: 60px;
          background: #FFD93D;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(255, 217, 61, 0.6);
          animation: spin 3s linear infinite; 
          z-index: 1;
        }

        .sun::before, .sun::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140%;
          height: 140%;
          border-radius: 50%;
          border: 4px dotted #FFD93D;
          opacity: 0.5;
        }
        
        .sun::after {
          width: 170%;
          height: 170%;
          opacity: 0.3;
          animation: spin-reverse 8s linear infinite;
        }

        /* --- CLOUD ANIMATIONS --- */
        .cloud-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 40px;
          z-index: 2;
          animation: cloud-cycle 1.5s ease-in-out infinite;
        }

        .cloud {
          position: relative;
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          animation: float 1s ease-in-out infinite;
        }

        .cloud::before, .cloud::after {
          content: '';
          position: absolute;
          background: #fff;
          border-radius: 50%;
        }

        .cloud::before { width: 50px; height: 50px; top: -25px; left: 10px; }
        .cloud::after { width: 40px; height: 40px; top: -15px; right: 10px; }

        /* --- RAIN ANIMATIONS --- */
        .rain-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, 10px);
          width: 80px;
          height: 60px;
          z-index: 1;
          overflow: hidden;
          animation: rain-cycle 1.5s ease-in-out infinite;
        }

        .rain {
            position: relative;
            width: 100%;
            height: 100%;
        }

        .drop {
          position: absolute;
          background: #64C4ED;
          width: 3px;
          height: 10px;
          border-radius: 2px;
          opacity: 0;
          animation: rain-fall 0.3s linear infinite;
        }

        .drop:nth-child(1) { left: 10px; top: -10px; animation-delay: 0.05s; }
        .drop:nth-child(2) { left: 30px; top: -15px; animation-delay: 0.1s; }
        .drop:nth-child(3) { left: 50px; top: -20px; animation-delay: 0.15s; }
        .drop:nth-child(4) { left: 70px; top: -10px; animation-delay: 0.08s; }

        /* --- KEYFRAMES --- */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(-360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes rain-fall {
          0% { top: -10px; opacity: 1; }
          100% { top: 60px; opacity: 0; }
        }

        @keyframes sun-cycle {
          0%, 20% { opacity: 1; filter: brightness(1); }
          30%, 70% { opacity: 0.8; filter: brightness(0.9); }
          80%, 100% { opacity: 1; filter: brightness(1); }
        }

        @keyframes cloud-cycle {
          0% { transform: translate(-150%, -50%); opacity: 0; }
          15% { transform: translate(-50%, -50%); opacity: 1; }
          70% { transform: translate(-50%, -50%); opacity: 1; }
          85% { transform: translate(50%, -50%); opacity: 0; }
          100% { transform: translate(50%, -50%); opacity: 0; }
        }

        @keyframes rain-cycle {
          0%, 25% { opacity: 0; }
          30% { opacity: 1; }
          60% { opacity: 1; }
          65% { opacity: 0; }
          100% { opacity: 0; } 
        }
      `}</style>
    </div>
  );
}
