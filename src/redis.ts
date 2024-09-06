import { createClient } from 'redis'

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

const connectRedis = () => {

  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  (async () => {
    await redisClient.connect();
  })();
};


async function saveSession(session: string) {
  await redisClient.set("session", session);
}

async function getSession() {
  const result = await redisClient.get("session");
  return result;
}

async function saveWrongMessage(uri: string) {
  await redisClient.set(uri, "error");
}

export { connectRedis, saveSession, getSession, saveWrongMessage };
