-- Create database
CREATE DATABASE RestaurantDB;
USE RestaurantDB;

-- Table: Accounts
CREATE TABLE Accounts (
    customer_id INT NOT NULL PRIMARY KEY,
    customer_name CHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL
);

-- Table: Category
CREATE TABLE Category (
    category_id INT NOT NULL PRIMARY KEY,
    category_name CHAR(50) NOT NULL
);

-- Table: Dish
CREATE TABLE Dish (
    dish_id INT NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

-- Table: Ingredients
CREATE TABLE Ingredients (
    ingredient_id INT NOT NULL PRIMARY KEY,
    ingredient_type_id CHAR(50) NOT NULL,
    ingredient_name CHAR(50) NOT NULL
);

-- Table: Recipe
CREATE TABLE Recipe (
    ingredient_id INT NOT NULL,
    dish_id INT NOT NULL,
    quantity CHAR(50),
    PRIMARY KEY (ingredient_id, dish_id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id),
    FOREIGN KEY (dish_id) REFERENCES Dish(dish_id)
);

-- Table: Orders
CREATE TABLE Orders (
    order_id INT NOT NULL PRIMARY KEY,
    customer_id INT NOT NULL,
    dish_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Accounts(customer_id),
    FOREIGN KEY (dish_id) REFERENCES Dish(dish_id)
);

-- Table: Session
CREATE TABLE Session (
    token char(50) NOT NULL,
    customer_id INT NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES Accounts(customer_id),
    started_at VARCHAR(255) NOT NULL
);