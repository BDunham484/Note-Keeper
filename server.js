// const fs = require('fs');
// const path = require('path');
//import exress.js
const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');
//require data
// const { savedNotes } = require("./db/notes.json");
const PORT = process.env.PORT || 3001;
//instantiate the server
const app = express();




//parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
//parse incoming json data
app.use(express.json());
app.use(express.static('public'));








app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//tell server to listen to port 3001 via the listen() method
app.listen(PORT, () => {
    console.log(`Note server now on port ${PORT}!`);
});