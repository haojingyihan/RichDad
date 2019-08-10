const express = require('express');
const app = express();
var fs = require("fs"); 
app.use('/', express.static('./src/'));
app.get('/getlist', (req, res) => {
    console.log(req.query)
    let data = fs.readFileSync('src/data/data.json');
    let obj = JSON.parse(data.toString())
    res.header("Content-Type", "application/json;charset=utf-8");
    res.send(obj)
})
app.listen(3000, () => {
    console.log('server running at http://127.0.0.1:3000/');
});

