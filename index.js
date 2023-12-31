



const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ajs1x35.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const classesCollection = client.db('photosenDb').collection('classes');
    const classItemCollection = client.db('photosenDb').collection('classItem');

    app.get('/classes', async (req, res) => {
      const result = await classesCollection.find().toArray();
      res.send(result);
    });

 

    app.post('/classItem', async (req, res) => {
      const item = req.body;
      console.log(item);
      const result = await classItemCollection.insertOne(item);
      res.send(result);
    });

    app.get('/classItem', async(req, res)=>{
        const email = req.query.email;
        console.log(email);
        if(!email){
            res.send([]);
        }
        const query = { email: email };
        const result = await classesCollection.find(query).toArray();
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('photo is clicking');
});

app.listen(port, () => {
  console.log(`photo is clicking: ${port}`);
});