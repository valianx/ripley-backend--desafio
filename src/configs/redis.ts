import redis from 'redis';

const client = redis.createClient({
  host: 'ec2-54-80-162-199.compute-1.amazonaws.com',
  password: 'pf60ac1a3449bbde58ee3b7bd4cc9479eb43df04fffa63f72716182c14ce906d0',
  port: 6379,
});

export default client;
