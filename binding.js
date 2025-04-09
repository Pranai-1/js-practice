function f(){
    console.log(this)
}

let fUser={
    g:f.bind(null)
}
fUser.g() //we get null in node environment and window in browser environment

let bindChainObj={
    name:"reddy"
}
let bindChain=fUser.g.bind(bindChainObj)
bindChain() //this will also print null because bind chaining doesn't work,once a function got binded with a context then 
//it will not change if we chain that function with multiple bind calls

let user={
    name:"pranai",
    age:24,
    getAge(){
        console.log(this.age)
    },
    getAgeArrow:()=>{
        console.log(this.age)
    }
}

let xUser={
    name:"john",
    age:12
}

user.getAge() //24
// user.getAgeArrow() //undefined
user.getAge.call(xUser) //12
//user.getAgeArrow.call(xUser) //undefined because arrow function takes this reference from the parent function,there is
//no parent function.so this will be global object