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
console.log(polyfillMapArr,polyfillFilterArr,polyfillReduceValue)



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
console.log(capitalName)

