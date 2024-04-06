USE DeztinysDessertz_DB;

-- Main orders table
CREATE TABLE Orders
(
		order_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        customer_id INT UNSIGNED NOT NULL,
        name VARCHAR(40) NOT NULL,
        contact VARCHAR(50) NOT NULL,
        date_ordered DATETIME NOT NULL,
        date_fulfilled DATETIME,
        total_price FLOAT(2),
        delivery_method VARCHAR(12),
        order_status VARCHAR(10) NOT NULL
);

-- Item specific order tables
CREATE TABLE CakeOrders
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

CREATE TABLE CupcakeOrders
(
	order_id INT UNSIGNED NOT NULL, -- Matches one in Orders table. May be repeated if multiple cakes in one order
    quantity TINYINT(60) UNSIGNED NOT NULL,
    cupcake_flavour VARCHAR(20) NOT NULL,
    filling VARCHAR(20),
    notes VARCHAR(300)
);


-- Payment Table
CREATE TABLE Payments
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
CREATE TABLE Customers
(
	customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name  VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(10),
    password VARCHAR(16) NOT NULL -- Hashed value
);

-- Main Menu Table
CREATE TABLE MenuItems
(
	menu_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(30) NOT NULL
);

-- Cake Options Table
CREATE TABLE CakeOptions -- Also used for cupcakes
(
	co_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    cake_types VARCHAR(30),
    cake_flavours VARCHAR(30),
    filling_flavours VARCHAR(30)
);

-- Decorated Snacks Options Table
CREATE TABLE DecoratedSnackOptions
(
	ds_index TINYINT PRIMARY KEY AUTO_INCREMENT,
    snack_types VARCHAR(30),
    coating_types VARCHAR(30),
    flavour VARCHAR(30)
);