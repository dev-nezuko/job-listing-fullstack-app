const mockAxios = jest.createMockFromModule('axios');

mockAxios.create = jest.fn(() => mockAxios);

mockAxios.interceptors = {
  request: {
    use: jest.fn(),
  },
  response: {
    use: jest.fn(),
  },
};

mockAxios.get = jest.fn();
mockAxios.post = jest.fn();
mockAxios.patch = jest.fn();
mockAxios.put = jest.fn();
mockAxios.delete = jest.fn();

export default mockAxios;
