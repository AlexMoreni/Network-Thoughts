const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const app = express();

const conn = require("./db/conn");

//Models
const Tought = require("./models/Toughts");
const User = require("./models/User");

//Routes
const authRoutes = require("./routes/authRoutes");
const toughtsRoutes = require("./routes/toughtsRoutes");

//Controller
const ToughtsController = require("./controllers/ToughtsController");

//Template Engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//Req Body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//Session Middleware
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

//Flash Message
app.use(flash());

//Public path
app.use(express.static("public"));

//Set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

app.use("/toughts", toughtsRoutes);
app.use("/", authRoutes);

app.use("/", ToughtsController.homePage);

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
