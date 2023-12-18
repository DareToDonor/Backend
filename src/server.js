const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const cors = require('cors');

const routes = require('./routes');

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.get('/', (req,res) => {
  res.send('Hello World');
})
app.use('/',routes);

app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`);
})