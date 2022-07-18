const express = require('express');

const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

//use routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//tell server to listen to port 3001 via the listen() method
app.listen(PORT, () => {
    console.log(`Note server now on port ${PORT}!`);
});