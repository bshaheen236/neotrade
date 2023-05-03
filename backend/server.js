const env = require('dotenv').config();
const db = require('./utils/dbconnection');
    const port = process.env.PORT;

const app = require('./app');

app.listen(port, () => console.log(`App is running on port ${port}`));