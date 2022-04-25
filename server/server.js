const express = require('express');
const morgan = require('morgan');
const expressjwt = require('express-jwt');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 9000;
dotenv.config();

app.use(express.json());
app.use(morgan('dev'));

const allowedDomains = ['http://localhost:3000'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedDomains.indexOf(origin) === -1) {
        const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.get('/', (req, res) => {
  res.send('Test Deployment Success');
});

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/rvt',
  console.log('connected to db')
);

app.use(
  '/api',
  expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })
);
app.use('/auth', require('./routes/authRouter.js'));
app.use('/api/issues', require('./routes/issuesRouter.js'));
app.use('/api/issues/comments', require('./routes/commentRouter.js'));

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
