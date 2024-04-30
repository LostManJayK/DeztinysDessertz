USE DeztinysDessertzDB;

-- Add main menu options
INSERT IGNORE INTO MenuItems(item_name)
VALUES
('Cakes'),
('Cupcakes'),
('Dipped Dessertz'),
('Other Dessertz');


-- OPTIONS TABLES

-- Cake Types
INSERT IGNORE INTO CakeTypes(type_name)
VALUES
('Tiered'),
('Layered'),
('Sheet'),
('No-Bake Cheescake'),
('Baked Cheesecake');

-- Cake Flavours
INSERT IGNORE INTO CakeFlavours(flavour_name)
VALUES
('Chocolate'),
('Vanilla'),
('Red Velvet'),
('Angel Food'),
('Other');

-- Cake Fillings
INSERT IGNORE INTO CakeFillings(filling_name)
VALUES
('None'),
('Ganache'),
('Strawberry'),
('Boston Cream'),
('Marshmallow'),
('Other');

-- Cake Shapes
INSERT IGNORE INTO CakeShapes(shape_name)
VALUES
('Circle'),
('Square'),
('Heart'),
('Other');

-- Cupcake Quantities
INSERT IGNORE INTO CupcakeQuantities(quantity)
VALUES
	(6),
	(12),
	(18),
	(24),
	(36),
	(48);
	
-- Dipped Desert Types
INSERT IGNORE INTO DippedDessertTypes(type_name)
VALUES
	('Dezzy Dotz'),
	('Cake Pops'),
	('Pretzels'),
	('Almonds'),
	('Peanuts'),
	('Mixed Nuts'),
	('Strawberries'),
	('Grapes'),
	('Mangoes'),
	('Banana'),
	('Apple'),
	('Other');
	
-- Dipped Dessert Quantities
INSERT IGNORE INTO DippedDessertQuantities(quantity)
VALUES
('5'),
('10'),
('20'),
('40');
	
-- Coatings
INSERT IGNORE INTO Coatings(coating_name)
VALUES
('Dark Chocolate'),
('Milk Chocolate'),
('Vanilla Yogurt'),
('Strawberry Yogurt'),
('Caramel'),
('Candy');
	
-- Other Dessert Types
INSERT IGNORE INTO OtherDessertTypes(type_name)
VALUES
	('Cake Cups'),
    ('Cheesecake Cups');
    
-- Options Tables

INSERT IGNORE INTO CakeOptions(option_name, option_id)
VALUES
	('Cake Type', 'cake_type'),
    ('Tiers', 'num_tiers'),
    ('Layers per Tier', 'num_layers'),
    ('Cake Flavour', 'cake_flavour'),
    ('Filling', 'cake_filling'),
    ('Size', 'cake_size'),
    ('Shape', 'cake_shape');
    
INSERT IGNORE INTO CupcakeOptions(option_name, option_id)
VALUES
	('Cupcake Flavour', 'cupcake_flavour'),
    ('Filling', 'cupcake_filling'),
    ('Quantity', 'num_cupcakes');
    
INSERT IGNORE INTO DippedDessertOptions(option_name, option_id)
VALUES
	('Dessert Type', 'dipped_dessert_type'),
    ('Coating', 'dipped_dessert_coating'),
    ('Quantity', 'num_dipped_desserts');
    
INSERT IGNORE INTO OtherDessertOptions(option_name, option_id)
VALUES
	('Dessert Type', 'other_dessert_type'),
    ('Quantity', 'num_other_desserts');
    
	

	