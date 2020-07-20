const request = require('supertest');
const app = require('../app');

test('Should fetch bank when valid request', async () => {
  await request(app)
      .get('/api/banks?name=chase')
      .send()
      .expect(200)
});