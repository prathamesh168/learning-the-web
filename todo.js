const exp = require("express")
const bodyparser = require('body-parser')
const fs = require("fs")
const app = exp();
const cors = require("cors");
const port = 3000
app.use(cors());
app.use(bodyparser.json())
function curr_data() {
    try {
        const todo_data = fs.readFileSync("./todo_info.txt", 'utf-8');
        // console.log(todo_data)
        return JSON.parse(todo_data);
    } catch (err) {
        console.error("Error reading file:", err);
        return [];
    }
}
// function curr_data(){
//     const todo_data = fs.readFile("./todo_info.txt",'utf-8');
//     console.log(todo_data);
//     return JSON.parse(todo_data);
// }

function list_all_todos(req,res){
    res.send(curr_data());
}

function find_id(id){
    const data = curr_data();
    for(var i =0; i<data.length;i++){
        if (data[i].id == id){

            return i
        }
    }
    return -1
}
function add_a_todo(req,res){
    var data = curr_data();
    // console.log(data);
    const task = req.body;
    // console.log(task);
    data.push(task);
    // console.log(data);
    const updatedDataJSON = JSON.stringify(data, null, 2);

    fs.writeFile("./todo_info.txt", updatedDataJSON, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Error writing to file');
        } else {
            res.status(201).send(data); // Sending the updated data in the response
        }
    });
    

}

function update_a_todo(req,res){
    const data_of_id = find_id(req.params.id);

}
function removeAtIndex(data,data_id){
    var new_data = [];
    for(var i =0 ;i<data.length;i++){
        if (i !== data_id){
            new_data.push(data[i]);
        }

    }
    return new_data;
}
function delete_a_todo(req,res){
    const data_id = find_id(req.params.id);
    var data = curr_data();
    if (data_id == -1){
        res.status(404).send();
    }
    data = removeAtIndex(data,data_id);
    fs.writeFile("./todo_info.txt",JSON.stringify(data,null,2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Error writing to file');
        } else {
            res.status(201).send(data); // Sending the updated data in the response
        }
    });
    

}

app.get("/",(req,res)=>{
    // const filePath = path.join(__dirname, 'index.html');
    res.sendFile("/workspaces/learning-the-web/index.html");
});
app.get("/todo",list_all_todos);
app.post("/todo",add_a_todo);
// app.put("/todo/:id",update_a_todo);
app.delete("/todo/:id",delete_a_todo);



app.listen(port,()=>{
    console.log(`here is the ${port}`);
})
