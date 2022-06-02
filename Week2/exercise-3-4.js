const mysql = require("mysql");
const { exerciseQueries } = require(`./homeWork-queries.js`);

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

// Exercise 3-4
const executeQueries = () => {
  exerciseQueries.forEach((query) => {
    connection.query(query, (error, result) => {
      if (error) {
        console.log(`Error at ${query}: `, error);
      }
      console.log(`Execution of query #${exerciseQueries.indexOf(query) + 1}`);
      console.table(result);
    });
  });
};

executeQueries();
connection.end();
