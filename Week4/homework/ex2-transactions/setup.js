const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  try {
    await client.connect();
    await createAccounts(client, accountsArray);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

const accountsArray = [
  {
    account_number: 101,
    balance: 3500,
    account_changes: {
      change_number: 1,
      amount: 200,
      changed_date: "10-10-2000",
      remark: "tuition fees",
    },
  },
  {
    account_number: 102,
    balance: 5000,
    account_changes: {
      change_number: 2,
      amount: 100,
      changed_date: "24-05-2022",
      remark: "gift",
    },
  },
  {
    account_number: 103,
    balance: 6600,
    account_changes: {
      change_number: 3,
      amount: 50,
      changed_date: "20-11-2020",
      remark: "course payment",
    },
  },
  {
    account_number: 104,
    balance: 1000,
    account_changes: {
      change_number: 5,
      amount: 290,
      changed_date: "19-12-2019",
      remark: "groceries",
    },
  },
  {
    account_number: 105,
    balance: 4440,
    account_changes: {
      change_number: 6,
      amount: 800,
      changed_date: "11-03-2004",
      remark: "Dinner",
    },
  },
];

async function createAccounts(client, accountsArray) {
  const result = await client
    .db("databaseWeek4")
    .collection("accounts")
    .insertMany(accountsArray);

  console.log(
    `${result.insertedCount} new accounts was created with the following IDs:`
  );
  console.log(`${result.insertedIds}`);
}
