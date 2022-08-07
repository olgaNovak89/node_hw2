import { mockRequest, mockResponse } from '../../../__mocks__/interceptors';
import { user } from './user.controller';

// beforeEach(()=> {
  const users = [
    {
      id: '10cd9047-13db-457e-bf32-884de56cd5c8',
      login: 'login',
      password: 'password',
      age: 33
    }, {
      id: '10cd9047-13db-457e-bf32-884de56cd5c7',
      login: 'login2',
      password: 'password2',
      age: 34
    }
  ];
  jest.mock('@/config', () => ({
    usersSearchLimit: 5
  }))
  jest.mock('@/models/user.model', () => ({
    create: jest.fn()
    .mockResolvedValueOnce(users[0])
    .mockRejectedValueOnce({error: 'error'}),
    update: jest.fn()
    .mockResolvedValueOnce(users[0])
    .mockResolvedValueOnce(undefined)
    .mockResolvedValue(users[0])
    .mockResolvedValue(10),
    findOne: jest.fn()
    .mockResolvedValueOnce(users[0])
    .mockResolvedValueOnce(undefined)
    .mockResolvedValueOnce(users[0])
    .mockResolvedValueOnce(undefined)
    .mockResolvedValueOnce(users[0])
    .mockResolvedValueOnce(undefined),
    findAll: jest.fn()
    .mockResolvedValueOnce(users)
    .mockResolvedValueOnce([])
  }))
  jest.mock('@/models/group.model', () => ({
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn()
    .mockResolvedValueOnce({
      id: '10cd9047-13db-457e-bf32-884de56cd5c7',
      name: 'name',
      prefereces: ['READ']
    }),
    findAll: jest.fn()
  }))
  jest.mock('@/models/user_to_group.model', ()=>({
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn().mockResolvedValue(10)
  }))
  jest.mock('@/schema', ()=>({
    schemaUser: {
      validate: jest.fn().mockReturnValue({value: users[0]})
    },
    schemaUserToGroup: {
      validate: jest.fn().mockReturnValue({})
    }
  }))
  const mockT = {
    commit: jest.fn(),
    rollback: jest.fn()
  }
  jest.mock('../models', ()=>({
      sequelize: {
        transaction: () => (mockT)}
  }))
// })
describe("Check method \'userController\' ", () => {
  test('create, should 201 and return correct value', async () => {
    let req = mockRequest({ login:
      "login", password:
      "password",
      age: 33
    });
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
    let req = mockRequest({}, {}, { login: 'name'});
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
    let req = mockRequest({age: 77},
      { user_id: "10cd9047-13db-457e-bf32-884de56cd5c8" },
      {});
    const res = mockResponse();
    user.update(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(201);
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
  test('destroy, should 200 and return correct value', async () => {
    let req = mockRequest({},
      { user_id: "10cd9047-13db-457e-bf32-884de56cd5c8" },
      {});;
    const res = mockResponse();
    await user.destroy(req, res);
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(200);
    
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