import redis from "redis";

const client = redis.createClient({
  url:
    "redis://:pf60ac1a3449bbde58ee3b7bd4cc9479eb43df04fffa63f72716182c14ce906d0@ec2-54-80-162-199.compute-1.amazonaws.com:23209",
});

export default client;
