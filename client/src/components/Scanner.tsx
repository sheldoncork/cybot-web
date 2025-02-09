import { useState} from "react";
import "./Scanner.css";

interface ScannerProps {
  HOST: string;
}

const Scanner = (props: ScannerProps) => {
  const [table, setTable] = useState<string[][]>([]);

  // Get Scan file
  const scan = async () => {
    try {
      const response = await fetch(`${props.HOST}/api/scan`);
      if (!response.ok) {
        throw new Error("Failed to scan");
      }
      const text = await response.text();
      parseScan(text);
    } catch (error) {
      console.error("Failed to scan:", error);
      return false;
    }
  };

  const parseScan = (text: string) => {
    const lines: string[] = text.split("\n");
    const parsedData: string[][] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].replace(/\t/g, " ").trim();

        // Skip empty lines
        if (line === "") {
            continue;
        }

        if(line === "END"){
            break;
        }

        // Split line and filter out blank elements
        const data: string[] = line.split(" ").filter((element) => element !== "");
        parsedData.push(data);
    }
     setTable(parsedData);
     console.log(table);
  }

  return (
    <div className="container">
      <button onClick={scan}>Scan</button>

      <table>
        <tbody>
          {table.map((row: string[], rowIndex: number) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scanner;
