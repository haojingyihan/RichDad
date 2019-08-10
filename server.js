const express = require('express');
const app = express();
var fs = require("fs"); 
app.use('/', express.static('./src/'));
const tableTabs = [
    {
        key: 'income',
        file: 'incomeData.json'
    }, {
        key: 'expenditure',
        file: 'expenditureData.json'
    }, {
        key: 'assets',
        file: 'assetsData.json'
    }, {
        key: 'liabilities',
        file: 'liabilitiesData.json'
    }
];
function readFileSync(type){
    
}

app.get('/getlist', (req, res) => {
    let type = req.query.type;
    let fileName = "";
    tableTabs.forEach(item => {
        if(item.key === type){
            fileName = item.file;
        }
    })
    let data = fs.readFileSync(`src/data/${fileName}`);
    let obj = JSON.parse(data.toString())
    res.header("Content-Type", "application/json;charset=utf-8");
    res.send(obj)
})
app.listen(3000, () => {
    console.log('server running at http://127.0.0.1:3000/');
});

