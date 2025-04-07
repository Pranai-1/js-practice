import { user } from "./data.js"
//1.sum(1)(2)(3).....(n)()
let result=0
function sum(x){
 
 return function(y){
    if(!y)
        return x
    else
    return sum(x+y)
 }
}

// let sumResult=sum(1)(2)(3)()
// console.log(sumResult)

//2.Flatten the object



function flat(user,path,helper){
    const keys=Object.keys(user)
    for(let key of keys){
        if(typeof user[key]=="object" && !Array.isArray(user[key]))
           flat(user[key],path+key+"_",helper)
        else
         helper[path+key]=user[key]
    }
    return helper
}
let faltObj=flat(user,"user_",{})
console.log(faltObj)
