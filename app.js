const dotenv = require("dotenv")
dotenv.config()
const { MongoClient } = require("mongodb");

const express = require('express');
const app = express();
app.use(express.json());


//const mongoose = MongoClient
const mongoose = require('mongoose');
const { json } = require("express");

//Queries

const SearchByGender = "{\"appearance.gender\":\"Female\", \"name\": /keyword/i}"


//Conectenning to the database
const client = new MongoClient(process.env.DBLINK, { useNewUrlParser: true });
const collection = client.db("db_heros").collection("heros");


//GET Heros from DB
async function gatHeros(pageNum){
  const num = pageNum*2*10
  const heros = await collection.find().skip(num).limit(20).toArray()
  return heros
} 

//GET Heros from DB By Gender
async function gatHerosByGender(pageNum, gender){
  const num = pageNum*2*10
  const querie = {"appearance.gender": `${gender}`}
  const heros = await collection.find(querie).skip(num).limit(20).toArray()
  return heros
}

//GET Search for Heros By Name from DB
async function gatHerosByName(pageNum, keyword){
  const num = pageNum*2*10

  const query = { 'name': new RegExp(keyword, 'i') }

  const heros = await collection.find(query).skip(num).limit(20).toArray()
  return heros
}

//GET Search for Heros By Name And Gender from DB
async function gatHerosByNameAnGender(pageNum, keyword, gender){
  const num = pageNum*2*10

  const query = { 'appearance.gender' : gender , 'name': new RegExp(keyword, 'i') }

  const heros = await collection.find(query).skip(num).limit(20).toArray()
  return heros
} 

  //Connection port
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  //GET ALL HEROS
app.get('/heros',async (req,res) => {
  
  const pageNum = parseInt(req.header("pagination"))

  if(pageNum != null && Number.isInteger(pageNum)){
    try {
      const result = await gatHeros(pageNum)
      res.json(result)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  
  }else{
    res.sendStatus(403);
  }

});

//GET HEROS BY GENDER
app.get('/heros/gender' ,async (req,res) => {

  const pageNum = parseInt(req.header("pagination"))
  const genderType = req.header("gender")

  if(pageNum != null && Number.isInteger(pageNum) && genderType != null && genderType.length < 7){
    try {
      const result = await gatHerosByGender(pageNum, genderType)
      res.json(result)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  
  }else{
    res.sendStatus(403);
  }
})

// SEARCH HEROS NAME BY GENDER
app.get('/heros/search' ,async (req,res) => {

  const pageNum = parseInt(req.header("pagination"))
  const keyword = req.header("keyword")

  if(pageNum != null && Number.isInteger(pageNum) && keyword != null && keyword.length < 50){
    try {
      const result = await gatHerosByName(pageNum, keyword)
      res.json(result)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  
  }else{
    res.sendStatus(403);
  }
})

// SEARCHE HEROS BY GENDER
app.get('/heros/gender/search' ,async (req,res) => {

  const pageNum = parseInt(req.header("pagination"))
  const keyword = req.header("keyword")
  const gender = req.header("gender")

  if(pageNum != null && Number.isInteger(pageNum) && keyword != null && keyword.length < 50 && gender != null && gender.length < 7){
    try {
      const result = await gatHerosByNameAnGender(pageNum, keyword, gender)
      res.json(result)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  
  }else{
    res.sendStatus(403);
  }
})


module.exports = app;