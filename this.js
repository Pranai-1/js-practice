let user={
    name:"pranai",
    age:24,
    address:{
        location:"hyderabad",
        name:"moosapet",
        getDetails(){
            console.log(this.name,this.age)//moosapet undefined
            //here this points to address object so age is undefined
        }
    }
}

user.address.getDetails()

class Basic{
    constructor(name){
        this.name=name
    }

    setName(str){
        this.name=str
    }
    getName(){
        return this.name
    }
}

const basicObj=new Basic("pranai")
console.log(basicObj)
//setName and getName are available to basicObj because they are defined on Basic.prototype.
// This is how inheritance works in JS classes — methods go on the prototype, not directly on the instance.

function makeUser(){
    return{
        name:"pranai",
        ref:this, //here this points to global object
        ref2(){
            return this //here this points to the returned object
        }
    }
}

const newUser=makeUser()
console.log(newUser,newUser.ref)//{ name: 'pranai', ref: undefined } undefined
console.log(newUser.ref2().name)//pranai 

setTimeout(user.address.getDetails, 1000);
// ❌ This will log `undefined` (or throw an error) because `this` inside `getDetails` is lost.
// `user.address.getDetails` is passed as a callback, and when `setTimeout` executes it,
// it does so without any context — so `this` becomes `undefined` (in strict mode) or `window` (in non-strict mode).


setTimeout(function(){
    user.address.getDetails()
},1000)//it will work fine

setTimeout(user.address.getDetails.bind(user.address), 1000);//this will also works fine

let length=5;

let testObject={
    length:10,
    method(fn){
        fn() //  this will be undefined because this is global object
    },
    method2(){
        arguments[0]() //  this will be 6,it will print the arguments array length,this inside callback will be arguments object
    }
}

function callback(){
    console.log(this.length,this)
    
}
// testObject.method(callback)
testObject.method2(callback,1,2,3,4,5)

// 6 [Arguments] {
//   '0': [Function: callback],
//   '1': 1,
//   '2': 2,
//   '3': 3,
//   '4': 4,
//   '5': 5
// }


//const sum=calc.add(10).substarct(5).multiply(2)....

let calc={
    total:0,
    add(a){
        this.total+=a;
        return this
    },
    substarct(a){
        this.total-=a;
        return this
    },
    multiply(a){
        this.total*=a;
        return this
    }
}
let sum=calc.add(10).substarct(5).multiply(2)
console.log(sum.total)//10

//IF we pass a function which is present inside of a object as a callback to another fuction then this now 
//doesn't point to the object,it will point to global object.Use bind to maintain the this reference to that
//object