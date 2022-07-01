const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
const path = require('path')
require('dotenv').config;


// middle ware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://like-google-task-app-server:wWtzb0SiK3ZiYCD6@cluster0.7n3mc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const tasksCollection = client.db('like-google-task-app-server').collection('tasks');
        const completedTaskCollection = client.db('like-google-task-app-server').collection('completedTask');


        app.post('/tasks' , async(req, res) =>{
            const newTask = req.body;
            const postTask = await tasksCollection.insertOne(newTask);
            res.send(postTask);
        })

        app.get('/tasks' , async(req, res) =>{
            const taskQuery = {};
            const cursor = tasksCollection.find(taskQuery);
            const allTasks = await cursor.toArray();
            res.send(allTasks);

        })
        app.delete('/tasks/:id', async(req, res) =>{
            const id= req.params.id;
            const query = {_id: ObjectId(id)}
            const deleteData = await tasksCollection.deleteOne(query);
            res.send(deleteData);
        })

        // app.put('/tasks/:id', async(req, res) =>{
        //     const id = req.params.id;
        //     console.log(id);

        //     const updateText= req.params.text;
        //     const filter = {text : updateText };
        //     const option = {upsert: true};
        //     const updateData = {$set: text};
        //     const result = await tasksCollection.updateOne(filter, updateData, option);
        //     res.send(result);
        // })

       

        app.post('/completedTask/:id' , async(req, res) =>{
            const completeTask = req.body;
            const postCompleteTask = await completedTaskCollection.insertOne(completeTask);
            res.send(postCompleteTask);
        })



        app.get('/completedTask', async(req, res) =>{
            const query = {};
            const completedTask = completedTaskCollection.find(query);
            const allCompletedTask = await completedTask.toArray()
            res.send(allCompletedTask);
        })


        app.delete('/completedTask/:id', async(req, res) =>{
            const id= req.params.id;
            const query = {_id: ObjectId(id)}
            const deleteData = await completedTaskCollection.deleteOne(query);
            res.send(deleteData);
        })
        


        
        /* 
         // user information put process (update data)
         app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = { $set: user };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
          })
        

        // Deleting manage product  data 
            app.delete('/tools/:id', async(req, res) =>{
                const id = req.params.id;
                const query = {_id: ObjectId(id)};
                const manageData = await toolsCollection.deleteOne(query);
                res.send(manageData);
            });
        
        
        app.get('/tools', async (req, res) => {
                    const query = {};
                    const cursor = toolsCollection.find(query)
                    const tools = await cursor.toArray();
                    res.send(tools);
        
                })
        
        //  single data finding for showing 
                app.get('/tool/:id', async(req, res) => {
                    const id = req.params.id;
                    const query = { _id: ObjectId(id) };
                    const product = await toolsCollection.findOne(query);
                    res.send(product);
                });
        
        // post method for orders details 
            app.post('/orderDetails', async(req, res) =>{
                const orders= req.body;
                console.log(orders);
                const newOrder = await ordersCollection.insertOne(orders);
                console.log(newOrder);
                res.send(newOrder);
            })
        
        
        //post method for adding new tool 
        app.post('/tools', async(req, res) =>{
            const newTool = req.body;
            const result = await toolsCollection.insertOne(newTool);
            res.send(result);
        })
        
        // deleting data for dashboard my orders page 
                app.delete('/orderDetails/:id', async(req, res) =>{
                    const id = req.params.id;
                    // console.log(id);
                    const query = {_id: ObjectId(id)};
                    // console.log(query);
                    const deleteProduct = await ordersCollection.deleteOne(query);
                    // console.log(deleteProduct);
                    res.send(deleteProduct);
                })
        
        
        
            
         // user information put process (update data)
         app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = { $set: user };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
          })
        
        */

    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('like-google-task-app-server-running')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

/* 
like-google-task-app-server
wWtzb0SiK3ZiYCD6
*/