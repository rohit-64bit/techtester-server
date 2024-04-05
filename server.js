const express = require('express');
const connectToDB = require('./config/db');
const cors = require('cors');
const app = express();

require('dotenv').config({
    path: './config/.env'
});

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

connectToDB();

app.get('/', (req, res) => {
    res.json({
        succes: true,
        message: 'Welcome to the API'
    });
})

app.use('/api/admin', require('./routes/adminRoute'));
app.use('/api/item', require('./routes/itemRoutes'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})