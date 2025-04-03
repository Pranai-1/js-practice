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