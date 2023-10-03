const express = require('express')
const app = express()
const port = 5000;
const mongodb = require('./db');
const cors = require('cors');

app.use((req, res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With, Content-Type , Accept"
    );
    next();
})
app.use(cors());
app.use(express.json());
app.use('/api' , require('./routers/Createuser'));
app.use('/api' , require('./routers/Orders'));

app.listen(port, () => {
  console.log(`your app listening on port ${port}`)
})