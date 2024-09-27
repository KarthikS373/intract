import redis from 'redis';

const client = redis.createClient({
  host: 'redis',
  port: 6379,
  password: '',
});

export default client;

