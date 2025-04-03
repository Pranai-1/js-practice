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

let polyBindFnc=helper.polyFillForBind(obj,"hyderabad")
console.log(polyBindFnc("Moosapet"))