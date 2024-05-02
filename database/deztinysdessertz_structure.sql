CREATE DATABASE IF NOT EXISTS DeztinysDessertzDB;
USE DeztinysDessertzDB;

-- Main orders table
CREATE TABLE IF NOT EXISTS Orders
(
		order_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        customer_id INT UNSIGNED NOT NULL,
        customer_name VARCHAR(40) NOT NULL,
        contact VARCHAR(50) NOT NULL,
        date_ordered DATETIME NOT NULL,
        date_fulfilled DATETIME,
        total_price FLOAT(2),
        delivery_method VARCHAR(12),
        order_status VARCHAR(10) NOT NULL
);

-- Item specific order tables
CREATE TABLE IF NOT EXISTS CakeOrders
(
	order_id INT UNSIGNED NOT NULL, -- Matches one in Orders table. May be repeated if multiple cakes in one order
	cake_type VARCHAR(20) NOT NULL,
	cake_flavour VARCHAR(20) NOT NULL,
    has_filling TINYINT(1) NOT NULL DEFAULT 0,
    filling VARCHAR(20),
    num_tiers TINYINT(4) UNSIGNED DEFAULT 1,
    num_layers TINYINT(4) UNSIGNED DEFAULT 2,
    notes VARCHAR(300)
);

CREATE TABLE IF NOT EXISTS CupcakeOrders
(
	order_id INT UNSIGNED NOT NULL, -- Matches one in Orders table. May be repeated if multiple cakes in one order
    quantity TINYINT(60) UNSIGNED NOT NULL,
    cupcake_flavour VARCHAR(20) NOT NULL,
    filling VARCHAR(20),
    notes VARCHAR(300)
);


-- Payment Table
CREATE TABLE IF NOT EXISTS Payments
(
	order_id INT UNSIGNED PRIMARY KEY,
    base_price FLOAT(2) UNSIGNED,
    tax_price FLOAT(2) UNSIGNED DEFAULT 0,
    discounts FLOAT(2) DEFAULT 0,
    shipping_price FLOAT(2) UNSIGNED DEFAULT 0,
    total_price FLOAT(2) UNSIGNED DEFAULT 0,
    deposit_price FLOAT(2) UNSIGNED, -- Half of base price
    amount_paid FLOAT(2) UNSIGNED NOT NULL DEFAULT 0,
    payment_method VARCHAR(20), -- Tracks only the method of the payment. No card/account details are stored here
    amount_refunded FLOAT(2) UNSIGNED DEFAULT 0
);

-- Customers Table
CREATE TABLE IF NOT EXISTS Customers
(
	customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name  VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(10),
    user_pass VARCHAR(16) NOT NULL -- Hashed value
);

-- Main Menu Table
CREATE TABLE IF NOT EXISTS MenuItems
(
	menu_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(30) NOT NULL UNIQUE
);

-- Options Tables
CREATE TABLE IF NOT EXISTS CakeOptions
(
	option_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    option_name VARCHAR(30) NOT NULL UNIQUE,
    option_id VARCHAR(30) NOT NULL UNIQUE,
    option_list VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS CupcakeOptions
(
	option_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    option_name VARCHAR(30) NOT NULL UNIQUE,
    option_id VARCHAR(30) NOT NULL UNIQUE,
    option_list VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS DippedDessertOptions
(
	option_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    option_name VARCHAR(30) NOT NULL UNIQUE,
    option_id VARCHAR(30) NOT NULL UNIQUE,
    option_list VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS OtherDessertOptions
(
	option_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    option_name VARCHAR(30) NOT NULL UNIQUE,
    option_id VARCHAR(30) NOT NULL UNIQUE,
    option_list VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS RequestOptions
(
	option_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    option_name VARCHAR(30) NOT NULL UNIQUE,
    option_id VARCHAR(30) NOT NULL UNIQUE
);

-- Cake Types
CREATE TABLE IF NOT EXISTS CakeTypes
(
	type_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(30) NOT NULL UNIQUE
);

-- Cake Tiers
CREATE TABLE IF NOT EXISTS CakeTiers
(
	tier_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    tier_vals TINYINT NOT NULL UNIQUE
);

-- Cake Layers
CREATE TABLE IF NOT EXISTS CakeLayers
(
	layer_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    layer_vals TINYINT NOT NULL UNIQUE
);

-- Cake Flavours
CREATE TABLE IF NOT EXISTS CakeFlavours
(
	flavour_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    flavour_name VARCHAR(30) NOT NULL UNIQUE
);

-- Cake Fillings
CREATE TABLE IF NOT EXISTS CakeFillings
(
	filling_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    filling_name VARCHAR(30) NOT NULL UNIQUE
);

-- Cake Shapes
CREATE TABLE IF NOT EXISTS CakeShapes
(
	shape_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    shape_name VARCHAR(30) NOT NULL UNIQUE
);

-- Cake Sizes
CREATE TABLE IF NOT EXISTS CakeSizes
(
	size_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    size TINYINT NOT NULL UNIQUE
);

-- Cupcake Quantities
CREATE TABLE IF NOT EXISTS CupcakeQuantities
(
	quantity_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    quantity TINYINT NOT NULL UNIQUE
);

-- Dipped Dessert Types
CREATE TABLE IF NOT EXISTS DippedDessertTypes
(
	type_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(30) NOT NULL UNIQUE
);

-- Dipped Dessert Coatings
CREATE TABLE IF NOT EXISTS Coatings
(
	coating_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    coating_name VARCHAR(30) NOT NULL UNIQUE
);

-- Dipped Dessert Quantities
CREATE TABLE IF NOT EXISTS DippedDessertQuantities
(
	quantity_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    quantity TINYINT NOT NULL UNIQUE
);

-- Other Desserts
CREATE TABLE IF NOT EXISTS OtherDessertTypes
(
	type_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(30) NOT NULL UNIQUE
);

-- Other Dessert Quantities
CREATE TABLE IF NOT EXISTS OtherDessertQuantities
(
	quantity_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    quantity TINYINT NOT NULL UNIQUE
);

