const express = require('express');
const session = require('express-session');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs'); // 設定模板引擎為 EJS
app.set('views', 'views'); // 指定視圖文件夾位置


async function sendTokenToAnotherBackend(token) {
    const url = 'https://os-django.leedong.work/medicament/api/verify';
    const data = {
        token: token
    };

    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error sending token', error);
        return false;
    }
}

app.use(session({
    secret: 'yn:ze5Db2I"p:IMX>a9v~SU0#[;-Ul/4',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.get('/receive-token', async (req, res) => {
    const token = req.query.token;
    if (token) {
        req.session.token = token;
        const response = await sendTokenToAnotherBackend(token);
        if (response && response.success) {
            req.session.user_name = response.user_name;
            res.render('index', { userName: response.user_name, token: token });
        } else {
            res.send({ message: "身分驗證失敗，請重新嘗試一次" });
        };
    } else {
        res.status(400).send({ message: "您無法訪問此頁面" });
    }
});

function verifyToken(req, res, next) {
    if (req.session.token && sendTokenToAnotherBackend(req.session.token)) {
        next();
    } else {
        return res.status(401).send({ message: "您無法訪問此頁面" });
    }
}

app.use(verifyToken);
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
