const express = require('express');
const app = express();
const port = 3000;



// console.log(task.data);

app.use(express.json());
  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`username  ${process.env.USER_ID}  password ${process.env.USER_KEY}`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })