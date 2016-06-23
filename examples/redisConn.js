import {redisConn} from '../src';
const config = {
};
const redis = redisConn(config);
export default redis;
