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

const accountsToInsert = `INSERT INTO account(account_number,balance)
VALUES("101","3000"),("102","5000"),("103","3600"),("105","5000")`;

const changesToInsert = `INSERT INTO account_changes(account_number, amount, changed_date, remark)
VALUES("102","100","2022-02-15","refund"),("101","50","2000-12-01","gift"),("105","200","2021-11-11","loan"),("103","90","2022-10-07","bill payment")`;

const insertQueries = [accountsToInsert, changesToInsert];

const insertValues = () => {
  insertQueries.forEach((query) => {
    connection.query(query, (error) => {
      if (error) throw error;
    });
  });

  console.log(`Data has been inserted`);
};

insertValues();
connection.end();
