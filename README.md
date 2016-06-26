# nodejs的一些常用封装

比如会包括一些redis的链接和redis命令的封装。

## 安装

    npm i general-node-utils -S

### 可以这样使用：


    var {redisConn} = require('general-node-utils');
    var redis = redisConn();
    redis.keys("*").then(data=>{
      console.log(data);
      });


### es6中也可以这样使用：

    import {redisConn} from 'general-node-utils';
    require('general-js-utils');
    const redis = redisConn();
    redis.keys("*").then(data=>{
      - console.log(data);
    });


## 所有方法列表:

### redisConn(options)

用于redis连接,options参见[https://github.com/luin/ioredis/blob/master/API.md](https://github.com/luin/ioredis/blob/master/API.md)

    defaultOptions = {
      port:6379,
      host:'127.0.0.1',
      family:4,
      db=0
    }

### mhgetall(redisConn,keysArr,options)

批量获取hash类型内的全部数据。

输入一个redis连接，以及想获取的hash的keys的数组,options可选，有一个参数```showEmptyObject```,默认是```false```,表示如果没有这个key的话不作为数组的一个元素输出，如果为```true```则会在对应项里输出一个空对象

### mkeysexsist(redisConn,keysArr)

批量检测keys是否存在

输入同上，输出类似为```[true,false,true]```

### mzcount(redisConn,keysArr,options)

批量获取各个有序集合内的成员数量,options可选，有2个参数,min和max,分别表示有序集合内score的范围。
输出同上

### mgetjson(redisConn,keysArr)

批量获取各个类型为string,并且存放的是json字符串的集合，json字符串将会自动解析成对象。
