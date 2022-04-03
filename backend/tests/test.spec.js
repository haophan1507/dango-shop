const app = require('../app');
const request = require('supertest')(app);
let auth = {};
beforeAll(loginUser(auth));

describe('test', () => {
  //get no auth
  test("get all categories success", async () => {
    const response = await request.get("/api/v1/categories");
    expect(response.statusCode).toBe(200);
  });

  //get with auth
  // test("get all user success", async () => {
  //   const response = await request.get("/api/v1/users").set('Authorization', 'bearer ' + auth.token);
  //   expect(response.statusCode).toBe(200);
  // });

  //create with json
  // test("create category success", async () => {
  //   const mockCategory = {
  //     "name": "hello",
  //     "icon": "icon-hello",
  //     "color": "#050505"
  //   }

  //   const response = await request
  //     .post("/api/v1/categories")
  //     .set('Authorization', 'bearer ' + auth.token)
  //     .send(mockCategory);
  //   expect(response.statusCode).toBe(200);
  // });

  //create with form-data
  // test("create post success", async () => {
  //   const response = await request
  //     .post("/api/v1/posts")
  //     .set('Authorization', 'bearer ' + auth.token)
  //     .field("title", "title 1")
  //     .field("description", "description")
  //     .field("user", "61ed73ad683335f9d0bafb90")
  //     .attach("image", "tests/cat.jpg");
  //   expect(response.statusCode).toBe(200);
  // });
})

function loginUser(auth) {
  return function (done) {
    request
      .post('/api/v1/users/login')
      .send({
        email: 'phanvanhao1507@gmail.com',
        password: '123456'
      })
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      auth.token = res.body.token;
      return done();
    }
  };
}