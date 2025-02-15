const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();
const authRoutes = require("./routes/user.js");
const errorHandler = require("./middleware/errorHandler.js")


const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get("/",(req,res)=>   res.send("this is backend of DevXauth"));
app.use("/api/users",authRoutes);


// Error handling
app.use(errorHandler);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
