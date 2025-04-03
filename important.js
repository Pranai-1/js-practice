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
    console.log(x,y,num)//emoty array
}
//we cannot access arguments inside of a arrow function
restCheck(1,2,3)


