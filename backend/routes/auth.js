const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser= require("../middleware/fetchuser");

//ROUTE 1::Create a User using :POST "/api/auth", no login

router.post(
  "/createuser",
  [
    body("name", "Enter a Valid name").isLength({ min: 3 }),
    body("email", "Enter a Valid email").isEmail(),
    body("password", "password must be 5 in lenghts or more").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    let success=false;


    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
      //will find the wemail from existing database and will wait to resolve this func because of async method
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        //return en error
        return res.status(400).json({success,
          error: `Sorry this email ${req.body.email} is already exist`,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashpswd = await bcrypt.hash(req.body.password, salt);

      //user to create and wait for successfull
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashpswd,
      });

      const JWT_SECERT_KEY = "This is seceret key$SECERET";

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECERT_KEY);
      success=true;
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }

  }
);

//ROUTE 2::Login USer with correct credentials :POST "/api/auth", no login
router.post(
  "/login",
  [
    body("email", "Please enter correct credentials").isEmail(),
    body("password", "Please enter correct credentials").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    let success=false;

    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
      //will find the wemail from existing database and will wait to resolve this func because of async method
      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        //return en error
        return res.status(400).json({
          error: `Sorry this email ${req.body.email} is not exist,  Please enter correct credentials`,
        });
      }
      const check_correct_password = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!check_correct_password) {
        //return en error
        return res.status(400).json({success,
          error: "Please enter correct credentials",
        });
      }

      const JWT_SECERT_KEY = "This is seceret key$SECERET";

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECERT_KEY);
      success=true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }

  }
);


//ROUTE 3::get User  :POST "/api/auth/getuser", no login
router.post(
    "/getuser",
    fetchuser,
    async (req, res) => {
      

  
      try {
        //will find the wemail from existing database and will wait to resolve this func because of async method
        let user = await User.findOne({ email: req.body.email });
  
        if (!user) {
          //return en error
          return res.status(400).json({
            error: `Sorry this email ${req.body.email} is not exist,  Please enter correct credentials`,
          });
        }
        const check_correct_password = await bcrypt.compare(
          req.body.password,
          user.password
        );
  
        if (!check_correct_password) {
          //return en error
          return res.status(400).json({
            error: "Please enter correct credentials",
          });
        }
  
        const JWT_SECERT_KEY = "This is seceret key$SECERET";
  
        const data = {
          user: {
            id: user.id,
          },
        };
  
        const authtoken = jwt.sign(data, JWT_SECERT_KEY);
  
        res.json({ authtoken });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
      }

    }
  );

module.exports = router;
