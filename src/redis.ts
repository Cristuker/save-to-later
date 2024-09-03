import { createClient } from "redis";
import "dotenv/config";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

const connectRedis = () => {

  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  (async () => {
    await redisClient.connect();
  })();
};

async function messageExists(uri: string) {
  const result = await redisClient.exists(uri);
  return result === 1;
}

async function saveMessage(uri: string) {
  await redisClient.set(uri, "sended");
}

async function saveSession(session: string) {
  await redisClient.set("session", session);
}

async function getSession() {
  const result = await redisClient.get("session");
  return result;
}


export { connectRedis, messageExists, saveMessage, saveSession, getSession };
