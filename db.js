const Sequelize = require("sequelize");

const sequelize = new Sequelize("mainDatabase", "postgres", process.env.PGPASS, {
    host: "localhost",
    dialect: "postgres"
});

sequelize.authenticate()
.then(() => console.log("Connected to mainDatabase."))
.catch(err => console.log(err));

module.exports = sequelize;