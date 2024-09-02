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

async function mentionExists(cid) {
  const result = await redisClient.exists(cid);
  return result === 1;
}

async function saveMention(cid) {
  await redisClient.set(cid, "reposted");
}

export { connectRedis, mentionExists, saveMention };
