const express = require('express');
const commentRouter = express.Router();
const Comment = require('../models/comment');

// Add comment to issue by issue ID
commentRouter.post('/:issueId/comment', (req, res, next) => {
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

// // Add vote to issue by Issue ID and only by the creator of the vote
// issueRouter.post('/:issueId/vote', (req, res, next) => {
//   req.body.user = req.user._id;
//   req.body.issue = req.params.issueId;
//   const newVote = new Vote(req.body);
//   newVote.save((err, vote) => {
//     if (err) {
//       res.status(500);
//       return next(err);
//     }
//     Issue.findOneAndUpdate(
//       { _id: req.params.issueId },
//       { $push: { votes: vote } },
//       { new: true }
//     )
//       .populate('votes')
//       .exec((err, updatedIssue) => {
//         if (err) {
//           res.status(500);
//           return next(err);
//         }
//         return res.status(200).send(updatedIssue);
//       });
//   });
// });

// // find vote by vote id and update the populated object in the votes array only by the vote creator
// issueRouter.put('/:issueId/vote/:voteId', (req, res, next) => {
//   Vote.findOneAndUpdate(
//     { _id: req.params.voteId, user: req.user._id },
//     { $set: { vote: req.body.vote } },
//     { new: true },
//     (err, updatedVote) => {
//       if (err) {
//         res.status(500);
//         return next(err);
//       }
//       return res.status(200).send(updatedVote);
//     }
//   );
// });

// // get all the votes in votes array by issueId with the populated object
// issueRouter.get('/:issueId/votes', (req, res, next) => {
//   Issue.findOne({ _id: req.params.issueId })
//     .populate('votes')
//     .exec((err, issue) => {
//       if (err) {
//         res.status(500);
//         return next(err);
//       }
//       return res.status(200).send(issue.votes);
//     });
// });

module.exports = commentRouter;
