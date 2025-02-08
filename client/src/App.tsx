import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let form: useRef = formRef.current;
    form = document.querySelector("form");
    
    form.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const command_box: HTMLInputElement = document.querySelector("#command_box")!;
      const command: string = command_box.value;
      socket.sendCommand(command).then((response) => {
        setText(response);
      });
      command_box.innerHTML = '';
    });
  }, [socket])  

  const scan = async () => {
    try{
      const response = await fetch("mock-cybot-sensor-scan.txt");
      if (!response.ok) {
        throw new Error("Failed to scan");
      }
      const text = await response.text();
      setText(text);
    } catch (error){
      console.error("Failed to scan:", error);
      return false;
    }
  };

  return (
    <>
      <div>
        <button onClick={scan}>Scan</button>
        <form>
          <label htmlFor="command_box"></label>
          <input type="text" id="command_box" />
        </form>
      </div>
      <h1>Output:</h1>
      <p>{text}</p>
    </>
  );
}

export default App;
