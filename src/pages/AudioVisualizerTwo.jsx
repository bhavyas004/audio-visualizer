import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "../styles/AudioViualizer.css";

const VisualizerBars = ({ audioData }) => {
  const barsRef = useRef([]);

  useFrame(({ clock }) => {
    if (barsRef.current.length && audioData) {
      const { analyser, dataArray } = audioData;
      analyser.getByteFrequencyData(dataArray);

      barsRef.current.forEach((bar, i) => {
        const scale = (dataArray[i] / 255) * 5;
        bar.scale.y = scale > 0.1 ? scale : 0.1;

        bar.rotation.y = clock.getElapsedTime() * 0.5;

        bar.position.z = Math.sin(clock.getElapsedTime() + i * 0.1) * 2;
      });
    }
  });

  const numBars = 64;
  const radius = 6; 

  return (
    <>
      {new Array(numBars).fill().map((_, i) => {
        const angle = (i / numBars) * Math.PI * 2; 
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <mesh
            key={i}
            ref={(el) => (barsRef.current[i] = el)}
            position={[x, y, 0]}
          >
            <boxGeometry args={[0.3, 1, 0.2]} />
          
            <meshStandardMaterial
              color={`hsl(${(i / numBars) * 300}, 100%, 50%)`}
              emissive={`hsl(${(i / numBars) * 300}, 100%, 30%)`} 
              emissiveIntensity={1.5}
            />
          </mesh>
        );
      })}
    </>
  );
};

const AudioVisualizerTwo = () => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const audioRef = useRef(new Audio());

  // useEffect(() => {
  //   if (audio) {
  //     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  //     const analyser = audioContext.createAnalyser();
  //     analyser.fftSize = 128;
  //     const dataArray = new Uint8Array(analyser.frequencyBinCount);

  //     const source = audioContext.createMediaElementSource(audio);
  //     source.connect(analyser);
  //     analyser.connect(audioContext.destination);

  //     setAudioData({ analyser, dataArray, source });
  //   }
  // }, [audio]);
  useEffect(() => {
    if (audio) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 128;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
  
      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
  
      setAudioData({ analyser, dataArray, source });
    }
  }, [audio]);
  

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setAudio(new Audio(audioUrl));
    }
  };

  const togglePlayPause = () => {
    if (audio) {
      isPlaying ? audio.pause() : audio.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div style={{ textAlign: "center", color: "white", position: "relative", padding: "32px 16px 48px" }}>
      <input type="file" accept="audio/*" onChange={handleFileUpload} />
      <button onClick={togglePlayPause} disabled={!audio}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <Canvas camera={{ position: [0, 0, 12] }} style={{ height: "80vh", width: "80vw" }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        {audioData && <VisualizerBars audioData={audioData} />}
      </Canvas>
    </div>
  );
};

export default AudioVisualizerTwo;
