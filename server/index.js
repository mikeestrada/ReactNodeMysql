const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const Sequelize = require("sequelize");
const dbConfig = require("./config/config.json").development;
const User = require("./models").User;
const UserLike = require("./models").UserLike;

connectToDatabase();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//ENDPOINTS
app.get('/user-like', async(req, res) => {
  console.log(('USERid : ' + req.query.userId));

  UserLike.findAll({
    attributes: ['userId', 'gifId'],
    where: {
      userId: req.query.userId
    }
  }).then(response => {

    console.log(('USER-LIKES : ' + response));
    res.send(response);

  }).catch(err => res.send(err))
});

app.post('/user-like/add', async (req, res) => {
  console.log(('USERid : ' + req.body.userId));
  console.log(('gifId: ' + req.body.gifId));

  await UserLike.create({
    userId: req.body.userId,
    gifId: req.body.gifId
  }, {
    fields: ['userId', 'gifId']
  }).then(result => {
    console.log(('USERLIKE CREATED: ' + result));
    res.send(result);
  }).catch(err => res.status(400).send(err));
});

app.post('/register', async (req, res) => {
  User.create({
    username: req.body.un,
    password: req.body.pw
  }).then(result => {
    console.log(('result: ' + result));
    res.send(result);
  });
});

app.post('/login', async(req, res) => {
  const un = req.body.un;
  const pw = req.body.pw;
  let userToReturn = null;
  let userLikes = [];

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
        userToReturn = usersFound[0];
        console.log('USER FOUND1: ' + userToReturn);

        UserLike.findAll({
          attributes: ['userId', 'gifId'],
          where: {
            userId: userToReturn.id
          }
        })
          .then(likesFound => {
            userLikes = likesFound;
            res.send({
              user: userToReturn,
              likes: userLikes.length > 1 ? userLikes : []
            })
          })
          .catch(err => console.log('\nError getting user likes: ' + err));
      });
    }
  } catch (error) {
    console.log('err: ' + error);
    res.status(404).send(error);
  }
});

app.listen(5000, () => console.log("The node.js app is listening on port 5000."));

//DB CONFIG
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
