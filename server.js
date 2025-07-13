const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let memos = []; // メモ配列

// 一覧表示
app.get('/', (req, res) => {
    res.render('index', { memos });
});

// 新規作成ページ
app.get('/new', (req, res) => {
    res.render('new');
});

// 新規作成処理
app.post('/add', (req, res) => {
    const { title, content } = req.body;
    memos.push({ title, content });
    res.redirect('/');
});

// 編集ページ表示
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    res.render('edit', { id, memo: memos[id] });
});

// 編集処理
app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    memos[id] = {
        title: req.body.title,
        content: req.body.content,
    };
    res.redirect('/');
});

// 削除処理
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    memos.splice(id, 1);
    res.redirect('/');
});


if (require.main === module) {
    app.listen(port, () => {
        console.log(`サーバー起動中：http://localhost:${port}`);
    });
}

module.exports = app;
