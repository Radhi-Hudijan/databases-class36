const mysql = require("mysql");

const DBLogin = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week3",
};

const connection = mysql.createConnection(DBLogin);
connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(" DataBase is Connected");
  }
});

const startTransaction = `START TRANSACTION`;
const autoCommitOff = `SET autocommit =0;`;
const updateAccount101 = `UPDATE Account SET balance = balance - 1000 WHERE account_number = 101;`;
const updateAccount102 = `UPDATE Account SET balance = balance + 1000 WHERE account_number = 102;`;
const updateAccount101Changes = `INSERT INTO account_changes(account_number, amount, changed_date, remark)
VALUES("101","-1000","2022-05-17","books fee");`;
const updateAccount102Changes = `INSERT INTO account_changes(account_number, amount, changed_date, remark)
VALUES("102","1000","2022-05-17","books fee");`;

const commit = `COMMIT;`;
const rollBack = `ROLLBACK;`;

const transactionQuires = [
  startTransaction,
  autoCommitOff,
  updateAccount101,
  updateAccount102,
  updateAccount101Changes,
  updateAccount102Changes,
  commit,
];

const transferTransaction = () => {
  transactionQuires.forEach((query) => {
    connection.query(query, (error) => {
      if (error) {
        console.log(`Error found in ${query}`, error);
        connection.query(rollBack);
        connection.end();
      }
    });
  });

  console.log("Transaction completed");
};

transferTransaction();
connection.end();
