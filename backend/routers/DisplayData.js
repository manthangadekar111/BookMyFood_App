const express  = require('express');
const router = express.Router();

router.post('/foodData' , (req , res)=>{
    try{
        res.send([global.foodData2, global.foodCategory])
    }catch(error){
        res.send("server error", error)
    }
})

module.exports = router;