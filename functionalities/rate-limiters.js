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
            isThrottled = true;
            console.log(this,args)
            setTimeout(() => {
                isThrottled = false;
                if (lastArgs) {
                    fnc.apply(lastThis, lastArgs); // Call with latest stored args
                    lastArgs = null;
                    lastThis = null;
                }
            }, delay);
        } else {
            lastArgs = args; // Store latest arguments for later execution
            lastThis = this; // Store `this` context
        }
    };
}

export {debouncing,throttling}