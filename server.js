const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000', // 허락하고자 하는 요청 주소
    credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
host: conf.host,
user: conf.user,
password: conf.password,
port: conf.port,
database: conf.database
});

connection.connect();

app.get('/api/customers', cors(corsOptions),(req, res) => {

connection.query(
'SELECT * FROM CUSTOMER',
(err, rows, fields) => {
res.send(rows);
})

});

app.listen(port, () => console.log(`Listening on port ${port}`));