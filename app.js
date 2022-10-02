//const dotenv = require("dotenv")
//dotenv.config()
//const { MongoClient } = require("mongodb");

const express = require('express');

const app = express();
app.use(express.json());



app.get('/heros',(req,res) => {
  res.send("It Working")
});

//app.use('/.netlify/functions/api/', router);
//module.exports.handler = serverless(app);

/* MongoClient.connect(process.env.DBLINK, async function (err, client) {
  //module.exports = client
  //const app = require("./app.js")
  //app.listen(process.env.PORT || 3000)
  const db = client.db("db_heros")
  const heros = await db.collection("heros").find().skip(20).limit(1).toArray()
  console.log(heros)
  client.close()
}) */

//For Test


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));