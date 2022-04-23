const express = require('express');
const commentRouter = express.Router();
const Comment = require('../models/comment');

// Get all comments to issue by issue ID
commentRouter.get('/:issueId/comments', (req, res, next) => {
  Comment.find({ issue: req.params.issueId }, (err, comments) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(comments);
  });
});

// Add comment to issue by issue ID
commentRouter.post('/:issueId/comments', (req, res, next) => {
  req.body.user = req.user._id;
  req.body.issue = req.params.issueId;
  const newComment = new Comment(req.body);
  newComment.save((err, savedComment) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedComment);
  });
});

// Edit comment by issue and only by the creator of the comment
commentRouter.put('/:issueId/comments/:commentId', (req, res, next) => {
  Comment.findOneAndUpdate(
    { _id: req.params.commentId, user: req.user._id },
    req.body,
    { new: true },
    (err, updatedComment) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(updatedComment);
    }
  );
});

// Delete comment by issue and only by the creator of the comment
commentRouter.delete('/:issueId/comments/:commentId', (req, res, next) => {
  Comment.findOneAndRemove(
    { _id: req.params.commentId, user: req.user._id },
    (err, deletedComment) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(`${deletedComment} deleted by ${req.user.username}`);
    }
  );
});

module.exports = commentRouter;
