const express =require('express');
const morgan =require('morgan');

const app = new express();

app.use(morgan('dev'));
app.use(express.json());
require('dotenv').config();

const routerFile = require('./routes/basics');
app.use('/api',routerFile);

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`);
})

