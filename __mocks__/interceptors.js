module.exports = {
    mockRequest: (body, params, query) => {
      const req = {body, params, query}
      return req
    },
    mockResponse: () => {
      const res = {}
      res.send = jest.fn().mockReturnValue(res)
      res.status = jest.fn().mockReturnValue(res)
      res.json = jest.fn().mockReturnValue(res)
      return res
    },
}