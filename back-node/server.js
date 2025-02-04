const express = require("express");
const cors = require("cors");
var bcrypt = require("bcryptjs");

require("dotenv").config();

const app = express();

//img folder
var path = require("path");
const publicDirectoryPath = path.join(__dirname, "./app/images");
app.use(express.static(publicDirectoryPath));
console.log(publicDirectoryPath);

const allowedOrigins = [
	'http://localhost',
	'http://165.22.179.233',
	'http://revuagencyapp.com'
];



//puerto de conexión con back
var corsOptions = {
  origin: "http://165.22.179.233",
  credentials: true,
};

app.use(cors({ 
	origin: function (origin, callback) {  
		if (!origin || allowedOrigins.includes(origin)) {   
			callback(null, true);  
		} else {   
			callback(new error('CORS not allowed'));  
		}
	}, 
	credentials: true
	}));

// Rutas
//app.use('/api/auth', require('./app/routes/auth'));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// var path = require("path");
// app.use("/images", express.static("images"));

// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;
const UserRoles = db.roles;

db.sequelize.sync();

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  // initial(); /** Only for initial data, comment to first init */
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "API Revu -- Welcome." });
});

// routes
require("./app/routes/auth.routes", cors(corsOptions))(app);
require("./app/routes/user.routes", cors(corsOptions))(app);
require("./app/routes/influ.routes", cors(corsOptions))(app);
require("./app/routes/cotizaciones.routes", cors(corsOptions))(app);
require("./app/routes/gender.routes", cors(corsOptions))(app);
require("./app/routes/cities.routes", cors(corsOptions))(app);
require("./app/routes/departments.routes", cors(corsOptions))(app);
require("./app/routes/influ_classes.routes", cors(corsOptions))(app);
require("./app/routes/ethnic.routes", cors(corsOptions))(app);
require("./app/routes/hair_colors.routes", cors(corsOptions))(app);
require("./app/routes/hair_types.routes", cors(corsOptions))(app);
require("./app/routes/skin_colors.routes", cors(corsOptions))(app);
require("./app/routes/tags.routes", cors(corsOptions))(app);
require("./app/routes/countries.routes", cors(corsOptions))(app);
require("./app/routes/socialClass.routes", cors(corsOptions))(app);

// set port, listen for requests
const PORT = process.env.NODE_LOCAL_PORT || 8081;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}.`);
});

db.TagsCategory.findAll({ include: [{ model: db.SubCategory, as: 'sub_category'}], })
    .then((categories) => console.log(categories))
    .catch((error) => console.error("Error fetching categories:", error));

/** Only for initial data, comment to first init */
function initial() {
  Role.create({
    id: 1,
    name: "admin",
  });

  Role.create({
    id: 2,
    name: "cct",
  });

  Role.create({
    id: 3,
    name: "reclutador",
  });
  User.create({
    username: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("12345678", 8),
    firstname: "Prueba",
    lastname: "Admin",
    phone: "123456789",
  });
  User.create({
    username: "user",
    email: "user@user.com",
    password: bcrypt.hashSync("12345678", 8),
    firstname: "User",
    lastname: "Prueba",
    phone: "123456789",
  });

  UserRoles.create({
    userId: 1,
    roleId: 3,
  });
  UserRoles.create({
    userId: 2,
    roleId: 1,
  });
}
