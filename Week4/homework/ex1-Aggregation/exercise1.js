const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = client.db("databaseWeek4").collection("population_pyramid");

//main function
async function main() {
  try {
    await client.connect();

    await totalPopulationPerYear("Netherlands");
    await populationPerContinent(2020, "100+");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

// 2- total population (M + F over all age groups) for a given Country per year

async function totalPopulationPerYear(country) {
  const pipeline = [
    {
      $match: {
        Country: `${country}`,
      },
    },
    {
      $addFields: {
        totalPopulation: {
          $add: ["$M", "$F"],
        },
      },
    },
    {
      $group: {
        _id: "$Year",
        countPopulation: {
          $sum: "$totalPopulation",
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];

  const aggCursor = database.aggregate(pipeline);
  await aggCursor.forEach((year) => {
    console.log(year);
  });
}

// 3- return all of the information of each continent for a given Year and Age field but add a new field

async function populationPerContinent(year, age) {
  const pipeline = [
    {
      $match: {
        Year: year,
        Age: age,
        Country: {
          $in: [
            "AFRICA",
            "ASIA",
            "EUROPE",
            "LATIN AMERICA AND THE CARIBBEAN",
            "NORTHERN AMERICA",
            "OCEANIA",
          ],
        },
      },
    },
    {
      $addFields: {
        TotalPopulation: {
          $add: ["$M", "$F"],
        },
      },
    },
  ];

  const aggCursor = database.aggregate(pipeline);
  await aggCursor.forEach((continent) => {
    console.log(continent);
  });
}
