const express = require('express');
const issueRouter = express.Router();
const Issue = require('../models/issues');

// Get all issues route
issueRouter.get('/', (req, res, next) => {
  Issue.find((err, issues) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(issues);
  });
});

// Get issues by created by the user
issueRouter.get('/user/:userId', (req, res, next) => {
  Issue.find({ user: req.params.userId }, (err, issues) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(issues);
  });
});

// Add new Issue Route
issueRouter.post('/', (req, res, next) => {
  req.body.user = req.user._id;
  const newIssue = new Issue(req.body);
  newIssue.save((err, savedIssue) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedIssue);
  });
});

// Delete Issue by Issue ID Route and only by the creator of the issue
issueRouter.delete('/:issueId', (req, res, next) => {
  Issue.findOneAndRemove(
    { _id: req.params.issueId, user: req.user._id },
    (err, deletedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(`Issue ${deletedIssue.title} deleted by ${req.user.username}`);
    }
  );
});

// Update issue by Issue ID and only by the creator of the issue
issueRouter.put('/:issueId', (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId, user: req.user._id },
    req.body,
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(`Issue ${updatedIssue.title} updated by ${req.user.username}`);
    }
  );
});

// upvote Route for userID
issueRouter.put('/:issueId/upvote', (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueId },
      { $pull: { downVotes: req.user._id }, $addToSet: { upVotes: req.user._id } },
      { new: true },
      (err, updatedIssue) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        return res.status(200).send(updatedIssue);
      }
    );
  });


// downvote Route for userID
issueRouter.put('/:issueId/downvote', (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId },
    { $pull: { upVotes: req.user._id }, $addToSet: { downVotes: req.user._id } },
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(updatedIssue);
    }
  );
});

// delete vote Route for userID
issueRouter.put('/:issueId/novote', (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId },
    { $pull: { upVotes: req.user._id, downVotes: req.user._id } },
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(updatedIssue);
    }
  );
});

module.exports = issueRouter;
