/* import { useState, useEffect } from "react";
import axios from "axios";
import { Joystick } from "react-joystick-component";

const API_URL = "http://192.168.54.74"; // Update with your ESP8266 IP

export default function App() {
  const [connected, setConnected] = useState(false);
  const [gestureEnabled, setGestureEnabled] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      await axios.get(`${API_URL}/`);
      setConnected(true);
    } catch {
      setConnected(false);
    }
  };

  const sendCommand = async (cmd) => {
    try {
      await axios.get(`${API_URL}/?State=${cmd}`);
    } catch {
      alert("⚠️ Failed to send command! Check your connection.");
    }
  };

  const handleJoystickMove = (event) => {
    const direction = event.direction;
    if (!direction) return;

    const commands = { FORWARD: "F", BACKWARD: "B", LEFT: "L", RIGHT: "R" };
    sendCommand(commands[direction] || "S");
  };

  const toggleGesture = () => {
    setGestureEnabled(!gestureEnabled);
    alert(gestureEnabled ? "🔄 Gesture Control Deactivated" : "✅ Gesture Control Activated");
  };

  const handleGesture = (event) => {
    if (!gestureEnabled) return;

    let x = event.accelerationIncludingGravity.x;
    let y = event.accelerationIncludingGravity.y;

    if (x > 4) sendCommand("R");
    else if (x < -4) sendCommand("L");
    else if (y < -4) sendCommand("F");
    else if (y > 4) sendCommand("B");
  };

  useEffect(() => {
    if (gestureEnabled) window.addEventListener("devicemotion", handleGesture);
    else window.removeEventListener("devicemotion", handleGesture);

    return () => window.removeEventListener("devicemotion", handleGesture);
  }, [gestureEnabled]);

  const startVoiceControl = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("⚠️ Voice Recognition not supported. Use Google Chrome.");
      return;
    }

    let recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      let command = event.results[0][0].transcript.toUpperCase();
      let commands = { FORWARD: "F", BACKWARD: "B", LEFT: "L", RIGHT: "R", STOP: "S" };

      if (commands[command]) sendCommand(commands[command]);
      else alert("⚠️ Unknown command: " + command);
    };

    recognition.onerror = () => alert("⚠️ Voice Recognition Error!");
    recognition.start();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">🚀 ESP8266 Car Controller</h1>
      <p className={`text-lg ${connected ? "text-green-400" : "text-red-400"}`}>
        {connected ? "✅ Connected" : "❌ Not Connected"}
      </p>

      <div className="flex space-x-4 mt-6">
        <button onClick={() => sendCommand("F")} className="btn">⬆ Forward</button>
        <button onClick={() => sendCommand("B")} className="btn">⬇ Backward</button>
      </div>

      <div className="flex space-x-4 mt-4">
        <button onClick={() => sendCommand("L")} className="btn">⬅ Left</button>
        <button onClick={() => sendCommand("S")} className="btn bg-yellow-500">🛑 Stop</button>
        <button onClick={() => sendCommand("R")} className="btn">➡ Right</button>
      </div>

      <div className="mt-6 flex space-x-4">
        <button onClick={toggleGesture} className="btn bg-purple-600">
          {gestureEnabled ? "🔄 Stop Gesture" : "✅ Start Gesture"}
        </button>
        <button onClick={startVoiceControl} className="btn bg-blue-600">🎙 Voice Control</button>
      </div>

      <div className="mt-6">
        <Joystick size={100} move={handleJoystickMove} stop={() => sendCommand("S")} />
      </div>
    </div>
  );
} */

//espWorking code
/* import { useState, useEffect } from "react";
import { Joystick } from "react-joystick-component";
import "./App.css";

const ESP_IP = "http://192.168.54.74"; // Change this to your ESP8266 IP

function App() {
  const [message, setMessage] = useState("");
  const [gestureActive, setGestureActive] = useState(false);

const sendCommand = async (cmd) => {
  try {
    const response = await fetch(`${ESP_IP}/control?dir=${cmd}`, {
      method: "GET",
      mode: "no-cors", // Allow HTTP requests
    });

    setMessage(`✅ Command Sent: ${cmd}`);
    setTimeout(() => setMessage(""), 2000);
  } catch {
    setMessage("⚠️ Error: Check WiFi Connection!");
    setTimeout(() => setMessage(""), 2000);
  }
};

  const startVoiceControl = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("⚠️ Your browser does not support Speech Recognition. Use Google Chrome.");
      return;
    }

    let recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      const commands = { forward: "F", backward: "B", left: "L", right: "R", stop: "S" };

      if (commands[command]) {
        sendCommand(commands[command]);
      } else {
        alert(`⚠️ Unknown command: "${command}"`);
      }
    };

    recognition.onerror = () => alert("⚠️ Voice recognition error. Try again.");
    recognition.start();
  };

  useEffect(() => {
    const handleMotion = (event) => {
      if (!gestureActive) return;

      const x = event.accelerationIncludingGravity.x;
      if (x > 5) sendCommand("R");
      else if (x < -5) sendCommand("L");
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [gestureActive]);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 p-5 bg-black text-white space-bg">
      <h1 className="text-3xl font-bold text-cyan-400">ESP8266 Car Controller</h1>
      <p className="text-gray-400">Control your car using buttons, voice, joystick, or gestures!</p>

      {message && (
        <div className="bg-green-600 text-white px-4 py-2 rounded-md text-center">
          {message}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <Joystick
          size={100}
          baseColor="#222"
          stickColor="#08f"
          move={(event) => sendCommand(event.direction.toUpperCase()[0])}
          stop={() => sendCommand("S")}
        />
        <button className="btn btn-purple" onClick={startVoiceControl}>🎤 Start Voice Control</button>
        <button className={`btn ${gestureActive ? "bg-red-500" : "bg-blue-500"}`}
          onClick={() => setGestureActive(!gestureActive)}>
          {gestureActive ? "🛑 Stop Gesture Control" : "🚀 Start Gesture Control"}
        </button>
      </div>
    </div>
  );
}

export default App; */
 
//----------------------------------------

import { useState, useEffect } from "react";

const ESP_IP = "http://192.168.147.74"; // Change this to your ESP8266 IP

function App() {
  const [message, setMessage] = useState("");
  const [gestureActive, setGestureActive] = useState(false);
  let abortController = new AbortController(); // To stop previous requests

  const sendCommand = async (cmd) => {
    // Cancel any ongoing request before sending a new one
    abortController.abort();
    abortController = new AbortController();

    try {
      const response = await fetch(`${ESP_IP}/control?dir=${cmd}`, { 
        method: "GET", 
        signal: abortController.signal
      });

      if (!response.ok) throw new Error("Failed to send command");

      setMessage(`✅ Command Sent: ${cmd}`);
      setTimeout(() => setMessage(""), 2000);
    } catch {
      setMessage("⚠️ Error: Check WiFi Connection!");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const stopCar = () => {
    abortController.abort(); // Cancel any ongoing request
    sendCommand("S"); // Send stop command instantly
  };

  const startVoiceControl = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("⚠️ Your browser does not support Speech Recognition. Use Google Chrome.");
      return;
    }

    let recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      const commands = { forward: "L", backward: "R", left: "B", right: "F", stop: "S" };

      if (commands[command]) {
        sendCommand(commands[command]);
      } else {
        alert(`⚠️ Unknown command: "${command}"`);
      }
    };

    recognition.onerror = () => alert("⚠️ Voice recognition error. Try again.");
    recognition.start();
  };

  useEffect(() => {
    const handleMotion = (event) => {
      if (!gestureActive) return;

      const y = event.accelerationIncludingGravity.y;
      const x = event.accelerationIncludingGravity.x
      
    if (y > 5) sendCommand("L");
      else if (y < -5) sendCommand("R");
      else if (x > 5) sendCommand("B");
      else if (x < -5) sendCommand("F");
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [gestureActive]);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 p-5 bg-black text-white space-bg">
      <h1 className="text-3xl font-bold text-cyan-400">ESP8266 Car Controller</h1>
      <p className="text-gray-400">Control your car using buttons, voice, or gestures!</p>

      {message && (
        <div className="bg-green-600 text-white px-4 py-2 rounded-md text-center">
          {message}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 text-center">
        <button className="btn btn-blue col-span-3" onClick={() => sendCommand("L")}>
          Forward
        </button>
        <button className="btn btn-green" onClick={() => sendCommand("B")}>
          Left
        </button>
        <button className="btn btn-red" onClick={stopCar}>
          Stop
        </button>
        <button className="btn btn-green" onClick={() => sendCommand("F")}>
          Right
        </button>
        <button className="btn btn-blue col-span-3" onClick={() => sendCommand("R")}>
          Backward
        </button>
      </div>

      <button className="btn btn-purple mt-4" onClick={startVoiceControl}>
        🎤 Start Voice Control
      </button>

      <button
        className={`btn mt-4 ${gestureActive ? "bg-red-500" : "bg-blue-500"}`}
        onClick={() => setGestureActive(!gestureActive)}
      >
        {gestureActive ? "🛑 Stop Gesture Control" : "🚀 Start Gesture Control"}
      </button>

      <p className="text-gray-500 text-sm">Tilt your phone to steer the car (when enabled).</p>
    </div>
  );
}

export default App;