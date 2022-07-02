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


        // post method for Added task 
        app.post('/tasks' , async(req, res) =>{
            const newTask = req.body;
            const postTask = await tasksCollection.insertOne(newTask);
            res.send(postTask);
        })


        // get method for showing task data in home page
        app.get('/tasks' , async(req, res) =>{
            const taskQuery = {};
            const cursor = tasksCollection.find(taskQuery);
            const allTasks = await cursor.toArray();
            res.send(allTasks);

        })

        // delete method for 
        app.delete('/tasks/:id', async(req, res) =>{
            const id= req.params.id;
            const query = {_id: ObjectId(id)}
            const deleteData = await tasksCollection.deleteOne(query);
            res.send(deleteData);
        })


        // put method for update task data 

        // app.put('/tasks/:text', async(req, res) =>{
        //     const text = req.params.text;

        //     const filter = {text : text };
        //     const option = {upsert: true};
        //     const updateData = {$set: text};
        //     const result = await tasksCollection.updateOne(filter, updateData,option );

        //     res.send(result);
        // })

       

        // post method for add completed data  in completed page 
        app.post('/completedTask/:id' , async(req, res) =>{
            const completeTask = req.body;
            const postCompleteTask = await completedTaskCollection.insertOne(completeTask);
            res.send(postCompleteTask);
        })



        // get method for showing completed task in completed page 
        app.get('/completedTask', async(req, res) =>{
            const query = {};
            const completedTask = completedTaskCollection.find(query);
            const allCompletedTask = await completedTask.toArray()
            res.send(allCompletedTask);
        })


        // delete method for completed task in home page
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