const express = require("express");
const app = express();
const port = 4000;

const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");

require("./models/User");
require("./routes/authRoutes")(app);
require("./services/passport");

mongoose.connect(keys.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(passport.initialize());

app.listen(port, () => {
    console.log("server is listening on port:", port);
});
