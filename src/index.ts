import express from "express";
import path from "path";
import exphbs from "express-handlebars";

// ROUTES INPORT
import IndexRoutes from "./routes";
import BooksRoutes from "./routes/books";

// INITIALIZATIONS
const app = express();
import "./database";

// SETTINGS
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    helpers: require("./lib/helpers"),
  })
);
app.set("view engine", "hbs");

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/", IndexRoutes);
app.use("/books", BooksRoutes);

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// START SERVER
app.listen(app.get("port"), () => {
  console.log(`Server online on port ${app.get("port")}`);
});
