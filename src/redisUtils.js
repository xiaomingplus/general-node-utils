import { isObjectEmpty } from 'general-js-utils';

  export function mhgetall(redisConn,ids,{showEmptyObject=false}={}){
    return new Promise(async (s,f)=>{
     if(!Array.isArray(ids)){
       f(new Error("ids must be array"));
       return;
     }

     if(ids.length===0){
       s([]);
       return;
     }

    const pipeline = redisConn.pipeline();
    for(let i=0;i<ids.length;i++){
      pipeline.hgetall(ids[i]);
    }
    try {
      var list =await pipeline.exec();
    } catch(e){
      f(e);
    }
    const result = [];
    for(let i=0;i<list.length;i++){
      if(!list[i][0]){
        if(showEmptyObject || !isObjectEmpty(list[i][1])){
          result.push(list[i][1]);
        }
      }
    }
    s(result);
  })
};

export function mkeysexist (redisConn,keys){
  return new Promise(async (s,f)=>{
   if(!Array.isArray(keys)){
     f(new Error("ids must be array"));
     return;
   }

   if(keys.length===0){
     s([]);
     return;
   }

  const pipeline = redisConn.pipeline();
  for(let i=0;i<keys.length;i++){
    pipeline.exists(keys[i]);
  }
  try {
    var list =await pipeline.exec();
  } catch(e){
    f(e);
  }
  const result = [];
  for(let i=0;i<list.length;i++){
    if(!list[i][0]){
      result.push(Boolean(list[i][1]));
    }
  }
  s(result);
})
};
export function mzcount(redisConn,ids,{min=0,max=99999999999}={}){
  return new Promise(async (s,f)=>{
   if(!Array.isArray(ids)){
     f(new Error("ids must be array"));
     return;
   }

   if(ids.length===0){
     s([]);
     return;
   }
  const pipeline = redisConn.pipeline();
  for(let i=0;i<ids.length;i++){
    pipeline.zcount(ids[i],min,max);
  }
  try {
    var list =await pipeline.exec();
  } catch(e){
    f(e);
  }
  const result = [];
  for(let i=0;i<list.length;i++){
    if(!list[i][0]){
      result.push(list[i][1]);
    }else{
      result.push(null);
    }
  }
  s(result);
})
};
export function mgetjson(redisConn,ids){
  return new Promise(async (s,f)=>{
   if(!Array.isArray(ids)){
     f(new Error("ids must be array"));
     return;
   }
   if(ids.length===0){
     s([]);
     return;
   }


  try {
    var list =await redisConn.mget.apply(redisConn,ids);
  } catch(e){
    f(e);
  }
  const result = [];
  for(let i=0;i<list.length;i++){
    try{
      result.push(JSON.parse(list[i]));
    }catch(e){
      f(e);
      return;
    }
  }
  s(result);
})
}
