const mysql = require("mysql");
const { exerciseOneQueries } = require(`./homeWork-queries.js`);

const DBLogin = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
};

const connection = mysql.createConnection(DBLogin);

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(" DataBase is Connected");
  }
});

// Exercise 1
const createAuthorTable = () => {
  exerciseOneQueries.forEach((query) => {
    connection.query(query, (error, result) => {
      if (error) {
        throw error;
      }
      console.log(`${query} completed`);
      console.table(result);
    });
  });
};

createAuthorTable();
connection.end();
