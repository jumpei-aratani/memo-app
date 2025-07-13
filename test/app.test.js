// test/app.test.js
const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');

describe('メモ帳アプリの基本ルーティング', () => {

    it('GET / でメモ一覧を取得できる', async () => {
        const res = await request(app).get('/');
        expect(res.status).to.equal(200);
        expect(res.text).to.include('メモ一覧');
    });

    it('GET /new でメモ作成画面が表示される', async () => {
        const res = await request(app).get('/new');
        expect(res.status).to.equal(200);
        expect(res.text).to.include('新規メモ作成');
    });

    it('POST /create でメモが追加される', async () => {
        const res = await request(app)
            .post('/add')
            .type('form')
            .send({ title: 'テストタイトル', content: 'テスト内容' });

        expect(res.status).to.equal(302); // リダイレクト
        expect(res.headers.location).to.equal('/');
    });

});
