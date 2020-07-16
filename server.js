const http =require("http");

const todos=[
    {id:1,text:"Todo 1"},
    {id:1,text:"Todo 1"},
    {id:1,text:"Todo 1"},
    {id:1,text:"Todo 1"}
];
const server =http.createServer((req,res)=>{
    const {method,url}=req;
    let body=[];
    
    req.on("data",chunck=>{
        body.push(chunck);
    }).on("end",()=>{
        body=Buffer.concat(body);


        let status=404;
        const response={
            success:false,
            data:null
        };
        if(method === 'GET' && url ==="/todos"){
            status=200;
            response.success=true;
            response.data=todos;
        }else if(method==="POST" && url==="/todos"){
            const {id,text} = JSON.parse(body);
            todos.push({id,text});

            status=201;
            response.success=true;
            response.data=todos;
        }
        
        res.writeHead(status,{
            "Content-Type":"application/json",
            "X-Powered-By":"Nodejs"
        })
        res.end(JSON.stringify(response));
    })
    
});
const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log("Server running on port",PORT);
    
})