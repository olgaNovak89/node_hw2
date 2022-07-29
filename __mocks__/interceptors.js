module.exports = {
    mockRequest: (body, params, query) => {
      const req = {body, params, query}
      // req.body = jest.fn().mockReturnValue(body)
      // req.params = jest.fn().mockReturnValue(params)
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