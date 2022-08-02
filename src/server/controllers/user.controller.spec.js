const { mockRequest, mockResponse } = require('../../../__mocks__/interceptors');
const { user } = require('./user.controller');
const users = [{id: '10cd9047-13db-457e-bf32-884de56cd5c8', login: 'login', password: 'password', age: 33}]

jest.mock('@/models/user.model', () =>({
  create: jest.fn().mockResolvedValue(users[0]),
  update: jest.fn().mockResolvedValue(users[0]),

}))

describe("Check method \'userController\' ", () => {
  test('create, should 201 and return correct value', async () => {
    let req = mockRequest({ login: "login", password: "password", age: 33 });
    const res = mockResponse();
    await user.create(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(201);
  });
  test('create, should 400', async () => {
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
  test('list, should 400', async () => {
    let req = mockRequest({}, {}, {});
    const res = mockResponse();
    await user.list(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
    
  });
  test('retreive, should 201 and return correct value', async () => {
    let req = mockRequest({},
      { user_id: "10cd9047-13db-457e-bf32-884de56cd5c8" },
      {});
    const res = mockResponse();
    await user.retrieve(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(200);
  });
  test('retreive, should 400', async () => {
    let req = mockRequest({}, { user_id: '10cd9047-13db-457e-bf32-884de56cd5c9' }, {});
    const res = mockResponse();
    await user.retrieve(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
  });
  test('update, should 201 and return correct value', async () => {
    let req = mockRequest({},
      { user_id: "10cd9047-13db-457e-bf32-884de56cd5c8" },
      {});
    const res = mockResponse();
    await user.retrieve(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toBeCalledWith({
      "age": 33,
      "id": "10cd9047-13db-457e-bf32-884de56cd5c8",
      "isDeleted": false,        
      "login": "login",
      "password": "password",    
      })
      req = mockRequest(
        {age: 43, login: "login2"},
        { user_id: "10cd9047-13db-457e-bf32-884de56cd5c8" },
        {});
      await user.update(req, res)
      expect(res.json).toBeCalledWith({
        "age": 43,
        "id": "10cd9047-13db-457e-bf32-884de56cd5c8",
        "isDeleted": false,        
        "login": "login2",
        "password": "password",    
        })
      expect(res.status).toHaveBeenCalledTimes(2);
      expect(res.status).toHaveBeenLastCalledWith(200);
      req = mockRequest({age: 33, login: "login"},
      { user_id: "10cd9047-13db-457e-bf32-884de56cd5c8" },
      {});
      await user.update(req, res)
      req = mockRequest({},
        { user_id: "10cd9047-13db-457e-bf32-884de56cd5c8" },
        {});
      await user.retrieve(req, res)
      expect(res.json).toHaveBeenCalledTimes(4)
      expect(res.json).toHaveBeenLastCalledWith({
        "age": 33,
        "id": "10cd9047-13db-457e-bf32-884de56cd5c8",
        "isDeleted": false,        
        "login": "login",
        "password": "password",    
        })
  });
  test('update user, should 400', async () => {
    let req = mockRequest({}, { user_id: '10cd9047-13db-457e-bf32-884de56cd5c9' }, {});
    const res = mockResponse();
    await user.update(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
  });
  test('destroy, should 201 and return correct value', async () => {
    let req = mockRequest({},
      { user_id: "10cd9047-13db-457e-bf32-884de56cd5c8" },
      {});;
    const res = mockResponse();
    await user.destroy(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(200);
    req = mockRequest(
        {isDeleted: false},
        { user_id: "10cd9047-13db-457e-bf32-884de56cd5c8" },
        {});
      await user.update(req, res)
  });
  test('destroy, should 400', async () => {
    let req = mockRequest({}, { user_id: "10cd9047-13db-457e-bf32-884de56cd5c9" }, {});
    const res = mockResponse();
    await user.destroy(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
  });
});