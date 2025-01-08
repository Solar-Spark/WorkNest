require('dotenv').config();
const morgan = require("morgan")

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/mongo_db');

const app = express();

const auth_routes = require("./routes/auth_routes")
const tasks_routes = require("./routes/tasks_routes")
const teams_routes = require("./routes/teams_routes")
const projects_routes = require("./routes/projects_routes")

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(bodyParser.json());

connectDB();

app.use("/api/auth", auth_routes);
app.use("/api/tasks", tasks_routes);
app.use("/api/teams", teams_routes);
app.use("/api/projects", projects_routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});