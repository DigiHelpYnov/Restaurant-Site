const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const app = express();
const PORT = 3000;

// Connexion (ou création) de la base SQLite
const db = new sqlite3.Database("./restaurant.db", (err) => {
  if (err) console.error("❌ Erreur de connexion :", err.message);
  else console.log("✅ Base SQLite connectée avec succès !");
});

// Création des tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Accounts (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    password TEXT NOT NULL,
    address TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Category (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Dish (
    dish_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Ingredients (
    ingredient_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ingredient_type_id TEXT NOT NULL,
    ingredient_name TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Recipe (
    ingredient_id INTEGER NOT NULL,
    dish_id INTEGER NOT NULL,
    quantity TEXT,
    PRIMARY KEY (ingredient_id, dish_id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id),
    FOREIGN KEY (dish_id) REFERENCES Dish(dish_id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    dish_id INTEGER NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Accounts(customer_id),
    FOREIGN KEY (dish_id) REFERENCES Dish(dish_id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Session (
    token TEXT NOT NULL,
    customer_id INTEGER NOT NULL,
    started_at TEXT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Accounts(customer_id)
  )`);

  console.log("✅ Tables créées avec succès !");
});

// Exemple de route Express
app.get("/", (req, res) => {
  res.send("🍽️ RestaurantDB (SQLite) est opérationnelle !");
});

// Lancement du serveur
app.listen(PORT, () => console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`));
