const express = require("express");

const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.json());

const productRoutes = require('./routes/product');
app.use('/products',productRoutes);

const PORT = 3000
app.listen(PORT,()=>{
     console.log(`Server is running on port ${PORT}`);
})