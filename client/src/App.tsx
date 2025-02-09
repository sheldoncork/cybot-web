import { useState, useEffect, useRef } from "react";
import "./App.css";
import Scanner from "./components/Scanner.tsx";

const HOST = "http://localhost:8000";

function App() {
  const [status, setStatus] = useState<string>("");
  const [cmd, setCmd] = useState<string>("");
  const reconnectTimeout = useRef<number>();

  // Event Listener for Sending Commands
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const command_box: HTMLInputElement = document.querySelector("#command_box")!;
    const command: string = command_box.value;

    try{
    await fetch("/api/command", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ command }),
    });
    setCmd(command);
  } catch (error){
    console.error("Failed to send command:", error);
    return false;
  }
    command_box.value = '';
  }
  
  // Check Connection
    const checkConnection = async () => {
      try {
        const response = await fetch("/api/connect");
        setStatus(await response.text());
        
        if (!response.ok || status === "Not connected") {
          throw new Error("Failed to connect");
        }

        if (reconnectTimeout.current) {
          clearTimeout(reconnectTimeout.current);
        }
      } catch (error) {
        console.error("Failed to connect:", error);

        // Retry connection after 5 seconds
        reconnectTimeout.current = setTimeout(() => {
          console.log("Attempting to reconnect...");
          checkConnection();
        }, 5000);
        return false;
      }
    };

  useEffect(checkConnection, []);
  return (
    status === "Connected" ? (
      <>
        <h1>Last Command:</h1>
        <p>{cmd}</p>
        <form onSubmit={onSubmit}>
          <label htmlFor="command_box">Type Commands Here:</label>
          <input type="text" id="command_box" />
        </form>
      <Scanner HOST={HOST}/>    
    </>
    ) : (<h1>Connecting to Cybot...</h1>)
  );
}

export default App;
