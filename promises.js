const pr=new Promise((res,rej)=>{
   // console.log("1") //This runs when the promise is created not when called
    res(2)//If there is no resolve here,the promise will not execute .then() callback as there is no resolve
   // console.log("3")
})
// console.log(pr,"pr")//It will print synchronously
// pr.then((res)=>{console.log(res)})//It will print asynchronously
// console.log("Helllo")

// 1
// 3
// Promise { 2 } pr
// Helllo
// 2

const pr2=Promise.resolve("Resolved directly")
//console.log(pr2)//It will print synchronously
//pr2.then((res)=>{console.log(res)})//It will print asynchronously

//throw will return a rejected promise but a string will return a resolved promise,even new Error("error") this also returns 
//a resolved promise



const firstPromise=new Promise((res)=>{
    res("First promise resolved")
})

const secondPromise=new Promise((res)=>{
    res(firstPromise)
})
// console.log(firstPromise,secondPromise) //Promise { 'First promise resolved' } Promise { <pending> }

// setTimeout(() => {
//     console.log("Later:", secondPromise);  //Later: Promise { 'First promise resolved' }
// }, 0);

// /secondPromise.then((res)=>console.log(res)) //First promise resolved


//Promise polyfills

//This code works well for asynchronous call that includes setTimeout while resolving the promise
//.then() will be called first incase of setTimeout resolve so,onResolve will be function and it will works fine
//In case of synchronous resolve,promise will get resolved first and after that .then() will be called.so,onResolve
//not a function at this point of time.

// function PolyfillForPromise(executor){
//    let onResolve,onReject

//    this.then=function(callback){
//     onResolve=callback
//     return this
//    }

//    this.catch=function(callback){
//     onReject=callback
//     return this
//    }

//    function resolve(val){
//     onResolve(val)
//    }

//    function reject(val){
//     onReject(val)
//    }

//    try{
//     executor(resolve,reject)
//    }catch(error){
//     reject(error)
//    }
// }

//This code works fine for both synchronous and asynchrounous calls

function PolyfillForPromise(executor){
    let onResolve,onReject,
    isFulfilled=false,
    isCalled=false,
    value,
    isRejected=false
 
    this.then=function(callback){
        onResolve=callback

        if(isFulfilled && !isCalled){
            isCalled=true
            onResolve(value)
        }
    
     return this
    }
 
    this.catch=function(callback){
     onReject=callback

     if(isRejected && !isCalled){
        isCalled=true
        onReject(value)
    }

     return this
    }
 
    function resolve(val){
        value=val
        isFulfilled=true
        if(typeof onResolve==="function"){
            isCalled=true
            onResolve(val)
        }

    }
 
    function reject(val){
        value=val
        isRejected=true
        if(typeof onReject==="function"){
            isCalled=true
            onReject(val)
        }
    }
 
    try{
     executor(resolve,reject)
    }catch(error){
     reject(error)
    }
 }

let polyfillPromise=new PolyfillForPromise((res,rej)=>{
    setTimeout(()=>{
        res(20)
    },100)
  res(20)
})
console.log(polyfillPromise)

 polyfillPromise.then((res)=>console.log(res))


let promise1=new Promise((res,rej)=>{res("First promise")})
let promise2=new Promise((res,rej)=>{res("second promise")})
let promise3=new Promise((res,rej)=>{rej("third promise")})


let allPromises=Promise.all([promise1,promise2,promise3])

allPromises.then((res)=>{console.log(res)}).catch((err)=>console.log(err))


Promise.allPolyfill=(promises)=>{
    return new Promise((resolve,reject)=>{
          let results=[]
           if(!promises || !promises.length || promises.length==0){
            res(results)
            return
           }
      promises.forEach((promise,index)=>{
        promise.then((res)=>{
            results[index]=res
            if(index==promises.length-1)
                resolve(results)
        }).catch((err)=>{
            reject(err)
        })
      }) 
           
    })
}


let allPromisesPolyfill=Promise.allPolyfill([promise1,promise2,promise3])
console.log(allPromisesPolyfill)
allPromisesPolyfill.then((res)=>{console.log(res)}).catch((err)=>console.log(err))


Promise.allSettledPolyfill=(promises)=>{
    return new Promise((resolve,reject)=>{
          let results=[]
           if(!promises || !promises.length || promises.length==0){
            res(results)
            return
           }
      promises.forEach((promise,index)=>{
        promise.then((res)=>{
            results[index]=res
            if(index==promises.length-1)
                resolve(results)
        }).catch((err)=>{
            results[index]=err
            if(index==promises.length-1)
                resolve(results)
        })
      }) 
           
    })
}

let allPromisesSettledPolyfill=Promise.allSettledPolyfill([promise1,promise2,promise3])
console.log(allPromisesSettledPolyfill)
allPromisesSettledPolyfill.then((res)=>{console.log(res,"allsettledpolyfil")}).catch((err)=>console.log(err))
