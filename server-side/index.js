require("dotenv").config();

//cors is the cross , this allows react application to access server
const cors = require("cors");

const express = require("express");
const connectDB = require("./connectDB");
const Notes = require("./models/Notes");

const app = express();
const PORT = process.env.PORT || 8000;

//MIDDLEWARE
connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//GET ALL NOTES
app.get("/api/notes", async (req, res) => {
  try {
    const data = await Notes.find({});

    if (!data) {
      throw new Error("An error occured");
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }
});



//GET Note by ID
app.get("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await Notes.findById(noteId);

    if (!data) {
      throw new Error("An error occured");
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }
});


//Create a Note
app.post("/api/notes", async (req,res) => {

  try {

    const {title, description } = req.body;
  
    const data = await Notes.create({ title, description });
  
    if(!data) {
      throw new Error("An error occured");
    }

    res.status(200).json(data); 

  } catch (error) {
    res.status(500).json(error); 
    console.log(error)   
  }

});



//Update Note
app.put("/api/notes/:id", async (req,res) => {

  try {

    const noteId = req.params.id;

    const {title, description } = req.body;
  
    const data = await Notes.findByIdAndUpdate(noteId, { title, description });
    
    if(!data) {
      throw new Error("An error occured");
    }

    res.status(200).json(data); 

  } catch (error) {
    res.status(500).json(error); 
    console.log(error)   
  }

});


//Delete Note
app.delete("/api/notes/:id", async (req,res) => {

  try {

    const noteId = req.params.id;
  
    const data = await Notes.findByIdAndDelete(noteId);
    
    if(!data) {
      throw new Error("An error occured");
    }

    res.status(200).json({message: "the note has been deleted"}); 

  } catch (error) {
    res.status(500).json(error); 
    console.log(error)   
  }

});




//home page

app.get("/", (req, res) => {
  res.json("Hello World");
});

//404
app.get("*", (req, res) => {
  res.sendStatus("404");
});

//PORT START
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
