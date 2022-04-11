const express = require('express');
const app = express();
const port = 3000;

const lo = require('./song');

lo.choose('5e9f9f8f2c9d440000d8f8f8');

console.log(lo.task);


// console.log(task.data);

app.use(express.json());
  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })