function timerReturn(){
  let x= setTimeout(()=>{
   // console.log("timer")
  },1000)
  return x
}

let timer=timerReturn()
// console.log(timer)

// | Environment | `setTimeout` returns | Example Output          |
// | ----------- | -------------------- | ----------------------- |
// | Browser     | Numeric timer ID     | `1`, `2`, `3`, etc.     |
// | Node.js     | `Timeout` object     | `{ _idleTimeout: ... }` |

const pr=new Promise((res)=>{
   //console.log("Before Timeout")
    setTimeout(()=>{
        res("Resolved")
    },1000)
   // console.log("after Timeout")
});
//console.log(pr);
//console.log("Hello")
//pr.then((res)=>{console.log("resolved")}).catch((error)=>{console.error(error)})
// output:-
// Before Timeout
// after Timeout
// Promise { <pending> }
// Hello
// resolved


//Polyfills:-

//promise is created with a new keyword and it takes a executor function as a parmeter,so we need a function constructor
//we need to have resolve and reject functions along with .then and .catch
//we will assign a callback function to onResolve parameter in .thn functiion  so that we can call that function in our resolve function

//once the promise gets resolved .then gets executed
//This code will only work for async promise

function PromisePolyfillAsync(executor){
    let onResolve,onReject
    this.resolve=function(value){
      onResolve(value)
       console.log(value)
  
    }
    this.reject=function(error){
      onResolve(error)
       console.log(error)
      
    }
    this.then=function(callback){
      onResolve=callback
      return this
    }
    this.catch=function(callback){
      onReject=callback
      return this
    }
    executor(this.resolve,this.reject)
}

//let exampleAsyncPromise=new PromisePolyfillAsync((res,rej)=>{setTimeout(()=>{rej("Rejected Async")},1000)})
//exampleAsyncPromise.then((value)=>console.log(value))


function PromisePolyfillSync(executor){
  let onResolve,onReject,isFulfilled=false,isRejected=false

  this.resolve=function(value){
        if(isRejected)
        return this
    if(typeof onResolve=="function")
      onResolve(value)
    else{
      onResolve=value
     
    }
    isFulfilled=true
    }


    this.reject=function(error){
          if(isFulfilled)
           return
       if(typeof onReject=="function")
      onReject(error)
    else{
      onReject=error
      
    }
isRejected=true
      
    }


    this.then=function(callback){
      if(isRejected)
        return this
      if(isFulfilled)
        callback(onResolve)
      else
      onResolve=callback
      return this
    }

    this.catch=function(callback){
      if(isFulfilled)
        return this
      if(isRejected)
        callback(onReject)
      else
      onReject=callback
      return this
    }
    executor(this.resolve,this.reject)
}

let exampleSyncPromise=new PromisePolyfillSync((res,rej)=>rej("Rejected Sync"))
//exampleSyncPromise.then((value)=>console.log(value)).catch((value)=>console.log(value))



let promise1=new Promise((res,rej)=>{rej("First promise")})
let promise2=new Promise((res,rej)=>{rej("second promise")})
let promise3=new Promise((res,rej)=>{rej("third promise")})


// let allPromises=Promise.all([promise1,promise2,promise3])

// allPromises.then((res)=>{console.log(res)}).catch((err)=>console.log(err, "Error"))

function AllPromise(arr){
    return new Promise((resolve,reject)=>{
          let promisesArr=[]
    if(!Array.isArray(arr)){
       resolve([])
        return
       }
       else{
            arr.forEach((promise,index)=>{
             promise.then((res)=>{
                promisesArr.push(res)
                if(arr.length-1==index)
                resolve(promisesArr)
             }).catch((error)=>{
                reject(error)
                return
             })       
             
            })
       }
       
    })

} 

// let allPromisesPolyfill=AllPromise([promise1,promise2,promise3])
// console.log(allPromisesPolyfill)
// allPromisesPolyfill.then((res)=>{console.log(res)}).catch((err)=>console.log(err))


// let allPromisesSettled=Promise.allSettled([promise1,promise2,promise3])
// allPromisesSettled.then((res)=>{console.log(res)}).catch((err)=>console.log(err, "Error"))


function AllSettledPolyfill(arr){
    return new Promise((resolve,reject)=>{
          let promisesArr=[]
    if(!Array.isArray(arr)){
       resolve([])
        return
       }
       else{
            arr.forEach((promise,index)=>{
             promise.then((res)=>{
                promisesArr.push({status:"fulfilled",value:res})
               
             }).catch((error)=>{
                promisesArr.push({status:"rejected",value:error})
                
             })       
             
            })
            
         resolve(promisesArr)
         return
       }
       
    })

}


// let allSettledPromisesPolyfill=AllSettledPolyfill([promise1,promise2,promise3])
// console.log(allSettledPromisesPolyfill)
// allSettledPromisesPolyfill.then((res)=>{console.log(res)}).catch((err)=>console.log(err))


function RacePolyfill(arr){
    return new Promise((resolve,reject)=>{
          let promisesArr=[]
    if(!Array.isArray(arr)){
       resolve([])
        return
       }
       else{
            arr.forEach((promise,index)=>{
             promise.then((res)=>{
               resolve(res)
               return
               
             }).catch((error)=>{
               reject(error)
               return
                
             })       
             
            })
       }
       
    })

}

// let racePromise=Promise.race([promise1,promise2,promise3])

// racePromise.then((res)=>{console.log(res)}).catch((err)=>console.log(err))
// let racePromisePolyfill=RacePolyfill([promise1,promise2,promise3])


// racePromisePolyfill.then((res)=>{console.log(res)}).catch((err)=>console.log(err))


function AnyPolyfill(arr){
    return new Promise((resolve,reject)=>{
          let promisesArr=[]
    if(!Array.isArray(arr)){
       resolve([])
        return
       }
       else{
            arr.forEach((promise,index)=>{
             promise.then((res)=>{
               resolve(res)
               return
               
             }).catch((error)=>{
               promisesArr.push({status:"rejected",value:error})
               if(index==arr.length-1){
                 reject(promisesArr)
                 return
               }
             })       
             
            })
           
       }
       
    })

}

let anyPromise=Promise.any([promise1,promise2,promise3])

anyPromise.then((res)=>{console.log(res)}).catch((err)=>console.log(err))
let anyPromisePolyfill=AnyPolyfill([promise1,promise2,promise3])


anyPromisePolyfill.then((res)=>{console.log(res)}).catch((err)=>console.log(err))
