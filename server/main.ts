import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";
import CybotSocket from "./CybotSocket.ts";

export const app = new Application();
const router = new Router();
const cybotSocket = new CybotSocket();

// Connect socket to Cybot
await cybotSocket.connect();

router.post("/api/command", async (ctx) => {
  try {
    const body = await ctx.request.body.json();
    const command = body.command;
    const response = await cybotSocket.sendCommand(command);
    ctx.response.body = { response };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
});

router.get("/api/scan", async (ctx) => {
  try {
    const response = await Deno.readTextFile(
      "./server/mock-cybot-sensor-scan.txt",
    );
    ctx.response.status = 200;
    ctx.response.body = response;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      error: error instanceof Error ? error.message : "Unknown error!",
    };
  }
});

router.get("/api/connected", async (ctx) => {
  try {
    let isConnected = cybotSocket.status();
    if (!isConnected) {
      isConnected = await cybotSocket.connect();
    }
    ctx.response.body = isConnected.toString();
    console.log("Connected?:", isConnected);
  } catch (error) {
    console.error("Connection error:", error);
    ctx.response.status = 500;
    ctx.response.body = "false";
  }
});

app.use(router.routes());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/client/dist`,
  `${Deno.cwd()}/client/public`,
]));

if (import.meta.main) {
  console.log("Server listening on port http://localhost:8000");
  await app.listen({ port: 8000 });
}
