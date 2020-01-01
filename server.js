const express = require('express');
const app = express();
var fs = require("fs");
app.use('/', express.static('./src/'));
const tableTabs = [{
  key: 'jilu',
  file: 'zhichu/'
}, {
  key: 'expenditure',
  file: 'expenditureData.json'
}, {
  key: 'assets',
  file: 'assetsData.json'
}, {
  key: 'liabilities',
  file: 'liabilitiesData.json'
}];

function readFileSync(type) {

}

app.get('/getData', (req, res) => {
  const fileName = req.query.fileName;
  let data = fs.readFileSync(`src/data/jilu/${fileName}`);
  let obj = JSON.parse(data.toString())
  res.header("Content-Type", "application/json;charset=utf-8");
  res.send(obj)
})
app.get('/getImg', (req, res) => {
  let data = fs.readFileSync(`src/ionic/all.json`);
  let obj = JSON.parse(data.toString())
  res.header("Content-Type", "application/json;charset=utf-8");
  res.send(obj)
})

app.listen(3000, () => {
  console.log('server running at http://127.0.0.1:3000/');
});