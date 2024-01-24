const express = require('express');
var cors = require('cors')
const app = express();
// serve up production assets
app.use(cors());
app.use(express.static('client/build'));
// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route
const path = require('path');
app.get('*', (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// if not in production use the port 5000
const PORT = 9898;
console.log('server started on port:', PORT);
app.listen(PORT);