const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const Sequelize = require("sequelize");
const dbConfig = require("./config/config.json").development;
const User = require("./models").User;

connectToDatabase();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/register', async (req, res) => {
  User.create({
    username: req.body.un,
    password: req.body.pw
  }).then(result => {
    console.log(('result: ' + result));
    res.send(result);
  });
});

app.post('/login', (req, res) => {
  const un = req.body.un;
  const pw = req.body.pw;

  try {
    if (un != null && pw != null) {
      User.findAll({
        where: {
          username: un,
        }
      }).then(usersFound => {
        if (usersFound.length < 1) {
          res.status(404).send(error);
        }
        res.send(usersFound);
      });
    }
  } catch (error) {
    console.log('err: ' + error);
    res.status(404).send(error);
  }
});

app.listen(5000, () => console.log("The node.js app is listening on port 5000."));

function connectToDatabase() {
  const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");

      //Check if database was seeded already, and do it if needed
      User.findById(1).then(user => {
        if (!user) {
          console.log("Database is not seeded, will run seeds now...");
          const { exec } = require("child_process");
          try {
            exec("/opt/node_modules/.bin/sequelize db:seed:all", (err, stdout, stderr) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log(stdout);
            });
          } catch (error) {
            console.log("Error while seeding database: ", error);
          }
        } else {
          console.log("Database already seeded.");
        }
      });
    })
    .catch(err => {
      console.log("Unable to connect to the database:", err);
    });
}
