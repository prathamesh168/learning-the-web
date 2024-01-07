const exp = require("express")
const bodyparser = require('body-parser')
const fs = require("fs")
const app = exp();
const port = 3000
fs.readFile("./todo_info.txt","utf-8",(err,data)=>{
    todo_data  = JSON.parse(data);
});


function list_all_todos(req,res){
    res.json(todo_data);
}

function find_id(id){
    for(var i =0; i<todo_data.length;i++){
        if (todo_data[i].id == id){

            return todo_data[i]
        }
    }
    return []
}
function add_a_todo(req,res){
    const { task } = req.body;
    todo_data.push({task , completed:false});
    fs.writeFile("./todo_info.txt",JSON.stringify(todo_data,null,2));
    res.send(todo_data);

}

function update_a_todo(req,res){
    const data_of_id = find_id(req.body.id);

}

function delete_a_todo(req,res){
    const data_id = find_id(req.body.id);
    if (data_id == []){
        res.status(401).send("not found the data for given id");
    }
    todo_data = fs.
}


app.get("/todo/:id",list_all_todos);
app.post("/todo",add_a_todo);
app.put("/todo/:id",update_a_todo);
app.delete("/todo/:id",delete_a_todo);



app.listen(port,()=>{
    console.log(`here is the ${port}`);
})
