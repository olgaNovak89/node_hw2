const { mockRequest, mockResponse } = require('../../../__mocks__/interceptors');
const { group } = require('./group.controller');
import Group from '@/models/group.model'
import UserToGroup from '@/models/user_to_group.model'

const mockGroups = [
  { id: '7ea53eb2-f9ad-44af-8e1f-0d4011bb830e', name: 'name', permissions: ['READ']},
  { id: '7ea53eb2-f9ad-44af-8e1f-0d4011bb830f', name: 'name2', permissions: ['WRITE']}
];
 jest.mock('@/config', () => ({
  usersSearchLimit: 5
}))
jest.mock('@/models/user_to_group.model', ()=>({
  destroy: jest.fn().mockResolvedValue(10)
}))
jest.mock('@/schema', ()=>{ 
  const singleGroup = { id: '7ea53eb2-f9ad-44af-8e1f-0d4011bb830e', name: 'name', permissions: ['READ']};
  return {
  schemaGroup: {
    validate: jest.fn().mockImplementation((input)=> ({value: input}))
  },
  schemaUserToGroup: {
    validate: jest.fn().mockReturnValue({})
  }
}})
const mockT = {
  commit: jest.fn(),
  rollback: jest.fn()
}
jest.mock('../models', ()=>({
    sequelize: {
      transaction: () => (mockT)}
}))
 describe("Check method \'groupController\' ", () => {
  test('should 201 and return correct value', async () => {
    jest.spyOn(Group,'create').mockResolvedValue(mockGroups[0])
    let req = mockRequest({ name: 'name', permissions: ['READ'] });
    const res = mockResponse();
    await group.create(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(201);
  });
  test('should 400', async () => {
    jest.spyOn(Group,'create').mockRejectedValue(undefined)
    let req = mockRequest({ name: 'name' });
    const res = mockResponse();
    await group.create(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(400);
  });

  test('list, should 201 and return correct value', async () => {
    jest.spyOn(Group,'findAll').mockResolvedValue(mockGroups)
    let req = mockRequest({},{}, { name: 'name' });
    const res = mockResponse();
    await group.list(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(200);
  });
  test('list, should 400', async () => {
    jest.spyOn(Group,'findAll').mockRejectedValue(undefined)
    let req = mockRequest({}, {}, {});
    const res = mockResponse();
    await group.list(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
    
  });
  test('retreive group, should 201 and return correct value', async () => {
    jest.spyOn(Group,'findOne').mockResolvedValue(mockGroups[0])
    let req = mockRequest({},
      { group_id: "7ea53eb2-f9ad-44af-8e1f-0d4011bb830e" },
      {});
    const res = mockResponse();
    await group.retrieve(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(200);
  });
  test('retreive group, should 400', async () => {
    jest.spyOn(Group,'findOne').mockResolvedValue(undefined)
    let req = mockRequest({}, { group_id: '10cd9047-13db-457e-bf32-884de56cd5c9' }, {});
    const res = mockResponse();
    await group.retrieve(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
  });
  test('update, should 201 and return correct value', async () => {
    jest.spyOn(Group,'findOne').mockResolvedValue(mockGroups[0])
    jest.spyOn(Group,'update').mockResolvedValue({...mockGroups[0], name: "name2"})
    let req = mockRequest({name: "name2"},
      { group_id: "7ea53eb2-f9ad-44af-8e1f-0d4011bb830e" },
      {});
    const res = mockResponse();
      req = mockRequest(
        {name: "name2"},
        { group_id: "7ea53eb2-f9ad-44af-8e1f-0d4011bb830e" },
        {});
      await group.update(req, res)
      expect(res.json).toHaveBeenLastCalledWith({
        "name": "name2",
      "permissions": ["READ"],
      "id": "7ea53eb2-f9ad-44af-8e1f-0d4011bb830e"    
        })
  });
  test('update group, should 400', async () => {
    jest.spyOn(Group,'findOne').mockResolvedValue(undefined)
    let req = mockRequest({}, { group_id: '10cd9047-13db-457e-bf32-884de56cd5c9' }, {});
    const res = mockResponse();
    await group.update(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
  });
  test('destroy, should 201 and return correct value', async () => {
    jest.spyOn(Group,'findOne').mockResolvedValue(mockGroups[0])
    jest.spyOn(Group,'destroy').mockResolvedValue({status: 'ok'})
    jest.spyOn(UserToGroup, 'destroy').mockResolvedValue(10)
    let req = mockRequest({},
      { group_id: "10cd9047-13db-457e-bf32-884de56cd5c8" },
      {});;
    const res = mockResponse();
    await group.destroy(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(200);
  });
  test('destroy, should 400', async () => {
    jest.spyOn(Group,'destroy').mockResolvedValue(0)
    let req = mockRequest({}, { group_id: "10cd9047-13db-457e-bf32-884de56cd5c9" }, {});
    const res = mockResponse();
    await group.destroy(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
  });
});