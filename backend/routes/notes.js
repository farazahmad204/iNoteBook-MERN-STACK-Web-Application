const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

// #ROUTE#1 GET REQUEST fetch notes for specific user /fetchallnotes : login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
});

// #ROUTE#2 POST REQUEST:: Add  a new  note by specific user /addnotes : login required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Validation Failed: Enter a Valid Title must be 3 in lenghts").isLength({ min: 3 }),
    body("description", "Validation Failed: Valid description must be 5 in lenghts").isLength({ min: 5 }),
    body("tag", "Validation Failed: tag must be 2 in lenghts or more").isLength({
      min: 2,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

   

    try {
      const { title, description, tag } = req.body;

      const note = new Note({ title, description, tag, user: req.user.id });
      const savedNotes = await note.save();


      res.json(savedNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);


// #ROUTE#3 PUT REQUEST:: update  exisiting Note by specific user /updatenote/:id : login required
router.put(
    "/updatenote/:id",
    fetchuser,
   
    async (req, res) => {
    
  
      try {
        const { title, description, tag } = req.body;

        //create a new Object
        const newNote={};


        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};


        // #find the note to be updated
        let note= await(Notes.findById(req.params.id));
        if(!note){return res.status(404).send("Not found")};

        if(note.user.toString() !== req.user.id){return res.status(501).send("Not Allowed")};

        note = await(Note.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true}))

        res.json(note);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
      }
    }
  );


  // #ROUTE#3 DELETE REQUEST:: delete  exisiting Note by a specific user /deletenote/:id : login required
router.delete(
    "/deletenote/:id",
    fetchuser,
   
    async (req, res) => {
    

      try {
        
        // #find the note to be deleted
        let note= await(Notes.findById(req.params.id));

        if(!note){return res.status(404).send("Not found")};

        if(note.user.toString() !== req.user.id){return res.status(501).send("Not Allowed")};

        note = await(Note.findByIdAndDelete(req.params.id));

        res.json({"success":"Successfull deleted Note!",note : note});

      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
      }
    }
  );

module.exports = router;
