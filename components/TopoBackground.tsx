import React, { useEffect, useRef } from 'react';
// @ts-ignore
import * as ChriscoursesPerlinNoise from "@chriscourses/perlin-noise";

export const TopoBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Config
    const thresholdIncrement = 5; 
    const thickLineThresholdMultiple = 5;
    const res = 10;
    const baseZSpeed = 0.000006;
    const targetFps = 24;
    const frameInterval = 1000 / targetFps;
    const lineColor = '#b45309';

    // State
    let animationFrameId: number;
    let inputValues: number[][] = [];
    let cols = 0;
    let rows = 0;
    let zOffset = 0;
    let noiseMin = 100;
    let noiseMax = 0;
    let currentThreshold = 0;
    let lastFrameTime = 0;
    let isPaused = false;

    const canvasSize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      cols = Math.floor(rect.width / res) + 1;
      rows = Math.floor(rect.height / res) + 1;
    };

    const generateNoise = () => {
      noiseMin = 100;
      noiseMax = 0;
      for (let y = 0; y < rows; y++) {
        if (!inputValues[y]) {
          inputValues[y] = new Array(cols + 1);
        }
        for (let x = 0; x <= cols; x++) {
            const noiseVal = ChriscoursesPerlinNoise.noise(x * 0.01, y * 0.01, zOffset) * 100;
            inputValues[y][x] = noiseVal;
            
            if (noiseVal < noiseMin) noiseMin = noiseVal;
            if (noiseVal > noiseMax) noiseMax = noiseVal;
        }
      }
    };

    const linInterpolate = (x0: number, x1: number, y0 = 0, y1 = 1) => {
        if (x0 === x1) return 0;
        return y0 + ((y1 - y0) * (currentThreshold - x0)) / (x1 - x0);
    };

    const line = (from: number[], to: number[]) => {
        ctx.moveTo(from[0], from[1]);
        ctx.lineTo(to[0], to[1]);
    };

    const placeLines = (gridValue: number, x: number, y: number) => {
        let nw = inputValues[y][x];
        let ne = inputValues[y][x + 1];
        let se = inputValues[y + 1][x + 1];
        let sw = inputValues[y + 1][x];
        let a, b, c, d;
      
        // Marching Squares Logic
        switch (gridValue) {
          case 1:
          case 14:
            c = [x * res + res * linInterpolate(sw, se), y * res + res];
            d = [x * res, y * res + res * linInterpolate(nw, sw)];
            line(d, c);
            break;
          case 2:
          case 13:
            b = [x * res + res, y * res + res * linInterpolate(ne, se)];
            c = [x * res + res * linInterpolate(sw, se), y * res + res];
            line(b, c);
            break;
          case 3:
          case 12:
            b = [x * res + res, y * res + res * linInterpolate(ne, se)];
            d = [x * res, y * res + res * linInterpolate(nw, sw)];
            line(d, b);
            break;
          case 11:
          case 4:
            a = [x * res + res * linInterpolate(nw, ne), y * res];
            b = [x * res + res, y * res + res * linInterpolate(ne, se)];
            line(a, b);
            break;
          case 5:
            a = [x * res + res * linInterpolate(nw, ne), y * res];
            b = [x * res + res, y * res + res * linInterpolate(ne, se)];
            c = [x * res + res * linInterpolate(sw, se), y * res + res];
            d = [x * res, y * res + res * linInterpolate(nw, sw)];
            line(d, a);
            line(c, b);
            break;
          case 6:
          case 9:
            a = [x * res + res * linInterpolate(nw, ne), y * res];
            c = [x * res + res * linInterpolate(sw, se), y * res + res];
            line(c, a);
            break;
          case 7:
          case 8:
            a = [x * res + res * linInterpolate(nw, ne), y * res];
            d = [x * res, y * res + res * linInterpolate(nw, sw)];
            line(d, a);
            break;
          case 10:
            a = [x * res + res * linInterpolate(nw, ne), y * res];
            b = [x * res + res, y * res + res * linInterpolate(ne, se)];
            c = [x * res + res * linInterpolate(sw, se), y * res + res];
            d = [x * res, y * res + res * linInterpolate(nw, sw)];
            line(a, b);
            line(c, d);
            break;
          default:
            break;
        }
    };

    const binaryToType = (nw: number, ne: number, se: number, sw: number) => {
        return (nw << 3) | (ne << 2) | (se << 1) | sw;
    };

    const renderAtThreshold = () => {
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = currentThreshold % (thresholdIncrement * thickLineThresholdMultiple) === 0 ? 2.5 : 1.2;

        for (let y = 0; y < rows - 1; y++) {
            const row = inputValues[y];
            const nextRow = inputValues[y + 1];
            for (let x = 0; x < cols - 1; x++) {
                const nwVal = row[x];
                const neVal = row[x + 1];
                const seVal = nextRow[x + 1];
                const swVal = nextRow[x];

                const nw = nwVal > currentThreshold;
                const ne = neVal > currentThreshold;
                const se = seVal > currentThreshold;
                const sw = swVal > currentThreshold;

                if (nw === ne && ne === se && se === sw) continue;

                const gridValue = binaryToType(nw ? 1 : 0, ne ? 1 : 0, se ? 1 : 0, sw ? 1 : 0);
                placeLines(gridValue, x, y);
            }
        }
        ctx.stroke();
    };

    const animate = (time: number) => {
        if (isPaused) {
            animationFrameId = requestAnimationFrame(animate);
            return;
        }

        if (!lastFrameTime) {
            lastFrameTime = time;
        }

        const delta = time - lastFrameTime;
        if (delta < frameInterval) {
            animationFrameId = requestAnimationFrame(animate);
            return;
        }

        lastFrameTime = time;

        const dpr = window.devicePixelRatio || 1;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;
        ctx.clearRect(0, 0, width, height);

        zOffset += baseZSpeed * delta;
        generateNoise();

        const roundedNoiseMin = Math.floor(noiseMin / thresholdIncrement) * thresholdIncrement;
        const roundedNoiseMax = Math.ceil(noiseMax / thresholdIncrement) * thresholdIncrement;

        for (let threshold = roundedNoiseMin; threshold < roundedNoiseMax; threshold += thresholdIncrement) {
            currentThreshold = threshold;
            renderAtThreshold();
        }

        animationFrameId = requestAnimationFrame(animate);
    };

    // Initialization
    canvasSize();
    animationFrameId = requestAnimationFrame(animate);

    // Event Listeners
    const handleResize = () => canvasSize();
    window.addEventListener('resize', handleResize);

    const handleVisibilityChange = () => {
        isPaused = document.hidden;
        if (!isPaused) {
            lastFrameTime = performance.now();
        }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Updated overlay to be transparent at top and fade to transparent (or slightly off-white if needed, but keeping it clear for texture) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbfaf8]/20 pointer-events-none" />
    </div>
  );
};
