import { config } from 'dotenv';

// @todo Il faut savoir comment tester une application sans base de donner (mock)

beforeAll(() => {
  config({ path: '.env' });
});

test("L'environnement est en place", () => {
  expect(process.env.MONGO_PORT_EXT).toBeDefined();

  // prettier-ignore
  const env = [
    'MONGO_APP_USER',
    'MONGO_APP_PWD',
    'MONGO_HOST',
    'MONGO_DB_NAME',
    'NODE_ENV',
  ];

  env.forEach((element) => {
    expect(process.env[element]).toBeDefined();
  });
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
