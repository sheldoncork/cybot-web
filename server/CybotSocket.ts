const HOST = "127.0.0.1";
const PORT = 65432;

class CybotSocket {
  private connection: Deno.Conn | null = null;

  // Make TCP connection
  async connect() {
    try {
      console.log("Attempting connection...");
      this.connection = await Deno.connect({
        port: PORT,
        hostname: HOST,
      });
      console.log("Successful connection.")
      return true;
    } catch (error) {
      console.error("Failed to connect:", error);
      return false;
    }
  }

  status(): boolean {
    return this.connection !== null;
  }

  async sendCommand(command: string): Promise<string> {
    if (!this.connection) {
      throw new Error("Not connected");
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const encodedCommand = encoder.encode(command);
    await this.connection.write(encodedCommand);

    const buffer = new Uint8Array(1024);
    const bytesRead = await this.connection.read(buffer);
    const response = decoder.decode(buffer.subarray(0, bytesRead!)); // ! to ensure not null
    return response;
  }

  close() {
    this.connection?.close(); // ? to check if null
  }
}

export default CybotSocket;
