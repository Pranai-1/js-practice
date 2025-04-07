
//object.create() creates a empty object and sets the prototype of the empty object to the value passed inside

let obj={name:"pranai"}
let obj2=Object.create(obj)
console.log(obj2.__proto__==obj)//true
obj.name="reddy"
console.log(obj2.name)//reddy because value changes
//obj is the prototype of obj2

obj2.name="xyz"//here we are adding a new field for the empty obj2 object,so this will not make anyn change in obj
//it will not check for the name field its prototype now because obj2 itself have a name property.So,this will take 
//the precedence now


let a={}
let b={name:"pranai"}
let c={age:24}
a[b]=123 //we can only store strings as key so,{name:"pranai"} and {age:24} will become '[object Object]' and it will assign 123
a[c]=456//this will replace 123 with 456
console.log(a) //{ '[object Object]': 456 }
console.log(a[b],a[c])//456 456

a[JSON.stringify(b)]="json string" //object to string
//JSON.parse(str)  //string to object
console.log(a)

const settings={
    name:"pranai",
    level:20,
    health:90
}

const data=JSON.stringify(settings,["level","health"])//it will only stringify these two fields and ignore name property
console.log(data,typeof data,JSON.parse(data))//{"level":20,"health":90} , string, { level: 20, health: 90 }

const shape={
    radius:10,
    diameter:function(){
        return Math.PI*this.radius*this.radius
    },
    perimeter:()=>2*Math.PI*this.radius //we will get type error in node environment but Nan in browser environment
    //even if we remove this here it will give error
}

//console.log(shape.diameter(),shape.perimeter())//314.1592653589793 NaN


let shape2={
    radius:10,
    diameter:function(){
        return Math.PI*this.radius*this.radius
    },
    helper(){
   let perimeter=()=>2*Math.PI*this.radius 
  return perimeter()
    },
    userDetails:{
        name:"john",
        age:"56"
    }
}
console.log(shape2.diameter(),shape2.helper())//314.1592653589793 62.83185307179586


//Destructuring
const radius=100
const{radius:myRadius}=shape2 //extracting radius from shape2 and assigning it to myRadius
const{userDetails:{name},}=shape2//accessing name field from userDetails object which is in shape2 object
console.log(name,radius,myRadius)

console.log({a:1}=={a:1})//false because both points to different place in the memory,JavaScript compares objects by reference, not value
//console.log({a:1}==={a:1})//false

const xarr = [shape2];
//shape2 = null;

console.log(xarr); 

// xarr still holds the object because it stores a reference to the original object.
// Setting shape2 = null does NOT remove or affect the object inside xarr.
// If we modify the object through xarr[0], those changes will reflect, 
// because both shape2 (before being null) and xarr[0] pointed to the same object.

shape2.radius=0
console.log(xarr) // here radius will become zero

xarr[0].radius=32
console.log(xarr,shape2)//radius will get updated in both because reference is same

let randomFunc=function(a){
    return 'helloo'+a
}
let arrow=()=>{return "hey"}
const helperArr=[1,2,3,4,5,shape2,randomFunc,arrow]
//here helperArr[0] will hold 1 and so on,arr[5],arr[6],arr[7] will hold the reference of shape2,randomFunc and arrow respectively
//assigning them to other values directly will not change the references,we can chnage the values by editing the fields like shape2.radius 
//incase of primitives it will hold the values but in case of object it will store the references

console.log(helperArr)
randomFunc=23
arrow=12
console.log(helperArr)


//references of objects

function changeAndReference(person){
    person.age=99//here we are changing the values through the reference,so it will change the original object age property

    person={//here we are directly re-assigning the value of an object,so it will not change the original object
        name:"alex",
        age:50
    }
    return person
}
const person1={
    name:"john",
    age:30
}

const person2=changeAndReference(person1)
console.log(person2,person1)//{ name: 'alex', age: 50 } { name: 'john', age: 99 }

//shallow and deep copy

let xyz  = Object.assign({}, shape2);                         // Shallow copy
// /- Copies only the **first level** of properties.
//If a property is an object (like `userDetails`), it **copies the reference**, not the actual nested object.

let xyz2 = Object.create(shape2);                            // Inherits from shape2 (not a copy)
//- Doesn’t copy anything.
//- It creates an **empty object** that uses `shape2` as its **prototype**.

let xyz3 = JSON.parse(JSON.stringify(shape2));               // Deep copy cannot hold functions,undefined,symbols,bigint
//- Converts the object to a string, then back to an object.
// - Creates an entirely **new object structure**, recursively.
// - Great for **simple objects**, but:
//   - Fails on `undefined`, `functions`, `symbols`, circular refs.
  
let xyz4 = { ...shape2 };                                   // Shallow copy (spread)
console.log(xyz,xyz2,xyz3,xyz4)