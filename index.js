const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vcsod.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('volunteer').collection('service');

        app.get('/volunteers', async(req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
    }
    finally {
        // await client.close();
    }
    console.log("DB Connected");
}
run().catch(console.dir)


app.get(('/'), (req, res) => {
    res.send('Volunteer Network Server is Running')
})

// pass: jzigFIsArJL2ki8k
// user : volunteer

app.listen(port, () => {
    console.log('Listening to port:', port);
})