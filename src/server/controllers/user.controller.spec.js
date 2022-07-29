const { mockRequest, mockResponse } = require('../../../__mocks__/interceptors');
const { user } = require('./user.controller');

describe("Check method \'userController\' ", () => {
  test('should 201 and return correct value', async () => {
    let req = mockRequest({ login: "login", password: "password", age: 33 });
    const res = mockResponse();
    await user.create(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(201);
  });
  test('should 400', async () => {
    let req = mockRequest({ login: "login", age: 33 });
    const res = mockResponse();
    await user.create(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(400);
  });

  test('list, should 201 and return correct value', async () => {
    let req = mockRequest({},{}, {login: "login"});
    const res = mockResponse();
    await user.list(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(200);
  });
  test('should 400', async () => {
    let req = mockRequest({}, {}, {});
    const res = mockResponse();
    await user.list(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
  });
});