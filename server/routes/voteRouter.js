const express = require('express');
const votesRouter = express.Router();
const Vote = require('../models/vote');

// votesRouter.put('/:voteId', (req, res, next) => {
//   Vote.findOneAndUpdate(
//     { _id: req.params.voteId },
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

module.exports = votesRouter;
