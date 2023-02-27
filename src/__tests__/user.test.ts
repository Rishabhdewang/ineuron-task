import request from "supertest";
import app from "../index";

describe(" User Routes ", () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/add-user')
      .send({
        username: "test",
        password: 'test',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success');
  });

  it('should fetch a single user', async () => {
    const user_id = 14;
    const res = await request(app).get(`/api/user/${user_id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success');
    expect(res.body).toHaveProperty('data');
  });

  it('should fetch all user', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('success');
  });

  it('should update a user details', async () => {
    const res = await request(app)
      .put('/api/update-user/1')
      .send({
        password: "password"
      });

    expect(res.statusCode).toEqual(200);
  });

  it('should delete a post', async () => {
    const res = await request(app).put('/api/delete-user/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success');
  });

  it('should respond with status code 400 if resource is not found', async () => {
    const user_id = 1;
    const res = await request(app).get(`/api/user/${user_id}`);
    expect(res.statusCode).toEqual(400);
  });
});