import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Zap, Trophy, Gamepad2, Flag, Navigation, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Activity } from 'lucide-react';

const KARTS = [
  {
    id: 'sodi-orange',
    name: 'SODI RT10 PRO #07',
    shortName: '#07 SODI',
    number: '07',
    color: '#F47C20',
    darkColor: '#C45706',
    accent: '#00E5FF',
    suitColor: '#18181B',
    topSpeed: 8.8,
    accel: 0.22,
    handling: 0.075,
  },
  {
    id: 'honda-red',
    name: 'HONDA GX270 #12',
    shortName: '#12 HONDA',
    number: '12',
    color: '#FF1E27',
    darkColor: '#B30B12',
    accent: '#FFFFFF',
    suitColor: '#27272A',
    topSpeed: 9.2,
    accel: 0.24,
    handling: 0.07,
  },
  {
    id: 'leapfrog-neon',
    name: 'LEAP FROG RACING #24',
    shortName: '#24 LEAP',
    number: '24',
    color: '#00FF66',
    darkColor: '#00A843',
    accent: '#F47C20',
    suitColor: '#09090B',
    topSpeed: 8.6,
    accel: 0.25,
    handling: 0.082,
  },
];

export const TrackGame = () => {
  const canvasRef = useRef(null);
  const trackImgRef = useRef(null);

  const [selectedKartIdx, setSelectedKartIdx] = useState(0);
  const currentKart = KARTS[selectedKartIdx];

  const [speedKmh, setSpeedKmh] = useState(0);
  const [currentLapTime, setCurrentLapTime] = useState(0);
  const [bestLapTime, setBestLapTime] = useState(null);
  const [lapCount, setLapCount] = useState(1);
  const [lastLapBanner, setLastLapBanner] = useState(null);

  const [activeControls, setActiveControls] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
  });

  const keysRef = useRef({
    up: false,
    down: false,
    left: false,
    right: false,
  });

  const gameStateRef = useRef({
    x: 256,
    y: 615,
    angle: -2.35,
    speed: 0,
    friction: 0.965,
    skidmarks: [],
    checkpoints: [
      { x: 140, y: 500, r: 55, hit: false },
      { x: 50,  y: 330, r: 65, hit: false },
      { x: 130, y: 415, r: 55, hit: false },
      { x: 235, y: 170, r: 55, hit: false },
      { x: 360, y: 25,  r: 65, hit: false },
      { x: 335, y: 310, r: 55, hit: false },
      { x: 300, y: 575, r: 55, hit: false },
      { x: 670, y: 425, r: 65, hit: false },
      { x: 990, y: 468, r: 65, hit: false },
      { x: 650, y: 518, r: 65, hit: false },
      { x: 345, y: 640, r: 55, hit: false },
    ],
    lapStartTime: Date.now(),
    currentCheckpointIdx: 0,
  });

  const resetKart = () => {
    const s = gameStateRef.current;
    s.x = 256;
    s.y = 615;
    s.angle = -2.35;
    s.speed = 0;
    s.currentCheckpointIdx = 0;
    s.checkpoints.forEach((c) => (c.hit = false));
    s.lapStartTime = Date.now();
  };

  const setControl = (controlName, isPressed) => {
    keysRef.current[controlName] = isPressed;
    setActiveControls((prev) => ({ ...prev, [controlName]: isPressed }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      let handled = false;
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        setControl('up', true);
        handled = true;
      }
      if (['ArrowDown', 'KeyS'].includes(e.code)) {
        setControl('down', true);
        handled = true;
      }
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        setControl('left', true);
        handled = true;
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        setControl('right', true);
        handled = true;
      }
      if (e.code === 'KeyR') {
        resetKart();
        handled = true;
      }
      if (handled) e.preventDefault();
    };

    const handleKeyUp = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) setControl('up', false);
      if (['ArrowDown', 'KeyS'].includes(e.code)) setControl('down', false);
      if (['ArrowLeft', 'KeyA'].includes(e.code)) setControl('left', false);
      if (['ArrowRight', 'KeyD'].includes(e.code)) setControl('right', false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = '/kartomania-track-dark.png';
    trackImgRef.current = img;

    let animId;

    const loop = () => {
      const state = gameStateRef.current;
      const keys = keysRef.current;
      const kart = KARTS[selectedKartIdx];

      if (keys.up) {
        state.speed += kart.accel;
        if (state.speed > kart.topSpeed) state.speed = kart.topSpeed;
      } else if (keys.down) {
        if (state.speed > 0) {
          state.speed -= 0.38;
          if (state.speed < 0) state.speed = 0;
        } else {
          state.speed -= kart.accel * 0.45;
          if (state.speed < -kart.topSpeed * 0.3) state.speed = -kart.topSpeed * 0.3;
        }
      } else {
        if (state.speed > 0) {
          state.speed -= 0.08;
          if (state.speed < 0) state.speed = 0;
        } else if (state.speed < 0) {
          state.speed += 0.08;
          if (state.speed > 0) state.speed = 0;
        }
      }

      if (Math.abs(state.speed) > 0.1) {
        const steerFactor = Math.min(Math.abs(state.speed) / 3.8, 1.25);
        const dir = state.speed >= 0 ? 1 : -1;
        if (keys.left) state.angle -= kart.handling * steerFactor * dir;
        if (keys.right) state.angle += kart.handling * steerFactor * dir;
      }

      state.speed *= state.friction;

      state.x += Math.cos(state.angle) * state.speed;
      state.y += Math.sin(state.angle) * state.speed;

      state.x = Math.max(15, Math.min(1009, state.x));
      state.y = Math.max(15, Math.min(667, state.y));

      if (Math.abs(state.speed) > 3.8 && (keys.left || keys.right)) {
        state.skidmarks.push({
          x: state.x - Math.cos(state.angle) * 14,
          y: state.y - Math.sin(state.angle) * 14,
          alpha: 0.65,
        });
        if (state.skidmarks.length > 90) state.skidmarks.shift();
      }

      const curCp = state.checkpoints[state.currentCheckpointIdx];
      if (curCp) {
        const dx = state.x - curCp.x;
        const dy = state.y - curCp.y;
        if (Math.hypot(dx, dy) < curCp.r) {
          curCp.hit = true;
          state.currentCheckpointIdx++;
        }
      }

      if (state.currentCheckpointIdx >= state.checkpoints.length) {
        const dFinish = Math.hypot(state.x - 256, state.y - 615);
        if (dFinish < 55) {
          const lapDuration = (Date.now() - state.lapStartTime) / 1000;
          if (lapDuration > 4) {
            setLapCount((prev) => prev + 1);
            setBestLapTime((prev) => (prev ? Math.min(prev, lapDuration) : lapDuration));
            setLastLapBanner(lapDuration.toFixed(2));
            setTimeout(() => setLastLapBanner(null), 3000);
          }
          state.lapStartTime = Date.now();
          state.currentCheckpointIdx = 0;
          state.checkpoints.forEach((c) => (c.hit = false));
        }
      }

      const kmh = Math.round(Math.abs(state.speed) * 10.2);
      setSpeedKmh(kmh);
      setCurrentLapTime((Date.now() - state.lapStartTime) / 1000);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#070709';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (trackImgRef.current && trackImgRef.current.complete) {
        ctx.drawImage(trackImgRef.current, 0, 0, canvas.width, canvas.height);
      }

      ctx.save();
      for (let i = 0; i < state.skidmarks.length; i++) {
        const sm = state.skidmarks[i];
        sm.alpha *= 0.988;
        ctx.fillStyle = `rgba(0, 0, 0, ${sm.alpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(sm.x, sm.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      const nextCp = state.checkpoints[state.currentCheckpointIdx];
      if (nextCp) {
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(nextCp.x, nextCp.y, 18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      ctx.save();
      ctx.translate(state.x, state.y);
      ctx.rotate(state.angle);

      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      const grad = ctx.createRadialGradient(28, 0, 4, 46, 0, 36);
      grad.addColorStop(0, 'rgba(0, 229, 255, 0.6)');
      grad.addColorStop(0.5, 'rgba(0, 229, 255, 0.2)');
      grad.addColorStop(1, 'rgba(0, 229, 255, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(14, -6);
      ctx.lineTo(48, -20);
      ctx.lineTo(48, 20);
      ctx.lineTo(14, 6);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#1C1C1F';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(-16, -11);
      ctx.lineTo(10, -11);
      ctx.lineTo(16, -6);
      ctx.moveTo(-16, 11);
      ctx.lineTo(10, 11);
      ctx.lineTo(16, 6);
      ctx.stroke();

      ctx.strokeStyle = '#4B5563';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-14, -13);
      ctx.lineTo(-14, 13);
      ctx.stroke();

      ctx.fillStyle = '#D97706';
      ctx.fillRect(-15, -4, 2, 4);

      ctx.fillStyle = '#27272A';
      ctx.fillRect(-12, 5, 8, 6);
      ctx.fillStyle = '#71717A';
      ctx.fillRect(-11, 6, 6, 2);
      ctx.strokeStyle = '#E4E4E7';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-12, 8);
      ctx.quadraticCurveTo(-18, 9, -20, 5);
      ctx.stroke();
      ctx.fillStyle = '#3B82F6';
      ctx.beginPath();
      ctx.arc(-20, 5, 1.5, 0, Math.PI * 2);
      ctx.fill();

      const renderTire = (x, y, w, h, isRear) => {
        ctx.fillStyle = '#09090B';
        ctx.strokeStyle = '#27272A';
        ctx.lineWidth = 0.8;
        ctx.fillRect(x - w / 2, y - h / 2, w, h);
        ctx.strokeRect(x - w / 2, y - h / 2, w, h);

        ctx.fillStyle = '#F59E0B';
        ctx.fillRect(x - 1, y - h / 3, 2, (h * 2) / 3);

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
      };

      renderTire(-13, -11.5, 9, 6.5, true);
      renderTire(-13, 11.5, 9, 6.5, true);

      const steerAngle = keys.left ? -0.34 : keys.right ? 0.34 : 0;

      ctx.strokeStyle = '#9CA3AF';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(3, 0);
      ctx.lineTo(9, -10);
      ctx.moveTo(3, 0);
      ctx.lineTo(9, 10);
      ctx.stroke();

      ctx.save();
      ctx.translate(9, -10.5);
      ctx.rotate(steerAngle);
      renderTire(0, 0, 7.5, 5.5, false);
      ctx.restore();

      ctx.save();
      ctx.translate(9, 10.5);
      ctx.rotate(steerAngle);
      renderTire(0, 0, 7.5, 5.5, false);
      ctx.restore();

      const drawSidepod = (yOffset, isTop) => {
        ctx.save();
        ctx.fillStyle = kart.color;
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        const ySign = isTop ? -1 : 1;
        ctx.moveTo(-9, yOffset);
        ctx.lineTo(7, yOffset);
        ctx.lineTo(8, yOffset + 2 * ySign);
        ctx.lineTo(-8, yOffset + 3 * ySign);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = kart.darkColor;
        ctx.fillRect(-6, yOffset + (isTop ? -1.5 : 0.5), 10, 1.2);
        ctx.restore();
      };

      drawSidepod(-8.5, true);
      drawSidepod(8.5, false);

      ctx.fillStyle = kart.darkColor;
      ctx.fillRect(-17, -9.5, 3.5, 19);
      ctx.fillStyle = kart.color;
      ctx.fillRect(-17.5, -9, 4, 18);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-18, -10, 5, 1.5);
      ctx.fillRect(-18, 8.5, 5, 1.5);

      ctx.fillStyle = '#18181B';
      ctx.beginPath();
      ctx.moveTo(-11, -6);
      ctx.lineTo(8, -6);
      ctx.lineTo(15, -3);
      ctx.lineTo(15, 3);
      ctx.lineTo(8, 6);
      ctx.lineTo(-11, 6);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#0A0A0A';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(8, -6.5);
      ctx.lineTo(18, -2.5);
      ctx.lineTo(18, 2.5);
      ctx.lineTo(8, 6.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = kart.color;
      ctx.beginPath();
      ctx.moveTo(11, -3);
      ctx.lineTo(17, -1.2);
      ctx.lineTo(17, 1.2);
      ctx.lineTo(11, 3);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 3.5px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(kart.number, 13.5, 0);

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(17, -2, 1, 0, Math.PI * 2);
      ctx.arc(17, 2, 1, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#111113';
      ctx.beginPath();
      ctx.ellipse(-3, 0, 4.5, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#3F3F46';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.fillStyle = kart.suitColor;
      ctx.beginPath();
      ctx.ellipse(-2, 0, 3.5, 4.5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#EF4444';
      ctx.fillRect(-4, -2.2, 4.5, 0.9);
      ctx.fillRect(-4, 1.3, 4.5, 0.9);

      ctx.fillStyle = '#27272A';
      ctx.fillRect(2.5, -2.5, 1.8, 5);
      ctx.fillStyle = kart.accent;
      ctx.beginPath();
      ctx.arc(3.2, -2.8, 1.1, 0, Math.PI * 2);
      ctx.arc(3.2, 2.8, 1.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = kart.color;
      ctx.beginPath();
      ctx.arc(-1, 0, 4.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 0.7;
      ctx.stroke();

      ctx.fillStyle = kart.darkColor;
      ctx.beginPath();
      ctx.moveTo(-4, -1.5);
      ctx.lineTo(-6, 0);
      ctx.lineTo(-4, 1.5);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = kart.accent;
      ctx.beginPath();
      ctx.arc(0.5, 0, 2.5, -Math.PI / 2.2, Math.PI / 2.2);
      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(0.8, 0, 1.8, -Math.PI / 2.4, Math.PI / 2.4);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(1.5, -1, 0.8, 0.8);

      if (keys.down) {
        ctx.save();
        ctx.shadowColor = '#FF0000';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#FF1A1A';
        ctx.fillRect(-18, -2, 2, 4);
        ctx.restore();
      } else {
        ctx.fillStyle = '#7F1D1D';
        ctx.fillRect(-18, -1.5, 1.5, 3);
      }

      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, [selectedKartIdx]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = (secs % 60).toFixed(2);
    return `${m.toString().padStart(2, '0')}:${s < 10 ? `0${s}` : s}`;
  };

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#0A0A0A] border border-[#222222] shadow-[0_0_50px_rgba(0,0,0,0.95)] overflow-hidden select-none">
      
      <div className="relative z-20 p-2.5 sm:p-4 bg-[#0B0E14]/95 border-b border-white/10 backdrop-blur-md">
        <div className="max-w-[920px] mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4 font-mono text-xs">
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10">
              <span className="text-[9px] text-[#888888] font-bold px-1 uppercase hidden md:inline">KART:</span>
              {KARTS.map((k, idx) => (
                <button
                  key={k.id}
                  onClick={() => setSelectedKartIdx(idx)}
                  className={`px-2 py-1 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedKartIdx === idx
                      ? 'bg-white text-[#0A0A0A] shadow-sm font-black'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: k.color }}
                  />
                  <span>{k.shortName}</span>
                </button>
              ))}
            </div>

            <button
              onClick={resetKart}
              className="p-1 px-2 rounded-xl bg-white/10 hover:bg-[#F47C20] text-white border border-white/15 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
              title="Reset Kart to Start Grid"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">RESET</span>
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1">
              <span className="text-[#8E9CAE] font-bold">SPEED:</span>
              <span className="text-[#00E5FF] text-xs sm:text-sm font-black">
                {speedKmh} <span className="text-[8px] sm:text-[9px] font-semibold text-[#00E5FF]/75">KM/H</span>
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[#8E9CAE] font-bold">TIME:</span>
              <span className="text-white text-xs sm:text-sm font-black">
                {formatTimer(currentLapTime)}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1">
              <span className="text-[#8E9CAE] font-bold">BEST:</span>
              <span className="text-[#00FF66] text-xs sm:text-sm font-black">
                {bestLapTime ? formatTimer(bestLapTime) : '--:--.--'}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[#8E9CAE] font-bold">LAP:</span>
              <span className="text-[#F47C20] text-xs sm:text-sm font-black">{lapCount}</span>
            </div>
          </div>

        </div>
      </div>

      {lastLapBanner && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-[#0F0F12]/95 border-2 border-[#00FF66] text-white font-mono text-center shadow-[0_0_40px_rgba(0,255,102,0.4)] animate-bounce">
          <span className="text-[10px] sm:text-xs font-black text-[#00FF66] block uppercase tracking-widest">
            🏁 LAP COMPLETED!
          </span>
          <span className="text-xl sm:text-2xl font-black text-white">{lastLapBanner}s</span>
        </div>
      )}

      <div className="relative w-full flex items-center justify-center p-2 sm:p-5">
        <div className="relative w-[90%] max-w-[920px] aspect-[1024/682] flex items-center justify-center rounded-2xl overflow-hidden border border-white/10 shadow-inner bg-[#070709] touch-none">
          <canvas
            ref={canvasRef}
            width={1024}
            height={682}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="relative z-30 p-2.5 sm:p-4 bg-[#0F0F13]/95 border-t border-white/10 backdrop-blur-md">
        <div className="max-w-[920px] mx-auto flex items-center justify-between gap-2 sm:gap-4 font-mono">
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onTouchStart={(e) => { e.preventDefault(); setControl('left', true); }}
              onTouchEnd={(e) => { e.preventDefault(); setControl('left', false); }}
              onMouseDown={() => setControl('left', true)}
              onMouseUp={() => setControl('left', false)}
              className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border flex items-center gap-1.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md select-none touch-none ${
                activeControls.left
                  ? 'bg-[#00E5FF] text-[#0A0A0A] border-[#00E5FF] scale-95 shadow-[0_0_15px_#00E5FF]'
                  : 'bg-white/10 active:bg-[#00E5FF] text-white border-white/15'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden xs:inline">STEER</span>
              <span className="hidden md:inline text-[9px] opacity-60">[A/←]</span>
            </button>

            <button
              onTouchStart={(e) => { e.preventDefault(); setControl('right', true); }}
              onTouchEnd={(e) => { e.preventDefault(); setControl('right', false); }}
              onMouseDown={() => setControl('right', true)}
              onMouseUp={() => setControl('right', false)}
              className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border flex items-center gap-1.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md select-none touch-none ${
                activeControls.right
                  ? 'bg-[#00E5FF] text-[#0A0A0A] border-[#00E5FF] scale-95 shadow-[0_0_15px_#00E5FF]'
                  : 'bg-white/10 active:bg-[#00E5FF] text-white border-white/15'
              }`}
            >
              <span className="hidden xs:inline">STEER</span>
              <ArrowRight className="w-4 h-4" />
              <span className="hidden md:inline text-[9px] opacity-60">[D/→]</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[10px] text-[#888888] font-bold">
            <Gamepad2 className="w-3.5 h-3.5 text-[#F47C20]" />
            <span>USE ARROWS / WASD OR BUTTONS TO RACE</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onTouchStart={(e) => { e.preventDefault(); setControl('down', true); }}
              onTouchEnd={(e) => { e.preventDefault(); setControl('down', false); }}
              onMouseDown={() => setControl('down', true)}
              onMouseUp={() => setControl('down', false)}
              className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border flex items-center gap-1 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md select-none touch-none ${
                activeControls.down
                  ? 'bg-red-600 text-white border-red-500 scale-95 shadow-[0_0_15px_#FF1E27]'
                  : 'bg-red-950/40 active:bg-red-600 text-red-300 border-red-500/20'
              }`}
            >
              <ArrowDown className="w-4 h-4 text-red-400" />
              <span>BRAKE</span>
              <span className="hidden md:inline text-[9px] opacity-60">[S/↓]</span>
            </button>

            <button
              onTouchStart={(e) => { e.preventDefault(); setControl('up', true); }}
              onTouchEnd={(e) => { e.preventDefault(); setControl('up', false); }}
              onMouseDown={() => setControl('up', true)}
              onMouseUp={() => setControl('up', false)}
              className={`px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl border flex items-center gap-1 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md select-none touch-none ${
                activeControls.up
                  ? 'bg-emerald-400 text-[#0A0A0A] border-emerald-400 scale-95 shadow-[0_0_20px_#00FF66]'
                  : 'bg-[#F47C20] active:bg-emerald-400 text-white border-[#F47C20]'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>GAS ⚡</span>
              <span className="hidden md:inline text-[9px] opacity-75">[W/↑]</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default TrackGame;
