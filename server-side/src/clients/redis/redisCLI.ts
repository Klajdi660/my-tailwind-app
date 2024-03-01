import { Redis } from "ioredis";
import config from "config";
import { RedisParams } from "../../types";

const redisPath = config.get<RedisParams>("redis_feed");

export const redisCLI = new Redis(redisPath);

// import config from "config";
// import { createClient } from "redis";
// import { log } from "../../utils";
// import { RedisParams } from "../../types";

// const { host, port } = config.get<RedisParams>("redis_feed");

// const redisUrl = `redis://${host}:${port}`;

// export const redisCLI = createClient({
//     url: redisUrl
// });

// const redisConnection = async () => {
//     try {
//         await redisCLI.connect();
//         log.info("Redi client connected...");
//     } catch{(e: any) => {
//         log.error(e.message);
//         setTimeout(redisConnection, 5000);
//     }};
// };

// redisConnection();
