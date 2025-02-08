import { useState, useEffect, useRef } from "react";
import "./App.css";

const HOST = "http://localhost:8000";

function App() {
  const [text, setText] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    
    form.addEventListener("submit", async (e: Event) => {
      e.preventDefault();
      const command_box: HTMLInputElement = document.querySelector("#command_box")!;
      const command: string = command_box.value;

      let response: Response;
      try{
      response = await fetch("/api/command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command }),
      });
    } catch (error){
      console.error("Failed to send command:", error);
      return false;
    }

        setText(response);
      command_box.innerHTML = '';
    });
  }, []);  

  const scan = async () => {
    try{
      const response = await fetch(`${HOST}/api/scan`);
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
