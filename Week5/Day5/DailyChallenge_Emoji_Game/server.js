import express from 'express'
import cors from 'cors';
const app =express();
const PORT=3000;
app.use(cors());
app.use(express.json());

import router from './router/routes.js'

app.use('/',router)


app.listen(PORT,(req,res)=>{
    console.log(`server is running ✅ on PORT :${PORT}`)
})