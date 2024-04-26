const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// config
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xxkyfyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const itemCollection = client.db("PaintDrawDB").collection("items");
    // await client.connect();
    app.post("/addItems", async (req, res) => {
      const result = await itemCollection.insertOne(req.body);
      res.send(result);
    });

    app.get("/mylist/:email", async (req, res) => {
      console.log(req.params.email);
      const result = await itemCollection
        .find({ email: req.params.email })
        .toArray();
      res.send(result);
    });

    app.get("/itemscategory/:category", async (req, res) => {
      console.log(req.params.category);
      const result = await itemCollection
        .find({ subcategory_Name: req.params.category })
        .toArray();
      res.send(result);
    });

    app.get("/allitems", async (req, res) => {
      const result = await itemCollection.find().toArray();
      res.send(result);
    });

    app.get("/items/:id", async (req, res) => {
      const result = await itemCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    app.put("/updateitems/:id", async (req, res) => {
      console.log(req.params.id);
      const query = { _id: new ObjectId(req.params.id) };
      const data = {
        $set: {
          image: req.body.image,
          item_name: req.body.item_name,
          subcategory_Name: req.body.subcategory_Name,
          description: req.body.description,
          price: req.body.price,
          rating: req.body.rating,
          customization: req.body.customization,
          processing_time: req.body.processing_time,
          stockStatus: req.body.stockStatus,
        },
      };
      const result = await itemCollection.updateOne(query, data);
      res.send(result);
    });

    app.delete("/delete/:id", async (req, res) => {
      const result = await itemCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Canvas Isle is Running");
});

app.listen(port, () => {
  console.log(`server running on port :${port}`);
});

// sss
