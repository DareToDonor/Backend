const express = require('express');
const app = express();
const routes = require('./routes');

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req,res) => {
  res.send('Hello World');
})
app.use('/',routes);
console.log('Bucket Name:', process.env.GCP_BUCKET_NAME);

app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`);
})