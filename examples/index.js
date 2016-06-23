import redisConn from '../examples/redisConn';
redisConn.keys("*").then((d)=>{
  console.log(d);
})

//redis utils
import {mhgetall,mkeysexist,mzcount,mgetjson} from '../src/redisUtils';
mhgetall(redisConn,["session:token:81c3eb1332fc4f99914c488e54dca39d5d11193cc4bc0d6b8c4e1c3260564c2b",3,"session:token:ecf2df060bc9a1722bdf6169070c07b5b0ef70031efa6807e591da74cd3e921e"],{
  showEmptyObject:true
}).then((data)=>{
  console.log(data);
}).catch((e)=>{
  console.log(e);
})


mkeysexist(redisConn,["session:token:23d3212754df366571c757940380c948aceb10b1671e22235b5f6d6b62bac728",3]).then(data=>{
  console.log(data);
}).catch(e=>{
  console.log(e);
})

mzcount(redisConn,["session:token:23d3212754df366571c757940380c948aceb10b1671e22235b5f6d6b62bac728",3]).then(data=>{
  console.log(data);
}).catch(e=>{
  console.log(e);
})

mgetjson(redisConn,["3","2"]).then(data=>{
  console.log(data);
}).catch(e=>{
  console.log(e);
})
