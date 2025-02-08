import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const form: HTMLFormElement = document.querySelector("form")!;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    send_command((document.querySelector("#command_box") as HTMLInputElement).value)
  });
  
  const send_command = (command: string) => {
    
  }

  return (
    <>
      <div>
        <button>Scan</button>
        <form>
          <label htmlFor="command_box"></label>
          <input type="text" id="command_box" />
        </form>
      </div>
    </>
  );
}

export default App;
