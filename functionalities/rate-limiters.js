function debouncing(fnc){
    let timer;
    return function(...args){
      // console.log(args)
       const [context,...arr]=args
       clearTimeout(timer)
       timer=setTimeout(()=>{
        fnc.apply(context,arr)
       },2000)
       
    }
}

function throttling(fnc, delay = 2000) {
    let isThrottled = false;
    let lastArgs = null;
    let lastThis = null;

    return function (...args) {
        if (!isThrottled) {
            fnc.apply(this, args); // Execute immediately
            console.log("Immediate call")
            isThrottled = true;
            lastArgs = null;
            lastThis = null;
            setTimeout(() => {
                 isThrottled = false;
                if (lastArgs) {
                    fnc.apply(lastThis, lastArgs); // Execute last stored call
                    console.log("Timeout call")
                    lastArgs = null;
                    lastThis = null;
                }
                // setTimeout(() => (isThrottled = false), delay); //To avoid immediate call after a timeout call
                //but this will miss the laste event trigger if the time gap between the timeout call and last event is less than delay
            }, delay);
        } else {
            // Only store the args if it's a new call during throttle time
            lastArgs = args;
            lastThis = this;
        }
    };
}

//It will miss the last call if the time gap between the timeout call and last event is less than delay
const throttle = (fn, limit) => {
    let flag = true;
    return function(){
      let context = this;
      let args = arguments;
      if(flag){
        fn.apply(context, args);
        flag = false;
        setTimeout(() => {
          flag=true;
        }, limit);
      }
    }
  }


export {debouncing,throttling,throttle}