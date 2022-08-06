import { mockRequest, mockResponse } from '../../../__mocks__/interceptors';
import { user } from './user.controller';
import User from '@/models/user.model';
import UserToGroup from '@/models/user_to_group.model';
import { schemaUser, schemaUserToGroup } from '@/schema';
const users = [{id: '10cd9047-13db-457e-bf32-884de56cd5c8', login: 'login', password: 'password', age: 33}, {id: '10cd9047-13db-457e-bf32-884de56cd5c7', login: 'login2', password: 'password2', age: 34}]

describe("Check method \'userController\' ", () => {
  jest.mock('@/models/user.model', ()=>({
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn()
  }))
  jest.mock('@/models/user_to_group.model', ()=>({
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn()
  }))
  jest.mock('@/schema', ()=>({
    schemaUser: {
      validate: jest.fn()
    },
    schemaUserToGroup: {
      validate: jest.fn()
    }
  }))
  const mockT = jest.fn()
  jest.mock('../models', ()=>({
    sequelize: () => ({
      sequelize: {transaction: () => mockT}
    })
  }))
  test('create, should 201 and return correct value', async () => {
    console.log(User)
    User.create.mockResolvedValue(users[0])
    schemaUser.validate.mockResolvedValue({value: users[0]})
    let req = mockRequest({ login: "login", password: "password", age: 33 });
    const res = mockResponse();
    await user.create(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(201);
  });
  test('create, should 400', async () => {
    User.create.mockRejectedValue({error: 'error'})
    let req = mockRequest({ login: "login", age: 33 });
    const res = mockResponse();
    await user.create(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(400);
  });

  test('list, should 201 and return correct value', async () => {
    jest.spyOn(User,'findAll').mockResolvedValue(users)
    let req = mockRequest({},{}, {login: "login"});
    const res = mockResponse();
    await user.list(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(200);
  });
  test('list, should 400', async () => {
    jest.spyOn(User,'findAll').mockResolvedValue(undefined)
    let req = mockRequest({}, {}, {});
    const res = mockResponse();
    await user.list(req, res)
    // expect(res.json).toHaveBeenCalledTimes(1)
    // expect(res.json.mock.calls.length).toBe(1);
    // expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
    
  });
  test('retreive, should 201 and return correct value', async () => {
    jest.spyOn(User,'findOne').mockResolvedValue(user[0])
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
    jest.spyOn(User,'findOne').mockResolvedValue(undefined)
    let req = mockRequest({}, { user_id: '10cd9047-13db-457e-bf32-884de56cd5c9' }, {});
    const res = mockResponse();
    await user.retrieve(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
  });
  test('update, should 201 and return correct value', async () => {
    jest.spyOn(User,'findOne').mockResolvedValue(user[0]);
    jest.spyOn(User,'update').mockResolvedValue(user[0]);
    let req = mockRequest({age: 77},
      { user_id: "10cd9047-13db-457e-bf32-884de56cd5c8" },
      {});
    const res = mockResponse();
    user.update(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(201);
  });
  test('update user, should 400', async () => {
    jest.spyOn(User,'findOne').mockResolvedValue(undefined)
    let req = mockRequest({}, { user_id: '10cd9047-13db-457e-bf32-884de56cd5c9' }, {});
    const res = mockResponse();
    await user.update(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
  });
  test('destroy, should 200 and return correct value', async () => {
    jest.spyOn(User,'findOne').mockResolvedValue(user[0])
    jest.spyOn(User,'update').mockResolvedValue(10);
    jest.spyOn(UserToGroup, 'destroy').mockResolvedValue(10)
    let req = mockRequest({},
      { user_id: "10cd9047-13db-457e-bf32-884de56cd5c8" },
      {});;
    const res = mockResponse();
    await user.destroy(req, res);
    // expect(res.json).toHaveBeenCalledTimes(1)
    // expect(res.json.mock.calls.length).toBe(1);
    // expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({})
    expect(res.status).toHaveBeenLastCalledWith(200);
    
  });
  test('destroy, should 400', async () => {
    jest.spyOn(User,'findOne').mockResolvedValue(undefined)
    let req = mockRequest({}, { user_id: "10cd9047-13db-457e-bf32-884de56cd5c9" }, {});
    const res = mockResponse();
    await user.destroy(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
  });
});