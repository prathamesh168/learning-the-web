const exp = require("express")
const app = exp();
const port = 3000


function sum(n1){
    var sum1 = 0;
    for(var i=0;i<n1;i++){
        sum1+=i+1;
    }
    return sum1;
}
var summation = sum(100);
// console.log(summation);

app.get('/',(req,res)=>{
    console.log(`here is the ans of the question ${summation}`);
})

app.listen(port,()=>{
    console.log(`here is the ${port}`);
})
