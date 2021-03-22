import redis from 'redis';

let client = redis.createClient({
  host: "redis-server",
  port: 6379,
});
import util from 'util';

export default client;
