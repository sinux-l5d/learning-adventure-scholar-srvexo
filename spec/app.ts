import request from 'supertest';
import app from '@app';

// @todo Il faut savoir comment tester une application sans base de donner (mock)

test("L'environnement est en place", () => {
  return;
});

// describe('Path /', () => {
//   // it is an alias for test
//   it('is JSON-encoded', async () => {
//     const res = await request(app).get('/');

//     expect(res.headers).toHaveProperty('content-type');
//     expect(res.headers['content-type']).toContain('application/json');
//   });

//   it('contains hello world', async () => {
//     const res = await request(app).get('/');
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toMatchObject({ message: 'Hello World !' });
//   });
// });
