const mysql = require("mysql");

const DBLogin = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
};

// To delete Database if exist
const dropDatabase = `DROP DATABASE IF EXISTS week3`;

//To Create Database
const createDatabase = `CREATE DATABASE week3`;

// to use database
const useDatabase = `USE week3`;

// create account table
const createAccountTable = `CREATE TABLE IF NOT EXISTS account(
    account_number INT PRIMARY KEY,
    balance INT
    )`;

// create account table
const createAccountChangeTable = `CREATE TABLE IF NOT EXISTS account_changes(
    change_number INT PRIMARY KEY AUTO_INCREMENT,
    account_number INT,
    amount INT,
    changed_date DATE,
    remark TEXT,
    CONSTRAINT FK_accountNo FOREIGN KEY (account_number) REFERENCES account(account_number)
    )`;
const connection = mysql.createConnection(DBLogin);

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(" DataBase is Connected");
  }
});

const queries = [
  dropDatabase,
  createDatabase,
  useDatabase,
  createAccountTable,
  createAccountChangeTable,
];

const createTables = () => {
  queries.forEach((query) => {
    connection.query(query, (error) => {
      if (error) throw error;
    });
  });

  console.log(`Accounts & Account Changes Tables are created`);
};

createTables();
connection.end();
