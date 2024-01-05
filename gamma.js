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
// console.log(summation);

app.get('/getsum',(req,res)=>{
    const param = req.query.n1;
    var summation = sum(param);
    var hello  = ("Hello deviyo aur sajjano chaliye shuru karte hai");
    var gam = hello +" here is the ans of the question " + summation;
    res.send(gam);
})

app.listen(port,()=>{
    console.log(`here is the ${port}`);
})
