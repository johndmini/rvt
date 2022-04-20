const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Signup Route
authRouter.post('/signup', (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (user) {
      res.status(403);
      return next(new Error('Username already exists'));
    }
    const newUser = new User(req.body);
    newUser.save((err, savedUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      const token = jwt.sign(savedUser.toObject(), process.env.SECRET);
      return res.status(201).send({ token, user: savedUser });
    });
  });
});

//Login Route
authRouter.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!user) {
      res.status(403);
      return next(new Error('Username or Password incorrect'));
    }
    if(req.body.password !== user.password){
        res.status(403);
        return next(new Error('Incorrect password'));
    }
    const token = jwt.sign(user.toObject(), process.env.SECRET);
    return res.status(200).send({ token, user });
  });
});

module.exports = authRouter;
