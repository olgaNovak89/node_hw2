const { mockRequest, mockResponse } = require('../../../__mocks__/interceptors');
const { group } = require('./group.controller');

describe("Check method \'userController\' ", () => {
  test('should 201 and return correct value', async () => {
    let req = mockRequest({ name: 'name', permissions: ['WRITE'] });
    const res = mockResponse();
    await group.create(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(201);
  });
  test('should 400', async () => {
    let req = mockRequest({ name: 'name' });
    const res = mockResponse();
    await group.create(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(400);
  });

  test('list, should 201 and return correct value', async () => {
    let req = mockRequest({},{}, { name: 'name' });
    const res = mockResponse();
    await group.list(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(200);
  });
  test('list, should 400', async () => {
    let req = mockRequest({}, {}, {});
    const res = mockResponse();
    await group.list(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
    
  });
  test('retreive group, should 201 and return correct value', async () => {
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
    let req = mockRequest({}, { group_id: '10cd9047-13db-457e-bf32-884de56cd5c9' }, {});
    const res = mockResponse();
    await group.retrieve(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
  });
  test('update, should 201 and return correct value', async () => {
    let req = mockRequest({},
      { group_id: "7ea53eb2-f9ad-44af-8e1f-0d4011bb830e" },
      {});
    const res = mockResponse();
    await group.retrieve(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toBeCalledWith({
      "name": "name",
      "permissions": ["WRITE"],
      "id": "7ea53eb2-f9ad-44af-8e1f-0d4011bb830e"    
      })
      req = mockRequest(
        {name: "name2"},
        { group_id: "7ea53eb2-f9ad-44af-8e1f-0d4011bb830e" },
        {});
      await group.update(req, res)
      expect(res.json).toBeCalledWith({
        "name": "name2",
      "permissions": ["WRITE"],
      "id": "7ea53eb2-f9ad-44af-8e1f-0d4011bb830e"    
        })
      expect(res.status).toHaveBeenCalledTimes(2);
      expect(res.status).toHaveBeenLastCalledWith(200);
      req = mockRequest(
        {name: "name"},
        { group_id: "7ea53eb2-f9ad-44af-8e1f-0d4011bb830e" },
        {});
      await group.update(req, res)
      req = mockRequest({},
        { group_id: "7ea53eb2-f9ad-44af-8e1f-0d4011bb830e" },
        {});
      await group.retrieve(req, res)
      expect(res.json).toHaveBeenCalledTimes(4)
      expect(res.json).toHaveBeenLastCalledWith({
        "name": "name",
      "permissions": ["WRITE"],
      "id": "7ea53eb2-f9ad-44af-8e1f-0d4011bb830e" 
        })
  });
  test('update user, should 400', async () => {
    let req = mockRequest({}, { group_id: '10cd9047-13db-457e-bf32-884de56cd5c9' }, {});
    const res = mockResponse();
    await group.update(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
  });
  // test('destroy, should 201 and return correct value', async () => {
  //   let req = mockRequest({},
  //     { user_id: "10cd9047-13db-457e-bf32-884de56cd5c8" },
  //     {});;
  //   const res = mockResponse();
  //   await user.destroy(req, res)
  //   expect(res.json).toHaveBeenCalledTimes(1)
  //   expect(res.json.mock.calls.length).toBe(1);
  //   expect(res.status).toHaveBeenCalledTimes(1);
  //   expect(res.status).toHaveBeenLastCalledWith(200);
  //   req = mockRequest(
  //       {isDeleted: false},
  //       { user_id: "10cd9047-13db-457e-bf32-884de56cd5c8" },
  //       {});
  //     await user.update(req, res)
  // });
  test('destroy, should 400', async () => {
    let req = mockRequest({}, { group_id: "10cd9047-13db-457e-bf32-884de56cd5c9" }, {});
    const res = mockResponse();
    await group.destroy(req, res)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
  });
});