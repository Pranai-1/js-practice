// console.log(this,module.exports,exports)//To print this we need to come out of strict mode.remove type in script in html and type in .json file
// module.exports.name="Pranai"
// console.log(this,module.exports,exports)//all points to same memory location
const arr=[1,2,3,4,5]
let obj={
    name:"pranai",
    age:24,
    city:"Hyderabad"
}

const mapArr=arr.map((ele,index,arr)=>ele+=2)
const filterArr=arr.filter((ele,index,arr)=>arr[index]%2==0)
const reduceValue=arr.reduce((acc,curr,index,arr)=>acc+=curr,0)
//console.log(mapArr,filterArr,reduceValue,arr)
const forEachArr=arr.forEach((ele,index,arr)=>arr[index]*=2)//It doesn't return any array
//console.log(forEachArr,arr)
arr.map((ele,index,arr)=>ele+=3)//No change in original array
//console.log(arr)


//polyfills:-

Array.prototype.polyfillMap=function(callback){ //we cannot use arrow function here

   let arr=this,newArr=[]
   for(let i=0;i<arr.length;i++){
     newArr.push(callback(arr[i],i,arr))
   }
   return newArr
}


Array.prototype.polyfillFilter=function(callback){ //we cannot use arrow function here
  
   let arr=this,newArr=[]
   for(let i=0;i<arr.length;i++){
   let ans=callback(arr[i],i,arr)
   if(ans)
     newArr.push(arr[i])
   }
   return newArr
}


Array.prototype.polyfillReduce=function(callback,initialValue){ //using two different variables is important for intialValue and accumulator
 let accumulator=initialValue==undefined ? this[0] : initialValue
   let start=initialValue==undefined ? 1 :0
   for(let i=start;i<this.length;i++){
        accumulator=callback(accumulator,this[i],i,arr)
   }
   return accumulator
}
const polyfillMapArr=arr.polyfillMap((ele,index,arr)=>ele+=5)

const polyfillFilterArr=arr.polyfillFilter((ele,index,arr)=>ele%2==0)

const polyfillReduceValue=arr.polyfillReduce((acc,curr,index,arr)=>acc+=curr,0)
//console.log(polyfillMapArr,polyfillFilterArr,polyfillReduceValue)



const people = [
  { name: "Aarav", city: "Mumbai", age: 25 },
  { name: "Sita", city: "Hyderabad", age: 30 },
  { name: "Rahul", city: "Delhi", age: 22 },
  { name: "Meena", city: "Bangalore", age: 28 },
  { name: "John", city: "Chennai", age: 35 }
];


//extract name in capital

let capitalName=people.map((ele,index,arr)=>ele.name=ele.name.toLocaleUpperCase())//[ 'AARAV', 'SITA', 'RAHUL', 'MEENA', 'JOHN' ]
let capitalNameObj=people.map((ele,index,arr)=>{return {name:ele.name.toLocaleUpperCase()}})
//[ { name: 'AARAV' }, { name: 'SITA' }, { name: 'RAHUL' }, { name: 'MEENA' },{ name: 'JOHN' }]
//console.log(capitalName)

//calculator object

let calcObject={
  read(a,b){
     this.a=a,
     this.b=b
  },
  add(){
    if(this.a && this.b)
    return this.a+this.b
  return 0
  }
}
//console.log(calcObject.add())//0 initially
calcObject.read(3,6)
//console.log(calcObject.add())//9 now


//length of the function is equal to the number of parameters it receives as a parameter except rest operator
//arguments that we pass will not have any role in finding the length
function lengthChecker(a,b,...args){//args will not be considered while checking the length
//console.log(lengthChecker.length)//2
}

lengthChecker(1,2,3,4,5,6)

function CheckThis(name){
  this.name=name;
  this.getName=function(){
    return this.name
  }
  this.addName=()=>{
    return "Reddy"+this.name
  }

}

let checkObj=new CheckThis("pranai")
let checkObj2=new CheckThis("Duggina")
//console.log(checkObj.addName(),checkObj2.addName())//Reddypranai ReddyDuggina



class MyClass {
  // 1. Constructor method (special)
  constructor(value) {
    this.value = value;
  }

  // 2. Prototype method
  method1() { return this.value; }

  // 3. Static method
  static staticMethod() { return "Static"; }

  // 4. Private method (ES2022)
  #privateMethod() { return "Secret"; } //It defines a truly private method inside a class — one that cannot be accessed or even seen from outside the class.

  // 5. Getter/Setter
  get formatted() { return `Value: ${this.value}`; }
  set input(val) { 
    if(this.#privateMethod())
    this.value = val; 
  }

}

// Usage
const instance = new MyClass("Test");
//console.log(instance) //MyClass { value: 'Test' }
instance.method1(); // "Test"
MyClass.staticMethod(); // "Static"
//console.log(instance.formatted)// "Value: Test"
instance.input="change" //way to call a set function
//console.log(instance.formatted)//Value: change

class MyClassx {
  #count = 0; //This property will not be part of the created object 

  #increment() {
    this.#count++;
  }

  getCount() { //this will be part of the prototype of the created object,we can return private variables like this
    return this.#count;
  }
}
const myclassInstance=new MyClassx()
//console.log(myclassInstance,myclassInstance.getCount()) //MyClassx {} 0

let array=[1,2,3]
let array2=[4,5,6]

//array.push.call(array,array2)//This is eactly same as array.push(array2).This is pushing the directly as a value 
//console.log(array)//[ 1, 2, 3, [ 4, 5, 6 ] ]
//To avoid this we can use apply to spread the values

array.push.apply(array,array2)
//console.log(array)//[ 1, 2, 3, 4, 5, 6 ]
//Now guess what does this do

array.push.apply(array2,array2)
//This is nothing but calling the push function with the context of array2 and adding the values of array2.so array2 will get changed
//console.log(array,array2)//[ 1, 2, 3, 4, 5, 6 ] [ 4, 5, 6, 4, 5, 6 ]  // array remains the same

Math.max.apply(null,array2)

//polyfills for call apply and bind

function polyfillHelper(name,age,...args){
    console.log(this,this.name,name,age,args)//{ name: 'Pranai', age: 24 } Pranai Reddy 25 [ 'hyderabad' ]
}

let objPolyfill={
  name:"Pranai",
  age:24
}

// polyfillHelper.call(objPolyfill,"Reddy",25,"hyderabad")//All of these three gives the same output
// polyfillHelper.apply(objPolyfill,["Reddy",25,"hyderabad"])
// polyfillHelper.bind(objPolyfill,"Reddy",25,"hyderabad")()//{ name: 'Pranai', age: 24 } Pranai Reddy 25 [ 'hyderabad' ]


Function.prototype.callPolyfill=function(...args){
  const context=args[0]
  const fnc=this
  context.fnc=fnc
  return context.fnc(...args.slice(1))
}
polyfillHelper.callPolyfill(objPolyfill,"Reddy",25,"hyderabad")//{ name: 'Pranai', age: 24, fnc: [Function: polyfillHelper] } Pranai Reddy 25 [ 'hyderabad' ]

Function.prototype.applyPolyfill=function(...args){
  const context=args[0]
  const fnc=this
  context.fnc=fnc
  return context.fnc(...args[1])
}
polyfillHelper.applyPolyfill(objPolyfill,["Reddy",25,"hyderabad"])

Function.prototype.bindPolyfill=function(...args){
  const context=args[0]
  const fnc=this
  context.fnc=fnc
  return function(...secondArgs){
    let totalArgs=[...args.slice(1),...secondArgs]
     return context.fnc.call(context,...totalArgs)
  }
  
}
let returnedBind=polyfillHelper.bindPolyfill(objPolyfill,"Reddy",25,"hyderabad")
returnedBind()

//successfully written call,apply,bind polyfills without any revision,bind took some time to understand but not much