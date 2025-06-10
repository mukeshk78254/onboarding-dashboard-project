const redis= require('redis');
const redisclient=redis.createClient({
    username: 'default',

    password:  process.env.REDIS_PASS  ,
    socket: {
       host: 'redis-16820.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 16820
    }
});
// const connectredis=async()=>{
//     await redisclient.connect();
//     console.log("connected to redis");
// }
// connectredis();

module.exports=redisclient;

