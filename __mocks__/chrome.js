global.chrome = {
  storage: {
    sync: {
      get: jest.fn(),
      set: jest.fn()
    },
    onChanged: {
      addListener: jest.fn()
    }
  },

  runtime: {
    onMessage: {
      addListener: jest.fn()
    },
    onInstalled: {
      addListener: jest.fn()
    },
    onStartup: {
      addListener: jest.fn()
    },
    sendMessage: jest.fn((msg, callback) => {
      if (callback) callback({ mode: "light" });
    })
  },

  windows: {
    onCreated: {
      addListener: jest.fn()
    }
  }
};
