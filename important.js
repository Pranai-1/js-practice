function shadow(){
   // console.log(a) //Reference error
    let a=10;
    let b=100;
    if(true){
        let a="inside true" //This is shadowing
        //var b="This gives syntax error" //This is illegal shadowing, shadowing a block scoped variable with a function scoped variable
        console.log(a,b)
    }
    console.log(a,b)
}
shadow()


// function restCheck(a,...num,x,y){ //It will give syntax error:- Rest parameter must be last formal parameter
//     console.log(x,y,num)
// }

// restCheck(1,2,3,4)

function restCheck(a,x,y,...num){ 
    console.log(arguments)//[Arguments] { '0': 1, '1': 2, '2': 3 }
    console.log(x,y,num)//empty array
}
//we cannot access arguments variable inside of a arrow function because arrow functions do not have their own arguments object.
//  Instead, they inherit arguments from their closest non-arrow function ancestor.
restCheck(1,2,3)


const arrfnc=()=>{
    console.log(arguments)//reference error of argumnets is not defined
}

arrfnc()




function wrapper(...args) {
    const arrow = () => {
      console.log(arguments,"closest non-arrow function arguments"); // Works fine
    };
    arrow();
  }
  wrapper(1, 2, 3);
  

  //This code will give error

  //Variables declared without keywords (x = 10) are not hoisted. Only formal declarations (var, let, const) are hoisted.
  //The assignment x = 10 creates a global variable (attached to window in browsers), but only when that line executes.
  function xyz(){
    //console.log(x) //if we remove this line the code works fine in non-strict modes
    x=10//This will not assigned with memory in the memory creation phase,this will gets executed in the code execution phase.so,
         //hoisting will not work here
     console.log(x)
}
console.log(x)//we can access this here as well,so the conclusion is that declaring a variable without any keyword is not 
//equal to declaring with var.var is function scope but here x is attach to global window interms of browser environment
xyz()

foo()
var foo=20
function foo(){
  console.log("calling foo")
  console.log(foo)
}
foo()

//explanation:-
//As we know that first memory creation happens and then code execution
//first foo will be hoisted and stored undefined as it is a primitive.
//Then,foo which is already present in the memory will be replaced by the function declaration
//so calling foo at the top will call the function and then during code execution pahse the foo variable which is pointed 
//to function declaration will again be replaced by value 20 and the function declaration will be ignored.If we try to call foo
//now it will be a integer not a function


function outer(){
  function inner(){
    console.log(x)
  }
  const x=5
  return inner
}

const fnc=outer()
fnc()//output is 5 because of clouser


console.time("6")//starting a timer 6
"use strict"
function f(){
    console.log(this)
}

let fUser={
    g:f.bind(null)
}
fUser.g() 

console.timeEnd("6")//ending the timer 6 and it will print the time taken by the timer from start to end