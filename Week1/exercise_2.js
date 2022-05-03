const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("DataBase Connected");
  }
});

// What are the names of countries with population greater than 8 million?
const countriesGreaterThan8Million = `SELECT name FROM country WHERE Population > 8000000`;

//What are the names of countries that have “land” in their names?
const containLand = `SELECT name FROM country WHERE name LIKE '%land%'`;

//What are the names of the cities with population in between 500,000 and 1 million?
const citiesPopulation = `SELECT name,population FROM city WHERE population BETWEEN 500000 AND 1000000 `;

//What's the name of all the countries on the continent ‘Europe’?
const europeCountries = `SELECT name,continent FROM country WHERE continent LIKE '%Europe%'`;

//List all the countries in the descending order of their surface areas
const descendingOrder = `SELECT name,SurfaceArea FROM country  ORDER BY SurfaceArea DESC`;

//What are the names of all the cities in the Netherlands?
const NetherlandsCities = `SELECT name FROM city WHERE countrycode = "NLD"`;

//What is the population of Rotterdam?
const rotterdamPopulation = `SELECT name,population FROM city WHERE name = "rotterdam"`;

//What's the top 10 countries by Surface Area?
const topSurfaceAreaCountries = `SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10`;

//What's the top 10 most populated cities?
const mostPopulatedCities = `SELECT name,population FROM city ORDER BY population DESC LIMIT 10`;

//What is the population number of the world?
const worldPopulation = `SELECT SUM(population) AS worldPopulation FROM country`;

const queries = [
  countriesGreaterThan8Million,
  containLand,
  citiesPopulation,
  europeCountries,
  descendingOrder,
  NetherlandsCities,
  rotterdamPopulation,
  topSurfaceAreaCountries,
  mostPopulatedCities,
  worldPopulation,
];

const executingFunction = (connection, query) => {
  connection.query(query, (error, result) => {
    if (error) throw error;
    console.log(result);
  });
};

queries.forEach((query) => {
  executingFunction(connection, query);
});

connection.end();
