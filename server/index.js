const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const connectDB = require('./config/db');
const cors = require('cors');

const port = process.env.PORT || 8080;

const app = express();

//Connect to database
connectDB();

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
}))

app.listen(port, console.log(`Server running on port ${port}`));