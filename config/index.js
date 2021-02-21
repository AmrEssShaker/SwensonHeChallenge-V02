module.exports = {
  app: {
    reading: {
      perPage: 15
    }
  },

  database: {
    url: process.env.DB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
