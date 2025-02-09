import { useState} from "react";

interface ScannerProps {
  HOST: string;
}

const Scanner = (props: ScannerProps) => {
  const [text, setText] = useState<string>("");

  // Get Scan file
  const scan = async () => {
    try {
      const response = await fetch(`${props.HOST}/api/scan`);
      if (!response.ok) {
        throw new Error("Failed to scan");
      }
      const text = await response.text();
      setText(text);
    } catch (error) {
      console.error("Failed to scan:", error);
      return false;
    }
  };

  const parseScan = (text: string) => {
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
        
    }
  }

  return (
    <>
      <button onClick={scan}>Scan</button>
      <p>{text}</p>
    </>
  );
};

export default Scanner;
