require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");

const graphqlHTTP = require("express-graphql");
const schema = require("./graphql/schema");
const graphiql = require("express-graphql");

const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const favicon = require("serve-favicon");

mongoose
  .connect(`${process.env.DBURL}`, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("../package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();


app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, "public")));
// app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

const whitelist = ["http://localhost:3001", "http://localhost:19002"];

const corsOptions = {
  origin: function(origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};

app.use(cors(corsOptions));

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Enable authentication using session + passport
app.use(
  session({
    secret: "irongenerator",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(flash());

require("./passport")(app);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);
const patientRoutes = require("./routes/patients");
app.use("/api/patients", patientRoutes);
const appointmentsRoutes = require("./routes/appointments");
app.use("/api/appointments", appointmentsRoutes);

app.use(
  "/grapghql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV !== "production"
  })
);

app.use("*", (req, res) =>
  res.sendFile(path.join(__dirname + "/public/index.html"))
);
module.exports = app;
