import { debouncing, throttling } from "./functionalities/rate-limiters.js"

document.getElementById("debounce-number").addEventListener('keyup',(e)=>{
    e.target.value=Number(e.target.value)
})

function heavyFunction(){
    console.log("rate-limited")
}

let debouncedFunction=debouncing(heavyFunction)

document.getElementById("debounce-text").addEventListener('keyup',debouncedFunction)


let throttledFunction=throttling(heavyFunction)

document.getElementById("throttle-text").addEventListener('keyup',throttledFunction)