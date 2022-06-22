const mongoose =require("mongoose")
const Document =require("./Document")
mongoose.connect('mongodb+srv://Seifyakout:Seif2001@cluster0.jakji.mongodb.net/?retryWrites=true&w=majority')

const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    },
})

const defaultValue=""
// The server wil have the port 3001 that differs than the client 3000 
// so they will have different url  so we are going to use cors as it will give us the ability to request from a server that have
// differnt url // Then we are going to specifiy what method will the client be able to get through --> GET REQUEST AND POST REQUEST
// Origin is our Actual client


io.on("connection", socket=> {
    
        socket.on("get-document",async documentId=>{
            const document= await findOrCreateDocument(documentId)
            socket.join(documentId)
            socket.emit("load-document",document.data)
            socket.on("send-changes",delta=>{            
        socket.broadcast.to(documentId).emit("recieve-changes",delta)
        })
socket.on("save-document",async data =>{
await Document.findByIdAndUpdate(documentId,{data})
})
    })
})
// every time the client is going to connect it will run this i o connection sp we gave it a socket 
// this socket is how we communicate back to the client
async function findOrCreateDocument(id){
    if(id==null)return
    const document=await Document.findById(id)
    if(document)return document
    return await Document.create({_id: id, data: defaultValue})
}