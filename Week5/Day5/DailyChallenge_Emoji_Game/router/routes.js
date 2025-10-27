import express from 'express';
import getRandomEmoji from '../seed/emojis.js';
import options from '../seed/options.js'

const router =express.Router()

router.get('/emojis',(req,res)=>{

    console.log("emojis display");
    res.send(getRandomEmoji())

})

router.get('/options',(req,res)=>{

    console.log("options display");
    res.send(options)

})

export default router