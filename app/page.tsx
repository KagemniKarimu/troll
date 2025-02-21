"use client";

import React, { useState, useEffect } from 'react';

const TrollUI = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [commandInput, setCommandInput] = useState('0x01234567890123456789012345678901234567890123456789');
  const [showTooltip, setShowTooltip] = useState('');

  // Animated title effect
  const [displayText, setDisplayText] = useState('');
  const titleText = 'troll';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= titleText.length) {
        setDisplayText(titleText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const handleExecute = () => {
    setIsButtonAnimating(true);
    setTimeout(() => setIsButtonAnimating(false), 500);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-mono ${isDarkMode ? 'bg-slate-900' : 'bg-emerald-50'}`}>
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-green-500/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12">
            <img 
              src="/troll.png" 
              alt="Troll Mascot" 
              className="w-full h-full object-contain hover:animate-bounce"
            />
          </div>
          <h1 className={`text-4xl font-bold font-mono tracking-tight ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {displayText}<span className="animate-pulse">_</span>
          </h1>
        </div>
        
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 rounded-full transition-transform duration-500 border border-green-500/30"
        >
          <span className={`text-2xl ${isDarkMode ? 'text-yellow-300' : 'text-slate-700'}`}>
            {isDarkMode ? '☀️' : '🌙'}
          </span>
        </button>
      </header>

      {/* Main content area */}
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Main card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side - Input and QR */}
          <div className={`p-6 rounded-xl shadow-lg border border-green-500/30
            ${isDarkMode ? 'bg-slate-800/50 text-green-400' : 'bg-white text-green-700'}`}
          >
            <div className="relative group mb-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Enter blob address..."
                  className={`flex-1 px-4 py-3 rounded-full font-mono transition-all duration-300
                    ${isDarkMode ? 
                      'bg-slate-700 text-green-400 placeholder-green-600/50' : 
                      'bg-green-50 text-green-800 placeholder-green-600/50'
                    }
                    border border-green-500/30 focus:outline-none focus:border-green-500
                    focus:ring-2 focus:ring-green-500/20`}
                />
                <button 
                  onClick={handleExecute}
                  onMouseEnter={() => setShowTooltip('execute')}
                  onMouseLeave={() => setShowTooltip('')}
                  className={`px-6 py-3 rounded-full font-mono transition-all duration-300 whitespace-nowrap relative
                    ${isDarkMode ? 
                      'bg-green-500 hover:bg-green-400 text-slate-900' : 
                      'bg-green-600 hover:bg-green-500 text-white'
                    }
                    ${isButtonAnimating ? 'scale-95' : 'hover:scale-105'}
                    border border-green-400/30`}
                >
                  Execute!
                  {showTooltip === 'execute' && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded-md animate-fade-in">
                      Fetch blob data
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* QR Code placeholder */}
            <div className={`aspect-square w-48 mx-auto border-2 border-dashed ${isDarkMode ? 'border-green-500/30' : 'border-green-600/30'} rounded-lg flex items-center justify-center`}>
              <span className="text-sm opacity-50">QR Code</span>
            </div>
          </div>

          {/* Right side - Blob Data Display */}
          <div className={`p-6 rounded-xl shadow-lg border border-green-500/30
            ${isDarkMode ? 'bg-slate-800/50 text-green-400' : 'bg-white text-green-700'}`}
          >
            <h2 className="text-xl font-bold mb-4">Blob Data</h2>
            
            {/* Blob Info Grid */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="opacity-70">Commitment:</span>
                <span className="col-span-2 font-mono break-all">0x1234...5678</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="opacity-70">Version:</span>
                <span className="col-span-2">1</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="opacity-70">Size:</span>
                <span className="col-span-2">131,072 bytes</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="opacity-70">Block:</span>
                <span className="col-span-2">#18,472,389</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="opacity-70">Timestamp:</span>
                <span className="col-span-2">2024-02-20 14:32:17 UTC</span>
              </div>
              
              {/* Data Preview */}
              <div className="mt-6">
                <h3 className="text-sm font-bold mb-2">Data Preview:</h3>
                <div className={`p-3 rounded-lg font-mono text-xs break-all ${isDarkMode ? 'bg-slate-900' : 'bg-green-50'}`}>
                  0x789c75cd41168456789c75cd411684567890123456789012345678901234567890123456789...
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrollUI;
