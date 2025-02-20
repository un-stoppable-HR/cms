const expressSession = require("express-session");
const mongoDbStore = require("connect-mongodb-session");

require("dotenv").config();

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: process.env.MONGODB_URL,
    databaseName: "cafeteria-management-system",
    collection: "sessions",
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  };
}

module.exports = createSessionConfig;
