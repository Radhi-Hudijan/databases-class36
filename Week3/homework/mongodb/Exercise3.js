function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM` +
      conn.escape(Country) +
      `WHERE Name =` +
      conn.escape(name) +
      `and code = ` +
      conn.escape(code),
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}
