const express = require('express');
const router = express.Router();

// Usuario Model
const User = require('../models/user');

//check  EmptyObject
function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

//Login simple authentication
router.post('/login', async(req,res) =>{
  const{ email,password} = req.body;
  const user = await User.findOne({"email":email,"password":password});
  if(!isEmptyObject(user)){
    res.json({status: 'User login',idUser:user._id});
  }else{
      res.json({status:'invalid credentials'});
  }
});


// GET all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//Get by Id usuario
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.json(user);
});

// Add a new user
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = new User({email, password});
  await user.save();
  res.json({status: 'User Saved'});
});


// Update user
router.put('/:id', async (req, res) => {
  const { email, password } = req.body;
  const id = req.params.id;
  const user = {email, password};
  await User.findByIdAndUpdate(id, user);
  res.json({status: 'User Updated'});
});

// delete user
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndRemove(id);
  res.json({status: 'user Deleted'});
});

module.exports = router;
