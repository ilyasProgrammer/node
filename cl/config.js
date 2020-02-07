module.exports = {
  HOST: "localhost",
  USER: "ra",
  PASSWORD: "12",
  DB: "cl",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
