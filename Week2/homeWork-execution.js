const mysql = require("mysql");
const {
  exerciseOneQueries,
  exerciseTwoQueries,
  exerciseQueries,
} = require(`./homeWork-queries.js`);

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
    connection.query(query, (error) => {
      if (error) throw error;
    });
  });
  console.log(`Authors table has been created`);
};

// Exercise 2
const createTables = () => {
  exerciseTwoQueries.forEach((query) => {
    connection.query(query, (error) => {
      if (error) throw error;
    });
  });
  console.log(`Research Papers & Join Tables are created`);
};

// Exercise 3 & 4
const totalQuires = exerciseQueries.length;
const executeQueries = () => {
  exerciseQueries.forEach((query) => {
    connection.query(query, (error) => {
      if (error) throw error;
    });
  });
  console.log(`${totalQuires} quires are completed`);
};

createAuthorTable();
createTables();
executeQueries();

connection.end();
