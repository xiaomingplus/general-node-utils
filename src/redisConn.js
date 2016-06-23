import Redis from 'ioredis';
export function redisConn ({
  port=6379,
  host='127.0.0.1',
  family=4,
  db=0
}={}){
  const redis = new Redis({
    port:port,
    host:host,
    family:family,
    db:db,
    ...arguments
  });

  redis.on('connect',() => {
    console.log('redis has connected');
  });

  redis.on('error',(err) => {
    console.error(err);
    process.exit(1);
  });

  redis.on('close',() =>{
    console.warn('redis has closed.');
    process.exit(1);
  });

  redis.on('reconnecting',() =>{
    console.log('redis has reconnecting');
  });
  return redis;
};
