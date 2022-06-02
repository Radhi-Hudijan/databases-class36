const mysql = require("mysql");
const { exerciseTwoQueries } = require(`./homeWork-queries.js`);

const DBLogin = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
};

const connection = mysql.createConnection(DBLogin);

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(" DataBase is Connected");
  }
});

// Exercise 2
const createTables = () => {
  exerciseTwoQueries.forEach((query) => {
    connection.query(query, (error, result) => {
      if (error) {
        console.log(`Error at ${query}: `, error);
      }
      console.log(`${query} completed`);
      console.table(result);
    });
  });
};

createTables();
connection.end();
