const pool = require("../config/db");

const createUser = (name, email, password) => {
  return pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",
    [name, email, password]
  );
};

const getUserByEmail = (email) => {
  return pool.query("SELECT * FROM users WHERE email = $1", [email]);
};

module.exports = { createUser, getUserByEmail };
