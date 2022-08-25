const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const peopleRouter = require('./routes/peopleRoute');
const loginRouter = require('./routes/loginRoute');
const productRouter = require('./routes/productRoute');
const categoryRouter = require('./routes/categoryRoute');


//Middleware 
app.use(cors());
app.use(express.json());
express.urlencoded({extended: true});

// Mongodb connect
// database connection
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connection Successfully'))
  .catch((err) => console.log(err));


app.use('/people', peopleRouter)
app.use('/login', loginRouter)
app.use('/product', productRouter)
app.use('/product', categoryRouter)


app.get('/', (req, res) => {
  res.send('Inventory management server!')
})

app.listen(port,() => console.log('Running on port', port))