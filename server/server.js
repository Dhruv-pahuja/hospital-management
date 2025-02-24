const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
const app = express();
connectDB();

app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/opdQueue', require('./routes/opdQueue'));
app.use('/api/beds', require('./routes/beds'));
app.use('/api/inventory', require('./routes/inventory'));
// app.use('/api/patients', require('./routes/patients'));

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});