const express = require('express');
const issueRouter = express.Router();
const Issue = require('../models/issues');
const Vote = require('../models/vote');

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

//find issue by issue id, find user id in upvotes and downvotes array
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

module.exports = issueRouter;
