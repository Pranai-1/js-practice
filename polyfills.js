let obj={
    name:"pranai",
    age:24,
    place:"Gudur"
}

function helper(place,area=""){
    console.log("Inside helper",this.name,this.age,this.place,place,area)
}

//helper.call(obj,"Hyderabad")



Function.prototype.polyfillForCall = function (context, ...args) {
    // If context is null or undefined, use global object (window in browsers)
    context = context || globalThis; 

    // Create a unique key in context to store the function reference
    const fnKey = Symbol();
    context[fnKey] = this;
console.log(context)
    // Call the function with the provided arguments
    const result = context[fnKey](...args);

    // Delete the function reference from the context to avoid side effects
    delete context[fnKey];

    return result;
};


//helper.polyfillForCall(obj,"Hyderabad")



Function.prototype.polyfillForApply = function (context,args) { //args is already an array for Apply no need to use rest
     context=context || globalThis

     const fnKey=Symbol()
     context[fnKey]=this

     const result=context[fnKey](...args)
     delete context[fnKey];

    return result;
};

//helper.polyfillForApply(obj,["Hyderabad"])


let bindFnc=helper.bind(obj,"hyderabad")
console.log(bindFnc("Moosapet"))


Function.prototype.polyFillForBind=function(context,...args){
    context=context || globalThis
    let fnc=this
    // return function(...arr){
    //  return fnc.call(context,...args,...arr)
    // }


    function boundFunction(...arr) {
        return fnc.call(context, ...args, ...arr);
    }

    boundFunction.prototype = Object.create(fnc.prototype); // Preserve prototype chain
    return boundFunction;
}

// let polyBindFnc=helper.polyFillForBind(obj,"hyderabad")
// console.log(polyBindFnc("Moosapet"))

// .map(), .filter() does not modify the original array (arr). It creates a new array and returns it.
const arr=[1,2,3,4,5]

let helperArr=arr.map((ele,i,arr)=>ele*2)
//console.log(helperArr)


let filteredArr=arr.filter((ele,i)=>ele%2==0 && ele)
//console.log(filteredArr)


let reducedRes=arr.reduce((acc,curr,index)=>curr+acc,0)
//console.log(reducedRes)


//.forEach() goes through each element and executes the function, but it does not return anything,it changes the array in place.
arr.forEach((ele,index)=>ele*2)//This also doesn't work
let forEachArr=arr.forEach((ele,index,array)=>arr[index]=ele*2)
//console.log(arr,forEachArr)//forEachArr will be undefined



const arr2 = [1, [2, [3, 4], 5]];
//console.log(arr2.flat(2));//flattening the array with depth 2

Array.prototype.polyFillForMap=function (cb){
    let arr = new Array(this.length); 
    for(let i=0;i<this.length;i++){
       arr[i]=cb(this[i],i,this) //just put a if condition to  this callback function and then push the elements into array 
    }
    return arr
}

let polyFillForMapArr=arr.polyFillForMap((ele,i)=>ele*2)
console.log(polyFillForMapArr)


Array.prototype.polyFillForReduce=function (cb,intialValue){
    if(this.length==0 && intialValue==undefined)
        throw new TypeError("Reduce of empty array with no initial value");
    
    let accumulator=intialValue==undefined ? this[0] : intialValue
    let startIndex=intialValue==undefined ? 1 : 0
    for(let i=startIndex;i<this.length;i++){
      
    accumulator=cb(accumulator,this[i],i)
   
    }
    return accumulator
}

let polyFillForReduceArr=arr.polyFillForReduce((acc,curr,index)=>curr+acc,0)
console.log(polyFillForReduceArr)


Array.prototype.polyFillForForEach=function (cb){
  
    for(let i=0;i<this.length;i++){
    this[i]=cb(this[i],i,this)
    }
}


arr.polyFillForForEach((ele,index,array)=>array[index]=ele*3)
console.log(arr)


//polyfill for memoize
// Simulating an expensive function with a smaller delay
function expensive(num1, num2) {
    const start = Date.now();
    while (Date.now() - start < 1000) {} // 1 second delay
    return num1 + num2;
}

// Memoization function
function memoize(fnc) {
    let cache = {};
    return function (...args) {
        let key = JSON.stringify(args);
        if (!(key in cache)) {
            cache[key] = fnc.apply(this, args); // Using apply() instead of call() for flexibility
        }
        return cache[key];
    };
}


// First call - Takes time
// let startTime = Date.now();
// let res1 = expensive(1, 2);
// console.log("Time taken:", Date.now() - startTime, "Result:", res1);
// startTime = Date.now();
// let res11 = expensive(1, 2);
// console.log("Time taken:", Date.now() - startTime, "Result:", res11);



// let memoizedExpensive = memoize(expensive);
// Second call - Uses cache, should be much faster
// startTime = Date.now();
// let res2 = memoizedExpensive(1, 2);
// console.log("Time taken:", Date.now() - startTime, "Result:", res2);
// startTime = Date.now();
// let res22 = memoizedExpensive(1, 2);
// console.log("Time taken:", Date.now() - startTime, "Result:", res22);


//polyfill for once

function once(fnc,context){
    let ran;
return function(){
    if(fnc){
       ran=fnc.apply(context || this,arguments)
       fnc=null
    }
    return ran
}
}

let called=0
function middle(){
    console.log("called",++called)
    return called
}
console.log(middle())
console.log(middle())
console.log(middle())

let onceFunction=once(middle)
//no matter how many times you call this,it will only gets called once
console.log(onceFunction(1,2))
console.log(onceFunction(1,2))
console.log(onceFunction(1,2))
console.log(onceFunction(1,2))