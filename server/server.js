const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressjwt = require('express-jwt');
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', require('./routes/authRouter.js'));
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));
app.use('/api/issues', require('./routes/issuesRouter.js'));
app.use('/api/issues/comments', require('./routes/commentRouter.js'));

mongoose.connect(
  'mongodb://localhost:27017/rvt',
  console.log('connected to db')
);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === 'UnauthorizedError') {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
