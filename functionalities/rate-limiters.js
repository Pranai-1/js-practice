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
            }, delay);
        } else {
            // Only store the args if it's a new call during throttle time
            lastArgs = args;
            lastThis = this;
        }
    };
}

export {debouncing,throttling}